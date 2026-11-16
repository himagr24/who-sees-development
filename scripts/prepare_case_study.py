#!/usr/bin/env python3
"""
Prepare the Puerto Rico case study from Earth Observation Group (EOG)
VIIRS Nighttime Lights (VNL) V2 annual composites.

What it does
------------
For each year it finds two files you have downloaded from EOG:

  * ``average_masked``  – average radiance with background and ephemeral
                          lights (e.g. fires) masked, in nW/cm²/sr
  * ``cf_cvg``          – number of cloud-free observations per pixel

It then, for the bounding box below:

  1. reads only the pixels inside the box (no global raster is loaded);
  2. computes the mean radiance over the box, the summed radiance, and the
     mean cloud-free observation count;
  3. labels each year's coverage ``high`` / ``limited`` using a documented
     observatory threshold (see ``LIMITED_IF_MEAN_CF_CVG_BELOW``);
  4. block-averages the box into a coarse grid for a few comparison years;
  5. writes these values into ``data/case-study.json``.

It never changes ``status``: a person must review the output and set
``"status": "verified"`` by hand.

Usage
-----
    python3 -m venv .venv && .venv/bin/pip install -r scripts/requirements.txt
    .venv/bin/python scripts/prepare_case_study.py --input-dir raw-data/vnl

Files may be ``.tif`` or ``.tif.gz`` (gzip files are read in place through
GDAL's /vsigzip/ handler, which is slow for global files; unzip them first
if you can spare the disk space). See docs/DATA_PREPARATION.md.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import numpy as np
import rasterio
from rasterio.windows import from_bounds

# Puerto Rico main island plus Vieques and Culebra; excludes Mona Island.
# [west, south, east, north] in decimal degrees (WGS84).
DEFAULT_BBOX = (-67.30, 17.85, -65.20, 18.55)
DEFAULT_YEARS = list(range(2014, 2025))
DEFAULT_COMPARISON_YEARS = [2016, 2017, 2018]

# Observatory threshold, NOT a provider rule: a year whose mean cloud-free
# observation count across the box is below this is labelled "limited".
# Roughly one cloud-free observation per month.
LIMITED_IF_MEAN_CF_CVG_BELOW = 12.0

# Source pixels per side of one comparison-grid cell (15 arc-seconds each).
# 24 px ≈ 0.1° ≈ 11 km at Puerto Rico's latitude.
BLOCK = 24

YEAR_RE = re.compile(r"(?<!\d)(20[1-2]\d)(?!\d)")
REPO_ROOT = Path(__file__).resolve().parent.parent


def find_file(input_dir: Path, year: int, band: str) -> Path | None:
    """Return the downloaded file for one year and band, or None."""
    matches = []
    for p in input_dir.rglob("*"):
        name = p.name.lower()
        if not (name.endswith(".tif") or name.endswith(".tif.gz")):
            continue
        if band not in name:
            continue
        # "average" also matches "average_masked"; keep the bands distinct.
        if band == "average" and "average_masked" in name:
            continue
        years = YEAR_RE.findall(p.name)
        # EOG names also contain a processing date (e.g. c202303062300);
        # the data year is the first standalone 20xx in the name.
        if years and int(years[0]) == year:
            matches.append(p)
    if len(matches) > 1:
        sys.exit(f"More than one {band} file for {year}: {[m.name for m in matches]}")
    return matches[0] if matches else None


def read_box(path: Path, bbox: tuple[float, float, float, float]) -> np.ndarray:
    """Read the bounding box from a GeoTIFF (optionally gzipped) as float64 with NaN for nodata."""
    uri = f"/vsigzip/{path}" if path.name.lower().endswith(".gz") else str(path)
    with rasterio.open(uri) as src:
        window = from_bounds(*bbox, transform=src.transform).round_offsets().round_lengths()
        data = src.read(1, window=window, boundless=True, fill_value=np.nan).astype("float64")
        if src.nodata is not None:
            data[data == src.nodata] = np.nan
    if data.size == 0:
        sys.exit(f"The bounding box does not overlap {path.name}")
    return data


def block_mean(a: np.ndarray, block: int) -> list[list[float]]:
    """Average non-overlapping block×block cells; partial edge blocks are dropped."""
    rows, cols = a.shape[0] // block, a.shape[1] // block
    if rows == 0 or cols == 0:
        sys.exit("Bounding box is smaller than one comparison cell; reduce BLOCK.")
    trimmed = a[: rows * block, : cols * block]
    blocks = trimmed.reshape(rows, block, cols, block)
    means = np.nanmean(blocks, axis=(1, 3))
    return [[round(float(v), 2) if np.isfinite(v) else 0.0 for v in row] for row in means]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--input-dir", type=Path, required=True, help="Folder holding the downloaded EOG files")
    ap.add_argument("--output", type=Path, default=REPO_ROOT / "data" / "case-study.json")
    ap.add_argument("--years", type=int, nargs="+", default=DEFAULT_YEARS)
    ap.add_argument("--comparison-years", type=int, nargs="+", default=DEFAULT_COMPARISON_YEARS)
    ap.add_argument("--bbox", type=float, nargs=4, default=DEFAULT_BBOX, metavar=("W", "S", "E", "N"))
    ap.add_argument("--dry-run", action="store_true", help="Print results without writing the JSON file")
    args = ap.parse_args()

    bbox = tuple(args.bbox)
    series, grids, report = [], {}, []

    for year in sorted(args.years):
        rad_path = find_file(args.input_dir, year, "average_masked")
        cvg_path = find_file(args.input_dir, year, "cf_cvg")
        if rad_path is None:
            series.append({"year": year, "value": None, "quality": "unknown"})
            report.append(f"{year}: no average_masked file found — recorded as unknown")
            continue

        rad = read_box(rad_path, bbox)
        mean_rad = float(np.nanmean(rad))
        sum_rad = float(np.nansum(rad))

        if cvg_path is None:
            quality, cvg_note = "unknown", "no cf_cvg file"
        else:
            mean_cvg = float(np.nanmean(read_box(cvg_path, bbox)))
            quality = "limited" if mean_cvg < LIMITED_IF_MEAN_CF_CVG_BELOW else "high"
            cvg_note = f"mean cf_cvg {mean_cvg:.1f}"

        series.append({"year": year, "value": round(mean_rad, 3), "quality": quality})
        report.append(f"{year}: mean {mean_rad:.3f}, sum {sum_rad:,.0f}, {cvg_note} → {quality}  [{rad_path.name}]")

        if year in args.comparison_years:
            grids[str(year)] = block_mean(rad, BLOCK)

    print("\n".join(report))

    valid = [s for s in series if s["value"] is not None]
    if not valid:
        sys.exit("No usable years found. Check --input-dir and file names (see docs/DATA_PREPARATION.md).")

    first, last = valid[0], valid[-1]
    direction = "increased" if last["value"] > first["value"] else "decreased" if last["value"] < first["value"] else "did not change"
    low = min(valid, key=lambda s: s["value"])
    statement = (
        f"Observed average radiance over the selected area {direction} from {first['value']:.2f} nW/cm²/sr in "
        f"{first['year']} to {last['value']:.2f} nW/cm²/sr in {last['year']}. "
        f"The lowest annual value in the period was {low['value']:.2f} nW/cm²/sr in {low['year']}."
    )

    cs = json.loads(args.output.read_text(encoding="utf-8"))
    cs["series"] = series
    cs["bbox"] = list(bbox)
    cs["observedChange"]["statement"] = statement
    cs["coverage"]["level"] = "limited" if any(s["quality"] != "high" for s in series) else "high"
    cs["coverage"]["validObservationNote"] = (
        "Per-year labels use the mean number of cloud-free observations (cf_cvg) across the box. "
        f"Years below {LIMITED_IF_MEAN_CF_CVG_BELOW:g} on average are labelled limited. "
        "This threshold is set by the observatory, not by the data provider."
    )
    if grids:
        cs["comparison"] = {
            "note": "Each cell averages the source pixels inside it. Ocean pixels are included and pull cell values down along the coast.",
            "cellSizeLabel": f"Each square averages {BLOCK}×{BLOCK} source pixels — about 11 km across",
            "grids": grids,
        }

    print("\nSuggested measurement statement (review before publishing):\n  " + statement)
    if args.dry_run:
        print("\n--dry-run: nothing written.")
        return
    args.output.write_text(json.dumps(cs, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote {args.output}. Review it, then set \"status\": \"verified\" by hand.")


if __name__ == "__main__":
    main()

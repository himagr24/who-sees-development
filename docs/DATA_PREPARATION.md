# Data preparation — Puerto Rico case study

This guide turns the demo values in `data/case-study.json` into real values from public satellite data.

## What you need

For each year from 2014 to 2024, two layers of the **VIIRS Nighttime Lights (VNL) V2.2 annual composite** from the Earth Observation Group (EOG), Colorado School of Mines:

| Layer | What it is |
|---|---|
| `average_masked` | Average night-time radiance (nW/cm²/sr), with background and short-lived lights such as fires masked out |
| `cf_cvg` | Number of cloud-free observations behind each pixel — used for the coverage label |

Method reference: Elvidge et al. (2021), *Remote Sensing* 13(5), 922 — <https://doi.org/10.3390/rs13050922>

## Step 1 — Get the data (choose one route)

Both routes need a free account, which you create yourself.

### Route A (recommended): Google Earth Engine — small files

The same product is in the Earth Engine catalogue as `NOAA/VIIRS/DNB/ANNUAL_V22`. Exporting only the Puerto Rico box gives files of a few hundred kilobytes instead of several gigabytes.

1. Sign up at <https://earthengine.google.com> and open the Code Editor.
2. Paste and run:

```js
var box = ee.Geometry.Rectangle([-67.30, 17.85, -65.20, 18.55]);
var col = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V22');

for (var year = 2014; year <= 2024; year++) {
  var img = col.filterDate(year + '-01-01', (year + 1) + '-01-01').first();
  ['average_masked', 'cf_cvg'].forEach(function (band) {
    var layer = img.select(band);
    var proj = layer.projection().getInfo();
    Export.image.toDrive({
      image: layer,
      description: 'VNL_v22_' + year + '_' + band,
      fileNamePrefix: 'VNL_v22_' + year + '_' + band,
      folder: 'who-sees-development',
      region: box,
      crs: proj.crs,
      crsTransform: proj.transform,
      maxPixels: 1e8
    });
  });
}
```

3. Open the **Tasks** tab and click **Run** on each export (22 in total).
4. Download the `who-sees-development` folder from Google Drive.

If a year is missing from the collection, the loop will fail at that year. Note which year it was, and the script will record it as `unknown`.

### Route B: Direct download from EOG — large files

1. Go to <https://eogdata.mines.edu/products/vnl/> and choose **Annual VNL V2**, then **V2.2**.
2. For each year, download the files whose names contain `average_masked` and `cf_cvg`. These are global files, several gigabytes each once unzipped.
3. You can leave them gzipped (`.tif.gz`). Unzipping makes the script much faster.

## Step 2 — Put the files in place

Put all the files in `raw-data/vnl/` inside the project. This folder is ignored by git, so the raw data is never committed. File names only need to contain the year and the layer name; both routes above already do.

## Step 3 — Run the script

```bash
python3 -m venv .venv
.venv/bin/pip install --only-binary=:all: -r scripts/requirements.txt
.venv/bin/python scripts/prepare_case_study.py --input-dir raw-data/vnl --dry-run
```

`--dry-run` prints the per-year values without changing anything. When they look sensible, run it again without `--dry-run` to write `data/case-study.json`.

The script fills in:

- `series` — mean radiance over the box for each year, with a coverage label;
- `coverage` — the overall label and a note on how it was computed;
- `comparison` — coarse grids for 2016, 2017 and 2018 (about 11 km per cell);
- `observedChange.statement` — a measurement-only sentence, for you to review.

It never sets `status` to `verified`.

### How coverage is labelled

A year is labelled **limited** when the average cloud-free observation count across the box is below 12, roughly one cloud-free observation a month. The threshold is set in `LIMITED_IF_MEAN_CF_CVG_BELOW` at the top of the script. It is a choice made by this observatory, not a rule from the data provider, and the site says so.

## Step 4 — Review before publishing

1. Read the printed values year by year. Do 2016, 2017, 2020 and 2022 look different? Either answer is worth recording — if the yearly average hides the blackouts, that is exactly the limitation the observatory is about.
2. Edit `observedChange.statement` if needed. Use measurement language only, never "developed" or "recovered".
3. Update `comparison.note` if you change the comparison years.
4. Remove the last line of `limitations` (the one starting "Demo content").
5. Update `summary` so it no longer mentions placeholder values.
6. Confirm the licence on the EOG site and update `dataset.license`.
7. Only then set `"status": "verified"`.

## Testing the script without real data

The script was tested on synthetic files named like real EOG files, including a gzipped file and a missing year. It has not yet been run on real data.

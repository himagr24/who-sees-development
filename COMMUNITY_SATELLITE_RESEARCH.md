# Community-centred satellite imagery — research notes

## Main takeaway

Satellite imagery is most useful to communities when it creates understandable, actionable evidence that communities can interpret and use according to their own priorities. It is least useful when it is used to classify people from afar or extract local knowledge merely to improve an external model.

The relevant workflow is:

```text
Satellite observation or alert
        ↓
Clear explanation of source, uncertainty, and limits
        ↓
Community-led verification and interpretation
        ↓
Community decides whether and how to respond
        ↓
Information remains governed by people affected
```

## Key papers and product lessons

### Satellite alerts plus capacity can support community action

**Slough, Kopas & Urpelainen (2021)** — *Satellite-based deforestation alerts with training and incentives for patrolling facilitate community monitoring in the Peruvian Amazon*. PNAS. https://doi.org/10.1073/pnas.2015171118

The study gave Indigenous communities access to satellite-detected deforestation alerts and trained community-selected monitors to investigate them. Its key lesson is that an alert alone is not enough: affected people need access, explanation, capacity, and authority to decide what happens next.

**Prototype lesson:** Include an explicit final question after the inference chain: “What could people do with this observation?” Do not make the software recommend an intervention.

### Local environmental knowledge has forms that pixels cannot capture

**Gill, Lantz & Gwich'in Social and Cultural Institute** — *A Community-Based Approach to Mapping Gwich'in Observations of Environmental Changes in the Lower Peel River Watershed, NT*. https://doi.org/10.2993/0278-0771-34.3.294

The project used participatory multimedia mapping with land users and youth, combining geotagged photo/video observations with follow-up accounts.

**Prototype lesson:** Treat questions, narratives, photos, concerns, and place-based accounts as different from a satellite value. Do not force them into a binary annotation label.

### Data sovereignty must be designed up front

**Reyes-García et al. (2022)** — *Data Sovereignty in Community-Based Environmental Monitoring: Toward Equitable Environmental Data Governance*. BioScience. https://doi.org/10.1093/biosci/biac048

The authors warn that externally led environmental-monitoring systems can reduce local people to data collectors or reinforce existing inequalities.

**Prototype lesson:** Code can be open while local contributions remain controlled. Include visibility choice, approximate location, review state, correction, and withdrawal in the contribution model.

### Community control is different from participation in an external project

**Voisin, Doviaza & Quintero (2025)** — *Community-based monitoring in tropical environments: Establishing indigenous participation without direct western involvement*. Socio-Environmental Systems Modelling. https://doi.org/10.18174/sesmo.18700

The study examines Indigenous cartographers using geospatial monitoring within their own territorial-control and defence strategies.

**Prototype lesson:** Begin with “What should this map help people understand?” rather than “Please validate our data.” The Fellowship plan should begin with co-design.

### Remote volunteers and local participants have different authority

**Simmons et al. (2022)** — *Disaster, Infrastructure and Participatory Knowledge: The Planetary Response Network*. Citizen Science: Theory and Practice. https://doi.org/10.5334/cstp.392

The Planetary Response Network used online volunteers to inspect satellite/aerial imagery after disasters and generate information for responders.

**Prototype lesson:** A visitor’s map interpretation, a scientific analysis, and a local account must not be represented as equivalent evidence. Display contributor role and contribution status.

### Collaboration has real access and infrastructure constraints

**Remi et al. (2026)** — *From participation to data: collaborative mapping in the context of natural hazards and risks*. Natural Hazards. https://doi.org/10.1007/s11069-026-08485-z

This systematic review highlights satellite imagery as major infrastructure for collaborative hazard mapping, while noting that access, connectivity, institutional support, validation, and geographical inequities shape who can participate.

**Prototype lesson:** Make the experience plain-language and workshop-friendly. A printable data card and a no-account contribution pathway are valuable; a web map should not be the only format.

## Night-time-light research that affects the design

### Light is informative, not a universal development measure

**Jhamb et al. (2025)** — *Shedding light on development: Leveraging the new nightlights data to measure economic progress*. https://pmc.ncbi.nlm.nih.gov/articles/PMC11790135/

Night-time lights can predict some socioeconomic outcomes, but the relationship is imperfect and varies across places.

**Gibson, Dykstra, Morten & Sandefur** — *Satellite Data for the Social Sciences: Measuring rural electrification and living standards in India*. https://eprints.lse.ac.uk/100823/1/Lights_DKU.pdf

This work finds night lights more useful for rural electrification and local electricity consumption than for household living standards, extreme poverty, or financial inclusion.

**Prototype lesson:** Use a question about observed radiance change; never turn a brightness signal into a social label.

### Data products have technical limitations that matter

- Earth Observation Group VIIRS annual products: https://eogdata.mines.edu/products/vnl/
- NASA Black Marble User Guide: https://viirsland.gsfc.nasa.gov/PDF/BlackMarbleUserGuide_v1.2_20210421.pdf

Products involve cloud, moonlight, snow, stray-light, and other corrections; annual products can conceal short-lived changes. Resolution is limited, and light may come from multiple sources.

**Prototype lesson:** Always show product, resolution, time aggregation, coverage/quality, and caveats next to the visualisation. Add an “alternative explanations” panel.

## Practical rules for the first prototype

1. Use one case study only.
2. Use public data only.
3. Separate measurement, interpretation, context, and unanswered questions.
4. Do not store real submissions in the first version.
5. Mark every example local contribution as illustrative unless it is real, consented, and approved for use.
6. Do not describe the project as co-designed with a community before that work actually happens.
7. Treat questions and governance as valuable outputs, not as implementation details.


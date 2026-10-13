# Study protocol

## Status

Exploratory computational prototype; no collected human-subject data and no field deployment.

## Estimand and assumptions

How does missing daily monitoring change our interpretation of PM2.5 exposure?

Daily means are compared with the WHO 2021 PM2.5 24-hour guideline level of 15 µg/m³. This comparison is descriptive: formal guideline assessment uses the annual 99th percentile. The sample mean is NOT an annual exposure estimate. A seeded IID percentile bootstrap estimates uncertainty in the observed mean; serial correlation and non-random missingness can invalidate this interval.

## Data dictionary

expectedDays: integer > 0; daily: array of daily PM2.5 means in µg/m³ or null, length exactly expectedDays, unique consecutive dates assumed; seed: uint32 (optional). Use one station and a consistent local-day definition. Aggregate calibrated hourly observations separately and document minimum hourly completeness.

## Reproduction

Run `node --test` and `node cli.mjs data/demo.json results`. The demo is deterministic and uses no network services. The result embeds input values. Synthetic data were manually constructed to exercise the model; no location names refer to real observations.

## Validation plan

1. Register the real study question and analysis window before inspecting outcomes.
2. Record source URL, retrieval date, license, units, spatial/temporal resolution and missingness.
3. Compare calculations against hand calculations and an independent reference implementation.
4. Vary assumptions and report sensitivity; distinguish scenario bounds from sampling uncertainty.
5. Have a domain specialist assess external validity. Report failures and limitations.

## Ethics and interpretation

Use public aggregate data with compatible terms; avoid personal records. Do not treat computed rankings or scenarios as operational recommendations. There are no established beneficiary counts, publications, partnerships or impact claims.

## Reference

https://www.who.int/publications/i/item/9789240034228/

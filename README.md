# Air Quality Evidence

Качество воздуха: полнота наблюдений и неопределённость

**Research prototype · synthetic demo data · no validated field impact**

## Research question

How does missing daily monitoring change our interpretation of PM2.5 exposure?

## Why this matters

This tool supports transparent exploration of a public-interest planning question. It can be adapted to Kazakhstan after obtaining appropriate local data. It does not establish outcomes for any real community.

## Run in two minutes

Requires Node.js 22 or newer. No external packages, credentials or network needed.

```sh
node --test
node cli.mjs data/demo.json results
```

Open [the demo report](results/report.html) in a browser, or inspect [machine-readable results](results/result.json). To use your own data: `node cli.mjs my-data.json my-results`. Paths resolve relative to the current directory. Run commands from the repository root.

## Method

Daily means are compared with the WHO 2021 PM2.5 24-hour guideline level of 15 µg/m³. This comparison is descriptive: formal guideline assessment uses the annual 99th percentile. The sample mean is NOT an annual exposure estimate. A seeded IID percentile bootstrap estimates uncertainty in the observed mean; serial correlation and non-random missingness can invalidate this interval.

Reference: [primary method documentation](https://www.who.int/publications/i/item/9789240034228/). The reference supports the method, not this prototype's validity or impact.

## Input contract

expectedDays: integer > 0; daily: array of daily PM2.5 means in µg/m³ or null, length exactly expectedDays, unique consecutive dates assumed; seed: uint32 (optional). Use one station and a consistent local-day definition. Aggregate calibrated hourly observations separately and document minimum hourly completeness.

See [example input](data/demo.json), [model](src/model.mjs), [methodology](docs/METHODOLOGY.md), and [tests](test/model.test.mjs). Inputs fail explicitly when required numeric values are invalid. JSON does not support NaN or Infinity.

## Evidence and next study

The committed example is a hand-constructed fixture, not an empirical study. Test outputs check arithmetic and edge cases; they do not validate applicability to Kazakhstan. Before real use, document provenance and licensing, compare results with an independent implementation, assess data completeness and bias, and have a domain specialist review assumptions. Publish validation results including negative findings.

## Для портфолио

Прототип помогает показать понимание методики и воспроизводимости. Его нельзя описывать как завершённое полевое исследование, внедрение или доказанное улучшение жизни людей. Следующий шаг — реальные открытые данные, проверка с профильным специалистом и документированный личный вклад.

## Development and attribution

Initial implementation and documentation were generated with AI assistance at the portfolio owner's request. No prior research history, institutional affiliation or individual scientific contribution is asserted. The owner should review, understand and extend the work before making personal contribution claims.

MIT licensed code and synthetic fixtures. Third-party sources retain their own terms. See [contribution guide](CONTRIBUTING.md).

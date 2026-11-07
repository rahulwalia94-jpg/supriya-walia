# The History, Economics and Systemic Risk of Cyberattacks on Banks (1994 – 7 November 2026)

This is a public-information research project. It covers how cyberattacks on banks and financial infrastructure evolved, why they happen, how they work at a conceptual level, how they spread into financial risk, and what regulators did in response. **No live systems were scanned, probed or tested.** Attack techniques are described for defensive purposes only.

> **Status (7 Nov 2026):** v1.0. There are 61 curated incident records, 59 of them malicious and 2 non-malicious comparators. 12 charts, a dashboard, and analysis covering Parts 1–15 of the brief. Gaps are listed in [`evidence_gaps.md`](evidence_gaps.md). The incident database is a **curated sample, not a population**. No trend claim in this project rests on incident counts in it.

## Start here

| If you want… | Read |
|---|---|
| The answers to questions A–J in 10 minutes | [`executive_summary.md`](executive_summary.md) |
| First principles: why banks are attacked | [`banking_evolution.md`](banking_evolution.md) |
| The chronology, 1994–2026 | [`historical_timeline.md`](historical_timeline.md) |
| Deep case studies (Bangladesh Bank, Cosmos, ICBC FS, C-Edge, Arkéa, 2026 India…) | [`global_case_studies.md`](global_case_studies.md) |
| How each attack type works inside a bank | [`attack_mechanisms.md`](attack_mechanisms.md) |
| Hypotheses H1–H9 tested | [`root_cause_analysis.md`](root_cause_analysis.md) |
| Cyber → liquidity → solvency transmission, scenarios | [`systemic_financial_risk.md`](systemic_financial_risk.md) |
| US banks, Citi cards, CECL and stress testing | [`citi_us_cards_cecl_impact.md`](citi_us_cards_cecl_impact.md) |
| State actors, criminal economics, crypto laundering | [`geopolitical_analysis.md`](geopolitical_analysis.md) |
| Regulation by jurisdiction, with dates | [`regulatory_history.md`](regulatory_history.md) |
| 2027–2030 risk register | [`future_risk_scenarios.md`](future_risk_scenarios.md) |
| What we could not verify | [`evidence_gaps.md`](evidence_gaps.md) |
| How the research was done | [`methodology.md`](methodology.md), [`sources.md`](sources.md) |

## Data and code

```
data/incidents.csv / incidents.json   61 records, ~45 fields each (see data/data_dictionary.md)
data/source_register.csv              77 URLs, source type, and HTTP check on 2026-11-07
analysis/incidents_source.py          the single source of truth for records (edit here)
analysis/build.py                     regenerates data files, charts and dashboard
analysis/card_stress.py               hypothetical credit-card roll-rate stress model
analysis/card_stress_results.json     model output
charts/*.png + charts/chart_notes.md  12 charts, each with its methodology and caveats
dashboard/index.html                  self-contained explorer (open it in a browser; works offline)
```

Rebuild everything:

```bash
pip install pandas matplotlib
cd bank-cyber-history
python3 analysis/build.py        # data, charts, dashboard
python3 analysis/card_stress.py  # stress model
```

## Evidence conventions

Each important claim carries one of these status labels:

- **CONFIRMED**: a primary source exists (regulator, court, audited or official statement) or there is strong multi-source corroboration.
- **REPORTED**: credible journalism without primary confirmation.
- **ALLEGED**: a claim by a party, such as a ransomware group or a litigant.
- **DISPUTED**: credible sources conflict.
- **INFERRED**: the research team's analysis.
- **UNKNOWN**: not known.

Each record also gets an evidence score from 1 to 5. Records are tagged as either *web-verified 2026-11-07* (checked by live web search in this session) or *canonical (training knowledge)*. The second group are well-documented historical facts recorded from prior knowledge with a canonical primary URL, and their exact figures should be re-checked against those URLs before anyone relies on them in formal work.

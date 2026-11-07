# Methodology

## Research plan (as executed)
1. Defined scope: cyber incidents materially affecting banks, broker-dealers, card processors, payment and market infrastructure, bank vendors, and crypto platforms where they connect to banking. Non-malicious outages are included **only as labelled comparators**.
2. Built a landmark list of 20 high-confidence cases: Levin, Estonia, Heartland, RBS WorldPay, Ababil, DarkSeoul, JPMorgan, Carbanak, Bangladesh, Tesco, NotPetya, Cosmos, Banco de Chile, Capital One, SolarWinds, ICBC FS, C-Edge, CrowdStrike (comparator), Bybit and Arkéa.
3. Expanded chronologically to 61 records.
4. Ran live web searches (7 Nov 2026) on every 2025–26 event and on items with known factual risk, then retrieved primary pages where the sandbox allowed: RBI MD page, BoJ FSR page, EBA RAR page.
5. Link-checked every URL (`data/source_register.csv`) and replaced the 404s.
6. Analysed hypotheses, transmission and scenarios. Built charts and the dashboard from a single data source (`analysis/incidents_source.py`).

## Source hierarchy
1. **Primary:** regulator and central-bank publications; court and enforcement documents (DOJ, SEC, OCC, FCA, FSC); official company filings and statements; CERT/CSIRT advisories; government attributions.
2. **Official research:** IMF, BIS, EBA, ECB, BoJ, FSB.
3. **Major journalism** (Reuters, AP, FT, Bloomberg, AFP, Le Monde, Nikkei/Nippon.com, Business Standard, Korea JoongAng Daily): used to corroborate.
4. **Security-vendor research:** used critically. Vendors have commercial incentives to emphasise threat severity and their own detection, and attribution by vendors is labelled "suspected."
5. **Aggregators and blogs:** used only to locate primary sources. Several AI-generated aggregator sites appeared in search results; they were **not** relied on for facts.

## Classification rules
- **Status** (CONFIRMED / REPORTED / ALLEGED / DISPUTED / INFERRED / UNKNOWN) applies to a record's headline facts.
- **Evidence score:**
  - 5 = court, regulator or audited source plus corroboration;
  - 4 = official statement plus major media;
  - 3 = multiple credible media;
  - 2 = single credible source;
  - 1 = weak.
- **State linkage:** confirmed-gov / suspected / claimed / none-known (see geopolitical_analysis.md §10.2).
- **Currency:** original-currency strings are preserved. USD figures are approximate at the incident-date exchange rate as reported by sources. No independent FX conversion was performed, so amounts are labelled approximate.
- **Families and entry points:** keyword rules in `analysis/build.py`, applied reproducibly. They involve analyst judgement.

## Limits on statistical inference
The database is a **purposive sample**. Charts describe the sample. **No incidence trend is inferred from counts.** For population-level statements we rely on official datasets (IMF, EBA) and quote their caveats.

## Safety and ethics
No scanning, probing, credential use or testing of any live system took place. Mechanisms are described conceptually and defensively. Named institutions are linked only to publicly documented incidents.

## Tools
Live web search; HTTP retrieval of public pages; Python (pandas, matplotlib) for data and charts; a static HTML/JS dashboard with no external dependencies.

# Evidence Gaps, Corrections and Fact-Check Audit (as of 7 Nov 2026)

## A. Items that could not be verified, or that conflict

| # | Item | Problem | Treatment |
|---|---|---|---|
| 1 | Crédit Mutuel Arkéa loss amount | Reported EUR ~100m (AFP/Reuters per secondary) to EUR 118m (Le Télégramme). On-chain flag >USD 106m. **Bank has not confirmed** | `stolen_usd_m` = null; range kept in `stolen_orig`; status REPORTED |
| 2 | Arkéa entry point | "Service provider's platform" (bank/press) vs reports the bank's own account was used | Recorded as reported third-party entry; root cause UNKNOWN |
| 3 | Arkéa: Paris prosecutor investigation | Mentioned by one aggregator; not found in primary or major outlets reviewed | Marked unverified |
| 4 | Seed Reuters URLs (Arkéa 5 Nov; India 4 Nov) | HTTP 401 (paywall/bot block). **Content not read directly** | Cited as seed sources with corroborating outlets |
| 5 | Two Mumbai NBFCs, ~USD 2m, >700 transfers (8–9 Oct 2026) | One secondary source; a targeted search did not corroborate it. The closest verified case is Hyderabad (INR 3.3 crore, 19 Oct) | Flagged "unverified" in INC-2026-004 |
| 6 | Aggregate Indian NBFC losses "~INR 300 crore over two months" | Single outlet | Recorded as UNVERIFIED |
| 7 | CERT-In CIAD-2026-0046 and CRAFTY FALCON advisory texts | Not retrieved; press only | REPORTED |
| 8 | RBI 2026 Directions: 6-hour DAKSH reporting; exclusions (SFBs, PBs, LABs) | From secondary sources; RBI page verified for title, number, date and update only | Partially verified |
| 9 | SBI leak scale | 3,897 confirmed (SBI) vs 375k rows claimed by the actor | Both recorded |
| 10 | Lotte Card fine | KRW 5bn (most sources) vs KRW 50bn (one) | Recorded as ~KRW 5bn with discrepancy noted |
| 11 | Citizens/Frost vendor identity (Sefas) | Secondary sources only | REPORTED |
| 12 | Shinkin outage duration | "Over 5 hours" vs "5½ hours"; specific fault and vendor undisclosed | Recorded as ~5h; **non-malicious per the banks' statement** |
| 13 | Bangladesh Bank recovered amount | ~USD 15m from the Philippine casino operator widely reported; total recovery not authoritatively consolidated | Left null |
| 14 | ICBC FS: BNY ~USD 9bn exposure; parent capital injection; USB-stick messengers | Press reports citing sources | REPORTED |
| 15 | ICBC FS entry vector (Citrix Bleed) | Widely suspected, not officially disclosed | INFERRED |
| 16 | C-Edge vector (Jenkins at a related provider) and RansomEXX attribution | Security-vendor claims | REPORTED (vendor) |
| 17 | Carbanak "USD 1bn" | Kaspersky estimate | REPORTED; no confirmed figure |
| 18 | Levin case figures | USD 10m vs 10.7m; credential origin disputed | DISPUTED detail |
| 19 | Operation Ababil dates | DOJ: late 2011 – mid-2013; media: Dec 2011 – Sep 2012 for the core 176 days | Both noted |
| 20 | IMF May 2026 blog and WP/26/62 full text | imf.org returned 403 to the sandbox; abstract and secondary coverage used. Figures such as "U.S. 46% of banking incidents" come from secondary sites and were **not used** | Partially verified |
| 21 | FS-ISAC *Navigating Cyber 2025* (seed) | Not retrieved this session | Not cited for figures |
| 22 | US Basel III endgame final rule; CISA CIRCIA final rule; UK CTP designations; DORA CTPP list | Status as of Nov 2026 not verified | Marked ⚠️ in regulatory_history.md |
| 23 | Patelco figures | Corrected during research: ~502k members (not 450k); 726k notified; initial access 23 May 2024 | **Corrected** |
| 24 | JPMorgan 2014 early "Russian state" speculation | Not borne out by the 2015 indictment (criminal enterprise) | Corrected framing |
| 25 | FIS 2011 source link | Points to a search page, not a specific article | Weak source; evidence 4 rests on training knowledge. Replace with the original article |

## B. Records that rely on training knowledge (not re-fetched)

All records tagged `verification = canonical (training knowledge)` (≈45 of 61). These are well-documented events, but the **exact figures and URLs should be spot-checked** before formal publication. `data/source_register.csv` gives the HTTP status of every URL on 7 Nov 2026:
- 200 = reachable;
- 401/403 = blocked from the sandbox (not proof that the URL is invalid);
- the original 404s were replaced during the audit.

## C. Structural gaps

1. **Denominator.** No public global census of bank cyber incidents with consistent severity exists. The IMF and EBA datasets are the best available, and each has its own coverage biases.
2. **Disclosure bias.** Non-listed banks, co-operative banks and banks in many jurisdictions rarely disclose. Vendors rarely disclose which banks were affected.
3. **Loss data.** Few incidents have audited loss figures. Most figures come from early press reports.
4. **AI role.** No public forensic report reviewed establishes autonomous AI execution in a bank theft.
5. **Language coverage.** Searches were mainly in English, with some French. Korean, Japanese, Hindi and Persian primary sources were reached only through English coverage.
6. **Sample size.** 61 records. The target was 50+ materially significant incidents. More 2000s-era European and Latin American cases, and African cases, would improve coverage.

## D. Progress checklist

- [x] Research plan and source hierarchy (methodology.md)
- [x] 20 landmark incidents identified and expanded to 61
- [x] 2025–26 events web-verified where possible
- [x] Hypothesis analysis H1–H9
- [x] Transmission framework and scenarios
- [x] Citi/cards/CECL framework plus reproducible stress model
- [x] Regulatory chronology (5 jurisdictions + international)
- [x] Data files, 12 charts, dashboard
- [x] Fact-check audit (this file)
- [ ] Primary-text retrieval for CERT-In advisories, the full IMF WP/26/62, FS-ISAC 2025 (blocked or not attempted)
- [ ] Re-verify all training-knowledge figures against primary URLs
- [ ] Add non-English primary sources

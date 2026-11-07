# Part 2 — The Complete History, 1994 to 7 November 2026

Every row in this file links to a record in `data/incidents.csv` (by `INC-` ID). The status labels are the ones defined in the README. The timeline is selective. It traces *how the problem changed*, and it does not try to list every incident.

---

## ERA A — Before 2000: electronic banking and early computer crime

**Environment.** Banks ran mainframe ledgers. Corporate customers started payments over dial-up "cash management" terminals using static passwords. Interbank payments ran on SWIFT, CHIPS and Fedwire inside closed networks. "Cybersecurity" mostly meant access control on internal terminals. The main computer-crime worry was insiders: programmers who rounded fractions of cents into their own accounts, or clerks who keyed fraudulent transfers. Most of those cases are anecdotal and poorly documented, so they are not in the database.

### INC-1994-001 — Citibank / Vladimir Levin (1994) — CONFIRMED
- **Dates:** fraudulent transfers ran from about June to October 1994. Levin was arrested at London Stansted in March 1995, extradited to the US in 1997, pleaded guilty in 1998, and was sentenced to 3 years.
- **Mechanism:** Levin used valid customer credentials on Citicorp's dial-up corporate cash-management system to make about 40 transfers from corporate customer accounts to accounts controlled by accomplices in Finland, the US, the Netherlands, Germany and Israel.
- **Amounts:** about **USD 10m** was transferred. Citibank said all but about **USD 400k** was recovered. These are the most commonly cited figures, and some sources vary a little (e.g., USD 10.7m). Status: CONFIRMED in substance, with figure variation noted.
- **Disputed point:** how Levin got the credentials. Later claims that another hacker sold him access are unverified (DISPUTED).
- **Why it mattered:** it was the first widely reported "online bank robbery." Citibank responded by adding token/smart-card authentication (REPORTED). The lesson lasted: **remote initiation of high-value payments needs strong authentication**, a principle that resurfaces in 2014 (JPMorgan, no MFA on one server), 2016 (SWIFT credentials) and 2026 (API keys).

## ERA B — 2000–2009: internet banking and expanding connectivity

**Environment.** Retail internet banking became mainstream in the US and Europe. Card-not-present e-commerce grew fast. Payment processors gathered huge volumes of card data. PCI DSS was issued in December 2004. Phishing and banking trojans (Zeus from about 2007) appeared. Organised carding forums (CarderPlanet, ShadowCrew) industrialised the trade in stolen card data.

| ID | Year | Event | Significance | Status |
|---|---|---|---|---|
| INC-2005-001 | 2005 | CardSystems Solutions | ~40m cards exposed at a processor that had stored prohibited track data. The processor lost its network acceptance | CONFIRMED |
| INC-2007-001 | 2007 | **Estonia** | DDoS waves (27 Apr – ~18 May) after the Bronze Soldier memorial was moved. Hansabank and SEB online banking were degraded, and banks blocked foreign traffic to keep domestic service running. Russian *state* direction was alleged but never proven; one Estonian national was convicted | CONFIRMED (event) / UNKNOWN (state role) |
| INC-2008-001 | 2008 | Heartland Payment Systems | ~130m cards. SQL injection followed by sniffers. Heartland had been certified PCI-compliant, an early case of "compliance ≠ security." Albert Gonzalez received 20 years | CONFIRMED |
| INC-2008-002 | 2008 | RBS WorldPay | ~USD 9.4m from 2,100+ ATMs in about 12 hours after limits on payroll cards were raised. The template for later "unlimited operations" | CONFIRMED |
| INC-2010-001 | 2009–10 | Zeus / Operation Trident Breach | ~USD 70m stolen out of ~USD 220m attempted (FBI) from SME accounts. Man-in-the-browser malware defeated password plus one-time password. Led to the FFIEC 2011 authentication supplement | CONFIRMED |

**Estonia, in detail.** Estonia was one of the most internet-dependent societies in the world. Hansabank (later Swedbank) handled most retail banking. The DDoS came from botnets and from volunteers coordinated on Russian-language forums. The banks' main defence was **geo-filtering**: they cut off foreign traffic so domestic customers could still bank. That kept the service running but stranded Estonians abroad. Reported downtime was about 1.5 hours of full online-banking outage at Hansabank on 10 May, with longer restrictions on foreign access. Reported losses of around EUR 1m are low-confidence. The episode led to the NATO Cooperative Cyber Defence Centre of Excellence in Tallinn (2008). For banking, the lesson was that **availability is a national-security property**, and that banks are *symbols* attackers choose to hit.

## ERA C — 2010–2015: organised groups and state-linked campaigns

**Environment.** Criminal groups professionalised: Carbanak, the "unlimited operations" cash-out rings. States began using banks as instruments of coercion (Iran's Operation Ababil, North Korea's DarkSeoul). Mobile banking grew. Large banks spent heavily, so attackers moved to processors, retailers and weaker banks.

| ID | Date | Event | Key facts | Attribution | Status |
|---|---|---|---|---|---|
| INC-2011-002 | Mar 2011 | FIS prepaid cash-out | ~USD 13m | Criminal | REPORTED |
| INC-2011-001 | May–Jun 2011 | Citigroup card portal breach | ~360k accounts. An authorization flaw in the web app (account number changeable in the URL, widely reported). ~USD 2.7m fraud reported | Unknown | CONFIRMED |
| INC-2012-001 | Dec 2011 – mid-2013 | **Operation Ababil DDoS** | ≥46 US financial institutions; 176 days of attacks (DOJ). Hundreds of thousands of customers cut off; remediation costs in the tens of millions | **DOJ indictment (Mar 2016)** of 7 Iranians at IRGC-affiliated ITSec Team and Mersad. Note the date discrepancy: DOJ gives "late 2011 to mid-2013" while some media give "Dec 2011 – Sep 2012" for the core DDoS phase | CONFIRMED |
| INC-2013-001 | Dec 2012 / Feb 2013 | Unlimited Operations (RAKBANK, Bank Muscat) | ~USD 45m; ~40,500 withdrawals in ~10 hours across 24 countries on 19 Feb 2013 | Criminal (EDNY indictments) | CONFIRMED |
| INC-2013-002 | 20 Mar 2013 | **DarkSeoul** | Wiper hit Shinhan, NongHyup and Jeju banks plus broadcasters KBS, MBC and YTN. ~32,000+ machines. ATMs and online banking disrupted | South Korean government attributed it to North Korea (Apr 2013) | CONFIRMED (event); attribution is government-level but not independently adjudicated |
| INC-2013-003 | Nov–Dec 2013 | Target | ~40m cards via HVAC-vendor credentials. Accelerated US EMV migration | Unknown | CONFIRMED |
| INC-2014-001 | 2013–2018 | **Carbanak** | Long-dwell intrusions into ~100 banks (vendor estimate). Operators studied bank workflows and inflated balances. "Up to USD 1bn" is a **Kaspersky estimate, not independently verified** | Criminal; alleged leader arrested in Spain in 2018 (Europol) | REPORTED (amount) |
| INC-2014-002 | Jun–Aug 2014 | **JPMorgan Chase** | Contact data for 76m households and 7m small businesses (8-K, Oct 2014). No account credentials or funds taken, per JPM. Entry via an employee credential on a server reportedly lacking 2FA | **Criminal**, not state: SDNY indicted Shalon, Orenstein and Aaron (Nov 2015) for a pump-and-dump, gambling and payment-processing enterprise. *Early media speculation about Russian state involvement was not borne out by the charges* | CONFIRMED |
| INC-2015-001 | Jan 2015 | Banco del Austro | ~USD 12m via SWIFT through Wells Fargo. A Bangladesh precursor | Unknown | REPORTED |
| INC-2015-002 | Dec 2015 | Tien Phong Bank | ~EUR 1m SWIFT attempt, stopped | Vendors: Lazarus | REPORTED |

**2014 JPMorgan, in detail.**
- *Before:* JPMorgan was the largest US bank, with a cyber budget of about USD 250m a year (stated).
- *Trigger:* a stolen employee credential on a server that had not been upgraded to two-factor authentication (REPORTED, NYT/DealBook).
- *Mechanism:* the attackers reached about 90 servers and contact databases.
- *Detection:* found in summer 2014, reportedly after a related breach at a charity-race website vendor. Disclosed in an 8-K on 2 Oct 2014.
- *Impact:* contact data only.
- *Aftermath:* indictments, guilty pleas, and a push across the industry for full MFA coverage. NYDFS Part 500 (2017) made MFA for remote access a regulatory requirement.
- *Counterfactual:* a complete asset inventory with MFA enforced everywhere.
- *Lesson:* one forgotten server can undo a USD 250m programme, and **stolen bank data can be monetised through market manipulation** rather than direct theft.

**The DPRK pivot.** From about 2015, North Korea's Lazarus cluster (US government names include HIDDEN COBRA, APT38 and TraderTraitor) moved from disruption (DarkSeoul) to **revenue generation**, first against banks' SWIFT endpoints (2015–2018), then ATM switches (FASTCash, 2016–2020), then crypto (2017 onward). This is one of the best-evidenced shifts in the whole history. See `geopolitical_analysis.md`.

## ERA D — 2016–2019: direct manipulation of financial transactions

The signature of this era: attackers stopped just *stealing data* and started **speaking with the bank's voice**. They sent authenticated payment messages (SWIFT) or authorization responses (ATM switches) that downstream parties trusted.

| ID | Date | Event | Amounts (attempted / executed / lost) | Status |
|---|---|---|---|---|
| INC-2016-001 | 4–5 Feb 2016 | **Bangladesh Bank** | ~USD 951m / USD 101m / ~USD 81m (Sri Lanka USD 20m reversed) | CONFIRMED |
| INC-2016-003 | Jul 2016 | Union Bank of India | ~USD 171m attempted, reportedly recovered | REPORTED |
| INC-2016-002 | 5–8 Nov 2016 | Tesco Bank | GBP 2.26m from ~9,000 accounts. **FCA fine GBP 16.4m (Oct 2018)** | CONFIRMED |
| INC-2017-001 | May–Jul 2017 | Equifax | 147m consumers. PLA officers indicted 2020 | CONFIRMED |
| INC-2017-002 | 27 Jun 2017 | NotPetya | Ukrainian banks and the NBU disrupted. GRU attribution (UK, US and others, Feb 2018) | CONFIRMED |
| INC-2017-003 | Oct 2017 | Far Eastern International Bank (Taiwan) | ~USD 60m attempted, most recovered | REPORTED |
| INC-2018-004 | Feb 2018 | City Union Bank (India) | ~USD 1.8m, partly recovered | REPORTED |
| INC-2018-001 | Apr–May 2018 | Mexico SPEI participants | ~MXN 300m (Banxico) | CONFIRMED |
| INC-2018-002 | 24 May 2018 | **Banco de Chile** | Wiper on ~9,000 PCs as a diversion, plus ~USD 10m via SWIFT | CONFIRMED (event); vendor attribution to Lazarus |
| INC-2018-003 | 11–13 Aug 2018 | **Cosmos Bank** | ~INR 94.4 crore (≈USD 13.5m) | CONFIRMED |
| INC-2019-001 | Mar–Jul 2019 | **Capital One** | ~106m individuals' data; OCC USD 80m penalty | CONFIRMED |
| INC-2019-002 | 2019 | First American Financial | ~885m documents exposed | CONFIRMED |

**Banco de Chile vs Capital One: two different mechanisms.**
- *Banco de Chile* was **destruction used as cover for theft**. Malware wiped thousands of workstations. While IT staff fought that fire, fraudulent SWIFT messages went out. The lesson is that incident response has to keep payment monitoring *separate* from disruption recovery.
- *Capital One* was **cloud identity and configuration**. No money moved. A misconfigured web application firewall allowed a server-side request forgery that retrieved cloud role credentials, which were then used to copy storage buckets of credit-card application data. Detection took about four months and came through an *external* tip. The lesson is that in the cloud, *identity and configuration* are the perimeter. The OCC penalised risk-management failures rather than "being hacked."

(The full Bangladesh Bank and Cosmos case studies are in `global_case_studies.md`.)

## ERA E — 2020–2024: ransomware and systemic dependencies

**Environment.** Ransomware-as-a-Service matured: LockBit, ALPHV/BlackCat, Clop, RansomHub. *Double extortion* (encrypt *and* threaten to leak) became standard. COVID accelerated remote access and cloud adoption. Mass exploitation of file-transfer software (Accellion 2020–21, MOVEit 2023) hit hundreds of financial firms through vendors. The war in Ukraine (2022) brought state-linked DDoS. Market infrastructure vendors became targets: ION (2023), EquiLend (2024), ICBC FS (2023).

| ID | Date | Event | Why it matters | Status |
|---|---|---|---|---|
| INC-2020-001 | Aug 2020 | NZX DDoS | Trading halted on 4 days | CONFIRMED |
| INC-2020-002 | 2019–Dec 2020 | SolarWinds | Supply-chain espionage. SVR attribution | CONFIRMED |
| INC-2021-001 | Dec 2020–Jan 2021 | Accellion FTA | Flagstar (~1.5m), RBNZ | CONFIRMED |
| INC-2021-002 | Nov 2021 | Robinhood | Social engineering of support staff (~7m emails) | CONFIRMED |
| INC-2022-001 | 15–16 Feb 2022 | Ukraine bank DDoS | GRU attribution by UK and US within 3 days | CONFIRMED |
| INC-2022-002 | Mar 2022 | Ronin bridge | ~USD 620m. FBI attributed to DPRK | CONFIRMED |
| INC-2023-001 | 31 Jan 2023 | ION Cleared Derivatives | Delayed the CFTC Commitments of Traders report. Manual fallback | CONFIRMED |
| INC-2023-002 | May–Jun 2023 | MOVEit | Fourth-party exposure | CONFIRMED |
| INC-2023-003 | Oct–Nov 2023 | Mr. Cooper | ~1 week when customers could not pay their mortgages online. Late fees waived | CONFIRMED |
| INC-2023-004 | 8 Nov 2023 | **ICBC Financial Services** | Settlement disruption in the US Treasury market | CONFIRMED |
| INC-2023-005 | Nov 2023 | Fidelity National Financial | Mortgage-closing pipeline disruption | CONFIRMED |
| INC-2024-001 | Jan 2024 | EquiLend | Securities-lending utility offline | CONFIRMED |
| INC-2024-002 | May 2024 | Santander (Snowflake campaign) | SaaS credentials without MFA | CONFIRMED |
| INC-2024-003 | 31 May 2024 | DMM Bitcoin | ~USD 308m. FBI, NPA and DC3 attributed to DPRK | CONFIRMED |
| INC-2024-004 | 2024 | Evolve Bank & Trust | Banking-as-a-Service data concentration (~7.6m) | CONFIRMED |
| INC-2024-005 | 29 Jun 2024 | Patelco CU | About 2 weeks of service loss for ~502k members | CONFIRMED |
| INC-2024-006 | 19 Jul 2024 | **CrowdStrike (NOT an attack)** | Comparator: a faulty content update | CONFIRMED |
| INC-2024-007 | 31 Jul 2024 | **C-Edge Technologies** | ~300 Indian co-operative and regional rural banks | CONFIRMED |

**CrowdStrike comparator (19 July 2024).** A defective content update (Channel File 291) to CrowdStrike's Falcon sensor crashed about 8.5m Windows machines (Microsoft's estimate). Banks, exchanges' news services and payment front-ends were disrupted for hours to days. **There was no attacker.** It belongs in this history because:
1. it showed **concentration risk materialising at scale without any adversary**;
2. attackers immediately ran phishing campaigns exploiting it (CERT-In and others warned of this);
3. it sharpened the case for DORA's critical third-party oversight and the UK CTP regime.

**Classification rule:** an operational outage is *not* a cyberattack unless there is evidence of malicious action. This project keeps the CrowdStrike and Shinkin outages in the database with `is_cyberattack=False` and leaves them out of every attack statistic in the text.

## ERA F — 2025 to 7 November 2026: AI, APIs and payment-infrastructure attacks

This era is researched in the most depth here. Its records are *web-verified 2026-11-07* where marked. Much 2026 reporting is days old, and **figures are likely to be revised**.

### 2025

| ID | Date | Event | Key facts | Status |
|---|---|---|---|---|
| INC-2025-001 | 21 Feb 2025 | **Bybit** | ~USD 1.46–1.5bn of ETH, the largest theft on record. FBI attributed it to DPRK TraderTraitor (26 Feb 2025). Vector: a compromised developer machine at the wallet vendor (Safe{Wallet}), whose altered signing interface fooled the signers | CONFIRMED |
| INC-2025-003 | Feb–Jun 2025 | **Japan securities account takeovers** | FSA: 1,454 fraudulent trades across 6 firms (~JPY 95.4bn traded) in the first window; ~5,000 accounts in April alone; unauthorised sales of about JPY 571bn through June (as reported). The industry then mandated phishing-resistant MFA | CONFIRMED |
| INC-2025-002 | disclosed Apr 2025 | OCC email compromise | A regulator's supervisory emails were accessed | CONFIRMED |
| INC-2025-004 | May 2025 | Coinbase | Outsourced support agents bribed. USD 20m extortion demand refused. Estimated cost USD 180–400m | CONFIRMED |
| INC-2025-005 | 17–18 Jun 2025 | Bank Sepah / Nobitex (Iran) | Disruption, plus ~USD 90m of crypto *destroyed*. Claimed by "Predatory Sparrow" | REPORTED (attribution: claimed) |
| INC-2025-007 | Jul 2025 | CoinDCX (India) | ~USD 44m hot-wallet theft | REPORTED |
| INC-2025-006 | Aug 2025 | **Lotte Card (Korea)** | ~2.97m customers. On 31 Jul 2026 the FSC imposed a 1.5-month ban on new-card issuance (1 Aug – 15 Sep 2026) and a fine (~KRW 5bn, with reporting discrepancies). The PIPC fined KRW 9.62bn | CONFIRMED |

### 2026

| ID | Date | Event | Key facts | Status |
|---|---|---|---|---|
| INC-2026-001 | late Jan – Feb 2026 | **FICOBA (France)** | A civil servant's stolen credentials gave access to the national bank-account registry. ~1.2m accounts (IBAN, identity, address); no balances | CONFIRMED |
| INC-2026-002 | Apr 2026 | **Citizens Financial & Frost Bank via a vendor** | Everest group *claimed* 3.4m records. Frost: ~200k individuals (filing, as reported). Vendor reportedly Sefas (statement printing and tax documents) | REPORTED |
| INC-2026-003 | 13–24 Jun 2026 | **Iran ISC card systems** | Card, ATM and POS services suspended at Bank Melli, Saderat and Tejarat. Earlier wave claimed by "Black Wolves" | REPORTED |
| — | 31 Jul 2026 | **RBI Commercial Banks Cybersecurity, Technology Risk, Resilience and Assurance Framework Directions, 2026** | Effective immediately. Updated 1 Oct 2026. See `regulatory_history.md` | CONFIRMED (RBI page) |
| INC-2026-004 | Aug–Oct 2026 | **Payment and disbursement API abuse against Indian NBFCs** | CERT-In advisory CIAD-2026-0046 (9 Oct 2026, as reported). Hyderabad NBFC lost INR 3.3 crore in 87 minutes (19 Oct). A claim of two Mumbai NBFCs losing ~USD 2m via >700 transfers on 8–9 Oct is **unverified (single secondary source)** | REPORTED |
| — | 19 Oct 2026 | RBI advisory | Regulated entities told to *treat the environment as compromised* if credentials are exposed (as reported) | REPORTED |
| INC-2026-005 | detected 16 Oct, filed 21 Oct 2026 | **State Bank of India data leak** | 3,897 customers' records on the dark web (SBI). The actor claims 375k rows. No impact on funds or operations (SBI) | CONFIRMED (SBI filing via press) |
| — | 30 Oct 2026 | RBI supervisory push (Reuters, as cited by others) | RBI asked banks for proof of cyber compliance and reviewed bank–NBFC/fintech API links | REPORTED |
| INC-2026-007 | 4 Nov 2026 | **CERT-In / I4C "CRAFTY FALCON" advisory** | Critical-severity advisory. CSIRT-Fin named the actor. It reportedly uses publicly available AI-driven offensive tools against NBFCs, fintechs, PSPs and crypto exchanges | REPORTED (advisory text not retrieved) |
| INC-2026-006 | early Nov 2026; disclosed 4 Nov | **Crédit Mutuel Arkéa** | Fraudulent transfers, reportedly via an external service provider's platform. Amount **reported** at EUR 100–118m (USD 106–133m) and **not confirmed** by the bank. Customers are said to face no loss. On-chain analyst ZachXBT flagged it on 2 Nov, before the bank disclosed | REPORTED |
| INC-2026-008 | 6 Nov 2026 | **Shinkin Banks West Japan Center outage — NOT a cyberattack** | Communications equipment malfunction (banks' statement). 128 shinkin banks, ~3,430 branches; ATMs, counters and online services down for about 5 hours; East Japan Center unaffected | CONFIRMED (cause as stated; specific fault undisclosed) |

**Shinkin classification note.** The shinkin banks said the 6 Nov failure came from **an equipment malfunction, not a cyberattack**. We found no credible contrary evidence. This project records it as a *non-malicious comparator*. Some social-media and fringe sites framed it as an attack. **That framing is unsupported**, and the incident must not be counted as a cyberattack.

## How the problem changed, in one table

| Era | Dominant attacker objective | Dominant target | Dominant monetisation | Speed |
|---|---|---|---|---|
| A (<2000) | Theft | Bank's remote-payment service | Wires to accomplice accounts | Weeks to months |
| B (2000–09) | Data theft for carding | Processors, retailers | Card fraud markets | Months |
| C (2010–15) | Theft + **state coercion** | Banks' internet front-ends; processors | Cash-out crews; DDoS for signalling | Days |
| D (2016–19) | **Transaction manipulation** | SWIFT endpoints, ATM switches | Correspondent wires, ATM cash-outs, casinos | Hours |
| E (2020–24) | **Extortion** | Vendors, FMI utilities, mid-size firms | Ransom (crypto) | Hours (encryption), weeks (recovery) |
| F (2025–26) | Theft via **APIs/identity**; state revenue via crypto | NBFC/fintech APIs, third-party platforms, wallet vendors | Real-time rails → mule accounts → crypto | **Minutes** (87 min for INR 3.3 crore) |

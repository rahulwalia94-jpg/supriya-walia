# Executive Summary — Cyberattacks on Banks, 1994 to 7 November 2026

**Bottom line.** Across three decades, the attacks that worked best did not break the bank's core ledger. They **borrowed the bank's authority**: a corporate customer's password (Citibank 1994), the bank's own SWIFT endpoint (Bangladesh 2016), the bank's card-authorization switch (Cosmos 2018), and now partner **API credentials** and **third-party platforms** (India and France, 2026).

Over the same period, the biggest *disruptions* came from **shared dependencies**, malicious or not: C-Edge 2024, CrowdStrike 2024, Shinkin 6 Nov 2026.

We found **no confirmed case of a cyberattack directly causing a regulated bank's failure**. The realistic route to cyber-induced financial instability goes through prolonged outages, loss of data integrity, and correlated failures at shared infrastructure, all of which damage confidence. Capital is rarely the binding constraint.

Evidence conventions are in the README. The database (61 records) is a *curated sample*; no trend claim relies on its counts.

---

### A. Why are banks attacked, economically and geopolitically?
- **Economics.** Banks hold directly transferable value. Compromising *authorization* skips most of the costly monetisation chain that stolen data requires. The attacker's expected value is P(access) × P(execute before detection) × amount × (1 − laundering haircut) × P(not recalled). Defenders have pushed down access and execution; attackers answered with real-time rails and crypto off-ramps, which raise P(not recalled), and with specialist criminal services, which cut costs. Attackers therefore go after the **weakest node connected to bank money**: small banks, NBFCs, vendors and customers.
- **Geopolitics.** States use banks for **revenue** (North Korea, government-attributed: Bangladesh, Bybit, DMM), **coercion and signalling** (Iran's Ababil, DOJ-attributed), and **disruption in war** (GRU in Ukraine; Iran 2025–26, attribution claimed). Banks are symbolic national targets (Estonia 2007).

### B. Has the fundamental nature of attacks changed, or have the tools just become faster?
**Mostly the tools and the terrain, not the logic.** The core mechanism has been constant since 1994: get an *authenticated* channel to issue instructions that downstream systems trust. What changed:
1. **Where** trust is delegated (endpoints → switches → vendors → APIs → cloud identities).
2. **Speed** (weeks in 1994, hours in 2016, *minutes* in 2026: INR 3.3 crore in 87 minutes, as reported).
3. **Industrialisation** (RaaS, initial-access brokers).
4. **Monetisation** (correspondent wires → ATM cash-outs → crypto).

Extortion (ransomware) is the one genuinely new *business model* of 2016–2024.

### C. Are direct bank compromises or third-party dependencies the bigger current threat?
**Third-party and integration-point dependencies are the more important *current* threat to resilience**, and increasingly to theft as well. Evidence includes C-Edge, MOVEit, ION, EquiLend, ISC Iran, Citizens/Frost via a print vendor, Arkéa (third-party entry, REPORTED), Indian NBFC partner APIs, and the wallet vendors behind DMM and Bybit, plus two non-malicious mass outages. Direct compromises still produce large single losses. But in the database, the root cause is *never* a flaw in the core-banking ledger product itself. It's always at the seams (H7).

### D. What does the evidence actually establish about AI's role?
- **Established:**
  - Supervisors (BoJ, 23 Oct 2026; EBA, Jun 2026; IMF, May 2026) assess that frontier AI **raises** cyber risk by increasing speed and scale.
  - CERT-In/I4C (4 Nov 2026, REPORTED) describe an active campaign, **CRAFTY FALCON**, using publicly available AI-driven offensive tools against Indian financial firms.
  - Deepfakes are being used in fraud (FinCEN alert, 2024).
- **Not established:**
  - That AI agents *autonomously* carried out any bank theft.
  - Any measured increase in losses caused by AI. The EBA notes that **"data confirm that cyberattacks have not materially increased."**
  - The 2026 Indian API frauds rely on **stolen credentials**, which don't need AI.
- **Verdict:** AI is a credible *accelerant* with *unmeasured* realised impact.

### E. Can a cyberattack cause a bank run or insolvency, and under what conditions?
**Possible, but not historically observed for a regulated bank.**
- Direct losses have been small relative to capital: the largest bank SWIFT theft was about USD 81m, at a central bank.
- Customers are usually made whole.
- During a total outage, electronic withdrawals are mechanically blocked.

Failure becomes plausible when these combine:
1. a **data-integrity** loss (balances can't be trusted);
2. an outage lasting **weeks**, followed by withdrawals of flighty, uninsured, digital deposits once service returns;
3. a large theft at a **thin-capital** institution;
4. a **common-mode** failure across many banks;
5. coincidence with an existing credit or rate shock.

ICBC FS shows **operational illiquidity**: a solvent firm unable to settle. It was contained by parent support.

### F. What do Bangladesh Bank, ICBC FS, C-Edge and Crédit Mutuel Arkéa teach about systemic risk?
| Case | Lesson |
|---|---|
| Bangladesh Bank 2016 | *Message authentication is not legitimacy.* Correspondent friction (screening, time zones, a misspelling) stopped about 90% of the attempted amount. Systemic fix: SWIFT CSP |
| ICBC FS 2023 | A **small node in the deepest market** can create settlement risk. Containment relied on the parent and on market workarounds, not on the firm's own resilience |
| C-Edge 2024 | **Vendor concentration** turns one compromise into ~300 simultaneous bank outages. The network operator's **isolation** worked as a circuit breaker |
| Arkéa 2026 | Third-party entry plus **bank-to-crypto off-ramps** compress the recall window. **On-chain observers detected the loss before the bank disclosed it**, which changes how disclosure and confidence work |

**The arc:** risk has moved from *a single bank's endpoint* to *shared infrastructure and partner ecosystems*, and from days to minutes.

### G. How resilient are India, Japan, Europe and the US relative to their known exposures? (qualitative, INFERRED)
| Jurisdiction | Known exposure | Resilience assets | Assessment |
|---|---|---|---|
| **India** | Very fast digital-payment growth (UPI); large NBFC/fintech API ecosystem; small co-operative banks on shared vendors; active 2026 API fraud and the CRAFTY FALCON campaign | New RBI 2026 Directions (effective immediately); 6-hour reporting; NPCI network-level isolation; CERT-In/CSIRT-Fin advisories | **Exposure is currently outrunning implementation at the NBFC/fintech edge.** The RBI itself flagged inconsistent implementation. The core bank and NPCI layers have shown circuit-breaker capability |
| **Japan** | Shared shinkin and regional-bank utilities; 2025 brokerage account takeovers; frontier-AI concern (BoJ) | FSA 2024 guidelines; Delta Wall exercises; rapid MFA mandate; the Shinkin East/West split contained the 6 Nov outage | **Strong on supervisory reaction speed.** Concentration in shared centres is the visible weakness (shown by a *non-malicious* failure) |
| **Europe** | Third-party concentration; geopolitical threat; instant payments; Arkéa | DORA (since Jan 2025) with TLPT and CTPP oversight; VoP; ECB stress test | **The most comprehensive legal framework.** Arkéa shows that third-party transfer controls can still fail. DORA's effectiveness can't yet be judged empirically |
| **United States** | Huge, complex banks; dense vendor ecosystem; BaaS; card networks; Treasury market plumbing | 36-hour notification; SEC 8-K; NYDFS 500; FFIEC/Bank Service Company Act; FS-ISAC; deep private-sector capability | **Strong at large banks.** Weaker at the BaaS and mid-size edges (Evolve, Patelco) and in vendor oversight. Some regulatory reforms remain in flux (⚠️ status unverified) |

### H. What does this mean for Citi's US credit-card business, operational risk, CECL and stress testing?
*(Framework, not Citi data; see `citi_us_cards_cecl_impact.md`.)*
- The only *verified* Citi cyber incident in this research is the **2011 card portal breach**. Citi's 2020–24 consent orders concern risk and data governance (non-cyber), which is relevant because **CECL and stress testing depend on data integrity**.
- For a large card issuer, cyber risk is **mainly operational**: authorization and servicing outages, fraud, reimbursements and remediation. **Direct fraud losses are operational losses, not CECL credit losses.**
- Outage-driven delinquency is usually **technical**. It's identified by segment-invariant spikes, autopay failures and rapid cures, and treated through fee and interest reversals and re-aging within FFIEC limits. A **CECL overlay** is justified only if there is supportable evidence of *behavioural spillover* or of impaired collections that persists.
- In the hypothetical USD 100bn book model, a severe multi-week vendor outage gives about USD 1.2bn of operational loss and **USD 94m (technical only) to USD 845m (with spillover)** of additional credit loss. The credit result depends almost entirely on the spillover assumption, which stress tests should parameterise explicitly.

### I. Which major weaknesses remain unresolved as of 7 November 2026?
1. **Authenticated ≠ legitimate.** Partner APIs and third-party platforms can still issue high-value, real-time payments on static credentials without economic-plausibility checks (India 2026; Arkéa).
2. **Concentration** in shared vendors and processing centres for small banks (C-Edge; Shinkin, non-malicious; ISC).
3. **Visibility into vendors and fourth parties.** Banks learn of vendor breaches from leak sites (Citizens/Frost) or from blockchain analysts (Arkéa).
4. **Recall speed versus the speed of crypto off-ramps.**
5. **Identity proofing** against deepfakes and help-desk social engineering.
6. **Measurement.** No consistent, severity-weighted public incident statistics exist, and AI's role isn't measured forensically.
7. **Compliance versus resilience** (the RBI's own admission; SEC ICBC FS findings).
8. **Implementation status** of key reforms not verified here (US Basel III endgame operational risk; CIRCIA final rule; UK CTP designations).

### J. Three developments to monitor over the next five years
1. **Third-party oversight in practice:** DORA CTPP supervision and the UK CTP regime, plus RBI/NPCI vendor audits. Watch whether vendor-caused incidents fall *relative to* reporting.
2. **Payment-authorization controls on real-time rails and APIs:** credential binding, velocity caps, Verification/Confirmation of Payee, cross-bank mule freezing. Watch recall success rates and API-fraud losses in India and the EU.
3. **Forensically confirmed AI-enabled incidents:** whether supervisory warnings turn into measured changes in time-to-exploit and in loss severity, together with banks' post-quantum migration progress.

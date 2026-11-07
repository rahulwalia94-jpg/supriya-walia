# Part 5 — Deep Root Causes: Testing Hypotheses H1–H9

**Evidence-strength scale:** Strong / Moderate / Weak / Insufficient.

"Evidence" here means documented cases and official statistics. The curated incident database is used *only to illustrate mechanisms*, never to estimate frequency.

**Guiding caution:** none of the evidence below is experimental. Co-occurrence of a factor with incidents does not show that the factor caused them.

---

## H1 — Banking systems' complexity is outpacing risk controls
- **Theory:** each new channel (API, cloud, real-time rail, BaaS partner) adds interfaces and states that controls must cover. Attack surface grows combinatorially while control capacity grows linearly.
- **Historical evidence:** Capital One (cloud configuration); Citi 2011 (a web-portal authorization flaw); JPMorgan 2014 (one server without MFA); Heartland (PCI-compliant but breached).
- **Recent evidence:** NBFC API abuse in 2026 (new partner interfaces); Evolve (BaaS); the EBA June 2026 report says operational-resilience risks "have become increasingly interlinked and complex" (CONFIRMED).
- **Counterexamples:** Bangladesh Bank and Cosmos exploited *old, simple* weaknesses (poor segmentation, no reconciliation), not complexity. Many large complex banks have had no material public cyber loss.
- **Confounders:** complex banks are bigger and more visible, so their incidents are more likely to be disclosed.
- **Indicators:** number of third-party connections and APIs per bank; time to inventory assets; share of incidents involving unknown or unmanaged assets.
- **Strength:** **Moderate.**
- **Conclusion:** complexity creates *gaps in inventory and coverage* (the "one forgotten server" pattern) more than new kinds of vulnerability.

## H2 — Over-dependence on shared technology providers
- **Theory:** economies of scale lead many institutions onto the same vendor, so failures become correlated.
- **Historical evidence:** processor breaches (CardSystems, Heartland, RBS WorldPay); NotPetya via accounting software.
- **Recent evidence:**
  - C-Edge 2024 (~300 banks).
  - CrowdStrike 2024 (*non-malicious*).
  - ION 2023; EquiLend 2024; MOVEit 2023.
  - ISC Iran 2026.
  - Shinkin 6 Nov 2026 (*non-malicious*).
  - Arkéa 2026 (third-party entry, REPORTED).
  - Citizens/Frost via a print vendor, 2026.
  - The IMF May 2026 blog highlights shared cloud and payment networks (REPORTED).
- **Counterexamples:** most large *thefts* (Bangladesh, Cosmos, Bybit's loss at Bybit itself) were single-institution, although Bybit's entry point *was* a vendor.
- **Confounders:** vendor incidents are more often *publicly* noticed because many victims disclose them at once.
- **Indicators:** market share of top vendors per function; DORA register-of-information concentration metrics (from 2025); number of institutions per incident.
- **Strength:** **Strong** for *disruption*. **Moderate** for *theft*.
- **Conclusion:** concentration is the dominant source of **correlated operational outages**, whatever the cause (malicious or not).

## H3 — Real-time payments shrink the fraud-detection window
- **Theory:** irrevocable settlement in seconds means monitoring has to be pre-transaction and automated. Mule networks exploit that speed.
- **Historical evidence:** Bangladesh, where the *slowness* of correspondent banking and the weekend gap let FRBNY screening and the Sri Lankan query stop most of the money.
- **Recent evidence:**
  - India 2026: INR 3.3 crore in 87 minutes (REPORTED).
  - The UK brought in mandatory APP-fraud reimbursement (Oct 2024).
  - The EU Instant Payments Regulation requires Verification of Payee (from 9 Oct 2025).
  - The IMF WP/26/62 abstract says credit transfers and cards dominate scam payments.
- **Counterexamples:** card cash-outs (pre-real-time) were already very fast (12 hours in 2008). Real-time rails also enable *faster recall* when networks coordinate.
- **Confounders:** fraud growth is also driven by scams (social engineering), which happen regardless of the rail.
- **Indicators:** fraud loss per value transferred, by rail; recall success rate by time-to-report; mule account detection lag.
- **Strength:** **Moderate–Strong** for scams and API fraud.
- **Conclusion:** speed shifts the burden to *pre-authorization controls* (limits, payee verification, behavioural scoring).

## H4 — Cybercrime has become economically scalable through specialist services
- **Theory:** division of labour (initial access brokers, RaaS, bulletproof hosting, mule-herding-as-a-service, laundering services) lowers the fixed cost and the skill needed per attack.
- **Historical evidence:** carding forums (2000s); Zeus kits; cash-out crews hired across 24 countries (2013).
- **Recent evidence:** LockBit, ALPHV and RansomHub affiliate models (disclosed in law-enforcement takedowns, e.g., Operation Cronos 2024); ransomware against ICBC FS, Patelco, Evolve and C-Edge.
- **Counterexamples:** DPRK operations are vertically integrated state programmes, not market services.
- **Confounders:** detection and disclosure rules (SEC 2023; the US 36-hour bank rule) make extortion events more visible.
- **Indicators:** ransom payments (Chainalysis estimates are vendor data); leak-site victim counts; initial-access-broker listing prices.
- **Strength:** **Strong.**
- **Conclusion:** the *extortion* economy is industrialised. *Direct bank theft* still needs specialist skill or state backing.

## H5 — AI is lowering barriers and increasing speed
- **Theory:** LLMs and agents automate reconnaissance, exploit development and social engineering.
- **Historical evidence:** none before about 2023.
- **Recent evidence:**
  - IMF blog (7 May 2026), REPORTED via secondary coverage: AI can "dramatically reduce the time and cost" to find and exploit vulnerabilities. It cites a frontier model's controlled release, and notes current buffers (limited availability; proprietary banking code).
  - BoJ FSR (23 Oct 2026, CONFIRMED): frontier AI has "further heightened cybersecurity threats, as they could increase the speed and scale of cyberattacks."
  - EBA RAR (June 2026, CONFIRMED): frontier LLMs are "at the very least, further increasing cyber risk", **but** "data confirm that cyberattacks have not materially increased."
  - CERT-In CRAFTY FALCON (4 Nov 2026, REPORTED): use of AI-driven offensive tools.
  - FinCEN deepfake alert (Nov 2024).
- **Counterexamples:** the largest 2025–26 losses (Bybit, Arkéa) have no public evidence that AI was decisive. India's API fraud depends on **stolen credentials**, which don't need AI.
- **Confounders:** labelling. "AI-driven" makes better headlines and sells security products, and vendor reports carry commercial incentives.
- **Indicators:** time from vulnerability disclosure to exploitation (CISA KEV data); phishing click-through rates; deepfake-enabled fraud reports.
- **Strength:** **Moderate** for *assistance and speed* (official supervisors say so, citing capability). **Insufficient** for *measured incidence impact* or *autonomous* operation.
- **Conclusion:** AI is a credible **force multiplier**, and supervisors are treating it as a forward risk. The *realised* incremental loss is not yet measurable from public data.

## H6 — Geopolitical conflict increases disruptive campaigns against financial infrastructure
- **Theory:** states use financial disruption for coercion, signalling and war aims.
- **Historical evidence:** Estonia 2007 (state role unproven); Ababil 2012 (Iran, DOJ indictment); DarkSeoul 2013 (DPRK, government attribution); NotPetya 2017 (GRU).
- **Recent evidence:** Ukraine 2022 (GRU); Bank Sepah/Nobitex 2025 (claimed by Predatory Sparrow); ISC 2026 (claimed / unknown). The EBA (June 2026) cites an "increased risk of state-sponsored malicious cyber activity, including against the banking sector."
- **Counterexamples:** no confirmed destructive state attack on a major Western bank's core ledger has been publicly documented. Disruption has mostly been DDoS and wipers in conflict zones.
- **Confounders:** hacktivist personas create ambiguity over attribution.
- **Strength:** **Strong** that conflict *correlates* with disruptive campaigns in the conflict theatre. **Weak** for spillover into systemic Western banking.
- **Conclusion:** expect disruption to cluster in and around active conflicts and to hit availability more than integrity.

## H7 — Vendor governance and integration weaknesses matter more than vulnerabilities in core banking
- **Theory:** core ledgers are hardened and closely watched. The breaches come at the seams.
- **Evidence:** Target (HVAC vendor), SPEI (participant software), C-Edge, MOVEit, Bybit/DMM (wallet vendors), Citizens/Frost (print vendor), Arkéa (provider platform, REPORTED), India NBFC APIs.
- **Counterexamples:** Cosmos (bank switch), Bangladesh (bank SWIFT zone), Capital One (bank's own cloud) were *in-house* weaknesses, although at *interfaces* rather than in the core ledger.
- **Strength:** **Moderate–Strong**, with a refinement: the real root cause is **weaknesses at integration points**, whether the system on the far side is owned by a vendor or the bank.
- **Conclusion:** we found **no public case in the database where a core-banking ledger product's own vulnerability was the root cause.**

## H8 — Regulatory compliance does not always mean operational resilience
- **Evidence:**
  - Heartland was PCI-certified when breached.
  - SWIFT attestation is a *self*-attestation.
  - The SEC's ICBC FS order found inadequate incident preparation at a regulated broker-dealer.
  - The RBI said in Oct 2026 that existing requirements were not being implemented consistently (REPORTED).
  - The OCC's Capital One penalty was for risk-management failures at a heavily supervised bank.
  - The UK and EU response was to shift to *outcome* regimes (impact tolerances; DORA testing).
- **Counterexamples:** Tesco Bank: regulatory pressure produced fast refunds. Japan's JSDA MFA mandate cut account takeovers (expected; outcome data not yet verified).
- **Strength:** **Strong.**
- **Conclusion:** checklists measure whether controls *exist*. Resilience depends on whether they *work under stress*, which is why scenario testing and red-teaming (CBEST, TIBER-EU, DORA TLPT) matter.

## H9 — More incident reporting makes attacks look more frequent than they are
- **Theory:** new mandatory reporting (US 36-hour rule 2022; SEC 2023; DORA 2025; RBI 6-hour reporting; NCUA 72-hour rule 2023), better detection and media attention all raise *observed* counts.
- **Evidence for:**
  - The IMF WP/26/62 abstract notes cyber-enabled fraud "remains underestimated due to underreporting and data gaps." Its datasets are therefore themselves sensitive to reporting.
  - The **EBA (June 2026)** observes rising concern alongside data showing attacks "have not materially increased" (CONFIRMED).
  - Our own sample's density after 2020 is a selection artefact.
- **Evidence against:** some indicators that don't depend on reporting (ransomware leak-site postings; on-chain stolen-funds totals) also rose in parts of 2020–2025 (vendor data; REPORTED).
- **Strength:** **Moderate.**
- **Conclusion:** **raw incident counts are not trend evidence.** Severity-weighted, reporting-regime-adjusted measures are needed, and few exist publicly.

---

## Synthesis

The deepest root cause is structural. **Banks extend institutional trust (the ability to move money in the bank's name) to an ever-larger set of credentials, endpoints, vendors and partners, while verification of each request stays at the point of authentication rather than the point of economic legitimacy.** The SWIFT endpoint (2016), the ATM switch (2018) and the partner API (2026) are the same failure mode on three successive technologies.

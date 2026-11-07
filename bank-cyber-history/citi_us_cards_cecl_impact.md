# Part 7 — US Banks, Citi and Credit Cards: Operational Risk, CECL and Stress Testing

> **Disclaimer.** This section is an analytical framework. **No parameter here is Citigroup data.** Where an institution is named, only *publicly verified* incidents are attributed to it. Every vulnerability discussed is generic to the industry and hypothetical. Nothing here implies that any named institution has an undisclosed breach.

## 7.1 Verified institution-specific facts (public record)

| Institution | Verified cyber-relevant events | Status | Not cyber, but relevant operational events |
|---|---|---|---|
| **Citigroup** | 2011 breach of card online-account portal, ~360k accounts (INC-2011-001) | CONFIRMED | 2020 OCC (USD 400m) and Fed consent orders on risk management, data governance and internal controls, after the Aug 2020 Revlon erroneous payment (~USD 900m). 2024 OCC/Fed penalties (~USD 136m) for insufficient progress on data management. These are **operational and control** findings, **not cyberattacks** (CONFIRMED, training knowledge) |
| **JPMorgan Chase** | 2014 data breach, 76m households (INC-2014-002); 2012–13 Ababil DDoS target | CONFIRMED | — |
| **Bank of America** | 2012–13 Ababil DDoS target. Customer data exposed via vendor Infosys McCamish (Nov 2023 incident, ~57k customers, disclosed Feb 2024) | CONFIRMED (filing via state AG notice; training knowledge) | — |
| **Wells Fargo** | Ababil DDoS target | CONFIRMED | — |
| **Capital One** | 2019 cloud data breach (INC-2019-001); OCC USD 80m penalty | CONFIRMED | Completed acquisition of **Discover** on 18 May 2025 (CONFIRMED, training knowledge), making it a card *network* owner as well as an issuer |
| **American Express** | Exposure of card data via a third-party merchant processor (disclosed Mar 2024), not Amex systems | REPORTED (training knowledge) | — |
| **Discover** | No major cyber incident verified in this research | — | Pre-acquisition FDIC consent order (2023) on compliance; card-misclassification issue (non-cyber) |

## 7.2 Citi's North American card ecosystem: a conceptual map

Citi's US cards business has two main parts (public segment descriptions): **Branded Cards** (Citi-branded: Double Cash, Custom Cash, Premier/Strata, AAdvantage co-brand) and **Retail Services** (private-label and co-brand with retail partners). Its receivables are on the order of USD 150bn+ (public filings, order of magnitude only; not re-verified this session).

```
Acquisition → Underwriting → Account setup → Authorization → Statement/Billing → Customer payment → Collections → Charge-off → Recoveries
   |               |               |              |                 |                    |                  |             |             |
 digital apps   bureau data,    card issuance,  network (Visa/MC)  print/e-statement   ACH/debit/online  dialers, letters,  180 DPD      agencies,
 partner sites  models, KYC     tokens          issuer processor   vendors              bill-pay, branch   digital outreach  write-off    debt sales
```

**Cyber exposure at each stage (generic and hypothetical):**

| Stage | How a cyber event could affect it | Analogue in database |
|---|---|---|
| Acquisition and onboarding | Synthetic identities and deepfake KYC; partner-site compromise; application-data theft | Capital One 2019 (application data) |
| Underwriting | Bureau outage or compromise (data unavailable or tainted); model-input integrity | Equifax 2017 |
| Authorization | Issuer-processor outage (declines → spend loss, customer frustration); limit-manipulation fraud | RBS WorldPay; Cosmos; CrowdStrike |
| Customer payments | Payment portal or ACH-processing outage → **technical delinquency** | Mr. Cooper 2023; Patelco 2024 |
| Collections | Dialer or CRM outage → fewer contacts → lower cure rates | Generic |
| Fraud detection | Model or data-feed outage → higher fraud losses; attackers time fraud to outages | DDoS-as-cover pattern |
| Charge-offs and recoveries | Agency or vendor breach → recovery pause; debt-sale data exposure | Third-party vendor breaches |
| Retention | Reputational attrition after a breach; higher balance-transfer churn | Lotte Card (issuance ban) |
| Reimbursements | Zero-liability rules (Reg Z for credit cards) → issuer bears unauthorised-use losses | Tesco Bank (UK analogue) |

## 7.3 Framework: linking payment disruption to roll rates, cures, charge-offs and recoveries

**Definitions.**
- *Roll rate* `r(b→b+1)`: share of balances in delinquency bucket b this month that move to bucket b+1 next month.
- *Cure rate*: share that returns to current.
- *Charge-off*: under US card practice (FFIEC Uniform Retail Credit Classification policy), open-end credit is charged off at **180 days past due**.
- *Net charge-off (NCO)* = gross charge-offs − recoveries.

**Two kinds of delinquency during a cyber event:**

| | Technical delinquency | Genuine credit deterioration |
|---|---|---|
| Cause | Customer *couldn't* pay or the bank couldn't *post* the payment | Customer *can't afford* to, or *chooses not* to |
| Signature | A spike in Current→30 concentrated in the outage window, **across all risk grades**, including high-FICO, autopay and long-tenure customers | Concentrated in low-score, high-utilisation and recent-vintage segments; correlates with macro factors |
| Cure behaviour | Very high cure rate once systems are restored ("catch-up" payments) | Normal or lower cure rate |
| Payment-attempt data | Failed or unposted attempts, autopay failures | No attempts |
| Bureau and peer data | Same customers current on other lenders' products | Delinquent elsewhere too |
| Treatment | Reverse fees and interest; **re-age within FFIEC limits** (generally once in 12 months, twice in 5 years, after the customer shows willingness and ability to pay, i.e., 3 consecutive minimum payments). Don't furnish negative bureau data for bank-caused delinquency | Normal collections and provisioning |

**Diagnostic tests for separating the two:**
1. **Segment-invariance test.** Compare the Current→30 uplift between prime and subprime. Technical shocks lift *all* segments roughly proportionally. Credit shocks are concentrated in weaker segments.
2. **Autopay test.** Delinquency among autopay accounts is almost always technical.
3. **Payment-attempt logs.** Count failed or unposted payments during the outage window.
4. **Cure-curve shape.** Technical delinquency shows a sharp cure spike 1–2 cycles after restoration.
5. **External bureau triangulation.** Check whether the same customers' other trade lines are current.
6. **Difference-in-differences** against an unaffected control portfolio (e.g., another processor platform or a peer index).

## 7.4 When does a cyber event justify a CECL management overlay?

**CECL (ASC 326)** requires an allowance equal to *lifetime expected credit losses* on loans, using reasonable and supportable forecasts. The governing principles:

1. **Direct fraud losses are not CECL credit losses.** Unauthorised transactions, theft of the bank's own funds and customer reimbursements are **operational losses** (Basel event type: External Fraud), recognised when incurred. They are not part of the allowance for credit losses on the receivable. (Fraud *in origination*, i.e., synthetic identities that become charge-offs, is more nuanced. Practices vary and many issuers report it within credit losses. Policy should be explicit.)
2. **Technical delinquency that is expected to cure doesn't change lifetime expected credit loss.** Using raw roll rates mechanically during the outage month would *overstate* the allowance. An overlay, if one is used at all, may be **negative**: it neutralises model outputs distorted by bad inputs.
3. **An overlay becomes appropriate when there is reasonable and supportable evidence that the event changes expected *credit* behaviour.** For example:
   - persistent behavioural spillover (payment habits broken; customers who "go dark");
   - collections capacity impaired for months;
   - a large data breach credibly expected to raise *credit* losses through synthetic or identity-fraud origination;
   - the event coincides with or amplifies macro stress (e.g., a regional employer outage).
4. **Data-integrity uncertainty.** If the bank can't trust delinquency data (an integrity attack), a qualitative adjustment for *measurement uncertainty* is warranted, with documentation.
5. **Governance.** Document the trigger, quantify it (scenario or analogue analysis), set an exit criterion, and get independent review.

**Rule of thumb:** *Credit* = the customer's ability or willingness to pay has changed. *Operational* = the bank's ability to collect, post or protect has changed. The second only becomes the first if it lasts long enough to change customer behaviour.

## 7.5 Operational-risk capital and CCAR/DFAST stress testing

- **Current US capital framework:** large US banks' operational-risk capital under the Advanced Approaches uses internal models (AMA). The US **Basel III endgame** proposal (July 2023) would replace this with a standardised approach based on business indicators and loss history. **Final status as of Nov 2026 was not verified in this research** (see evidence_gaps.md), so we do not present it as effective.
- **Stress testing:** in the Federal Reserve's supervisory stress test, operational-risk losses are projected by supervisory models, partly a function of historical loss experience and firm size. Banks' own CCAR submissions include idiosyncratic operational-risk scenarios, and cyber is a standard candidate.
- **Integrating cyber into stress testing (recommended practice):**
  1. A scenario narrative (e.g., a 7-day card-processor ransomware outage plus a data breach).
  2. Direct operational losses (remediation, reimbursement, legal, regulatory).
  3. Revenue loss (interchange on declined authorizations; fee waivers).
  4. **Credit overlay via the roll-rate framework above, with technical and spillover components kept separate.**
  5. Liquidity: deposit outflow assumptions if deposit products are affected.
  6. Second-round reputation effects (attrition in new accounts and balances).

## 7.6 Sample portfolio stress analysis (HYPOTHETICAL)

Reproduced by `analysis/card_stress.py`. Output is in `analysis/card_stress_results.json`.

**Portfolio (illustrative):** USD 100bn receivables. Monthly Current→30 roll 2.0%. Rolls 30→60 35%, 60→90 75%, 90→120 85%, 120→150 90%, 150→180 92%. Recoveries 10% of gross charge-offs. This gives a baseline net charge-off of ≈ **USD 3.83bn over 12 months (~3.8%)**, broadly the order of magnitude of large US card books but **not calibrated** to any issuer.

**Formulas.**
```
Bal_{t+1}(30)   = Bal_t(C) · r_C30 · m_outage
Bal_{t+1}(b+1)  = Bal_t(b) · r_b · m_roll,outage          b ∈ {30..150}
Cure_t(b)       = Bal_t(b) · (1 − r_b · m_roll,outage)
GrossCO_t       = Bal_t(150) · r_150
At restoration: Excess(b) = max(Bal(b) − Bal_base(b), 0); Reversed = Excess · remediation_share
Spillover:      r_C30 ← r_C30 · spill_mult  for spill_months after restoration
NCO = Σ GrossCO_t · (1 − recovery_rate)
```

**Scenario assumptions and results (12-month horizon):**

| Scenario | Outage | C→30 multiplier | 30+ roll multiplier | Remediated share | Spillover | Δ credit loss, technical only (USD m) | Δ credit loss with spillover (USD m) | Operational-risk loss (fraud + ops + remediation, USD m) |
|---|---|---|---|---|---|---|---|---|
| Mild (24h) | 1 mo | 1.05 | 1.02 | 98% | +1% for 2 mo | **6** | **13** | 30 |
| Adverse (7-day) | 1 mo | 1.60 | 1.20 | 90% | +5% for 6 mo | **28** | **161** | 300 |
| Severe (vendor, multi-week) | 2 mo | 3.00 | 1.50 | 75% | +12% for 9 mo | **94** | **845** | 1,200 |

**Interpretation.**
- Even in the severe case, **operational losses exceed technical credit losses** by an order of magnitude. Whether credit losses become material **depends almost entirely on spillover**, i.e., on whether customer behaviour is permanently changed. That is exactly the judgement a CECL overlay must document.
- The "technical only" credit effect isn't zero, because delinquent balances that roll faster during the outage month (impaired collections) charge off before restoration. **Fast remediation and pausing late-stage charge-offs during an outage are effective mitigants.**
- Capital: in the severe case, the total pre-tax effect is ≈ USD 2bn (1.2bn operational + 0.85bn credit). That is material to earnings but manageable for a large, diversified bank. For a monoline card issuer the conclusion could differ.

## 7.7 Implications for Citi's US cards business (answer to Question H)

1. **The main cyber risk to a large card issuer is operational, not credit.** Authorization, servicing and payment-posting outages and fraud losses dominate. Credit effects are second-order unless outages are long or customer behaviour changes.
2. **Third-party concentration is the key exposure for card issuers industry-wide** (processors, statement and print vendors, collections agencies, cloud, bureaus). The 2026 Citizens/Frost print-vendor case is a direct analogue for *any* issuer. This is generic, not a claim about Citi's vendors.
3. **CECL discipline:** keep fraud and remediation losses in operational risk. Treat outage-driven delinquency as technical unless the diagnostic tests in §7.3 show spillover. Document overlays both ways.
4. **Stress testing:** add a severe cyber or vendor scenario with *explicit* credit-spillover parameters and remediation assumptions, and test the data-integrity case (delinquency data can't be trusted).
5. **Supervisory context (verified):** Citi has operated under OCC and Fed consent orders since 2020 on risk and data management. Regulators will judge any cyber event's handling partly through that lens, especially **data governance, which is also what CECL inputs depend on** (INFERRED).

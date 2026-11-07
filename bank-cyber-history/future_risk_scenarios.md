# Part 11 — What May Happen Next: Risk Register, 2027–2030

**Method.** These are qualitative ratings from 1 (low) to 5 (high) on six criteria, with equal weights. The score is their sum, out of 30. **These are analyst judgements, not empirical probabilities.** No reliable public probability estimates exist for most items. The "Evidence of current activity" column cites database records or official statements. Ratings are for the *global banking system* and will differ by jurisdiction.

| # | Threat | Exposure | Severity | Detection difficulty | Recovery complexity | Current activity (evidence) | Interconnectedness | **Score** | Basis |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Third-party / vendor concentration (malicious or not)** | 5 | 4 | 3 | 5 | 5 (C-Edge, MOVEit, Citizens/Frost, Arkéa reported, Shinkin and CrowdStrike non-malicious) | 5 | **27** | Evidence-backed |
| 2 | **Payment-API abuse and unauthorised disbursements** | 4 | 3 | 4 | 3 | 5 (CERT-In CIAD-2026-0046; RBI actions) | 4 | **23** | Evidence-backed (India); plausible elsewhere |
| 3 | **Real-time payment fraud, scams and mules** | 5 | 3 | 4 | 3 | 5 (IMF WP/26/62; UK/EU reimbursement and VoP rules) | 3 | **23** | Evidence-backed |
| 4 | **AI-assisted attacker automation** | 5 | 4 | 4 | 3 | 3 (BoJ, EBA, IMF warnings; CRAFTY FALCON reported; realised impact unmeasured) | 4 | **23** | Partly evidence-backed; magnitude speculative |
| 5 | **Digital identity compromise (deepfakes, account takeover, help-desk social engineering)** | 5 | 3 | 4 | 3 | 4 (Japan ATO 2025; Coinbase; FinCEN deepfake alert) | 3 | **22** | Evidence-backed |
| 6 | **Large FMI / settlement outage** | 3 | 5 | 3 | 5 | 2 (ICBC FS, ION, EquiLend as small nodes) | 5 | **23** | Plausible scenario |
| 7 | **Cloud-provider systemic failure or compromise** | 4 | 5 | 3 | 4 | 2 (no confirmed malicious systemic case; misconfiguration breaches common) | 5 | **23** | Plausible |
| 8 | **Data-integrity attack on ledgers or backups** | 3 | 5 | 5 | 5 | 1 (wipers in conflict zones; no confirmed integrity attack on a major bank ledger) | 4 | **23** | Plausible, low-frequency/high-impact |
| 9 | **Ransomware and extortion** | 4 | 3 | 2 | 4 | 5 (database Era E) | 3 | **21** | Evidence-backed |
| 10 | **Cross-border incident propagation** | 3 | 4 | 3 | 4 | 3 (Bangladesh across 4 jurisdictions; Arkéa → crypto) | 4 | **21** | Evidence-backed pattern |
| 11 | **Technology risk from banks' own AI adoption** (model errors, prompt injection in agentic workflows, data leakage) | 4 | 3 | 4 | 3 | 2 (supervisory concern; few public bank incidents) | 3 | **19** | Plausible |
| 12 | **State-linked disruptive campaigns** | 3 | 4 | 3 | 4 | 4 (Iran 2025–26; Ukraine; EBA warning) | 3 | **21** | Evidence-backed in conflict zones |
| 13 | **Quantum: "harvest now, decrypt later" and the migration burden** | 3 | 4 | 5 | 5 | 1 (no evidence of cryptographically relevant quantum computers; NIST PQC standards FIPS 203–205 published Aug 2024) | 4 | **22** | Long-term; the *transition* risk is real now |

### Plausible scenarios vs evidence-backed forecasts

**Evidence-backed: continuation is likely.**
- Vendor-originated incidents.
- API and real-time fraud in fast-digitising markets (India, Brazil, Southeast Asia).
- DPRK crypto theft with bank off-ramps.
- Ransomware against mid-size institutions and service providers.

**Plausible but not yet evidenced at scale:**
- An AI agent autonomously executing an end-to-end bank theft.
- A malicious compromise of a hyperscaler affecting many banks at once.
- A data-integrity attack on a systemically important bank's ledger.
- A cyber-triggered run.

**Not supported:**
- A specific date or target for a systemic attack.
- Quantum decryption of bank traffic before 2030 (no public evidence).

## Leading indicators to monitor

1. Supervisory incident-reporting statistics, now available under DORA, RBI and US rules. Watch *severity-weighted* counts, not raw counts.
2. Time from vulnerability disclosure to exploitation (CISA KEV additions).
3. Share of incidents with a third-party root cause (DORA register and reports).
4. Recall and freeze success rates on real-time rails.
5. AI-attributed incidents with **forensic confirmation** of what the AI actually did.
6. Concentration metrics for the top vendors per critical function.
7. Bank-to-crypto off-ramp volumes in theft cases.

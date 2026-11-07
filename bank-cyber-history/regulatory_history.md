# Part 8 — Global Regulatory Response: Chronology and Status

**Legend:**
- ✅ web-verified 2026-11-07 against a primary page or multiple sources.
- 📘 canonical (training knowledge); the date is well documented but was not re-fetched this session.
- ⚠️ status uncertain as of 7 Nov 2026. **Don't treat it as effective without checking.**

## India

| Date | Instrument | Scope and key requirements | Linked events | Status |
|---|---|---|---|---|
| 2 Jun 2016 | RBI *Cyber Security Framework in Banks* (circular) | Board-approved cyber policy, C-SOC, baseline controls, incident reporting to RBI within 2–6 hours | Bangladesh Bank (Feb 2016) and SWIFT-related frauds | 📘 |
| 2016–2018 | RBI SWIFT-related circulars | Strengthened SWIFT controls, reconciliation, STP between CBS and SWIFT | Bangladesh; Union Bank (2016); City Union (2018) | 📘 |
| 2019–2020 | RBI graded cyber framework for UCBs | Tiered by size | Cosmos (2018) | 📘 |
| Feb 2021 | RBI Master Direction on Digital Payment Security Controls | Governance, MFA, fraud monitoring for digital channels | Digital-payment growth | 📘 |
| 28 Apr 2022 (in force 28 Jun 2022) | CERT-In Directions under s.70B IT Act | **6-hour reporting** of specified cyber incidents; log retention 180 days; clock sync | Broad incidents | 📘 |
| 7 Nov 2023 (effective 1 Apr 2024) | RBI *Master Direction on IT Governance, Risk, Controls and Assurance Practices* | IT strategy committee, CISO, BCP/DR, IS audit, vendor risk | Consolidation of earlier circulars | 📘 |
| Apr 2023 | RBI Master Direction on Outsourcing of IT Services | Accountability stays with the RE; audit rights; concentration | Vendor risk | 📘 |
| 2024 | NPCI isolation of C-Edge; RBI/NPCI audits | Operational response | C-Edge (Jul 2024) | 📘 |
| **31 Jul 2026** | **RBI (Commercial Banks – Cybersecurity, Technology: Risk, Resilience and Assurance Framework) Directions, 2026** (RBI/DoS/2026-27/410) | **Effective immediately.** Applies to commercial banks (excludes SFBs, Payments Banks, LABs, per secondary sources). Chapters: board role; IT governance; risk management; **baseline cybersecurity and resilience** (asset inventory, DLP, third-party arrangements, cryptographic controls, STP, continuous surveillance, anti-phishing, VAPT, **red teaming**, BCP/DR, incident response, risk-based transaction monitoring, forensics); **C-SOC**. Incident reporting reportedly on RBI's DAKSH platform **within 6 hours**, plus CERT-In. **Updated 1 Oct 2026** | Rising attacks; consolidation | ✅ (RBI MD page id=13643 shows title, number, date and update; 6-hour figure from secondary sources) |
| 9 Oct 2026 | CERT-In advisory CIAD-2026-0046 (payment/disbursement APIs) | Advisory | NBFC API frauds | ✅ (press) |
| 19 Oct 2026 | RBI advisory: assume compromise on credential exposure | Advisory | NBFC API frauds | ✅ (press) |
| 30 Oct 2026 | RBI supervisory data requests on cyber compliance and API links | Supervisory | API frauds; SBI leak | ✅ (press citing Reuters) |
| 4 Nov 2026 | CERT-In + I4C CRAFTY FALCON critical advisory | Advisory: 24×7 monitoring, lower weekend thresholds, API controls, LLM-API usage monitoring | AI-assisted campaign | ✅ (press) |

**CSIRT-Fin:** a financial-sector CSIRT operating under CERT-In. It named the CRAFTY FALCON actor (as reported, ✅). Its exact founding and operational dates are ⚠️ not verified here.
**NPCI:** operates UPI, IMPS, RuPay, NFS and AePS. It exercises network-level controls (participant isolation). It is a payment-system operator under the PSS Act 2007, regulated by the RBI.

## United States

| Date | Instrument | Key points | Linked events | Status |
|---|---|---|---|---|
| 1999 | Gramm-Leach-Bliley Act; Interagency Safeguards Guidelines (2001) | Information-security programmes | — | 📘 |
| Oct 2005 / Jun 2011 | FFIEC *Authentication in an Internet Banking Environment* + 2011 Supplement | Layered security, anomaly detection | Zeus account takeovers | 📘 |
| Aug 2021 | FFIEC *Authentication and Access to Financial Institution Services and Systems* | Replaced the 2005/2011 guidance | — | 📘 |
| Apr 2014 | FFIEC joint statements on DDoS and ATM cash-out | — | Ababil; Unlimited Operations | 📘 |
| Jun 2015 → sunset 31 Aug 2025 | FFIEC Cybersecurity Assessment Tool (CAT) | Voluntary maturity tool; FFIEC pointed institutions to NIST CSF 2.0 / CISA CPGs | — | 📘 (sunset announced Aug 2024) |
| 1 Mar 2017; amended 1 Nov 2023 (phased to Nov 2025) | **NYDFS 23 NYCRR Part 500** | CISO, MFA, 72-hour notification; the 2023 amendments added 24-hour ransom-payment notice, Class A companies, governance | JPMorgan 2014 | 📘 |
| 18 Nov 2021 final; effective 1 Apr 2022; compliance 1 May 2022 | OCC/Fed/FDIC **Computer-Security Incident Notification Rule** | Banks notify their regulator **within 36 hours** of a notification incident; service providers notify bank customers ASAP | — | 📘 |
| Sep 2023 | NCUA 72-hour cyber-incident reporting rule | Credit unions | — (Patelco reported under it) | 📘 |
| 6 Jun 2023 | Interagency Guidance on Third-Party Relationships | Life-cycle risk management | Vendor incidents | 📘 |
| 26 Jul 2023 adopted; 8-K Item 1.05 from 18 Dec 2023 | **SEC cybersecurity disclosure rules** | Disclose material incidents **within 4 business days of the materiality determination**; annual Item 106 governance disclosure | — | 📘 |
| May 2024 | SEC Regulation S-P amendments | Incident response programmes; 30-day customer notification; larger entities by Dec 2025, smaller by Jun 2026 | — | 📘 |
| Dec 2024 | SEC settled order vs ICBCFS | Recordkeeping; inadequate incident preparation | ICBC FS | ✅ |
| Apr 2024 (proposed) | CISA CIRCIA rule (72h incidents / 24h ransom) | **Final rule status ⚠️ not verified** | — | ⚠️ |
| Jul 2023 (proposed) | Basel III endgame (standardised operational risk) | **Final status ⚠️ not verified** | — | ⚠️ |
| Bank Service Company Act (1962) | Examination authority over bank service providers | Used for core processors (via FFIEC significant service provider programme) | C-Edge-type risk | 📘 |
| 2012 → | FSOC designation of FMUs (Title VIII Dodd-Frank) | CHIPS, FICC/DTC etc. under heightened standards | — | 📘 |

## European Union

| Date | Instrument | Key points | Status |
|---|---|---|---|
| 2018 | TIBER-EU framework (ECB) | Threat-led red-teaming | 📘 |
| 2019 (applied Jun 2020) | EBA Guidelines on ICT and security risk management | Superseded for most entities by DORA | 📘 |
| 2019 | EBA Guidelines on outsourcing | Register; concentration | 📘 |
| 2024 | ECB cyber resilience stress test (109 banks) | Recovery from a successful attack; results Jul 2024 | 📘 |
| **Entered into force 16 Jan 2023; applies from 17 Jan 2025** | **DORA, Regulation (EU) 2022/2554** | ICT risk management; **major ICT-incident reporting** (initial report within 4h of classification / 24h of awareness, under RTS); resilience testing including **TLPT**; third-party risk and **register of information**; **oversight of critical ICT third-party providers (CTPPs)** by the ESAs | 📘 |
| Nov 2025 | ESAs' first designation of CTPPs under DORA | ⚠️ (believed to have happened; list not verified this session) | ⚠️ |
| 17 Oct 2024 (transposition) | NIS2 Directive | Banks are covered, but DORA is *lex specialis* | 📘 |
| 2024 → 9 Oct 2025 | Instant Payments Regulation (EU) 2024/886 | **Verification of Payee** mandatory for euro-area PSPs from 9 Oct 2025 | 📘 |
| Jan 2025 | CRR3 operational-risk standardised approach applicable | EBA RAR confirms applicability since 2025 | ✅ (EBA RAR text) |
| Jun 2026 | EBA Risk Assessment Report | Frontier LLMs "at the very least, further increasing cyber risk"; "data confirm that cyberattacks have not materially increased"; geopolitics increases state-sponsored risk | ✅ |
| ENISA | EU cybersecurity agency; threat landscape for finance (2024 report on the finance sector) | 📘 |

## United Kingdom

| Date | Instrument | Key points | Status |
|---|---|---|---|
| 2014 → | CBEST (Bank of England) | Intelligence-led penetration testing of systemic firms | 📘 |
| 2016 → | Bank of England FPC cyber work; 2018 FPC "impact tolerance" for core payments | Firms should be able to resume vital services | 📘 |
| Oct 2018 | FCA Final Notice: Tesco Bank (GBP 16.4m) | Enforcement precedent | ✅ (URL reachable) |
| Mar 2021 (PRA SS1/21; FCA PS21/3); effective **31 Mar 2022**; full compliance **31 Mar 2025** | **Operational resilience**: important business services, impact tolerances, mapping, scenario testing | 📘 |
| FSMA 2023; PRA/FCA PS16/24 (Nov 2024), effective 1 Jan 2025 | **Critical Third Parties regime**. HM Treasury designates CTPs, then regulators oversee | ⚠️ designations as of Nov 2026 not verified |
| 7 Oct 2024 | PSR mandatory APP-fraud reimbursement (FPS) | Up to GBP 85k per claim | 📘 |

## Japan

| Date | Instrument | Key points | Status |
|---|---|---|---|
| Jul 2015 (updated 2018, 2022) | FSA *Policy Approaches to Strengthen Cybersecurity in the Financial Sector* | Supervisory priorities | 📘 |
| 2016 → | FSA "Delta Wall" cross-industry exercises | Annual | 📘 |
| Oct 2024 | FSA *Cybersecurity Guidelines for the Financial Sector* | Comprehensive supervisory expectations | 📘 |
| 2025 | FSA/JSDA response to securities account takeovers | Mandatory phishing-resistant MFA for brokerage login and trades | ✅ (FSA Apr 2025 release reachable; MFA mandate from secondary sources) |
| May 2025 | Active Cyber Defense law | Government powers for proactive defence | 📘 |
| 23 Oct 2026 | **BoJ Financial System Report (Oct 2026)** | Frontier AI "could increase the speed and scale of cyberattacks"; reviews efforts by institutions and authorities | ✅ |
| Bank of Japan | Oversight of BOJ-NET and Zengin system; BoJ on-site examinations include cyber | 📘 |

## International

| Date | Body / instrument | Key points | Status |
|---|---|---|---|
| 1999 | FS-ISAC founded | Information sharing | 📘 |
| Dec 2004 (v4.0 Mar 2022; future-dated requirements 31 Mar 2025) | PCI DSS | Card data standard | 📘 |
| Feb 2014; **CSF 2.0 26 Feb 2024** | NIST Cybersecurity Framework | Adds "Govern" function | 📘 |
| Jun 2016 | CPMI-IOSCO *Guidance on cyber resilience for FMIs* | FMIs should resume critical operations within 2 hours after disruption, while being "cyber-aware" about integrity | 📘 |
| May 2016; mandatory attestation 2017 | **SWIFT Customer Security Programme / CSCF** | Mandatory and advisory controls; annual attestation; independent assessment required from 2021 | 📘 |
| Oct 2016 | G7 Fundamental Elements of Cybersecurity for the Financial Sector | Principles | 📘 |
| 2018 | FSB Cyber Lexicon | Common terms | 📘 |
| Oct 2020 | FSB Effective Practices for Cyber Incident Response and Recovery | Toolkit | 📘 |
| Mar 2021 | BCBS Principles for Operational Resilience; revised Principles for Sound Management of Operational Risk | — | 📘 |
| Dec 2023 | FSB toolkit on third-party risk | — | 📘 |
| Apr 2025 | FSB Format for Incident Reporting Exchange (FIRE) | Harmonised reporting | 📘 |
| Apr 2024 | IMF GFSR Ch. 3 on cyber risk and macro-financial stability | — | 📘 |
| 27 Mar 2026 | IMF WP/26/62 (Khiaonarong & Zheng) | ~10% of cyber events in finance; fraud nearly tripled; underreporting | ✅ (listing/abstract) |
| 7 May 2026 | IMF blog on AI and cyber financial-stability risk | Treat cyber as core financial-stability issue | ✅ (via secondary sources; IMF page blocked 403) |

## Which events drove which rules (documentary links)

| Event | Regulatory consequence | Evidence of the link |
|---|---|---|
| Zeus account takeovers (2009–10) | FFIEC 2011 Supplement | The supplement explicitly cites increasing online account-takeover fraud (📘) |
| Bangladesh Bank (2016) | SWIFT CSP; RBI SWIFT circulars; FRBNY procedures | SWIFT launched CSP in direct response (📘, SWIFT statements) |
| JPMorgan (2014) | NYDFS Part 500 MFA emphasis | NYDFS officials cited bank breaches; indirect link (INFERRED) |
| Tesco Bank (2016) | FCA enforcement precedent on response | FCA Final Notice (✅) |
| Capital One (2019) | OCC enforcement on cloud risk management | OCC release (✅) |
| CrowdStrike (2024, non-malicious) | Supports DORA CTPP and UK CTP regimes | Policy commentary (INFERRED; regimes predate it) |
| C-Edge (2024) | RBI/NPCI audits of service providers | NPCI statement (📘) |
| ICBC FS (2023) | SEC recordkeeping order; Treasury-clearing resilience focus | SEC order (✅) |
| India API frauds (2026) | CERT-In CIAD-2026-0046; RBI advisories; supervisory requests | Press (✅) |
| Japan account takeovers (2025) | Mandatory phishing-resistant MFA | FSA/JSDA (✅/📘) |
| Lotte Card (2025) | First Korean business suspension for a hack | FSC decision (✅) |

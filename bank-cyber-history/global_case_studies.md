# Global Case Studies (Part 14 format: Before → Trigger → Mechanism → Detection → Impact → Aftermath → Counterfactual → Lesson)

Records are in `data/incidents.csv`. Status labels follow the README.

---

## 1. Bangladesh Bank, February 2016 (INC-2016-001) — CONFIRMED, evidence 5/5

**Before.** Bangladesh Bank is Bangladesh's central bank. It held part of its foreign reserves in a US-dollar account at the **Federal Reserve Bank of New York (FRBNY)**. To move those dollars it sent **SWIFT MT103/MT202 messages** from its *own* local SWIFT Alliance Access installation. SWIFT is a messaging network that carries authenticated instructions. It does not hold money; the money sat at FRBNY. Bangladesh Bank's operations also relied on **printed confirmations** for reconciliation.

**Trigger.** The FBI's 2018 criminal complaint against Park Jin Hyok (CONFIRMED) traces the initial compromise to **spear-phishing emails** to Bangladesh Bank staff, with access established in early 2015, about a year before the theft.

**Mechanism (conceptual).**
1. The attackers moved laterally to the servers running SWIFT Alliance Access.
2. They installed malware that could (a) submit messages using the bank's legitimate credentials and keys, (b) **change the local database** so the fraudulent messages didn't appear, and (c) **stop or alter the printed confirmations** staff used to check transactions. These details come from forensic reporting by BAE Systems and others (REPORTED, consistent with the FBI complaint).
3. Timing: messages went out on Thursday night, 4 Feb (Dhaka). Friday and Saturday are the Bangladeshi weekend. Monday 8 Feb was the Lunar New Year holiday in the Philippines. Every party's working hours were out of sync, which held back detection and recall.
4. **35 instructions, about USD 951m**, were sent to FRBNY to pay beneficiaries in the Philippines and Sri Lanka.

**What was NOT compromised.** SWIFT's central network was not breached. The attack hit the **customer's local SWIFT-connected endpoint**. That distinction drives the whole policy response: SWIFT's answer was to impose *customer-side* controls (the CSP).

**Detection and what stopped most of it.**
- FRBNY's automated screening (sanctions and name matching) **held 30 of the 35 instructions**. One reported trigger was that "Jupiter", the name of the RCBC branch's street, matched a sanctioned vessel name (REPORTED).
- **5 instructions (USD 101m) were executed.**
  - **USD 20m to Sri Lanka** ("Shalika Foundation") was misspelled "fandation". The intermediary (Deutsche Bank) and the beneficiary bank (Pan Asia Banking) queried it, and it was **reversed**.
  - **USD 81m** went to four accounts at **RCBC's Jupiter Street branch in Makati (Philippines)**. They had been opened in May 2015 with fake identities. The money went through a remittance company into **casinos** (Solaire, City of Dreams), where the chips-to-cash cycle broke the audit trail. The Philippines had no AML coverage of casinos then; that gap was closed in 2017.
- Bangladesh Bank staff found the printer problem on 5 Feb, and with the weekend, slow communication with FRBNY.

**Impact.**
- Lost to reserves: about **USD 81m**, less recoveries. A Philippine casino junket operator returned about **USD 15m** (REPORTED). **Most of the USD 81m has not been publicly reported as recovered.**
- No payment-system disruption. No customer losses (these were central-bank funds).
- The central bank governor resigned (March 2016).

**Aftermath.**
- **SWIFT Customer Security Programme (May 2016)** and the **Customer Security Controls Framework**, with mandatory self-attestation from 2017. Daily validation reports and payment-controls services followed.
- FRBNY strengthened its screening and procedures. Many central banks reviewed their correspondent operations.
- Philippine **BSP fined RCBC PHP 1bn** (≈USD 21m) in 2016. The RCBC branch manager was convicted of money laundering in 2019. Bangladesh Bank sued RCBC and others in US courts; the litigation history is complex and the outcome is not traced here.
- The **DOJ complaint (Sept 2018)** named Park Jin Hyok and the Lazarus/DPRK apparatus, linking this case to Sony 2014 and WannaCry 2017. *Evidentiary limits:* this is an indictment, not a conviction. The defendant is not in custody, and the attribution rests on technical overlaps (malware code, infrastructure, accounts) described in the complaint.

**Counterfactual.** Several things would probably have stopped most of the loss:
- separating the SWIFT environment from the general network;
- integrity checks on the local SWIFT database;
- daily *independent* reconciliation against FRBNY statements rather than local printouts;
- a business-hour or anomaly hold on large payments to new beneficiaries.

**Lesson.** **Message authentication is not transaction legitimacy.** Whoever controls the endpoint speaks with the institution's voice, and downstream banks are designed to trust that voice. The same lesson comes back with **API keys in 2026**.

---

## 2. Cosmos Co-operative Bank, India, August 2018 (INC-2018-003) — CONFIRMED, evidence 4/5

**Before.** Cosmos was one of India's largest urban co-operative banks (Pune). It issued Visa and RuPay debit cards. Card transactions flowed from an ATM (anywhere in the world), through the card network, to the bank's **ATM switch**, which asked **core banking** whether the account had funds and returned approve or decline.

**Trigger.** Malware in the bank's environment. The initial vector has not been publicly confirmed.

**Mechanism.**
1. Attackers set up a **proxy switch**: a rogue component that intercepted authorization requests for selected cards and *approved them itself*, without asking core banking (REPORTED; consistent with the US-CERT FASTCash alert TA18-275A, Oct 2018).
2. **11 Aug 2018 (Saturday):** about 12,000 Visa withdrawals (≈INR 78 crore) in ~28 countries and about 2,800 RuPay withdrawals in India (≈INR 2.5 crore), all with cloned cards, over roughly 2–7 hours. Transaction counts vary by source, with about 14,849 total often cited.
3. **13 Aug 2018:** three SWIFT transfers (≈INR 13.9 crore) to an account at Hang Seng Bank, Hong Kong.
4. Total: about **INR 94.4 crore (≈USD 13.5m)**.

**Detection and controls.**
- *Failed:* integrity of the switch–core interface; velocity rules for withdrawals across many countries; weekend monitoring; stand-in processing logic. Visa's network saw an unusual pattern but forwarded approvals that came from the issuer's own switch.
- *Worked:* the bank shut its card and online channels once alerted. Indian police arrested domestic cash-out mules.

**Impact.** A direct loss to the bank. Customer balances were not debited (the bank's statement). Card and online services were suspended for days.

**Aftermath.** RBI advisories and cyber-security frameworks for urban co-operative banks, phased in from 2019 with a graded approach. The US Treasury, FBI and DHS issued the FASTCash alert (Oct 2018) and later a FASTCash 2.0 alert (2020). These link the TTPs to DPRK, so **the Cosmos case is attributed to Lazarus only by technique pattern and vendor analysis (Medium confidence)**.

**Counterfactual.**
- Cryptographic or integrity verification of authorization responses.
- Real-time reconciliation between switch approvals and core-banking debits.
- Velocity and geography limits at the network level.

**Lesson.** Control of the *authorization answer* is control of the money. Small banks with outsourced or poorly monitored switches are the weakest node of a global card system.

---

## 3. ICBC Financial Services, November 2023 (INC-2023-004) — CONFIRMED, evidence 4/5

**Before.** **ICBC Financial Services LLC (ICBCFS)** is a US-registered **broker-dealer**: a subsidiary of Industrial and Commercial Bank of China, the world's largest bank by assets. It is not the bank's US branch. It cleared and settled trades, including **US Treasury and repo** trades for clients, as a member of FICC (Fixed Income Clearing Corporation), with BNY Mellon in the settlement chain.

**Trigger.** Ransomware, discovered 8 Nov 2023. LockBit claimed it, and widespread reporting (Reuters, FT, Bloomberg) attributed it to a LockBit affiliate. The entry vector was **not officially disclosed**. Security researchers widely suspected the then-current *Citrix Bleed* vulnerability (CVE-2023-4966) (REPORTED / INFERRED).

**Mechanism.** Systems were encrypted. ICBCFS disconnected from markets and could not complete the settlement messages for trades it had cleared.

**Impact.**
- **Settlement:** Treasury trades executed on 8–9 Nov were left unsettled for a time. Market participants rerouted trades. SIFMA coordinated. Reports said the firm **owed BNY Mellon around USD 9bn** temporarily and that the **parent injected capital** (REPORTED, FT/Reuters, not officially quantified). Settlement information was reportedly **carried by messenger on USB sticks** (REPORTED).
- **Market:** a localised liquidity disruption in Treasury repo. No measurable systemic price effect was reported.
- ICBC announced that the trades had been settled (official statement, Nov 2023).

**Regulatory findings.** The **SEC settled** with ICBCFS in December 2024 on **recordkeeping violations**: a cease-and-desist order and a censure, **no civil penalty** because of the firm's cooperation and remediation, no admission. The SEC order found the root causes included **inadequate preparation for a cybersecurity incident** (CONFIRMED via Banking Dive / Legal Dive reporting of the order). We found no Federal Reserve or FINRA action specifically on the ransomware.

**Why this was not a parent-group failure.**
1. The affected entity was a small, separately capitalised broker-dealer.
2. The parent had overwhelming capacity to provide liquidity and capital.
3. ICBC's core banking networks were not reported as affected.
4. Counterparties' exposure was to *settlement delay*, not to a credit loss.

**Counterfactual.** Rapid patching of the internet-facing remote-access appliance; immutable backups; a rehearsed manual settlement playbook; record-retention systems separate from production.

**Lesson.** A **small node inside the world's deepest, most important market** can cause settlement risk. Containment depended on *parent support and market workarounds*, not on the node's own resilience. That is fragility hidden behind strength.

---

## 4. C-Edge Technologies, India, July 2024 (INC-2024-007) — CONFIRMED, evidence 4/5

**Before.** C-Edge Technologies, a joint venture of TCS and SBI, provided **core banking and payment connectivity** to about **300 co-operative banks and regional rural banks (RRBs)**. These are small institutions that can't run their own technology. They connected to NPCI's retail payment systems (UPI, IMPS, AePS, the NFS ATM network) *through* C-Edge.

**Trigger.** A ransomware attack on C-Edge systems, disclosed 31 Jul 2024. Vendor research (Group-IB and others) attributed it to **RansomEXX v2.0** and reported an entry via a **misconfigured Jenkins server** at a related provider. These are **vendor claims, not officially confirmed** (REPORTED).

**Containment.** **NPCI temporarily isolated C-Edge from the retail payment systems**, so customers of the affected banks could not use UPI, IMPS or ATMs. NPCI said the affected banks account for about **0.5% of national payment-system volumes** (REPORTED from the NPCI statement). Reconnection was staged after security audits, over about 1–3 days for most banks (REPORTED).

**Why a service-provider disruption differs from direct bank compromise.**

| Dimension | Direct bank compromise (e.g., Cosmos) | Service-provider compromise (C-Edge) |
|---|---|---|
| Whose systems | Bank's own | Vendor's (shared by many banks) |
| Number of banks hit | One | ~300 at once (correlated) |
| Customer experience | Outage or fraud at one bank | **Identical** outage across many banks |
| Containment lever | Bank shuts its channels | **Network operator isolates the vendor** |
| Legal responsibility | Bank | Bank stays accountable to customers and regulator for outsourced services (RBI outsourcing rules) |
| Systemic profile | Idiosyncratic | Concentrated, but these small banks are a small share of volume |

**Lesson.** NPCI's isolation was a **circuit breaker that worked**. It traded a short, total outage for ~300 small banks against the risk of contagion into the national switch. The underlying problem remains: **concentration of small-bank technology in a few vendors** is a structural, policy-created dependency.

---

## 5. Crédit Mutuel Arkéa, November 2026 (INC-2026-006) — REPORTED, evidence 3/5 (developing)

**Before.** Crédit Mutuel Arkéa is a French co-operative banking group (Brittany and the South-West) that also owns the online bank **Fortuneo** and Belgium's **Keytrade Bank**. It is a significant institution under ECB supervision (CONFIRMED status; details not re-verified here).

**Trigger (as reported).** Attackers reportedly came in **through an external service provider's platform** rather than through Arkéa's core systems. The bank has **not disclosed the root cause** (REPORTED; sources conflict on whether the bank's own account was used).

**Mechanism (as reported).**
1. Fraudulent transfers were made to other banks.
2. Presse-citron, citing an unnamed source, reported that funds left through Fortuneo accounts and were **converted to crypto via accounts opened with false identities** (UNCONFIRMED).
3. On-chain investigator ZachXBT flagged a theft of **>USD 106m from an EU entity on 2 Nov 2026**, before the bank disclosed it.

**Amount.** Le Télégramme reported **EUR 118m (≈USD 133m)**. Other outlets reported "around EUR 100m." The **bank has not confirmed any figure**. It told Le Parisien that some funds had been **frozen** and the amount was still being assessed (REPORTED). → Recorded as *stolen = undisclosed*. The reported range is kept in `stolen_orig`.

**Bank statements (4 Nov 2026).** The attack was "under control" (*maîtrisé*). Customer accounts were not accessed. **Customers will suffer no financial loss.** Some transfers were delayed while security checks finished. Customers were warned about follow-on phishing (CONFIRMED via Euronews/AFP).

**Regulatory and legal.** Banque de France was reportedly notified. Some outlets reported a Paris prosecutor's investigation, which **this project could not verify** from a primary source.

**Analysis (INFERRED).**
- The loss falls on the bank's own resources. Arkéa's reported group equity is in the billions of euros (not re-verified this session), so a loss of about EUR 100m would hurt profitability but is **very unlikely to threaten solvency**.
- **The "information came from the blockchain before the bank" problem:** public ledgers now make some bank losses visible to outsiders *before* disclosure. That changes how disclosure and confidence work.
- **Third-party entry point plus crypto off-ramp:** the 2026 version of Bangladesh Bank's correspondent-plus-casino chain, but compressed from days to hours.

---

## 6. India 2026: API disbursement abuse, CRAFTY FALCON, SBI leak and the RBI response (INC-2026-004/005/007) — REPORTED / CONFIRMED mix

**Sequence of events (all 2026).**

| Date | Event | Status |
|---|---|---|
| 31 Jul | RBI issues the Commercial Banks Cybersecurity … Framework Directions, 2026 (effective immediately) | CONFIRMED (RBI page) |
| ~Aug–Oct | Wave of unauthorised loan-disbursement and payout transfers at NBFCs and digital lenders | REPORTED |
| 8–9 Oct | Two Mumbai NBFCs reportedly lost ~USD 2m via >700 transfers through a compromised disbursement API linked to a partner bank | **Single secondary source; could not corroborate** |
| 9 Oct | CERT-In advisory **CIAD-2026-0046**: "Threat Actors Exploiting Payment and Disbursement APIs for Unauthorized Fund Transfers in BFSI Entities" | REPORTED (multiple outlets) |
| 16 Oct | SBI alerted (threat-intel vendor, Defence Cyber Agency, CERT-In) that customer data was on the dark web | CONFIRMED (SBI filing via press) |
| 19 Oct | Hyderabad NBFC loses **INR 3.3 crore in 87 minutes** across ~183 disbursals to 52 accounts. ~INR 40 lakh frozen | REPORTED (police complaint via press) |
| 19 Oct | RBI advisory: treat environment as compromised if credentials are exposed | REPORTED |
| 21 Oct | SBI exchange filing: 3,897 customers affected; no impact on funds | CONFIRMED |
| 30 Oct | Reuters: RBI asks banks for proof of compliance and reviews API links with NBFCs and fintechs | REPORTED |
| 4 Nov | CERT-In + I4C **CRAFTY FALCON** critical advisory (AI-assisted campaign) | REPORTED |

**Mechanism of API disbursement abuse (conceptual).**
1. An NBFC holds an account at a partner bank and uses that bank's **payout API** to disburse loans.
2. The API trusts any request signed with the NBFC's **API credentials** (key, secret, certificate, IP allowlist).
3. If those credentials are stolen (from code repositories, cloud configuration, developer laptops, or the NBFC's own app server), the attacker can **call the disbursement API directly** and send real-time IMPS/UPI/NEFT payouts to mule accounts.
4. The bank's systems see *authenticated, well-formed* requests. Unless there are **velocity limits, beneficiary allowlists or anomaly scoring**, they execute.

**The parallel with Bangladesh Bank is exact:** an authenticated channel trusted downstream, with the compromise at the weaker participant.

**What the evidence says about AI here.** CERT-In reportedly says CRAFTY FALCON uses **publicly available AI-driven offensive security tools** to find vulnerabilities and exploit them quickly, and it recommends monitoring LLM API usage. **No public evidence reviewed establishes that autonomous AI agents executed the fund transfers.** The defensible statement is: *AI-assisted reconnaissance and exploitation has been officially reported. The degree of autonomy and its marginal contribution are unknown.*

---

## 7. Further short cases

### Capital One 2019 (INC-2019-001) — CONFIRMED
- *Before:* an early, aggressive cloud adopter.
- *Trigger:* a misconfigured WAF let an attacker retrieve cloud role credentials via server-side request forgery.
- *Mechanism:* listed and copied storage buckets of card-application data (2005–2019).
- *Detection:* a 17 Jul 2019 responsible-disclosure email, about 4 months later.
- *Impact:* ~100m US and ~6m Canadian individuals; ~140k SSNs.
- *Aftermath:* OCC USD 80m penalty and consent order (Aug 2020); USD 190m class settlement; attacker convicted in 2022.
- *Lesson:* cloud risk is **identity and configuration** risk. Card *acquisition* data is the crown jewel.

### Tesco Bank 2016 (INC-2016-002) — CONFIRMED
- Predictable card numbers plus weak fraud rules let attackers generate usable card details.
- GBP 2.26m was taken over a weekend, and the bank refunded customers.
- The **FCA fined Tesco Bank GBP 16.4m** for failing to exercise due skill, care and diligence in design, detection and response. The fine was discounted for exemplary cooperation.
- *Lesson:* regulators penalise **slow response** as well as failure to prevent.

### Patelco Credit Union 2024 (INC-2024-005) — CONFIRMED
- Initial access on 23 May 2024 (per the breach notice), then ransomware on 29 Jun.
- About **2 weeks** of lost online banking, transfers, Zelle and balance inquiries for ~502k members. Services came back in stages (most by 15 Jul). 726k individuals were later notified of a data breach. Fees were waived.
- *Lesson:* a prolonged outage at a USD 9.7bn deposit institution caused **no reported run**. Customers *couldn't* move money electronically during the outage. The costs showed up as litigation, fee waivers and reputational damage.

### Japan securities account takeovers 2025 (INC-2025-003) — CONFIRMED
- Phishing sites and infostealers captured broker logins.
- Compromised accounts dumped holdings and bought thinly traded stocks: **account takeover as market manipulation**.
- *Response:* the FSA and JSDA moved the industry to **phishing-resistant MFA** (passkeys). Brokers made partial compensation.
- *Lesson:* SMS and password authentication is now inadequate for any account that can move value.

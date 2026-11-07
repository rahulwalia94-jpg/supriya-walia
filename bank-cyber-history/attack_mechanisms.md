# Part 4 — How Each Attack Mechanism Works, Seen from Inside a Bank

This section is **conceptual and defensive**. It contains no exploit procedures, no working code and no instructions for getting around live controls. Each category follows the same structure:

1. Normal workflow
2. Trust boundaries
3. General point of failure
4. Why detection fails
5. Consequences
6. Preventive controls
7. Detective controls
8. Containment and recovery
9. Residual risk

A useful mental model is the bank as a chain of **trust decisions**:

```
Identity proven? → Request authorised? → Instruction authentic? → Ledger updated correctly? → Settlement final?
```

Every attack below works by getting a *false "yes"* at one of these links, or by stopping the chain from running at all (availability attacks).

---

## 1. Phishing and compromised credentials
1. **Workflow:** an employee or customer authenticates (password plus a second factor) to email, VPN, admin consoles or online banking.
2. **Trust boundary:** the login page. The system assumes that whoever holds the credential is its owner.
3. **Failure point:** credentials or session tokens are captured by fake pages, infostealer malware or reused passwords, or someone is socially engineered into approving an MFA prompt.
4. **Why detection fails:** the attacker logs in *legitimately*, so there's no exploit to catch. Adversary-in-the-middle phishing steals tokens *after* MFA.
5. **Consequences:** the entry point for most deeper attacks (JPMorgan 2014, FICOBA 2026, Japan securities 2025).
6. **Prevent:** phishing-resistant MFA (FIDO2/passkeys); no SMS OTP for privileged access; conditional access by device posture.
7. **Detect:** impossible-travel and new-device analytics; token-reuse detection; anomalous mailbox rules.
8. **Contain:** revoke sessions globally; reset credentials; treat the environment as compromised (this is the RBI's Oct 2026 advisory language).
9. **Residual:** help-desk social engineering (Robinhood 2021, Coinbase 2025); session hijacking on unmanaged devices.

## 2. Malware and ransomware
1. **Workflow:** endpoints and servers run approved software. Backups protect the data.
2. **Trust boundary:** code-execution control on each host.
3. **Failure point:** malicious code runs (from a phishing attachment, an exploited service or stolen remote access), escalates privilege, spreads, then encrypts data and/or steals it.
4. **Why detection fails:** attackers use legitimate admin tools ("living off the land"), disable EDR, act at weekends, and encrypt fast.
5. **Consequences:** an outage measured in days to weeks (Patelco ~2 weeks; ICBC FS days); data-leak extortion; recovery costs.
6. **Prevent:** patch internet-facing appliances fast; application allowlisting; least privilege; segment the payment and settlement zones.
7. **Detect:** EDR behavioural rules; canary files; alerts on mass file renames or deletions; monitoring of backup deletion.
8. **Contain and recover:** isolate the network; **immutable, offline backups**; a clean-room rebuild; *pre-agreed manual operating procedures* for payments and settlement.
9. **Residual:** recovery-time objectives often aren't met in practice. Data-theft extortion survives restoration from backup.

## 3. Ransomware-as-a-Service (RaaS)
1. **Ecosystem:** developers rent ransomware and leak sites to *affiliates*, who buy access from *initial access brokers*, launder through crypto mixers and negotiators, and split ransoms (affiliates often get 70–80%, REPORTED from law-enforcement takedown disclosures).
2. **Trust boundary:** none on the bank side. RaaS is the *supply chain of the attacker*.
3. **Failure point:** specialisation lowers the skill needed to attack a bank (see H4).
4. **Why detection fails:** affiliates vary, so behaviour varies. Brands rename after takedowns (LockBit after Operation Cronos, Feb 2024).
5. **Consequences:** more attempts against mid-size and vendor targets.
6. **Prevent:** the controls in §2, plus threat-intel sharing (FS-ISAC) on affiliate TTPs.
7. **Detect:** monitor initial-access-broker listings for your own domains and vendors.
8. **Contain:** OFAC sanctions screening before any ransom decision; law-enforcement engagement.
9. **Residual:** the ecosystem regenerates after takedowns.

## 4. DDoS and service disruption
1. **Workflow:** customers reach online and mobile banking through the internet, DNS and CDNs.
2. **Trust boundary:** the public internet edge.
3. **Failure point:** traffic floods (volumetric or application-layer) exhaust bandwidth or servers.
4. **Why detection fails:** detection is easy. *Mitigating* it at scale is the hard part. Application-layer floods look like real users.
5. **Consequences:** usually hours of unavailability, little direct loss, reputational and political effect (Ababil, Estonia, Ukraine 2022). For exchanges with continuous-disclosure duties, trading halts (NZX).
6. **Prevent:** scrubbing services and CDNs with headroom; anycast; rate limiting; DNS redundancy.
7. **Detect:** traffic baselines; upstream provider alerts.
8. **Contain:** geo-filtering (Estonia 2007); failover; customer communication.
9. **Residual:** a DDoS can be **cover** for fraud or intrusion. Watch payment monitoring during DDoS events.

## 5. Third-party and supply-chain compromise
1. **Workflow:** the bank outsources functions (core banking, switches, printing, file transfer, security software, SaaS) and grants vendors network access or data.
2. **Trust boundary:** the vendor connection: VPN, API, software update channel, data feed.
3. **Failure point:** the vendor is compromised (C-Edge, MOVEit, Sefas-type vendors, wallet vendors in DMM and Bybit), or its *software* is (SolarWinds, NotPetya).
4. **Why detection fails:** vendor traffic is trusted and whitelisted. Signed updates are trusted. The bank can't see into vendor environments.
5. **Consequences:** correlated failures across many institutions. Data exposure the bank must still disclose.
6. **Prevent:** vendor tiering; contractual security and audit rights; zero-trust connectivity for vendors; SBOMs; staged update rollout.
7. **Detect:** monitor vendor accounts like privileged insiders; integrity checks on vendor-delivered outputs (payment files).
8. **Contain:** pre-built *kill switches* to isolate vendor links (NPCI's isolation of C-Edge); exit and substitution plans.
9. **Residual:** fourth- and fifth-party risk; concentration in hyperscalers.

## 6. Insider-enabled compromise
1. **Workflow:** staff and contractors hold legitimate access to data and payment systems.
2. **Trust boundary:** role-based access control.
3. **Failure point:** a bribed, coerced or malicious insider abuses access, or helps outsiders (Coinbase BPO agents; Bangladesh insider questions unresolved).
4. **Why detection fails:** the actions are authorised by design.
5. **Consequences:** data theft feeding impersonation scams; occasionally direct fraud.
6. **Prevent:** least privilege; just-in-time access; four-eyes approval on high-risk actions; vetting of outsourced staff.
7. **Detect:** user behaviour analytics; data-export alerts; honeytoken records.
8. **Contain:** revoke access instantly; preserve forensics; involve law enforcement.
9. **Residual:** offshore BPO staff are hard to oversee directly.

## 7. Payment-API abuse
1. **Workflow:** a partner (NBFC, fintech, corporate) calls the bank's payout or collection API with credentials (keys, mutual TLS certificates, OAuth client secrets) to initiate transfers.
2. **Trust boundary:** API authentication at the bank's gateway.
3. **Failure point:** partner credentials are stolen or leaked (code repositories, cloud configuration, compromised partner server), or the API lacks object-level authorization. The attacker then makes *valid* calls.
4. **Why detection fails:** requests are authenticated and well-formed. Real-time rails settle in seconds. Partners often have high, flat limits. Off-hours bursts (the CERT-In guidance about weekends) beat human review.
5. **Consequences:** fast cash-out of the partner's float or the bank's funds (India 2026: INR 3.3 crore in 87 minutes, as reported).
6. **Prevent:** credentials bound to hardware or certificates; short-lived tokens; IP and device binding; **per-partner velocity and value caps**; beneficiary allowlists or cooling-off periods for new payees; transaction signing at the partner.
7. **Detect:** per-API-client behavioural baselines (time of day, beneficiary novelty, amount distribution); spikes in new-beneficiary counts.
8. **Contain:** automatic circuit breakers that suspend the API client; recall requests across the receiving banks; freezing of mule accounts (needs network-level cooperation, e.g., the I4C and NPCI mechanisms in India).
9. **Residual:** shared responsibility between bank and partner stays legally and operationally blurry.

## 8. Unauthorised disbursement instructions (including business email compromise)
1. **Workflow:** finance teams release payments against invoices, loan approvals or instructions.
2. **Trust boundary:** the approval workflow plus verifying who sent the instruction.
3. **Failure point:** a forged or compromised instruction (BEC; a manipulated payment file; a compromised maker-checker account).
4. **Why detection fails:** it looks like routine business. The checker approves what the screen shows ("what you see is what you sign" failures: Bybit).
5. **Consequences:** irrevocable payments.
6. **Prevent:** out-of-band callback verification; segregation of duties; independent display of what is being signed.
7. **Detect:** anomaly scoring on payees and amounts; confirmation-of-payee services (UK CoP, EU Verification of Payee from Oct 2025 under the Instant Payments Regulation).
8. **Contain:** rapid recall networks (e.g., the FBI IC3 Recovery Asset Team; SWIFT gpi Stop and Recall).
9. **Residual:** speed of real-time rails.

## 9. ATM switch and card-authorization manipulation
1. **Workflow:** ATM/POS → acquirer → network → issuer processor/switch → core banking (balance check) → approve or decline.
2. **Trust boundary:** the issuer switch's response is final for the network.
3. **Failure point:** the switch or card-management system is altered: limits raised (RBS WorldPay, Unlimited Operations), a proxy switch approves (Cosmos, FASTCash), or card numbers are predictable (Tesco).
4. **Why detection fails:** the network sees *issuer-approved* transactions. Cash-outs happen at weekends across dozens of countries within hours.
5. **Consequences:** direct loss of millions in hours.
6. **Prevent:** integrity of switch software and configuration; dual control on limit changes; HSM-backed cryptogram verification (EMV); no mag-stripe fallback.
7. **Detect:** reconcile switch approvals with core-banking debits in real time; network-level velocity monitoring (Visa/Mastercard/RuPay services).
8. **Contain:** issuer-requested network blocks; suspend the BIN.
9. **Residual:** mag-stripe fallback in some markets; legacy switches at small issuers.

## 10. SWIFT-connected endpoint compromise
1. **Workflow:** treasury or operations staff create payment messages in the local SWIFT interface (Alliance Access or Lite2, or via a service bureau). The messages are signed and sent. The correspondent executes them.
2. **Trust boundary:** the bank's own SWIFT zone. The correspondent trusts signed messages from it.
3. **Failure point:** the attacker controls the local environment and issues messages with the bank's own credentials, then hides them (Bangladesh, Banco del Austro, Banco de Chile, Far Eastern).
4. **Why detection fails:** local logs and confirmations are tampered with. Holiday and time-zone gaps.
5. **Consequences:** up to hundreds of millions attempted.
6. **Prevent:** SWIFT CSCF mandatory controls (secure zone, MFA, integrity, hardening); payment-controls services.
7. **Detect:** *independent* reconciliation with correspondent statements (SWIFT Daily Validation Reports); anomaly screening at the correspondent.
8. **Contain:** gpi Stop and Recall; correspondent holds; law-enforcement freezes.
9. **Residual:** small institutions' attestation quality; service-bureau concentration.

## 11. Card-data exposure
1. **Workflow:** card data is stored and transmitted for processing, servicing and analytics.
2. **Trust boundary:** the PCI cardholder-data environment.
3. **Failure point:** application flaws (Citi 2011, Lotte Card 2025), sniffers (Heartland), POS malware (Target), cloud misconfiguration (Capital One).
4. **Why detection fails:** slow exfiltration; encrypted channels; breaches at third parties.
5. **Consequences:** reissuance costs, fraud losses (often borne by issuers), fines, class actions; regulatory franchise penalties (Lotte Card's new-card ban).
6. **Prevent:** tokenisation; point-to-point encryption; data minimisation; EMV; network tokens.
7. **Detect:** common-point-of-purchase analytics by issuers and networks; dark-web monitoring.
8. **Contain:** targeted reissue; tighter fraud rules on affected BINs.
9. **Residual:** card-not-present fraud using stolen data persists.

## 12. Fraudulent beneficiary changes
1. **Workflow:** customers or corporates add or modify payees. Payroll and vendor master data change.
2. **Trust boundary:** the payee-management function.
3. **Failure point:** an attacker with account access, or BEC, changes the beneficiary (or the vendor master file) to a mule.
4. **Why detection fails:** payee change and payment are separated in time. The amounts are normal.
5. **Consequences:** mis-directed legitimate payments.
6. **Prevent:** step-up authentication and cooling-off periods for new payees; Confirmation/Verification of Payee.
7. **Detect:** flag payment-to-new-payee combined with a new device or IP.
8. **Contain:** recall; mule account freezing.
9. **Residual:** authorised push-payment (APP) scams, where the *customer* is deceived. The UK PSR mandatory reimbursement regime has applied since 7 Oct 2024.

## 13. Session and identity compromise
1. **Workflow:** after login, a session token proves identity on each request.
2. **Trust boundary:** session management.
3. **Failure point:** stolen cookies or tokens (infostealers); SIM swaps to intercept OTPs; deepfake voice or video to pass help-desk or KYC checks.
4. **Why detection fails:** the session looks valid; the device fingerprint is spoofed.
5. **Consequences:** account takeover at scale (Japan 2025; Zeus earlier).
6. **Prevent:** token binding to devices; passkeys; liveness detection plus multi-signal KYC.
7. **Detect:** session anomaly analytics; SIM-swap intelligence feeds from telcos.
8. **Contain:** session revocation; account freezes.
9. **Residual:** AI deepfakes are lowering the cost of impersonation (REPORTED by FinCEN alert FIN-2024-Alert004, Nov 2024).

## 14. Cloud-service dependency failures
1. **Workflow:** workloads, data platforms and SaaS run on hyperscalers under a shared-responsibility model.
2. **Trust boundary:** the cloud tenant's identity and access management; the provider's control plane.
3. **Failure point:** tenant misconfiguration (Capital One); SaaS accounts without MFA (Snowflake/Santander 2024); a provider outage or faulty update (CrowdStrike, *non-malicious*); a provider-side compromise (no confirmed systemic bank case in the database).
4. **Why detection fails:** gaps in log coverage; ambiguity over who monitors what.
5. **Consequences:** data breaches; correlated outages.
6. **Prevent:** cloud security posture management; MFA on all SaaS; multi-region and multi-provider designs for critical services.
7. **Detect:** cloud audit-log analytics; data-egress monitoring.
8. **Contain:** credential rotation; failover.
9. **Residual:** hyperscaler concentration, now subject to DORA CTPP oversight and the UK CTP regime.

## 15. AI-assisted attacker automation
1. **What is claimed:** attackers use LLMs and AI agents for reconnaissance, vulnerability discovery, exploit adaptation, phishing at scale, deepfakes and the speed of operations.
2. **Trust boundary affected:** all of the above. AI is an *accelerant*, not a new trust boundary.
3. **Failure point:** time-to-exploit shrinks after a vulnerability is disclosed, and personalised lures get more convincing.
4. **Why detection fails:** volume and speed overwhelm triage. Generated content lacks the classic phishing tells.
5. **Evidence (see root_cause_analysis.md H5):**
   - The IMF (May 2026 blog) warns AI can dramatically cut the time and cost of finding and exploiting vulnerabilities, but notes buffers such as limited availability of the tools and proprietary banking code.
   - The **BoJ FSR (23 Oct 2026)** states that advances in "frontier AI" have further heightened cybersecurity threats (CONFIRMED, BoJ page).
   - The **EBA RAR (June 2026)** says frontier LLMs are "at the very least, further increasing cyber risk", yet that "data confirm that cyberattacks have not materially increased" (CONFIRMED, EBA page).
   - CERT-In's CRAFTY FALCON advisory reports use of AI offensive tools (REPORTED).
6. **Prevent:** patch velocity (AI shrinks the window); asset inventory; AI-assisted defence.
7. **Detect:** monitor LLM API usage from corporate assets (CERT-In recommendation); bot detection.
8. **Contain:** the same as for the underlying technique.
9. **Residual:** **unknown magnitude**. Public evidence establishes AI *assistance*. It does not establish *autonomous execution* of a bank theft.

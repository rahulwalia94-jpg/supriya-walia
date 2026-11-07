# Part 10 — Geopolitical and Criminal Economics

## 10.1 A taxonomy of objectives

| Objective | What success looks like | Typical actor | Database examples |
|---|---|---|---|
| **Financial theft** | Money moved and laundered | Criminal groups; **DPRK (state revenue)** | Bangladesh, Cosmos, Bybit, DMM, Ronin, Arkéa (unknown actor) |
| **Espionage** | Data held quietly | State intelligence services | SolarWinds (SVR), Equifax (PLA indictment), OCC email (unknown) |
| **Disruption** | Services unavailable or data destroyed | State military/intelligence; proxies | DarkSeoul, NotPetya, Ukraine 2022, Sepah/Nobitex 2025, ISC 2026 |
| **Extortion** | Ransom paid | RaaS affiliates | ICBC FS, Patelco, C-Edge, ION, EquiLend |
| **Political signalling** | Visible, deniable pressure | States via personas | Ababil ("Cyber Fighters"), Estonia |
| **Opportunistic crime** | Whatever is exposed | Low-skill actors | Exposure cases, credential stuffing |

## 10.2 Attribution standards used in this project

1. **Government-confirmed (confirmed-gov):** an indictment or criminal complaint, a formal government attribution, or a sanctions designation naming the actor for the incident. Examples: DPRK for Bangladesh (DOJ 2018); Iran IRGC contractors for Ababil (DOJ 2016); GRU for NotPetya and the Feb 2022 Ukraine DDoS; DPRK for Bybit (FBI 2025) and DMM (FBI/NPA/DC3 2024).
2. **Suspected:** attribution by security vendors or the media only. Examples: Lazarus for Cosmos, Banco de Chile and Far Eastern.
3. **Claimed:** a self-claim by a group or persona (Predatory Sparrow, Black Wolves, LockBit, Everest).
4. **None-known.**

**We never infer state sponsorship from tool origin, attacker language, time zone or geopolitical convenience alone.** Even government attribution is an assertion, not a court finding. Indicted DPRK and Iranian defendants have not been tried.

## 10.3 North Korea: the best-documented state theft programme

- **Shift:** from disruption (DarkSeoul 2013) to **revenue generation** (SWIFT 2015–18 → ATM FASTCash 2016–20 → crypto 2017–).
- **Why:** sanctions cut off conventional revenue. Cyber theft has near-zero penalty risk for operators in Pyongyang. The UN Panel of Experts reported cyber theft as a significant revenue source for weapons programmes (📘; the Panel's mandate ended in April 2024).
- **Why crypto overtook banks:** after SWIFT CSP and FRBNY changes, bank heists yielded tens of millions with high recall risk. Crypto platforms offer **billions with weaker recall**: Ronin USD 620m (2022), DMM USD 308m (2024), Bybit USD 1.46bn (2025).
- **Bank linkage:** crypto proceeds still need **fiat off-ramps**: OTC brokers, nested exchange accounts, mule bank accounts. US Treasury/OFAC designations target these laundering nodes.

## 10.4 Russia-linked criminal ecosystems

- Most RaaS brands (LockBit, ALPHV, Clop, Evil Corp-linked groups) were *assessed* by Western governments to operate largely from Russia or the CIS. Some affiliates have been indicted or sanctioned (e.g., LockBit actors, Operation Cronos 2024).
- **State role:** Western governments describe a *permissive environment* (tolerance, occasional recruitment) more than direction. *Direct state tasking of ransomware against banks is not established in public evidence reviewed* (INFERRED caution).
- **The separate GRU disruption track:** NotPetya and the Ukraine DDoS (2022) were government-attributed state operations.

## 10.5 Iran and Israel-linked campaigns

- **Iran:** Ababil (DOJ-attributed) is the clearest state-linked DDoS campaign against US banks.
- **Against Iran:** Predatory Sparrow (claimed operations against Bank Sepah and Nobitex, 2025) is widely linked by media to Israel, but **without official confirmation**. The June 2026 ISC card-system attacks: one wave was claimed by "Black Wolves"; the other is unattributed.
- **Lesson:** in active conflicts, financial infrastructure is a deliberate target, and personas blur attribution.

## 10.6 Crypto laundering and recovery economics (conceptual, investigative)

**The laundering chain (generic):**
```
Theft → rapid swaps (token → native coin) → cross-chain bridges → mixers / privacy tools
      → peel chains across many wallets → OTC brokers / exchanges with weak KYC → fiat via mule bank accounts
```

**Investigator advantages:** public ledgers make flows *traceable*. Stablecoin issuers can freeze tokens. Exchanges can freeze deposits. Bounty programmes (Bybit) crowd-source tracing. On-chain sleuths sometimes detect thefts **before the victim discloses** (Arkéa, 2 Nov 2026).

**Laundering advantages:** speed (Bybit funds were swapped within days); cross-chain fragmentation; jurisdictions with weak enforcement; time. Recovery rates for large thefts are typically **low single-digit to low double-digit percent** (vendor estimates, REPORTED, uncertain).

**Bank exposure:** banks are the *fiat endpoints*. Bank-originated thefts (Arkéa reportedly; India NBFC APIs) increasingly route **from bank transfers into crypto**, collapsing the recall window that correspondent banking once provided.

## 10.7 What we do NOT claim

- **No evidence was found of coordination between criminal campaigns and state actors** in the 2026 Indian or French cases.
- **CRAFTY FALCON has no public state attribution.** It is a CSIRT-Fin designation.
- **No evidence was found of an imminent systemic attack on any country's banking system.**

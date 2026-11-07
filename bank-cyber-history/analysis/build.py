"""
Reproducible build: python3 analysis/build.py  (run from bank-cyber-history/)

Produces:
  data/incidents.csv, data/incidents.json, data/source_register.csv
  charts/*.png (+ charts/chart_notes.md)
  dashboard/index.html (data embedded so it works from file://)

Requires: pandas, matplotlib.  Optional: analysis/linkcheck.txt
("<http_code> <url>" per line) to annotate the source register.
"""
import csv, json, os, sys, collections
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "analysis"))
from incidents_source import INCIDENTS  # noqa: E402

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

FIELDS = ["id","name","start","end","detection","disclosure","country","region","org","org_type","attacker","attribution",
 "motive","category","vector","sequence","systems","process","stolen_usd_m","stolen_orig","attempted_usd_m","attempted_orig",
 "recovered_usd_m","downtime","customers","settlement","regulatory","fs_impact","legal","root_causes","failed","worked",
 "lessons","unresolved","status","evidence","is_cyberattack","state_link","verification","sources"]

def year(rec):
    y = str(rec["start"])[:4]
    return int(y) if y.isdigit() else int(str(rec["disclosure"])[:4])

def family(cat):
    c = cat.lower()
    if "non-malicious" in c: return "Non-malicious outage (comparator)"
    if "ddos" in c: return "DDoS / availability"
    if "ransomware" in c: return "Ransomware / extortion"
    if "swift" in c: return "SWIFT-endpoint / payment-message fraud"
    if "atm" in c or "card authorization" in c: return "ATM switch / card authorization"
    if "api" in c or "unauthorized transfers" in c or "payment-system" in c: return "Payment-API / transfer fraud"
    if "supply-chain" in c or "third-party" in c: return "Third-party / supply chain"
    if "wiper" in c or "destructive" in c or "disruption" in c: return "Destructive malware / disruption"
    if "ai-assisted" in c: return "AI-assisted campaign"
    if "insider" in c: return "Insider-enabled"
    if "card-data" in c or "data" in c or "credential" in c or "phishing" in c or "cloud" in c or "malware" in c: return "Data theft / credential / account compromise"
    return "Other"

def entry(rec):
    v = (rec["vector"] + " " + rec["category"]).lower()
    if "not publicly" in v or v.startswith("see sources"): return "Not disclosed"
    for k, lab in [("insider","Insider / bribery"),("vendor","Third-party / vendor"),("service provider","Third-party / vendor"),("supply","Third-party / vendor"),
                   ("phish","Phishing / social engineering"),("social engineering","Phishing / social engineering"),("credential","Stolen credentials"),
                   ("password","Stolen credentials"),("sql","Application vulnerability"),("vulnerab","Application vulnerability"),("misconfig","Cloud / misconfiguration"),
                   ("url","Application vulnerability"),("ddos","DDoS (no intrusion)"),("botnet","DDoS (no intrusion)"),("api","Stolen credentials"),
                   ("malware","Malware (vector unclear)"),("equipment","Equipment failure (non-malicious)"),("update","Faulty update (non-malicious)")]:
        if k in v: return lab
    return "Not disclosed"

def period(y):
    return ("A: <2000" if y < 2000 else "B: 2000-09" if y < 2010 else "C: 2010-15" if y < 2016 else
            "D: 2016-19" if y < 2020 else "E: 2020-24" if y < 2025 else "F: 2025-26")

def motive_group(m):
    m = m.lower()
    if m.startswith("none"): return "None (non-malicious)"
    for k, lab in [("espionage","Espionage"),("extortion","Extortion"),("political","Disruption / signalling"),("disruption","Disruption / signalling"),("financial","Financial theft")]:
        if k in m: return lab
    return "Unclear"

def inst_class(t):
    t = t.lower()
    if t == "bank" or "card issuer" in t: return "Bank / card issuer"
    if "vendor" in t or "processor" in t: return "Vendor / processor"
    if "infrastructure" in t or "registry" in t or "regulator" in t: return "Market / public financial infrastructure"
    if "crypto" in t: return "Crypto exchange"
    return "Broker-dealer / other financial"

for r in INCIDENTS:
    r["year"] = year(r); r["family"] = family(r["category"]); r["entry"] = entry(r)
    r["period"] = period(r["year"]); r["motive_group"] = motive_group(r["motive"]); r["inst_class"] = inst_class(r["org_type"])

INCIDENTS.sort(key=lambda r: (r["year"], r["id"]))
os.makedirs(os.path.join(ROOT, "data"), exist_ok=True)
os.makedirs(os.path.join(ROOT, "charts"), exist_ok=True)

# ---------------- data files ----------------
allf = FIELDS + ["year","family","entry","period","motive_group","inst_class"]
with open(os.path.join(ROOT, "data/incidents.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=allf); w.writeheader()
    for r in INCIDENTS:
        row = {k: r.get(k, "") for k in allf}; row["sources"] = " | ".join(r["sources"])
        row = {k: ("" if v is None else v) for k, v in row.items()}
        w.writerow(row)
with open(os.path.join(ROOT, "data/incidents.json"), "w") as f:
    json.dump(INCIDENTS, f, indent=1, ensure_ascii=False)

link = {}
lc = os.path.join(ROOT, "analysis/linkcheck.txt")
if os.path.exists(lc):
    for line in open(lc):
        code, _, u = line.strip().partition(" "); link[u] = code
PRIMARY = ("justice.gov","sec.gov","occ.gov","fca.org.uk","federalreserve.gov","fsa.go.jp","ncsc.gov.uk","cftc.gov","cisa.gov","fbi.gov","ic3.gov",
           "treasury.gov","europol","npci.org.in","rbi.org.in","boj.or.jp","eba.europa.eu","imf.org","swift.com","banxico","rbnz","fma.govt.nz","newsonair.gov.in","icbc.com.cn","crowdstrike.com","patelco")
srcrows = []
for u in sorted({u for r in INCIDENTS for u in r["sources"]}):
    dom = urlparse(u).netloc.replace("www.", "")
    typ = "Primary (official/court/regulator/company)" if any(p in dom for p in PRIMARY) else (
          "Encyclopedic (orientation only)" if "wikipedia" in dom else
          "Security-vendor research (commercial incentive)" if any(k in dom for k in ("cloud.google","kaspersky","crowdstrike")) else "Secondary journalism")
    used = [r["id"] for r in INCIDENTS if u in r["sources"]]
    code = link.get(u, "not checked")
    note = {"200": "reachable", "401": "reachable but paywalled/bot-blocked (content not read in-session)",
            "403": "bot-blocked from sandbox (not proof of invalid URL)", "404": "NOT FOUND - replace"}.get(code, code)
    srcrows.append(dict(url=u, domain=dom, source_type=typ, incidents=";".join(used), http_check_2026_11_07=code, note=note))
with open(os.path.join(ROOT, "data/source_register.csv"), "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(srcrows[0].keys())); w.writeheader(); w.writerows(srcrows)

# ---------------- charts ----------------
CAPTION = ("Curated sample of {n} incidents (bank-cyber-history/data/incidents.csv); NOT a population estimate. "
           "Selection favours large, publicly reported cases; recent years over-represented by research focus.")
COL = ["#2a6f97","#e07a5f","#3d405b","#81b29a","#f2cc8f","#9c6644","#6d597a","#b56576","#4d908e","#577590","#f9844a","#90be6d"]

def finish(fig, ax, fname, title, n=len(INCIDENTS), extra=""):
    ax.set_title(title, fontsize=12, loc="left", fontweight="bold")
    fig.text(0.01, 0.01, (CAPTION.format(n=n) + (" " + extra if extra else "")), fontsize=7, color="#555", wrap=True)
    fig.tight_layout(rect=(0, 0.06, 1, 1)); fig.savefig(os.path.join(ROOT, "charts", fname), dpi=150); plt.close(fig)

# 1 timeline
fig, ax = plt.subplots(figsize=(13, 9))
fams = sorted({r["family"] for r in INCIDENTS}); fc = {f: COL[i % len(COL)] for i, f in enumerate(fams)}
for i, r in enumerate(INCIDENTS):
    ax.scatter(r["year"], i, color=fc[r["family"]], s=40, marker="o" if r["is_cyberattack"] else "x", zorder=3)
    ax.text(r["year"] + 0.3, i, r["name"][:58], fontsize=6, va="center")
ax.set_yticks([]); ax.set_xlim(1992, 2034); ax.grid(axis="x", alpha=.3)
for f in fams: ax.scatter([], [], color=fc[f], label=f)
ax.legend(fontsize=7, loc="lower right")
finish(fig, ax, "01_timeline.png", "1. Chronological incident timeline, 1994-2026 (x = non-malicious comparator)")

def bar(counter, fname, title, horizontal=True, extra=""):
    fig, ax = plt.subplots(figsize=(10, 5.5))
    items = counter.most_common()
    labels, vals = [k for k, _ in items], [v for _, v in items]
    (ax.barh(labels[::-1], vals[::-1], color=COL[0]) if horizontal else ax.bar(labels, vals, color=COL[0]))
    ax.set_xlabel("Number of incidents in curated sample") if horizontal else ax.set_ylabel("Incidents")
    finish(fig, ax, fname, title, extra=extra)

bar(collections.Counter(r["region"] for r in INCIDENTS), "02_by_region.png", "2. Incidents by region (curated sample)",
    extra="English-language and US-regulatory sources over-represent North America.")

# 3 category over time (stacked by period)
periods = sorted({r["period"] for r in INCIDENTS})
fig, ax = plt.subplots(figsize=(11, 6)); bottom = [0]*len(periods)
for f in fams:
    vals = [sum(1 for r in INCIDENTS if r["period"] == p and r["family"] == f) for p in periods]
    ax.bar(periods, vals, bottom=bottom, label=f, color=fc[f]); bottom = [b+v for b, v in zip(bottom, vals)]
ax.legend(fontsize=7, bbox_to_anchor=(1.01, 1), loc="upper left"); ax.set_ylabel("Incidents")
finish(fig, ax, "03_category_by_period.png", "3. Attack families by period (curated sample)")

# 4 losses over time
fig, ax = plt.subplots(figsize=(11, 5.5))
for r in INCIDENTS:
    if r["stolen_usd_m"]:
        ax.scatter(r["year"], r["stolen_usd_m"], color=COL[1] if r["status"] == "CONFIRMED" else COL[4], s=50, edgecolor="k", zorder=3)
        ax.annotate(r["name"][:30], (r["year"], r["stolen_usd_m"]), fontsize=6, xytext=(3, 3), textcoords="offset points")
ax.set_yscale("log"); ax.set_ylabel("Reported direct loss, USD m (log)"); ax.grid(alpha=.3)
ax.scatter([], [], color=COL[1], label="CONFIRMED record"); ax.scatter([], [], color=COL[4], label="REPORTED record"); ax.legend(fontsize=8)
finish(fig, ax, "04_direct_losses.png", "4. Reported direct losses (net of recovery where known)",
       extra="Excludes records with undisclosed loss (e.g., Arkéa EUR ~100-118m UNCONFIRMED). Crypto thefts included. No trend inference.")

# 5 motives by period
mg = sorted({r["motive_group"] for r in INCIDENTS})
fig, ax = plt.subplots(figsize=(11, 5.5)); bottom = [0]*len(periods)
for i, m in enumerate(mg):
    vals = [sum(1 for r in INCIDENTS if r["period"] == p and r["motive_group"] == m) for p in periods]
    ax.bar(periods, vals, bottom=bottom, label=m, color=COL[i]); bottom = [b+v for b, v in zip(bottom, vals)]
ax.legend(fontsize=8); ax.set_ylabel("Incidents")
finish(fig, ax, "05_motives_by_period.png", "5. Motives by period (curated sample)")

bar(collections.Counter(r["inst_class"] for r in INCIDENTS), "06_institution_class.png", "6. Bank vs vendor vs infrastructure (curated sample)")
bar(collections.Counter(r["state_link"] for r in INCIDENTS), "07_state_link.png", "7. State linkage: government-confirmed vs suspected vs claimed",
    extra="'confirmed-gov' = indictment or formal government attribution; 'suspected' = vendor/media only.")
bar(collections.Counter(r["entry"] for r in INCIDENTS), "08_entry_points.png", "8. Publicly known initial entry point",
    extra="Keyword-classified from 'vector' field; 'Not disclosed' is itself a key finding.")

# 9 dependency network (static, conceptual)
fig, ax = plt.subplots(figsize=(12, 8)); ax.axis("off")
nodes = {"Banks (direct participants)": (0.5, 0.55), "SWIFT network": (0.15, 0.85), "Correspondent banks": (0.1, 0.6),
         "Card networks (Visa/MC/RuPay)": (0.85, 0.85), "Processors / ATM switches": (0.9, 0.6), "Core-banking & shared-service vendors (e.g., C-Edge, Shinkin Kyodo Center)": (0.7, 0.25),
         "Cloud / SaaS (hyperscalers, data platforms)": (0.3, 0.2), "Endpoint/security software (e.g., CrowdStrike, SolarWinds)": (0.5, 0.05),
         "Retail payment operators (NPCI UPI/IMPS, SPEI, FedNow, SEPA Inst)": (0.5, 0.95), "CCPs / clearing (FICC, ION, EquiLend)": (0.15, 0.35),
         "Fintech / NBFC API partners": (0.88, 0.38), "Crypto exchanges (cash-out)": (0.95, 0.12)}
edges = [("Banks (direct participants)", n) for n in nodes if n != "Banks (direct participants)"] + [
    ("Fintech / NBFC API partners", "Crypto exchanges (cash-out)"), ("Processors / ATM switches", "Card networks (Visa/MC/RuPay)"),
    ("SWIFT network", "Correspondent banks"), ("Cloud / SaaS (hyperscalers, data platforms)", "Core-banking & shared-service vendors (e.g., C-Edge, Shinkin Kyodo Center)")]
for a, b in edges:
    ax.plot([nodes[a][0], nodes[b][0]], [nodes[a][1], nodes[b][1]], color="#999", lw=1, zorder=1)
for n, (x, y) in nodes.items():
    ax.text(x, y, n, ha="center", va="center", fontsize=8, wrap=True, bbox=dict(boxstyle="round", fc="#dbe9f4" if "Banks" not in n else "#f4d8cd", ec="#333"), zorder=2)
finish(fig, ax, "09_dependency_network.png", "9. Conceptual dependency network of financial infrastructure (illustrative, not exhaustive)",
       extra="Edges = operational dependency; examples drawn from incidents in database.")

# 10 Sankey-style flow (attack family -> banking function -> consequence) as weighted bipartite flows
cons = lambda r: ("Direct theft" if (r["stolen_usd_m"] or 0) > 0 else "Service outage" if r["family"] in ("DDoS / availability","Ransomware / extortion","Destructive malware / disruption","Non-malicious outage (comparator)") else "Data exposure / fraud enablement")
func = lambda r: ("Payments & transfers" if any(k in r["family"] for k in ("SWIFT","API","ATM")) else "Customer channels" if "DDoS" in r["family"] else "Data & servicing" if "Data" in r["family"] else "Shared infrastructure")
fl1 = collections.Counter((r["family"], func(r)) for r in INCIDENTS); fl2 = collections.Counter((func(r), cons(r)) for r in INCIDENTS)
L = sorted({a for a, _ in fl1}); M = sorted({b for _, b in fl1}); R = sorted({b for _, b in fl2})
pos = lambda lst, x: {n: (x, 1 - (i + .5) / len(lst)) for i, n in enumerate(lst)}
P = {**pos(L, 0.05), **pos(M, 0.5), **pos(R, 0.92)}
fig, ax = plt.subplots(figsize=(13, 8)); ax.axis("off")
for (a, b), w in list(fl1.items()) + list(fl2.items()):
    ax.plot([P[a][0] + .1 if P[a][0] < .1 else P[a][0] + .05, P[b][0] - .05], [P[a][1], P[b][1]], lw=w * 1.6, alpha=.35, color=COL[L.index(a) % len(COL)] if a in L else "#777")
for n, (x, y) in P.items():
    ax.text(x, y, n, ha="left" if x < .1 else "center", va="center", fontsize=8, bbox=dict(fc="white", ec="#333"))
finish(fig, ax, "10_sankey_flows.png", "10. Flow: attack family -> banking function -> financial consequence (line width = incident count)")

# 11 transmission diagram
fig, ax = plt.subplots(figsize=(13, 4.5)); ax.axis("off")
steps = ["Cyber intrusion\nor outage", "Payment / data\ndisruption", "Direct operational\nlosses", "Customer\nuncertainty", "Deposit\nwithdrawals?", "Liquidity\ndemand", "Asset sales /\nemergency funding", "Funding cost\n& capital pressure", "Confidence\ncontagion?"]
breaks = {1: "Break: isolation,\nmanual fallback", 3: "Break: reimbursement,\ncommunication", 4: "Break: outage itself\nblocks withdrawals;\ndeposit insurance", 6: "Break: CB liquidity,\nparent support (ICBC)", 8: "Break: idiosyncratic\nvs common cause"}
for i, s in enumerate(steps):
    x = i / (len(steps) - 1) * .92 + .02
    ax.text(x, .6, s, ha="center", va="center", fontsize=8, bbox=dict(boxstyle="round", fc="#f4d8cd" if i in (4, 8) else "#dbe9f4"))
    if i < len(steps) - 1: ax.annotate("", xy=(x + .085, .6), xytext=(x + .03, .6), arrowprops=dict(arrowstyle="->"))
    if i in breaks: ax.text(x + .055, .18, breaks[i], ha="center", fontsize=7, color="#9c2c2c")
finish(fig, ax, "11_transmission.png", "11. How operational failure can become liquidity and confidence risk - and where the chain breaks",
       extra="Conceptual. No database incident shows the full chain to failure.")

# 12 case-study dashboard (four key cases)
cases = ["INC-2016-001", "INC-2023-004", "INC-2024-007", "INC-2026-006"]
fig, axs = plt.subplots(1, 4, figsize=(15, 4.8))
for ax, cid in zip(axs, cases):
    r = next(x for x in INCIDENTS if x["id"] == cid); ax.axis("off")
    txt = (f"{r['name'][:42]}\n\nDate: {r['start'][:10]}\nType: {r['org_type']}\nCategory: {r['category'][:40]}\n"
           f"Loss: {r['stolen_orig'][:48]}\nAttempted: {(r['attempted_orig'] or '-')[:40]}\nStatus: {r['status']} | Evidence {r['evidence']}/5\n\n"
           f"Lesson:\n{r['lessons'][:150]}")
    ax.text(0, 1, txt, va="top", fontsize=7.5, wrap=True, bbox=dict(fc="#f7f7f7", ec="#999"))
finish(fig, axs[0], "12_case_dashboard.png", "12. Comparative case-study dashboard: Bangladesh Bank | ICBC FS | C-Edge | Crédit Mutuel Arkéa")

with open(os.path.join(ROOT, "charts/chart_notes.md"), "w") as f:
    f.write(f"# Chart notes\n\nAll charts generated by `analysis/build.py` from `data/incidents.csv` ({len(INCIDENTS)} records, curated sample).\n\n"
            "**Denominator limitation:** the database is a purposive sample of materially significant, publicly documented incidents. Counts by year, region or category describe the *sample*, not the world, and must not be read as trends in incidence. Recent years are over-sampled because the brief prioritised 2025-26.\n\n"
            "| Chart | Method | Main caveat |\n|---|---|---|\n"
            "| 01 timeline | one point per record, colour by family | selection bias |\n"
            "| 02 region | count by `region` | English-language/US-source bias |\n"
            "| 03 category/period | keyword family of `category` | classification is analyst judgement |\n"
            "| 04 losses | `stolen_usd_m` log scale | many losses undisclosed; FX approximate |\n"
            "| 05 motives | keyword of `motive` | motives often inferred |\n"
            "| 06 institution | `org_type` grouped | vendor incidents may be under-disclosed |\n"
            "| 07 state link | `state_link` | 'suspected' is not attribution |\n"
            "| 08 entry point | keyword of `vector` | most victims do not disclose vector |\n"
            "| 09 network | conceptual | illustrative only |\n"
            "| 10 flows | rule-based mapping | simplification |\n"
            "| 11 transmission | conceptual | no empirical full-chain case |\n"
            "| 12 dashboard | four case records | see global_case_studies.md |\n\n"
            "For population-level statistics use IMF WP/26/62 (Khiaonarong & Zheng, 2026), EBA Risk Assessment Questionnaire, FS-ISAC reports - each with their own coverage limits (see sources.md).\n")

# ---------------- dashboard ----------------
tpl = open(os.path.join(ROOT, "analysis/dashboard_template.html")).read()
open(os.path.join(ROOT, "dashboard/index.html"), "w").write(tpl.replace("/*__DATA__*/[]", json.dumps(INCIDENTS, ensure_ascii=False)))
print(f"Built {len(INCIDENTS)} incidents, {len(srcrows)} sources, 12 charts, dashboard.")

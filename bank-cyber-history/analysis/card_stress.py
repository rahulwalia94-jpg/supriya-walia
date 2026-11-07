"""
Hypothetical credit-card portfolio stress analysis: cyber-driven payment/servicing
disruption vs genuine credit deterioration.

ALL PARAMETERS ARE ILLUSTRATIVE ASSUMPTIONS. They are NOT Citigroup data and are
not calibrated to any institution's disclosures. Change them freely.

Model: monthly delinquency-bucket roll-rate (Markov) model.
Buckets: Current, 30, 60, 90, 120, 150, 180+ (charge-off at 180 DPD, US
card convention under FFIEC Uniform Retail Credit Classification policy).

Scenario mechanics
------------------
A cyber outage that prevents customers from paying (or prevents the bank from
posting/collecting payments) shocks the *Current->30* roll and lowers *cure* rates
for the outage month only. Two different accounting interpretations follow:

  (1) "Technical delinquency": the bank waives/reverses (re-ages are subject to
      FFIEC re-aging limits), reports no negative bureau data, and the
      accounts cure when systems return. Credit loss impact ~ small.
  (2) "Behavioural spillover": a share of customers who missed a payment do not
      resume (payment habit broken, fraud-driven churn, confusion), producing
      persistent excess roll -> genuine credit loss.

CECL point: lifetime expected credit loss changes only for (2) and only if the
spillover is forecastable; direct fraud losses (unauthorised transactions) are
operational-risk / fraud losses, not CECL credit losses.
"""
import json, os

BUCKETS = ["C", "30", "60", "90", "120", "150", "180+"]

BASE = dict(
    balances_bn=100.0,          # portfolio receivables, USD bn (hypothetical)
    roll_c_30=0.020,            # monthly Current->30 roll (share of current balances)
    roll=[0.35, 0.75, 0.85, 0.90, 0.92],   # 30->60, 60->90, 90->120, 120->150, 150->180 (remainder cures)
    recovery_rate=0.10,         # post-charge-off recoveries (share of gross charge-offs)
    months=12,
)
# Steady-state gross NCO ~ 0.02*.35*.75*.85*.90*.92 = 0.37%/month ~ 4.4%/yr; net ~4.0%:
# broadly the order of magnitude of large US card portfolios in 2024-25, but NOT calibrated.

SCENARIOS = {
    # c30_mult: multiplier on Current->30 during outage; roll_mult: multiplier on 30+ roll during outage
    # remediation: share of outage-caused excess delinquency the bank reverses after restoration
    #   (fee/interest reversal + re-aging within FFIEC limits + no bureau reporting)
    # spill_mult/spill_months: persistent uplift to Current->30 after restoration (behavioural damage)
    "baseline":      dict(c30_mult=1.0, roll_mult=1.0, outage_months=0, remediation=1.0, spill_mult=1.00, spill_months=0, fraud_loss_m=0,   ops_cost_m=0,   remediation_m=0),
    "mild_24h":      dict(c30_mult=1.05, roll_mult=1.02, outage_months=1, remediation=0.98, spill_mult=1.01, spill_months=2, fraud_loss_m=5,   ops_cost_m=15,  remediation_m=10),
    "adverse_7day":  dict(c30_mult=1.60, roll_mult=1.20, outage_months=1, remediation=0.90, spill_mult=1.05, spill_months=6, fraud_loss_m=50,  ops_cost_m=150, remediation_m=100),
    "severe_vendor": dict(c30_mult=3.00, roll_mult=1.50, outage_months=2, remediation=0.75, spill_mult=1.12, spill_months=9, fraud_loss_m=300, ops_cost_m=500, remediation_m=400),
}

def steady_state(p):
    b = [p["balances_bn"], 0, 0, 0, 0, 0, 0]
    for _ in range(60):
        b, _co = step(p, b, p["roll_c_30"], 1.0)
    return b

def step(p, b, c30, roll_mult):
    new = [0.0] * 7
    flow = b[0] * c30
    new[0] += b[0] - flow; new[1] += flow
    for i in range(1, 6):
        r = min(p["roll"][i - 1] * roll_mult, 1.0)
        new[i + 1] += b[i] * r
        new[0] += b[i] * (1 - r)           # cure / pay-down to current
    co = new[6]; new[6] = 0.0; new[0] += co  # constant book: replace charged-off balances
    return new, co

def run(p, s, mode):
    """mode 'technical': remediation applied, no spillover. 'spillover': partial remediation + persistent uplift."""
    b = steady_state(p); base_b = list(b); co_total = 0.0; path = []
    for m in range(p["months"]):
        outage = m < s["outage_months"]
        c30 = p["roll_c_30"] * (s["c30_mult"] if outage else 1.0)
        if mode == "spillover" and not outage and s["outage_months"] and m < s["outage_months"] + s["spill_months"]:
            c30 *= s["spill_mult"]
        b, co = step(p, b, c30, s["roll_mult"] if outage else 1.0)
        if m == s["outage_months"] - 1:      # restoration: reverse excess delinquency
            rem = 1.0 if mode == "technical" else s["remediation"]
            for i in range(1, 6):
                excess = max(b[i] - base_b[i], 0) * rem
                b[i] -= excess; b[0] += excess
        co_total += co
        path.append(dict(month=m + 1, d30plus_bn=round(sum(b[1:6]), 3), gross_chargeoff_bn=round(co, 4)))
    return co_total * (1 - p["recovery_rate"]), path

def main():
    out = {}
    base_net, _ = run(BASE, SCENARIOS["baseline"], "technical")
    for name, s in SCENARIOS.items():
        tech, path_t = run(BASE, s, "technical")
        spill, path_s = run(BASE, s, "spillover")
        out[name] = dict(
            assumptions=s,
            net_chargeoffs_12m_bn_technical=round(tech, 3),
            net_chargeoffs_12m_bn_spillover=round(spill, 3),
            incremental_credit_loss_m_technical=round((tech - base_net) * 1000, 1),
            incremental_credit_loss_m_spillover=round((spill - base_net) * 1000, 1),
            operational_risk_loss_m=s["fraud_loss_m"] + s["ops_cost_m"] + s["remediation_m"],
            path_spillover=path_s,
        )
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "card_stress_results.json"), "w") as f:
        json.dump(dict(base=BASE, results=out), f, indent=1)
    print(f"{'scenario':15} {'NCO tech $bn':>12} {'NCO spill $bn':>13} {'d-credit tech $m':>17} {'d-credit spill $m':>18} {'op-risk $m':>10}")
    for k, v in out.items():
        print(f"{k:15} {v['net_chargeoffs_12m_bn_technical']:>12} {v['net_chargeoffs_12m_bn_spillover']:>13} "
              f"{v['incremental_credit_loss_m_technical']:>17} {v['incremental_credit_loss_m_spillover']:>18} {v['operational_risk_loss_m']:>10}")

if __name__ == "__main__":
    main()

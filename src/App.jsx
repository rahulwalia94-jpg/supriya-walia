import { useState, useEffect, useRef, useCallback } from "react";

const FOODS = [
  { emoji:"🫐", name:"Wild Blueberry",   benefit:"Neural protection"  },
  { emoji:"🥑", name:"Hass Avocado",     benefit:"Cellular repair"    },
  { emoji:"🍋", name:"Amalfi Lemon",     benefit:"Alkaline balance"   },
  { emoji:"🌿", name:"Moringa",          benefit:"72 nutrients"       },
  { emoji:"🍵", name:"Matcha",           benefit:"EGCG antioxidant"   },
  { emoji:"🥥", name:"Coconut",          benefit:"MCT fuel"           },
  { emoji:"🌾", name:"Amaranth",         benefit:"Complete protein"   },
  { emoji:"🍇", name:"Concord Grape",    benefit:"Resveratrol"        },
  { emoji:"🧄", name:"Black Garlic",     benefit:"Allicin therapy"    },
  { emoji:"🌰", name:"Walnut",           benefit:"Omega-3 DHA"        },
  { emoji:"🍠", name:"Purple Yam",       benefit:"Anthocyanins"       },
  { emoji:"🥦", name:"Broccoli Sprout",  benefit:"Sulforaphane"       },
  { emoji:"🫘", name:"Black Bean",       benefit:"Gut microbiome"     },
  { emoji:"🍄", name:"Lion's Mane",      benefit:"Neurogenesis"       },
  { emoji:"🥕", name:"Turmeric Root",    benefit:"NF-kB inhibition"   },
  { emoji:"🫙", name:"Raw Honey",        benefit:"Prebiotic flora"    },
  { emoji:"🌊", name:"Spirulina",        benefit:"Phycocyanin"        },
  { emoji:"🍛", name:"Lentils",          benefit:"Gut diversity"      },
  { emoji:"🌶", name:"Saffron",          benefit:"Mood regulation"    },
  { emoji:"🫚", name:"Cold-press Olive", benefit:"Polyphenols"        },
];

const SYSTEM = `You are the AI consultation assistant for Supriya Walia -- a distinguished clinical dietician and nutritional therapist based in Delhi, India, with over 15 years of practice.

Supriya's expertise: weight management, PCOS, thyroid, gut health, IBS, diabetes nutrition, cardiac nutrition, Indian diet optimisation, corporate wellness, prenatal nutrition, sports nutrition, anti-inflammatory protocols.

Voice: Warm, authoritative, deeply Indian in cultural understanding. Never generic. Always real. Reference Indian food, lifestyle, and family context.

After EVERY response, append EXACTLY:
|||SW|||
{"greeting":"Poetic one-line insight in Supriya's voice (max 14 words)","body":"Two sentences why these recommendations fit, referencing Indian lifestyle","recs":[{"icon":"emoji","title":"Programme","desc":"One precise sentence"},{"icon":"emoji","title":"Programme","desc":"One precise sentence"},{"icon":"emoji","title":"Programme","desc":"One precise sentence"}]}

Keep main response to 3-4 warm sentences. End with one intelligent follow-up question.`;

const DEFAULT_SUG = {
  greeting: "Every body holds its own wisdom -- Supriya listens before she prescribes.",
  body: "Share your concern and the assistant will surface the most relevant programmes from Supriya's practice -- precisely tailored to you.",
  recs: [
    { icon:"🩺", title:"Initial Clinical Assessment", desc:"60-minute deep-dive covering your complete health history, lifestyle, and goals." },
    { icon:"🌿", title:"Metabolic Reset",             desc:"Supriya's signature 8-week protocol addressing root causes through Indian food." },
    { icon:"🍛", title:"Indian Diet Optimisation",    desc:"Evidence-based plans built entirely around your kitchen -- no cultural compromise." }
  ]
};

const SPECS = [
  { n:"01", e:"⚖️", t:"Weight & Metabolic",  b:"Beyond calories -- hormonal profile, metabolic rate, gut health, and sleep architecture working together." },
  { n:"02", e:"🌸", t:"Hormonal & Women's",  b:"PCOS, thyroid, perimenopause. Nutritional protocols that restore hormonal harmony through food medicine." },
  { n:"03", e:"🫁", t:"Gut & Digestive",     b:"Bloating, IBS, acidity. Supriya addresses the gut-brain axis with precision therapeutic protocols." },
  { n:"04", e:"🩸", t:"Diabetes & Cardiac",  b:"Medical nutrition therapy anchored in Indian dietary traditions -- not Western food templates." },
  { n:"05", e:"🧘", t:"Executive Wellness",  b:"For professionals navigating demanding schedules -- nutrition that works within real corporate life." },
  { n:"06", e:"🏃", t:"Sports & Active",     b:"Precision fuelling strategies for athletes and runners -- performance, recovery, long-term resilience." },
];

const TESTIMONIALS = [
  { q:"Twelve years of PCOS, three nutritionists. Supriya was the first to actually understand what was happening in my body. Within 10 weeks, I felt like a different person.", i:"PS", n:"P. Sharma", d:"Marketing Director, Delhi" },
  { q:"She didn't give me a diet. She gave me a completely new relationship with food -- one rooted in my own culture, my own kitchen.", i:"AK", n:"A. Kapoor", d:"Architect, Mumbai" },
  { q:"I came in for weight loss and discovered I had been managing my diabetes completely wrong for two years. Her rigour and warmth are equally remarkable.", i:"RM", n:"R. Malhotra", d:"CEO, Gurgaon" },
];

const C = {
  bg:"#f5efe6", bg2:"#ede5d8", bg3:"#e8dfd0",
  ink:"#2c1f12", sienna:"#8b4513", terra:"#c1692a",
  sand:"#d4a96a", dust:"#a08060",
  border:"rgba(139,69,19,0.14)", cream:"#faf6f0",
};

const MARQUEE = ["Weight Management","PCOS Protocol","Gut Healing","Diabetes Nutrition","Sports Performance","Executive Wellness","Prenatal Nutrition","Anti-Inflammatory"];

/* ---- LIVING CANVAS ---- */
function LivingCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: 20 }, (_, i) => ({
      food: FOODS[i % FOODS.length],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .22,
      vy: (Math.random() - .5) * .22,
      size: 14 + Math.random() * 18,
      op: .05 + Math.random() * .06,
      targetOp: .05 + Math.random() * .06,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - .5) * .003,
      ps: .35 + Math.random() * .35,
    }));

    const draw = (ts) => {
      const t = ts * .001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i], b = particles.current[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(139,69,19,${(1 - dist / 150) * .03})`;
            ctx.lineWidth = .4;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.restore();

      particles.current.forEach(p => {
        p.x += p.vx + Math.sin(t * .3 + p.phase) * .09;
        p.y += p.vy + Math.cos(t * .25 + p.phase) * .08;
        p.rot += p.rotSpeed;
        p.op += (p.targetOp - p.op) * .02;
        const pad = 60;
        if (p.x < -pad) p.x = canvas.width + pad;
        if (p.x > canvas.width + pad) p.x = -pad;
        if (p.y < -pad) p.y = canvas.height + pad;
        if (p.y > canvas.height + pad) p.y = -pad;

        const sz = p.size * (1 + Math.sin(t * p.ps + p.phase) * .06);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const g = ctx.createRadialGradient(0, 0, sz * .2, 0, 0, sz * 1.5);
        g.addColorStop(0, `rgba(193,105,42,${p.op * 1.3})`);
        g.addColorStop(1, "rgba(193,105,42,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(0, 0, sz * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = p.op * 2.2;
        ctx.font = `${sz}px serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(p.food.emoji, 0, 0);
        ctx.restore();
      });

      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      particles.current.forEach(p => {
        const dx = p.x - cx, dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.targetOp = Math.min(.45, p.targetOp + .04);
          p.vx += dx / dist * .06; p.vy += dy / dist * .06;
        } else {
          p.targetOp = Math.max(.05, p.targetOp - .003);
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }} />;
}

/* ---- FOOD TICKER ---- */
function FoodTicker() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(p => (p + 1) % FOODS.length), 2400); return () => clearInterval(t); }, []);
  const f = FOODS[i];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, margin:"20px 0" }}>
      <div style={{ fontSize:26, lineHeight:1, animation:"foodPop .35s ease" }}>{f.emoji}</div>
      <div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".22em", color:C.sienna }}>{f.name}</div>
        <div style={{ fontSize:9, letterSpacing:".18em", color:C.dust, textTransform:"uppercase" }}>{f.benefit}</div>
      </div>
      <div style={{ flex:1, height:1, background:`linear-gradient(to right,${C.border},transparent)` }} />
      <div style={{ fontSize:9, color:C.dust, flexShrink:0 }}>{i + 1}/{FOODS.length}</div>
    </div>
  );
}

/* ---- MAIN ---- */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role:"ai",
    text:"Namaste. I'm the consultation assistant for Supriya Walia's practice.\n\nThis is a safe, confidential space -- share whatever is on your mind. Your energy, your digestion, your weight, your hormones, or simply that feeling that something is not quite right.\n\nSupriya believes in listening before prescribing. What brings you here today?",
    time:"Now"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sug, setSug] = useState(DEFAULT_SUG);
  const [glow, setGlow] = useState(false);
  const [history, setHistory] = useState([]);
  const [hovSpec, setHovSpec] = useState(null);
  const msgsRef = useRef(null);

  useEffect(() => {
    const h = () => { setScrolled(window.scrollY > 60); setMobile(window.innerWidth < 768); };
    h();
    window.addEventListener("scroll", h, { passive:true });
    window.addEventListener("resize", h);
    return () => { window.removeEventListener("scroll", h); window.removeEventListener("resize", h); };
  }, []);

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [messages, loading]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const now = () => new Date().toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit" });

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;
    setMessages(p => [...p, { role:"user", text, time:now() }]);
    setInput(""); setLoading(true);
    const nh = [...history, { role:"user", content:text }];
    setHistory(nh);
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ system:SYSTEM, messages:nh }) });
      const data = await res.json();
      const full = data.content?.[0]?.text || "My apologies -- please try again.";
      const [display, raw] = full.split("|||SW|||");
      setMessages(p => [...p, { role:"ai", text:display.trim(), time:now() }]);
      setHistory(p => [...p, { role:"assistant", content:full }]);
      if (raw) { try { const m = raw.match(/\{[\s\S]*\}/); if (m) { setSug(JSON.parse(m[0])); setGlow(true); setTimeout(() => setGlow(false), 2600); } } catch {} }
    } catch { setMessages(p => [...p, { role:"ai", text:"A momentary disruption -- please try once more.", time:now() }]); }
    setLoading(false);
  }, [loading, history]);

  const sec = (extra) => ({ padding: mobile ? "80px 24px" : "120px 64px", borderTop:`1px solid ${C.border}`, ...extra });

  return (
    <div style={{ background:C.bg, minHeight:"100vh", color:C.ink, fontFamily:"'Jost',sans-serif", position:"relative", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel:wght@400;500&family=Jost:wght@200;300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.015)}}
        @keyframes fup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes td{0%,60%,100%{transform:translateY(0);opacity:.3}30%{transform:translateY(-6px);opacity:1}}
        @keyframes foodPop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        *{margin:0;padding:0;box-sizing:border-box;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:${C.sand};}
        ::selection{background:${C.terra};color:#fff;}
      `}</style>

      <LivingCanvas />

      {/* linen texture */}
      <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`, opacity:.5 }} />

      <div style={{ position:"relative", zIndex:2 }}>

        {/* NAV */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding: scrolled ? (mobile ? "12px 20px" : "14px 64px") : (mobile ? "18px 20px" : "28px 64px"), transition:"all .5s", background: scrolled ? "rgba(245,239,230,.95)" : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent" }}>
          <div onClick={() => go("hero")} style={{ cursor:"pointer" }}>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize: mobile ? 12 : 15, letterSpacing:".45em", color:C.sienna, textTransform:"uppercase" }}>Supriya Walia</div>
            {!mobile && <div style={{ fontSize:8, letterSpacing:".35em", color:C.dust, marginTop:3, fontWeight:300 }}>Clinical Dietician & Nutritional Therapist</div>}
          </div>

          {/* Desktop nav */}
          {!mobile && (
            <div style={{ display:"flex", gap:40 }}>
              {[["About","about"],["Expertise","specs"],["Consult","consult"],["Approach","approach"],["Book","booking"]].map(([l, id]) => (
                <button key={l} onClick={() => go(id)} style={{ fontSize:9.5, letterSpacing:".3em", textTransform:"uppercase", color:C.dust, background:"none", border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif" }}
                  onMouseEnter={e => e.target.style.color = C.sienna} onMouseLeave={e => e.target.style.color = C.dust}>{l}</button>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!mobile && (
            <button onClick={() => go("booking")} style={{ fontFamily:"'Cinzel',serif", fontSize:9.5, letterSpacing:".2em", color:C.cream, background:C.sienna, padding:"12px 28px", border:"none", cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = C.terra} onMouseLeave={e => e.currentTarget.style.background = C.sienna}>
              Book Consultation
            </button>
          )}

          {/* Mobile hamburger */}
          {mobile && (
            <button onClick={() => setMenuOpen(p => !p)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
              <div style={{ width:22, height:1.5, background:C.sienna, marginBottom:5 }} />
              <div style={{ width:22, height:1.5, background:C.sienna, marginBottom:5 }} />
              <div style={{ width:22, height:1.5, background:C.sienna }} />
            </button>
          )}
        </nav>

        {/* Mobile menu */}
        {mobile && menuOpen && (
          <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(245,239,230,.98)", zIndex:99, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32 }}>
            {[["About","about"],["Expertise","specs"],["Consult","consult"],["Approach","approach"],["Book","booking"]].map(([l, id]) => (
              <button key={l} onClick={() => go(id)} style={{ fontFamily:"'Cinzel',serif", fontSize:14, letterSpacing:".4em", color:C.sienna, background:"none", border:"none", cursor:"pointer", textTransform:"uppercase" }}>{l}</button>
            ))}
            <button onClick={() => go("booking")} style={{ fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:".2em", color:C.cream, background:C.sienna, padding:"14px 36px", border:"none", cursor:"pointer", marginTop:16 }}>Book Consultation</button>
          </div>
        )}

        {/* HERO */}
        <section id="hero" style={{ minHeight:"100vh", display:"grid", gridTemplateColumns: mobile ? "1fr" : "55% 45%", overflow:"hidden" }}>
          <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", padding: mobile ? "120px 24px 60px" : "160px 64px 80px", position:"relative" }}>
            <div style={{ fontSize:9, letterSpacing:".6em", textTransform:"uppercase", color:C.terra, marginBottom:32, display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ width:32, height:1, background:C.terra, display:"block", flexShrink:0 }} />Delhi . Mumbai . Virtual
            </div>
            <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "52px" : "clamp(52px,5.2vw,88px)", lineHeight:.92, fontWeight:400, color:C.ink, marginBottom:12, letterSpacing:"-.02em" }}>
              The Art<br />of <em style={{ fontStyle:"italic", color:C.sienna }}>Healing</em><br />Through<br />Food
            </h1>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? 18 : "clamp(18px,1.8vw,28px)", color:C.dust, marginBottom:20, fontStyle:"italic" }}>with Supriya Walia</div>
            <p style={{ fontSize:13, lineHeight:2, color:C.dust, maxWidth:420, fontWeight:300 }}>Clinical dietician. 15 years healing individuals through evidence-based, personalised nutrition -- built around Indian food and Indian lives.</p>
            <FoodTicker />
            <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
              <button onClick={() => go("consult")} style={{ fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".22em", color:C.cream, background:C.sienna, padding:"14px 32px", border:"none", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = C.terra} onMouseLeave={e => e.currentTarget.style.background = C.sienna}>Begin Consultation</button>
              <button onClick={() => go("about")} style={{ fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:C.sienna, background:"none", border:"none", borderBottom:`1px solid ${C.sand}`, paddingBottom:3, cursor:"pointer" }}>Meet Supriya</button>
            </div>
          </div>

          {/* Right panel - desktop only */}
          {!mobile && (
            <div style={{ position:"relative", background:`linear-gradient(160deg,${C.bg2},${C.bg3})`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
              <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:340, fontWeight:400, color:"rgba(139,69,19,.05)", userSelect:"none", lineHeight:1, animation:"breathe 10s ease-in-out infinite", letterSpacing:"-.05em" }}>SW</div>
              {FOODS.slice(0, 7).map((f, i) => {
                const a = (i / 7) * Math.PI * 2;
                return <div key={i} style={{ position:"absolute", left:`${50 + Math.cos(a) * 35}%`, top:`${50 + Math.sin(a) * 35}%`, transform:"translate(-50%,-50%)", fontSize:22 + (i % 3) * 7, opacity:.12 + (i % 3) * .06, animation:`breathe ${6 + i * .9}s ease-in-out infinite`, animationDelay:`${i * .4}s`, userSelect:"none", filter:"sepia(.3)" }}>{f.emoji}</div>;
              })}
              <div style={{ position:"absolute", bottom:80, left:-20, background:C.cream, border:`1px solid ${C.border}`, padding:"22px 26px", minWidth:175, boxShadow:`4px 4px 18px rgba(139,69,19,.1)`, animation:"fup .9s ease .4s both" }}>
                <div style={{ fontSize:9, letterSpacing:".4em", color:C.sienna, textTransform:"uppercase", marginBottom:6 }}>Lives Transformed</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:40, color:C.ink, lineHeight:1 }}>3,200+</div>
                <div style={{ fontSize:9, color:C.dust, marginTop:3 }}>Across India & Globally</div>
              </div>
              <div style={{ position:"absolute", top:40, right:40, background:C.cream, border:`1px solid ${C.border}`, padding:"12px 16px", maxWidth:165 }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:12, color:C.ink, fontStyle:"italic", lineHeight:1.5 }}>"Food is not the enemy. Ignorance is."</div>
                <div style={{ fontSize:8, color:C.dust, marginTop:5, letterSpacing:".2em" }}>-- SUPRIYA WALIA</div>
              </div>
            </div>
          )}
        </section>

        {/* MARQUEE */}
        <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"12px 0", overflow:"hidden", background:"rgba(193,105,42,.04)" }}>
          <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee 28s linear infinite" }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} style={{ fontSize:9, letterSpacing:".38em", color:C.sand, textTransform:"uppercase", padding:"0 28px" }}>
                {item}{i < [...MARQUEE, ...MARQUEE].length - 1 && <span style={{ color:C.terra, padding:"0 4px" }}>*</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" style={sec()}>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 40 : 100, alignItems:"center" }}>
            {/* Visual - desktop only */}
            {!mobile && (
              <div style={{ position:"relative", aspectRatio:"3/4", background:`linear-gradient(160deg,${C.bg2},${C.bg3})`, border:`1px solid ${C.border}`, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:200, color:"rgba(139,69,19,.06)", fontStyle:"italic", userSelect:"none" }}>SW</div>
                {FOODS.slice(0, 8).map((f, i) => <div key={i} style={{ position:"absolute", left:`${10 + Math.sin(i * 1.3) * 70}%`, top:`${10 + Math.cos(i * .9) * 70}%`, fontSize:12 + i % 3 * 7, opacity:.07 + i % 4 * .04, transform:`rotate(${(i - 4) * 8}deg)`, userSelect:"none", filter:"sepia(.4)" }}>{f.emoji}</div>)}
                <div style={{ position:"absolute", top:24, right:24, border:`1px solid ${C.sienna}`, padding:"12px 16px", textAlign:"center", background:"rgba(245,239,230,.92)" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:".35em", color:C.sienna }}>PRACTICE EST.</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:28, color:C.ink }}>2009</div>
                </div>
                <div style={{ position:"absolute", bottom:24, left:24, right:24, padding:"14px 18px", background:"rgba(245,239,230,.92)", border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:8, letterSpacing:".4em", color:C.sienna, textTransform:"uppercase", marginBottom:5 }}>Philosophy</div>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:C.ink, fontStyle:"italic", lineHeight:1.5 }}>"Food is not the enemy. Ignorance is."</div>
                </div>
              </div>
            )}
            <div>
              <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>About Supriya <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "36px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom:24, color:C.ink }}>Where <em style={{ fontStyle:"italic", color:C.sienna }}>science</em><br />meets the Indian<br />kitchen</h2>
              <p style={{ fontSize:13, lineHeight:2.1, color:C.dust, marginBottom:20, fontWeight:300 }}>Supriya Walia holds a Master's in Clinical Nutrition and has spent over 15 years developing a methodology that is rigorously evidence-based yet deeply rooted in Indian food culture and the real pressures of modern Indian living.</p>
              <p style={{ fontSize:13, lineHeight:2.1, color:C.dust, marginBottom:36, fontWeight:300 }}>She does not believe in restriction. She believes in understanding. Every client receives a complete clinical evaluation and leaves with a plan that feels like an extension of their own life.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                {[["🎓","MSc Clinical Nutrition","Specialisation in therapeutic nutrition"],["🏥","15+ Years Practice","Hospital, clinic, and corporate wellness"],["🇮🇳","Indian Diet Expert","Optimising Indian food for therapeutic outcomes"],["📋","3,200+ Clients","Weight, hormonal, diabetes, gut, sports"]].map(([icon, title, desc], i) => (
                  <div key={i} style={{ padding:"16px 20px", border:`1px solid ${C.border}`, background:"rgba(245,239,230,.5)", display:"flex", alignItems:"flex-start", gap:14, transition:"all .35s", cursor:"default" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(193,105,42,.07)"; e.currentTarget.style.borderColor = C.sand; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,239,230,.5)"; e.currentTarget.style.borderColor = C.border; }}>
                    <span style={{ fontSize:15, flexShrink:0, marginTop:2 }}>{icon}</span>
                    <div><div style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:C.ink, marginBottom:2 }}>{title}</div><div style={{ fontSize:11, color:C.dust, fontWeight:300 }}>{desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:2, marginTop:60 }}>
            {[["3,200+","Clients Transformed"],["15+","Years of Practice"],["97%","Client Retention"],["100%","Bespoke Plans"]].map(([n, d], i) => (
              <div key={i} style={{ padding: mobile ? 24 : 36, border:`1px solid ${C.border}`, background:"rgba(245,239,230,.4)", transition:"all .4s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(193,105,42,.07)"; e.currentTarget.style.borderColor = C.sand; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,239,230,.4)"; e.currentTarget.style.borderColor = C.border; }}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? 40 : 50, color:C.sienna, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:10, color:C.dust, marginTop:5, letterSpacing:".1em", fontWeight:300 }}>{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WORLD'S FINEST FOODS */}
        <section style={{ ...sec(), background:`linear-gradient(180deg,${C.bg},${C.bg2})` }}>
          <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>The Healing Kitchen <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "34px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom:12, color:C.ink }}>The world's finest<br /><em style={{ fontStyle:"italic", color:C.sienna }}>healing foods</em></h2>
          <p style={{ fontSize:13, color:C.dust, maxWidth:500, lineHeight:2, marginBottom: mobile ? 40 : 56, fontWeight:300 }}>Supriya's protocols are built around the most nutrient-dense, therapeutic foods on earth -- many part of Indian cuisine for centuries.</p>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(5,1fr)", gap:2 }}>
            {FOODS.map((f, i) => (
              <div key={i} style={{ padding: mobile ? "20px 14px" : "26px 18px", border:`1px solid ${C.border}`, background:"rgba(245,239,230,.4)", textAlign:"center", transition:"all .4s", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(193,105,42,.09)"; e.currentTarget.style.borderColor = C.sand; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,239,230,.4)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: mobile ? 28 : 32, marginBottom:10, filter:"sepia(.15)" }}>{f.emoji}</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:".16em", color:C.ink, marginBottom:3 }}>{f.name}</div>
                <div style={{ fontSize:8, color:C.terra, letterSpacing:".12em", textTransform:"uppercase" }}>{f.benefit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SPECIALISATIONS */}
        <section id="specs" style={sec()}>
          <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>Areas of Expertise <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "34px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom: mobile ? 32 : 56, color:C.ink }}>Supriya's clinical<br /><em style={{ fontStyle:"italic", color:C.sienna }}>specialisations</em></h2>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap:2 }}>
            {SPECS.map((s, i) => (
              <div key={i} style={{ padding: mobile ? "32px 24px" : "48px 32px", border:`1px solid ${hovSpec === i ? C.sand : C.border}`, background: hovSpec === i ? "rgba(193,105,42,.06)" : "rgba(245,239,230,.35)", position:"relative", overflow:"hidden", transition:"all .5s", cursor:"default" }}
                onMouseEnter={() => setHovSpec(i)} onMouseLeave={() => setHovSpec(null)}>
                {hovSpec === i && <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${C.sienna},transparent)` }} />}
                <div style={{ position:"absolute", top:12, right:20, fontFamily:"'DM Serif Display',serif", fontSize:70, color:"rgba(139,69,19,.07)", lineHeight:1, userSelect:"none" }}>{s.n}</div>
                <div style={{ fontSize:24, marginBottom:18 }}>{s.e}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, marginBottom:10, color:C.ink }}>{s.t}</div>
                <p style={{ fontSize:12, lineHeight:1.9, color:C.dust, fontWeight:300 }}>{s.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONSULT */}
        <div id="consult" style={{ background:`linear-gradient(180deg,${C.bg2},${C.bg3})`, padding: mobile ? "80px 0" : "120px 0", borderTop:`1px solid ${C.border}` }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding: mobile ? "0 20px" : "0 64px" }}>
            <div style={{ textAlign:"center", marginBottom: mobile ? 40 : 72 }}>
              <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
                <span style={{ width:32, height:1, background:C.sienna, display:"block" }} />Private Consultation<span style={{ width:32, height:1, background:C.sienna, display:"block" }} />
              </div>
              <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "32px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom:16, color:C.ink }}>Share your concern.<br /><em style={{ fontStyle:"italic", color:C.sienna }}>Receive Supriya's guidance.</em></h2>
              <p style={{ fontSize:13, color:C.dust, maxWidth:520, margin:"0 auto", lineHeight:2, fontWeight:300 }}>Speak with our AI consultation assistant. Your personalised programme pathway updates in real time.</p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 360px", gap: mobile ? 20 : 32, alignItems:"start" }}>
              {/* CHAT */}
              <div style={{ border:`1px solid ${C.border}`, background:C.cream, display:"flex", flexDirection:"column", height: mobile ? 520 : 620, boxShadow:`0 8px 40px rgba(139,69,19,.07)` }}>
                <div style={{ padding:"18px 22px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:`linear-gradient(135deg,${C.sand},${C.sienna})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontSize:13, color:C.cream, flexShrink:0 }}>S</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize: mobile ? 10 : 11, letterSpacing:".16em", color:C.ink }}>Supriya Walia Practice</div>
                    <div style={{ fontSize:9, color:C.sienna, letterSpacing:".12em", marginTop:2 }}>Confidential Consultation</div>
                  </div>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:"#5cb85c" }} />
                </div>
                <div ref={msgsRef} style={{ flex:1, overflowY:"auto", padding: mobile ? 16 : 22, display:"flex", flexDirection:"column", gap:16 }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display:"flex", gap:8, flexDirection:m.role === "user" ? "row-reverse" : "row" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0, background:m.role === "ai" ? `linear-gradient(135deg,${C.sand},${C.sienna})` : "rgba(139,69,19,.1)", color:C.cream, fontFamily:"'Cinzel',serif" }}>{m.role === "ai" ? "S" : "+"}</div>
                      <div>
                        <div style={{ maxWidth:"82%", padding:"12px 16px", fontSize: mobile ? 12 : 13, lineHeight:1.8, whiteSpace:"pre-line", background:m.role === "ai" ? "rgba(193,105,42,.05)" : "rgba(139,69,19,.06)", border:`1px solid ${C.border}`, color:C.ink, borderRadius:m.role === "ai" ? "0 10px 10px 10px" : "10px 0 10px 10px" }}>{m.text}</div>
                        <div style={{ fontSize:9, color:C.dust, marginTop:4, textAlign:m.role === "user" ? "right" : "left" }}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display:"flex", gap:8 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${C.sand},${C.sienna})`, color:C.cream, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontFamily:"'Cinzel',serif", flexShrink:0 }}>S</div>
                      <div style={{ padding:"12px 16px", background:"rgba(193,105,42,.05)", border:`1px solid ${C.border}`, borderRadius:"0 10px 10px 10px" }}>
                        <div style={{ display:"flex", gap:5 }}>{[0, .2, .4].map(d => <div key={d} style={{ width:6, height:6, borderRadius:"50%", background:C.sand, animation:`td 1.2s ${d}s infinite` }} />)}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding:"0 18px 10px", display:"flex", gap:6, flexWrap:"wrap" }}>
                  {["Constant fatigue","PCOS","Gut issues","Weight loss","Diabetes","Indian diet"].map(q => (
                    <button key={q} onClick={() => send(q)} disabled={loading}
                      style={{ fontSize:9, letterSpacing:".08em", color:C.dust, border:`1px solid ${C.border}`, padding:"5px 10px", background:"transparent", cursor:"pointer" }}
                      onMouseEnter={e => { e.target.style.borderColor = C.sienna; e.target.style.color = C.sienna; }}
                      onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.dust; }}>{q}</button>
                  ))}
                </div>
                <div style={{ padding:"12px 18px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8, alignItems:"flex-end", background:"rgba(245,239,230,.5)" }}>
                  <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} placeholder="Describe your health concern..." rows={2}
                    style={{ flex:1, background:"transparent", border:"none", color:C.ink, fontFamily:"'Jost',sans-serif", fontSize:13, resize:"none", lineHeight:1.6, maxHeight:70, outline:"none" }} />
                  <button onClick={() => send(input)} disabled={loading || !input.trim()}
                    style={{ width:38, height:38, border:`1px solid ${C.sienna}`, background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.sienna, fontSize:13, flexShrink:0, opacity:loading || !input.trim() ? .3 : 1 }}
                    onMouseEnter={e => { if (!loading && input.trim()) { e.currentTarget.style.background = C.sienna; e.currentTarget.style.color = C.cream; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.sienna; }}>></button>
                </div>
              </div>

              {/* SUGGESTION PANEL */}
              <div style={{ border:`1px solid ${glow ? C.sienna : C.border}`, background:C.cream, overflow:"hidden", position: mobile ? "static" : "sticky", top:120, transition:"border-color .5s", boxShadow:`0 8px 40px rgba(139,69,19,.06)` }}>
                <div style={{ padding:"16px 22px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:C.sienna }} />
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".22em", color:C.sienna }}>Your Programme Pathway</div>
                </div>
                <div style={{ padding:22 }}>
                  <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:18, fontStyle:"italic", color:C.ink, marginBottom:12, lineHeight:1.35 }}>{sug.greeting}</div>
                  <div style={{ fontSize:12, lineHeight:1.9, color:C.dust, marginBottom:18, fontWeight:300 }}>{sug.body}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {(sug.recs || []).map((r, i) => (
                      <div key={i} style={{ padding:"12px 15px", background:"rgba(193,105,42,.04)", border:"1px solid transparent", display:"flex", alignItems:"flex-start", gap:10, transition:"all .3s", cursor:"default" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = "rgba(193,105,42,.09)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "rgba(193,105,42,.04)"; }}>
                        <span style={{ fontSize:13, flexShrink:0, marginTop:2 }}>{r.icon}</span>
                        <div><div style={{ fontFamily:"'DM Serif Display',serif", fontSize:14, color:C.ink, marginBottom:2 }}>{r.title}</div><div style={{ fontSize:11, color:C.dust, lineHeight:1.6 }}>{r.desc}</div></div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => go("booking")} style={{ width:"100%", marginTop:18, fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".22em", color:C.cream, background:C.sienna, border:"none", padding:14, cursor:"pointer", textTransform:"uppercase" }}
                    onMouseEnter={e => e.target.style.background = C.terra} onMouseLeave={e => e.target.style.background = C.sienna}>Book With Supriya</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* APPROACH */}
        <section id="approach" style={sec()}>
          <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>The Approach <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "34px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom: mobile ? 32 : 56, color:C.ink }}>How Supriya <em style={{ fontStyle:"italic", color:C.sienna }}>works</em></h2>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap:2 }}>
            {[
              { n:"01", t:"Deep Listening First", b:"No plan is built before Supriya conducts a thorough clinical assessment -- understanding your history, lifestyle, food culture, and personal goals in full." },
              { n:"02", t:"Root Cause, Not Symptoms", b:"Every recommendation traces back to the underlying cause. Supriya designs therapeutic strategies from first principles, specific to your unique physiology." },
              { n:"03", t:"Sustainable by Design", b:"Programmes built to last. Supriya works with foods you can realistically maintain -- Indian home cooking and family meals are never ignored." },
            ].map((a, i) => (
              <div key={i} style={{ padding: mobile ? "32px 24px" : "44px 32px", border:`1px solid ${C.border}`, transition:"all .4s", background:"transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(193,105,42,.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:"rgba(139,69,19,.1)", lineHeight:1, marginBottom:16 }}>{a.n}</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:22, color:C.ink, marginBottom:10 }}>{a.t}</div>
                <p style={{ fontSize:12, color:C.dust, lineHeight:1.9, fontWeight:300 }}>{a.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ ...sec(), background:"rgba(193,105,42,.02)" }}>
          <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>Client Experiences <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
          <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "34px" : "clamp(34px,3.5vw,58px)", lineHeight:1.05, marginBottom: mobile ? 32 : 56, color:C.ink }}>Lives <em style={{ fontStyle:"italic", color:C.sienna }}>reclaimed</em></h2>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap:2 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ padding: mobile ? "32px 24px" : "44px 32px", border:`1px solid ${C.border}`, transition:"all .4s", background:"rgba(245,239,230,.4)" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(193,105,42,.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(245,239,230,.4)"}>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:56, color:C.sienna, lineHeight:.35, marginBottom:16 }}>"</div>
                <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, fontStyle:"italic", lineHeight:1.75, color:C.ink, marginBottom:24 }}>{t.q}</div>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:38, height:38, background:"rgba(139,69,19,.1)", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cinzel',serif", fontSize:11, color:C.sienna, flexShrink:0 }}>{t.i}</div>
                  <div><div style={{ fontSize:12, color:C.ink }}>{t.n}</div><div style={{ fontSize:9, color:C.dust, marginTop:2 }}>{t.d}</div></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING */}
        <div id="booking" style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", borderTop:`1px solid ${C.border}` }}>
          <div style={{ padding: mobile ? "80px 24px" : "120px 80px", background:`linear-gradient(148deg,${C.bg2},${C.bg3})` }}>
            <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:C.sienna, marginBottom:16, display:"flex", alignItems:"center", gap:14 }}>Book Your Consultation <span style={{ width:32, height:1, background:C.sienna, display:"block" }} /></div>
            <h2 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? "32px" : "clamp(30px,3vw,50px)", lineHeight:1.05, marginBottom:20, color:C.ink }}>The first step<br />is a single<br /><em style={{ fontStyle:"italic", color:C.sienna }}>conversation.</em></h2>
            <p style={{ fontSize:13, color:C.dust, maxWidth:360, lineHeight:2, fontWeight:300 }}>Initial consultations begin with a thorough clinical intake. Supriya's team will contact you within 24 hours to confirm your appointment.</p>
            <div style={{ marginTop:40, paddingTop:36, borderTop:`1px solid ${C.border}` }}>
              <div style={{ fontSize:9, letterSpacing:".35em", color:C.sienna, textTransform:"uppercase", marginBottom:10 }}>Available Via</div>
              <div style={{ fontSize:13, color:C.dust, lineHeight:2, fontWeight:300 }}>In-Person (Delhi) . Video Call<br />WhatsApp . Virtual Worldwide</div>
            </div>
          </div>
          <div style={{ background:C.sienna, padding: mobile ? "60px 24px" : "80px 60px" }}>
            <div style={{ fontSize:9, letterSpacing:".55em", textTransform:"uppercase", color:"rgba(245,239,230,.45)", marginBottom:16 }}>Begin</div>
            <h3 style={{ fontFamily:"'DM Serif Display',serif", fontSize: mobile ? 32 : 36, color:C.cream, marginBottom:0 }}>Book with<br /><em style={{ fontStyle:"italic" }}>Supriya</em></h3>
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginTop:36 }}>
              {[["Full Name", "text", "Your name"], ["Email or WhatsApp", "text", "Contact details"]].map(([l, type, ph]) => (
                <div key={l}>
                  <div style={{ fontSize:8, letterSpacing:".45em", color:"rgba(245,239,230,.45)", textTransform:"uppercase", marginBottom:5 }}>{l}</div>
                  <input type={type} placeholder={ph} style={{ width:"100%", background:"rgba(255,255,255,.1)", border:"none", borderBottom:"1px solid rgba(245,239,230,.3)", color:C.cream, fontFamily:"'Jost',sans-serif", fontSize:14, padding:"10px 0", outline:"none" }} />
                </div>
              ))}
              {[["Primary Concern", ["Weight Management","PCOS & Hormonal Health","Gut Health & IBS","Diabetes & Pre-Diabetes","Cardiac Nutrition","Sports Nutrition","Prenatal / Postnatal","Executive Wellness","General Healthy Eating","Other"]],
                ["Preferred Format", ["In-Person -- Delhi", "Video Call", "WhatsApp Consultation"]]].map(([l, opts]) => (
                <div key={l}>
                  <div style={{ fontSize:8, letterSpacing:".45em", color:"rgba(245,239,230,.45)", textTransform:"uppercase", marginBottom:5 }}>{l}</div>
                  <select style={{ width:"100%", background:"rgba(255,255,255,.1)", border:"none", borderBottom:"1px solid rgba(245,239,230,.3)", color:C.cream, fontFamily:"'Jost',sans-serif", fontSize:14, padding:"10px 0", outline:"none" }}>
                    <option value="" style={{ background:C.sienna }}>Select...</option>
                    {opts.map(o => <option key={o} style={{ background:C.sienna }}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".28em", color:C.sienna, background:C.cream, border:"none", padding:15, cursor:"pointer", marginTop:8, textTransform:"uppercase" }}
                onMouseEnter={e => e.target.style.background = C.bg} onMouseLeave={e => e.target.style.background = C.cream}>Request Appointment</button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ padding: mobile ? "48px 24px 32px" : "64px 64px 40px", borderTop:`1px solid ${C.border}`, background:C.bg2 }}>
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: mobile ? 32 : 56, marginBottom:48 }}>
            <div style={{ gridColumn: mobile ? "1/-1" : "auto" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, letterSpacing:".45em", color:C.sienna, marginBottom:4 }}>Supriya Walia</div>
              <div style={{ fontSize:8, letterSpacing:".35em", color:C.dust, marginBottom:12, fontWeight:300 }}>Clinical Dietician & Nutritional Therapist</div>
              <p style={{ fontSize:12, color:C.dust, lineHeight:1.9, maxWidth:220, fontWeight:300 }}>Evidence-based nutrition, rooted in Indian food culture. Healing through understanding.</p>
            </div>
            {[["Services", ["Weight Management","Hormonal Health","Gut Healing","Diabetes Nutrition","Sports Nutrition","Corporate Wellness"]],
              ["Practice", ["About Supriya","Philosophy","Approach","Client Stories"]],
              ["Connect", ["Book Appointment","WhatsApp","Delhi Clinic","Virtual Sessions"]]].map(([h, ls]) => (
              <div key={h}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".32em", color:C.sienna, marginBottom:14, textTransform:"uppercase" }}>{h}</div>
                {ls.map(l => <div key={l} style={{ fontSize:11, color:C.dust, marginBottom:9, cursor:"pointer", fontWeight:300, transition:"color .3s" }} onMouseEnter={e => e.target.style.color = C.ink} onMouseLeave={e => e.target.style.color = C.dust}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:`1px solid ${C.border}`, paddingTop:24, fontSize:9, color:C.dust, letterSpacing:".12em", flexWrap:"wrap", gap:12 }}>
            <span>2025 Supriya Walia. All rights reserved.</span>
            <span style={{ fontFamily:"'Cinzel',serif", letterSpacing:".5em", color:C.sienna }}>SW</span>
            <span>Privacy . Terms</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

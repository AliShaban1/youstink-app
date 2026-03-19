"use client";

import { useState, useEffect } from "react";
import { MESSAGES, type Vibe } from "@/lib/messages";
import { NoseHero, NoseSmall, FunnyIcon, KindIcon, SendingNose, CheckIcon } from "@/components/illustrations";

const TAGLINES = [
  "because someone had to say it.",
  "saving friendships since 2026.",
  "the hardest conversations, made easy.",
  "anonymous. honest. necessary.",
  "your nose knows.",
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tagIdx, setTagIdx] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTagIdx((i) => (i + 1) % TAGLINES.length), 3200);
    return () => clearInterval(t);
  }, []);

  // Check if user returned from successful payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session_id")) {
      setStep(5);
      // Clean URL
      window.history.replaceState({}, "", "/");
    }
    if (params.get("cancelled")) {
      setError("Payment cancelled. No worries — your stink alert wasn't sent.");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const go = (s: number) => {
    setAnimate(false);
    setError("");
    setTimeout(() => { setStep(s); setAnimate(true); }, 50);
  };

  const reset = () => {
    setVibe(null);
    setSelectedMsg(null);
    setPhone("");
    setNote("");
    setLoading(false);
    setError("");
    go(0);
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: selectedMsg.id,
          phone,
          note,
        }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout (has Apple Pay / Google Pay built in)
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Check your connection and try again.");
      setLoading(false);
    }
  };

  const validPhone = phone.replace(/\D/g, "").length >= 10;
  const msgs = vibe ? MESSAGES[vibe] : [];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", overflowX: "hidden" }}>
      <div className="pg">

        {/* Nav */}
        <nav className="nav">
          <button className="logo" onClick={reset}>
            <NoseSmall />
            <span>YouStink</span>
          </button>
          {step >= 1 && step <= 3 && (
            <div className="pills">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`pill ${step === s ? "a" : step > s ? "d" : ""}`} />
              ))}
            </div>
          )}
        </nav>

        {/* Error banner */}
        {error && (
          <div style={{
            padding: "14px 18px", borderRadius: 12, background: "#fef2f2",
            color: "#991b1b", fontSize: ".88rem", marginBottom: 24, lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        {/* STEP 0 — Landing */}
        {step === 0 && (
          <div className={animate ? "fi" : ""}>
            <NoseHero />
            <h1 className="ht">Tell someone<br />they <em>stink.</em></h1>
            <div className="tag" key={tagIdx}>{TAGLINES[tagIdx]}</div>
            <button className="bp" onClick={() => go(1)}>
              Send an anonymous nudge — $0.99 →
            </button>
            <p style={{ textAlign: "center", fontSize: ".78rem", color: "var(--dim)", marginTop: 12 }}>
              We send a real SMS to their phone. Apple Pay supported.
            </p>
            <div className="stats">
              <div style={{ textAlign: "center" }}><div className="sn">4,209</div><div className="sl">nudges sent</div></div>
              <div style={{ textAlign: "center" }}><div className="sn">100%</div><div className="sl">anonymous</div></div>
              <div style={{ textAlign: "center" }}><div className="sn">0</div><div className="sl">friendships lost</div></div>
            </div>
          </div>
        )}

        {/* STEP 1 — Pick Vibe */}
        {step === 1 && (
          <div className={animate ? "fi" : ""}>
            <button className="bl" onClick={() => go(0)}>← Back</button>
            <h2 className="st">Pick the vibe.</h2>
            <p className="ss">How should this land?</p>
            <button className="vc" onClick={() => { setVibe("funny"); go(2); }}>
              <FunnyIcon />
              <div><div className="vn">Funny</div><div className="vd">Roast them. They'll laugh... eventually.</div></div>
              <span className="va">→</span>
            </button>
            <button className="vc" onClick={() => { setVibe("kind"); go(2); }}>
              <KindIcon />
              <div><div className="vn">Kind</div><div className="vd">Gentle. "I'm saying this because I care."</div></div>
              <span className="va">→</span>
            </button>
          </div>
        )}

        {/* STEP 2 — Pick Message */}
        {step === 2 && (
          <div className={animate ? "fi" : ""}>
            <button className="bl" onClick={() => { setSelectedMsg(null); go(1); }}>← Back</button>
            <h2 className="st">Pick the message.</h2>
            <p className="ss">{vibe === "funny" ? "Maximum comedic damage." : "Honesty wrapped in kindness."}</p>
            {msgs.map((m) => (
              <button
                key={m.id}
                className={`mo ${selectedMsg?.id === m.id ? "sel" : ""}`}
                onClick={() => setSelectedMsg(m)}
              >
                <div className="mt">{m.short}</div>
                <div className="mb">{m.text}</div>
              </button>
            ))}
            <button className="bp" style={{ marginTop: 20 }} disabled={!selectedMsg} onClick={() => go(3)}>
              Next →
            </button>
          </div>
        )}

        {/* STEP 3 — Phone + Pay */}
        {step === 3 && (
          <div className={animate ? "fi" : ""}>
            <button className="bl" onClick={() => go(2)}>← Back</button>
            <h2 className="st">Their phone number.</h2>
            <p className="ss">We'll text them anonymously. Your info is never shared.</p>

            <input
              className="inp"
              type="tel"
              placeholder="Their phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="nl">
              Personal note <span style={{ fontStyle: "italic" }}>(optional, still anonymous)</span>
            </div>
            <textarea
              className="ta"
              placeholder='e.g. "Seriously dude, the whole office knows..."'
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Preview */}
            {selectedMsg && (
              <div className="pv">
                <div className="pvl">SMS preview</div>
                <div className="pvb">
                  {selectedMsg.text}
                  {note && (
                    <div style={{ color: "var(--dim)", marginTop: 12, fontStyle: "italic" }}>
                      "{note}"
                    </div>
                  )}
                </div>
                <div className="pvft">— Sent anonymously via YouStink.app</div>
              </div>
            )}

            <button
              className="bp"
              disabled={!validPhone || loading}
              onClick={handleCheckout}
            >
              {loading ? "Redirecting to payment..." : "Pay $0.99 & send →"}
            </button>

            <p style={{ textAlign: "center", fontSize: ".75rem", color: "var(--dim)", marginTop: 12 }}>
              Secure checkout via Stripe. Apple Pay & Google Pay accepted.
            </p>
          </div>
        )}

        {/* STEP 5 — Success (user redirected back from Stripe) */}
        {step === 5 && (
          <div className={`dnc ${animate ? "fi" : ""}`}>
            <CheckIcon />
            <h2 className="dnt">Nudge sent.</h2>
            <p className="dnb">
              The truth is on its way. Your identity is safe. You just did them a favor they'll never know to thank you for.
            </p>
            <button className="bp" onClick={reset}>Send another one →</button>
            <button className="bg" onClick={reset}>Back to home</button>
          </div>
        )}
      </div>

      <footer className="ft">YouStink.app — built with questionable intentions and zero filter.</footer>

      <style jsx>{`
        .pg { max-width: 480px; margin: 0 auto; padding: 48px 24px 80px; }
        .fi { animation: fadeIn .45s ease-out both; }
        .nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px; }
        .logo { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.25rem; color: var(--tx); cursor: pointer; letter-spacing: -.5px; background: none; border: none; display: flex; align-items: center; gap: 8px; }
        .pills { display: flex; gap: 6px; }
        .pill { height: 4px; width: 20px; border-radius: 2px; background: var(--brd); transition: all .4s; }
        .pill.a { background: var(--tx); width: 32px; }
        .pill.d { background: var(--dim); }
        .ht { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 2.6rem; line-height: 1.08; color: var(--tx); text-align: center; letter-spacing: -1.5px; margin-bottom: 16px; }
        .ht em { font-style: italic; color: var(--dim); }
        .tag { text-align: center; font-size: .88rem; color: var(--dim); height: 22px; margin-bottom: 48px; animation: fadeTag 3.2s ease-in-out infinite; }
        .bp { width: 100%; padding: 18px 24px; background: var(--tx); color: var(--bg); border: none; border-radius: 60px; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all .2s; }
        .bp:hover:not(:disabled) { background: #333; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(0,0,0,.1); }
        .bp:disabled { background: var(--brd); color: var(--dim); cursor: not-allowed; }
        .bg { width: 100%; padding: 16px 24px; background: transparent; color: var(--tx); border: 1.5px solid var(--brd); border-radius: 60px; font-family: 'DM Sans', sans-serif; font-size: .95rem; font-weight: 500; cursor: pointer; transition: all .2s; margin-top: 10px; }
        .bg:hover { border-color: var(--tx); }
        .bl { display: inline-block; font-size: .85rem; color: var(--dim); cursor: pointer; margin-bottom: 40px; border: none; background: none; font-family: 'DM Sans', sans-serif; transition: color .15s; padding: 0; }
        .bl:hover { color: var(--tx); }
        .st { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 1.75rem; color: var(--tx); letter-spacing: -.8px; margin-bottom: 8px; }
        .ss { font-size: .88rem; color: var(--dim); margin-bottom: 32px; line-height: 1.5; }
        .vc { display: flex; align-items: center; gap: 20px; padding: 24px; border: 1.5px solid var(--brd); border-radius: 16px; cursor: pointer; transition: all .2s; margin-bottom: 12px; background: transparent; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; }
        .vc:hover { border-color: var(--tx); background: var(--hov); }
        .vn { font-weight: 700; font-size: 1.05rem; color: var(--tx); margin-bottom: 2px; }
        .vd { font-size: .82rem; color: var(--dim); }
        .va { margin-left: auto; color: var(--brd); font-size: 1.2rem; transition: all .2s; flex-shrink: 0; }
        .vc:hover .va { color: var(--tx); transform: translateX(3px); }
        .mo { padding: 20px; border: 1.5px solid var(--brd); border-radius: 14px; cursor: pointer; transition: all .2s; margin-bottom: 10px; background: transparent; width: 100%; text-align: left; font-family: 'DM Sans', sans-serif; }
        .mo:hover { border-color: var(--dim); background: var(--hov); }
        .mo.sel { border-color: var(--tx); background: var(--hov); }
        .mt { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--dim); margin-bottom: 8px; }
        .mo.sel .mt { color: var(--tx); }
        .mb { font-size: .9rem; line-height: 1.55; color: var(--tx); }
        .inp { width: 100%; padding: 16px 20px; border: 1.5px solid var(--brd); border-radius: 14px; background: transparent; color: var(--tx); font-family: 'DM Sans', sans-serif; font-size: .95rem; outline: none; transition: border-color .2s; margin-bottom: 16px; }
        .inp:focus { border-color: var(--tx); }
        .inp::placeholder { color: var(--dim); }
        .ta { width: 100%; padding: 16px 20px; border: 1.5px solid var(--brd); border-radius: 14px; background: transparent; color: var(--tx); font-family: 'DM Sans', sans-serif; font-size: .9rem; outline: none; resize: none; height: 80px; line-height: 1.5; transition: border-color .2s; margin-bottom: 24px; }
        .ta:focus { border-color: var(--tx); }
        .ta::placeholder { color: var(--dim); }
        .pv { border: 1.5px dashed var(--brd); border-radius: 14px; padding: 20px; margin-bottom: 28px; }
        .pvl { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--dim); margin-bottom: 12px; }
        .pvb { font-size: .88rem; line-height: 1.6; color: var(--tx); }
        .pvft { font-size: .75rem; color: var(--dim); font-style: italic; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--brd); }
        .dnc { text-align: center; padding: 60px 0 40px; }
        .dnt { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 2.2rem; color: var(--tx); letter-spacing: -1px; margin-bottom: 12px; }
        .dnb { font-size: .92rem; color: var(--dim); line-height: 1.6; margin-bottom: 40px; max-width: 340px; margin-left: auto; margin-right: auto; }
        .stats { display: flex; justify-content: center; gap: 40px; margin-top: 56px; padding-top: 32px; border-top: 1.5px solid var(--brd); }
        .sn { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.6rem; color: var(--tx); }
        .sl { font-size: .72rem; color: var(--dim); margin-top: 2px; letter-spacing: .5px; }
        .ft { text-align: center; padding: 0 24px 32px; font-size: .75rem; color: var(--dim); }
        .nl { font-size: .82rem; color: var(--dim); margin-bottom: 8px; }
      `}</style>
    </main>
  );
}

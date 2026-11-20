export default function CandleSamplePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b1110",
        color: "#e8efeb",
        padding: "48px 20px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p
          style={{
            color: "#79bd91",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textAlign: "center",
            margin: "0 0 12px",
          }}
        >
          NEXUS GLOBAL ACADEMY
        </p>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            lineHeight: 1.15,
            textAlign: "center",
            margin: "0 0 10px",
            fontWeight: 650,
          }}
        >
          Candlestick Style Preview
        </h1>
        <p
          style={{
            color: "#9ba9a2",
            textAlign: "center",
            margin: "0 auto 42px",
            fontSize: 15,
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          One bullish candle and one bearish candle. Review the shape, proportions,
          wick length and overall appearance.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 20,
          }}
        >
          <section
            style={{
              border: "1px solid #263630",
              borderRadius: 18,
              background: "#101a17",
              padding: "18px 16px 18px",
              textAlign: "center",
            }}
          >
            <svg
              viewBox="0 0 260 300"
              role="img"
              aria-label="Single bullish candlestick with deep green body and upper and lower wicks"
              style={{ display: "block", width: "100%", maxWidth: 220, margin: "0 auto" }}
            >
              <defs>
                <linearGradient id="bullBody" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#07512f" />
                  <stop offset="48%" stopColor="#0b663b" />
                  <stop offset="100%" stopColor="#064326" />
                </linearGradient>
              </defs>
              {[55, 105, 155, 205, 255].map((y) => (
                <line key={y} x1="18" y1={y} x2="242" y2={y} stroke="#263630" strokeWidth="1" />
              ))}
              <line x1="130" y1="36" x2="130" y2="264" stroke="#0a5934" strokeWidth="4" strokeLinecap="round" />
              <rect x="98" y="91" width="64" height="118" rx="1.5" fill="url(#bullBody)" />
              <line x1="100" y1="93" x2="160" y2="93" stroke="#287b50" strokeWidth="1.5" opacity=".55" />
            </svg>
            <h2 style={{ color: "#16804b", fontSize: 17, margin: "8px 0 4px" }}>Bullish Candle</h2>
            <p style={{ color: "#9ba9a2", fontSize: 13, margin: 0 }}>Close above open</p>
          </section>

          <section
            style={{
              border: "1px solid #263630",
              borderRadius: 18,
              background: "#101a17",
              padding: "18px 16px 18px",
              textAlign: "center",
            }}
          >
            <svg
              viewBox="0 0 260 300"
              role="img"
              aria-label="Single bearish candlestick with deep red body and upper and lower wicks"
              style={{ display: "block", width: "100%", maxWidth: 220, margin: "0 auto" }}
            >
              <defs>
                <linearGradient id="bearBody" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#781a25" />
                  <stop offset="48%" stopColor="#9b202e" />
                  <stop offset="100%" stopColor="#64131e" />
                </linearGradient>
              </defs>
              {[55, 105, 155, 205, 255].map((y) => (
                <line key={y} x1="18" y1={y} x2="242" y2={y} stroke="#263630" strokeWidth="1" />
              ))}
              <line x1="130" y1="36" x2="130" y2="264" stroke="#861b28" strokeWidth="4" strokeLinecap="round" />
              <rect x="98" y="91" width="64" height="118" rx="1.5" fill="url(#bearBody)" />
              <line x1="100" y1="93" x2="160" y2="93" stroke="#b64a54" strokeWidth="1.5" opacity=".5" />
            </svg>
            <h2 style={{ color: "#a72b37", fontSize: 17, margin: "8px 0 4px" }}>Bearish Candle</h2>
            <p style={{ color: "#9ba9a2", fontSize: 13, margin: 0 }}>Close below open</p>
          </section>
        </div>

        <p
          style={{
            color: "#73847b",
            textAlign: "center",
            fontSize: 12,
            lineHeight: 1.6,
            margin: "28px auto 0",
          }}
        >
          Updated visual draft · Tell us what to adjust before using this style in academy lessons.
        </p>
      </div>
    </main>
  );
}

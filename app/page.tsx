const candles = [
  { x: 35, open: 190, close: 135, high: 110, low: 210, bullish: true },
  { x: 80, open: 150, close: 175, high: 130, low: 195, bullish: false },
  { x: 125, open: 180, close: 115, high: 95, low: 200, bullish: true },
  { x: 170, open: 120, close: 70, high: 50, low: 140, bullish: true },
  { x: 215, open: 85, close: 105, high: 65, low: 125, bullish: false },
  { x: 260, open: 110, close: 55, high: 35, low: 125, bullish: true },
];

function CandleChart() {
  return (
    <svg viewBox="0 0 320 250" className="chart" role="img" aria-label="Original NEXUS candlestick illustration">
      <line x1="20" y1="215" x2="300" y2="215" className="axis" />
      <line x1="20" y1="35" x2="20" y2="215" className="axis" />
      <line x1="20" y1="100" x2="300" y2="100" className="level" />
      <line x1="20" y1="150" x2="300" y2="150" className="level" />
      {candles.map((c, i) => {
        const top = Math.min(c.open, c.close);
        const height = Math.max(12, Math.abs(c.open - c.close));
        return (
          <g key={i}>
            <line x1={c.x + 10} y1={c.high} x2={c.x + 10} y2={c.low} className={c.bullish ? "wick green" : "wick red"} />
            <rect x={c.x} y={top} width="20" height={height} rx="2" className={c.bullish ? "body green" : "body red"} />
          </g>
        );
      })}
      <path d="M52 190 L102 178 L147 154 L192 112 L235 95 L278 58" className="trend" />
      <circle cx="192" cy="112" r="5" className="marker" />
      <text x="202" y="108" className="label">confirmation</text>
    </svg>
  );
}

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="brand">
          <div className="logo">N</div>
          <div>
            <strong>NEXUS GLOBAL ACADEMY</strong>
            <span>CANDLESTICK TRADING EDUCATION</span>
          </div>
        </div>
        <div className="badge">EDUCATION</div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NEXUS METHOD</p>
          <h1>Read the candle.<br /><span>Understand the move.</span></h1>
          <p className="intro">
            A structured trading education library built around the NEXUS candlestick approach:
            context, technical area, candle behaviour, confirmation and disciplined execution.
          </p>
          <div className="actions">
            <a href="#foundations" className="primary">Start Foundations</a>
            <a href="#framework" className="secondary">View Framework</a>
          </div>
        </div>
        <div className="chart-card"><CandleChart /></div>
      </section>

      <section id="framework" className="framework">
        <div>
          <p className="eyebrow">THE NEXUS FRAMEWORK</p>
          <h2>We do not chase candles.</h2>
          <p>We build the trade from context to confirmation.</p>
        </div>
        <div className="steps">
          {["Market Direction","Technical Area","Candle Behaviour","Candle Close","Confirmation","Entry + Risk"].map((step, i) => (
            <div className="step" key={step}><span>0{i + 1}</span><strong>{step}</strong></div>
          ))}
        </div>
      </section>

      <section id="foundations" className="library">
        <div className="section-head">
          <div>
            <p className="eyebrow">EDUCATION LIBRARY</p>
            <h2>Build the foundation first.</h2>
          </div>
          <span>01 / FOUNDATIONS</span>
        </div>
        <div className="cards">
          {[
            ["01","Trading Foundations","Learn the NEXUS approach and the sequence behind a valid setup."],
            ["02","Understanding Candlesticks","Learn what candle bodies, wicks and closes can tell you about price behaviour."],
            ["03","Session Trends & Short-Term Candle Behaviour","Read short trends, pullbacks and candle confirmation during trading sessions."],
            ["04","Support & Resistance","Learn how important technical areas interact with candle confirmation."],
            ["05","Candle Confirmation","Understand why a candle appearing is not the same as having confirmation."]
          ].map(([num,title,desc]) => (
            <article className="card" key={num}>
              <span className="number">{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a className="coming" href={num === "02" ? "/lessons/understanding-candlesticks" : num === "03" ? "/lessons/session-trends" : "#"}>{num === "02" || num === "03" ? "OPEN LESSON →" : "MODULE READY TO BUILD"}</a>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div><strong>NEXUS GLOBAL ACADEMY</strong><span>Learn the chart. Master the process.</span></div>
        <span>Original educational illustrations • NEXUS method</span>
      </footer>
    </main>
  );
}

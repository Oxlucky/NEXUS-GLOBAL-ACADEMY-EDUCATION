import PrintButton from "../../components/PrintButton";

const lessons = [
  {title:"Open", text:"The price where the candle begins."},
  {title:"High", text:"The highest price reached during the candle."},
  {title:"Low", text:"The lowest price reached during the candle."},
  {title:"Close", text:"The price where the candle finishes."},
];

function Candle({bullish=false}:{bullish?:boolean}) {
  return (
    <svg viewBox="0 0 110 210" className="lesson-candle" role="img" aria-label={bullish ? "Bullish candlestick" : "Bearish candlestick"}>
      <line x1="55" y1="18" x2="55" y2="192" className={bullish ? "wick-green" : "wick-red"} />
      <rect x="31" y={bullish ? "65" : "45"} width="48" height="100" rx="5" className={bullish ? "body-green" : "body-red"} />
    </svg>
  );
}

function Anatomy() {
  return (
    <div className="anatomy">
      <svg viewBox="0 0 500 270" role="img" aria-label="Original NEXUS candlestick anatomy diagram">
        <line x1="190" y1="28" x2="190" y2="238" className="wick-green-wide" />
        <rect x="145" y="85" width="90" height="95" rx="6" className="body-green" />
        <line x1="238" y1="35" x2="315" y2="35" className="guide" />
        <line x1="238" y1="85" x2="315" y2="85" className="guide" />
        <line x1="238" y1="180" x2="315" y2="180" className="guide" />
        <line x1="238" y1="238" x2="315" y2="238" className="guide" />
        <text x="325" y="39" className="diagram-label">High</text>
        <text x="325" y="89" className="diagram-label">Close</text>
        <text x="325" y="184" className="diagram-label">Open</text>
        <text x="325" y="242" className="diagram-label">Low</text>
        <text x="35" y="255" className="diagram-note">Bullish candle: close is above the open.</text>
      </svg>
    </div>
  );
}

export default function UnderstandingCandlesticks() {
  return (
    <main className="lesson-page">
      <header className="nav lesson-nav">
        <a href="/" className="back">← Education Library</a>
        <div className="lesson-brand">NEXUS GLOBAL ACADEMY</div>
        <span className="badge">LESSON 02</span>
      </header>

      <section className="lesson-hero">
        <p className="eyebrow">FOUNDATIONS / LESSON 02</p>
        <h1>Understanding<br/><span>Candlesticks</span></h1>
        <p>Learn what a candle records, how its body and wicks are formed, and why the close matters inside the NEXUS trading process.</p>
        <PrintButton />
      </section>

      <section className="lesson-section">
        <div className="section-kicker">01 / THE BASICS</div>
        <h2>What is a candlestick?</h2>
        <p>A candlestick is a compact record of price movement during a selected period. It shows four key prices: open, high, low and close.</p>
        <div className="candle-pair">
          <div><Candle bullish/><strong className="green-text">Bullish</strong><p>Close above open.</p></div>
          <div><Candle/><strong className="red-text">Bearish</strong><p>Close below open.</p></div>
        </div>
      </section>

      <section className="lesson-section soft">
        <div className="section-kicker">02 / CANDLE ANATOMY</div>
        <h2>Read the four prices.</h2>
        <Anatomy/>
        <div className="anatomy-grid">
          {lessons.map(item => <article key={item.title}><strong>{item.title}</strong><p>{item.text}</p></article>)}
        </div>
      </section>

      <section className="lesson-section">
        <div className="section-kicker">03 / BODY & WICKS</div>
        <h2>The body shows the open-to-close movement.</h2>
        <p>The body represents the distance between the opening price and closing price. A larger body shows a larger open-to-close movement during that period.</p>
        <p>The upper and lower wicks show how far price travelled beyond the body. A wick can provide useful information, but a wick by itself is not an automatic entry signal.</p>
      </section>

      <section className="lesson-section soft">
        <div className="section-kicker">04 / THE CLOSE</div>
        <h2>Why the candle close matters.</h2>
        <div className="close-grid">
          <article className="close-card green-border"><h3>Bullish close</h3><p>A bullish close can support a bullish idea when it forms in the right market context and at a relevant technical area.</p></article>
          <article className="close-card red-border"><h3>Bearish close</h3><p>A bearish close can support a bearish idea under the equivalent conditions.</p></article>
        </div>
        <div className="rule">A bullish candle does not automatically mean BUY. A bearish candle does not automatically mean SELL.</div>
      </section>

      <section className="lesson-section">
        <div className="section-kicker">05 / THE NEXUS PROCESS</div>
        <h2>We do not chase candles.</h2>
        <p>The candle is one part of a structured setup. Read the market in sequence:</p>
        <div className="sequence">
          {["Market Direction","Technical Area","Candle Behaviour","Candle Close","Confirmation","Entry + Risk"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}
        </div>
        <div className="rule">NO CONFIRMATION = NO ENTRY.</div>
      </section>

      <section className="lesson-section soft">
        <div className="section-kicker">06 / STUDENT PRACTICE</div>
        <h2>Before considering an entry, ask:</h2>
        <ol className="questions">
          <li>What is the current market direction?</li>
          <li>Where is the relevant technical area?</li>
          <li>What did the candle do at that area?</li>
          <li>Where did the candle close?</li>
          <li>What is the confirmation?</li>
          <li>Where is the entry trigger?</li>
          <li>Where is the stop loss?</li>
          <li>Where is the target?</li>
        </ol>
      </section>

      <footer><strong>NEXUS GLOBAL ACADEMY</strong><span>Lesson 02 • Understanding Candlesticks</span></footer>
    </main>
  );
}

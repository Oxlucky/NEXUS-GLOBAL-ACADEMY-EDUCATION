const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outputDir = path.join(process.cwd(), "public", "pdfs");
const outputPath = path.join(outputDir, "understanding-candlesticks.pdf");
fs.mkdirSync(outputDir, { recursive: true });

const GREEN = "#1B7A43";
const DEEP = "#092819";
const INK = "#17251D";
const MUTED = "#64736A";
const LIGHT = "#EAF3ED";
const RED = "#B52A2A";

const doc = new PDFDocument({ size: "A4", margins: { top: 58, bottom: 58, left: 58, right: 58 }, info: {
  Title: "Understanding Candlesticks - NEXUS GLOBAL ACADEMY",
  Author: "NEXUS GLOBAL ACADEMY",
  Subject: "Beginner trading education"
}});
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

function header(kicker, page) {
  doc.rect(0, 0, 595.28, 12).fill(GREEN);
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(9).text("NEXUS GLOBAL ACADEMY", 58, 30);
  doc.fillColor(MUTED).font("Helvetica").fontSize(8).text("TRADING EDUCATION  /  LESSON 01", 365, 31, { width: 172, align: "right" });
  doc.moveTo(58, 48).lineTo(537, 48).lineWidth(0.7).strokeColor("#DCE7DF").stroke();
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(8).text(kicker.toUpperCase(), 58, 65, { characterSpacing: 1.2 });
  doc.moveTo(58, 780).lineTo(537, 780).lineWidth(0.7).strokeColor("#DCE7DF").stroke();
  doc.fillColor(MUTED).font("Helvetica").fontSize(8).text("NEXUS GLOBAL ACADEMY  •  LEARN THE CHART. MASTER THE PROCESS.", 58, 791);
  doc.text(String(page).padStart(2, "0"), 510, 791, { width: 27, align: "right" });
}
function title(text, y = 88, size = 27) {
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(size).text(text, 58, y, { width: 475, lineGap: 2 });
}
function para(text, y, options = {}) {
  doc.fillColor(options.color || MUTED).font(options.bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(options.size || 11).text(text, 58, y, { width: options.width || 475, lineGap: 4, ...options });
}
function bullet(text, y, color = GREEN) {
  doc.circle(66, y + 6, 3).fill(color);
  doc.fillColor(INK).font("Helvetica").fontSize(10.5).text(text, 80, y, { width: 445, lineGap: 3 });
}
function callout(text, y, fill = LIGHT) {
  doc.roundedRect(58, y, 479, 48, 7).fill(fill);
  doc.fillColor(DEEP).font("Helvetica-Bold").fontSize(10.5).text(text, 72, y + 14, { width: 450, lineGap: 2 });
}
function candle(x, top, bodyHeight, wickTop, wickBottom, bullish = true, scale = 1) {
  const c = bullish ? GREEN : RED;
  doc.moveTo(x + 15 * scale, wickTop).lineTo(x + 15 * scale, wickBottom).lineWidth(2.5 * scale).strokeColor(c).stroke();
  doc.roundedRect(x, top, 30 * scale, bodyHeight, 3 * scale).fill(c);
}
function newPage(kicker, page) { doc.addPage(); header(kicker, page); }

header("FOUNDATIONS", 1);
doc.rect(58, 115, 479, 250).fill(DEEP);
doc.fillColor("#8DD3A5").font("Helvetica-Bold").fontSize(9).text("NEXUS METHOD  /  BEGINNER SERIES", 84, 145, { characterSpacing: 1.6 });
doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(34).text("UNDERSTANDING\nCANDLESTICKS", 84, 180, { width: 400, lineGap: 3 });
doc.fillColor("#D7E9DC").font("Helvetica").fontSize(12).text("A practical introduction to candle structure, price behaviour and the importance of the close.", 84, 285, { width: 390, lineGap: 4 });
candle(420, 205, 62, 170, 305, true, 1.15);
candle(465, 230, 48, 190, 320, false, 1.15);
title("Your learning objective", 405, 20);
para("By the end of this lesson, you should be able to identify the four prices recorded by a candlestick, explain the body and wicks, distinguish bullish from bearish candles, and read candle behaviour without treating one candle as an automatic trade signal.", 440, { size: 11.5 });
callout("NEXUS PRINCIPLE: We do not chase candles. We build the trade from context to confirmation.", 565);
para("LESSON 01  •  FOUNDATIONS", 680, { color: GREEN, bold: true, size: 9 });

newPage("01 / THE BASICS", 2);
title("What is a candlestick?");
para("A candlestick is a visual record of price movement over a selected period. Each candle summarises four important prices: the open, high, low and close.", 135, { size: 12 });
doc.roundedRect(58, 220, 479, 260, 10).fill("#F5F8F5");
candle(175, 300, 90, 245, 425, true, 2.0);
candle(350, 285, 90, 230, 410, false, 2.0);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(12).text("BULLISH", 135, 445, { width: 110, align: "center" });
doc.fillColor(RED).text("BEARISH", 310, 445, { width: 110, align: "center" });
para("Bullish candle: the close is above the open. Bearish candle: the close is below the open.", 510, { size: 11, color: INK });
bullet("The candle colour shows whether price closed above or below its open.", 555);
bullet("The candle's timeframe determines the period being summarised.", 585);
bullet("A candle does not explain the whole market by itself; context still matters.", 615);
callout("A bullish candle is not automatically a BUY. A bearish candle is not automatically a SELL.", 680);

newPage("02 / CANDLE ANATOMY", 3);
title("Read the four prices.");
para("Every standard candlestick records four prices. These values help you understand where price started, how far it travelled, and where it finished during the selected period.", 135, { size: 11.5 });
doc.roundedRect(58, 220, 479, 315, 10).fill("#F5F8F5");
doc.moveTo(215, 260).lineTo(215, 485).lineWidth(5).strokeColor(GREEN).stroke();
doc.roundedRect(174, 315, 82, 105, 5).fill(GREEN);
const labels = [
  ["HIGH", "Highest price reached", 260],
  ["CLOSE", "Bullish candle closes here", 315],
  ["OPEN", "Bullish candle opens here", 420],
  ["LOW", "Lowest price reached", 485]
];
labels.forEach(([a,b,y]) => {
  doc.moveTo(260, Number(y)).lineTo(325, Number(y)).lineWidth(1).strokeColor("#AAB9AF").stroke();
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(10).text(a, 340, Number(y)-8);
  doc.fillColor(INK).font("Helvetica").fontSize(8.5).text(b, 340, Number(y)+7, { width: 160 });
});
para("For a bearish candle, the close is below the open. The positions of open and close therefore reverse.", 565, { size: 10.5 });
callout("Remember: high and low mark the extremes; open and close define the body.", 635);

newPage("03 / BODY AND WICKS", 4);
title("The body shows the open-to-close movement.");
para("The candle body is the filled area between the opening and closing prices. A larger body means a larger difference between those two prices during that period.", 135, { size: 11.5 });
doc.roundedRect(58, 225, 479, 250, 10).fill("#F5F8F5");
candle(145, 300, 85, 250, 435, true, 1.8);
candle(330, 325, 35, 275, 430, true, 1.8);
doc.fillColor(INK).font("Helvetica-Bold").fontSize(10).text("LARGER BODY", 115, 450, { width: 120, align: "center" });
doc.text("SMALLER BODY", 300, 450, { width: 120, align: "center" });
para("The upper wick extends above the body; the lower wick extends below it. Wicks show how far price travelled beyond the open-to-close area before the candle finished.", 505, { size: 11 });
bullet("A wick can show that price explored a level and then moved away from it.", 575);
bullet("A long wick is information to investigate, not an entry instruction.", 605);
bullet("Always consider where the candle formed and how it closed.", 635);
callout("Never make a trading decision from candle shape alone.", 690);

newPage("04 / THE CLOSE", 5);
title("Why the candle close matters.");
para("The close tells you where the candle finished. During a live candle, price can still change. Waiting for the candle to close helps you assess the completed candle rather than reacting to a shape that may change.", 135, { size: 11.5 });
doc.roundedRect(58, 230, 232, 185, 10).fill("#F0F7F1");
doc.roundedRect(305, 230, 232, 185, 10).fill("#FBF1F1");
candle(155, 290, 70, 260, 380, true, 1.6);
candle(402, 290, 70, 260, 380, false, 1.6);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(12).text("BULLISH CLOSE", 82, 385, { width: 185, align: "center" });
doc.fillColor(RED).text("BEARISH CLOSE", 330, 385, { width: 185, align: "center" });
para("A bullish close may support a bullish idea when it forms in the right market context and at a relevant technical area. A bearish close may support a bearish idea under equivalent conditions.", 455, { size: 11 });
callout("Candle direction is not a complete trading setup. Context and confirmation matter.", 565);
bullet("Identify the market direction first.", 635);
bullet("Observe the candle at a meaningful technical area.", 665);
bullet("Assess the completed close before looking for confirmation.", 695);

newPage("05 / THE NEXUS PROCESS", 6);
title("We do not chase candles.");
para("A candle is one part of a structured setup. The NEXUS process moves from the broader market picture towards a planned entry and controlled risk.", 135, { size: 11.5 });
const steps = [
  ["01", "Market Direction"], ["02", "Technical Area"],
  ["03", "Candle Behaviour"], ["04", "Candle Close"],
  ["05", "Confirmation"], ["06", "Entry + Risk"]
];
steps.forEach(([n, label], i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = 58 + col * 247, y = 225 + row * 92;
  doc.roundedRect(x, y, 232, 66, 8).fill("#F0F7F1");
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(10).text(n, x + 15, y + 14);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(11).text(label, x + 48, y + 14, { width: 170 });
});
callout("NO CONFIRMATION = NO ENTRY.", 540);
title("Student practice", 625, 19);
para("Before considering an entry, ask: What is the market direction? Where is the relevant technical area? What did the candle do there? Where did it close? What confirms the idea? Where are the entry trigger, stop loss and target?", 660, { size: 10.5 });

newPage("06 / KNOWLEDGE CHECK", 7);
title("Test your understanding.");
para("Take a moment to answer these questions without looking back at the lesson.", 135, { size: 11.5 });
const questions = [
  "1. What four prices does a candlestick record?",
  "2. What makes a candle bullish?",
  "3. What does the candle body represent?",
  "4. What information do the upper and lower wicks provide?",
  "5. Why is the candle close important?",
  "6. Does a bullish candle automatically mean you should buy?",
  "7. Name the six stages in the NEXUS process."
];
let qy = 205;
questions.forEach((q) => {
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(10.5).text(q, 68, qy, { width: 450 });
  doc.moveTo(68, qy + 38).lineTo(525, qy + 38).lineWidth(0.7).strokeColor("#DCE7DF").stroke();
  qy += 68;
});
callout("Review the lesson and explain each answer in your own words.", 700);

newPage("07 / KEY TAKEAWAYS", 8);
title("What to remember.");
bullet("A candlestick records the open, high, low and close for a selected period.", 145);
bullet("The body represents the distance between the open and the close.", 185);
bullet("The wicks show the highest and lowest prices reached.", 225);
bullet("Bullish means the close is above the open; bearish means it is below.", 265);
bullet("The close helps you assess the completed candle.", 305);
bullet("Candle shapes must be read in market context, not in isolation.", 345);
bullet("The NEXUS process requires confirmation and planned risk before entry.", 385);
doc.roundedRect(58, 465, 479, 125, 10).fill(DEEP);
doc.fillColor("#8DD3A5").font("Helvetica-Bold").fontSize(9).text("THE NEXUS REMINDER", 82, 490, { characterSpacing: 1.2 });
doc.fillColor("#FFFFFF").font("Helvetica-Bold").fontSize(20).text("Read the candle.\nUnderstand the move.", 82, 518, { width: 420, lineGap: 3 });
para("Educational disclaimer: This material is for educational purposes only. It is not financial advice or a recommendation to buy or sell any financial instrument. Trading involves risk, including the possible loss of capital. Always use a risk plan and make independent decisions.", 635, { size: 9, color: MUTED });

doc.end();
stream.on("finish", () => console.log("Generated " + outputPath));
stream.on("error", (error) => { console.error(error); process.exitCode = 1; });

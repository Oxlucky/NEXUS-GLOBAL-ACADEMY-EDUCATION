const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outputDir = path.join(process.cwd(), "public", "pdfs");
const outputPath = path.join(outputDir, "how-to-trade-wickless-candle-part-2.pdf");
fs.mkdirSync(outputDir, { recursive: true });

const GREEN = "#07512F";
const GREEN_2 = "#0A5934";
const RED = "#781A25";
const RED_2 = "#861B28";
const INK = "#17251D";
const MUTED = "#64736A";
const LINE = "#DCE7DF";
const PANEL = "#F5F8F5";
const WHITE = "#FFFFFF";
const GOLD = "#8A6A20";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 48, bottom: 36, left: 52, right: 52 },
  info: {
    Title: "How To Trade Wickless Candle - Part 2",
    Author: "NEXUS GLOBAL ACADEMY",
    Subject: "Wickless candle trading education"
  }
});

const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

const PAGE_W = 595.28;
const LEFT = 52;
const RIGHT = 543;
const CONTENT_W = RIGHT - LEFT;

function pageHeader(page, section) {
  doc.rect(0, 0, PAGE_W, 9).fill(GREEN);
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(8.5)
    .text("NEXUS GLOBAL ACADEMY", LEFT, 25);
  doc.fillColor(MUTED).font("Helvetica").fontSize(7.5)
    .text(section.toUpperCase(), 350, 27, { width: 193, align: "right" });
  doc.moveTo(LEFT, 43).lineTo(RIGHT, 43).lineWidth(0.7).strokeColor(LINE).stroke();
  doc.moveTo(LEFT, 770).lineTo(RIGHT, 770).lineWidth(0.7).strokeColor(LINE).stroke();
  doc.fillColor(MUTED).font("Helvetica").fontSize(7.5)
    .text("NEXUS GLOBAL ACADEMY  •  CANDLESTICK STRATEGY", LEFT, 781);
  doc.text(String(page).padStart(2, "0"), 510, 781, { width: 33, align: "right" });
}

function title(text, y = 72, size = 25) {
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(size)
    .text(text, LEFT, y, { width: CONTENT_W, lineGap: 2 });
}

function subtitle(text, y, size = 10.5) {
  doc.fillColor(MUTED).font("Helvetica").fontSize(size)
    .text(text, LEFT, y, { width: CONTENT_W, lineGap: 3.5 });
}

function sectionTitle(number, text, y) {
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(10)
    .text(number, LEFT, y, { characterSpacing: 1.1 });
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(17)
    .text(text, LEFT, y + 16, { width: CONTENT_W });
  doc.moveTo(LEFT, y + 43).lineTo(RIGHT, y + 43)
    .lineWidth(0.7).strokeColor(LINE).stroke();
}

function body(text, x, y, width, size = 10.2, color = INK, align = "left") {
  doc.fillColor(color).font("Helvetica").fontSize(size)
    .text(text, x, y, { width, lineGap: 3.5, align });
}

function label(text, x, y, width, color = GREEN) {
  doc.fillColor(color).font("Helvetica-Bold").fontSize(8.5)
    .text(text, x, y, { width, align: "center", characterSpacing: 0.7 });
}

function arrow(x1, y1, x2, y2, color = GREEN, width = 1.4) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 7;
  doc.moveTo(x1, y1).lineTo(x2, y2).lineWidth(width).strokeColor(color).stroke();
  doc.moveTo(x2, y2)
    .lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6))
    .lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6))
    .closePath().fill(color);
}

/*
  Chart-style candle:
  - deep green / deep red body
  - thin wick
  - no decorative gradients
  - realistic body-to-wick proportions
*/
function candle(cx, bodyTop, bodyBottom, wickTop, wickBottom, bullish = true, scale = 1) {
  const body = bullish ? GREEN : RED;
  const wick = bullish ? GREEN_2 : RED_2;
  const bodyW = 24 * scale;
  const radius = 1.8 * scale;

  doc.moveTo(cx, wickTop).lineTo(cx, wickBottom)
    .lineWidth(Math.max(1.3, 1.8 * scale)).strokeColor(wick).stroke();

  doc.roundedRect(cx - bodyW / 2, bodyTop, bodyW, bodyBottom - bodyTop, radius)
    .fill(body);
}

function chartPanel(x, y, w, h) {
  doc.roundedRect(x, y, w, h, 8).fill(PANEL);
  doc.roundedRect(x + 1, y + 1, w - 2, h - 2, 8)
    .lineWidth(0.6).strokeColor(LINE).stroke();
}

function pageBreak(page, section) {
  doc.addPage();
  pageHeader(page, section);
}

/* PAGE 1 */
pageHeader(1, "Wickless Candle • Part 2");

doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(8.5)
  .text("CANDLE BEHAVIOUR SERIES", LEFT, 70, { characterSpacing: 1.3 });
title("HOW TO TRADE", 92, 28);
doc.fillColor(RED).font("Helvetica-Bold").fontSize(28)
  .text("WICKLESS CANDLE", LEFT, 123, { width: CONTENT_W });
doc.fillColor(INK).font("Helvetica-Bold").fontSize(13)
  .text("PART-2", LEFT, 158);

chartPanel(LEFT, 196, CONTENT_W, 110);
candle(290, 226, 280, 210, 291, true, 1.15);
candle(345, 215, 272, 204, 286, true, 1.15);
label("WICKLESS BULLISH CANDLE", 224, 292, 180);

doc.fillColor(MUTED).font("Helvetica").fontSize(9.5)
  .text("This lesson continues the wickless-candle concept by focusing on lower-wick formation, respecting the previous low, and multi-timeframe alignment.", LEFT, 332, {
    width: CONTENT_W, lineGap: 4
  });

sectionTitle("01", "Lower Wick Formation vs. No Lower Wick", 400);

chartPanel(LEFT, 462, 224, 215);
candle(164, 520, 604, 495, 635, true, 1.8);
label("LOWER WICK", 93, 642, 142);
arrow(196, 579, 211, 579, MUTED, 1.1);
body("When a bullish candle opens, sellers initially push the price down, but buyers are stronger and push the price back up, eventually forming a bullish candle, and as a result, a lower wick is formed.", 69, 686, 190, 8.1, INK, "center");

chartPanel(319, 462, 224, 215);
candle(431, 522, 604, 505, 604, true, 1.8);
label("NO LOWER WICK", 348, 642, 166);
body("But a bullish candle with no lower wick means there was little to no selling pressure. Technically, it shows that buying pressure was so strong that sellers couldn’t take control even for a moment.", 342, 686, 178, 8.1, INK, "center");

/* PAGE 2 */
pageBreak(2, "Lower Wick Retrace");

sectionTitle("02", "Lower Wick Retrace & Respecting Previous Low", 70);
subtitle("L → H → L → NH", 119, 10.5);

body("But we’ve seen cases where a wickless candle breaks the previous candle’s high and then comes back to form a lower wick. Why does this happen?", LEFT, 154, 232, 9.2);
body("The answer is simple. According to price action, whenever price wants to create a new high, it needs to respect the previous low in order to continue moving in the same direction.", 311, 154, 232, 9.2);

chartPanel(LEFT, 245, CONTENT_W, 275);

/* Candle sequence */
candle(145, 405, 457, 386, 466, true, 1.15);
candle(185, 378, 438, 360, 447, false, 1.15);
candle(225, 335, 423, 321, 432, true, 1.15);
candle(265, 322, 405, 307, 414, true, 1.15);
candle(305, 365, 403, 349, 418, false, 1.15);

doc.moveTo(128, 470).lineTo(335, 470).lineWidth(0.9).strokeColor(MUTED).stroke();
doc.fillColor(MUTED).font("Helvetica").fontSize(7.5).text("previous low", 112, 476);

doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(9).text("H", 260, 300);
doc.fillColor(RED).font("Helvetica-Bold").fontSize(9).text("L", 182, 450);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(9).text("H", 310, 315);
arrow(322, 450, 425, 340, GREEN, 1.5);
doc.fillColor(RED).font("Helvetica-Bold").fontSize(10).text("L", 405, 420);
doc.fillColor(RED).font("Helvetica-Bold").fontSize(10).text("L", 128, 452);
doc.fillColor(RED).font("Helvetica-Bold").fontSize(10).text("L", 220, 448);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(10).text("NH", 433, 330);

doc.fillColor(MUTED).font("Helvetica").fontSize(8.5)
  .text("The idea illustrated above: price pushes higher, retraces to respect the previous low, then continues toward a new high.", 78, 500, {
    width: 430, align: "center"
  });

doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(11)
  .text("PRICE ACTION IDEA", LEFT, 555);
body("When price wants to continue in the same direction, respecting the previous low is part of the behaviour you are watching. The lower wick can appear during that retracement before continuation.", LEFT, 580, CONTENT_W, 10);

chartPanel(LEFT, 645, CONTENT_W, 82);
doc.fillColor(INK).font("Helvetica-Bold").fontSize(10)
  .text("L → H → L → NH", LEFT + 20, 665, { width: 180 });
body("Watch the relationship between the previous low, the retracement and the next push higher.", LEFT + 205, 660, 240, 8.8, MUTED);

/* PAGE 3 */
pageBreak(3, "BUT & Multi-Timeframe Alignment");

sectionTitle("03", "BUT & Multi-Timeframe Alignment", 70);
subtitle("M30 & M15", 119, 10.5);

chartPanel(LEFT, 155, 224, 180);
label("BUT", LEFT + 15, 174, 194, RED);
body("Sometimes, the candle continues pushing higher without forming a lower wick. However, the price doesn’t often give you an opportunity to catch such moves. In certain situations, though, you can still trade these candles.", 72, 205, 184, 8.8, INK, "center");
arrow(105, 315, 225, 315, GREEN, 1.5);

chartPanel(319, 155, 224, 180);
label("MULTI-TIMEFRAME ALIGNMENT", 327, 174, 208, INK);

doc.fillColor(INK).font("Helvetica-Bold").fontSize(8.5)
  .text("(M30)", 329, 201);
candle(373, 238, 300, 223, 308, true, 0.85);
candle(405, 220, 276, 207, 286, true, 0.85);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(7.5).text("M30", 358, 310);

doc.fillColor(INK).font("Helvetica-Bold").fontSize(8.5)
  .text("(M15)", 455, 201);
candle(454, 252, 288, 240, 296, false, 0.72);
candle(475, 246, 279, 233, 286, false, 0.72);
candle(496, 218, 274, 205, 282, true, 0.72);
arrow(440, 230, 489, 208, GREEN, 1.1);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(7.5).text("M15", 462, 310);

body("1. There was a setup in M30, candle wicked down, gave respect to previous low, broke high & pushing up.", 62, 360, 220, 8.6);
body("2. first part of M30 (first M15 candle) closed above resistance or gave a direction.", 315, 360, 220, 8.6);
body("3. If the second part of M30 (2nd M15 candle) breaks previous high with no/small lower wick, look for buy as M30 respected previous low. Stop loss goes at the M30 candle’s low.", 315, 455, 220, 8.6);

doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(11)
  .text("THE ALIGNMENT ILLUSTRATED", LEFT, 555);

chartPanel(LEFT, 580, CONTENT_W, 130);
candle(150, 625, 675, 608, 685, true, 1.0);
candle(187, 605, 654, 592, 665, true, 1.0);
candle(224, 593, 640, 582, 648, true, 1.0);
arrow(246, 615, 294, 615, GREEN, 1.4);
doc.fillColor(INK).font("Helvetica-Bold").fontSize(8).text("M30 RESPECTS PREVIOUS LOW", 257, 591, { width: 100, align: "center" });
candle(340, 630, 670, 615, 678, false, 0.82);
candle(370, 620, 662, 605, 670, false, 0.82);
candle(400, 595, 650, 583, 655, true, 0.82);
arrow(420, 615, 468, 585, GREEN, 1.4);
doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(8).text("M15 BREAKS PREVIOUS HIGH", 444, 625, { width: 86, align: "center" });

doc.fillColor(MUTED).font("Helvetica").fontSize(7.8)
  .text("Illustration recreated from the lesson content. Candle drawings are original vector artwork.", LEFT, 744, { width: CONTENT_W, align: "center" });

/* PAGE 4 */
pageBreak(4, "Student Checklist");

title("Wickless Candle — Part 2", 72, 24);
subtitle("A clean review of the three ideas covered in this lesson.", 111);

const cards = [
  ["01", "Lower wick vs. no lower wick", "A lower wick can show that sellers pushed down before buyers regained control. A wickless bullish candle shows little to no lower-wick selling pressure in the candle described in this lesson."],
  ["02", "Retrace & previous low", "The lesson focuses on the sequence L → H → L → NH and the idea that price should respect the previous low when continuing in the same direction."],
  ["03", "BUT & M30/M15 alignment", "Sometimes price continues higher without a lower wick. The lesson also describes an M30 setup aligning with M15 candles before looking for a buy and placing the stop loss at the M30 candle’s low."]
];

let y = 170;
cards.forEach(([n, h, t]) => {
  chartPanel(LEFT, y, CONTENT_W, 132);
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(9).text(n, LEFT + 18, y + 18);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(13).text(h, LEFT + 52, y + 16, { width: 405 });
  body(t, LEFT + 52, y + 48, 405, 9.2, MUTED);
  y += 154;
});

doc.roundedRect(LEFT, 650, CONTENT_W, 72, 8).fill(GREEN);
doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(12)
  .text("STUDY THE CANDLE. STUDY THE PRICE BEHAVIOUR.", LEFT + 20, 670, {
    width: CONTENT_W - 40, align: "center"
  });

doc.end();
stream.on("finish", () => console.log("Generated " + outputPath));
stream.on("error", (error) => { console.error(error); process.exitCode = 1; });

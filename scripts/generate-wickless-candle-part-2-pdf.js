const fs=require("fs");
const path=require("path");
const PDFDocument=require("pdfkit");

const outDir=path.join(process.cwd(),"public","pdfs");
const out=path.join(outDir,"how-to-trade-wickless-candle-part-2.pdf");
fs.mkdirSync(outDir,{recursive:true});

const doc=new PDFDocument({size:"A4",margin:0,info:{
  Title:"How To Trade Wickless Candle Part-2",
  Author:"NEXUS GLOBAL ACADEMY"
}});
doc.pipe(fs.createWriteStream(out));

const W=595,H=842;
const GREEN="#07512F", RED="#781A25", INK="#17251D", MUTED="#5E6B63", LINE="#DCE3DE";

function txt(t,x,y,w,size=8.2,color=INK,bold=false,align="left"){
  doc.fillColor(color).font(bold?"Helvetica-Bold":"Helvetica").fontSize(size)
    .text(t,x,y,{width:w,align,lineGap:1.2});
}
function line(y){
  doc.moveTo(50,y).lineTo(545,y).lineWidth(.65).strokeColor(LINE).stroke();
}
function candle(cx,bodyTop,bodyBottom,wickTop,wickBottom,bull=true,s=1){
  const c=bull?GREEN:RED;
  const bw=20*s;
  doc.moveTo(cx,wickTop).lineTo(cx,wickBottom).lineWidth(1.8*s).strokeColor(c).stroke();
  doc.rect(cx-bw/2,bodyTop,bw,bodyBottom-bodyTop).fill(c);
}
function arrow(x1,y1,x2,y2,color=INK){
  const a=Math.atan2(y2-y1,x2-x1), h=6;
  doc.moveTo(x1,y1).lineTo(x2,y2).lineWidth(1.2).strokeColor(color).stroke();
  doc.moveTo(x2,y2).lineTo(x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45))
    .lineTo(x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)).closePath().fill(color);
}
function smallLabel(t,x,y,w,color=INK){txt(t,x,y,w,7.5,color,true,"center");}

/* Header — same information/order as the source PDF, redesigned cleanly. */
txt("HOW TO TRADE",160,72,275,15,INK,true,"center");
txt("WICKLESS CANDLE",150,92,295,20,RED,true,"center");
txt("PART-2",245,116,105,9,INK,true,"center");
line(137);

/* Top standalone candle */
candle(367,164,220,154,229,true,1.25);
candle(387,151,205,144,213,true,1.25);
txt("?",394,171,18,11,RED,true,"center");

/* 1 */
txt("1. Lower Wick Formation vs. No Lower Wick",50,151,495,10.2,INK,true);
line(166);

candle(120,205,292,193,313,true,1.55);
arrow(139,273,169,281,MUTED);
txt("When a bullish candle opens, sellers initially push the price down, but buyers are stronger and push the price back up, eventually forming a bullish candle, and as a result, a lower wick is formed.",171,214,166,7.6,INK,false,"center");

candle(352,205,292,205,292,true,1.55);
txt("But a bullish candle with no lower wick means there was little to no selling pressure. Technically, it shows that buying pressure was so strong that sellers couldn’t take control even for a moment.",388,214,153,7.6,INK,false,"center");
txt("?",359,300,14,10,RED,true,"center");

/* 2 */
txt("2. Lower Wick Retrace & Respecting Previous Low (L → H → L → NH)",50,324,495,10.2,INK,true);
line(339);

txt("But we’ve seen cases where a wickless candle breaks the previous candle’s high and then comes back to form a lower wick. Why does this happen?",52,348,220,7.5,INK,false,"center");
txt("The answer is simple. According to price action, whenever price wants to create a new high, it needs to respect the previous low in order to continue moving in the same direction.",323,348,220,7.5,INK,false,"center");

/* Exact source-style left candle sequence */
candle(174,405,463,393,474,true,1.0);
candle(199,412,467,399,476,false,1.0);
candle(224,390,457,379,466,true,1.0);
candle(250,368,440,357,449,true,1.0);
candle(278,397,425,388,436,false,1.0);
doc.moveTo(157,469).lineTo(298,469).lineWidth(.8).strokeColor(INK).stroke();
arrow(291,390,314,369,GREEN);
txt("H",253,355,16,8,GREEN,true,"center");
txt("L",193,472,16,8,RED,true,"center");

/* Exact source-style right 2-candle + path diagram */
candle(408,390,439,379,451,true,1.05);
candle(437,371,421,360,432,true,1.05);
txt("H",432,351,16,8,GREEN,true,"center");
txt("L",408,442,16,8,RED,true,"center");
arrow(458,407,478,407,GREEN);
doc.moveTo(490,431).lineTo(518,398).lineWidth(1.6).strokeColor(INK).stroke();
doc.moveTo(518,398).lineTo(492,374).lineWidth(1.6).strokeColor(INK).stroke();
doc.moveTo(492,374).lineTo(528,342).lineWidth(1.6).strokeColor(INK).stroke();
txt("L",482,432,15,8,RED,true,"center");
txt("L",510,401,15,8,RED,true,"center");
txt("NH",529,333,22,8,RED,true,"center");
txt("H",487,357,15,8,GREEN,true,"center");

/* 3 */
txt("3. BUT & Multi-Timeframe Alignment (M30 & M15)",50,489,495,10.2,INK,true);
line(504);

txt("BUT",83,514,180,11,RED,true,"center");
txt("MULTI-TIMEFRAME ALIGNMENT",315,514,220,10.5,RED,true,"center");

txt("Sometimes, the candle continues pushing higher without forming a lower wick. However, the price doesn’t often give you an opportunity to catch such moves. In certain situations, though, you can still trade these candles.",57,535,170,7.2,INK,false,"center");
arrow(92,614,198,614,GREEN);

txt("(M30)",276,536,45,8,INK,true,"center");
candle(292,568,606,556,616,true,.92);
candle(317,552,588,541,598,true,.92);
txt("1. There was a setup in M30, candle wicked down, gave respect to previous low, broke high & pushing up.",255,623,115,6.8,INK,false,"center");

txt("2. first part of m30 (first M15 candle) closed above resistance or gave a direction",365,535,118,6.8,INK,false,"center");

txt("3. If the second part of M30 (2nd M15 candle) breaks previous high with no/small lower wick, look for buy as M30 respected previous low. Stop loss goes at the M30 candle’s low.",486,535,59,6.6,INK,false,"center");

/* M15 candle cluster */
txt("(M15)",410,665,80,8,INK,true,"center");
candle(414,584,621,576,628,false,.72);
candle(437,576,616,567,623,false,.72);
candle(460,553,609,545,616,true,.72);
arrow(470,568,490,550,GREEN);
arrow(490,550,506,532,GREEN);

/* Small labels matching the source's visual annotations */
txt("M30",278,610,34,6.8,MUTED,true,"center");
txt("M15",406,674,80,6.8,MUTED,true,"center");

line(735);
txt("How To Trade Wickless Candle Part-2",50,748,220,7.5,MUTED);
txt("NEXUS GLOBAL ACADEMY",205,748,185,7.5,GREEN,true,"center");
txt("Page 1 of 1",487,748,58,7.5,MUTED,false,"right");

doc.end();

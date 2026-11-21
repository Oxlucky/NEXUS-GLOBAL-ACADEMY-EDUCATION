const fs=require("fs");
const path=require("path");
const PDFDocument=require("pdfkit");

const outDir=path.join(process.cwd(),"public","pdfs");
const out=path.join(outDir,"counter-trend.pdf");
fs.mkdirSync(outDir,{recursive:true});

const doc=new PDFDocument({size:"A4",margin:0,info:{
  Title:"Counter Trend (Trading against the trend)",
  Author:"NEXUS GLOBAL ACADEMY"
}});
doc.pipe(fs.createWriteStream(out));

const W=595,H=842;
const GREEN="#07512F", RED="#781A25", INK="#17251D", MUTED="#66736B", LINE="#DCE5DF", PANEL="#F7F9F7";

function txt(t,x,y,w,size=8.2,c=INK,b=false,align="left"){
  doc.fillColor(c).font(b?"Helvetica-Bold":"Helvetica").fontSize(size)
    .text(t,x,y,{width:w,align,lineGap:1.25});
}
function rule(y){doc.moveTo(50,y).lineTo(545,y).lineWidth(.65).strokeColor(LINE).stroke();}
function candle(x,top,bottom,wickTop,wickBottom,bull=true,scale=1){
  const c=bull?GREEN:RED;
  const bw=12*scale;
  doc.moveTo(x,wickTop).lineTo(x,wickBottom).lineWidth(Math.max(1.2,1.55*scale)).strokeColor(c).stroke();
  doc.rect(x-bw/2,top,bw,bottom-top).fill(c);
}
function hline(x1,x2,y,c=INK,w=1){doc.moveTo(x1,y).lineTo(x2,y).lineWidth(w).strokeColor(c).stroke();}
function arrow(x1,y1,x2,y2,c=INK){
  const a=Math.atan2(y2-y1,x2-x1),h=6;
  doc.moveTo(x1,y1).lineTo(x2,y2).lineWidth(1.15).strokeColor(c).stroke();
  doc.moveTo(x2,y2).lineTo(x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45))
   .lineTo(x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)).closePath().fill(c);
}
function chartBox(x,y,w,h){
  doc.roundedRect(x,y,w,h,7).fill(PANEL);
  doc.roundedRect(x+.5,y+.5,w-1,h-1,7).lineWidth(.5).strokeColor(LINE).stroke();
}
function header(page){
  doc.rect(0,0,W,8).fill(GREEN);
  txt("NEXUS GLOBAL ACADEMY",50,23,240,8,GREEN,true);
  txt("COUNTER TREND",420,25,125,7,MUTED,true,"right");
  rule(42);
  rule(786);
  txt("Counter Trend (Trading against the trend)",50,798,300,7.2,MUTED);
  txt("Page "+page+" of 2",487,798,58,7.2,MUTED,false,"right");
}
function candleSequence(x,y,vals,spacing=18,scale=.9){
  vals.forEach((v,i)=>candle(x+i*spacing,y+v.top,y+v.bottom,y+v.wt,y+v.wb,v.b,scale));
}

/* PAGE 1 */
header(1);
txt("COUNTER TREND",110,70,375,24,INK,true,"center");
txt("(Trading against the trend)",170,99,255,10,MUTED,false,"center");
rule(120);

/* clean compact concept mark */
doc.moveTo(245,151).lineTo(270,206).lineTo(300,168).lineTo(330,197).lineTo(360,159)
 .lineWidth(2.4).strokeColor(INK).stroke();
hline(282,360,178,RED,2);
arrow(330,197,360,159,INK);

/* SECTION 1 */
txt("1. Understanding Counter Trend & Confirmation",50,225,495,10.4,INK,true);
rule(243);
chartBox(50,258,242,143);
candleSequence(105,285,[
 {top:0,bottom:43,wt:-7,wb:51,b:false},
 {top:21,bottom:63,wt:14,wb:72,b:false},
 {top:44,bottom:82,wt:38,wb:91,b:false},
 {top:66,bottom:99,wt:61,wb:108,b:false},
 {top:76,bottom:108,wt:69,wb:116,b:true}
],18,.95);
hline(82,220,369,INK,1.3);
arrow(222,350,237,344,MUTED);
arrow(194,347,226,331,MUTED);

txt("Counter trend means trading against the overall trend. e.g., looking for buys in a bearish market or sells in a bullish market.",315,270,225,8.1,INK,false,"center");
txt("A single bullish candle in a bearish trend is not enough confirmation to take a buy. Going for buys based on just one bullish candle can be risky.",315,328,225,8.1,INK,false,"center");
txt("Even if price has reached a strong support after making a significant move, you can’t take a buy just because you see a single bullish candle. You still need to wait for confirmation and let a clear setup form before entering.",315,395,225,8.1,INK,false,"center");

/* SECTION 2 */
txt("2. Forming a Resistance Level After Retracement",50,440,495,10.4,INK,true);
rule(458);

chartBox(50,473,242,210);
candleSequence(103,499,[
 {top:0,bottom:38,wt:-6,wb:46,b:false},
 {top:24,bottom:65,wt:17,wb:75,b:false},
 {top:51,bottom:88,wt:45,wb:98,b:false},
 {top:74,bottom:110,wt:68,wb:120,b:false},
 {top:92,bottom:130,wt:85,wb:140,b:false},
 {top:99,bottom:138,wt:93,wb:149,b:true},
 {top:78,bottom:119,wt:68,wb:127,b:true},
 {top:61,bottom:103,wt:52,wb:111,b:true},
 {top:58,bottom:101,wt:49,wb:109,b:false}
],18,.9);
hline(218,286,582,INK,1.3);
arrow(273,566,286,547,MUTED);
arrow(244,537,277,512,MUTED);

txt("2. Apparently, this bearish candle indicates that price is likely to continue the current trend. However, if you want to look for buys, this resistance needs to fail first. That would indicate that price attempted to continue the trend, but buyers overpowered the sellers, causing the resistance to fail.",315,486,225,8.1,INK,false,"center");
txt("1. wait for the market to form a resistance after retracement, this resistance will help us in going against the trend",315,608,225,8.1,INK,false,"center");

txt("Scenario - 1",58,718,200,11.5,INK,true);
rule(739);

/* PAGE 2 */
header(2);

/* Scenario 1 */
chartBox(50,58,242,190);
candleSequence(103,87,[
 {top:0,bottom:39,wt:-7,wb:48,b:false},
 {top:26,bottom:68,wt:19,wb:78,b:false},
 {top:53,bottom:91,wt:46,wb:101,b:false},
 {top:76,bottom:113,wt:69,wb:124,b:false},
 {top:96,bottom:134,wt:88,wb:145,b:false},
 {top:100,bottom:139,wt:93,wb:150,b:true},
 {top:82,bottom:121,wt:75,wb:132,b:true},
 {top:67,bottom:107,wt:60,wb:118,b:true},
 {top:55,bottom:99,wt:47,wb:110,b:true}
],18,.9);
hline(83,278,221,INK,1.2);
arrow(255,150,282,116,INK);
arrow(251,164,281,178,INK);
txt("1. Wait for the candle to close above the resistance, confirming that the resistance has failed.",344,69,190,8.3,INK,false,"center");
txt("2. execute buys when the next candle makes a lower wick and breaks the previous high",344,144,190,8.3,INK,false,"center");

txt("Scenario - 2",58,275,200,11.5,INK,true);
rule(297);

/* Scenario 2 */
chartBox(50,316,242,190);
candleSequence(103,345,[
 {top:0,bottom:39,wt:-7,wb:48,b:false},
 {top:26,bottom:68,wt:19,wb:78,b:false},
 {top:53,bottom:91,wt:46,wb:101,b:false},
 {top:76,bottom:113,wt:69,wb:124,b:false},
 {top:96,bottom:134,wt:88,wb:145,b:false},
 {top:100,bottom:139,wt:93,wb:150,b:true},
 {top:82,bottom:121,wt:75,wb:132,b:true},
 {top:67,bottom:107,wt:60,wb:118,b:true},
 {top:55,bottom:99,wt:47,wb:110,b:true},
 {top:38,bottom:91,wt:31,wb:101,b:true}
],18,.9);
hline(83,278,480,INK,1.2);
arrow(260,420,281,389,INK);
txt("2. Execute the buy as soon as price breaks the high of the bearish candle. This confirms that the resistance has failed, increasing the probability of a bullish move.",344,329,190,8.2,INK,false,"center");
txt("If price forms a support after the resistance, don’t enter a buy on the high break of the bullish candle. The resistance is still valid and hasn’t failed yet.",344,414,190,8.2,INK,false,"center");

txt("Scenario - 3",58,534,200,11.5,INK,true);
rule(556);

/* Scenario 3 */
chartBox(50,575,242,170);
candleSequence(103,604,[
 {top:0,bottom:36,wt:-6,wb:45,b:false},
 {top:23,bottom:62,wt:16,wb:72,b:false},
 {top:48,bottom:83,wt:42,wb:93,b:false},
 {top:70,bottom:105,wt:65,wb:116,b:false},
 {top:89,bottom:125,wt:84,wb:136,b:false},
 {top:92,bottom:128,wt:87,wb:140,b:true},
 {top:75,bottom:111,wt:69,wb:121,b:true},
 {top:61,bottom:97,wt:55,wb:106,b:true},
 {top:58,bottom:96,wt:47,wb:112,b:false},
 {top:40,bottom:89,wt:29,wb:101,b:true}
],18,.85);
hline(83,278,698,INK,1.2);
arrow(258,650,281,625,INK);
arrow(258,667,280,682,INK);
txt("execute buys on high break",344,603,190,9,INK,true,"center");
txt("If the resistance candle is a weak bearish candle, with a small body and an exhaustion wick, it indicates that the sellers have lost the strength.",344,649,190,8.3,INK,false,"center");

doc.end();

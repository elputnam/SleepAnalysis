//Spiral
let rad = 0; //cycling circles 
let x = 0; // start for circle

//Lunar Cycle
let list1 = []; //list of months
// let k = 0;
let sleep, night_data;
let num_nights; // number of nights of data
let new_night = true; // starting data for a new night
let night_index = 0; // index for each night
let night_data_length; // number of data points for a night
let night_data_index; // index for data points for a night
var sat; //saturation of background
var alp; //alpha of background


//text
let title = ['sleep', 'between', 'disrupted', 'dreams']
let dreamText = []; //poem
var xT;
var yT;
let j = 0;
let t = 5;

//crawling ivy
var maxCount; // max count of the squares
var currentCount = 1;
var xIvy = [];
var y = [];
var r = [];
var x2 = [];
var y2 = [];

//images
var awakeFace;
var lightFace;
var deepFace;
var remFace;

// let sleepLevel = "wake";

function preload(){
  //Load list of json file names
  list1 = loadStrings('dataList.txt');
  dreamText = loadStrings('disruptedDreams.txt');
  // sleep = loadJSON("data/sleep-2020-05-30.json");
  awakeFace = loadImage("images/AndroidDream-4.jpg");
  lightFace = loadImage("images/AndroidDream-3.jpg");
  deepFace = loadImage("images/AndroidDream-1.jpg");
  remFace = loadImage("images/AndroidDream-2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(15);
  maxCount = height*.25;
  

  //text set up
  xT = width*.5;
  yT = height*.7;
  
  //select month
  let month = int(random(1,14));
  print(month);
  sleep = loadJSON(list1[month]);
  num_nights = Object.keys(sleep).length;
  
  //ivy first square
  xIvy[0] = width*.25;
  y[0] = height / 2;
  r[0] = 50;
}

function draw() {
  //initial background
  if (frameCount == 1){
    background(10);
 
  }
  if (frameCount < 450){  
    background(10, 5);
    circles();
    if (frameCount%15==0 ){
      textFont('Titillium Web')
      textSize(55);
      noStroke();
      fill(200);
      textAlign(CENTER);
      text(title[j], xT, yT);
      j += 1;
      yT += 50;
      }

  }
  //sleep mapping
  if (frameCount > 400){
    if (new_night) {
      // starting a new night of data
      night_data = sleep[night_index]["levels"]["data"];
      night_data_length = night_data.length;
      new_night = false;
      night_data_index = 0;
  }
    sleepMapping();
    // nightCounter();
    // dreamMode();
    snow();
  
  if (frameCount >= 450){
    if (frameCount%10==0){
    
    textSize(45);
    noStroke();
    fill(0);
    textAlign(LEFT);
    xT = random(width*.5);
    yT = random(height * .8, height);
    text(dreamText[t], xT, yT);
    t += 1;
    }

    if (t == 35){
      t = int(random(27));
    }

    if (frameCount%3==0){
      pixelGrowth();
      }
   }
}

  rad += 1; //increase circle path

}

function circles(){
  //circles
  x = rad;
  let y = 0;
  push();
  translate(width*.5, height*.4);
  let num1 = 30
  let cir = (360 / num1) * (frameCount % num1);
  rotate((radians(cir)));
  for (let i = 0; i < height*.08; i++){
    noFill();
    stroke(random(250, 300), random(100), random(100));
    circle(random(x), random(y), 5*i);
  }
  pop();
}

function snow(){
  for ( let i = 0; i < width*.25; i++){
    noStroke();
    fill(random(255));
    rect(random(width/2), random(height), random(5,10), random(5,10));
  }
}

function pixelGrowth(){
  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which circle is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, xIvy[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }
  
  // align it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - xIvy[closestIndex]);

  x2[currentCount] = newX;
  y2[currentCount] = newY;
  xIvy[currentCount] = xIvy[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;


  for (var i = 0; i < currentCount; i++) {
    if (i == 0) {
      // xIvy[0] = mouseX
      // y[0] = mouseY
      noStroke()
      // fill(random(360), 100, random(100));
      fill(random(255));
    } else {
      fill(random(360), 100, random(100));
    }
    rectMode(CENTER)
    rect(xIvy[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount){
    currentCount = 1;
  xIvy[0] = random(width*.25);
  y[0] = random(height);
  r[0] = random(50,100);
    //maxCount = random(100,1000);
  }
}

function sleepMapping(){
  // sleep level mapping
  let sleepLevel = night_data[night_data_index]["level"];
  let dateTime = night_data[night_data_index]["dateTime"];
  
  let duration = night_data[night_data_index]["seconds"];
  sat = map(duration, 0, 6000, 1, 100);
  alp = sat;
  print(sleepLevel, duration);

  if (sleepLevel == ["wake"]){
    background(0, sat, 100, alp);
    tint(200, sat, 100, alp);
    image(awakeFace, width/2, 0, width/2, height);
}

if (sleepLevel == ["deep"]){
  background(100, sat, 100, alp);
  tint(300, sat, 100, alp);
  image(deepFace, width/2, 0, width/2, height);
}
if (sleepLevel == ["light"]){
  background(200, sat, 100, alp);
  tint(0, sat, 100, alp);
  image(lightFace, width/2, 0, width/2, height);
}
if (sleepLevel == ["rem"]){
  background(300, sat, 100, alp);
  tint(100, sat, 100, alp);
  image(remFace, width/2, 0, width/2, height);
  }

  //Counter loop
  // text(dateTime, 40, 40);
  // text("Night: " + night_index + " Reading: " + night_data_index, 40, 80);
  // text(sleepLevel + duration, 40, 120);

  night_data_index += 1;
  if (night_data_index === night_data_length) {
  // have processed all data for a night
  new_night = true;
  night_index += 1;
  // are there any more nights?
  if (night_index === num_nights) {
  night_index = 0;
        }
      }
  }
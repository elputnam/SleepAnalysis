let L = 0;
let secs = 0;
let list1 = [];
let sleep = [];
let dreamText = [];
let rad = 0;
let x = 0;
let dur = 10;
var sat;
var alp;
let pixelSwarm = [];
let num = 0;
let title = ['sleep', 'between', 'disrupted', 'dreams']

//text
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
  // data = sleep[L]["levels"]["data"];
  frameRate(15);
  maxCount = height*.25;
  num = height*0.001;
  //text set up
  xT = width*.5;
  yT = height*.7;
  
  //select month
  let month = int(random(1,14));
  print(month);
  sleep = loadJSON(list1[month]);
  
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
    sleepMapping();
    dreamMode();
    snow();
  
  if (frameCount >= 450){
    if (frameCount%10==0){
    textSize(width*.07);
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

  // interactive timecone swarm
  // timeWarp();

  

}


  // //reset circle path
  // if (x == width/2){
  //   rad = 0;
  // }

  rad += 1; //increase circle path

}

class TimeCone{
  constructor(){
    this.loc = createVector(mouseX, mouseY);
    this.vel = createVector(0, 0);
    this.col = random(200,300);
    this.ts = random(2);
    this.spin = 0;
    this.a = createVector(random(-0.1,0.1), random(-0.1,0.1));
    this.lifespan = 255.0;
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
    this.spin += random(0.1)
    this.lifespan -= random(1,3);
  }

  display(){
    // noStroke();
    // fill(random(360), random(100), random(100));
    // square(this.loc.x, this.loc.y, random(5,10));
    fill(this.col, random(100), random(100), 70);
    beginShape();
    vertex(this.loc.x, this.loc.y);
    vertex(this.loc.x + 100, this.loc.y);
    vertex(this.loc.x + 50, this.loc.y + 100);
    vertex(this.loc.x + 100, this.loc.y + 200);
    vertex(this.loc.x, this.loc.y + 200);
    vertex(this.loc.x + 50, this.loc.y + 100);
    vertex(this.loc.x, this.loc.y);
    endShape(CLOSE);
  }

  ghost(){
    if (this.lifespan < 0.0){
      return true;
    } else {
      return false;
    }
  }
}

function circles(){
  //circles
  x = rad;
  let y = 0;
  push();
  translate(width*.5, height*.4);
  let num = 30;
  let cir = (360 / num) * (frameCount % num);
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
  data = sleep[L]["levels"]["data"];

  // sleep level mapping
  sleepLevel = data[frameCount % data.length]["level"];
  let duration = data[frameCount % data.length]["seconds"];
  
  let dur = log(duration);
  sat = map(duration, 0, 6000, 1, 100);
  // let sat = log(timeWarp);
  alp = sat;
  print(sleepLevel, duration, dur);
}

function dreamMode(){
    // changing backgrounds
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
}

function timeWarp(){
  for (let i = 0; i < num; i++){
    pixelSwarm.push(new TimeCone());
  }

  push();
  translate(width*.25, height/2);
  scale(0.25)
  for(let i = pixelSwarm.length - 1; i >= 0; i--){
    let t = pixelSwarm[i];
    let a = atan2(mouseY - height / 2, mouseX - width*.25);
  rotate(a);
    t.run();
    if (t.ghost()){
      pixelSwarm.splice(i, 1);
    }
  }
  pop();
}

let L = 0;
let secs = 0;
let list1 = [];
let sleep = [];
let rad = 0;
let x = 0;
let dur = 10;
var sat;
var alp;
let pixelSwarm = [];
let num = 0;

//images
var awakeFace;
var lightFace;
var deepFace;
var remFace;

// let sleepLevel = "wake";

function preload(){
  //Load list of json file names
  list1 = loadStrings('dataList.txt');
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
  frameRate(5);
  num = height*0.001;
  //select month
  let month = int(random(1,14));
  print(month);
  sleep = loadJSON(list1[month]);
  
}

function draw() {
  //initial background
  if (frameCount == 1){
    background(10);
  }

  //sleep mapping
  if (frameCount >= 20){
    sleepMapping();
    dreamMode();
  
  // // squares
  // for ( let i = 0; i < width*.5; i++){
  //   noStroke();
  //   fill(random(360), random(100), random(100));
  //   square(random(width/2), random(height), random(5,10));
  // }

  // interactive pixel swarm
  for (let i = 0; i < num; i++){
    pixelSwarm.push(new Pixels());
  }
  push();
  translate(width/2, height/2);
  scale(0.5)
  for(let i = pixelSwarm.length - 1; i >= 0; i--){
    let t = pixelSwarm[i];
    let a = atan2(mouseY - height / 2, mouseX - width / 2);
  rotate(a);
    t.run();
    if (t.ghost()){
      pixelSwarm.splice(i, 1);
    }
  }
  pop();
}
  //reset circle path
  if (x == width/2){
    rad = 0;
  }

  rad += 1; //increase circle path
  circles();
}

class Pixels{
  constructor(){
    this.loc = createVector(mouseX, mouseY);
    this.vel = createVector(0, 0);
    this.ts = random(2);
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
    this.lifespan -= random(1,3);
  }

  display(){
    noStroke();
    fill(random(360), random(100), random(100));
    square(this.loc.x, this.loc.y, random(5,10));
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
  translate(width*.25, height/2);
  let num = 30;
  let cir = (360 / num) * (frameCount % num);
  rotate((radians(cir)));
  for (let i = 0; i < height*.03; i++){
    noFill();
    stroke(random(255));
    circle(x, y, random(200));
  }
  pop();
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

let L = 0;
let secs = 0;
let list1 = [];
let sleep = [];
let rad = 0;

function preload(){
  //Load list of json file names
  list1 = loadStrings('dataList.txt');
  // sleep = loadJSON("data/sleep-2020-05-30.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  // data = sleep[L]["levels"]["data"];
  frameRate(5);
  
  //select month
  let month = int(random(1,14));
  print(month);
  sleep = loadJSON(list1[month]);
  
}

function draw() {
  //circles
  let x = rad;
  let y = 0;
  push();
  translate(width/2, height/2);
  let num = 30;
  let cir = (360 / num) * (frameCount % num);
  rotate((radians(cir)));
  for (let i = 0; i < height*.03; i++){
    noFill();
    stroke(random(255));
    circle(x, y, random(200));
  }
  rad += 1;
  pop();

  //initial background
  if (frameCount == 1){
    background(10);
  }

  //sleep mapping
  if (frameCount >= 20){
    data = sleep[L]["levels"]["data"];

    // sleep level mapping
    let sleepLevel = data[frameCount % data.length]["level"];
    let duration = data[frameCount % data.length]["seconds"];
    
    let dur = log(duration);
    let sat = map(duration, 0, 20, 1, 100);
    // let sat = log(timeWarp);
    let alp = 10;
    print(sleepLevel, duration, dur);
    // squares
    for ( let i = 0; i < width*.5; i++){
      fill(random(360), random(100), random(100));
      square(random(width), random(height), random(5,10));
    }


    // changing backgrounds
    if (sleepLevel == ["wake"]){
        background(0, sat, 100, alp);
    }
    
    if (sleepLevel == ["deep"]){
      background(100, sat, 100, alp);
    }
    if (sleepLevel == ["light"]){
      background(200, sat, 100, alp);
    }
    if (sleepLevel == ["rem"]){
      background(300, sat, 100, alp);
    }
  }

  if (x == width){
    rad = 0;
  }
}

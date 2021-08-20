let L = 0;
let secs = 0;
// let list1 = [];
let sleep = [];

function preload(){
  //Load list of json file names
  // list1 = loadStrings('dataList.txt');
  sleep = loadJSON("data/sleep-2020-05-30.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  data = sleep[L]["levels"]["data"];
  frameRate(1);
  //select month
  // let month = int(random(1,15));
  // sleep = loadJSON(list1[month]);
  
}

function draw() {
  //background(220);
  
  // if (frameCount >= 10){
    // data = sleep[L]["levels"]["data"];
    // sleep level mapping
    let sleepLevel = data[frameCount % data.length]["level"];
    let duration = data[frameCount % data.length]["seconds"];
    print(sleepLevel, duration);

    if (sleepLevel == ["wake"]){
     frameCount = 0;
     while(frameCount > duration);
        background(0, 100, 100, 10);
    }
    if (sleepLevel == ["deep"]){
      background(100, 100, 100, 10);
    }
    if (sleepLevel == ["light"]){
      background(200, 100, 100, 10);
    }
    if (sleepLevel == ["rem"]){
      background(300, 100, 100, 10);
    }
  }
// }

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
  frameRate(10);
  maxCount = height*.25;

  //text set up
  xT = width*.5;
  yT = height*.7;
  
  //select month
  let month = int(random(14));
  print(month);
  sleep = loadJSON(list1[month]);
  num_nights = Object.keys(sleep).length;
  
  //grid
  tileCount = height/30;
}

function draw() {
  //initial background
  if (frameCount == 1){
    background(10);
 
  }
  if (frameCount < 450){  
    background(10, 10);
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
  if (frameCount%2 == 0){  
    sleepMapping();
    grid();
    }
  
  if (frameCount >= 450){
    if (frameCount%10==0){
    textSize(45);
    noStroke();
    textAlign(LEFT);
    xT = random(width*.5);
    yT = random(height * .8, height);
    fill(200)
    rect(xT-10, yT-50, width, height* .2)
    fill(0);
    text(dreamText[t], xT, yT);
    
    t += 1;
    }

    if (t == 28){
      t = int(random(27));
    }

    // if (frameCount%3==0){
    //   pixelGrowth();
    //   }
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
    strokeWeight(random(3));
    stroke(random(250, 300), random(100), random(100));
    // fill(random(255), 5)
    circle(random(x), random(y), 5*i);
  }
  pop();
}

function grid() {
  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let posX = (width*.5 / tileCount) * gridX;
      let posY = (height / tileCount) * gridY;

      //introduce random choice between two
      let toggle = int(random(0, 3));

      if (toggle == 0) {
        stroke(random(255));
      
        line(posX, posY, posX + width/tileCount, posY + height
        );
      }
      
      if (toggle == 1) {
        fill(random(255));
        square(
          random(posX, posX + width / tileCount),
          random(posY, posY + height / tileCount),
          random(tileCount)
        );
      }
    }
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

if (sleepLevel == ["restless"]){
  background(0);
  // tint(100, sat, 100, alp);
  image(remFace, width/2, 0, width/2, height);
}

if (sleepLevel == ["asleep"]){
  background(255);
  // tint(200, sat, 100, alp);
  image(deepFace, width/2, 0, width/2, height);
}

  //Counter loop
  text(dateTime, 40, 40);
  text("Night: " + night_index + " Reading: " + night_data_index, 40, 80);
  text(sleepLevel + duration, 40, 120);

  night_data_index += 1;
  if (night_data_index === night_data_length) {
  // have processed all data for a night
  new_night = true;
  night_index += 1;
  // are there any more nights?
  if (night_index === 32) {
    night_index = 0;
        }
      }
  }
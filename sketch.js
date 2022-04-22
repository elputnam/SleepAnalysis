//Spiral animation
let rad = 0; //cycling circles 
let x = 0; // start for circle

//Cycling through sleep data
let list1 = []; //list of months
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
let t = 4;

//images
var awakeFace;
var lightFace;
var deepFace;
var remFace;

//sound
let osc;
let amp = 0;
let freq = 0;

function preload(){
  //Load list of json file names
  list1 = loadStrings('dataList.txt');
  //Load poem text
  dreamText = loadStrings('disruptedDreams.txt');
  //load images
  awakeFace = loadImage("images/AndroidDream-4.jpg");
  lightFace = loadImage("images/AndroidDream-3.jpg");
  deepFace = loadImage("images/AndroidDream-1.jpg");
  remFace = loadImage("images/AndroidDream-2.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(8);
  maxCount = height*.25;

  //text set up
  xT = width*.5;
  yT = height*.1;
  
  //select month
  let month = int(random(14));
  // print(month);
  sleep = loadJSON(list1[month]);
  // console.log(Object.keys(sleep))
  
  // print(month, num_nights);
  //grid
  //tileCount = height/30;

  //set up sound
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(amp);
  osc.start();
}

function draw() {
  //initial background
  if (frameCount == 1){
    background(10);
 
  }
  //set up to read through data
  if (frameCount == 100){
    num_nights = Object.keys(sleep).length;
    print(num_nights);
  }
  //loading screen animation
  if (frameCount < 250){  
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
      yT += 70;
      }

  }
  //sleep mapping - use data to generate sound and animation
  if (frameCount > 200){
    if (new_night) {
      // starting a new night of data
      night_data = sleep[night_index]["levels"]["data"];
      night_data_length = night_data.length;
      new_night = false;
      night_data_index = 0;
  }
    sleepMapping();

  // grid visuals / have been de-activated    
    if (frameCount%2 == 0){  
    
    // grid();
    }
  //display poem; after cycles through once starts again at random location
  if (frameCount >= 250){
    if (frameCount%20==0){
    textSize(45);
    noStroke();
    textAlign(RIGHT);
    xT = random(width*.6, width);
    yT = random(height * .8, height);
    // fill(200)
    // rect(0, yT-50, xT+20, height* .2)
    fill(200);
    text(dreamText[t], xT, yT);
      
    t += 1;
    }

    if (t == 23){
      t = int(random(22));
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
  translate(width*.5, height*.7);
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
        stroke(random(150));
      
        line(posX, posY, posX + width/tileCount, posY + height
        );
      }
      
      if (toggle == 1) {
        fill(random(150));
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
  sat = map(duration, 0, 7000, 1, 100);
  alp = sat;
  osc.freq(freq);
  amp = map(duration, 0, 7000, 0.05, 0.5);
  osc.amp(amp);
  print(sleepLevel, duration);

  if (sleepLevel == ["wake"]){
    background(0, 100, sat, alp);
    tint(200, sat, 100, alp);
    image(awakeFace, width/2, 0, width/2, height);
    //sound
    freq = 600;
    

}

if (sleepLevel == ["deep"]){
  background(100, 100, sat, alp);
  tint(300, sat, 100, alp);
  image(deepFace, width/2, 0, width/2, height);
  //sound
  freq = 40;
  // amp = 0.05;
  
}
if (sleepLevel == ["light"]){
  background(200, 100, sat, alp);
  tint(0, sat, 100, alp);
  image(lightFace, width/2, 0, width/2, height);
   //sound
   freq = 200;
   // amp = 0.1;

}

if (sleepLevel == ["rem"]){
  background(300, 100, sat, alp);
  tint(100, sat, 100, alp);
  image(remFace, width/2, 0, width/2, height);
  //sound
  freq = 400;
  // amp = 0.3;
  }

if (sleepLevel == ["restless"]){
  background(255);
  // tint(100, sat, 100, alp);
  image(remFace, width/2, 0, width/2, height);
  
}

if (sleepLevel == ["asleep"]){
  background(0);
  // tint(200, sat, 100, alp);
  image(deepFace, width/2, 0, width/2, height);
}

  //Counter loop
  //display night
  fill(10);
  textSize(40);
  noStroke();
  textAlign(LEFT);
  text(dateTime, 40, 40);
  // text("Night: " + night_index + " Reading: " + night_data_index, 40, 80);
  textAlign(RIGHT);
  text(sleepLevel, random(width*.15, width*.5), random(120, height-50));

  night_data_index += 1;
  if (night_data_index == night_data_length) {
  // have processed all data for a night
  new_night = true;
  night_index += 1;
  // are there any more nights?
  if (night_index == num_nights) {
    night_index = 0;
    new_night = true;
    night_data_index = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
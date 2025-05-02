// https://kylemcdonald.github.io/cv-examples/

var capture;
var w = 960;
var h = 720;
let cameraPos;
let cameraCenter;
let boxes = [];
let buffers;
let pg; 
let z = -300;
let sampling = false;
let s = 20;
var score;
let font;
var lives;
var count;
let music;

function preload() {
  font = loadFont('assets/Oswald-VariableFont_wght.ttf');
  music = loadSound('assets/music.mp3');
}

function setup() {
    score = 0;
    lives = 10;
    count = lives;
    cameraPos = createVector(w/2,h/2,0);
    cameraCenter = createVector(w/2, h/2, 0)
    
    boxes.push(new Box(cameraCenter.x, cameraCenter.y, cameraCenter.z));
  
    
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    createCanvas(w, h, WEBGL);
    capture.hide();
   
    textFont(font);
  textSize(32);
    

      state = "START";
    
}

var trailPointsLength = 30;
var trailPoints = [];
function drawTrail(nextPoint) {
    trailPoints.push(nextPoint);
    if (trailPoints.length > trailPointsLength) {
        trailPoints.shift();
    }
    noFill();
    beginShape();
    trailPoints.forEach(function (point) {
        vertex(point.x, point.y);
    })
    endShape();
}

var targetColor = [255, 255, 255];


function draw() {
   background(0);
    
    if (state == "START") {
        drawStart();
     } else if (state == "GAME") {
        drawGame();
     } else if (state == "TUTORIAL") {
        drawTutorial();
     } else if (state == "END") {
        drawEnd();
      //  resetGame();
     }else if (state == "RESET"){
         drawReset();
     }
  
}

function drawStart(){
    background(0);

    push();
    resetMatrix(); 
    ortho();     

    fill(255);
    textAlign(CENTER, CENTER); 
    textSize(50);
    text("BEAT SABER(ish)", 0, -50); 
    
    textSize(20);
    text("Press any key to start", 0, 0);

    pop();
}

function drawGame(){
    if (!music.isPlaying()) {
        music.loop();
    }
    push();
    
    capture.loadPixels();
    var sampling = false;
    var sumPosition = createVector(0, 0);
    var sumPositionCopy = createVector(0,0);
    if (capture.pixels.length > 0) { // don't forget this!

        
        var w = capture.width,
            h = capture.height;
        var i = 0;
        var pixels = capture.pixels;
        var thresholdAmount = 10; //select('#thresholdAmount').value();
        thresholdAmount /= 100.; // this is the slider range
        thresholdAmount *= 255 * 3; // this is the maximum value
        var total = 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                var diff =
                    Math.abs(pixels[i + 0] - targetColor[0]) +
                    Math.abs(pixels[i + 1] - targetColor[1]) +
                    Math.abs(pixels[i + 2] - targetColor[2]);
                var outputValue = 0;
                if (diff < thresholdAmount) {
                    outputValue = 255;
                    sumPosition.x += x;
                    sumPosition.y += y;
                    total++;
                }
                pixels[i++] = outputValue; // set red
                pixels[i++] = outputValue; // set green
                pixels[i++] = outputValue; // set blue
                i++; // skip alpha
            }
        }
if (total > 0) {
   sumPosition.div(total);
    sumPositionCopy=sumPosition.copy();
    sumPositionCopy.x = w - sumPosition.x; //flip
} else {
    sumPosition.set(0, 0); // or another fallback
}
    
    }
    if (!sampling) {
        capture.updatePixels();
    }

   
    let speed = 0.001;
    let fourthDist = cameraCenter.dist(cameraPos) / 4.0;
    let boxPosition;
    
   
    
 while (boxes.length < 7) {
  let boxPosition = createVector(random(-w/8, w/8), random(-h/8, h/8), random(z, z - 100));
  boxes.push(new Box(boxPosition.x, boxPosition.y, boxPosition.z));
}
     
 for (let i = boxes.length - 1; i >= 0; i--) {
  boxes[i].collision(sumPositionCopy); 
  if (boxes[i].pos.z > cameraPos.z + 800) {
    count--;
    boxes.splice(i, 1);
  }if (boxes[i].hit) {
    boxes.splice(i, 1);
  }
} 
   for (let b of boxes){
    b.display();
    b.move(); 
   }
     

    push();
  resetMatrix(); // Reset transformations to 2D screen space
  ortho(); 
  rectMode(CENTER);

  strokeWeight(5);
  stroke(255);
  noFill();
  rect(0, 0, w/8, h/8); 
  
  line(-x,h,-w/16,h/16);
  line(-x,-h,-w/16,-h/16);
  line(x,-h,w/16,-h/16);
  line(x,h,w/16,h/16);

 if(mouseIsPressed){
      push();
translate(width / -2, height / -2);
scale(-1, 1);  // horizontal mirror
image(capture, -w, 0, w, h); // flip by drawing leftward
pop();
}
    
    noStroke();
    fill(targetColor);
    rect(-450, -330, 40, 40);
    

    
  pop();
    
push();
    resetMatrix();
    ortho();
    //scale(1,-1);
    translate(-width/2, -height/2)
    ellipse(-sumPosition.x, sumPosition.y, 8, 8);
    //noFill();
    stroke(targetColor);
    strokeWeight(10);
    if(sumPositionCopy.x!=0 && sumPositionCopy.y!=0){
        drawTrail(sumPositionCopy);
    }
    
    
pop();
    
    push();
resetMatrix();
ortho();
translate(-width / 2, -height / 2); 
fill(255);
noStroke();
textAlign(LEFT, TOP);
text("score: " + score, 60, 5); 
text("lives left: " + count, 3*width/4, 5); 
pop();

    
if(count<=0){
    state = "END";
 }
}


function drawEnd(){
   background(0);

    push();
    resetMatrix(); 
    ortho();     

    fill(255);
    textAlign(CENTER, CENTER); 
    textSize(50);
    text("GAME OVER", 0, -50); 

    textSize(20);
    text("SCORE: "+score, 0, 50);
    
    textSize(20);
    text("Press any key to go back to start", 0, 0);
    

    pop(); 
    if (music.isPlaying()) {
        music.stop();
    }
}

function keyPressed(){
    if(state == "START"){
        state = "GAME";
    }
   
    if(state == "GAME" && key === ' '&& keyIsPressed){
        if (mouseX > 0 && mouseX < width &&
            mouseY > 0 && mouseY < height) {
            targetColor = capture.get(map(mouseX,0,width,width,0), mouseY);
            sampling = true;
        }
        count = lives;
    }
    if(state == "END"){
        state = "RESET";
    }
}



function drawBox(pos){

   let w = width/1.2;
   let h = height;
   //  orbitControl();


  push();
  translate(pos.x,pos.y,pos.z);
 
    
    stroke(255);
    fill(255);
  box(w, h, 10);

}

function drawReset(){
    score =0;
    count = lives;
    
    state = "START";
}

class Box {

  constructor(x, y, z) {  
  this.pos = createVector(x, y, z);
  this.hit = false;
  }
  
    
  display(){
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    stroke(50);
    fill(255);
    box(s, s, s);
    pop();

  }
    
  move(){
     this.pos.z+=4;
  }
    
  collision(trailPos){
      let trail3D = createVector(trailPos.x - width / 2, trailPos.y - height / 2, this.pos.z);
      let dx = this.pos.x - trail3D.x;
  let dy = this.pos.y - trail3D.y;
  let distXY = Math.sqrt(dx * dx + dy * dy);
      
  let zScale = map(this.pos.z, 100, 500, 0.01, 10); 
  let adjustedS = s * zScale;
  
  if (distXY < adjustedS / 2 && this.pos.z>0) {
    this.hit = true;
    score++;


  }
}
  
}
    
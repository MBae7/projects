// https://kylemcdonald.github.io/cv-examples/

var capture;
var w = 640;
var h = 480;
let cameraPos;
let cameraCenter;
let boxes = [];
let buffers;
let red, blue;
let pg; 
let z = 10;

function preload() {
  red =  loadImage("red.png");
  blue = loadImage("blue.png");
}

function setup() {
    cameraPos = createVector(w/2,h/2,0);
    cameraCenter = createVector(w/2, h/2, 0)
    
    append(boxes, createVector(cameraCenter.x, cameraCenter.y, cameraCenter.z));
  
    
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
    colorMode(HSB, 100)
    
    for 
}

var trailPointsLength = 100;
var trailPoints = [];
function drawTrail(nextPoint) {
    trailPoints.push(nextPoint);
    if (trailPoints.length > trailPointsLength) {
        trailPoints.shift();
    }
    beginShape();
    trailPoints.forEach(function (point) {
        vertex(point.x, point.y);
    })
    endShape();
}

var targetColor = [255, 255, 255];


function draw() {
   background(0);
    
    push();
    
    capture.loadPixels();
    var sampling = false;
    var sumPosition = createVector(0, 0);
    if (capture.pixels.length > 0) { // don't forget this!

        keyPressed();
        
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

        sumPosition.div(total);

        var n = w * h;
        var ratio = total / n;
        //select('#percentWhite').elt.innerText = int(100 * ratio);
    }
    if (!sampling) {
        capture.updatePixels();
    }

    
     push();
    translate(width,0);
  scale(-1, 1);
//   image(capture, 0, 0, w, h);

  pop();
   

    noStroke();
    fill(targetColor);
    rect(20, 20, 40, 40);
    
pop;
    /*ellipse(sumPosition.x, sumPosition.y, 8, 8);
    noFill();
    stroke(targetColor);
    strokeWeight(8);
    drawTrail(sumPosition);*/
    
    let speed = 0.001;
    let fourthDist = cameraCenter.dist(cameraPos) / 4.0;
   
    
 for(let i = boxes.length-1; i >= 0; i--){
        let boxPos =   createVector(boxes[i]);
      let boxPosition =   createVector(random(w),random(h),z);

        boxPos = p5.Vector.lerp(boxPosition, cameraPos, speed);
        boxes[i]= boxPos; 
        
  
    
    //float c = map(i,boxes.size(),0,0,255);
    let c = map(boxPos.x, cameraCenter.x, cameraPos.x-100, 0,255);
    tint(c);
    
    //drawBox(boxPos);
     orbitControl();
       
 /*  let d = boxPos.dist(cameraCenter);
    if (i == boxes.length - 1 && d >= fourthDist) {
      boxes.add(createVector(cameraCenter.x, cameraCenter.y, cameraCenter.z));
     // PGraphics pg = createGraphics(width/3,height/3);
     // buffers.add(pg);
      
     // drawTrees(pg);
    }
        
    
    
   */  
    if (boxPos.dist(cameraPos) < 100) {
      boxes.remove(i);
    }
    
  
 } 
  
    
}

function keyPressed(){
    if(key === ' '&& keyIsPressed){
        if (mouseX > 0 && mouseX < width &&
            mouseY > 0 && mouseY < height) {
            targetColor = capture.get(map(mouseX,0,width,width,0), mouseY);
            sampling = true;
        }
    }
}

function drawBox(pos){

   let w = width/1.2;
   let h = height;
     orbitControl();


  push();
  translate(pos.x,pos.y,pos.z);
 
    
    stroke(255);
    fill(255);
  box(30, 50, 10);

  /*beginShape();
  vertex(0, h, -w/2, 0, 0);
  vertex(0, h, w/2, 1, 0);
  vertex(0, h/2, w/2, 1, 1);
  vertex(0, h/2, -w/2, 0, 1);
  endShape(CLOSE);
  */
}

class Box {
  constructor(x, y, z) {  
    this.x = x;
    this.y = y;
    this.z = z;
  }
    
  display(){
    stroke(255);
    fill(255);
    box(this.x, this.y, this.z);
  }
    
  move(){
     z+=1;
  }
  
}
    
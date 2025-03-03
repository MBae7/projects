// https://kylemcdonald.github.io/cv-examples/

var capture;
var w = 640;
var h = 480;
let cameraPos;
let cameraCenter;
let boxes;
let buffers;
let texture, tree1, tree2, tree3, treeReal1, treeReal2, treeReal3, leaves;

function preload() {
  texture =  loadImage("TreeTexture.png");
    
    tree1 = loadImage("Tree1.png");
  tree2 = loadImage("Tree2.png");
  tree3 = loadImage("Tree3.png");
  
  treeReal1 = loadImage("treeReal1.png");
  treeReal2 = loadImage("treeReal2.png");
  treeReal3 = loadImage("treeReal3.png");
    
    leaves = loadImage("Leaves.png");
}

function setup() {
    cameraPos = createVector(0,0,0);
    cameraCenter = createVector(0, 0, 0)
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
    createCanvas(w, h);
    capture.hide();
    colorMode(HSB, 100)
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
    capture.loadPixels();
    var sampling = false;
    var sumPosition = createVector(0, 0);
    if (capture.pixels.length > 0) { // don't forget this!

        if (mouseIsPressed &&
            mouseX > 0 && mouseX < width &&
            mouseY > 0 && mouseY < height) {
            targetColor = capture.get(map(mouseX,0,width,width,0), mouseY);
            sampling = true;
        }

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
   image(capture, 0, 0, w, h);
  pop();
   

    noStroke();
    fill(targetColor);
    rect(20, 20, 40, 40);

    /*ellipse(sumPosition.x, sumPosition.y, 8, 8);
    noFill();
    stroke(targetColor);
    strokeWeight(8);
    drawTrail(sumPosition);*/
    
    
}

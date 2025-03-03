 import peasy.*;

PVector cameraPos, cameraCenter;
ArrayList<PVector> boxes;
ArrayList<PGraphics> buffers;

PeasyCam cam;
PImage texture, tree1, tree2, tree3, treeReal1, treeReal2, treeReal3, leaves;

PGraphics pg;

void setup() {
  fullScreen(P3D);
  noCursor();
  //cam = new PeasyCam(this, 100);
  cameraPos = new PVector(0, 0, 0);
  cameraCenter = new PVector(1500, 0, 0);

  boxes = new ArrayList<PVector>();
  boxes.add(new PVector(cameraCenter.x, cameraCenter.y, cameraCenter.z));
  
  buffers = new ArrayList<PGraphics>();
  //pg = createGraphics(width/3,height/3);
  //drawTrees(pg);
  buffers.add(pg);

  texture = loadImage("TreeTexture.png");
  
  tree1 = loadImage("Tree1.png");
  tree2 = loadImage("Tree2.png");
  tree3 = loadImage("Tree3.png");
  
  treeReal1 = loadImage("treeReal1.png");
  treeReal2 = loadImage("treeReal2.png");
  treeReal3 = loadImage("treeReal3.png");
  
  treeReal1.resize(0,height/3);
  treeReal2.resize(0,height/3);
  treeReal3.resize(0,height/3);
  
  leaves = loadImage("Leaves.png");
  
}
PImage randomTree(int num){
    if(num == 1){
      return treeReal1;
    }else if(num == 2){
      return treeReal2;
    }else{
      return treeReal3;
    }
}

int randomWidth(){
  int w = 0;
  int num = int(random(1,3));
  

    if(num == 1){
      w = int(random(0,150));
    }else{
      w = int(random(350,width/3));
    }
  
  return w;
}
int randomWidthLeaves(){
  int w = 0;
  w = int(random(-200,0));
  
  return w;
}

void drawTrees(PGraphics pg){

  pg.beginDraw();

  //pg.filter(INVERT);
  pg.image(leaves,randomWidthLeaves(),-30);
  
  for(int i = 0; i < int(random(1,5)); i++){
    

    pg.image(randomTree(int(random(1,4))), randomWidth(), 0);
  }
  /*
  pg.image(tree1,0,0);
  pg.image(tree2,0,0);
  pg.image(tree3,0,0); */
  pg.endDraw();
}


void drawBox(PVector pos, PGraphics pg){
  noStroke();
  float w = width/1.2;
  float h = height;
  
  pushMatrix();
  translate(pos.x,pos.y,pos.z);
  
  //fill(c);

  textureMode(NORMAL);
  beginShape();
  texture(pg);
  vertex(0, -h, -w/2, 0, 0);
  vertex(0, -h, w/2, 1, 0);
  vertex(0, h/2, w/2, 1, 1);
  vertex(0, h/2, -w/2, 0, 1);
  endShape(CLOSE);
  
  popMatrix();
  
}

void draw() {
  stroke(255,0,0);
  background(0);
  float speed = 0.001;
  float fourthDist = cameraCenter.dist(cameraPos) / 4.0;

  

  for(int i = boxes.size()-1; i >= 0; i--){
    PVector boxPos = boxes.get(i);
    
    boxPos = PVector.lerp(boxPos, cameraPos, speed);
    boxes.set(i, boxPos);
    
    //float c = map(i,boxes.size(),0,0,255);
    float c = map(boxPos.x, cameraCenter.x, cameraPos.x-100, 0,255);
    tint(c);
    
    drawBox(boxPos,buffers.get(i));
    
    if (i == boxes.size() - 1 && boxPos.dist(cameraCenter) >= fourthDist) {
      boxes.add(new PVector(cameraCenter.x, cameraCenter.y, cameraCenter.z));
      PGraphics pg = createGraphics(width/3,height/3);
      buffers.add(pg);
      
      drawTrees(pg);
    }
    
    if (boxPos.dist(cameraPos) < 100) {
      boxes.remove(i);
      buffers.remove(i);
    }
    
    
  }
  pushMatrix();
  noFill();
  stroke(255,0,0);
  translate(cameraPos.x,cameraPos.y,cameraPos.z);
  box(50);
  popMatrix();
  camera(cameraPos.x, cameraPos.y, cameraPos.z, cameraCenter.x, cameraCenter.y, cameraCenter.z, 0, 1, 0);
  
}

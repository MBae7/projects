import processing.sound.*;

PImage corner1;
PImage corner2;



ArrayList<Particle> particles;
ArrayList<ParticleSystem> systems;
PVector gravity;
PVector wind;
ParticleSystem ps;
AudioIn in;
BeatDetector beatDetector;
SoundFile song;

void setup() {
 fullScreen();
  corner1 = loadImage("corner1.png");
  corner1.resize(int(width/2.5), (int(height/3)));
  corner2 = loadImage("corner2.png");
  corner2.resize(int(width/2.5), (int(height/3)));
  
  
  
  song = new SoundFile(this, "song.mp3");
  song.play();

  gravity = new PVector(0, 0.02);
  wind = new PVector(0, 0);

  systems = new ArrayList<ParticleSystem>();
  particles = new ArrayList<Particle>();

  for (int i = 0; i < 5; i++) {
      Particle p = new Particle();
      particles.add(p);
}
  ps = new ParticleSystem(width/2, height/2);
  systems.add(ps);
 

  beatDetector = new BeatDetector(this);
  in = new AudioIn(this);
  beatDetector.input(song);
  beatDetector.sensitivity(250);
}

void draw() {
  background(0);
   imageMode(CORNER);
  tint(255, 255);
  image(corner1,0,0);
  image(corner2,width-corner2.width,0);

  for (ParticleSystem system : systems) {
    system.run();
  }

  if (beatDetector.isBeat()) {
    ParticleSystem newSystem = new ParticleSystem(int(random(width)), int(random(height)));
    systems.add(newSystem);
  }

  //fluid.display();
  //solid.display();
}

void mouseClicked() {
  ParticleSystem newSystem = new ParticleSystem(mouseX, mouseY);
  systems.add(newSystem);
}

void keyPressed() {
  if (keyCode == RIGHT) {
    wind = new PVector(0.05, 0);
  } else if (keyCode == LEFT) {
    wind = new PVector(-0.05, 0);
  }
}

void keyReleased() {
  if (keyCode == RIGHT || keyCode == LEFT) {
    wind = new PVector(0, 0);
  }
}

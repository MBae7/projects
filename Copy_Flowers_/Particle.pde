PImage particleFlower1;
PImage particleFlower2;
PImage particleFlower3;


class Particle {
  //declare motion vectors
  float x;
  float y=0;
  PVector position, velocity, acceleration;
  //declare top speed and display size
  float topSpeed, radius, mass;
  float angle, angleVel, angleAcc;
  int lifeSpan;
  PImage flower;
  int r;


  //Constructor Function
  /*Particle(PVector pIn, PVector vIn) {
    initialize();
    r = int(random(3));
    if (r==0) {
      flower= particleFlower1;
    } else if (r==1) {
      flower= particleFlower2;
    } else {
      flower= particleFlower3;
    }

    //assign initial values based on parameters passed into constructor
    position = new PVector(pIn.x, pIn.y);
    velocity = new PVector(vIn.x, vIn.y);
    acceleration = new PVector(0, 0);
    topSpeed = 10;
    radius = 10;
    flower.resize(int(radius*2), int(radius*2));
    mass = 1;
    lifeSpan = 255;
  }*/
  
  Particle(PVector pIn, PVector vIn, float radius) {
    initialize();

    //assign initial values based on parameters passed into constructor
    position = new PVector(pIn.x, pIn.y);
    velocity = new PVector(vIn.x, vIn.y);
    acceleration = new PVector(0, 0);
    topSpeed = 10;
    radius = 20;
    flower.resize(int(radius*2), int(radius*2));
    mass = random(3);
    lifeSpan = 500;
  }


  void initialize() {
    if (particleFlower1==null) {
      particleFlower1= loadImage("flower1.png");
      particleFlower2= loadImage("flower2.png");
      particleFlower3= loadImage("flower3.png");
    }
  }
    //function to check if particle is dead
    boolean isDead() {
      if (lifeSpan < 0) {
        return true;
      } else {
        return false;
      }
    }



    //applyForce Function
    void applyForce(PVector force) {
      //divide force by mover mass
      PVector f = PVector.div(force, mass);
      //add the resulting vector to acceleration
      acceleration.add(f);
    }

    //applyGravity Function
    void applyGravity(PVector gravity) {
      //add the gravity vector to acceleration
      acceleration.add(gravity);
    }

    void update() {
      lifeSpan-=4;

      angleAcc = acceleration.x/10;
      angleVel += angleAcc;
      angle += angleVel;

      //add acceleration to velocity
      velocity.add(acceleration);
      //limit magnitude of velocity
      velocity.limit(topSpeed);
      //add velocity to position
      position.add(velocity);
      //reset acceleration to zero
      acceleration.mult(0);
    }

    void checkEdgesWrap() {
      if (position.x > width + radius) {
        position.x = 0 - radius;
      } else if (position.x < 0 - radius) {
        position.x = width + radius;
      }

      if (position.y > height + radius) {
        position.y = 0 - radius;
      } else if (position.y < 0 - radius) {
        position.y = height + radius;
      }
    }

    void checkEdgesBounce() {
      if (position.x > width) {
        position.x = width;
        velocity.x*=-1;
      } else if (position.x < 0) {
        position.x = 0;
        velocity.x*=-1;
      }

      if (position.y > height) {
        position.y = height;
        velocity.y*=-1;
      } else if (position.y < 0) {
        position.y = 0;
        velocity.y*=-1;
      }
    }

    void display() {
      noStroke();
      pushMatrix();
      translate(position.x, position.y);
      rotate(angle);
      imageMode(CENTER);
      tint(255, lifeSpan);
      image(flower, 0, 0);

      popMatrix();
    }
    
    void fall() {
      lifeSpan-=4;

      //add acceleration to velocity
      velocity.add(acceleration);
      //limit magnitude of velocity
      velocity.limit(topSpeed);
      //add velocity to position
      position.add(velocity);
      //reset acceleration to zero
      acceleration.mult(0);
    }

   
  }

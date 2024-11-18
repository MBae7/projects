class ParticleSystem {
  ArrayList<Particle> particles;
  PVector position;

  ParticleSystem(int x, int y) {
    //initialize the particle arrayList
    particles = new ArrayList<Particle>();
    position = new PVector(x, y);
    //populate the arraylist with particles using a for loop
    for (int i = 0; i < 40; i++) {
      PVector p = PVector.random2D();
      p.mult(random(1, 2));
      Particle particle = new Particle(position, p);
      particles.add(particle);
    }
  }

  void run() {
    //Removes dead particles
    for (int i = particles.size()-1; i > -1; i--) {
      Particle p = particles.get(i);
      if (p.isDead()) {
        particles.remove(p);
      }
    }

    //use an enhanced for loop to cycle through each particle in the arrayList
    for (Particle p : particles) {
      p.applyGravity(gravity);
      p.update();
      //p.checkEdgesBounce();
      p.display();
    }
  }
  
  boolean isDead(){
    //you could base the fireworks life on lifespan or the particles in in it
    if(particles.size() < 1){
      return true;
    }else{
      return false;
    }
  }
}

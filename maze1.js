let left,right,up, down;

function preload(){
    left = loadImage('left.png');
    right = loadImage('right.png');
    up = loadImage('up.png');
    down = loadImage('down.png');
   let ax;
}

function setup(){
     createCanvas(windowWidth, windowHeight);
    //grid
    let totalSquareW;
    let sx;
    let sy;
    //buttons
    let bBarH=windowHeight/8;;
    let bx,by,bw,bn;
    let bh=bBarH/2.1;
    let ux,dx,lx,rx;
     ax=0;
    let aw=bh;
    
    
    left.resize(aw, aw);
    right.resize(aw, aw);
    up.resize(aw, aw);
    down.resize(aw, aw);

    
}



function draw(){ 
     bBarH=windowHeight/8;
//grid 
   
    if(windowWidth<windowHeight){
        totalSquareW = windowWidth-bBarH;
    }else{
        totalSquareW= windowHeight-bBarH;
    }
    
  
    let ss=totalSquareW/5;
    
    for(let i =0; i<5; i++){
        sx=i*ss;
        for(let j = 0; j<5; j++){
            sy=j*ss+bBarH;
            square(sx,sy,ss);
        }
    }
//buttonbar
    bn=5;
    by=0;
    bw=windowWidth/bn*.8;
    bh=bBarH/2.1;
    lx=0;
    ux=totalSquareW/5;
    dx=2*totalSquareW/5;
    rx=3*totalSquareW/5;
    
    
    //boxes 
    rect(lx,by,bw,bh);
    image(left, lx, by);
    rect(ux,by,bw,bh);
    image(up, ux, by);
    rect(dx,by,bw,bh);
    image(down, dx, by);
    rect(rx,by,bw,bh);
    image(right, rx, by);
    
    aw = bh;
   
  
    left.resize(aw, aw);
    right.resize(aw, aw);
    up.resize(aw, aw);
    down.resize(aw, aw);
    
    
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
  
}

function mousePressed(){
     //collision detection
    if(mouseY>by&&mouseY<by+bh){
        if(mouseX>ux &&mouseX<ux+bw){
            //up
            print('up pressed');
            image(up, ax, bBarH/2);
            ax+=aw;
        }else if(mouseX>lx &&mouseX<lx+bw){
            //left
            print('left pressed');
             image(left, ax, bBarH/2);
            ax+=aw;
        }else if(mouseX>dx &&mouseX<dx+bw){
            //down
            print('down pressed');
             image(down, ax, bBarH/2);
            ax+=aw;
        }else if(mouseX>rx &&mouseX<rx+bw){
            //right
            print('right pressed');
             image(right, ax, bBarH/2);
           ax+=aw;
        }
    }
}

//python3 -m http.server
//http://localhost:8000/

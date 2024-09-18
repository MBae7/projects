function setup(){
     createCanvas(windowWidth, windowHeight);
    //grid
    let totalSquareW;
    let sx;
    let sy;
    //buttons
    let bBarH;
    let bx,by,bw,bh,bn;
    let ux,dx,lx,rx;
    
}

function draw(){ 
     bBarH=windowHeight/5;
     bBarH=windowHeight/8;
//grid 
   
    if(windowWidth<windowHeight){
        totalSquareW = windowWidth-bBarH;
    }else{
        totalSquareW= windowHeight=bBarH;
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
    rect(bx,by,bw,bh);
    lx=0;
    ax=totalSquareW/5;
    dx=2*totalSquareW/5;
    rx=4*totalSquareW/5;
    
    //boxes 
    rect(lx,by,bw,bh);
    rect(ax,by,bw,bh);
    rect(dx,by,bw,bh);
    rect(rx,by,bw,bh);
  
    
    
    
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
}


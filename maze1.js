let left,right,up, down;
 let mx=0;
 let ms=40;
 let order='';
let mxv=1;
let myv=1;
 let ax;
  //grid
    let totalSquareW;
    let sx;
    let sy;
    //buttons
    let bBarH;
    let bx,by,bw,bn;
    let bh=bBarH/2.1;
let my;

    let ux,dx,lx,rx,gx;
     ax=0;
    let aw;
    let ss;
    let go = false; 
    let index = 0;
    let i;

function preload(){
    left = loadImage('left.png');
    right = loadImage('right.png');
    up = loadImage('up.png');
    down = loadImage('down.png');
  
       
   
}
function setup(){
     createCanvas(windowWidth, windowHeight);   
}



function draw(){ 
     bBarH=windowHeight/8;
   if(go==false){
       my=bBarH;
   }
   
    
//grid 
   
    if(windowWidth<windowHeight){
        totalSquareW = windowWidth-bBarH;
    }else{
        totalSquareW= windowHeight-bBarH;
    }
    
  
     ss=totalSquareW/5;
    
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
    ux=bw;
    dx=2*bw;
    rx=3*bw;
    gx=4*bw;
    
    aw=bh;
   
  
    left.resize(aw, aw);
    right.resize(aw, aw);
    up.resize(aw, aw);
    down.resize(aw, aw);
    
    //boxes 
    fill('#FFE9D0');
    rect(lx,by,bw,bh);
    image(left, lx, by);
    fill('#FFFED3');
    rect(ux,by,bw,bh);
    image(up, ux, by);
    fill('#BBE9FF');
    rect(dx,by,bw,bh);
    image(down, dx, by);
    fill('#B1AFFF');
    rect(rx,by,bw,bh);
    image(right, rx, by);
    fill('#AEE8BB');
    rect(gx,by,bw,bh);
    
     fill('#C5B3AA');
    
    
    
    print('order'+order);
    
    //mover
    if(go==true){
        if(frameCount%30==0 &&index<order.length){
              mover();
        }
    }
    ellipseMode(CORNER);
    ellipse(mx,my,ms,ms);
    print(mx + " y: "+my);
    
}

function windowResized() { 
    resizeCanvas(windowWidth, windowHeight); 
  
}

function mousePressed(){
     //collision detection
    if(mouseY>by&&mouseY<by+bh){
     if(mouseX>lx &&mouseX<lx+bw){
            //left
            print('left pressed');
             image(left, ax, bBarH/2);
            ax+=aw;
            order+='2';
        }else if(mouseX>ux &&mouseX<ux+bw){
            //up
            print('up pressed');
            image(up, ax, bBarH/2);
            ax+=aw;
            order+='1';
        }else if(mouseX>dx &&mouseX<dx+bw){
            //down
            print('down pressed');
             image(down, ax, bBarH/2);
            ax+=aw;
            order+='3';
        }else if(mouseX>rx &&mouseX<rx+bw){
            //right
            print('right pressed');
             image(right, ax, bBarH/2);
           ax+=aw;
            order+='4';
            
        }else if(mouseX>gx &&mouseX<gx+bw){
           go=true;
        }
    }
}

function mover(){
   let  i=order[index,index+1];
    print("i="+i);
    print(mx+' y:'+my);
    if(i=='1'){
          for(let n = 0; n<ss; n+=myv){
             my-=myv;  
            //  ellipse(mx,my,ms,ms);
          } 
        }else if(order[index,index+1]=='2'){
            for(let n = 0; n<ss;n+=mxv){
              mx-=mxv;
          //      ellipse(mx,my,ms,ms);
          }    
        }else if(order[index,index+1]=='3'){
          for(let n = 0; n<ss;n+=myv){
            my+=myv;
              //ellipse(mx,my,ms,ms);
          }   
        }else if(order[index,index+1]=='4'){
            for(let n = 0; n<ss;n+=mxv){
             mx+=mxv;
              //  ellipse(mx,my,ms,ms);
          }   
        }
    if(index<order.length){
    index++;
    }
    }

//#FFF7F8
///#C2AFAE
//#C5B3AA
//#E6DEDB

//python3 -m http.server
//http://localhost:8000/

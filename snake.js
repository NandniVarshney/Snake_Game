function init()
{
	canvas=document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=650;
	pen=canvas.getContext('2d');
	cs=30;
	food=getrandomFood();

	//food image
	food_img=new Image();
	food_img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHYc8PkLeyQ-YO8RybcA7ifPr1MC2KvjgJNnamH5S_TVK2jJKq&usqp=CAU";
  	
  	trophy_img=new Image();
  	trophy_img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLaToyfaEuUqND5cihOcSNuxHnkNRBLS4xEzsTGv3rffNbfHBp&usqp=CAU";
	snake=
	{
		init_len:5,
		color:"green",
		cells:[],
		direction:"right",
		score:5,
		level:1,

	createSnake:function()
	{
		for(var i=this.init_len;i>0;i--)
		{
			this.cells.push({x:i,y:0});
		}
		
	},
	drawsnake:function()
	{
		for(var i=0;i<this.cells.length;i++)
		{
			pen.fillStyle=this.color;
			pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
		}
		//pen.fillRect(this.cells[2].x+10,this.cells[2].y,cs,cs);
	},
	updatesnake:function()
	{
          
          headx=this.cells[0].x;
          heady=this.cells[0].y;

          if(headx==food.x&&heady==food.y)
          {
          	food=getrandomFood();
          	this.score++;
          	if(this.score%10==0)
          	{
          	this.level++;
          	}
          	
          }
          else
          {
          	this.cells.pop();
          }
          var X,Y;
          if(this.direction=="right")
          {
          	X=headx+1;
          	Y=heady;
          }
          else if(this.direction=="left")
          {
          	X=headx-1;
          	Y=heady;
          }
          else if(this.direction=="up")
          {
          	X=headx;
          	Y=heady-1;
          }
          else if(this.direction=="down")
          {
          	X=headx;
          	Y=heady+1;
          }
          this.cells.unshift({x:X,y:Y});

          //boundary
          var lastx=Math.round(W/cs);
          var lasty=Math.round(H/cs);

          if(X<0||X>lastx||Y<0||Y>lasty)
          {
          	game_over=true;
          }
          
	}
	};
	snake.createSnake();
    function keypressed(e)
    {
    		if(e.key=="ArrowRight")
    		{
    			snake.direction="right";
    		}
    		else if(e.key=="ArrowDown")
    		{
    			snake.direction="down";
    		}
    		else if(e.key=="ArrowLeft")
    		{
    			snake.direction="left";
    		}
    		else if(e.key=="ArrowUp")
    		{
    			snake.direction="up";
    		}
    }
	document.addEventListener('keydown',keypressed);
	
}

init();


function draw() {
	pen.clearRect(0,0,W,H);
	snake.drawsnake();
    pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy_img,35,28,cs+15,cs+15);
	pen.fillStyle="red";
	pen.font="18px Roboto";
	pen.fillText(snake.score,50,50);
	pen.fillText("Level :",120,50);
	pen.fillText(snake.level,200,50);
	
}
	
game_over=false;
function update()
{
	snake.updatesnake();
}

function getrandomFood()
{
	var foodx=Math.round(Math.random()*(W-cs)/cs);
	var foody=Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:foodx,
		y:foody,
		color:"red",
	}
	return food;
}
function gameloop()
{
	if(game_over==true)
	{
		clearInterval(f);
		alert("GAME OVER");
		return;
	}
	draw();
	update();
}

var f=setInterval(gameloop,100);
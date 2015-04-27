var autoHotPoint=function(){
	var that=this;
	var container,
	stage,
	width=100,
	height=100,
	conA= new createjs.Container(),
	conB= new createjs.Container(),
	img= new Image(),
	point= new Image(),
	sourURL="http://localhost",
	defaultP=0,
	rotation=45;
	rotationD=0;
	notouch=true;
	function init(){

		var canvas = document.getElementById(container);
    	stage = new createjs.Stage(canvas);
    	point.src="texture/goodPoint.png";
    	stage.addChild(conA);
    	stage.addChild(conB);
    	img.onload=function(){
    		width=img.width;
    		height=img.height;
    		canvas.width = width;
    		canvas.height = height;
				bg=new createjs.Bitmap(img);
				conA.addChild(bg); 	
    		};
    		
    	createjs.Ticker.on("tick",tick);
		function tick(event){
			var l = conB.getNumChildren();
			if(rotationD==0){
				if(rotation==45){
					rotationD=1;
					rotation--
				}else{
					rotation++
				}
			}else{
				if(rotation==-45){
					rotationD=0;
					rotation++
				}else{
					rotation--
				}
			}
			$.each(conB.children,function(i,n){
				n.rotation=rotation;
			})
			/*for (var i=0; i<l; i++) {
				var child = conB.getChildAt(i);
				if(!notouch){
					child.alpha = 0;
				}
				
				var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
				if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) { notouch=false;child.alpha = 0.5; };
				stage.update();
			};*/
			stage.update();
		};
	};
	function reload(data){
		conA.removeAllChildren();
		conB.removeAllChildren();
		//data.image=data.image.replace(".jpg","_250x250.jpg");
		img.src = sourURL+data.image;

		$.each(data.hotPoint,function(i,n){
    		var hotPoint = new createjs.Bitmap(point);
    		hotPoint.x=n.point[0];
    		hotPoint.y=n.point[1];
    		hotPoint.data=n.data;
    		hotPoint.regX=hotPoint.regY=100;
    		hotPoint.scaleX=hotPoint.scaleY=0.2;
    		hotPoint.on("click",function(even){

    			that.clfn(this.data);
    		});
    		conB.addChild(hotPoint);
    	});
	};
	this.clfn=function(data){debugger;}
	this.setContainer=function(name){
		container=name;
	};
	this.getWidth=function(num){
		return width
	};
	this.getHeight=function(num){
		return height
	};
	this.init=init;
	this.reload=reload;
	this.setSourURL = function(url){
		sourURL=url
	}
}
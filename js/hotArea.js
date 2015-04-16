var autoHotArea=function(){
	var that=this;
	var container,stage,width=100,height=100,conA= new createjs.Container(),conB= new createjs.Container(),img= new Image(),sourURL="http://localhost",defaultP=0,notouch=true;
	function init(){
		var canvas = document.getElementById(container);
    	stage = new createjs.Stage(canvas);
    	
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

			for (var i=0; i<l; i++) {
				var child = conB.getChildAt(i);
				if(!notouch){
					child.alpha = 0;
				}
				
				var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
				if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) { notouch=false;child.alpha = 0.5; };
				stage.update();
			};
		};
	};
	function reload(data){
		conA.removeAllChildren();
		conB.removeAllChildren();
		data.image=data.image.replace(".jpg","_250x250.jpg");
		img.src = sourURL+data.image;
		$.each(data.hotArray,function(i,n){
    		var hotArea = new createjs.Shape();
    	hotArea.graphics.beginFill("rgb(190,0,0)");
    	n.area=JSON.parse(n.area);
    		$.each(n.area,function(u,v){

    			if(u==0){
    				hotArea.graphics.moveTo(v[0], v[1]);
    			}else{
    				hotArea.graphics.lineTo(v[0], v[1]);
    			};
    		});
    		hotArea.graphics.lineTo(n.area[0][0],n.area[0][1]);
    		hotArea.data=n.data;
    		if(i!=defaultP){
    			hotArea.alpha = 0
    		}else{
    			hotArea.alpha = 0.5
    		}
    		hotArea.on("click",function(even){
    			that.clfn(this.data);
    		});
    		conB.addChild(hotArea);
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
	this.defaultP = function(data){
		defaultP = data
	}
}
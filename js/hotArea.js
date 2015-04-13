var autoHotArea=function(){
	var container,stage,width=100,height=100,conA= new createjs.Container(),conB= new createjs.Container(),img= new Image()
	function init(){
		var canvas = document.getElementById(container);
    	stage = new createjs.Stage(canvas);
    	canvas.width = width;
    	canvas.height = height;
    	stage.addChild(conA);
    	stage.addChild(conB);
    	img.onload=function(){
				bg=new createjs.Bitmap(img);
				conA.addChild(bg); 	
    		};
    		
    	createjs.Ticker.on("tick",tick);
		function tick(event){
			var l = conB.getNumChildren();

			for (var i=0; i<l; i++) {
				var child = conB.getChildAt(i);
				child.alpha = 0;
				var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
				if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) { child.alpha = 0.5; };
				stage.update();
			};
		};
	};
	function reload(data){
		conA.removeAllChildren();
		conB.removeAllChildren();
		img.src = data.image;
		$.each(data.hotArray,function(i,n){
    		var hotArea = new createjs.Shape();
    	hotArea.graphics.beginFill("rgb(190,0,0)");
    		$.each(n.area,function(u,v){
    			if(u==0){
    				hotArea.graphics.moveTo(v[0], v[1]);
    			}else{
    				hotArea.graphics.lineTo(v[0], v[1]);
    			};
    		});
    		hotArea.graphics.lineTo(n.area[0][0],n.area[0][1]);
    		hotArea.data=n.data;
    		hotArea.on("click",function(even){
    			alert(this.data.color);
    		});
    		conB.addChild(hotArea);
    	});
	};
	this.setContainer=function(name){
		container=name;
	};
	this.setWidth=function(num){
		width=num
	};
	this.setHeight=function(num){
		height=num
	};
	this.init=init;
	this.reload=reload;

}
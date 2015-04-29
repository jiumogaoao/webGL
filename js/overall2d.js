var overall2d=function(){
	var that=this;
	var container,
	stage,
	width=100,
	height=100,
	left=0,
	oldLeft,
	touchLeft,
	touch=false,
	conA= new createjs.Container(),
	conB= new createjs.Container(),
	conC= new createjs.Container(),
	img= new Image(),
	point= new Image(),
	sourURL="http://localhost",
	defaultP=0,
	rotation=45,
	rotationD=0,
	data={},
	notouch=true;
	this.ready=function(){
		debugger;
	}
	function init(){
		
		var canvas = document.getElementById(container);
    	stage = new createjs.Stage(canvas);
    	point.src="texture/goodPoint.png";
    	stage.addChild(conA);
    	stage.addChild(conB);
    	stage.addChild(conC);
    	img.onload=function(){
    		width=img.width*2;
    		height=img.height;
    		canvas.width = width;
    		canvas.height = height;
				var bg=new createjs.Bitmap(img);
				conA.addChild(bg); 
				var bg2=new createjs.Bitmap(img);
				bg2.x=img.width;
				conA.addChild(bg2); 	
				that.ready();
				imageready();
    		};
    	function imageready(){
    		$.each(data.hotPoint,function(i,n){
    		var hotPoint = new createjs.Bitmap(point);
    		hotPoint.x=n.point[0];
    		hotPoint.y=n.point[1];
    		hotPoint.data=n.data;
    		hotPoint.regX=hotPoint.regY=100;
    		hotPoint.scaleX=hotPoint.scaleY=0.5;
    		hotPoint.on("click",function(even){

    			that.clfn(this.data);
    		});
    		conB.addChild(hotPoint);
    		var hotPoint2 = new createjs.Bitmap(point);
    		hotPoint2.x=n.point[0]+img.width;
    		hotPoint2.y=n.point[1];
    		hotPoint2.data=n.data;
    		hotPoint2.regX=hotPoint2.regY=100;
    		hotPoint2.scaleX=hotPoint2.scaleY=0.5;
    		hotPoint2.on("click",function(even){

    			that.clfn(this.data);
    		});
    		conB.addChild(hotPoint2);
    		/********************************/
    		var hotArea = new createjs.Shape();
    	hotArea.graphics.beginFill("rgb(190,0,0)");
    	var hotArea2 = new createjs.Shape();
    	hotArea2.graphics.beginFill("rgb(190,0,0)");
    	//n.area=JSON.parse(n.area);
    		$.each(n.area,function(u,v){

    			if(u==0){
    				hotArea.graphics.moveTo(v[0], v[1]);
    				hotArea2.graphics.moveTo(v[0]+img.width, v[1]);
    			}else{
    				hotArea.graphics.lineTo(v[0], v[1]);
    				hotArea2.graphics.lineTo(v[0]+img.width, v[1]);
    			};
    		});
    		hotArea.graphics.lineTo(n.area[0][0],n.area[0][1]);
    		hotArea2.graphics.lineTo(n.area[0][0]+img.width,n.area[0][1]);
    		hotArea.data=n.data;
    		hotArea2.data=n.data;
    		if(i!=defaultP){
    			hotArea.alpha = 0
    			hotArea2.alpha = 0
    		}else{
    			hotArea.alpha = 0.5
    			hotArea2.alpha = 0.5
    		}
    		hotArea.on("click",function(even){
    			that.clfn(this.data);
    		});
    		conC.addChild(hotArea);
    		hotArea2.on("click",function(even){
    			that.clfn(this.data);
    		});
    		conC.addChild(hotArea2);
    	});
    	}
    	createjs.Ticker.on("tick",tick);
		function tick(event){
			if(!touch){
							left++;
				}
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
			for (var i=0; i<l; i++) {
				var child = conC.getChildAt(i);
				if(!notouch){
					child.alpha = 0;
				}
				
				var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
				if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) { notouch=false;child.alpha = 0.5; };
				/***************************/
				if(left>=(($("#"+container).width()/2)-$(window).width())){
					left-=$("#"+container).width()/2;
					}
				if(left<0){
					left+=$("#"+container).width()/2;
					}
				/***************************/
				conA.x=conB.x=conC.x=left;
				stage.update();
			};
			stage.update();
		};
		/************************************/
		$(canvas).on("mousedown",function(e){
			e.stopPropagation();
			e.preventDefault();
			touch=ture;
			oldLeft=left;
			touchLeft=e.clientX;
			})
		$(canvas).on("mousemove",function(e){
			e.stopPropagation();
			e.preventDefault();
			left=touchLeft-e.clientX+oldLeft;
			})
		$(canvas).on("mouseup",function(){
			e.stopPropagation();
			e.preventDefault();
			touch=false;
			})
		$(canvas).on("touchstart",function(e){
			if ( e.touches.length == 1 ) {
			e.stopPropagation();
			e.preventDefault();
			touch=ture;
			oldLeft=left;
			touchLeft=e.touches[0].clientX;
			}
			});
		$(canvas).on("touchmove",function(e){
			if ( e.touches.length == 1 ) {
			e.stopPropagation();
			e.preventDefault();
			left=touchLeft-e.touches[0].clientX+oldLeft;
			}
			});
		$(canvas).on("touchend",function(e){
			touch=false;
			});
	};
	function reload(rdata){
		conA.removeAllChildren();
		conB.removeAllChildren();
		conC.removeAllChildren();
		data=rdata
		//data.image=data.image.replace(".jpg","_250x250.jpg");
		img.src = sourURL+data.image;

		
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
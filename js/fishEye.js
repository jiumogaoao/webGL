// JavaScript Document
if(!requestAnimationFrame){
	window.requestAnimationFrame = (function(){ 
		return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame || 
			function(/* function */ callback, /* DOMElement */ element){ 
				window.setTimeout(callback, 1000 / 60); 
			}; 
	})(); 
}
				function webglAvailable() {
		try {
			var canvas = document.createElement( 'canvas' );
			return !!( window.WebGLRenderingContext && (
				canvas.getContext( 'webgl' ) ||
				canvas.getContext( 'experimental-webgl' ) )
			);
		} catch ( e ) {
			return false;
		}
	}
var fishEye={};
;(function(){
	var camera=[], scene=[], renderer=[],pic=[],containerDom=[],webGL=webglAvailable(),sourURL="http://localhost",gArray=[],pArray=[];
	
	var texture_placeholder,
			isUserInteracting = false,
			onMouseDownMouseX = 0, onMouseDownMouseY = 0,
			lon = 90, onMouseDownLon = 0,
			lat = 0, onMouseDownLat = 0,
			phi = 0, theta = 0,pSize = 40,pState=0,
			target = new THREE.Vector3();
	
	function init() {

				
				$.each(containerDom,function(u,v){
				$("#"+v).empty();
				var container, mesh;	
					
					container = document.getElementById( v );
					
					camera[u] = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1100 );
					
					scene[u] = new THREE.Scene();
					
					texture_placeholder = document.createElement( 'canvas' );
				texture_placeholder.width = 512;
				texture_placeholder.height = 512;
				
				var context = texture_placeholder.getContext( '2d' );
				context.fillStyle = 'rgb( 200, 200, 200 )';
				context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
				
				var materials = pic[u];
				if(!webGL){
					mesh = new THREE.Mesh( new THREE.BoxGeometry( 600, 600, 600, 9, 9, 9 ), new THREE.MeshFaceMaterial( materials ) );
					}else{
					mesh = new THREE.Mesh( new THREE.BoxGeometry( 600, 600, 600, 1, 1, 1 ), new THREE.MeshFaceMaterial( materials ) );
					}
				
				mesh.scale.x = - 1;
				scene[u].add( mesh );
				for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

					var vertex = mesh.geometry.vertices[ i ];

					vertex.normalize();
					vertex.multiplyScalar( 550 );

				}

				if(u==0){
					var goodT=new THREE.Texture();
			var goodMt=new THREE.SpriteMaterial( { map:goodT,color: 0xffffff, fog: true } )
			var Tloader = new THREE.ImageLoader( );
				Tloader.load( "texture/goodPoint.png", function ( image ) {
					goodT.image = image;
					goodT.needsUpdate = true;

					$.each(gArray,function(i,n){
						if(n){
							var particle = new THREE.Sprite( goodMt );
										particle.position.x = n[0] * 250;
										particle.position.y = n[1] * 250;
										particle.position.z = n[2] * 250;
										particle.scale.x = particle.scale.y = 40;
										particle.ptype="goods";
										particle.data=n.data;
										pArray.push(particle)
										scene[u].add( particle );
						}
									
								})

				} );
				}

	if ( webGL && u == 0) {
		renderer[u] = new THREE.WebGLRenderer();
	}else{
		renderer[u] = new THREE.CanvasRenderer();
		}
				
				renderer[u].setPixelRatio( window.devicePixelRatio );
				renderer[u].setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer[u].domElement );
				
				
					})			

				document.getElementById( "containerA" ).addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.getElementById( "containerA" ).addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.getElementById( "containerA" ).addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.getElementById( "containerA" ).addEventListener( 'mousewheel', onDocumentMouseWheel, false );
				document.getElementById( "containerA" ).addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

				document.getElementById( "containerA" ).addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.getElementById( "containerA" ).addEventListener( 'touchmove', onDocumentTouchMove, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}
			
	function onWindowResize() {
				$("html").css("font-size",$(window).width()/320*20);
				$.each(containerDom,function(u,v){
					camera[u].aspect = window.innerWidth / window.innerHeight;
				camera[u].updateProjectionMatrix();
				renderer[u].setSize( window.innerWidth, window.innerHeight );
					})
				

			}
			
	function loadTexture( path ) {

				var texture = new THREE.Texture( texture_placeholder );
				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 1.5 } );

				var image = new Image();
				image.crossOrigin='';
				image.onload = function () {

					texture.image = this;
					texture.needsUpdate = true;

				};
				image.src = sourURL+path;

				return material;

			}
	
	function onDocumentMouseDown( event ) {

					event.stopPropagation();
					event.preventDefault();

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onDocumentMouseMove( event ) {

					event.stopPropagation();
					event.preventDefault();
					
				if ( isUserInteracting === true ) {
					var move = .1;
					if(!webGL){
						move = .5;
						}
					lon = ( onPointerDownPointerX - event.pageX ) * move + onPointerDownLon;
					lat = ( event.pageY - onPointerDownPointerY ) * move + onPointerDownLat;

				}
			}

			function onDocumentMouseUp( event ) {

					event.stopPropagation();
					event.preventDefault();
				isUserInteracting = false;

			}

			function onDocumentMouseWheel( event ) {
				$.each(containerDom,function(u,v){
					// WebKit
				if ( event.wheelDeltaY ) {

					camera[u].fov -= event.wheelDeltaY * 0.05;

				// Opera / Explorer 9

				} else if ( event.wheelDelta ) {

					camera[u].fov -= event.wheelDelta * 0.05;

				// Firefox

				} else if ( event.detail ) {

					camera[u].fov -= event.detail * 0.05;

				}
				if(camera[u].fov<35){
					camera[u].fov=35
				}
				if(camera[u].fov>70){
					camera[u].fov=70
				}
				camera[u].updateProjectionMatrix();
					})
				

			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length == 1 ) {

					event.stopPropagation();
					event.preventDefault();

					onPointerDownPointerX = event.touches[ 0 ].pageX;
					onPointerDownPointerY = event.touches[ 0 ].pageY;

					onPointerDownLon = lon;
					onPointerDownLat = lat;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length == 1 ) {

					event.stopPropagation();
					event.preventDefault();
					var move = .1;
					if(!webGL){
						move = .5;
						}
					lon = ( onPointerDownPointerX - event.touches[0].pageX ) * move + onPointerDownLon;
					lat = ( event.touches[0].pageY - onPointerDownPointerY ) * move + onPointerDownLat;

				}

			}

			function animate() {

				requestAnimationFrame( animate );
				update();

			}

			function update() {
						if ( isUserInteracting === false ) {
							var addLon=0.1;
							if(!webGL){
								addLon=0.1*window.devicePixelRatio
								}
							lon += addLon;
						}
		
						lat = Math.max( - 85, Math.min( 85, lat ) );
						phi = THREE.Math.degToRad( 90 - lat );
						theta = THREE.Math.degToRad( lon );
		
						target.x = 500 * Math.sin( phi ) * Math.cos( theta );
						target.y = 500 * Math.cos( phi );
						target.z = 500 * Math.sin( phi ) * Math.sin( theta );
						if(pState==0){
								if(pSize == 40){
									pState=1;
									pSize-=1;
								}else{
									pSize+=1
								}
							}else{
								if(pSize == -40){
									pState=0;
									pSize+=1;
								}else{
									pSize-=1;
								}
							}
						$.each(containerDom,function(u,v){
					camera[u].position={x:0,y:0,z:0}
				camera[u].lookAt( target );
				if(u==0){
					$.each(pArray,function(i,n){
						n.material.rotation=pSize*0.01;
					})
				}
				renderer[u].render( scene[u], camera[u] );
					})
			}
					
			
	function reload3D(textureArry){
				pic = [];
				gArray=textureArry.centerPoint;
				pArray=[];
				$.each(textureArry.texture,function(u,v){
					pic[u] = [];
				$.each(v,function(i,n){
					pic[u][i] = loadTexture( n );
					});
				});
				init();
				
				};
	function setContainer(containerGroup){
		containerDom = containerGroup;
		};

	function getColor(touchPoint,num){
		var canvasOffset = $("#"+containerDom[num]).offset();
					var canvasX = Math.floor(touchPoint.pageX - canvasOffset.left) * window.devicePixelRatio;
					var canvasY = Math.floor(touchPoint.pageY - canvasOffset.top) * window.devicePixelRatio;
					// 获取该点像素的数据
					var context = renderer[num].domElement.getContext("2d");
					var imageData = context.getImageData(canvasX, canvasY, 1, 1);
				   // 获取该点像素数据
					var pixel = imageData.data;
					return "#" + pixel[0] + "#" + pixel[1] + "#" + pixel[2]
	}						
	fishEye.reload3D = reload3D;
	fishEye.setContainer = setContainer;
	fishEye.getColor = getColor;
	fishEye.nowColor = null; 
	fishEye.animate = animate;
	fishEye.setSourURL = function(url){
		sourURL=url
	}
	fishEye.setGood=function(data){gArray=data}
	document.oncontextmenu = function() {  
        event.returnValue = false;  
    }
	})();


function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
	var mesh;
    
    screen.init( volume, {
      width: window.innerWidth * 0.6,
      height: window.innerHeight,
      targetDom: document.getElementById('display'),
      enableAutoResize: false
    });
    
    
    var color = new KVS.Vec3( 0, 0, 0 );
    var box = new KVS.BoundingBox();
    box.setColor( color );
    box.setWidth( 2 );

    var smin = volume.min_value;
    var smax = volume.max_value;
	var isovalue = KVS.Mix( smin, smax, 0.5 );
	var isosurface = new KVS.Isosurface();
	isosurface.setIsovalue( isovalue );
	
	document.getElementById('label').innerHTML = "Isovalue: " + Math.round( isovalue );
	
	var line = KVS.ToTHREELine( box.exec( volume ) );
    mesh = KVS.ToTHREEMesh( isosurface.exec( volume ) );
    screen.scene.add( line );
    screen.scene.add( mesh );
	
	document.getElementById('isovalue').addEventListener('mousemove', function() {
			var value = +document.getElementById('isovalue').value;
			var isovalue = KVS.Mix( smin, smax, value );
			document.getElementById('label').innerHTML = "Isovalue: " + Math.round( isovalue );
		});

    document.getElementById('change-isovalue-button').addEventListener('click', function() {
            screen.scene.remove( mesh );
            var value = +document.getElementById('isovalue').value;
            var isovalue = KVS.Mix( smin, smax, value );
            var isosurface = new KVS.Isosurface();
            isosurface.setIsovalue( isovalue );
            mesh = KVS.ToTHREEMesh( isosurface.exec( volume ) );
            screen.scene.add( mesh );
        });
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });
    
    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });
    
    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    screen.scene.add( light );
    
    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('phong.frag').text,
    });
    
    screen.loop();
}

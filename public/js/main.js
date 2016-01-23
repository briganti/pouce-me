var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerWidth * 60/250;

var SPEED = 0.01;

var clock = new THREE.Clock();
var lightModifier = 0.03;
var fireLightLeft, fireLightRight;
var mesh = null;
var cloudA, cloudB, cloudC = null;
var animation;
var action = {};
var mixer;
var direction = new THREE.Vector3(-0.01, 0, 0);

function init() {
    scene = new THREE.Scene();

    initMesh();
    initCamera();
    initLights();
    initRenderer();

    document.getElementById('container').appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 1, 2000);
    camera.position.set(0, 2, 14);
    camera.lookAt(new THREE.Vector3(0,0.8,0));

    // camera.position.set(0, 20, 0);
    // camera.lookAt(new THREE.Vector3(0,-14,0));
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
}

function initLights() {
    var light = new THREE.AmbientLight(0x000040);
    scene.add(light);

    var dirLight = new THREE.SpotLight( 0x666666, 1, 60, Math.PI / 2, 1 );
    dirLight.position.set(-10, 7, 10);
    dirLight.target.position.set(0,0,0);

    dirLight.castShadow = true;

		dirLight.shadowCameraNear = 1;
		dirLight.shadowCameraFar = 1000;
		dirLight.shadowCameraFov = 70;
    dirLight.shadowCameraNear = true;

		dirLight.shadowBias = 0.00001;
    dirLight.shadowDarkness = 0.8;

		dirLight.shadowMapWidth = 2048;
		dirLight.shadowMapHeight = 1024;

    // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

    scene.add(dirLight);

    fireLightLeft = new THREE.SpotLight( 0x806010, 3, 1.3, Math.PI/2, 1, 1 );
		fireLightLeft.position.set( 0.15, 0.3, 1.45 );
		fireLightLeft.target.position.set( -0.85, 0.3, 1.45);
    fireLightLeft.target.updateMatrixWorld();

    fireLightLeft.castShadow = true;

		fireLightLeft.shadowCameraNear = 1;
		fireLightLeft.shadowCameraFar = 1000;
		fireLightLeft.shadowCameraFov = 90;
    fireLightLeft.shadowCameraNear = true;

		fireLightLeft.shadowBias = 0.0001;
    fireLightLeft.shadowDarkness = 0.1;

		fireLightLeft.shadowMapWidth = 2048;
		fireLightLeft.shadowMapHeight = 1024;

    // scene.add( new THREE.CameraHelper( fireLightLeft.shadow.camera ) );

    scene.add(fireLightLeft);

    fireLightRight = new THREE.SpotLight( 0x806010, 3, 1.3, Math.PI/2, 1, 1 );
		fireLightRight.position.set( 0.15, 0.3, 1.45 );
		fireLightRight.target.position.set( 1.15, 0.3, 1.45);
    fireLightRight.target.updateMatrixWorld();

    fireLightRight.castShadow = true;

		fireLightRight.shadowCameraNear = 1;
		fireLightRight.shadowCameraFar = 1000;
		fireLightRight.shadowCameraFov = 90;
    fireLightRight.shadowCameraNear = true;

		fireLightRight.shadowBias = 0.0001;
    fireLightRight.shadowDarkness = 0.1;

		fireLightRight.shadowMapWidth = 2048;
		fireLightRight.shadowMapHeight = 1024;

    // scene.add( new THREE.CameraHelper( fireLightRight.shadow.camera ) );

    scene.add(fireLightRight);

    var planeGeo = new THREE.PlaneBufferGeometry(600, 900);
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: 0x043757,
        wireframe: false
    });
    planeMaterial.side = THREE.DoubleSide;
    var planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
    planeMesh.position.z = -5
    scene.add(planeMesh);
}

function initMesh() {
    var loader = new THREE.JSONLoader();

    // Island
    var dirtMaterial = new THREE.MeshPhongMaterial({
        color: 0xA59760,
        shading: THREE.FlatShading
      });

    var grassMaterial = new THREE.MeshPhongMaterial({
        color: 0xB4BB71,
        shading: THREE.FlatShading
      });
    loader.load('./static/asset/island.json', function(geometry) {
        var island = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([dirtMaterial, grassMaterial]));
        island.scale.x = island.scale.y = island.scale.z = 0.75;
        island.position.set(0, -0.501, 0);
        island.receiveShadow = true;
        scene.add(island);
    });

    // Clouds
    var cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
      });

    function makeCloud(geometry, pos, rot) {
      var cloud = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([cloudMaterial]));
      cloud.scale.x = cloud.scale.y = cloud.scale.z = 0.75;
      cloud.position.set(pos.x, pos.y, pos.z);
      cloud.rotation.set(rot.x, rot.y, rot.z);
      cloud.castShadow = true;
      scene.add(cloud);

      return cloud;
    }

    loader.load('./static/asset/cloud.json', function(geometry) {
        cloudA = makeCloud(geometry, {x:-8,y:2,z:5}, {x:0,y:Math.PI,z:0});
        cloudB = makeCloud(geometry, {x:0,y:-3,z:-3}, {x:0,y:0,z:0});
        cloudC = makeCloud(geometry, {x:12,y:3,z:0}, {x:Math.PI/3,y:0,z:0});
    });

    // Forest
    var leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x1C991C,
      shading: THREE.FlatShading
    });
    var trunkMaterial = new THREE.MeshPhongMaterial({
      color: 0x3B2312,
      shading: THREE.FlatShading
    });

    function makeTree(geometry, pos, rot, scale) {
      var tree = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([leafMaterial, trunkMaterial]));
      tree.scale.x = tree.scale.y = tree.scale.z = scale;
      tree.position.set(pos.x, pos.y, pos.z);
      tree.rotation.set(rot.x, rot.y, rot.z);
      tree.castShadow = true;
      tree.receiveShadow = true;
      scene.add(tree);

      return tree;
    }

    loader.load('./static/asset/tree1.json', function(geometry) {
      tree1A = makeTree(geometry, {x:-2,y:0.27,z:-1.7}, {x:0,y:0,z:0}, 0.75);
      tree1B = makeTree(geometry, {x:-1.2,y:0.37,z:-3}, {x:0,y:2,z:0}, 0.9);
      tree1C = makeTree(geometry, {x:0.1,y:0.17,z:-2}, {x:0,y:1,z:0}, 0.5);
    });

    loader.load('./static/asset/tree2.json', function(geometry) {
      tree2A = makeTree(geometry, {x:-2.4,y:1.1,z:-2.3}, {x:0,y:0,z:0}, 0.75);
      tree2B = makeTree(geometry, {x:-3.2,y:0.8,z:-1.4}, {x:0,y:-0.3,z:0}, 0.7);
      tree2C = makeTree(geometry, {x:-0.6,y:0.6,z:-1.9}, {x:0,y:-0.9,z:0}, 0.65);
    });

    // tent
    var stringMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shading: THREE.FlatShading
    });
    var tentMaterial = new THREE.MeshPhongMaterial({
      color: 0xAA7B5A,
      shading: THREE.FlatShading
    });

    loader.load('./static/asset/tent.json', function(geometry) {
      var tent = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([stringMaterial, tentMaterial]));
      tent.scale.x = tent.scale.y = tent.scale.z = 0.75;
      tent.position.set(2.5, 0.2, 0);
      tent.rotation.set(0, 0.5, 0);
      tent.castShadow = true;
      tent.receiveShadow = true;
      scene.add(tent);
    });

    // Fire
    var flametopMaterial = new THREE.MeshPhongMaterial({
      color: 0xE7CE60,
      emissive: 0xE7CE60,
      shading: THREE.FlatShading,
      skinning: true
    });
    var flamecenterMaterial = new THREE.MeshPhongMaterial({
      color: 0xE78B1E,
      emissive: 0xE78B1E,
      shading: THREE.FlatShading,
      skinning: true
    });
    var flamebottomMaterial = new THREE.MeshPhongMaterial({
      color: 0x922A00,
      emissive: 0x922A00,
      shading: THREE.FlatShading,
      skinning: true
    });
    var baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x1D1109,
      shading: THREE.FlatShading
    });

    loader.load('./static/asset/flame.json', function(geometry, materials) {
      var flame = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial([flametopMaterial, flamecenterMaterial, flamebottomMaterial]));
      flame.scale.x = flame.scale.y = flame.scale.z = 0.75;
      flame.position.set(0.15, 0.16, 1.45);
      scene.add(flame);

      mixer = new THREE.AnimationMixer( flame );
      mixer.addAction( new THREE.AnimationAction( geometry.animations[ 0 ] ) );
    });

    loader.load('./static/asset/fire-base.json', function(geometry) {
      var firebase = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([baseMaterial]));
      firebase.scale.x = firebase.scale.y = firebase.scale.z = 0.75;
      firebase.position.set(0.17, 0.16, 1.45);
      firebase.castShadow = true;
      firebase.receiveShadow = true;
      scene.add(firebase);
    });

    // trunk
    loader.load('./static/asset/trunk.json', function(geometry) {
      var trunk = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([trunkMaterial]));
      trunk.scale.x = trunk.scale.y = trunk.scale.z = 0.75;
      trunk.position.set(-1, 0.14, 2.5);
      trunk.rotation.set(0, -0.3, 0);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      scene.add(trunk);
    });

    // rock
    var rockMaterial = new THREE.MeshPhongMaterial({
      color: 0x818181,
      shading: THREE.FlatShading
    });

    loader.load('./static/asset/rock.json', function(geometry) {
      var rock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial([rockMaterial]));
      rock.scale.x = rock.scale.y = rock.scale.z = 0.75;
      rock.position.set(-3, 0.19, 1.5);
      rock.rotation.set(0,0, 0);
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    });
}

function render() {
    if (cloudA) {
      if (cloudA.position.x < -13) {
        cloudA.position.x = 13;
      }
      cloudA.position.add(direction);
    }
    if (cloudB) {
      if (cloudB.position.x < -22) {
        cloudB.position.x = 22;
      }
      cloudB.position.add(direction);
    }
    if (cloudC) {
      if (cloudC.position.x < -20) {
        cloudC.position.x = 20;
      }
      cloudC.position.add(direction);
    }

    if(fireLightLeft){
      if (fireLightLeft.intensity > 2) {
        lightModifier = -0.02;
      } else if (fireLightLeft.intensity < 0.8) {
        lightModifier = 0.01;
      }
      fireLightLeft.intensity = fireLightLeft.intensity + lightModifier;
      fireLightRight.intensity = fireLightRight.intensity + lightModifier;
    }

    var delta = clock.getDelta();
    if ( mixer ) { mixer.update( delta ); }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

init();
render();

module.exports =  function (scene, geometry, materials, options) {

  var mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));

  mesh.scale.x = mesh.scale.y = mesh.scale.z = options.scale ? options.scale : 0.75;
  if (options.position) {
  	mesh.position.set(options.position[0], options.position[1], options.position[2]);
  }
  if (options.rotation) {
  	mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  }
  mesh.receiveShadow = options.receiveShadow ? true : false;
  mesh.castShadow = options.castShadow ? true : false;

  scene.add(mesh);

  return mesh;
}

import * as THREE from 'three';
import './index.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"

//Scene
const scene = new THREE.Scene();

//Create our Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshStandardMaterial({
  color: 'red',
  roughness:0.3
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//lights
const light = new THREE.PointLight("0xffffff", 100, 100);
light.position.set(0, 8, 10)
light.intensity = 200
scene.add(light)

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}


//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 15
scene.add(camera)




//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 4

//Resize
window.addEventListener('resize', ()=> {
  //Update Sizes upon resize of browser tab window
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop);
}
loop();

//Timeline Magic
const t1 = gsap.timeline({default:{duration:1}})
t1.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1,y:1})
t1.fromTo("nav", {y:"-100%"}, {y:"0%"})
t1.fromTo(".title", {opacity:0}, {opacity:1})

//mouse animation colour

let mouseDown = false
let rgb = []
window.addEventListener('mousedown', ()=>(mouseDown = true))
window.addEventListener('mouseup', ()=>(mouseDown = false))
window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255), 
      Math.round((e.pageX/sizes.height)*255),
      150,
    ]
    //Lets Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    
    gsap.to(mesh.material.color, {
      r:newColor.r, 
      g:newColor.g, 
      b:newColor.b})
  }
})
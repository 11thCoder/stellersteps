import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

const canvas=document.getElementById("quantumCanvas");

const renderer=new THREE.WebGLRenderer({

canvas,

alpha:true,

antialias:true

});

renderer.setPixelRatio(window.devicePixelRatio);

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(

40,

canvas.clientWidth/canvas.clientHeight,

0.1,

100

);

camera.position.z=8;

renderer.setSize(canvas.clientWidth,canvas.clientHeight,false);

const light=new THREE.PointLight(0xf4d35e,5);

light.position.set(5,5,5);

scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,1));

const geometry=new THREE.IcosahedronGeometry(1.2,25);

const material=new THREE.MeshPhysicalMaterial({

color:0xf4d35e,

metalness:.9,

roughness:.15,

transmission:.15,

emissive:0xf4d35e,

emissiveIntensity:.45

});

const core=new THREE.Mesh(

geometry,

material

);

scene.add(core);

const ring1=new THREE.Mesh(

new THREE.TorusGeometry(1.8,.02,16,200),

new THREE.MeshBasicMaterial({

color:0xffde59

})

);

ring1.rotation.x=Math.PI/3;

scene.add(ring1);

const ring2=ring1.clone();

ring2.rotation.y=Math.PI/2;

scene.add(ring2);

const ring3=ring1.clone();

ring3.rotation.z=Math.PI/4;

scene.add(ring3);

const stars=[];

for(let i=0;i<250;i++){

const star=new THREE.Mesh(

new THREE.SphereGeometry(.02),

new THREE.MeshBasicMaterial({

color:0xffffff

})

);

star.position.set(

(Math.random()-.5)*12,

(Math.random()-.5)*12,

(Math.random()-.5)*12

);

scene.add(star);

stars.push(star);

}

let mx=0;

let my=0;

window.addEventListener("mousemove",(e)=>{

mx=(e.clientX/window.innerWidth-.5);

my=(e.clientY/window.innerHeight-.5);

});

function animate(){

requestAnimationFrame(animate);

const t=performance.now()*.001;

core.rotation.x+=0.003;

core.rotation.y+=0.004;

core.scale.setScalar(

1+.05*Math.sin(t*2)

);

ring1.rotation.y+=0.004;

ring2.rotation.x+=0.003;

ring3.rotation.z+=0.005;

scene.rotation.y+=(mx*.6-scene.rotation.y)*.04;

scene.rotation.x+=(-my*.4-scene.rotation.x)*.04;

stars.forEach(s=>{

s.rotation.y+=.01;

});

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=canvas.clientWidth/canvas.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(

canvas.clientWidth,

canvas.clientHeight,

false

);

});
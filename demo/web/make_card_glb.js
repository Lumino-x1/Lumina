import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';

global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:application/octet-stream;base64,${Buffer.from(buf).toString('base64')}`;
      if (this.onload) this.onload();
    });
  }
};

// 1. Create card geometry & mesh
const cardGeo = new THREE.BoxGeometry(1.6, 2.25, 0.05);
const baseMat = new THREE.MeshStandardMaterial({ name: 'base', color: 0xffffff });
const cardMesh = new THREE.Mesh(cardGeo, baseMat);
cardMesh.name = 'card';

// 2. Create clip geometry & mesh
const clipGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
const metalMat = new THREE.MeshStandardMaterial({ name: 'metal', color: 0xcccccc, metalness: 0.9, roughness: 0.2 });
const clipMesh = new THREE.Mesh(clipGeo, metalMat);
clipMesh.name = 'clip';
clipMesh.position.set(0, 1.2, 0);

// 3. Create clamp geometry & mesh
const clampGeo = new THREE.BoxGeometry(0.3, 0.15, 0.1);
const clampMesh = new THREE.Mesh(clampGeo, metalMat);
clampMesh.name = 'clamp';
clampMesh.position.set(0, 1.1, 0);

const scene = new THREE.Scene();
scene.add(cardMesh);
scene.add(clipMesh);
scene.add(clampMesh);

async function run() {
  const exporter = new GLTFExporter();
  const gltf = await exporter.parseAsync(scene, { binary: false });
  const jsonStr = JSON.stringify(gltf);
  const jsonBuf = Buffer.from(jsonStr);
  const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
  const totalLen = 12 + 8 + jsonBuf.length + jsonPad;

  const glb = Buffer.alloc(totalLen);
  glb.writeUInt32LE(0x46546c67, 0); // magic: 'glTF'
  glb.writeUInt32LE(2, 4);          // version: 2
  glb.writeUInt32LE(totalLen, 8);   // total length

  glb.writeUInt32LE(jsonBuf.length + jsonPad, 12); // chunkLength
  glb.writeUInt32LE(0x4e4f534a, 16);                 // chunkType: 'JSON'
  jsonBuf.copy(glb, 20);
  for (let i = 0; i < jsonPad; i++) {
    glb[20 + jsonBuf.length + i] = 0x20;
  }

  fs.writeFileSync('./src/card.glb', glb);
  console.log('Successfully generated src/card.glb!');
}

run().catch(console.error);

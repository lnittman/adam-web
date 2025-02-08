import * as THREE from 'three';

export function createDefaultEnvMap() {
  const format = THREE.RGBAFormat;
  const width = 256;
  const height = 256;
  
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const t = y / height;
      data[i] = Math.floor(255 * (1 - t));     // R
      data[i + 1] = Math.floor(255 * (1 - t)); // G
      data[i + 2] = Math.floor(255 * (1 - t)); // B
      data[i + 3] = 255;                       // A
    }
  }
  
  const texture = new THREE.DataTexture(data, width, height, format);
  texture.needsUpdate = true;
  return texture;
} 
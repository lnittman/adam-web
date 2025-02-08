'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface BoubaKikiFrameProps {
  type: 'bouba' | 'kiki';
  children: React.ReactNode;
}

const createShape = (type: 'bouba' | 'kiki') => {
  const shape = new THREE.Shape();
  
  if (type === 'bouba') {
    // Bouba: Soft, circular shape
    const segments = 64;
    const radius = 1;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const r = radius * (1 + 0.2 * Math.sin(theta * 4)); // Gentle waves
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
  } else {
    // Kiki: Sharp, star-like shape
    const points = [];
    const spikes = 8;
    for (let i = 0; i < spikes * 2; i++) {
      const theta = (i / (spikes * 2)) * Math.PI * 2;
      const r = i % 2 === 0 ? 1.2 : 0.5; // Long and short points
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      points.push(new THREE.Vector2(x, y));
    }
    shape.setFromPoints(points);
  }
  
  return new THREE.ShapeGeometry(shape);
};

export default function BoubaKikiFrame({ type, children }: BoubaKikiFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!frameRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    frameRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 3;

    // Create glowing shape
    const geometry = createShape(type);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add strong bloom effect
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(width, height),
      2.0,  // Stronger bloom
      0.5,  // Radius
      0.2   // Threshold
    ));

    // Gentle floating animation
    let frame: number;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      mesh.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
      mesh.scale.x = 1 + Math.sin(Date.now() * 0.0005) * 0.1;
      mesh.scale.y = 1 + Math.cos(Date.now() * 0.0005) * 0.1;
      composer.render();
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (frameRef.current && renderer.domElement) {
        frameRef.current.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return (
    <div className="relative w-full">
      <div 
        ref={frameRef}
        className="absolute inset-0 z-10"
        style={{ 
          pointerEvents: 'none',
          opacity: 0.8,
          filter: 'blur(2px)'
        }}
      />
      <div 
        ref={containerRef}
        className="relative z-20"
      >
        {children}
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface BoubaKikiFrameProps {
  type: 'bouba' | 'kiki';
  children?: React.ReactNode;
}

const createShapeGeometry = (type: 'bouba' | 'kiki') => {
  const shape = new THREE.Shape();
  const points: THREE.Vector2[] = [];
  const segments = 64;
  
  // Create points for both shapes with same number of vertices
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    
    if (type === 'bouba') {
      // Bouba: Soft, circular shape
      const radius = 1;
      const r = radius * (1 + 0.2 * Math.sin(theta * 4)); // Gentle waves
      points.push(new THREE.Vector2(
        r * Math.cos(theta),
        r * Math.sin(theta)
      ));
    } else {
      // Kiki: Sharp, star-like shape
      const spikes = 8;
      const r = 1 + 0.5 * Math.cos(spikes * theta);
      points.push(new THREE.Vector2(
        r * Math.cos(theta),
        r * Math.sin(theta)
      ));
    }
  }
  
  shape.setFromPoints(points);
  return { geometry: new THREE.ShapeGeometry(shape), points };
};

export default function BoubaKikiFrame({ type, children }: BoubaKikiFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const currentPointsRef = useRef<THREE.Vector2[]>([]);
  const targetPointsRef = useRef<THREE.Vector2[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!frameRef.current || !containerRef.current) return;

    // Cleanup previous renderer
    if (rendererRef.current) {
      frameRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }

    const container = containerRef.current;
    const defaultSize = { width: 300, height: 300 };
    const { width, height } = children 
      ? container.getBoundingClientRect()
      : defaultSize;

    // Setup renderer with higher precision
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    frameRef.current.appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    
    // Adjust camera to prevent cut-off
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.z = 5;

    // Create initial shape
    const { geometry, points } = createShapeGeometry(type);
    currentPointsRef.current = points;
    targetPointsRef.current = points;

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Enhanced bloom effect
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    composer.addPass(new RenderPass(scene, camera));
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5,  // Intensity
      0.8,  // Radius
      0.35  // Threshold
    );
    composer.addPass(bloomPass);

    const animate = () => {
      if (!meshRef.current) return;

      // Smooth shape morphing
      const shape = new THREE.Shape();
      const morphedPoints: THREE.Vector2[] = [];
      
      for (let i = 0; i < currentPointsRef.current.length; i++) {
        const current = currentPointsRef.current[i];
        const target = targetPointsRef.current[i];
        
        const x = THREE.MathUtils.lerp(current.x, target.x, 0.1);
        const y = THREE.MathUtils.lerp(current.y, target.y, 0.1);
        
        morphedPoints.push(new THREE.Vector2(x, y));
      }
      
      currentPointsRef.current = morphedPoints;
      shape.setFromPoints(morphedPoints);
      
      // Update geometry
      meshRef.current.geometry.dispose();
      meshRef.current.geometry = new THREE.ShapeGeometry(shape);

      // Gentle rotation and scale animation
      meshRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
      const scale = 1 + Math.sin(Date.now() * 0.0005) * 0.05;
      meshRef.current.scale.set(scale, scale, 1);

      composer.render();
      requestRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      geometry.dispose();
      material.dispose();
      if (composerRef.current) {
        composerRef.current.passes.forEach(pass => pass.dispose());
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (frameRef.current && rendererRef.current.domElement) {
          frameRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, [children]);

  // Update target points when type changes
  useEffect(() => {
    const { points } = createShapeGeometry(type);
    targetPointsRef.current = points;
  }, [type]);

  return (
    <div className="relative w-full" style={{ minHeight: children ? 'auto' : '300px' }}>
      <div 
        ref={frameRef}
        className="absolute inset-0 z-10"
        style={{ 
          pointerEvents: 'none',
          opacity: 0.9,
          filter: 'blur(1px)'
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
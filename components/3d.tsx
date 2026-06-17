'use client';

import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { Environment, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing'

export default function ThreeD() {
  const gltf = useLoader(GLTFLoader, '/3d/window.glb');
  
  return (
    <div className="w-screen bg-[#2b2b38] scrollbar-y-auto!">
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        camera={{ position: [0, 0, 10], fov: 45 }}
      >

        {/* 環境光 */}
        <Environment preset="dawn" background={false} backgroundBlurriness={5} />
        {/* 自動旋轉 */}
        <OrbitControls autoRotate={true} autoRotateSpeed={1} />

        <ambientLight intensity={4} />
        <directionalLight position={[0, 0, 12]} intensity={0.1} color="#ffffff" />
        <directionalLight position={[0, 0, -12]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 0, 10]} intensity={1} color="#DACBFF" />
        <directionalLight position={[5, 0, 10]} intensity={1} color="#FFCBE2" />
        <directionalLight position={[-10, 0, 0]} intensity={1} color="#DACBFF" />
        <directionalLight position={[10, 0, 0]} intensity={1} color="#FFCBE2" />

        <Suspense fallback={null}>
          <primitive object={gltf.scene} />
        </Suspense>


        <EffectComposer>
          <Bloom intensity={0.01} />
        </EffectComposer>

      </Canvas>
    </div>
  );
}
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import longtool from "@/assets/longtool.png";

type RigSceneProps = {
  mouseX: number;
};

function RigModel({ mouseX }: RigSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const texture = useTexture(longtool.src);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const layers = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);
  const ratio = texture.image ? texture.image.height / texture.image.width : 1.45;
  const half = (layers.length - 1) / 2;

  useFrame((_, delta) => {
    const progress = (mouseX + 1) / 2;
    const orbitAngle = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(-135, 45, progress));
    const targetX = Math.sin(orbitAngle) * 28;
    const targetZ = Math.cos(orbitAngle) * 28;
    const damp = 1 - Math.exp(-delta * 3.8);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, damp);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 8, damp);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, damp);
    camera.lookAt(0, 5.2, 0);

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, THREE.MathUtils.degToRad(mouseX * 16), damp);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, THREE.MathUtils.degToRad(-4), damp);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.1, 0]} scale={[1.66, 1.66, 1.66]}>
      {layers.map((layer) => {
        const offset = (layer - half) * 0.12;
        const distance = Math.abs(layer - half) / half;
        const opacity = layer === half ? 0.95 : THREE.MathUtils.lerp(0.18, 0.028, distance);
        const color = layer === half ? "#d5dde5" : "#c2ccd6";

        return (
          <mesh key={layer} position={[0, 0, offset]} renderOrder={layer}>
            <planeGeometry args={[10.6, 10.6 * ratio]} />
            <meshBasicMaterial
              map={texture}
              transparent
              depthWrite={false}
              alphaTest={0.03}
              opacity={opacity}
              color={color}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function RigScene({ mouseX }: RigSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [-19.8, 8, -19.8], fov: 26 }}
      frameloop="always"
    >
      <RigModel mouseX={mouseX} />
    </Canvas>
  );
}
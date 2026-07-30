"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ResizeFix() {
  const { gl, size } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    gl.setSize(size.width, size.height, false);
    const canvas = gl.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
  }, [gl, size.width, size.height]);
  return null;
}

function OrbitingNodes({ brand }: { brand: string }) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    nodes.current.forEach((node, i) => {
      if (!node) return;
      node.position.y = Math.sin(t * 1.2 + i) * 0.15;
    });
  });

  const orbitCount = 6;

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color={brand} wireframe transparent opacity={0.5} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshBasicMaterial color={brand} transparent opacity={0.75} />
        </mesh>
        {Array.from({ length: orbitCount }).map((_, i) => {
          const angle = (i / orbitCount) * Math.PI * 2;
          const r = 1.55;
          return (
            <mesh
              key={i}
              ref={(el) => {
                if (el) nodes.current[i] = el;
              }}
              position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            >
              <octahedronGeometry args={[0.12, 0]} />
              <meshBasicMaterial color={brand} transparent opacity={0.95} />
            </mesh>
          );
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.008, 12, 80]} />
          <meshBasicMaterial color={brand} transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

export default function SkillsOrb() {
  const { resolvedTheme } = useTheme();
  const brand = resolvedTheme === "light" ? "#2b6cb0" : "#7eb8f0";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.style.width = "100%";
          gl.domElement.style.height = "100%";
        }}
      >
        <Suspense fallback={null}>
          <ResizeFix />
          <OrbitingNodes brand={brand} />
        </Suspense>
      </Canvas>
    </div>
  );
}

"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useEffect } from "react";

/** Keeps the drawing buffer matched to the measured parent size. */
function ResizeFix() {
  const { gl, size } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    gl.setSize(size.width, size.height, false);
    const canvas = gl.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
  }, [gl, size.width, size.height]);
  return null;
}

/** Geometric AI agent — head, eyes, antenna, soft body. */
function AiAgent({ brand }: { brand: string }) {
  const head = useRef<THREE.Group>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const scan = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const antennaTip = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (head.current) {
      // Look toward pointer (agent awareness)
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        x * 0.55,
        0.06,
      );
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        -y * 0.35,
        0.06,
      );
    }

    // Eye brightness pulse (thinking)
    const blink = Math.sin(t * 3.2) > 0.92 ? 0.15 : 0.85 + Math.sin(t * 2) * 0.15;
    for (const eye of [leftEye.current, rightEye.current]) {
      if (!eye) continue;
      (eye.material as THREE.MeshBasicMaterial).opacity = blink;
      eye.scale.y = Math.sin(t * 3.2) > 0.92 ? 0.15 : 1;
    }

    // Horizontal scan bar across the face
    if (scan.current) {
      scan.current.position.y = 0.15 + Math.sin(t * 1.6) * 0.28;
      (scan.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 + Math.abs(Math.sin(t * 1.6)) * 0.35;
    }

    // Mouth LED activity
    if (mouth.current) {
      mouth.current.scale.x = 0.7 + Math.abs(Math.sin(t * 4.5)) * 0.5;
      (mouth.current.material as THREE.MeshBasicMaterial).opacity =
        0.4 + Math.abs(Math.sin(t * 4.5)) * 0.5;
    }

    // Antenna signal tip
    if (antennaTip.current) {
      const s = 0.85 + Math.abs(Math.sin(t * 5)) * 0.4;
      antennaTip.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, 0.55, 0]}>
      <group ref={head}>
        {/* Head shell */}
        <mesh>
          <boxGeometry args={[1.35, 1.2, 1.05]} />
          <meshBasicMaterial color={brand} wireframe transparent opacity={0.7} />
        </mesh>
        {/* Face plate */}
        <mesh position={[0, 0.02, 0.48]}>
          <boxGeometry args={[1.05, 0.9, 0.04]} />
          <meshBasicMaterial color={brand} transparent opacity={0.18} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEye} position={[-0.32, 0.18, 0.54]}>
          <boxGeometry args={[0.28, 0.16, 0.06]} />
          <meshBasicMaterial color={brand} transparent opacity={0.9} />
        </mesh>
        <mesh ref={rightEye} position={[0.32, 0.18, 0.54]}>
          <boxGeometry args={[0.28, 0.16, 0.06]} />
          <meshBasicMaterial color={brand} transparent opacity={0.9} />
        </mesh>

        {/* Scan line */}
        <mesh ref={scan} position={[0, 0.15, 0.56]}>
          <boxGeometry args={[0.95, 0.03, 0.02]} />
          <meshBasicMaterial color={brand} transparent opacity={0.4} />
        </mesh>

        {/* Mouth bar */}
        <mesh ref={mouth} position={[0, -0.28, 0.54]}>
          <boxGeometry args={[0.45, 0.06, 0.05]} />
          <meshBasicMaterial color={brand} transparent opacity={0.7} />
        </mesh>

        {/* Ear modules */}
        <mesh position={[-0.72, 0.05, 0]}>
          <boxGeometry args={[0.12, 0.35, 0.35]} />
          <meshBasicMaterial color={brand} wireframe transparent opacity={0.55} />
        </mesh>
        <mesh position={[0.72, 0.05, 0]}>
          <boxGeometry args={[0.12, 0.35, 0.35]} />
          <meshBasicMaterial color={brand} wireframe transparent opacity={0.55} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
          <meshBasicMaterial color={brand} transparent opacity={0.65} />
        </mesh>
        <mesh ref={antennaTip} position={[0, 0.98, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={brand} transparent opacity={0.95} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.18, 0.28, 0.35, 8]} />
        <meshBasicMaterial color={brand} wireframe transparent opacity={0.45} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.95, 0.7, 0.7]} />
        <meshBasicMaterial color={brand} wireframe transparent opacity={0.5} />
      </mesh>
      {/* Chest core */}
      <mesh position={[0, -1.15, 0.32]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshBasicMaterial color={brand} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

/** Compact server pedestal the agent stands on / draws power from. */
function ServerBase({ brand }: { brand: string }) {
  const leds = useRef<THREE.Mesh[]>([]);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    leds.current.forEach((led, i) => {
      if (!led) return;
      (led.material as THREE.MeshBasicMaterial).opacity =
        0.3 + Math.abs(Math.sin(t * 2.5 + i * 1.1)) * 0.7;
    });
    if (ring.current) {
      ring.current.rotation.z = t * 0.6;
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      ring.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={[0, -1.85, 0]}>
      {/* Platform */}
      <mesh>
        <cylinderGeometry args={[1.15, 1.35, 0.22, 6]} />
        <meshBasicMaterial color={brand} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Rack slots under platform */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <group key={i} position={[x, -0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.5, 0.55, 0.7]} />
            <meshBasicMaterial color={brand} wireframe transparent opacity={0.45} />
          </mesh>
          {[0.12, 0, -0.12].map((y, j) => (
            <mesh
              key={j}
              position={[0.18, y, 0.32]}
              ref={(el) => {
                if (el) leds.current[i * 3 + j] = el;
              }}
            >
              <boxGeometry args={[0.06, 0.05, 0.04]} />
              <meshBasicMaterial color={brand} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Power ring */}
      <mesh ref={ring} position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.02, 10, 48]} />
        <meshBasicMaterial color={brand} transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

/** Orbiting micro-agents / worker nodes. */
function WorkerOrbit({ brand }: { brand: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        const r = 2.35;
        return (
          <group
            key={i}
            position={[Math.cos(a) * r, Math.sin(a * 2) * 0.4 + 0.2, Math.sin(a) * r]}
            rotation={[0, -a, 0]}
          >
            {/* Mini agent head */}
            <mesh>
              <boxGeometry args={[0.28, 0.24, 0.24]} />
              <meshBasicMaterial color={brand} wireframe transparent opacity={0.7} />
            </mesh>
            <mesh position={[-0.06, 0.02, 0.13]}>
              <boxGeometry args={[0.06, 0.05, 0.03]} />
              <meshBasicMaterial color={brand} transparent opacity={0.85} />
            </mesh>
            <mesh position={[0.06, 0.02, 0.13]}>
              <boxGeometry args={[0.06, 0.05, 0.03]} />
              <meshBasicMaterial color={brand} transparent opacity={0.85} />
            </mesh>
          </group>
        );
      })}
      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.01, 8, 80]} />
        <meshBasicMaterial color={brand} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** Data beams from server base up into the agent. */
function PowerBeams({ brand }: { brand: string }) {
  const beams = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.4;
      pts.push(Math.cos(a) * 0.55, -1.7, Math.sin(a) * 0.55, Math.cos(a) * 0.2, -0.3, Math.sin(a) * 0.2);
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state) => {
    if (!beams.current) return;
    const mat = (beams.current.children[0] as THREE.LineSegments)
      .material as THREE.LineBasicMaterial;
    mat.opacity = 0.15 + Math.abs(Math.sin(state.clock.elapsedTime * 2)) * 0.2;
  });

  return (
    <group ref={beams}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={brand} transparent opacity={0.25} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

function Dust({ brand, count = 80 }: { brand: string; count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={brand}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const { resolvedTheme } = useTheme();
  const brand = resolvedTheme === "light" ? "#2b6cb0" : "#7eb8f0";
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!root.current) return;
    const { x, y } = state.pointer;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, x * 0.15, 0.04);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -y * 0.08, 0.04);
  });

  return (
    <>
      <ResizeFix />
      <ambientLight intensity={0.55} />
      <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.35}>
        <group ref={root} scale={0.95}>
          <AiAgent brand={brand} />
          <ServerBase brand={brand} />
          <PowerBeams brand={brand} />
          <WorkerOrbit brand={brand} />
        </group>
      </Float>
      <Dust brand={brand} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.2, 5.8], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          const canvas = gl.domElement;
          canvas.style.width = "100%";
          canvas.style.height = "100%";
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

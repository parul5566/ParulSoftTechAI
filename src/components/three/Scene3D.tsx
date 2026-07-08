"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sphere, Line } from "@react-three/drei";
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

/* ============================================
   Interactive Technology Globe
   ============================================ */
function TechGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  const nodes = useMemo(() => {
    const points: [number, number, number][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 60; i++) {
      const y = 1 - (i / 59) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push([x * 2.2, y * 2.2, z * 2.2]);
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[2, 32, 32]}>
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
      </Sphere>
      <Sphere args={[1.95, 32, 32]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.05} />
      </Sphere>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#ec4899"}
            emissive={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#ec4899"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {nodes.slice(0, 30).map((pos, i) => {
        const next = nodes[(i + 7) % nodes.length];
        return (
          <Line key={`line-${i}`} points={[pos, next]} color="#8b5cf6" lineWidth={0.5} transparent opacity={0.1} />
        );
      })}
    </group>
  );
}

/* ============================================
   Neural Network Visualization
   ============================================ */
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  const layers = useMemo(() => {
    const layerSizes = [4, 6, 8, 6, 4];
    const layerSpacing = 1.2;
    const result: { pos: [number, number, number]; layer: number }[][] = [];
    layerSizes.forEach((size, layerIdx) => {
      const layerNodes: { pos: [number, number, number]; layer: number }[] = [];
      for (let i = 0; i < size; i++) {
        const y = (i - (size - 1) / 2) * 0.6;
        const x = (layerIdx - (layerSizes.length - 1) / 2) * layerSpacing;
        layerNodes.push({ pos: [x, y, 0], layer: layerIdx });
      }
      result.push(layerNodes);
    });
    return result;
  }, []);

  const connections = useMemo(() => {
    const conns: { from: [number, number, number]; to: [number, number, number] }[] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      layers[l].forEach((fromNode) => {
        layers[l + 1].forEach((toNode) => {
          conns.push({ from: fromNode.pos, to: toNode.pos });
        });
      });
    }
    return conns;
  }, [layers]);

  return (
    <group ref={groupRef}>
      {layers.map((layer, li) =>
        layer.map((node, ni) => (
          <mesh key={`${li}-${ni}`} position={node.pos}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={li === 0 ? "#06b6d4" : li === layers.length - 1 ? "#ec4899" : "#8b5cf6"}
              emissive={li === 0 ? "#06b6d4" : li === layers.length - 1 ? "#ec4899" : "#8b5cf6"}
              emissiveIntensity={1.2}
            />
          </mesh>
        ))
      )}
      {connections.map((conn, i) => (
        <Line key={`conn-${i}`} points={[conn.from, conn.to]} color="#8b5cf6" lineWidth={0.3} transparent opacity={0.15} />
      ))}
    </group>
  );
}

/* ============================================
   Floating Tech Ecosystem
   ============================================ */
function FloatingEcosystem() {
  const shapes = useMemo(() => {
    const items: { pos: [number, number, number]; scale: number; color: string; speed: number }[] = [];
    const colors = ["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6"];
    for (let i = 0; i < 15; i++) {
      items.push({
        pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4],
        scale: Math.random() * 0.4 + 0.15,
        color: colors[i % colors.length],
        speed: Math.random() * 2 + 1,
      });
    }
    return items;
  }, []);

  return (
    <>
      {shapes.map((shape, i) => (
        <Float key={i} speed={shape.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh position={shape.pos} scale={shape.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={shape.color} emissive={shape.color} emissiveIntensity={0.4} wireframe />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ============================================
   WebGL Support Detection
   ============================================ */
function useWebGLSupport() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}

/* ============================================
   Fallback Component (shown when WebGL is unavailable)
   ============================================ */
function SceneFallback({ type }: { type: "globe" | "neural" | "ecosystem" }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          {type === "globe" && (
            <>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.3" />
              <ellipse cx="40" cy="40" rx="32" ry="12" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.3" />
              <ellipse cx="40" cy="40" rx="12" ry="32" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.3" />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = 40 + Math.cos(angle) * 32;
                const y = 40 + Math.sin(angle) * 32;
                return <circle key={i} cx={x} cy={y} r="2" fill="#4ECDC4" />;
              })}
            </>
          )}
          {type === "neural" && (
            <>
              {[15, 40, 65].map((x, li) =>
                [20, 40, 60, 80].slice(0, li === 1 ? 4 : 3).map((y, ni) => (
                  <g key={`${li}-${ni}`}>
                    <circle cx={x} cy={y} r="3" fill={li === 0 ? "#06b6d4" : li === 2 ? "#ec4899" : "#8b5cf6"} />
                  </g>
                ))
              )}
            </>
          )}
          {type === "ecosystem" &&
            [0, 1, 2, 3, 4].map((i) => {
              const x = 15 + (i * 12);
              const y = 25 + ((i * 7) % 30);
              return <rect key={i} x={x} y={y} width="8" height="8" transform={`rotate(45 ${x + 4} ${y + 4})`} fill="none" stroke={["#8b5cf6", "#06b6d4", "#ec4899", "#3b82f6"][i % 4]} strokeWidth="1.5" />;
            })}
        </svg>
      </motion.div>
      <p className="text-sm text-white/40 text-center">
        3D visualization is best experienced on a device with GPU acceleration.
      </p>
    </div>
  );
}

import { motion } from "framer-motion";

/* ============================================
   Scene Wrapper with WebGL fallback
   ============================================ */
function Scene3D({ type }: { type: "globe" | "neural" | "ecosystem" }) {
  const webglSupported = useWebGLSupport();

  if (!webglSupported) {
    return <SceneFallback type={type} />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        if (!gl.getContext()) {
          // Will be caught by fallback on re-render
        }
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ec4899" />

        {type === "globe" && <TechGlobe />}
        {type === "neural" && <NeuralNetwork />}
        {type === "ecosystem" && <FloatingEcosystem />}

        <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} rotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}

export { Scene3D };
export default Scene3D;

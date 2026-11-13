import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { ExtrudeGeometryOptions, Group } from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { brandMarkPaths } from "@/lib/brand-mark";

const extrusion: ExtrudeGeometryOptions = {
  depth: 4,
  steps: 1,
  bevelEnabled: true,
  bevelSegments: 3,
  bevelThickness: 0.25,
  bevelSize: 0.25,
  curveSegments: 10,
};

function Sculpture({ active }: { active: boolean }) {
  const group = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const time = useRef(0);
  const { viewport } = useThree();
  const shapes = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${brandMarkPaths.map((d) => `<path d="${d}"/>`).join("")}</svg>`;
    return new SVGLoader().parse(svg).paths.flatMap((path) => path.toShapes());
  }, []);
  useFrame((_state, delta) => {
    if (!active) return;
    time.current += Math.min(delta, 0.05);
    if (group.current) {
      // Keep the Z facing the reader rather than showing its mirrored reverse.
      group.current.rotation.y = -0.22 + Math.sin(time.current * 0.35) * 0.35;
      group.current.rotation.x = -0.08 + Math.cos(time.current * 0.28) * 0.05;
      group.current.rotation.z = -0.03 + Math.sin(time.current * 0.28) * 0.025;
      group.current.position.y = Math.sin(time.current * 0.6) * 0.06;
    }
    if (orbit.current) orbit.current.rotation.z = time.current * -0.07;
  });
  const scale = Math.min(viewport.width / 5.6, viewport.height / 5.6);
  return (
    <group scale={scale}>
      <group ref={group} rotation={[-0.03, -0.22, -0.03]}>
        {/* SVG has downward Y; rotate into 3D and center the depth around zero. */}
        <group position={[-1.92, 1.92, 0.24]} rotation={[Math.PI, 0, 0]} scale={0.12}>
          {shapes.map((shape, index) => (
            <mesh key={index}>
              <extrudeGeometry args={[shape, extrusion]} />
              <meshStandardMaterial
                color={index === 0 ? "#f5f2eb" : "#ff5a36"}
                metalness={0.5}
                roughness={0.28}
              />
            </mesh>
          ))}
        </group>
      </group>
      <group ref={orbit} rotation={[0.3, -0.35, 0]}>
        <mesh rotation={[0.85, 0.25, -0.5]}>
          <torusGeometry args={[2.05, 0.006, 6, 128]} />
          <meshBasicMaterial color="#f5f2eb" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[-0.5, 0.55, 0.75]}>
          <torusGeometry args={[1.9, 0.006, 6, 128]} />
          <meshBasicMaterial color="#ff5a36" transparent opacity={0.2} />
        </mesh>
        <mesh position={[1.78, 0.85, 0.2]}>
          <sphereGeometry args={[0.045, 12, 8]} />
          <meshBasicMaterial color="#f5f2eb" />
        </mesh>
        <mesh position={[-1.55, -0.9, 0.5]}>
          <sphereGeometry args={[0.035, 12, 8]} />
          <meshBasicMaterial color="#ff5a36" />
        </mesh>
      </group>
    </group>
  );
}

function ContextEvents({ onUnavailable }: { onUnavailable: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onUnavailable]);
  return null;
}

export default function BrandSculptureScene({
  active,
  onReady,
  onUnavailable,
}: {
  active: boolean;
  onReady: () => void;
  onUnavailable: () => void;
}) {
  return (
    <Canvas
      className="brand-sculpture__canvas"
      aria-hidden="true"
      tabIndex={-1}
      camera={{ position: [0, 0, 7.5], fov: 40, near: 0.1, far: 30 }}
      dpr={[1, 1.25]}
      frameloop={active ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
      onCreated={onReady}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 4, 5]} intensity={4} color="#fff1dc" />
      <directionalLight position={[-4, 0, 2]} intensity={2.2} color="#ff754c" />
      <directionalLight position={[1, -3, -2]} intensity={3} color="#ffb28d" />
      <Sculpture active={active} />
      <ContextEvents onUnavailable={onUnavailable} />
    </Canvas>
  );
}

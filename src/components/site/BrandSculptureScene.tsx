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
    }
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
                metalness={0.3}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
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

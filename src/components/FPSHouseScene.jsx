import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Html,
  KeyboardControls,
  PerspectiveCamera,
  PointerLockControls,
  Sky,
  Stars,
  Text,
  useKeyboardControls,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const controls = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "leftward", keys: ["KeyA", "ArrowLeft"] },
  { name: "rightward", keys: ["KeyD", "ArrowRight"] },
  { name: "sprint", keys: ["ShiftLeft", "ShiftRight"] },
];

const zoneDefs = [
  {
    label: "Front Gate",
    hint: "The house is ahead. Move forward to enter.",
    test: ({ x, z }) => z > 7 && Math.abs(x) < 7,
  },
  {
    label: "Foyer",
    hint: "The entrance opens into the central hall.",
    test: ({ x, z }) => z <= 7 && z > 0 && Math.abs(x) < 3,
  },
  {
    label: "About Room",
    hint: "A green-lit room for identity, setup, and personal context.",
    test: ({ x, z }) => x < -3 && z <= 2 && z > -4,
  },
  {
    label: "Project Room",
    hint: "Purple-lit room with machines, screens, and project energy.",
    test: ({ x, z }) => x > 3 && z <= -2 && z > -8,
  },
  {
    label: "Blog Hall",
    hint: "The corridor keeps stretching forward like a readable tunnel.",
    test: ({ x, z }) => Math.abs(x) < 3 && z <= -1 && z > -12,
  },
  {
    label: "Contact Room",
    hint: "The final blue-lit room acts like a comms station.",
    test: ({ x, z }) => x > 3 && z <= -12,
  },
  {
    label: "Studio Room",
    hint: "A warm-lit room with work tables and product history vibes.",
    test: ({ x, z }) => x < -3 && z <= -10,
  },
];

export default function FPSHouseScene({ onZoneChange, lockRequestCount }) {
  return (
    <KeyboardControls map={controls}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#030507"]} />
        <fog attach="fog" args={["#030507", 16, 60]} />
        <PerspectiveCamera makeDefault position={[0, 1.72, 17]} fov={72} />
        <Sky
          distance={450000}
          sunPosition={[40, 12, -20]}
          inclination={0.55}
          azimuth={0.22}
          mieCoefficient={0.006}
          turbidity={8}
          rayleigh={0.8}
        />
        <ambientLight intensity={0.38} />
        <hemisphereLight
          intensity={0.85}
          color="#9bbce0"
          groundColor="#10151b"
        />
        <directionalLight
          position={[12, 18, 10]}
          intensity={1}
          color="#d7eaff"
        />
        <pointLight position={[0, 5, 14]} intensity={9} distance={45} color="#d8ebff" />
        <Stars radius={140} depth={80} count={1400} factor={4} fade />

        <World
          onZoneChange={onZoneChange}
          lockRequestCount={lockRequestCount}
        />
      </Canvas>
    </KeyboardControls>
  );
}

function World({ onZoneChange, lockRequestCount }) {
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!lockRequestCount) return;
    controlsRef.current?.lock();
  }, [lockRequestCount]);

  return (
    <>
      <PointerLockControls ref={controlsRef} />
      <PlayerController onZoneChange={onZoneChange} />
      <OutdoorGround />
      <HouseStructure />
      <RoomLabels />
      <AtmosphereLights />
    </>
  );
}

function PlayerController({ onZoneChange }) {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();
  const lookDirection = useRef(new THREE.Vector3());
  const strafeDirection = useRef(new THREE.Vector3());
  const moveDirection = useRef(new THREE.Vector3());
  const currentZone = useRef("");

  useEffect(() => {
    camera.position.set(0, 1.72, 17);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    const { forward, backward, leftward, rightward, sprint } = getKeys();
    const speed = sprint ? 8.6 : 4.8;

    lookDirection.current.set(0, 0, -1).applyQuaternion(camera.quaternion);
    lookDirection.current.y = 0;
    lookDirection.current.normalize();

    strafeDirection.current
      .crossVectors(lookDirection.current, new THREE.Vector3(0, 1, 0))
      .normalize();

    moveDirection.current.set(0, 0, 0);

    if (forward) {
      moveDirection.current.add(lookDirection.current);
    }
    if (backward) {
      moveDirection.current.sub(lookDirection.current);
    }
    if (rightward) {
      moveDirection.current.sub(strafeDirection.current);
    }
    if (leftward) {
      moveDirection.current.add(strafeDirection.current);
    }

    if (moveDirection.current.lengthSq() > 0) {
      moveDirection.current.normalize().multiplyScalar(speed * delta);
      camera.position.add(moveDirection.current);
    }

    constrainPlayer(camera.position);

    const nextZone =
      zoneDefs.find((zone) => zone.test(camera.position)) ?? zoneDefs[0];

    if (currentZone.current !== nextZone.label) {
      currentZone.current = nextZone.label;
      onZoneChange({
        label: nextZone.label,
        hint: nextZone.hint,
      });
    }
  });

  return null;
}

function constrainPlayer(position) {
  position.y = 1.72;
  position.z = THREE.MathUtils.clamp(position.z, -23, 19);

  if (position.z > 9) {
    position.x = THREE.MathUtils.clamp(position.x, -6.5, 6.5);
    return;
  }

  if (position.z > -18) {
    if (position.z > -2) {
      position.x = THREE.MathUtils.clamp(position.x, -5.8, 5.8);
      return;
    }

    if (position.z > -8) {
      position.x = THREE.MathUtils.clamp(position.x, -5.8, 5.8);
      return;
    }

    position.x = THREE.MathUtils.clamp(position.x, -6.2, 6.2);
    return;
  }

  position.x = THREE.MathUtils.clamp(position.x, -6.2, 6.2);
}

function OutdoorGround() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial color="#0a0f14" />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 10]}>
        <planeGeometry args={[5.6, 24]} />
        <meshStandardMaterial color="#1b2733" emissive="#253646" emissiveIntensity={0.15} />
      </mesh>

      <gridHelper
        args={[160, 120, "#0d1720", "#081017"]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

function HouseStructure() {
  return (
    <group>
      <HouseExterior />
      <MainHall />
      <AboutRoom />
      <ProjectRoom />
      <StudioRoom />
      <ContactRoom />
      <BlogTunnel />
      <Props />
    </group>
  );
}

function HouseExterior() {
  return (
    <group>
      <mesh position={[0, 2.8, 2]}>
        <boxGeometry args={[11, 5.6, 8]} />
        <meshStandardMaterial color="#111820" roughness={0.88} />
      </mesh>

      <mesh position={[0, 6.15, 2]}>
        <coneGeometry args={[6.8, 2.6, 4]} />
        <meshStandardMaterial color="#1a2430" roughness={0.84} />
      </mesh>

      <mesh position={[0, 1.65, 6.05]}>
        <boxGeometry args={[2.4, 3.3, 0.16]} />
        <meshStandardMaterial color="#0a1015" emissive="#9fd0ff" emissiveIntensity={0.18} />
      </mesh>

      <mesh position={[-3.1, 3.1, 6.05]}>
        <boxGeometry args={[1.6, 1.5, 0.16]} />
        <meshStandardMaterial color="#151d25" emissive="#7ee787" emissiveIntensity={0.4} />
      </mesh>

      <mesh position={[3.1, 3.1, 6.05]}>
        <boxGeometry args={[1.6, 1.5, 0.16]} />
        <meshStandardMaterial color="#151d25" emissive="#58a6ff" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function MainHall() {
  return (
    <group>
      <RoomFrame width={6} depth={26} height={4} position={[0, 0, -6]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}>
        <planeGeometry args={[5.2, 25.2]} />
        <meshStandardMaterial color="#121922" />
      </mesh>

      {Array.from({ length: 10 }, (_, index) => (
        <group key={index} position={[0, 0, 4 - index * 2.6]}>
          <DoorFrame side="left" />
          <DoorFrame side="right" />
          <mesh position={[0, 3.98, 0]}>
            <boxGeometry args={[5.2, 0.08, 1.1]} />
            <meshStandardMaterial color="#202b37" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RoomFrame({ width, depth, height, position }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, -depth / 2]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0e141b"
          side={THREE.BackSide}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}

function DoorFrame({ side }) {
  const x = side === "left" ? -2.62 : 2.62;

  return (
    <group position={[x, 0, 0]}>
      <mesh position={[side === "left" ? -0.08 : 0.08, 1.8, 0]}>
        <boxGeometry args={[0.16, 3.6, 1.08]} />
        <meshStandardMaterial color="#1c2733" />
      </mesh>
    </group>
  );
}

function AboutRoom() {
  return (
    <group position={[-5, 0, -1]}>
      <RoomFrame width={4.6} depth={5.8} height={4} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -2.9]}>
        <planeGeometry args={[4.2, 5.2]} />
        <meshStandardMaterial color="#101915" />
      </mesh>
      <pointLight position={[0, 2.6, -2.5]} intensity={4} color="#7ee787" />
      <Float speed={1.3} floatIntensity={0.4}>
        <mesh position={[0, 2.1, -3]}>
          <torusKnotGeometry args={[0.5, 0.16, 100, 16]} />
          <meshStandardMaterial color="#7ee787" emissive="#7ee787" emissiveIntensity={1.6} />
        </mesh>
      </Float>
    </group>
  );
}

function ProjectRoom() {
  return (
    <group position={[5, 0, -6]}>
      <RoomFrame width={4.6} depth={6.6} height={4} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3.3]}>
        <planeGeometry args={[4.2, 6]} />
        <meshStandardMaterial color="#16111c" />
      </mesh>
      <pointLight position={[0, 2.6, -3]} intensity={4.5} color="#d2a8ff" />
      <mesh position={[0, 1.2, -4.2]}>
        <boxGeometry args={[2.4, 1.2, 0.12]} />
        <meshStandardMaterial color="#0b0f15" emissive="#d2a8ff" emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
}

function StudioRoom() {
  return (
    <group position={[-5.2, 0, -15]}>
      <RoomFrame width={5} depth={6.8} height={4} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3.4]}>
        <planeGeometry args={[4.4, 6.2]} />
        <meshStandardMaterial color="#1a130d" />
      </mesh>
      <pointLight position={[0, 2.5, -3]} intensity={4.5} color="#ffb86b" />
      <mesh position={[0, 1.1, -4.6]}>
        <cylinderGeometry args={[0.7, 0.7, 1.6, 6]} />
        <meshStandardMaterial color="#2b1f16" emissive="#ffb86b" emissiveIntensity={0.22} />
      </mesh>
    </group>
  );
}

function ContactRoom() {
  return (
    <group position={[5.2, 0, -16]}>
      <RoomFrame width={5} depth={6.8} height={4} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -3.4]}>
        <planeGeometry args={[4.4, 6.2]} />
        <meshStandardMaterial color="#0f141d" />
      </mesh>
      <pointLight position={[0, 2.5, -3]} intensity={4.8} color="#58a6ff" />
      <Float speed={1.1} floatIntensity={0.3}>
        <mesh position={[0, 2.1, -3.2]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#58a6ff" emissive="#58a6ff" emissiveIntensity={1.6} />
        </mesh>
      </Float>
    </group>
  );
}

function BlogTunnel() {
  return (
    <group position={[0, 0, -14.5]}>
      <RoomFrame width={4.4} depth={12} height={4.2} position={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}>
        <planeGeometry args={[3.9, 11.2]} />
        <meshStandardMaterial color="#0f1318" />
      </mesh>

      {Array.from({ length: 7 }, (_, index) => (
        <Text
          key={index}
          position={[0, 2.35, -1.5 - index * 1.4]}
          fontSize={0.26}
          maxWidth={3.1}
          color="#d9ebff"
          anchorX="center"
          anchorY="middle"
        >
          {`Line ${index + 1} of the reading corridor.`}
        </Text>
      ))}
    </group>
  );
}

function Props() {
  const deskPositions = useMemo(
    () => [
      [-4.6, 0.65, -2.8],
      [4.7, 0.65, -7.9],
      [-4.8, 0.65, -16.8],
      [4.8, 0.65, -17.1],
    ],
    []
  );

  return (
    <group>
      {deskPositions.map((position) => (
        <group key={position.join("-")} position={position}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.6, 0.12, 0.8]} />
            <meshStandardMaterial color="#1b2430" />
          </mesh>
          <mesh position={[0, 0.46, -0.12]}>
            <boxGeometry args={[0.72, 0.46, 0.08]} />
            <meshStandardMaterial color="#0d1117" emissive="#9fd0ff" emissiveIntensity={0.26} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function RoomLabels() {
  const labels = [
    { title: "ABOUT", position: [-5, 2.5, -0.8], color: "#7ee787" },
    { title: "PROJECTS", position: [5, 2.5, -5.8], color: "#d2a8ff" },
    { title: "BLOG HALL", position: [0, 2.7, -13], color: "#d9ebff" },
    { title: "STUDIO", position: [-5, 2.5, -14.8], color: "#ffb86b" },
    { title: "CONTACT", position: [5, 2.5, -15.8], color: "#58a6ff" },
  ];

  return (
    <group>
      {labels.map((label) => (
        <Text
          key={label.title}
          position={label.position}
          fontSize={0.42}
          color={label.color}
          anchorX="center"
          anchorY="middle"
        >
          {label.title}
        </Text>
      ))}

      <Html position={[0, 2.6, 7.8]} center transform distanceFactor={10}>
        <div className="game-world-sign">ENTER THE HOUSE</div>
      </Html>
    </group>
  );
}

function AtmosphereLights() {
  return (
    <group>
      <pointLight position={[0, 2.6, 8]} intensity={7} distance={24} color="#d9ebff" />
      <pointLight position={[0, 2.3, -6]} intensity={3} distance={20} color="#9fd0ff" />
    </group>
  );
}

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Procedural Lens Mesh
function CameraLensMesh({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const lensRef1 = useRef<THREE.Mesh>(null)
  const lensRef2 = useRef<THREE.Mesh>(null)
  const outerRingRef = useRef<THREE.Mesh>(null)
  const apertureRef = useRef<THREE.Group>(null)
  const rearCoreRef = useRef<THREE.Mesh>(null)

  const { pointer } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return

    // 1. Mouse Parallax (Interactive Tilt)
    const targetX = pointer.x * 0.4
    const targetY = pointer.y * 0.4
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05)

    // 2. Scroll-Driven Camera Sweep with Cursor Translation Parallax
    // As scroll goes down, the lens zooms closer, rotates, and moves slightly backward
    const scrollFactor = Math.min(scrollY / 1200, 1.2) // Normalize scroll to max 1.2
    
    // Smooth transition values with mouse-parallax offset for depth
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -3 + (scrollFactor * 5), 0.05)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, (scrollFactor * -2) + (pointer.x * 0.6), 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, pointer.y * 0.4, 0.05)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollFactor * Math.PI, 0.05)

    // Subtle individual parts rotation
    if (lensRef1.current) {
      lensRef1.current.rotation.y += 0.005
    }
    if (lensRef2.current) {
      lensRef2.current.rotation.x -= 0.003
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += 0.001
    }

    // Aperture scaling and twisting simulation (opening up as you scroll)
    if (apertureRef.current) {
      const scale = 1 + (scrollFactor * 0.6)
      apertureRef.current.scale.set(scale, scale, scale)
      apertureRef.current.rotation.z = THREE.MathUtils.lerp(apertureRef.current.rotation.z, scrollFactor * Math.PI * 0.3, 0.05)
    }

    // Volumetric rear core breathing pulse animation
    if (rearCoreRef.current) {
      const pulse = 1.0 + Math.sin(state.clock.getElapsedTime() * 3) * 0.06
      rearCoreRef.current.scale.set(pulse, pulse, 1)
    }
  })

  // Materials
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#0e0d12',
    roughness: 0.15,
    metalness: 0.9,
    envMapIntensity: 1.0,
  })

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: '#ff3b30', // Red chrome highlight ring
    roughness: 0.1,
    metalness: 0.95,
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffeaea', // Subtle warm-tinted front glass
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    transmission: 0.95, // Glass transparency bypass
    thickness: 1.5, // Refraction thickness
    ior: 1.5, // Index of refraction
    side: THREE.DoubleSide,
  })

  const purpleGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ff4d4d', // Premium red lens coating
    transparent: true,
    opacity: 0.25,
    roughness: 0.01,
    transmission: 0.9,
    thickness: 2.0,
    ior: 1.7,
    side: THREE.DoubleSide,
  })

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Outer Viewfinder Frame */}
      <mesh ref={outerRingRef} material={metalMaterial}>
        <torusGeometry args={[2.0, 0.18, 16, 100]} />
      </mesh>

      <mesh position={[0, 0, -0.1]} material={chromeMaterial}>
        <torusGeometry args={[1.9, 0.03, 8, 100]} />
      </mesh>

      {/* Internal Lens Barrel */}
      <mesh position={[0, 0, -0.4]} material={metalMaterial}>
        <cylinderGeometry args={[1.8, 1.8, 0.8, 64, 1, true]} />
      </mesh>

      {/* Glass Element 1 (Convex front element) */}
      <mesh ref={lensRef1} position={[0, 0, 0.1]} material={glassMaterial}>
        <sphereGeometry args={[1.75, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
      </mesh>

      {/* Glass Element 2 (Internal red-tinted lens element) */}
      <mesh ref={lensRef2} position={[0, 0, -0.3]} material={purpleGlassMaterial}>
        <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.25]} />
      </mesh>

      {/* Aperture Mechanism (8 procedural blades) */}
      <group ref={apertureRef} position={[0, 0, -0.2]}>
        {[...Array(8)].map((_, i) => {
          const angle = (i * Math.PI) / 4
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0]}
              rotation={[0, 0, angle + 0.5]}
              material={metalMaterial}
            >
              <boxGeometry args={[0.8, 0.15, 0.02]} />
            </mesh>
          )
        })}
      </group>

      {/* Core Volumetric Light Source (Rear focal point) */}
      <mesh ref={rearCoreRef} position={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshBasicMaterial color="#ff3b30" toneMapped={false} />
      </mesh>
    </group>
  )
}

// Drifting dust particles in projector ray
function CinematicDust() {
  const count = 350
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    // Generate particles in a volumetric cone stretching along the z-axis (projector beam)
    const z = (Math.random() - 0.5) * 12
    const radius = 1.0 + Math.abs(z) * 0.4
    const theta = Math.random() * Math.PI * 2
    
    positions[i * 3] = Math.cos(theta) * Math.random() * radius
    positions[i * 3 + 1] = Math.sin(theta) * Math.random() * radius
    positions[i * 3 + 2] = z
  }

  const pointsRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (pointsRef.current) {
      // Subtle constant drifting motion
      pointsRef.current.rotation.z += 0.0005
      pointsRef.current.rotation.y += 0.0002
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ff5e5e" // Warm embers
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  )
}

// Scene lighting & wrapper
export default function DirectorLensScene({ scrollY }: { scrollY: number }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#030303']} />
        
        {/* Soft Ambient Light for base visibility */}
        <ambientLight intensity={0.4} />

        {/* Volumetric Spotlight beaming from the back of the camera lens */}
        <spotLight
          position={[0, 0, -4]}
          angle={0.6}
          penumbra={1}
          intensity={15}
          color="#ff3b30" // Red Spotlight
          distance={12}
        />

        {/* Crisp highlight directional light from front-top-right */}
        <directionalLight
          position={[5, 5, 4]}
          intensity={1.5}
          color="#ffffff"
        />

        {/* Red/Orange fill light for artistic contrast */}
        <pointLight
          position={[-4, -2, 2]}
          intensity={2.0}
          color="#ff4530"
        />

        {/* Core elements */}
        <CameraLensMesh scrollY={scrollY} />
        <CinematicDust />
      </Canvas>
    </div>
  )
}

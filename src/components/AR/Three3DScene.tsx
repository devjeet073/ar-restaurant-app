import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Model3D from './Model3D';
import type { MenuItem } from '../../types';

interface Three3DSceneProps {
  menuItem: MenuItem | null;
}

// Function to generate 3D object based on menu item
const generateMenuItemModel = (menuItem: MenuItem) => {
  const itemName = menuItem.name.toLowerCase();

  if (itemName.includes('pizza')) {
    // Pizza model
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.3, 32]} />
          <meshStandardMaterial color={0xD4A574} metalness={0.1} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[1.95, 1.95, 0.15, 32]} />
          <meshStandardMaterial color={0xFF6B35} metalness={0.05} roughness={0.8} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('calamari') || itemName.includes('seafood')) {
    // Calamari rings
    return (
      <group>
        <mesh position={[-0.5, 0, 0]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial color={0xF5DEB3} metalness={0.2} roughness={0.7} />
        </mesh>
        <mesh position={[0.5, 0.2, 0]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshStandardMaterial color={0xF5DEB3} metalness={0.2} roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.3, 0.4]}>
          <torusGeometry args={[0.55, 0.18, 16, 32]} />
          <meshStandardMaterial color={0xF5DEB3} metalness={0.2} roughness={0.7} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('steak') || itemName.includes('ribeye')) {
    // Steak
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.4, 1.8]} />
          <meshStandardMaterial color={0x8B4513} metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Grill marks */}
        <mesh position={[0, 0.21, 0]}>
          <planeGeometry args={[2.5, 1.8]} />
          <meshStandardMaterial color={0x654321} metalness={0} roughness={0.9} />
        </mesh>
        {/* Seasoning spots */}
        <mesh position={[-0.8, 0.22, 0.5]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={0x2F1B0C} metalness={0} roughness={1} />
        </mesh>
        <mesh position={[0.9, 0.22, -0.6]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={0x2F1B0C} metalness={0} roughness={1} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('bread') || itemName.includes('garlic')) {
    // Garlic Bread
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 2.5, 0.5]} />
          <meshStandardMaterial color={0xA0826D} metalness={0.05} roughness={0.9} />
        </mesh>
        {/* Butter/Garlic on top */}
        <mesh position={[0, 1.3, 0.26]}>
          <planeGeometry args={[1.4, 2.4]} />
          <meshStandardMaterial color={0xFFD700} metalness={0.1} roughness={0.7} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('risotto') || itemName.includes('mushroom')) {
    // Risotto Bowl
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.8, 32]} />
          <meshStandardMaterial color={0xD3A574} metalness={0.1} roughness={0.7} />
        </mesh>
        {/* Risotto rice inside */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[1.15, 1.35, 0.6, 32]} />
          <meshStandardMaterial color={0xE8C474} metalness={0.05} roughness={0.8} />
        </mesh>
        {/* Mushrooms on top */}
        <mesh position={[-0.4, 0.5, -0.3]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color={0x8B7355} metalness={0.1} roughness={0.8} />
        </mesh>
        <mesh position={[0.5, 0.45, 0.2]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={0x8B7355} metalness={0.1} roughness={0.8} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('cake') || itemName.includes('lava')) {
    // Chocolate Cake
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 1.2, 32]} />
          <meshStandardMaterial color={0x3D1D00} metalness={0.1} roughness={0.8} />
        </mesh>
        {/* Molten center indication */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color={0xFF6347} metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Icing on top */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[1.3, 1.2, 0.2, 32]} />
          <meshStandardMaterial color={0x2D1500} metalness={0.05} roughness={0.7} />
        </mesh>
        {/* Vanilla ice cream */}
        <mesh position={[0.8, 0.8, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={0xFFF8DC} metalness={0.2} roughness={0.3} />
        </mesh>
      </group>
    );
  } else if (itemName.includes('tiramisu')) {
    // Tiramisu
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.4, 1.8]} />
          <meshStandardMaterial color={0x6B4423} metalness={0.05} roughness={0.8} />
        </mesh>
        {/* Mascarpone cream layer */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.7, 0.3, 1.7]} />
          <meshStandardMaterial color={0xF5E6D3} metalness={0.1} roughness={0.7} />
        </mesh>
        {/* Cocoa powder on top */}
        <mesh position={[0, 0.4, 0]}>
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial color={0x8B6914} metalness={0} roughness={1} />
        </mesh>
      </group>
    );
  } else {
    // Default: Generic food plate
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
          <meshStandardMaterial color={0xFFFFFF} metalness={0.1} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.2, 32]} />
          <meshStandardMaterial color={0xFF6B6B} metalness={0.05} roughness={0.8} />
        </mesh>
      </group>
    );
  }
};

// Inner component that uses Three.js context
const SceneContent: React.FC<Three3DSceneProps> = ({ menuItem }) => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isPointerDownRef = useRef(false);
  const prevTargetRef = useRef({ x: 0.5, y: 0.5 });

  // Handle mouse movement
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent | PointerEvent) => {
      // Only update rotation while pointer is down (dragging)
      if (!isPointerDownRef.current) return;

      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();

      let clientX = 0;
      let clientY = 0;

      // TouchEvent
      if ('touches' in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        // MouseEvent or PointerEvent
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      const nx = Math.max(0, Math.min(1, x));
      const ny = Math.max(0, Math.min(1, y));

      prevTargetRef.current.x = nx;
      prevTargetRef.current.y = ny;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // pointer/touch down/up to enable drag-based rotation control
    const handlePointerDown = (e: any) => {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        isPointerDownRef.current = true;
        return;
      }
      const rect = canvas.getBoundingClientRect();

      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      prevTargetRef.current.x = Math.max(0, Math.min(1, x));
      prevTargetRef.current.y = Math.max(0, Math.min(1, y));
      setMousePos({ x: prevTargetRef.current.x, y: prevTargetRef.current.y });
      isPointerDownRef.current = true;
    };
    const handlePointerUp = () => { isPointerDownRef.current = false; };
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  // Update rotation based on touch position
  useFrame(() => {
    if (groupRef.current) {
      // Convert position to rotation (0 to 2π for horizontal, -π/2 to π/2 for vertical)
      const targetY = mousePos.x * Math.PI * 2;
      const targetX = (mousePos.y - 0.5) * Math.PI;

      const currentY = groupRef.current.rotation.y;
      const currentX = groupRef.current.rotation.x;

      // Only update while dragging — no inertia or momentum
      if (isPointerDownRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, targetY, 0.2);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(currentX, targetX, 0.2);
      }
    }
  });

  useEffect(() => {
    console.log('📦 SceneContent mounted with item:', menuItem?.name);
    // Set transparent background to see camera feed
    scene.background = null;
  }, [scene, menuItem]);

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} />

      {/* Main group for mouse control */}
      <group ref={groupRef}>
        {/* Render menu item model */}
        {menuItem ? (
          generateMenuItemModel(menuItem)
        ) : (
          // Fallback - show default pizza if no item
          <group>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2, 2, 0.3, 32]} />
              <meshStandardMaterial color={0xD4A574} metalness={0.1} roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[1.95, 1.95, 0.15, 32]} />
              <meshStandardMaterial color={0xFF6B35} metalness={0.05} roughness={0.8} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};

export const Three3DScene: React.FC<Three3DSceneProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        console.log('🔵 Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (videoRef.current) {
          console.log('📹 Setting video stream source...');
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
          
          // Handle play
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('✅ Camera stream playing');
                setCameraActive(true);
                setCameraError(null);
              })
              .catch(err => {
                console.warn('⚠️ Play error:', err?.message);
                setCameraActive(true); // Set active anyway
                setCameraError(null);
              });
          }
        }
      } catch (err: any) {
        console.error('❌ Camera access error:', err?.message);
        setCameraError(err?.message || 'Camera access denied');
        setCameraActive(false);
      }
    };

    setTimeout(initCamera, 100); // Small delay to ensure video element is ready

    // Cleanup on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => {
          console.log('🔴 Stopping track:', track.kind);
          track.stop();
        });
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Camera Feed Background */}
      <video
        ref={videoRef}
        key="camera-video"
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)',
          zIndex: cameraActive ? 0 : -1,
          backgroundColor: '#000',
        }}
      />

      {/* Fallback if camera not available */}
      {!cameraActive && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          textAlign: 'center',
          padding: '20px',
          zIndex: 5,
        }}>
          <div>
            <p>📷 {cameraError || 'Initializing camera...'}</p>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
              Check browser permissions or try a different browser
            </p>
          </div>
        </div>
      )}

      {/* 3D Canvas Overlay - Always render */}
      <Canvas
        key="three-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          touchAction: 'none',
        }}
        camera={{
          position: [0, 0, 4],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{ 
          alpha: true, 
          antialias: true,
          premultipliedAlpha: false,
        }}
      >
        <SceneContent {...props} />
      </Canvas>
    </div>
  );
};

export default Three3DScene;

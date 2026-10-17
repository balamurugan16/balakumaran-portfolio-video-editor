import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, Sliders } from 'lucide-react';

export interface ThreeCinemaLensProps {
  className?: string;
}

export const ThreeCinemaLens: React.FC<ThreeCinemaLensProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [aperture, setAperture] = useState(2.8);

  const stateRef = useRef({
    isRotating,
    aperture,
    pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
    stateRef.current.aperture = aperture;
  }, [isRotating, aperture]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.05);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.9, 4.8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting Rig tailored for clean white studio
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd4d4d8, 1.2);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xf1f5f9, 1.0);
    softFill.position.set(-3, 2, -2);
    scene.add(softFill);

    // Subtle warm rim
    const warmRim = new THREE.PointLight(0xf59e0b, 0.8, 8);
    warmRim.position.set(0, -1, 2);
    scene.add(warmRim);

    // Lens procedural model
    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    // Materials
    const matteBodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.28,
    });

    const knurledMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.75,
      roughness: 0.45,
    });

    const chromeRingMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.95,
      roughness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.92,
      ior: 1.55,
      thickness: 1.2,
      specularColor: new THREE.Color(0x38bdf8),
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      depthWrite: false,
    });

    // 1. Barrel Body
    const barrelGeo = new THREE.CylinderGeometry(1.15, 1.2, 2.0, 48);
    const barrel = new THREE.Mesh(barrelGeo, matteBodyMat);
    barrel.castShadow = true;
    lensGroup.add(barrel);

    // 2. Focus Grip Ring
    const gripGeo = new THREE.CylinderGeometry(1.22, 1.22, 0.6, 48);
    const grip = new THREE.Mesh(gripGeo, knurledMat);
    grip.position.y = 0.25;
    lensGroup.add(grip);

    // 3. Chrome Accent Ring
    const chromeGeo = new THREE.CylinderGeometry(1.23, 1.23, 0.08, 48);
    const chromeRing = new THREE.Mesh(chromeGeo, chromeRingMat);
    chromeRing.position.y = -0.15;
    lensGroup.add(chromeRing);

    // 4. Front Glass Element
    const lensElemGeo = new THREE.SphereGeometry(1.05, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
    const frontLens = new THREE.Mesh(lensElemGeo, glassMat);
    frontLens.rotation.x = Math.PI;
    frontLens.position.y = 0.95;
    lensGroup.add(frontLens);

    // 5. Rear Mount
    const mountGeo = new THREE.CylinderGeometry(0.95, 0.98, 0.3, 36);
    const rearMount = new THREE.Mesh(mountGeo, chromeRingMat);
    rearMount.position.y = -1.15;
    lensGroup.add(rearMount);

    // 6. Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sctx = shadowCanvas.getContext('2d')!;
    const grad = sctx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0,0,0,0.18)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.06)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.4;
    scene.add(shadowPlane);

    // Subtle initial angle
    lensGroup.rotation.x = 0.35;
    lensGroup.rotation.z = -0.1;

    // Pointer parallax
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.pointer.targetX = nx * 0.35;
      stateRef.current.pointer.targetY = ny * 0.2;
    };
    container.addEventListener('pointermove', onPointerMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      stateRef.current.pointer.x = THREE.MathUtils.damp(
        stateRef.current.pointer.x,
        stateRef.current.pointer.targetX,
        5,
        delta
      );
      stateRef.current.pointer.y = THREE.MathUtils.damp(
        stateRef.current.pointer.y,
        stateRef.current.pointer.targetY,
        5,
        delta
      );

      if (stateRef.current.isRotating) {
        lensGroup.rotation.y += delta * 0.35;
      }

      camera.position.x = stateRef.current.pointer.x * 1.2;
      camera.position.y = 0.9 + stateRef.current.pointer.y * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      barrelGeo.dispose();
      gripGeo.dispose();
      chromeGeo.dispose();
      lensElemGeo.dispose();
      mountGeo.dispose();
      shadowGeo.dispose();
      matteBodyMat.dispose();
      knurledMat.dispose();
      chromeRingMat.dispose();
      glassMat.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden bg-[#F4F4F5] border border-zinc-200/80 ${className}`}>
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Spec Badge */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 text-xs font-mono text-zinc-600">
        <span className="font-semibold text-zinc-900">50mm F/1.8</span>
        <span>·</span>
        <span>Cinema Prime</span>
      </div>

      {/* Bottom Minimal Dock */}
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-zinc-200 px-3 py-1.5 rounded-lg text-xs text-zinc-600 shadow-sm">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 hover:text-zinc-900 transition-colors cursor-pointer ${
            isRotating ? 'text-zinc-900 font-medium' : 'text-zinc-400'
          }`}
          title="Toggle 3D Rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isRotating ? 'Spinning' : 'Paused'}</span>
        </button>
      </div>
    </div>
  );
};

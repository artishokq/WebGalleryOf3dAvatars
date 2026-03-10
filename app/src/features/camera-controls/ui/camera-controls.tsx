import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useAvatarStore } from "@/entities/avatar";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const HOME_POSITION: [number, number, number] = [0, 1, 5];
const HOME_TARGET: [number, number, number] = [0, 1, 0];

const ZOOM_STEP = 0.85;

function snapToHome(camera: THREE.PerspectiveCamera, ctrl: OrbitControlsImpl) {
  camera.position.set(...HOME_POSITION);
  ctrl.target.set(...HOME_TARGET);

  ctrl.saveState();

  const wasDamping = ctrl.enableDamping;
  ctrl.enableDamping = false;
  ctrl.reset();
  ctrl.enableDamping = wasDamping;

  camera.updateProjectionMatrix();
}

export function CameraControls() {
  const autoRotate = useAvatarStore((s) => s.autoRotate);
  const toolMode = useAvatarStore((s) => s.toolMode);
  const resetTrigger = useAvatarStore((s) => s.resetViewTrigger);
  const zoomInTrigger = useAvatarStore((s) => s.zoomInTrigger);
  const zoomOutTrigger = useAvatarStore((s) => s.zoomOutTrigger);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const initialized = useRef(false);

  useFrame(() => {
    if (initialized.current) return;
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    initialized.current = true;
    snapToHome(camera as THREE.PerspectiveCamera, ctrl);
  });

  useEffect(() => {
    if (resetTrigger > 0) {
      const ctrl = controlsRef.current;
      if (ctrl) snapToHome(camera as THREE.PerspectiveCamera, ctrl);
    }
  }, [resetTrigger, camera]);

  useEffect(() => {
    if (zoomInTrigger > 0 && controlsRef.current) {
      const ctrl = controlsRef.current;
      const dir = new THREE.Vector3()
        .subVectors(ctrl.target, camera.position)
        .normalize();
      const dist = camera.position.distanceTo(ctrl.target);
      camera.position.addScaledVector(dir, dist * (1 - ZOOM_STEP));
      ctrl.update();
    }
  }, [zoomInTrigger, camera]);

  useEffect(() => {
    if (zoomOutTrigger > 0 && controlsRef.current) {
      const ctrl = controlsRef.current;
      const dir = new THREE.Vector3()
        .subVectors(ctrl.target, camera.position)
        .normalize();
      const dist = camera.position.distanceTo(ctrl.target);
      camera.position.addScaledVector(dir, -(dist * (1 - ZOOM_STEP)));
      ctrl.update();
    }
  }, [zoomOutTrigger, camera]);

  const enableRotate = toolMode === "rotate";
  const enablePan = toolMode === "pan";

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      autoRotate={autoRotate}
      autoRotateSpeed={2}
      enableDamping
      dampingFactor={0.12}
      minDistance={0.5}
      maxDistance={20}
      enableRotate={enableRotate}
      enablePan={enablePan}
      enableZoom
      mouseButtons={{
        LEFT:
          toolMode === "pan"
            ? THREE.MOUSE.PAN
            : toolMode === "zoom"
              ? THREE.MOUSE.DOLLY
              : THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      }}
      touches={{
        ONE:
          toolMode === "pan"
            ? THREE.TOUCH.PAN
            : toolMode === "zoom"
              ? THREE.TOUCH.DOLLY_PAN
              : THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
}

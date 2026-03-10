import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useAvatarStore } from "@/entities/avatar";

export function AutoFitCamera() {
  const { camera } = useThree();
  const modelBounds = useAvatarStore((s) => s.modelBounds);
  const applied = useRef<typeof modelBounds>(null);

  useEffect(() => {
    if (!modelBounds) return;
    if (
      applied.current &&
      applied.current.center[0] === modelBounds.center[0] &&
      applied.current.center[1] === modelBounds.center[1] &&
      applied.current.center[2] === modelBounds.center[2]
    ) {
      return;
    }
    applied.current = modelBounds;

    const [cx, cy, cz] = modelBounds.center;
    const [sx, sy, sz] = modelBounds.size;
    const maxDim = Math.max(sx, sy, sz);
    if (maxDim < 0.001) return;

    const perspCam = camera as THREE.PerspectiveCamera;
    const fov = perspCam.fov * (Math.PI / 180);
    const aspect = perspCam.aspect;

    const distY = sy / 2 / Math.tan(fov / 2);
    const distX = sx / 2 / (Math.tan(fov / 2) * aspect);
    const distance = Math.max(distY, distX, 0.5) * 1.25;

    camera.position.set(cx, cy, cz + distance);
    camera.lookAt(cx, cy, cz);
    camera.updateProjectionMatrix();
  }, [modelBounds, camera]);

  return null;
}

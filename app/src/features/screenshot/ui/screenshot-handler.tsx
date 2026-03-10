import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useAvatarStore } from "@/entities/avatar";
import { downloadBlob } from "@/shared/lib";

export function ScreenshotHandler() {
  const { gl, scene, camera } = useThree();
  const trigger = useAvatarStore((s) => s.screenshotTrigger);
  const prev = useRef(trigger);

  useEffect(() => {
    if (trigger === prev.current) return;
    prev.current = trigger;

    gl.render(scene, camera);
    gl.domElement.toBlob((blob) => {
      if (blob) downloadBlob(blob, `avatar-${Date.now()}.png`);
    });
  }, [trigger, gl, scene, camera]);

  return null;
}

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { saveThumbnail, getThumbnail } from "@/shared/lib";

interface Props {
  modelId: string;
}

export function ThumbnailCapture({ modelId }: Props) {
  const { gl, scene, camera } = useThree();
  const frameCount = useRef(0);
  const done = useRef(false);

  useFrame(() => {
    if (done.current) return;
    frameCount.current += 1;
    if (frameCount.current < 15) return;
    done.current = true;

    getThumbnail(modelId).then((existing) => {
      if (existing) return;
      gl.render(scene, camera);
      gl.domElement.toBlob((blob) => {
        if (blob) saveThumbnail(modelId, blob);
      });
    });
  });

  return null;
}

import { useEffect, useMemo, useRef } from "react";

import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";
import { useAvatarStore } from "../model/store";

interface AvatarModelProps {
  url: string;
}

export function AvatarModel({ url }: AvatarModelProps) {
  const gltf = useGLTF(url);
  const initModel = useAvatarStore((s) => s.initModel);

  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(gltf.scene);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = Array.isArray(child.material)
          ? child.material.map((m: THREE.Material) => m.clone())
          : child.material.clone();
      }
    });
    return clone;
  }, [gltf.scene]);

  const groupRef = useRef<THREE.Group>(null);
  const { actions, names: animationNames } = useAnimations(
    gltf.animations,
    groupRef,
  );

  const originalColors = useRef<Map<string, THREE.Color>>(new Map());

  useEffect(() => {
    const map = new Map<string, THREE.Color>();
    clonedScene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        map.set(child.uuid, child.material.color.clone());
      }
    });
    originalColors.current = map;
  }, [clonedScene]);

  const meshNames = useMemo(() => {
    const names: string[] = [];
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name) {
        names.push(child.name);
      }
    });
    return names;
  }, [clonedScene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    clonedScene.scale.setScalar(scale);
    clonedScene.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale,
    );
  }, [clonedScene]);

  useEffect(() => {
    initModel(animationNames, meshNames);
  }, [animationNames, meshNames, initModel]);

  const currentAnimation = useAvatarStore((s) => s.currentAnimation);
  const skinColor = useAvatarStore((s) => s.skinColor);
  const meshVisibility = useAvatarStore((s) => s.meshVisibility);

  useEffect(() => {
    if (!currentAnimation) return;
    const action = actions[currentAnimation];
    if (!action) return;

    action.reset().fadeIn(0.3).play();
    return () => {
      action.fadeOut(0.3);
    };
  }, [currentAnimation, actions]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        const original = originalColors.current.get(child.uuid);
        if (!original) return;

        if (skinColor === "default") {
          child.material.color.copy(original);
        } else {
          child.material.color
            .copy(original)
            .lerp(new THREE.Color(skinColor), 0.5);
        }
      }
    });
  }, [skinColor, clonedScene]);

  useEffect(() => {
    for (const [name, visible] of Object.entries(meshVisibility)) {
      const obj = clonedScene.getObjectByName(name);
      if (obj) obj.visible = visible;
    }
  }, [meshVisibility, clonedScene]);

  return <primitive ref={groupRef} object={clonedScene} />;
}

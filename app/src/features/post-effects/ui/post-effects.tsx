import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function PostEffects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.05}
      />
    </EffectComposer>
  );
}

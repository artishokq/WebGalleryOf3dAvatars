import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Html } from "@react-three/drei";
import type { EnvironmentProps } from "@react-three/drei";
import { useTheme } from "@/shared/theme";
import { ErrorBoundary } from "@/shared/ui";
import {
  AvatarModel,
  ThumbnailCapture,
  useAvatarStore,
} from "@/entities/avatar";
import { CameraControls } from "@/features/camera-controls";
import { PostEffects } from "@/features/post-effects";
import { ScreenshotHandler } from "@/features/screenshot";
import type { EnvironmentPreset } from "@/shared/types";

interface Props {
  url: string;
  modelId: string;
}

const ENV_PRESET: Record<EnvironmentPreset, string> = {
  studio: "studio",
  sunset: "sunset",
  night: "night",
};

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
        <span className="text-sm text-gray-500">Loading…</span>
      </div>
    </Html>
  );
}

function SceneContent({ url, modelId }: Props) {
  const environment = useAvatarStore((s) => s.environment);
  const bloomEnabled = useAvatarStore((s) => s.bloomEnabled);
  const shadowsEnabled = useAvatarStore((s) => s.shadowsEnabled);
  const { theme } = useTheme();

  const studioBg = theme === "dark" ? "#1a1a2e" : "#e8e8ec";
  const showBgHDRI = environment !== "studio";

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow={shadowsEnabled}
        shadow-mapSize={[1024, 1024]}
      />

      <Environment
        preset={ENV_PRESET[environment] as EnvironmentProps["preset"]}
        background={showBgHDRI}
      />
      {!showBgHDRI && <color attach="background" args={[studioBg]} />}

      {shadowsEnabled && (
        <ContactShadows position={[0, 0, 0]} opacity={0.4} blur={2} far={4} />
      )}

      <Suspense fallback={<Loader />}>
        <AvatarModel url={url} />
        <ThumbnailCapture modelId={modelId} />
      </Suspense>

      <CameraControls />
      <ScreenshotHandler />

      {bloomEnabled && <PostEffects />}
    </>
  );
}

export function SceneViewer({ url, modelId }: Props) {
  const shadowsEnabled = useAvatarStore((s) => s.shadowsEnabled);

  return (
    <ErrorBoundary
      fallback={
        <div className="flex h-full items-center justify-center text-red-500">
          Failed to render 3D scene
        </div>
      }
    >
      <Canvas
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        shadows={shadowsEnabled}
        camera={{ position: [0, 1, 5], fov: 45, near: 0.01, far: 200 }}
        className="touch-none"
      >
        <SceneContent key={url} url={url} modelId={modelId} />
      </Canvas>
    </ErrorBoundary>
  );
}

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export async function generateThumbnailFromUrl(url: string): Promise<Blob> {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  );

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  const gltf = await loader.loadAsync(url);
  return renderThumbnail(gltf.scene);
}

export async function generateThumbnailFromBlob(blob: Blob): Promise<Blob> {
  const url = URL.createObjectURL(blob);
  try {
    return await generateThumbnailFromUrl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function renderThumbnail(object: THREE.Object3D): Promise<Blob> {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);
  scene.add(object);

  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;

  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
  camera.position.set(
    center.x + maxDim * 0.8,
    center.y + maxDim * 0.5,
    center.z + maxDim * 1.5,
  );
  camera.lookAt(center);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(5, 10, 7);
  scene.add(dir);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
  });
  renderer.setSize(256, 256);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.render(scene, camera);

  return new Promise<Blob>((resolve, reject) => {
    renderer.domElement.toBlob((b) => {
      renderer.dispose();
      if (b) {
        resolve(b);
      } else {
        reject(new Error("toBlob returned null"));
      }
    }, "image/png");
  });
}

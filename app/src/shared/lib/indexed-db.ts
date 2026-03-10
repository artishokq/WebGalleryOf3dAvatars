import { get, set, del } from "idb-keyval";

const blobKey = (id: string) => `model-blob-${id}`;
const thumbKey = (id: string) => `model-thumb-${id}`;

export async function saveModelBlob(id: string, blob: Blob): Promise<void> {
  await set(blobKey(id), blob);
}

export async function getModelBlob(id: string): Promise<Blob | undefined> {
  return get<Blob>(blobKey(id));
}

export async function saveThumbnail(id: string, blob: Blob): Promise<void> {
  await set(thumbKey(id), blob);
}

export async function getThumbnail(id: string): Promise<Blob | undefined> {
  return get<Blob>(thumbKey(id));
}

export async function deleteModelData(id: string): Promise<void> {
  await Promise.all([del(blobKey(id)), del(thumbKey(id))]);
}

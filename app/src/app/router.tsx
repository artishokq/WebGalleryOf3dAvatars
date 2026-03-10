import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { GalleryPage } from "@/pages/gallery";
import { EditorPage } from "@/pages/editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <GalleryPage /> },
      { path: "editor/:modelId", element: <EditorPage /> },
    ],
  },
]);

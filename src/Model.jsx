import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Loader, useGLTF } from "@react-three/drei";

const Model = ({ model, modelRef }) => {
  const { scene } = useGLTF(model);
  const copy = useMemo(() => scene.clone(), [scene]);
  return (
    <primitive
      object={copy}
      ref={modelRef}
      scale={model.includes("glb") ? 3 : 1}
    />
  );
};

export default Model;

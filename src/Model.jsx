import React, { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";

const Model = ({ modelControls, modelRef, surroundingControls }) => {
  const { scene } = useGLTF(modelControls.model);
  const copy = useMemo(() => scene.clone(), [scene]);
  if (copy) {
    useFrame((frame, delta) => {
      modelRef.current.rotation.y += delta * modelControls.rotation;
    });
  }
  useEffect(() => {
    copy.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      } else if (obj instanceof MeshStandardMaterial) {
        return (obj.envMapIntensity = surroundingControls.intensity);
      }
    });
  }, []);

  return (
    <primitive
      object={copy}
      ref={modelRef}
      scale={modelControls.model.includes("glb") ? 3 : 1}
    />
  );
};

export default Model;

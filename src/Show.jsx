import React, { useRef, Suspense, useState, useEffect } from "react";
import "./Show.css";
import { OrbitControls, useHelper } from "@react-three/drei";
import { DoubleSide, DirectionalLightHelper } from "three";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Model from "./Model";
import Loading from "./Loading";
import Background from "./Background";
import { useThree } from "@react-three/fiber";

const Show = () => {
  const directionalLight = useRef();

  const modelRef = useRef();

  const { showPerf } = useControls("Performance", {
    showPerf: false,
  });
  const { model } = useControls("model", {
    model: {
      options: [
        "/models/dress.glb",
        "/models/tracksuit.glb",
        "/models/dress.gltf",
        "/models/tracksuit.gltf",
      ],
    },
  });
  const surroundingControls = useControls("surrounding", {
    On: true,
    map: {
      options: [
        "/envMaps/bank_vault_4k.hdr",
        "/envMaps/satara_night_no_lamps_4k.hdr",
        "/envMaps/studio_small_08_4k.hdr",
      ],
    },
    visible: true,
    intensity: {
      value: 1,
      min: 0,
      max: 10,
    },
  });
  const directionalLightControls = useControls("directional light", {
    intensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.001,
    },
    position: {
      value: {
        x: 0,
        y: 1,
        z: 2,
      },
    },
    color: "#fff",
  });
  const ambientLightControls = useControls("ambient light", {
    intensity: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.001,
    },
    color: "#fff",
  });

  useHelper(directionalLight, DirectionalLightHelper, 1);

  return (
    <>
      {showPerf && <Perf position="top-left" />}
      <directionalLight
        ref={directionalLight}
        position={[
          directionalLightControls.position.x,
          directionalLightControls.position.y,
          directionalLightControls.position.z,
        ]}
        shadow-mapSize={[1024, 1024]}
        intensity={directionalLightControls.intensity}
        color={directionalLightControls.color}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <ambientLight
        color={ambientLightControls.color}
        intensity={ambientLightControls.intensity}
      />
      <OrbitControls maxDistance={4} minDistance={0.5} maxAzimuthAngle={3} />
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[5, 5]} children />
        <meshStandardMaterial
          color={0xfadada}
          side={DoubleSide}
          receiveShadow
        />
      </mesh>

      <mesh castShadow position={[0, -1, 0]}>
        <Suspense fallback={<Loading />}>
          <Model
            model={model}
            modelRef={modelRef}
            surroundingControls={surroundingControls}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          {surroundingControls.On && <Background surroundingControls={surroundingControls} />}
        </Suspense>
      </mesh>
    </>
  );
};

export default Show;

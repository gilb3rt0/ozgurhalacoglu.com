import React, { useRef, Suspense, useState, useEffect } from "react";
import "./Show.css";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Model from "./Model";
import Loading from "./Loading";
import Background from "./Background";
const Show = () => {
  const directionalLight = useRef();
  // useHelper(directionalLight, new THREE.DirectionalLightHelper());

  const modelRef = useRef();

  const { showPerf } = useControls("Performance", {
    showPerf: false,
  });
  const { model, envMapIntensity } = useControls("model", {
    model: {
      options: [
        "/models/dress.glb",
        "/models/tracksuit.glb",
        "/models/dress.gltf",
        "/models/tracksuit.gltf",
      ],
    },
    envMapIntensity: {
      value: 1,
      min: 0,
      max: 10,
    },
  });
  const { surrounding } = useControls("surrounding", {
    surrounding: {
      options: [
        "/envMaps/bank_vault_4k.hdr",
        "/envMaps/satara_night_no_lamps_4k.hdr",
        "/envMaps/studio_small_08_4k.hdr",
      ],
    },
  });
  // useEffect(() => {
  //   console.log(modelRef.current.children[0]);
  // }, []);

  return (
    <>
      {showPerf && <Perf position="top-left" />}
      <directionalLight
        ref={directionalLight}
        args={[0, 1, 0]}
        intensity={100}
        castShadow
        M
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />

      <ambientLight color={0xffffff} intensity={0.1} />
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
          <Model model={model} castShadow receiveShadow modelRef={modelRef} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Background surrounding={surrounding} />
        </Suspense>
      </mesh>
    </>
  );
};

/* <mesh position={[0.5, 0.5, 0]}>
  <Html>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "darkgray",
        padding: "1rem",
        borderRadius: "1rem",
        fontFamily: "Helvetica",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: "revert",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>model</h3>
        <select
          onChange={handleModelSelect}
          style={{
            marginLeft: "1rem",
            height: "min-content",
          }}
        >
          {models.map((model, i) => {
            return (
              <option key={i} value={model.path}>
                {model.name}
              </option>
            );
          })}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: "revert",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>surrounding</h3>
        <select
          onChange={handleEnvMapSelect}
          style={{
            marginLeft: "1rem",
            height: "min-content",
          }}
        >
          {envMaps.map((envMap, i) => {
            return (
              <option key={i} value={envMap.file}>
                {envMap.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  </Html>
</mesh> */

export default Show;

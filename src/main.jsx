import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Show from "./Show";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import "./main.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Leva collapsed/>
    <Canvas
      shadows
      camera={{
        position: [0, 0, 3.5],
        fov: 50,
      }}
    >
      <Show />
    </Canvas>
  </StrictMode>
);

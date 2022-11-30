import React from "react";
import { Environment } from "@react-three/drei";
const Background = ({ surroundingControls }) => {
  return <Environment background={surroundingControls.visible} files={surroundingControls.map} />;
};

export default Background;

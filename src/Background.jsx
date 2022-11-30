import React from "react";
import { Environment } from "@react-three/drei";
const Background = ({surrounding}) => {
  return <Environment background={true} files={surrounding} intensity={0.5} />;
};

export default Background;

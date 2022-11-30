import React from "react";
import { Float, Text } from "@react-three/drei";

const Loading = () => {
  return (
    <Float floatIntensity={2}>
      <Text color={"salmon"} position-y={0.5}>loading...</Text>;
    </Float>
  );
};

export default Loading;

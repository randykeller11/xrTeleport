import "./styles.css";
import { Suspense } from "react";
import { VRCanvas, DefaultXRControllers } from "@react-three/xr";
import { useProgress, Html, useGLTF } from "@react-three/drei";

import TeleportTravel from "./TeleportTravel";

function Cube(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshStandardMaterial attach="material" color={"orange"} />
    </mesh>
  );
}

function Floor(props) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeBufferGeometry args={[10, 10]} attach="geometry" />
      <meshStandardMaterial attach="material" color={"white"} />
    </mesh>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "white" }}>
      {progress} % loaded
    </Html>
  );
}

function Model(props) {
  const { scene } = useGLTF("/Pyramidion.glb");
  return <primitive object={scene} {...props} />;
}

export default function App() {
  return (
    <VRCanvas>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.9} />
        <TeleportTravel useNormal={true} Indicator={Cube}>
          <Floor rotation={[-Math.PI / 2, 0, 0]} />
        </TeleportTravel>
        <DefaultXRControllers />
        <Model></Model>
      </Suspense>
    </VRCanvas>
  );
}

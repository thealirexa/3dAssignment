import { Box, OrbitControls, Points } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import { generatePoints } from "./utils";

type IPoint = {
  x: number;
  y: number;
  z: number;
};

function PointCloud({ points }: { points: IPoint[] }) {
  const mesh = useMemo(() => {
    return points.map((point, i) => (
      <Box
        key={i}
        position={[point.x, point.y, point.z]}
        scale={0.08}
        name={"point" + i.toString()}
      />
    ));
  }, [points]);

  return <Points>{mesh}</Points>;
}

function App() {
  const [points, setPoints] = useState<IPoint[]>([]);

  const handleRenderPoints = () => {
    setPoints(generatePoints());
  };

  const handleAddPoint = () => {
    setPoints([{ x: 0, y: 0, z: 0 }]);
  };

  function SetupCamera() {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(0, 0, 35);
      camera.updateProjectionMatrix();
    }, [camera]);

    return null;
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PointCloud points={points} />
        <SetupCamera />
        <OrbitControls />
      </Canvas>
      <div className="my-4 flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRenderPoints}
        >
          Render Points (PCL)
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPoints(generatePoints())}
        >
          Update Points
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddPoint}
        >
          Add Point (Goal)
        </button>
      </div>
    </div>
  );
}

export default App;

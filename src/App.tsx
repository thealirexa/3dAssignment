import { OrbitControls, Point, Points } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { generatePoints } from "./utils";

type IPoint = {
  x: number;
  y: number;
  z: number;
};

function PointCloud({ points }: { points: IPoint[] }) {
  const mesh = useMemo(() => {
    return points.map((point, i) => (
      <Point key={i} position={[point.x, point.y, point.z]} />
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
    setPoints((prevPoints) => [...prevPoints, { x: 0, y: 0, z: 0 }]);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col items-center justify-center">
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PointCloud points={points} />
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

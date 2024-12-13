import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three"; // Import three.js for random generation

const StarBackground = (props) => {
  const ref = useRef();
  
  // Generate random positions using three.js
  const [sphere] = useState(() => {
    const positions = [];
    const radius = 1.2;

    for (let i = 0; i < 5000; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  });

  // Rotate the sphere for a dynamic effect
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3} // Controls how the data is read (spacing between coordinates)
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const App = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="text-primary mb-4">Star Background</h1>
      <div className="border border-primary rounded p-3" style={{ height: "80vh", position: "relative" }}>
        <Canvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1, // Put the stars behind other elements
          }}
        >
          <StarBackground />
        </Canvas>
        
        {/* Additional content can be placed here */}
        <div style={{ position: 'absolute', zIndex: -1, top: '10%', left: '50%', transform: 'translateX(-50%)' }}>
          <h2 className="text-white">Starry Night Experience</h2>
          <p className="text-white">Enjoy the stars while exploring the universe!</p>
        </div>
      </div>
    </div>
  );
  
};

export default App;

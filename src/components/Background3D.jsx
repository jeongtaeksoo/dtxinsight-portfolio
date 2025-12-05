import React from 'react';
import { Canvas } from '@react-three/fiber';
import NeuralNetwork from './NeuralNetwork';

export default function Background3D() {
    return (
        <div className="fixed inset-0 z-0 bg-background pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <NeuralNetwork />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
        </div>
    );
}

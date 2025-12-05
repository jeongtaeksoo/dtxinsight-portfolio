import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 150;
const CONNECTION_DISTANCE = 3; // Max distance to draw a line
const MOUSE_INFLUENCE = 0.5;

function NeuralNetwork() {
    const meshRef = useRef();
    const linesRef = useRef();

    // Generate random particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            temp.push({ position: new THREE.Vector3(x, y, z), velocity });
        }
        return temp;
    }, []);

    // Frame loop for animation
    useFrame((state) => {
        // 1. Update particle positions
        particles.forEach((p) => {
            p.position.add(p.velocity);

            // Boundary bounce (simple box)
            if (Math.abs(p.position.x) > 10) p.velocity.x *= -1;
            if (Math.abs(p.position.y) > 10) p.velocity.y *= -1;
            if (Math.abs(p.position.z) > 5) p.velocity.z *= -1;
        });

        // 2. Update InstancedMesh (Nodes)
        if (meshRef.current) {
            const dummy = new THREE.Object3D();
            particles.forEach((p, i) => {
                dummy.position.copy(p.position);

                // Mouse parallax influence
                const mouseX = (state.mouse.x * MOUSE_INFLUENCE);
                const mouseY = (state.mouse.y * MOUSE_INFLUENCE);
                dummy.position.x += mouseX;
                dummy.position.y += mouseY;

                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }

        // 3. Update Lines
        if (linesRef.current) {
            const positions = [];
            const mouseX = (state.mouse.x * MOUSE_INFLUENCE);
            const mouseY = (state.mouse.y * MOUSE_INFLUENCE);

            // Compare every pair (O(N^2) but N is small)
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const p1 = particles[i].position.clone();
                    const p2 = particles[j].position.clone();

                    // Apply same parallax to check distance correctly visually
                    p1.x += mouseX; p1.y += mouseY;
                    p2.x += mouseX; p2.y += mouseY;

                    const dist = p1.distanceTo(p2);

                    if (dist < CONNECTION_DISTANCE) {
                        positions.push(p1.x, p1.y, p1.z);
                        positions.push(p2.x, p2.y, p2.z);
                    }
                }
            }
            linesRef.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(positions, 3)
            );
        }
    });

    return (
        <group>
            {/* Nodes */}
            <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color="#7C3AED" transparent opacity={0.8} />
            </instancedMesh>

            {/* Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#2DD4BF" transparent opacity={0.15} linewidth={1} />
            </lineSegments>
        </group>
    );
}

export default NeuralNetwork;

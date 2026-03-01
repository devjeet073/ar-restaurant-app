import React, { useEffect, useRef } from 'react';
import { useModel3D } from '../../hooks/useModel3D';
import * as THREE from 'three';

interface Model3DProps {
  modelId: string;
  modelFilePath: string;
  scale?: number;
  position?: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  onLoaded?: (model: THREE.Group) => void;
  onError?: (error: Error) => void;
}

export const Model3D: React.FC<Model3DProps> = ({
  modelId,
  modelFilePath,
  scale = 1,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  onLoaded,
  onError,
}) => {
  const { model, error } = useModel3D(modelId, modelFilePath);
  const containerRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (model && containerRef.current) {
      // Clear previous children
      while (containerRef.current.children.length > 0) {
        containerRef.current.remove(containerRef.current.children[0]);
      }

      // Clone the model to avoid reusing the same instance
      const clonedModel = model.clone();

      // Apply transformations
      clonedModel.scale.set(scale, scale, scale);
      clonedModel.position.set(position.x, position.y, position.z);
      clonedModel.rotation.set(rotation.x, rotation.y, rotation.z);

      // Add to container
      containerRef.current.add(clonedModel);

      // Callback
      if (onLoaded) {
        onLoaded(clonedModel as THREE.Group);
      }
    }
  }, [model, scale, position, rotation, onLoaded]);

  // Handle errors
  useEffect(() => {
    if (error && onError) {
      onError(new Error(error));
    }
  }, [error, onError]);

  // Return as a group that can be used in Three.js scene
  return <group ref={containerRef} />;
};

export default Model3D;

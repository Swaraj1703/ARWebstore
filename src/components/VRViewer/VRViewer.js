import React, { useState } from 'react';
import './VRViewer.css';

const VRViewer = ({ wishlist }) => {
  const [placedModels, setPlacedModels] = useState([]); // Stores models placed in AR

  // Function to add a model at the tapped location
  const handleSceneClick = (event) => {
    // Get screen coordinates from the click event
    const x = event.detail.intersection.point.x;
    const y = event.detail.intersection.point.y;
    const z = event.detail.intersection.point.z;

    // Place the first model in wishlist (or any you choose)
    const newModel = {
      id: placedModels.length,
      modelSrc: wishlist[0].modelSrc, // You could let users choose the model dynamically
      position: `${x} ${y} ${z}`,
    };

    setPlacedModels([...placedModels, newModel]); // Add new model to placedModels array
  };

  return (
    <a-scene
      vr-mode-ui="enabled: false"
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false;"
      onClick={handleSceneClick} // Attach click handler for placing models
    >
      <a-camera gps-camera rotation-reader></a-camera>

      {/* Render each placed model */}
      {placedModels.map((model) => (
        <a-entity
          key={model.id}
          gltf-model={model.modelSrc}
          position={model.position}
          rotation="0 180 0"
          scale="0.5 0.5 0.5"
        ></a-entity>
      ))}
    </a-scene>
  );
};

export default VRViewer;

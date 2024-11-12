import React from 'react';
// Ensure this is globally available from the CDN in index.html
import "./VRViewer.css";

const VRViewer = ({ wishlist }) => {
  // Helper function to generate a random position within a range
  const getRandomPosition = () => {
    const x = (Math.random() - 0.5) * 4;  // Random x position between -2 and 2 meters
    const z = -3 - Math.random() * 2;     // Random z position between -3 and -5 meters
    return `${x} 0 ${z}`;                 // Y position set to 0 for ground level
  };

  return (
    <a-scene
      vr-mode-ui="enabled: false"                  // Disable VR UI since we only want AR
      embedded                                     // Embed scene in the page
      arjs="sourceType: webcam; debugUIEnabled: false;" // Use the camera for AR
    >
      <a-camera gps-camera rotation-reader></a-camera>

      {/* Render each wishlist item in AR with a randomized initial position */}
      {wishlist.map((item, idx) => (
        <a-entity
          key={idx}
          gltf-model={item.modelSrc}                // Model source
          position={getRandomPosition()}            // Random position to avoid overlap
          rotation="0 180 0"                        // Rotate to face the camera
          scale="0.5 0.5 0.5"                       // Scale model for optimal size
        ></a-entity>
      ))}
    </a-scene>
  );
};

export default VRViewer;

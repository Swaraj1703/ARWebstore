import React from "react";
import "./VRViewer.css";

const VRViewer = ({ wishlist }) => {
  return (
    <div className="vr-viewer">
      <h2>View Your Wishlist in AR</h2>
      <div className="vr-items">
        {wishlist.map((item, idx) => (
          <model-viewer
            key={idx}
            src={item.modelSrc}
            ios-src={item.iOSSrc} // For iOS users, ensure .usdz format is available
            alt={item.name}
            ar
            ar-modes="scene-viewer webxr quick-look" // Enables AR in browsers
            camera-controls
            auto-rotate
            style={{ width: "100%", height: "400px", margin: "20px 0" }}
          ></model-viewer>
        ))}
      </div>
    </div>
  );
};

export default VRViewer;

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import './VRViewer.css';

const VRViewer = ({ wishlist }) => {
  const containerRef = useRef();
  const renderer = useRef();
  const scene = useRef();
  const camera = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const [placedModels, setPlacedModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(wishlist[0]?.modelSrc);
  const [instructionsVisible, setInstructionsVisible] = useState(true);

  useEffect(() => {
    // Initialize renderer with WebXR
    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.xr.enabled = true;
    containerRef.current.appendChild(renderer.current.domElement);
    containerRef.current.appendChild(ARButton.createButton(renderer.current));

    // Set up scene and camera
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    scene.current.add(camera.current);

    // Add lighting to the scene
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.current.add(light);

    // Animation loop for rendering the scene
    renderer.current.setAnimationLoop(() => {
      renderer.current.render(scene.current, camera.current);
    });

    return () => {
      renderer.current.dispose();
    };
  }, []);

  // Function to load a model at a specified position
  const loadModel = (modelSrc, position) => {
    const loader = new GLTFLoader();
    loader.load(
      modelSrc,
      (gltf) => {
        gltf.scene.position.copy(position);
        gltf.scene.scale.set(0.5, 0.5, 0.5); // Adjust model size as needed
        scene.current.add(gltf.scene);

        // Add transform controls for manipulation
        const controls = new TransformControls(camera.current, renderer.current.domElement);
        controls.attach(gltf.scene);
        controls.setMode('rotate'); // Start with rotate mode; users can toggle to translate or scale if desired
        scene.current.add(controls);

        setPlacedModels((prev) => [...prev, gltf.scene]);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  };

  // Handle tap to place model at tapped location
  const handleTouch = (event) => {
    if (!selectedModel) return;

    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera.current);
    const intersects = raycaster.current.intersectObjects(scene.current.children, true);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      loadModel(selectedModel, point);
      setInstructionsVisible(false); // Hide instructions after the first model is placed
    }
  };

  // Attach event listener for touch
  useEffect(() => {
    renderer.current.domElement.addEventListener('click', handleTouch);
    return () => {
      renderer.current.domElement.removeEventListener('click', handleTouch);
    };
  }, [selectedModel]);

  // Reset function to clear all placed models
  const handleReset = () => {
    placedModels.forEach((model) => scene.current.remove(model));
    setPlacedModels([]);
    setInstructionsVisible(true); // Show instructions again after reset
  };

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {instructionsVisible && (
        <div className="instructions">
          <p>Tap to place models. Use controls to rotate, scale, and position.</p>
        </div>
      )}

      {/* Dropdown to select model */}
      <div className="model-selector">
        <label>Select Model: </label>
        <select onChange={(e) => setSelectedModel(e.target.value)} value={selectedModel}>
          {wishlist.map((item) => (
            <option key={item.id} value={item.modelSrc}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button className="reset-button" onClick={handleReset}>
        Reset Scene
      </button>
    </div>
  );
};

export default VRViewer;

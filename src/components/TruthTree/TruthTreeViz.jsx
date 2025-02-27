import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

const TruthTreeViz = ({ data, onNodeClick }) => {
  const mountRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  
  useEffect(() => {
    // Scene setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0ee);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    
    // Light setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Truth Tree Node Creation
    const nodeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const defaultMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xaaaaaa,
      emissiveIntensity: 0.2
    });
    
    const highlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 0.5
    });
    
    // Position nodes in a hexagonal pattern (like in the mockup)
    const nodeObjects = {};
    const nodePositions = {};
    
    // Calculate node positions in a hexagonal pattern
    const calculateHexPosition = (index, totalNodes) => {
      const centerNode = { x: 0, y: 0, z: 0 };
      
      if (index === 0) return centerNode;
      
      // For simplicity, arrange in a hexagonal pattern
      const layers = 2; // Concentric hexagonal layers
      let currentLayer = 1;
      let nodesInCurrentLayer = 6; // First layer has 6 nodes
      let layerIndex = index - 1; // Adjust for center node
      
      while (layerIndex >= nodesInCurrentLayer) {
        layerIndex -= nodesInCurrentLayer;
        currentLayer++;
        nodesInCurrentLayer = currentLayer * 6; // Each layer has 6*layer nodes
      }
      
      const angleStep = (2 * Math.PI) / (currentLayer * 6);
      const angle = layerIndex * angleStep;
      const radius = currentLayer * 2.5; // Distance between layers
      
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: 0
      };
    };
    
    // Create nodes
    data.nodes.forEach((node, index) => {
      const nodeMesh = new THREE.Mesh(nodeGeometry, defaultMaterial.clone());
      const position = calculateHexPosition(index, data.nodes.length);
      
      nodeMesh.position.set(position.x, position.y, position.z);
      nodePositions[node.id] = position;
      nodeObjects[node.id] = nodeMesh;
      scene.add(nodeMesh);
      
      // Add pulsing effect to nodes
      const pulseSpeed = 0.5 + Math.random() * 0.5; // Random speed
      const pulseDelay = Math.random() * 2; // Random delay
      
      nodeMesh.userData = {
        id: node.id,
        title: node.title,
        pulseSpeed,
        pulseDelay,
        originalScale: { x: 1, y: 1, z: 1 },
        time: 0
      };
    });
    
    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.7
    });
    
    data.links.forEach(link => {
      const sourcePos = nodePositions[link.source];
      const targetPos = nodePositions[link.target];
      
      if (sourcePos && targetPos) {
        const points = [
          new THREE.Vector3(sourcePos.x, sourcePos.y, sourcePos.z),
          new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z)
        ];
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        scene.add(line);
      }
    });
    
    // Raycaster for node interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(Object.values(nodeObjects));
      
      if (intersects.length > 0) {
        const intersectedNode = intersects[0].object;
        const nodeId = intersectedNode.userData.id;
        
        if (hoveredNode !== nodeId) {
          // Reset previous hovered node
          if (hoveredNode && nodeObjects[hoveredNode]) {
            nodeObjects[hoveredNode].material = defaultMaterial.clone();
          }
          
          // Set new hovered node
          intersectedNode.material = highlightMaterial.clone();
          setHoveredNode(nodeId);
          
          // Scale animation
          new TWEEN.Tween(intersectedNode.scale)
            .to({ x: 1.3, y: 1.3, z: 1.3 }, 200)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
      } else if (hoveredNode) {
        // Reset hovered node when not hovering over any node
        if (nodeObjects[hoveredNode]) {
          nodeObjects[hoveredNode].material = defaultMaterial.clone();
          
          // Scale back animation
          new TWEEN.Tween(nodeObjects[hoveredNode].scale)
            .to({ x: 1, y: 1, z: 1 }, 200)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
        setHoveredNode(null);
      }
    };
    
    const handleClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(Object.values(nodeObjects));
      
      if (intersects.length > 0) {
        const intersectedNode = intersects[0].object;
        const nodeId = intersectedNode.userData.id;
        const node = data.nodes.find(n => n.id === nodeId);
        
        if (node && onNodeClick) {
          onNodeClick(node);
        }
      }
    };
    
    // Attach event listeners
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      // Update nodes (pulsing effect)
      Object.values(nodeObjects).forEach(nodeMesh => {
        nodeMesh.userData.time += delta;
        
        if (nodeMesh.userData.time > nodeMesh.userData.pulseDelay) {
          const pulseTime = nodeMesh.userData.time - nodeMesh.userData.pulseDelay;
          const pulseFactor = 0.1 * Math.sin(pulseTime * nodeMesh.userData.pulseSpeed) + 1;
          
          if (nodeMesh !== nodeObjects[hoveredNode]) {
            nodeMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);
          }
        }
      });
      
      TWEEN.update();
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      
      // Dispose resources
      Object.values(nodeObjects).forEach(nodeMesh => {
        nodeMesh.geometry.dispose();
        nodeMesh.material.dispose();
      });
    };
  }, [data, onNodeClick]);
  
  return (
    <div className="truth-tree-container" ref={mountRef} style={{ width: '100%', height: '100%' }}>
      {/* The Three.js canvas will be mounted here */}
      
      {/* Node tooltip */}
      {hoveredNode && (
        <div 
          className="node-tooltip"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h4>{data.nodes.find(n => n.id === hoveredNode)?.title}</h4>
          <p>{data.nodes.find(n => n.id === hoveredNode)?.description}</p>
        </div>
      )}
    </div>
  );
};

export default TruthTreeViz;
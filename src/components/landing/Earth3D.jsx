import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Radio, Crosshair, Satellite, ShieldAlert } from 'lucide-react';

export default function Earth3D({ onSelectHotspot }) {
  const mountRef = useRef(null);
  const [activePin, setActivePin] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Procedural High-Res Earth Texture Generation via Offscreen Canvas
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Deep Ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#040d15');
      oceanGrad.addColorStop(0.5, '#071f30');
      oceanGrad.addColorStop(1, '#040e17');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fine coordinate grid lines
      ctx.strokeStyle = 'rgba(32, 217, 208, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw stylized world landmasses
      ctx.fillStyle = '#0f3a4d';
      ctx.strokeStyle = '#20d9d0';
      ctx.lineWidth = 1.5;

      const continents = [
        // North America
        [[200, 180], [350, 150], [420, 220], [380, 360], [310, 420], [240, 380], [180, 260]],
        // South America
        [[330, 470], [420, 490], [450, 600], [380, 780], [340, 820], [310, 600]],
        // Eurasia
        [[520, 160], [800, 140], [1100, 180], [1050, 380], [920, 460], [750, 440], [600, 360], [540, 240]],
        // Africa
        [[530, 400], [680, 390], [730, 520], [680, 720], [600, 780], [540, 580]],
        // Australia
        [[1000, 600], [1150, 580], [1200, 700], [1080, 760], [980, 700]]
      ];

      continents.forEach(poly => {
        ctx.beginPath();
        ctx.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) {
          ctx.lineTo(poly[i][0], poly[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Subtle topographic and water body specks
      ctx.fillStyle = '#20d9d0';
      for (let i = 0; i < 150; i++) {
        const rx = Math.random() * canvas.width;
        const ry = Math.random() * canvas.height;
        ctx.beginPath();
        ctx.arc(rx, ry, Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // Procedural Cloud Texture
    const createCloudTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(237, 248, 250, 0.25)';
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 40 + 10;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(237, 248, 250, 0.4)');
        grad.addColorStop(1, 'rgba(237, 248, 250, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      return new THREE.CanvasTexture(canvas);
    };

    // Earth Sphere
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      bumpScale: 0.05,
      specular: new THREE.Color('#319BFF'),
      shininess: 15,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Cloud Layer
    const cloudGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: createCloudTexture(),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Atmospheric Fresnel Glow Shield
    const atmosphereGeometry = new THREE.SphereGeometry(1.15, 48, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.12, 0.85, 0.81, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Orbital Satellite Rings
    const orbitRadius = 1.45;
    const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.005, orbitRadius + 0.005, 128);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x20D9D0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI * 0.4;
    orbitRing.rotation.y = Math.PI * 0.15;
    scene.add(orbitRing);

    // Second inclined polar orbit
    const polarOrbitGeom = new THREE.RingGeometry(1.52 - 0.004, 1.52 + 0.004, 128);
    const polarOrbitMat = new THREE.MeshBasicMaterial({
      color: 0x319BFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const polarRing = new THREE.Mesh(polarOrbitGeom, polarOrbitMat);
    polarRing.rotation.x = Math.PI * 0.85;
    polarRing.rotation.y = -Math.PI * 0.25;
    scene.add(polarRing);

    // Traveling Satellite Sentinel Mesh
    const satelliteGroup = new THREE.Group();
    const satBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.03, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 })
    );
    const satPanelL = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.002, 0.03),
      new THREE.MeshStandardMaterial({ color: 0x319BFF, roughness: 0.3 })
    );
    satPanelL.position.x = -0.06;
    const satPanelR = satPanelL.clone();
    satPanelR.position.x = 0.06;

    satelliteGroup.add(satBody, satPanelL, satPanelR);
    scene.add(satelliteGroup);

    // Glowing Observation Hotspots placed on sphere
    const hotspots = [
      { name: "Emerald Basin Reservoir", lat: 37.77, lon: -122.41, color: 0xFF5D65, id: "WB-06", status: "CRITICAL" },
      { name: "Bellandur Catchment", lat: 12.93, lon: 77.67, color: 0xFF5D65, id: "WB-01", status: "CRITICAL" },
      { name: "Lake Mead", lat: 36.01, lon: -114.74, color: 0xFFB84D, id: "WB-02", status: "ELEVATED" },
      { name: "Lake Erie", lat: 41.75, lon: -82.95, color: 0xFF5D65, id: "WB-03", status: "CRITICAL" },
      { name: "Salton Sea", lat: 33.40, lon: -115.90, color: 0xFFB84D, id: "WB-04", status: "MODERATE" },
      { name: "Lake Victoria", lat: -0.10, lon: 34.75, color: 0x36D69A, id: "WB-05", status: "ACTIVE" }
    ];

    const hotspotGroup = new THREE.Group();
    hotspots.forEach(item => {
      const phi = (90 - item.lat) * (Math.PI / 180);
      const theta = (item.lon + 180) * (Math.PI / 180);

      const r = 1.015;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = (r * Math.sin(phi) * Math.sin(theta));
      const y = (r * Math.cos(phi));

      const pinGeom = new THREE.SphereGeometry(0.022, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: item.color });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.set(x, y, z);
      pin.userData = item;

      // Pulsing wave ring around pin
      const ringGeom = new THREE.RingGeometry(0.025, 0.045, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const wave = new THREE.Mesh(ringGeom, ringMat);
      wave.position.set(x, y, z);
      wave.lookAt(x * 2, y * 2, z * 2);

      hotspotGroup.add(pin);
      hotspotGroup.add(wave);
    });
    earth.add(hotspotGroup);

    // Deep Space Background Particle Stars
    const starsGeom = new THREE.BufferGeometry();
    const starCount = 600;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 20;
      starCoords[i + 1] = (Math.random() - 0.5) * 20;
      starCoords[i + 2] = -Math.random() * 10 - 2;
    }
    starsGeom.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0x91A8B5, size: 0.02, transparent: true, opacity: 0.5 });
    const starField = new THREE.Points(starsGeom, starsMat);
    scene.add(starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x061e2d, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xedf8fa, 2.8);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x20d9d0, 1.2);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      earth.rotation.y += deltaX * 0.005;
      earth.rotation.x += deltaY * 0.005;
      clouds.rotation.y += deltaX * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    currentMount.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow realistic earth rotation
      if (!isDragging) {
        earth.rotation.y += 0.0012;
        clouds.rotation.y += 0.0016;
      }

      // Satellite position along inclined orbit
      const satAngle = elapsedTime * 0.35;
      const satX = Math.cos(satAngle) * orbitRadius;
      const satZ = Math.sin(satAngle) * orbitRadius;
      
      // Calculate satellite orientation in orbit plane
      satelliteGroup.position.set(satX, 0, satZ);
      satelliteGroup.rotation.x = Math.PI * 0.4;
      satelliteGroup.rotation.y = Math.PI * 0.15;
      satelliteGroup.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI * 0.4);

      // Renderer render
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[640px] md:h-[750px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Futuristic Orbit Scan Overlay Ring */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[420px] h-[420px] md:w-[580px] md:h-[580px] rounded-full border border-aqua/20 border-dashed animate-spin" style={{ animationDuration: '45s' }} />
        <div className="absolute w-[490px] h-[490px] md:w-[670px] md:h-[670px] rounded-full border border-electric/15" />
      </div>

      {/* Atmospheric Horizon Light Rays */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-aqua/10 via-electric/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Real-Time Satellite Telemetry HUD Badge */}
      <div className="absolute top-6 left-6 md:left-12 glass-panel p-3.5 rounded-lg border-aqua/30 shadow-glass-panel max-w-xs text-xs space-y-1.5 backdrop-blur-md pointer-events-auto">
        <div className="flex items-center justify-between text-aqua">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-aqua animate-ping" />
            <span className="font-mono font-semibold tracking-wider">SENTINEL-2 CONSTELLATION</span>
          </div>
          <Satellite className="w-4 h-4 text-aqua" />
        </div>
        <div className="text-[11px] text-text-secondary font-mono flex justify-between">
          <span>ORBITAL SPEED:</span>
          <span className="text-white font-medium">7.48 km/s</span>
        </div>
        <div className="text-[11px] text-text-secondary font-mono flex justify-between">
          <span>ALTITUDE:</span>
          <span className="text-white font-medium">786 km (SSO)</span>
        </div>
        <div className="text-[11px] text-text-secondary font-mono flex justify-between">
          <span>BAND CHANNELS:</span>
          <span className="text-aqua font-medium">13 MSI Channels</span>
        </div>
        <div className="pt-1 border-t border-ocean-700/60 flex items-center gap-1.5 text-[10px] text-emerald-accent font-mono">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>SYNCHRONIZED WITH ESA COPERNICUS HUB</span>
        </div>
      </div>

      {/* Floating Active Anomaly Counter Card on Right */}
      <div className="absolute bottom-8 right-6 md:right-12 glass-panel p-4 rounded-xl border-coral-alert/30 shadow-glow-coral/20 max-w-xs pointer-events-auto">
        <div className="flex items-center gap-2.5 text-coral-alert mb-2">
          <ShieldAlert className="w-5 h-5 animate-pulse" />
          <span className="font-display font-semibold text-sm">SURFACE ANOMALIES ACTIVE</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed mb-3">
          18 remote spectral divergences detected across monitored catchments. Field verification priority issued for 7 sites.
        </p>
        <div className="flex items-center justify-between text-[11px] font-mono text-text-dim border-t border-ocean-700/70 pt-2">
          <span>CLICK & DRAG TO ROTATE GLOBE</span>
          <Crosshair className="w-3.5 h-3.5 text-aqua" />
        </div>
      </div>

      {/* Floating Interactive Observation Chips */}
      <div className="absolute bottom-6 left-6 md:left-12 flex flex-wrap gap-2 max-w-md pointer-events-auto">
        <div className="text-[10px] font-mono bg-navy-900/80 px-2.5 py-1 rounded border border-aqua/30 text-aqua flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-coral-alert" />
          Emerald Basin [Demo Focus]
        </div>
        <div className="text-[10px] font-mono bg-navy-900/80 px-2.5 py-1 rounded border border-ocean-600 text-text-secondary flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-coral-alert" />
          Bellandur Lake (Surfactant)
        </div>
        <div className="text-[10px] font-mono bg-navy-900/80 px-2.5 py-1 rounded border border-ocean-600 text-text-secondary flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-warning" />
          Lake Mead (Sediment)
        </div>
      </div>
    </div>
  );
}

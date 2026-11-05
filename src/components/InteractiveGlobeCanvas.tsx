import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Key administrative centers and municipalities in Bosnia and Herzegovina with lat/lon
const BIH_MUNICIPALITIES = [
  { name: 'Sarajevo', lat: 43.8563, lon: 18.4131, type: 'Glavni grad / Federalni centar', color: 0xf59e0b, priority: 1 },
  { name: 'Banja Luka', lat: 44.7722, lon: 17.191, type: 'Administrativni centar RS', color: 0xf59e0b, priority: 1 },
  { name: 'Mostar', lat: 43.3438, lon: 17.8078, type: 'HNK / Gradsko vijeće', color: 0x5df0a8, priority: 2 },
  { name: 'Tuzla', lat: 44.5385, lon: 18.6671, type: 'TK / Gradska uprava', color: 0x5df0a8, priority: 2 },
  { name: 'Zenica', lat: 44.2017, lon: 17.904, type: 'ZDK / Gradska uprava', color: 0x5df0a8, priority: 2 },
  { name: 'Bihać', lat: 44.8169, lon: 15.8708, type: 'USK / Gradska uprava', color: 0x5df0a8, priority: 2 },
  { name: 'Brčko', lat: 44.8728, lon: 18.8108, type: 'Brčko Distrikt BiH', color: 0xf59e0b, priority: 1 },
  { name: 'Bijeljina', lat: 44.757, lon: 19.2144, type: 'Semberija / Grad', color: 0x5df0a8, priority: 3 },
  { name: 'Trebinje', lat: 42.712, lon: 18.344, type: 'Hercegovina / Grad', color: 0x5df0a8, priority: 3 },
  { name: 'Goražde', lat: 43.6677, lon: 18.9757, type: 'BPK / Gradsko vijeće', color: 0x5df0a8, priority: 3 },
  { name: 'Doboj', lat: 44.7327, lon: 18.087, type: 'Regija Doboj', color: 0x5df0a8, priority: 3 },
  { name: 'Travnik', lat: 44.2264, lon: 17.6658, type: 'SBK / Srednja Bosna', color: 0x5df0a8, priority: 3 },
  { name: 'Gračanica', lat: 44.7042, lon: 18.3103, type: 'Općina Gračanica', color: 0x5df0a8, priority: 3 },
  { name: 'Olovo', lat: 44.1292, lon: 18.5819, type: 'Općina Olovo', color: 0x5df0a8, priority: 3 },
  { name: 'Konjic', lat: 43.6514, lon: 17.9608, type: 'Grad Konjic', color: 0x5df0a8, priority: 3 },
];

/** Convert geographic lat/lon to 3D Cartesian coordinates on a sphere */
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/** Generate procedural high-detail 2D texture for Earth continents with deep space dark palette */
function createEarthDayTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#020512');
  oceanGrad.addColorStop(0.5, '#040b1e');
  oceanGrad.addColorStop(1, '#020512');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle longitude & latitude coordinate grid
  ctx.strokeStyle = 'rgba(93, 240, 168, 0.04)';
  ctx.lineWidth = 1;
  for (let lon = 0; lon <= canvas.width; lon += canvas.width / 24) {
    ctx.beginPath();
    ctx.moveTo(lon, 0);
    ctx.lineTo(lon, canvas.height);
    ctx.stroke();
  }
  for (let lat = 0; lat <= canvas.height; lat += canvas.height / 12) {
    ctx.beginPath();
    ctx.moveTo(0, lat);
    ctx.lineTo(canvas.width, lat);
    ctx.stroke();
  }

  // Draw procedural continental landmasses with dark obsidian/slate tint
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = 'rgba(93, 240, 168, 0.25)';
  ctx.lineWidth = 1.5;

  function toX(lonDeg: number) {
    return ((lonDeg + 180) / 360) * canvas.width;
  }
  function toY(latDeg: number) {
    return ((90 - latDeg) / 180) * canvas.height;
  }

  // Helper to draw smoothed land polygon
  function drawLandmass(points: [number, number][], fill = '#111e3b', stroke = 'rgba(93, 240, 168, 0.2)') {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(toX(points[0][1]), toY(points[0][0]));
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(toX(points[i][1]), toY(points[i][0]));
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }

  // Europe & Mediterranean Basin
  drawLandmass([
    [70, 25], [71, 28], [60, 30], [55, 37], [45, 40], [40, 26], [36, 28], [37, 22],
    [36, 14], [36, -5], [43, -9], [47, -2], [50, 1], [54, 8], [58, 12], [65, 14], [70, 25]
  ], '#162038', 'rgba(93, 240, 168, 0.35)');

  // Balkan Peninsula & Bosnia Region (Enhanced detail and mint outline)
  drawLandmass([
    [46.5, 14.5], [46.8, 16.5], [45.5, 19.5], [44.8, 20.5], [42.0, 21.0], [40.5, 20.0],
    [39.5, 21.5], [38.0, 23.5], [36.5, 22.5], [38.5, 20.5], [42.0, 18.5], [43.5, 16.0],
    [45.0, 14.0], [46.5, 14.5]
  ], '#1a2745', 'rgba(93, 240, 168, 0.7)');

  // Africa
  drawLandmass([
    [36, 10], [31, 32], [12, 44], [0, 42], [-10, 40], [-25, 33], [-34, 26], [-34, 18],
    [-20, 12], [-5, 8], [4, 9], [5, 2], [5, -4], [15, -17], [28, -13], [35, -6], [36, 10]
  ], '#0e182e', 'rgba(93, 240, 168, 0.15)');

  // Asia / Eurasia
  drawLandmass([
    [70, 60], [75, 100], [70, 140], [60, 170], [45, 145], [35, 120], [22, 115],
    [10, 105], [5, 100], [15, 80], [25, 60], [30, 48], [40, 45], [50, 50], [65, 55], [70, 60]
  ], '#0d1629', 'rgba(93, 240, 168, 0.15)');

  // Americas
  drawLandmass([
    [70, -160], [72, -120], [55, -80], [45, -65], [30, -80], [25, -90], [15, -90],
    [8, -78], [10, -60], [-5, -35], [-20, -40], [-50, -70], [-55, -65], [-40, -73],
    [-15, -75], [5, -78], [20, -105], [35, -120], [50, -125], [65, -165], [70, -160]
  ], '#0c1527', 'rgba(93, 240, 168, 0.15)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Generate procedural nighttime city lights texture with concentrated golden/amber specks */
function createNightLightsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  function toX(lonDeg: number) {
    return ((lonDeg + 180) / 360) * canvas.width;
  }
  function toY(latDeg: number) {
    return ((90 - latDeg) / 180) * canvas.height;
  }

  // Scatter regional urban glow in Europe
  const clusters = [
    { lat: 48.8, lon: 2.3, r: 18, color: '#fef08a' }, // Paris
    { lat: 51.5, lon: -0.1, r: 18, color: '#fef08a' }, // London
    { lat: 52.5, lon: 13.4, r: 16, color: '#fef08a' }, // Berlin
    { lat: 41.9, lon: 12.5, r: 16, color: '#fde047' }, // Rome
    { lat: 48.2, lon: 16.3, r: 14, color: '#fde047' }, // Vienna
    { lat: 44.8, lon: 20.4, r: 14, color: '#f59e0b' }, // Belgrade
    { lat: 45.8, lon: 15.9, r: 13, color: '#f59e0b' }, // Zagreb
  ];

  // Specific high-intensity BiH nodes
  BIH_MUNICIPALITIES.forEach((m) => {
    clusters.push({
      lat: m.lat,
      lon: m.lon,
      r: m.priority === 1 ? 16 : 10,
      color: '#5df0a8',
    });
  });

  clusters.forEach((c) => {
    const x = toX(c.lon);
    const y = toY(c.lat);
    const rad = ctx.createRadialGradient(x, y, 1, x, y, c.r);
    rad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    rad.addColorStop(0.3, c.color);
    rad.addColorStop(0.8, 'rgba(93, 240, 168, 0.35)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(x, y, c.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ambient web of small town lights across the Balkans
  for (let i = 0; i < 400; i++) {
    const lat = 40 + Math.random() * 12;
    const lon = 12 + Math.random() * 16;
    const x = toX(lon);
    const y = toY(lat);
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(253, 224, 71, 0.7)' : 'rgba(93, 240, 168, 0.6)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Generate procedural cloud layer texture with smooth drifting density */
function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 180; i++) {
    const x = Math.random() * canvas.width;
    const y = 80 + Math.random() * (canvas.height - 160);
    const r = 25 + Math.random() * 60;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    grad.addColorStop(0.5, 'rgba(210, 235, 255, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const InteractiveGlobeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported on this device. Globe disabled.');
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Main Globe Group
    const globeRadius = 1.5;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Initial rotation: center on the Balkans (Lat ~44°, Lon ~18°)
    // Three sphere geometry coordinates orientation
    globeGroup.rotation.y = -Math.PI * 0.42;
    globeGroup.rotation.x = 0.35;

    // 1. Earth Base Mesh
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const dayTexture = createEarthDayTexture();
    const nightTexture = createNightLightsTexture();

    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 1.25,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 2. Drifting Cloud Layer Mesh
    const cloudGeo = new THREE.SphereGeometry(globeRadius * 1.018, 48, 48);
    const cloudTexture = createCloudTexture();
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(cloudMesh);

    // 3. Atmospheric Rim Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.14, 48, 48);
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float intensity = pow(0.72 - dot(vNormal, viewDir), 2.2);
          vec3 atmosphereColor = mix(vec3(0.04, 0.45, 0.8), vec3(0.36, 0.94, 0.66), 0.6);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.75);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 4. Golden Radar Ping Markers for BiH Municipalities & Administrative Centers
    const pingRings: { mesh: THREE.Mesh; initialScale: number; speed: number; maxScale: number }[] = [];
    const markerGroup = new THREE.Group();
    globeGroup.add(markerGroup);

    const pinCoreGeo = new THREE.SphereGeometry(0.016, 16, 16);
    const ringGeo = new THREE.RingGeometry(0.02, 0.038, 32);

    BIH_MUNICIPALITIES.forEach((m, idx) => {
      const pos = latLonToVector3(m.lat, m.lon, globeRadius * 1.006);

      // Core glowing golden pin
      const pinMat = new THREE.MeshBasicMaterial({
        color: m.color,
        transparent: true,
        opacity: 0.95,
      });
      const pinMesh = new THREE.Mesh(pinCoreGeo, pinMat);
      pinMesh.position.copy(pos);
      markerGroup.add(pinMesh);

      // Vertical radial beam/antenna
      const beamGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.08, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: m.color,
        transparent: true,
        opacity: 0.65,
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      const normal = pos.clone().normalize();
      beamMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.04)));
      beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      markerGroup.add(beamMesh);

      // Expanding radar wave ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.002)));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      markerGroup.add(ringMesh);

      pingRings.push({
        mesh: ringMesh,
        initialScale: 1.0 + (idx % 3) * 0.4,
        speed: 0.012 + (idx % 4) * 0.004,
        maxScale: 3.2,
      });
    });

    // 5. Deep Space Ambient Star Dust Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 14;
      starPositions[i + 1] = (Math.random() - 0.5) * 14;
      starPositions[i + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x5df0a8,
      size: 0.035,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x141f36, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x5df0a8, 1.8);
    emeraldRimLight.position.set(-4, -2, -3);
    scene.add(emeraldRimLight);

    // Scroll & Mouse Interactivity variables
    let scrollY = window.scrollY;
    let targetScrollRotY = 0;
    let currentScrollRotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollFraction = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      // Smooth orbit pivot as user scrolls down through the sections
      targetScrollRotY = scrollFraction * Math.PI * 0.75;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth inertia lerping for scroll & mouse
      currentScrollRotY += (targetScrollRotY - currentScrollRotY) * 0.05;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base planetary spin + subtle scroll offset + mouse tilt
      const baseSpin = time * 0.025;
      globeGroup.rotation.y = -Math.PI * 0.42 + baseSpin + currentScrollRotY + mouseX * 0.3;
      globeGroup.rotation.x = 0.35 + mouseY * 0.2;

      // Drifting clouds slightly faster than earth
      cloudMesh.rotation.y += delta * 0.015;

      // Animate pulsing radar ping rings
      pingRings.forEach((ring) => {
        ring.initialScale += ring.speed;
        if (ring.initialScale > ring.maxScale) {
          ring.initialScale = 1.0;
        }
        ring.mesh.scale.set(ring.initialScale, ring.initialScale, ring.initialScale);
        const opacity = Math.max(0, 1.0 - (ring.initialScale - 1.0) / (ring.maxScale - 1.0));
        (ring.mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.85;
      });

      // Subtle particle float
      starPoints.rotation.y = time * 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose Three.js objects
      dayTexture.dispose();
      nightTexture.dispose();
      cloudTexture.dispose();

      earthGeo.dispose();
      earthMat.dispose();

      cloudGeo.dispose();
      cloudMat.dispose();

      haloGeo.dispose();
      haloMat.dispose();

      pinCoreGeo.dispose();
      ringGeo.dispose();

      starGeo.dispose();
      starMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#04060f]"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #08112b 0%, #04060f 70%, #020308 100%)',
      }}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full opacity-85 transition-opacity duration-1000" />

      {/* Atmospheric Ambient Glow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(93,240,168,0.06) 0%, rgba(14,165,233,0.03) 45%, transparent 75%)',
        }}
      />

      {/* Vignette border */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(2,3,8,0.85)]" />
    </div>
  );
};

export default InteractiveGlobeCanvas;

/**
 * NeuralBackground.jsx
 * Drop-in replacement for your video background.
 *
 * Usage:
 *   1. npm install three
 *   2. Replace your existing fixed video div with <NeuralBackground />
 *
 * Sits at z-0, pointer-events-none — identical footprint to your video.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Tunables ────────────────────────────────────────────────────────────────
const NODE_COUNT        = 160;
const SPREAD            = 28;          // world-space bounding cube half-size
const CONNECTION_DIST   = 7.5;         // max distance to draw an edge
const MAX_EDGES         = 320;         // hard cap — keeps GPU happy
const DRIFT_SPEED       = 0.018;       // node wandering speed
const MOUSE_REPEL_R     = 9;           // world-space repel radius
const MOUSE_REPEL_STR   = 0.012;       // how hard mouse pushes nodes
const PULSE_INTERVAL_MS = 1200;        // ms between cyan pulses
const PULSE_DURATION_MS = 900;

// Colours (match your palette exactly)
const COLOR_NODE_BASE   = new THREE.Color('#ffffff');
const COLOR_EDGE_BASE   = new THREE.Color('#ffffff');
const COLOR_PULSE       = new THREE.Color('#22d3ee');   // cyan-400
// ─────────────────────────────────────────────────────────────────────────────

export default function NeuralBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 38);

    // ── Nodes ─────────────────────────────────────────────────────────────
    // Each node: position (x,y,z) + velocity (vx,vy,vz)
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:  (Math.random() - 0.5) * SPREAD * 2,
      y:  (Math.random() - 0.5) * SPREAD * 2,
      z:  (Math.random() - 0.5) * SPREAD * 0.6, // flatter in Z — cinematic
      vx: (Math.random() - 0.5) * DRIFT_SPEED,
      vy: (Math.random() - 0.5) * DRIFT_SPEED,
      vz: (Math.random() - 0.5) * DRIFT_SPEED * 0.3,
    }));

    // Points geometry
    const pointsGeo = new THREE.BufferGeometry();
    const posArr    = new Float32Array(NODE_COUNT * 3);
    const colArr    = new Float32Array(NODE_COUNT * 3);

    nodes.forEach((n, i) => {
      posArr[i * 3]     = n.x;
      posArr[i * 3 + 1] = n.y;
      posArr[i * 3 + 2] = n.z;
      COLOR_NODE_BASE.toArray(colArr, i * 3);
    });

    pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    pointsGeo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));

    const pointsMat = new THREE.PointsMaterial({
      size:         0.22,
      vertexColors: true,
      transparent:  true,
      opacity:      0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    // ── Edges ─────────────────────────────────────────────────────────────
    // Pre-allocate MAX_EDGES line segments (2 verts each)
    const edgePos = new Float32Array(MAX_EDGES * 6);   // 2 × xyz
    const edgeCol = new Float32Array(MAX_EDGES * 6);   // 2 × rgb

    const edgeGeo = new THREE.BufferGeometry();
    const edgePosAttr = new THREE.BufferAttribute(edgePos, 3);
    const edgeColAttr = new THREE.BufferAttribute(edgeCol, 3);
    edgePosAttr.setUsage(THREE.DynamicDrawUsage);
    edgeColAttr.setUsage(THREE.DynamicDrawUsage);
    edgeGeo.setAttribute('position', edgePosAttr);
    edgeGeo.setAttribute('color',    edgeColAttr);
    edgeGeo.setDrawRange(0, 0);

    const edgeMat = new THREE.LineSegments(
      edgeGeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent:  true,
        opacity:      1,
      })
    );
    scene.add(edgeMat);

    // ── Pulse state ───────────────────────────────────────────────────────
    // We store active pulses as { edgeIdx, startTime }
    let pulses      = [];
    let lastPulse   = 0;

    // ── Mouse tracking (normalised device → world) ────────────────────────
    const mouse3D = new THREE.Vector3(9999, 9999, 0);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx   = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const ny   = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      // Unproject to Z=0 plane
      const vec = new THREE.Vector3(nx, ny, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const d   = -camera.position.z / dir.z;
      mouse3D.copy(camera.position).addScaledVector(dir, d);
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────
    let animId;
    const tmp  = new THREE.Color();
    const dist2 = (a, b) => (a.x-b.x)**2 + (a.y-b.y)**2 + (a.z-b.z)**2;

    const animate = (time) => {
      animId = requestAnimationFrame(animate);

      // 1. Move nodes + mouse repulsion
      nodes.forEach((n, i) => {
        // Repel from mouse
        const dx = n.x - mouse3D.x;
        const dy = n.y - mouse3D.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MOUSE_REPEL_R && d > 0.001) {
          const f = (1 - d / MOUSE_REPEL_R) * MOUSE_REPEL_STR;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        // Dampen + drift
        n.vx *= 0.995;
        n.vy *= 0.995;
        n.vz *= 0.995;

        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        // Soft boundary bounce
        if (Math.abs(n.x) > SPREAD) n.vx *= -0.6;
        if (Math.abs(n.y) > SPREAD) n.vy *= -0.6;
        if (Math.abs(n.z) > SPREAD * 0.3) n.vz *= -0.6;

        posArr[i * 3]     = n.x;
        posArr[i * 3 + 1] = n.y;
        posArr[i * 3 + 2] = n.z;
      });

      pointsGeo.attributes.position.needsUpdate = true;

      // 2. Rebuild edges (brute-force O(n²) — fast enough for 160 nodes)
      let edgeCount = 0;
      const threshold2 = CONNECTION_DIST * CONNECTION_DIST;

      for (let a = 0; a < NODE_COUNT && edgeCount < MAX_EDGES; a++) {
        for (let b = a + 1; b < NODE_COUNT && edgeCount < MAX_EDGES; b++) {
          const d2 = dist2(nodes[a], nodes[b]);
          if (d2 < threshold2) {
            const alpha = 1 - Math.sqrt(d2) / CONNECTION_DIST;
            // Base colour scaled by proximity
            tmp.copy(COLOR_EDGE_BASE);

            const base = alpha * 0.18;
            const ei   = edgeCount * 6;
            edgePos[ei]     = nodes[a].x; edgePos[ei+1] = nodes[a].y; edgePos[ei+2] = nodes[a].z;
            edgePos[ei+3]   = nodes[b].x; edgePos[ei+4] = nodes[b].y; edgePos[ei+5] = nodes[b].z;
            edgeCol[ei]   = edgeCol[ei+3] = tmp.r * base;
            edgeCol[ei+1] = edgeCol[ei+4] = tmp.g * base;
            edgeCol[ei+2] = edgeCol[ei+5] = tmp.b * base;

            edgeCount++;
          }
        }
      }

      edgeGeo.setDrawRange(0, edgeCount * 2);
      edgePosAttr.needsUpdate = true;

      // 3. Fire a new pulse occasionally
      if (time - lastPulse > PULSE_INTERVAL_MS && edgeCount > 0) {
        pulses.push({ edgeIdx: Math.floor(Math.random() * edgeCount), startTime: time });
        lastPulse = time;
      }

      // 4. Render pulses — override edge colour for pulsing edges
      pulses = pulses.filter(p => time - p.startTime < PULSE_DURATION_MS);
      pulses.forEach(p => {
        const progress = (time - p.startTime) / PULSE_DURATION_MS;
        // Bell curve: rises then fades
        const strength = Math.sin(progress * Math.PI) * 0.9;
        const ei = p.edgeIdx * 6;
        if (ei + 5 < edgeCol.length) {
          edgeCol[ei]   = edgeCol[ei+3] = COLOR_PULSE.r * strength;
          edgeCol[ei+1] = edgeCol[ei+4] = COLOR_PULSE.g * strength;
          edgeCol[ei+2] = edgeCol[ei+5] = COLOR_PULSE.b * strength;
        }
      });

      if (pulses.length > 0) edgeColAttr.needsUpdate = true;

      // 5. Very subtle camera breath
      camera.position.x = Math.sin(time * 0.00008) * 1.2;
      camera.position.y = Math.cos(time * 0.00006) * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      pointsGeo.dispose();
      edgeGeo.dispose();
      pointsMat.dispose();
      edgeMat.material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
        background:    '#050505',
      }}
    />
  );
}

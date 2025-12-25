import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "./SeaWaves.css";
import { MdDragIndicator } from "react-icons/md";

const MAX_RIPPLES = 5; // Max concurrent click ripples

const SeaWaves = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const glRef = useRef(null);

  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  // Sun Position State (Responsive initial position)
  const [sunPos, setSunPos] = useState(() => {
    if (typeof window === "undefined") return { x: 100, y: 100 };
    const isMobile = window.innerWidth < 768;
    return {
      x: isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.1,
      y: (window.innerHeight - 14) * 0.1,
    };
  });
  const sunDragRef = useRef({ active: false, offsetX: 0, offsetY: 0 });
  const [showHint, setShowHint] = useState(true);

  // Ref to pass fresh sun position to render loop without re-triggering effect
  const sunPosRef = useRef(sunPos);

  // Update ref when state changes
  useEffect(() => {
    sunPosRef.current = sunPos;
  }, [sunPos]);
  // Fixed-size ripple slots - circular buffer approach
  const ripplesRef = useRef(
    Array(MAX_RIPPLES)
      .fill(null)
      .map(() => ({ x: 0, y: 0, time: -100, active: false }))
  );
  const nextSlotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not available");
      return;
    }

    glRef.current = gl;
    gl.getExtension("OES_standard_derivatives");

    // Vertex shader
    const vertSrc = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Fragment shader with interactive ripples
    const fragSrc = `
      #ifdef GL_ES
      precision highp float;
      #endif

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      uniform float u_mouseActive;
      uniform vec2 u_sunPos; // Normalized 0..1 sun position
      
      // Click ripples (up to 5)
      uniform vec4 u_ripples[5]; // xy = position, z = start time, w = active flag

      #define NUM_STEPS 16
      #define ITER_GEOMETRY 3
      #define ITER_FRAGMENT 5
      #define PI 3.14159265359
      #define EPSILON 1e-3
      #define SEA_FREQ 0.12
      #define OCTAVE_M mat2(1.6, 1.2, -1.2, 1.6)

      const float SEA_HEIGHT = 1.0;
      const float SEA_CHOPPY = 9.0;
      const float SEA_SPEED = 0.9;

      float hash(vec2 p) {
        float h = dot(p, vec2(127.1, 311.7));
        return fract(sin(h) * 43758.5453123);
      }

      float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float sea_octave(vec2 uv, float choppy) {
        uv += noise(uv);
        vec2 wv = 1.0 - abs(sin(uv));
        vec2 swv = abs(cos(uv));
        wv = mix(wv, swv, wv);
        return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
      }

      // SPLASH effect - Stone Drop Physics (Tiny & Sharp)
      float splashEffect(vec2 uv, vec2 center, float timeSinceClick) {
        float dist = length(uv - center);
        float displacement = 0.0;
        
        // Phase 1: Impact Cavity (Tiny hole)
        float cavityOpen = smoothstep(0.0, 0.05, timeSinceClick);
        float cavityClose = smoothstep(0.2, 0.05, timeSinceClick);
        float cavity = smoothstep(0.02, 0.0, dist) * cavityOpen * cavityClose;
        displacement -= cavity * 0.5; // Slight dip

        // Phase 2: Worthington Jet (The Spike)
        // Shoots up fast, thin, and sharp
        float jetTime = timeSinceClick - 0.05;
        if (jetTime > 0.0) {
           float gravity = 9.8;
           float jetHeight = max(0.0, 1.5 * jetTime - 0.5 * gravity * jetTime * jetTime);
           float jetWidth = 0.008 * (1.0 - jetTime * 2.0); // Very thin
           float jet = smoothstep(jetWidth, 0.0, dist);
           displacement += jet * jetHeight * 1.5;
        }
        
        // Phase 3: High Frequency Ripples (The "Plink" sound visual)
        float waveTime = timeSinceClick;
        float waveRad = waveTime * 0.3 + 0.02;
        // High frequency (80.0) for small ripples
        float wave = sin(dist * 80.0 - waveTime * 25.0) * exp(-waveTime * 3.0);
        float waveMask = smoothstep(waveRad + 0.03, waveRad, dist) * smoothstep(0.0, waveRad, dist);
        displacement += wave * waveMask * 0.15;
        
        return displacement;
      }

      // Hover ripple - continuous circular motion like hand in water
      float hoverRipple(vec2 uv, vec2 mousePos, float time, float active) {
        float dist = length(uv - mousePos);
        float frequency = 18.0;
        float speed = 6.0;
        
        // Multiple concentric waves
        float wave1 = sin(dist * frequency - time * speed) * 0.5 + 0.5;
        float wave2 = sin(dist * frequency * 0.7 - time * speed * 1.2 + 1.0) * 0.5 + 0.5;
        float wave = mix(wave1, wave2, 0.4);
        
        // Soft falloff
        float falloff = smoothstep(0.4, 0.0, dist);
        
        return wave * falloff * active * 0.08;
      }

      // Separate hover effect - GENTLE
      float getHoverDisplacement(vec2 uv, float time) {
        return hoverRipple(uv, u_mouse, time, u_mouseActive);
      }

      // Separate splash effect - CHAOTIC & CUTTING
      float getSplashDisplacement(vec2 uv, float time) {
        float displacement = 0.0;
        for (int i = 0; i < 5; i++) {
          if (u_ripples[i].w > 0.5) {
            float timeSinceClick = u_time - u_ripples[i].z;
            if (timeSinceClick > 0.0 && timeSinceClick < 4.0) {
              displacement += splashEffect(uv, u_ripples[i].xy, timeSinceClick);
            }
          }
        }
        return displacement;
      }
      
      // Calculate masking for water cutting (0.0 = cut/void, 1.0 = normal water)
      float getSplashMask(vec2 uv, float time) {
        float mask = 1.0;
        for (int i = 0; i < 5; i++) {
          if (u_ripples[i].w > 0.5) {
            float timeSinceClick = u_time - u_ripples[i].z;
            // Short duration (0.15s) for quick "plink" hole
            if (timeSinceClick > 0.0 && timeSinceClick < 0.15) { 
               float dist = length(uv - u_ripples[i].xy);
               // Tiny hole for stone entry
               float holeSize = 0.02 * smoothstep(0.15, 0.0, timeSinceClick); 
               float hole = smoothstep(holeSize, holeSize + 0.02, dist);
               mask *= hole;
            }
          }
        }
        return mask;
      }

      float getSeaHeight(vec3 p, float time) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz;
        uv.x *= 0.75;

        // Physics calculations
        vec2 screenUV = gl_FragCoord.xy / u_resolution;
        float hoverDisp = getHoverDisplacement(screenUV, time);
        float splashDisp = getSplashDisplacement(screenUV, time);
        float splashMask = getSplashMask(screenUV, time);
        
        // REMOVED: Global turbulence boosting ("Earthquake" effect)
        // No longer modifying choppy or amp based on splashDisp.
        // No longer distorting uv space with domain warp.

        float d = 0.0;
        vec2 windDir = normalize(vec2(1.0, 0.8));

        for (int i = 0; i < ITER_GEOMETRY; i++) {
          vec2 u = (uv + windDir * time) * freq;
          vec2 v = (uv - windDir * time) * freq;
          
          float wave = (sea_octave(u, choppy) + sea_octave(v, choppy));
          // Apply mask to base waves ONLY
          d += wave * amp * splashMask; 

          uv = OCTAVE_M * uv;
          freq *= 1.9;
          amp *= 0.22;
          choppy = mix(choppy, 1.0, 0.2);
        }
        
        // Add splash/hover ON TOP
        d += splashDisp + hoverDisp;
        
        return d;
      }

      float map(vec3 p, float time) {
        return p.y - getSeaHeight(p, time);
      }

      float map_detailed(vec3 p, float time) {
        float freq = SEA_FREQ;
        float amp = SEA_HEIGHT;
        float choppy = SEA_CHOPPY;
        vec2 uv = p.xz;
        uv.x *= 0.75;

        // Physics calculations (same as getSeaHeight)
        vec2 screenUV = gl_FragCoord.xy / u_resolution;
        float hoverDisp = getHoverDisplacement(screenUV, time);
        float splashDisp = getSplashDisplacement(screenUV, time);
        float splashMask = getSplashMask(screenUV, time);
        
        // REMOVED: Global turbulence boosting

        float d = 0.0;
        vec2 windDir = normalize(vec2(1.0, 0.8));

        for (int i = 0; i < ITER_FRAGMENT; i++) {
          vec2 u = (uv + windDir * time) * freq;
          vec2 v = (uv - windDir * time) * freq;
          
          // Apply wave cutting mask
          float wave = (sea_octave(u, choppy) + sea_octave(v, choppy));
          d += wave * amp * splashMask;

          uv = OCTAVE_M * uv;
          freq *= 1.9;
          amp *= 0.22;
          choppy = mix(choppy, 1.0, 0.2);
        }
        
        d += splashDisp + hoverDisp;
        
        return p.y - d;
      }

      vec3 getNormal(vec3 p, float eps, float time) {
        float h = map_detailed(p, time);
        float hx = map_detailed(p + vec3(eps, 0.0, 0.0), time);
        float hz = map_detailed(p + vec3(0.0, 0.0, eps), time);
        vec3 n = vec3(hx - h, eps, hz - h);
        return normalize(n);
      }

      float diffuse(vec3 n, vec3 l, float p) {
        return pow(dot(n, l) * 0.4 + 0.6, p);
      }

      float specular(vec3 n, vec3 l, vec3 e, float s) {
        float nrm = (s + 8.0) / (PI * 8.0);
        return pow(max(dot(reflect(-l, n), e), 0.0), s) * nrm;
      }

      // VS Code theme sky
      vec3 getSkyColor(vec3 e) {
        e.y = max(e.y, 0.0);
        vec3 deep = vec3(0.051, 0.067, 0.090);
        vec3 horizon = vec3(0.086, 0.106, 0.133);
        vec3 sky = mix(horizon, deep, smoothstep(0.0, 0.5, e.y));
        
        vec3 moonDir = normalize(vec3(-0.4, 0.3, -0.5));
        float moonGlow = pow(max(dot(e, moonDir), 0.0), 150.0);
        vec3 accentColor = vec3(0.345, 0.651, 1.0);
        sky += accentColor * moonGlow * 0.15;
        
        return sky;
      }

      vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 e, float dist) {
        float fresnel = clamp(1.0 - dot(n, e), 0.0, 1.0);
        fresnel = pow(fresnel, 3.0) * 0.45;

        vec3 reflected = getSkyColor(reflect(-e, n));
        
        vec3 base = vec3(0.051, 0.067, 0.090);
        vec3 waterTint = vec3(0.188, 0.212, 0.239);

        float atten = max(1.0 - dist * dist * 0.001, 0.0);
        vec3 refracted = base * 0.7;
        
        vec3 mutedColor = vec3(0.545, 0.580, 0.620);
        refracted += mutedColor * diffuse(n, l, 120.0) * 0.02;
        
        vec3 surfaceColor = vec3(0.086, 0.106, 0.133);
        refracted = mix(refracted, surfaceColor * 0.6, 0.4);

        vec3 color = mix(refracted, reflected, fresnel);
        
        color += waterTint * (p.y + SEA_HEIGHT) * 0.015 * atten;
        
        // Balanced specular highlight 
        float s = specular(n, l, e, 30.0); 
        
        // --- DYNAMIC SUNSET COLOR SYNC ---
        // Top (1.0) = Goldish Yellow
        // Bottom (0.0) = Deep Sunset Red/Orange
        vec3 sunGold = vec3(1.0, 0.8, 0.2);
        vec3 sunsetRed = vec3(1.0, 0.3, 0.05);
        vec3 accentColor = mix(sunsetRed, sunGold, smoothstep(0.1, 0.8, u_sunPos.y));
        
        // Calculate horizon proximity boost
        float horizonBoost = 1.0 + smoothstep(0.7, 0.1, u_sunPos.y) * 1.5; 
        
        // Apply boost to specular
        color += mix(mutedColor, accentColor, 0.6) * s * 1.1 * horizonBoost;
        
        // Subtle ambient glow with boost
        float glow = max(dot(reflect(-l, n), e), 0.0);
        glow = pow(glow, 6.0); 
        color += accentColor * glow * 0.15 * horizonBoost;

        return color;
      }

      float trace(vec3 ori, vec3 dir, float time, out vec3 p) {
        float tm = 0.0;
        float tx = 1000.0;
        float hx = map(ori + dir * tx, time);

        if (hx > 0.0) {
          p = ori + dir * tx;
          return tx;
        }

        float hm = map(ori + dir * tm, time);
        float tmid = 0.0;

        for (int i = 0; i < NUM_STEPS; i++) {
          tmid = mix(tm, tx, hm / (hm - hx));
          p = ori + dir * tmid;
          float hmid = map(p, time);

          if (hmid < 0.0) {
            tx = tmid;
            hx = hmid;
          } else {
            tm = tmid;
            hm = hmid;
          }
        }
        return tmid;
      }

      mat3 cameraFromAngles(float yaw, float pitch) {
        vec3 forward = normalize(vec3(sin(yaw) * cos(pitch), sin(pitch), -cos(yaw) * cos(pitch)));
        vec3 worldUp = vec3(0.0, 1.0, 0.0);
        vec3 right = normalize(cross(forward, worldUp));
        vec3 up = cross(right, forward);
        return mat3(right, up, forward);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        float t = u_time * SEA_SPEED;
        
        // Calculate light direction from uniform sun position
        // Map 0..1 to -1..1 range for X
        // Y: 0(top) -> 1(bottom) in JS, but we want 1.0 at top for "Sun in Sky"? 
        // Let's use the passed nSunY which is 1.0 at top.
        // Z: Negative = away from camera (into background)
        vec3 lightDir = normalize(vec3(
          (u_sunPos.x * 2.0 - 1.0), 
          max(u_sunPos.y * 2.0 - 0.5, 0.1), // Allow higher arc
          -1.0 // Push sun further back for nicer reflection angle
        ));
        
        float yaw = -0.4 + sin(u_time * 0.06) * 0.08;
        float pitch = -0.15 + sin(u_time * 0.08) * 0.015;
        mat3 cam = cameraFromAngles(yaw, pitch);

        vec3 ori = vec3(0.0, 3.2, 5.0);
        ori.x += sin(u_time * 0.1) * 0.1;
        ori.y += sin(u_time * 0.4) * 0.02;

        // Shift uv.y down by 0.2 to raise the horizon line on screen
        vec3 dir = normalize(cam * vec3(uv.x * 1.1, (uv.y - 0.2) * 0.75, -1.5));

        vec3 p;
        float dist = trace(ori, dir, t, p);

        vec3 color;
        if (dist > 999.0) {
          color = getSkyColor(dir);
        } else {
          vec3 e = normalize(ori - p);
          vec3 n = getNormal(p, max(EPSILON * dist, 0.02), t);
          
          color = getSeaColor(p, n, lightDir, e, dist);
          
          float fog = clamp(dist / 55.0, 0.0, 1.0);
          vec3 sky = getSkyColor(dir);
          color = mix(color, sky, fog);
        }

        float cornerFade = 1.0 - smoothstep(0.0, 2.5, length(uv - vec2(-1.5, 1.0))) * 0.15;
        color *= cornerFade;
        
        // Removed potential heavy noise lookup
        float g = fract(sin(dot(gl_FragCoord.xy + u_time, vec2(12.9898, 78.233))) * 43758.5453);
        color += (g - 0.5) * 0.015;

        color = color / (color + vec3(1.0));
        color = pow(color, vec3(0.4545));
        
        // --- ULTRA-SOFT GOD RAYS ---
        vec2 rayPos = uv;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 sunUV = vec2(
            (u_sunPos.x * 2.0 - 1.0) * aspect,
            u_sunPos.y * 2.0 - 1.0
        );

        vec2 rayDelta = rayPos - sunUV;
        float rayDist = length(rayDelta);
        float rayAngle = atan(rayDelta.y, rayDelta.x);
        
        // ULTRA-MISTY RAY ALGORITHM: Very low frequency, high diffusion
        float rayTime = u_time * 0.02; // Slower movement
        float rays = sin(rayAngle * 4.0 + rayTime) * 0.5 
                    + sin(rayAngle * 6.0 - rayTime * 0.5) * 0.3
                    + sin(rayAngle * 8.0 + rayTime * 0.8) * 0.2;
        
        // Ultra-soften: use a very high bias to remove "lines" and create "glow patches"
        rays = (rays + 1.0) * 0.5; // 0..1
        rays = smoothstep(0.0, 1.0, rays); 
        rays = pow(rays, 1.0); // Linearity for softness
        
        // Wide radial falloff
        float falloff = smoothstep(2.5, 0.4, rayDist);
        
        // Color of rays: Match the dynamic accent color logic
        vec3 sunGold = vec3(1.0, 0.8, 0.2);
        vec3 sunsetRed = vec3(1.0, 0.4, 0.1);
        vec3 rayColor = mix(sunsetRed, sunGold, smoothstep(0.2, 0.7, u_sunPos.y));
        
        // Extremely low intensity for near-invisible mist
        color += rayColor * rays * falloff * 0.04;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shaders
    function compileShader(type, src) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vsSrc, fsSrc) {
      const vs = compileShader(gl.VERTEX_SHADER, vsSrc);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;

      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);

      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(prog));
        gl.deleteProgram(prog);
        return null;
      }
      return prog;
    }

    const program = createProgram(vertSrc, fragSrc);
    if (!program) return;

    const posLoc = gl.getAttribLocation(program, "a_pos");
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_mouse = gl.getUniformLocation(program, "u_mouse");

    const u_mouseActive = gl.getUniformLocation(program, "u_mouseActive");
    const u_sunPosLoc = gl.getUniformLocation(program, "u_sunPos");

    // Get ripple uniform locations
    const u_ripples = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      u_ripples.push(gl.getUniformLocation(program, `u_ripples[${i}]`));
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    let lastW = 0,
      lastH = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);
      if (w !== lastW || h !== lastH) {
        lastW = w;
        lastH = h;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    // Mouse event handlers - attached to document to work with pointer-events: none
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight; // Flip Y
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    let startTime = performance.now();

    const handleClick = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      const time = (performance.now() - startTime) * 0.001;

      // Write to next slot in circular buffer
      const slot = nextSlotRef.current;
      ripplesRef.current[slot] = { x, y, time, active: true };
      nextSlotRef.current = (slot + 1) % MAX_RIPPLES;

      console.log("Click splash at slot:", slot, {
        x: x.toFixed(2),
        y: y.toFixed(2),
        time: time.toFixed(2),
      });
    };

    // Attach to document for full-page tracking
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("click", handleClick);

    function render() {
      resize();
      const time = (performance.now() - startTime) * 0.001;

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(u_resolution, canvas.width, canvas.height);
      gl.uniform1f(u_time, time);
      gl.uniform2f(u_mouse, mouseRef.current.x, mouseRef.current.y);

      gl.uniform1f(u_mouseActive, mouseRef.current.active ? 1.0 : 0.0);

      // Send normalized sun pos
      // Invert Y for shader (0 is bottom in shader usually, but we want 0 top in screen coords?)
      // Actually standard GL coords: 0,0 is bottom-left. Screen: 0,0 top-left.
      // Let's pass normalized 0..1 from top-left.
      const nSunX = sunPosRef.current.x / window.innerWidth;
      const nSunY = 1.0 - sunPosRef.current.y / window.innerHeight; // Flip for GL
      gl.uniform2f(u_sunPosLoc, nSunX, nSunY);

      // Set ripple uniforms from fixed-size buffer
      const ripples = ripplesRef.current;
      for (let i = 0; i < MAX_RIPPLES; i++) {
        const r = ripples[i];
        // Pass time as-is; shader checks if timeSinceClick < 4.0
        gl.uniform4f(u_ripples[i], r.x, r.y, r.time, r.active ? 1.0 : 0.0);
      }
      // No cleanup needed - circular buffer reuses slots automatically

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationRef.current = requestAnimationFrame(render);
    }

    render();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, []);

  const location = useLocation();
  const initialPathRef = useRef(location.pathname);

  // Hide hint when dragging starts or route changes
  useEffect(() => {
    if (showHint) {
      if (
        sunDragRef.current.active ||
        location.pathname !== initialPathRef.current
      ) {
        setShowHint(false);
      }
    }
  }, [sunDragRef.current.active, location.pathname, showHint]);

  // Sun Drag Handlers
  const handleSunMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent clicking through to the ocean
    sunDragRef.current = {
      active: true,
      offsetX: e.clientX - sunPos.x,
      offsetY: e.clientY - sunPos.y,
    };
  };

  useEffect(() => {
    const handleWindowMouseMove = (e) => {
      if (sunDragRef.current.active) {
        const newX = e.clientX - sunDragRef.current.offsetX;
        const newY = e.clientY - sunDragRef.current.offsetY;

        // Clamp to screen bounds
        const clampedX = Math.max(0, Math.min(window.innerWidth, newX));
        const clampedY = Math.max(0, Math.min(window.innerHeight, newY));

        setSunPos({
          x: clampedX,
          y: clampedY,
        });
      }
    };

    const handleWindowMouseUp = () => {
      sunDragRef.current.active = false;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  return (
    <>
      {/* Background Ocean Layer - Z-Index 0 */}
      <div className="sea-waves-container">
        <canvas ref={canvasRef} className="sea-canvas" />
        <div className="sea-fades" />
      </div>

      {/* Foreground Sun Layer - High Z-Index */}
      <div className="sea-sun-container">
        <div
          className="sea-sun"
          style={{
            left: sunPos.x,
            top: sunPos.y,
            background:
              sunPos.y / window.innerHeight > 0.6
                ? `radial-gradient(circle at 50% 50%, #fff 0%, #ff4500 25%, #ff8c00 50%, transparent 80%)`
                : `radial-gradient(circle at 50% 50%, #fff 0%, #ffd700 25%, #ff8c00 50%, transparent 80%)`,
            boxShadow:
              sunPos.y / window.innerHeight > 0.6
                ? `0 0 30px 10px rgba(255, 69, 0, 0.6), 0 0 50px 30px rgba(255, 69, 0, 0.2)`
                : `0 0 40px 10px rgba(255, 215, 0, 0.6), 0 0 100px 30px rgba(255, 140, 0, 0.2)`,
            filter: "blur(8px)", // Reduced blur to bring back the "round" core
            opacity: 0.8, // Increased opacity for presence
            transform: "translate(-50%, -50%) scale(1.1)",
          }}
          onMouseDown={handleSunMouseDown}
        />
        {showHint && (
          <div
            className="sun-hint"
            style={{
              left: sunPos.x,
              top: sunPos.y,
            }}
          >
            <MdDragIndicator className="sun-drag-icon" />
            <span>Drag to reposition sun</span>
          </div>
        )}
      </div>
    </>
  );
};

export default SeaWaves;

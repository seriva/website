---
title: "SimpleFPS Gets WebGPU, Raycast Physics, and More"
date: "2026-03-11"
excerpt: "A look at the latest major updates: experimental WebGPU, raycast physics, animated particles, and GPU skinning via a custom MD5 model pipeline."
tags: ["Game Development", "WebGPU", "JavaScript", "Physics"]
---

It’s been an incredibly busy three months for [SimpleFPS](https://github.com/seriva/simplefps). Since the last major update where I integrated Q3 BSP parsing, the engine has undergone massive architectural changes. We've replaced core systems to push performance further and added critical features needed for a true retro shooter experience.

Here’s a look at what changed under the hood.

## Embracing WebGPU

The biggest architectural shift in this cycle was the introduction of an experimental WebGPU rendering backend. 

WebGL has served us well, and we will continue to maintain both backend paths side-by-side. However, moving to WebGPU allowed for significant optimizations and unblocked future development. By pre-allocating uniform typed arrays, streamlining state object handling, and using dedicated pipelines for different render passes (and caching framebuffer formats), we drastically reduced CPU overhead. Shader permutations and complex rendering sequences are now handled much more efficiently, avoiding the constant state re-creations that bogged down the WebGL path. This sets the foundation for more advanced rendering techniques down the line.

## Rebuilt Physics: Raycasting & Octrees

Physics was completely overhauled. We moved away from `cannon.es` and generic broadphase collision toward a highly optimized custom raycasting approach. While broadphase physics engines are great for many applications, simulating rigid bodies for fast-paced FPS character movement often introduces subtle, unpredictable behaviors. Additionally, generic physics state is notoriously difficult to synchronize across a network, which is critical since multiplayer support is a core goal for the engine's future.

The player FPS controller moved entirely to a raycasting approach, ensuring responsive and tight movement through the arena. For projectile physics, we now utilize a custom trajectory system with raycast bounces rather than relying purely on discrete body steps. To make this fast, I extracted ray-AABB intersections into shared utilities and implemented the Slab method for efficient ray-octree intersection. By reusing temporary objects and arrays, the GC pressure is drastically minimized.

We also refined player collision filtering and implemented anti-tunneling using pre-step raycasting, so fast-moving projectiles like grenades behave predictably.

## Particles and Billboards

A game needs juice. The last few months finally saw the addition of a robust particle and temporal effects system.

For particles, I implemented instanced billboard rendering with a new WGSL shader, completely offloading matrix calculations (like scaling and rotation) to the GPU. This single-draw rendering approach for animated billboards and emitters keeps performance high while allowing for effects like explosion sounds, cooldowns, and rotating particles.

## GPU Skinning and the MD5 Pipeline

Bringing animated characters into a custom engine is notoriously tricky. To solve this, we implemented a custom asset pipeline to import `.md5mesh` models—the skeletal animation format famously used in Doom 3. 

I wrote a Node.js script (`scripts/md5tomesh.js`) that parses the core MD5 text data: the skeleton joints, vertices, and vertex skinning weights. It computes the quaternions and structures the data, then bakes everything down into an optimized binary `.bmesh` format. This means the engine can load complex, animated models almost instantly without parsing text at runtime.

Once loaded, our new `SkinnedMesh` class handles the rendering. By fully supporting GPU skinning in both the GLSL and WGSL shaders, we pass the pre-computed skeleton poses directly to the GPU. Character models now animate smoothly with a surprisingly small memory footprint and minimal CPU overhead.

## Lighting Redux: Lightgrids and Q3 Static Lights

Lighting received a major facelift. 

In the previous update, we relied on baked lightmaps alongside deferred dynamic lights. We've now implemented per-material lightmap handling and refined how static Q3 lighting integrates with dynamic elements. By moving to a separate directional and point light rendering pipeline, the system blends baked ambient data with real-time spotlights, muzzle flashes, and dynamic emissive materials seamlessly.

We also added half-resolution SSAO with a dedicated ping-pong bilateral blur pass, giving everything much better grounded shading without killing the framerate. 

## Moving Forward

With WebGPU, raycast physics, GPU skinning, and a robust lighting system, SimpleFPS is starting to look less like an engine demo and more like an actual game. Next up, I'll be focusing on expanding the gameplay loop and creating more content.

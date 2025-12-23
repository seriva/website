---
title: "Stealing From id Software: BSP Maps in SimpleFPS"
date: "2024-12-23"
excerpt: "Creating game content is hard. So I built a Quake 3 BSP converter and ended up redesigning my rendering pipeline."
tags: ["Game Development", "WebGL", "JavaScript"]
---

The hardest part of hobby game engine development isn't the code—it's content. Levels, textures, models, all the stuff that makes it look like an actual game instead of debug cubes.

I've been working on [SimpleFPS](https://github.com/seriva/simplefps), and testing always meant staring at the same placeholder geometry, which isn't exactly motivating.

## The Content Problem

I'm a programmer, not a level designer. Creating maps from scratch means learning Blender, texturing—stuff I don't really want to spend my weekends on.

The solution was to use existing content. Quake 3's BSP format is well-documented and id Software basically invented FPS level design. More importantly, there's a massive library of community-made maps out there—thousands of maps created by talented level designers over 20+ years. That's a lot of free content to test an engine with.

## The Conversion Tool

I built a BSP parser that converts Q3 maps to my engine's JSON format. It handles geometry extraction (vertices, indices, UVs), texture conversion from the BSP, and lightmap extraction. The geometry and textures were pretty straightforward, but the lightmaps got interesting.

## Hybrid Rendering

My engine used fully deferred rendering with dynamic lights only. Quake 3 uses baked lightmaps for its lighting. I had two options: ignore the lightmaps and use dynamic lighting (which looks wrong), or integrate the baked lightmaps into my pipeline.

I went with the second option. The pipeline now does a geometry pass that outputs albedo, normals, and positions to G-buffers. The lighting pass then samples the baked lightmap for base illumination, applies SSAO, adds dynamic lights on top for things like muzzle flash and explosions, and handles emissive materials. You get the atmospheric baked lighting from the original maps plus the flexibility of dynamic lights when needed.

## Skipping the BSP Tree

Here's the thing—I'm not actually using the BSP tree for rendering at all. BSP trees exist for visibility culling, which was essential in 1999 when GPUs could handle maybe 10k triangles. But a typical Q3 map has around 50k triangles total, and modern GPUs push millions without breaking a sweat.

So the conversion tool just flattens everything into vertex buffers. One mesh, one draw call, no PVS, no frustum culling, no tree traversal. The GPU doesn't even notice. Sometimes the best optimization is skipping the optimization entirely.

## What's Next

There's still work to do—shader support for Q3 material effects, bezier patch rendering for curved surfaces, entity parsing for spawn points. But for now I can walk around real levels instead of test cubes, and that's solid progress.

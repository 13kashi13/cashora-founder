# 3D Scroll-Driven Experience - Performance Guide

## Architecture Overview

Your site now features a sophisticated 3D WebGL layer that runs behind your HTML content, creating a seamless scroll-driven experience.

### Core Components

1. **Scene3D.tsx** - Main 3D canvas with optimized rendering settings
2. **ScrollCamera.tsx** - Scroll-to-camera position mapping with smooth interpolation
3. **PhysicsSandbox.tsx** - Rapier3D physics simulation with interactive objects
4. **MorphingVideoPanel.tsx** - Custom GLSL shader-driven morphing panel
5. **PortalTiles.tsx** - Portal-style tiles rendering 3D scenes inside frames
6. **PerformanceMonitor.tsx** - Adaptive quality based on FPS

## Performance Optimizations Implemented

### 1. Rendering Optimizations
- **Adaptive DPR**: Automatically adjusts pixel ratio based on FPS
- **Adaptive Events**: Reduces event polling when performance drops
- **Stencil Buffer**: Enabled for portal masking effects
- **Power Preference**: Set to 'high-performance' for dedicated GPU usage
- **DPR Range**: [1, 2] to prevent over-rendering on high-DPI displays

### 2. Scroll Performance
- **RequestAnimationFrame**: All scroll handlers use RAF for 60fps updates
- **Passive Listeners**: Scroll events are passive for better browser optimization
- **Lerp Smoothing**: Camera movements use linear interpolation for buttery-smooth motion
- **Velocity Tracking**: Smooth velocity calculation prevents jank

### 3. Physics Optimizations
- **Variable Time Step**: Physics updates adapt to frame rate
- **Collider Optimization**: Simple cuboid colliders for better performance
- **Object Pooling**: Fixed number of physics objects (5 objects)
- **Spatial Partitioning**: Rapier handles this automatically

### 4. Shader Optimizations
- **Vertex Shader**: Morphing calculations done in vertex shader (faster)
- **Fragment Shader**: Minimal texture lookups and calculations
- **Uniform Updates**: Only updated when needed via useFrame
- **Double-Sided Rendering**: Only where necessary

### 5. Memory Management
- **Geometry Reuse**: Shared geometries across similar objects
- **Texture Optimization**: RenderTexture with max anisotropy
- **Dispose Pattern**: Automatic cleanup via React Three Fiber
- **Suspense Boundaries**: Lazy loading of 3D components

## Scroll-to-3D Mapping

The scroll position directly controls camera movement:

```typescript
// Scroll offset (0-1) maps to:
- Camera Z: 10 to -40 (moves forward through scene)
- Camera Y: -10 to 10 (moves up)
- Camera X: Sine wave (-5 to 5) for dynamic path
- Look At: Follows curved path through scene
```

## HTML-to-3D Integration

- **Fixed 3D Canvas**: `position: fixed` with `pointer-events: none`
- **HTML Layer**: `position: relative` with `z-index: 1` and `pointer-events: auto`
- **Transparent Background**: HTML has `rgba(5, 10, 10, 0.7)` to show 3D through
- **Stencil Masking**: Portal tiles use stencil buffer for clean cutouts

## Performance Targets

- **Target FPS**: 60fps on desktop, 30fps minimum on mobile
- **Frame Budget**: 16.67ms per frame (60fps)
- **Physics Update**: Variable time step, max 60Hz
- **Shader Complexity**: < 100 instructions per fragment

## Monitoring Performance

The PerformanceMonitor component automatically:
- Tracks FPS over 60-frame rolling average
- Reduces pixel ratio if FPS < 30
- Increases pixel ratio if FPS > 50
- Adapts event polling frequency

## Best Practices

### DO:
✅ Use `useFrame` for all animations
✅ Lerp/smooth all camera movements
✅ Keep physics objects count low (< 20)
✅ Use simple collider shapes
✅ Minimize shader complexity
✅ Use passive scroll listeners
✅ Implement RAF for scroll handlers

### DON'T:
❌ Update uniforms every frame unnecessarily
❌ Create/destroy objects during runtime
❌ Use complex physics shapes
❌ Render high-poly models without LOD
❌ Use blocking scroll listeners
❌ Perform heavy calculations in shaders

## Future Enhancements

1. **LOD System**: Add level-of-detail for distant objects
2. **Frustum Culling**: Only render visible objects
3. **Instanced Rendering**: For repeated geometries
4. **Texture Atlasing**: Combine textures to reduce draw calls
5. **Web Workers**: Offload calculations to separate thread
6. **WASM Physics**: Consider faster physics engine

## Troubleshooting

### Low FPS
- Check browser console for errors
- Reduce physics object count
- Lower pixel ratio manually
- Disable bloom post-processing
- Simplify shader calculations

### Scroll Jank
- Ensure passive scroll listeners
- Check for blocking JavaScript
- Verify RAF is being used
- Reduce camera lerp speed
- Disable physics temporarily to isolate issue

### Memory Leaks
- Check for undisposed geometries
- Verify textures are being cleaned up
- Monitor memory in DevTools
- Look for event listener leaks

## Browser Compatibility

- **Chrome/Edge**: Full support, best performance
- **Firefox**: Full support, good performance
- **Safari**: Full support, may need WebGL2 fallback
- **Mobile**: Reduced quality automatically applied

## Accessibility

- Respects `prefers-reduced-motion`
- Keyboard navigation preserved
- Screen readers can access HTML content
- 3D layer is purely decorative

---

**Note**: The 3D layer is designed to enhance, not replace, your existing content. All interactions remain functional, and the experience gracefully degrades on lower-end devices.

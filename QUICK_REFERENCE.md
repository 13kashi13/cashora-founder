# 🚀 Quick Reference - 3D Experience

## 🎯 What You Got

A **scroll-driven 3D WebGL experience** with:
- Camera that moves through 3D space as you scroll
- Physics simulation with falling objects
- Custom GLSL shaders with morphing effects
- Portal tiles rendering 3D scenes
- 60fps performance with adaptive quality
- Full accessibility support

## 🔗 View It

**http://localhost:8081/**

Scroll down to see the magic! ✨

## 📁 Key Files

```
src/components/3d/
├── Scene3D.tsx              # Main canvas
├── ScrollCamera.tsx         # Scroll → camera mapping
├── PhysicsSandbox.tsx       # Physics objects
├── MorphingVideoPanel.tsx   # GLSL shaders
├── PortalTiles.tsx          # Portal rendering
├── PerformanceMonitor.tsx   # FPS tracking
└── LoadingScreen.tsx        # Loading UI
```

## ⚙️ Quick Tweaks

### Change Scroll Speed
```typescript
// src/components/3d/Scene3D.tsx, line 30
<ScrollControls pages={8} damping={0.1}>
```
- **pages**: Higher = more scroll needed
- **damping**: Higher = smoother/slower

### Adjust Camera Speed
```typescript
// src/components/3d/ScrollCamera.tsx, line 23-25
const targetZ = 10 - scrollOffset * 50; // Forward speed
const targetY = scrollOffset * 20 - 10; // Up/down speed
const targetX = Math.sin(scrollOffset * Math.PI * 2) * 5; // Side-to-side
```

### Add More Physics Objects
```typescript
// src/components/3d/PhysicsSandbox.tsx, line 30-36
const objects = useMemo(() => [
  { position: [-3, 5, 0], color: '#7CFFB2', shape: 'box' },
  // Add more objects here
], []);
```

### Change Shader Colors
```typescript
// src/components/3d/MorphingVideoPanel.tsx, line 60-61
uColor1: { value: new THREE.Color('#7CFFB2') },
uColor2: { value: new THREE.Color('#5CE1E6') },
```

## 🎨 Your Brand Colors

- **#7CFFB2** - Cash Green (primary)
- **#5CE1E6** - Cyan Glow (accent)
- **#A8FFE0** - Mint (secondary)
- **#050a0a** - Near Black (background)

## 📊 Performance

- **Target**: 60fps desktop, 30fps mobile
- **Auto-adjusts**: Quality reduces if FPS drops
- **Optimized**: Passive scroll, RAF updates, lerp smoothing

## ♿ Accessibility

- Respects `prefers-reduced-motion`
- 3D disabled for users who prefer less motion
- All HTML interactions preserved

## 🐛 Troubleshooting

### 3D not visible?
- Check console for errors
- Verify WebGL: `chrome://gpu`
- Clear cache and reload

### Low FPS?
- Reduce `pages` in ScrollControls
- Lower physics object count
- Disable bloom in Scene3D.tsx

### Scroll feels janky?
- Increase `damping` (0.2-0.3)
- Check for blocking JavaScript
- Disable physics temporarily

## 📚 Full Docs

- **3D_SETUP_COMPLETE.md** - Complete guide
- **3D_PERFORMANCE_GUIDE.md** - Performance details
- **IMPLEMENTATION_SUMMARY.md** - Full summary

## ✅ Everything Still Works

✓ Firebase auth
✓ User profiles
✓ All buttons
✓ Navigation
✓ Responsive design
✓ Accessibility

## 🎉 Enjoy!

Your site now has a premium, Apple-level 3D scroll experience while maintaining all existing functionality!

---

**Questions?** Check the full documentation files above.

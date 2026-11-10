# Crystal Chandelier

https://polyfork.dev/asset/crystal-chandelier-55d279

A parametric low-poly model for three.js. One import, no loader, no textures,
one draw call. `createAsset()` returns a ready `THREE.Group`.

## What is in this folder

| file | what it is |
| --- | --- |
| `index.html` | a complete working page: **double-click it** |
| `crystal-chandelier-55d279.mjs` | the model as an ES module, with every option below |
| `crystal-chandelier-55d279.glb` | the same model baked, for Unity, Godot, Blender and glTF loaders |
| `LICENSE.txt` | the terms, file by file: which licence each file is under |

## Run it

Double-click `index.html`. It needs an internet connection the first time,
because three.js is pulled from unpkg.com.

It carries its own copy of the model code so that it works from a `file://`
URL, where browsers refuse to load ES modules. If you would rather edit
`crystal-chandelier-55d279.mjs` and see the page pick up your changes, serve the folder
and it will import the file instead of the copy:

```
python3 -m http.server     # then open http://localhost:8000
```

## Use it in your own scene

```js
import { createAsset } from './crystal-chandelier-55d279.mjs';
scene.add(createAsset());
```

The bare `three` specifiers resolve through any bundler (Vite, webpack, esbuild),
or through an importmap in your page:

```html
<script type="importmap">
{ "imports": { "three": "https://unpkg.com/three@0.180.0/build/three.module.js",
               "three/addons/": "https://unpkg.com/three@0.180.0/examples/jsm/" } }
</script>
```

Prefer the GLB? `new GLTFLoader().load('crystal-chandelier-55d279.glb', g => scene.add(g.scene))`.
The module is the smaller and more flexible of the two: it carries the options
below, the GLB is one frozen configuration of them.

## Options

```js
createAsset({
  colorway: 'casino-gold',
  tiers: 'one',
  crystals: 'cascade',
  gold: '#B3883A',
  crystal: '#E3E3E0',
  beads: '#E1DBD5',
  bulb: '#f4f1ee',
});
```

| option | type | default | accepts | what it does |
| --- | --- | --- | --- | --- |
| `colorway` | choice | `'casino-gold'` | `'casino-gold'`, `'vegas-cyan'`, `'antique-amethyst'`, `'champagne-smoke'` | Curated metal-and-crystal pairings from the muted casino kit palette. casino-gold (default): the kit's antique gold hung with clear, pale grey-cream crystal drops and warm grey beads. vegas-cyan (name kept from the first release; there is no cyan in the kit): the same antique gold with dark smoked-slate crystals. antique-amethyst: a darker aged gold with dusty mauve crystals. champagne-smoke: pale champagne gold with smoky taupe crystals. The flame bulbs stay cream-marble in every colorway. |
| `tiers` | choice | `'one'` | `'one'`, `'two'`, `'three'` | How many rings of candle arms the chandelier carries. one (default): a single broad ring of six S-curved arms off the bowl, open stem above. two: adds a smaller ring of three arms springing from the belly of the stem, halfway up, turned between the main arms. three: adds a third, smallest ring of three arms higher still, off the stem's shoulder under the crown, so the candles step up in a wedding-cake outline. The rose, chain, bowl, main ring, crystals and overall drop are identical at every value. |
| `crystals` | choice | `'cascade'` | `'none'`, `'drops'`, `'cascade'` | How much crystal hangs on the gold frame. cascade (default): a teardrop crystal under every drip pan and at the dip of every arm, a fringe of drops round the crown, strings of clear beads ending in drops from the bowl rim, and a central string of bead, drop and crystal ball as the lowest point. drops: only the crown fringe and one drop under each main pan. none: the bare gold candle chandelier, its bowl closed underneath by the gold acorn. |
| `gold` | color | `'#B3883A'` | any hex or `THREE.Color` | Albedo of all the metal: ceiling rose, chain, crown, stem, bowl and acorn, every arm, drip pan and candle sleeve. |
| `crystal` | color | `'#E3E3E0'` | any hex or `THREE.Color` | Albedo of the faceted teardrop crystals (pendeloques) and the round crystal ball at the bottom. |
| `beads` | color | `'#E1DBD5'` | any hex or `THREE.Color` | Albedo of the clear faceted beads that string the bowl-rim drops and the central pendant to the frame. |
| `bulb` | color | `'#f4f1ee'` | any hex or `THREE.Color` | Daytime albedo of the faceted flame-shaped candle bulbs on top of every sleeve; the night block lights this zone. |

## Specs

772 triangles, 2 material, 1.6 × 1.73 × 1.41 m, real-world scale.

Animatable parts (pivots sit at the hinge or axle): swing.

## Building this with an AI agent?

Point it at https://polyfork.dev/prompt.txt: the whole catalogue as working
instructions, no key needed to browse. There is an MCP server too, at https://polyfork.dev/mcp.

## License

```
Licence

THE MESH FILES (.glb, .fbx, .usdz, .usda, .obj, .mtl) are yours under
either licence, your choice:

1. CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
   Use, share, modify, re-upload and sell them, commercially too, as long as you
   credit Polyfork and say if you changed them. The credit line:
   Crystal Chandelier by Polyfork (https://polyfork.dev/asset/crystal-chandelier-55d279), CC BY 4.0

2. The Polyfork licence, below: no credit needed, but no redistributing the files.

EVERYTHING ELSE here, the ES modules (.mjs) above all, is under the
Polyfork licence only. CC BY does not cover it.

The Polyfork licence

Use these files in personal and commercial projects: games, apps, websites, client
work, products you sell. Modify freely. No attribution required. Do not resell or
redistribute the files themselves as assets, or use them to build or train a
COMMERCIAL 3D asset generator: a model, service or pipeline that produces 3D assets
and that you sell or offer to others. Personal experiments, research and learning
are fine. Breaking these terms can end your licence and your access, without a
refund.

Full terms: https://polyfork.dev/licensing
```

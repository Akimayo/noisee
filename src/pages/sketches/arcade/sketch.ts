import { ReactP5 } from "../../../components/SketchContent";

export interface ArcadeSketchProps {
	offsetX: number;
	offsetZ: number;
	waterLevel: number;
	mountainLevel: number;
	gridSize: number;
	terrainScale: number;
	athletic: boolean;
	setSurrounding: (surrounding: { [direction: string]: boolean }) => void;
}
export const ArcadeDefaultProps: ArcadeSketchProps = {
	offsetX: 0,
	offsetZ: 0,
	waterLevel: 0.4,
	mountainLevel: 0.65,
	gridSize: 50,
	terrainScale: 5e-2,
	athletic: false,
	setSurrounding: () => {},
};
export default (p: ReactP5<ArcadeSketchProps>) => {
	// Colors for the three world elements
	const waterColor = p.color(64, 128, 255),
		grassColor = p.color(32, 224, 8),
		mountainColor = p.color(128);
	// Theme colors
	let background = p.color(0),
		foreground = p.color(255),
		// Character movement
		offsetX = ArcadeDefaultProps.offsetX,
		offsetZ = ArcadeDefaultProps.offsetZ,
		// World generation settings
		waterLevel = ArcadeDefaultProps.waterLevel,
		mountainLevel = ArcadeDefaultProps.mountainLevel,
		// Size of a square/tile
		gridSize = ArcadeDefaultProps.gridSize,
		// Coordinate multiplier for noise, sets the scale of the world
		terrainScale = ArcadeDefaultProps.terrainScale,
		// Controls whether the character can swim and climb hills
		athletic = ArcadeDefaultProps.athletic,
		// Used with `athletic`, reports back to React whether you can click the arrow buttons
		setSurrounding = ArcadeDefaultProps.setSurrounding,
		// Helper values
		waterOffsetY = p.sqrt(gridSize),
		mountainOffsetY = waterOffsetY - gridSize,
		gridFitX = 0,
		gridFitZ = 0,
		lastSurrounding: { [direction: string]: boolean } = {};

	p.setup = () => {
		p.createCanvas(960, 720, p.WEBGL);
		gridFitX = (p.width / 2 / gridSize) | 0;
		gridFitZ = (p.height / 2 / gridSize) | 0;
		p.frameRate(10);
		p.noStroke();
	};

	p.draw = () => {
		// Clear the scene
		p.background(background);
		// Position the camera to look down on the world with a slight skew
		p.camera(2, -450, 170, 0, 0, 0, 0, 1, 0);
		// "God-light"
		p.pointLight(background, offsetX, -400, offsetZ);
		// Center the scene depth
		p.translate(0, 0, -gridSize);
		// Checks surrounding tiles, used with `athletic`
		const surrounding: { [direction: string]: boolean } = {
			f: true,
			r: true,
			b: true,
			l: true,
		};
		// Build the world
		for (let zn = -gridFitZ; zn < gridFitZ; zn++) {
			const z = zn * gridSize;
			for (let xn = -gridFitX; xn <= gridFitX; xn++) {
				p.push(); // Use relative coordiantes
				// Get value of Perlin noise in this point; uses movement offsets and world scale
				const noiseHere = p.noise(
						(gridFitX + xn + offsetX) * terrainScale,
						(gridFitZ + zn - offsetZ) * terrainScale
					),
					// Tile is a water body
					hasWater = noiseHere <= waterLevel,
					// Tile is a mountain
					hasMountain = noiseHere > mountainLevel,
					// Non-`athletic` character can go here
					canStep = !(hasWater || hasMountain),
					// Heights for water and mountains
					yOff = +hasWater * waterOffsetY + +hasMountain * mountainOffsetY;
				// Give water a blue color and shine
				if (hasWater) p.specularMaterial(waterColor);
				// Make mountains gray
				else if (hasMountain) p.ambientMaterial(mountainColor);
				// Make grass green
				else p.ambientMaterial(grassColor);
				// Set scene location to current relative coordinates
				p.translate(xn * gridSize, yOff, z);
				// Draw a tile
				p.box(gridSize);
				// Surrounding tiles:
				if (xn == 0) {
					// Forward tile
					if (zn == 0 && !athletic) surrounding.f = canStep;
					// Current tile:
					else if (zn == 1) {
						// Draw your character
						p.ambientMaterial(foreground);
						p.translate(0, -gridSize / 2, 0);
						p.cylinder(gridSize / 4, 12);
						// Draw a floatie for your character when they are swimming
						if (hasWater) {
							p.ambientMaterial(242, 242, 0);
							p.cylinder(gridSize / 3, 2);
						}
						// Draw a nice hat for your character when they are in the mountains
						else if (hasMountain) {
							p.ambientMaterial(waterColor);
							p.cylinder(gridSize / 5, 18);
						}
					}
					// Backward tile
					else if (zn == 2 && !athletic) surrounding.b = canStep;
				} else if (zn == 1 && !athletic) {
					// Left tile
					if (xn == -1) surrounding.l = canStep;
					// Right tile
					else if (xn == 1) surrounding.r = canStep;
				}
				p.pop(); // Drop relative coordinates
			}
		}
		// Report available directions to React only when they are different than in the previous frame
		Object.keys(surrounding).every((k) => !surrounding[k])
			? setSurrounding({ f: true, r: true, b: true, l: true })
			: Object.keys(surrounding).some(
					(k) => surrounding[k] != lastSurrounding[k]
			  ) && setSurrounding(surrounding);
		lastSurrounding = { ...surrounding };
	};

	// React state updates
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		background: b,
		foreground: f,
		offsetX: x,
		offsetZ: z,
		waterLevel: w,
		mountainLevel: m,
		gridSize: g,
		terrainScale: t,
		athletic: a,
		setSurrounding: s,
	}) => {
		b && (background = p.color(b));
		f && (foreground = p.color(f));
		x !== undefined && (offsetX = x);
		z !== undefined && (offsetZ = z);
		w !== undefined && (waterLevel = w);
		m && (mountainLevel = m);
		g &&
			(gridSize = g) &&
			// Set water a bit deeper
			(waterOffsetY = p.sqrt(gridSize)) &&
			// Set mountains higher
			(mountainOffsetY = waterOffsetY - gridSize) &&
			// Calculate the number of tiles that can fit in the scene and round down using bitwise OR
			(gridFitX = (p.width / 2 / gridSize) | 0) &&
			(gridFitZ = (p.height / 2 / gridSize) | 0);
		t && (terrainScale = t);
		a !== undefined && (athletic = a);
		s && (setSurrounding = s);
	};
};

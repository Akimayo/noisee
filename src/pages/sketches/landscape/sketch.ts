import { Vector } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface LandscapeSketchProps {
	depth: number;
	tessSide: number;
	offsetX: number;
	offsetY: number;
	offsetZ: number;
	reportFrameRate?: (frameTime: number) => void;
	useWireframe: boolean;
	renderClouds: boolean;
	renderTerrain: boolean;
	renderWater: boolean;
}
export const LandscapeDefaultProps: LandscapeSketchProps = {
	offsetX: 0,
	offsetY: 0,
	offsetZ: 0,
	depth: 80,
	tessSide: 40,
	reportFrameRate: () => {},
	useWireframe: false,
	renderClouds: true,
	renderTerrain: true,
	renderWater: true,
};
export default (p: ReactP5<LandscapeSketchProps>) => {
	const watercolor = p.color(128, 192, 255, 192),
		// Generates Perlin noise values adjusted for terrain
		getTerrainNoise = (x: number, z: number) =>
			p.height *
			p.noise((x + xOff) / (81 - tessSide), (z + zOff) / (81 - tessSide)),
		// Generates Perlin noise values with animation ajdusted for water
		getWaterNoise = (x: number, z: number) =>
			halfHeight + // Offset by half of terrain height
			tessHalf *
				p.noise((x + xOff) * wind.x, (z + zOff) * wind.y, p.frameCount * 1e-2),
		// Generates Perlin noise values with animation adjusted for clouds and covering the whole background
		getCloudNoise = (x: number, z: number) => {
			const noiseVal =
				p.noise(
					(x + xOff / (41 - tessHalf)) / 8,
					(z + zOff / (41 - tessHalf)) / 8,
					p.frameCount * 25e-4 // Animated with speed of 0.25% of frame rate
				) - 0.5; // Noise centered around zero witth values (-0.5;0.5)
			return (
				// Only render areas with positive values
				((+(noiseVal > 0) * noiseVal +
					// Adjust
					0.5) *
					p.height) /
					2 +
				// Curve down with depth to cover background
				p.map(p.log(depth + 1 - z), 5, 0, -halfHeight, halfHeight)
			);
		},
		buildTerrainLayer = (
			zn: number,
			z: number,
			noiseSource: (x: number, y: number) => number
		) => {
			let xn = -zn,
				x = xn * tessHalf,
				even;
			// Begin tesselated strip
			p.beginShape(p.TRIANGLE_STRIP);
			// Start vertex, bottom left of strip
			p.vertex(x, noiseSource((xn + 1) / 2, zn), z);
			for (xn; xn < tessWidthFit + zn; xn++) {
				// Even-value x-positions add vertices on the top of the strip, odd-valued on the bottom
				even = +!((xn + zn) & 1);
				const xn2 = xn / 2;
				p.vertex(x - tessHalf, noiseSource(xn2, zn + even), z + even * tessZ);
				p.vertex(
					x + tessHalf,
					noiseSource(xn2 + 1, zn + even),
					z + even * tessZ
				);
				x += tessHalf;
			}
			// End vertex, bottom right of strip
			p.vertex(x - tessHalf, noiseSource(xn / 2, zn), z);
			p.endShape();
		};
	// Offsets for moving through the "world"
	let xOff = LandscapeDefaultProps.offsetX,
		yOff = LandscapeDefaultProps.offsetY,
		zOff = LandscapeDefaultProps.offsetZ,
		// Depth of rendering
		depth = LandscapeDefaultProps.depth,
		// Sizes of tesselation simplices
		tessSide = LandscapeDefaultProps.tessSide,
		tessHalf = tessSide / 2,
		tessZ = -p.sqrt(p.sq(tessSide) - p.sq(tessHalf)) / 2, // Formula for height of an equilateral triangle, only half to give smoother result in chosen perspective
		// Theme colors
		background = p.color(0),
		foreground = p.color(255),
		// Reporting framerate to React
		reportFrameRate = LandscapeDefaultProps.reportFrameRate,
		// Enable/Disable wireframe
		wf = LandscapeDefaultProps.useWireframe,
		// Enable/Disable components
		clouds = LandscapeDefaultProps.renderClouds,
		terrain = LandscapeDefaultProps.renderTerrain,
		water = LandscapeDefaultProps.renderWater,
		// Helper values
		tessWidthFit = 0,
		halfHeight = 0;

	p.setup = () => {
		// Create canvas in HD definition with WebGL renderer
		p.createCanvas(1280, 720, p.WEBGL);
		// Define helper values for initial settings
		halfHeight = p.height / 2;
		tessWidthFit = p.width / tessHalf;
		tessWidthFit & 1 || tessWidthFit++;
	};

	let wind = p.createVector(0, 0);
	p.draw = () => {
		// Position camera to give a nice view, adjust with vertical offset to still point mostly at the "ground"
		p.camera(0, -yOff / 4, 10, 0, 0, 0, 0, 1, 0);
		// Clear the scene
		p.background(background);
		// Set a light in the top middle of the scene
		p.pointLight(background, 0, halfHeight, 0);
		// Offset the scene to have x=0 at the left and terrain at the bottom (+vertical offset)
		p.translate(-p.width / 2, 10 * yOff - p.height / 4);
		// Calculate random wind for water animaiton
		wind = Vector.fromAngle(p.noise(p.frameCount * 1e-5) * 2 * p.TWO_PI);
		// Render scene in strips
		for (let zn = 0; zn < depth; zn++) {
			const z = zn * tessZ;
			p.fill(255);
			if (terrain) {
				//#region Terrain
				if (wf) {
					p.stroke(foreground);
				} else {
					p.noStroke();
					p.ambientMaterial(foreground);
				}
				buildTerrainLayer(zn, z, getTerrainNoise);
				//#endregion
			}
			if (water) {
				//#region Water
				if (wf) p.stroke(watercolor);
				else p.ambientMaterial(watercolor);
				buildTerrainLayer(zn, z, getWaterNoise);
				//#endregion
			}
			if (clouds) {
				//#region Clouds
				if (wf) p.stroke(background);
				else p.ambientMaterial(background);
				buildTerrainLayer(zn, z, getCloudNoise);
				//#endregion
			}
		}
		// Report framerate to React when enabled
		reportFrameRate && reportFrameRate(p.frameRate());
	};

	// Change settings according to React components
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		background: b,
		foreground: f,
		offsetX: x,
		offsetY: y,
		offsetZ: z,
		depth: d,
		tessSide: s,
		reportFrameRate: r,
		useWireframe: w,
		renderClouds: c,
		renderTerrain: t,
		renderWater: a,
	}) => {
		b && (background = p.color(b));
		f && (foreground = p.color(f));
		x !== undefined && (xOff = x);
		y !== undefined && (yOff = y);
		z !== undefined && (zOff = z);
		r && (reportFrameRate = r);
		w !== undefined && (wf = w);
		c !== undefined && (clouds = c);
		t !== undefined && (terrain = t);
		a !== undefined && (water = a);
		d && (depth = d);
		s &&
			(tessSide = s) &&
			(tessHalf = tessSide / 2) &&
			(tessZ = -p.sqrt(p.sq(tessSide) - p.sq(tessHalf)) / 2) &&
			(tessWidthFit = p.width / tessHalf) &&
			(tessWidthFit & 1 || tessWidthFit++);
	};
};

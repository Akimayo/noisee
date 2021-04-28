import { ReactP5 } from "../../../components/SketchContent";

export interface SmokeSketchProps {}
export const SmokeDefaultProps: SmokeSketchProps = {};
export default (p: ReactP5<SmokeSketchProps>) => {
	let background = p.color(0),
		foreground = p.color(255);
	const emberShape = p.createGraphics(64, 32),
		emberMask = p.createImage(64, 32);
	p.setup = () => {
		p.createCanvas(1280, 480, p.P2D);
		// Create the shape of the ember
		emberShape.noStroke();
		emberShape.beginShape();
		emberShape.curveVertex(0, emberShape.height);
		emberShape.curveVertex(8, emberShape.height - 16);
		emberShape.curveVertex(24, emberShape.height - 24);
		emberShape.curveVertex(36, emberShape.height - 16);
		emberShape.curveVertex(48, emberShape.height - 16);
		emberShape.curveVertex(64, emberShape.height);
		emberShape.endShape(p.CLOSE);
		// Convert shape into image, which can be used as a mask
		emberMask.copy(
			emberShape,
			0,
			0,
			emberShape.width,
			emberShape.height,
			0,
			0,
			emberShape.width,
			emberShape.height
		);
	};
	p.draw = () => {
		p.background(background);
		const ember = p.createImage(64, 32);
		// Create a texture using Perlin noise
		ember.loadPixels();
		const d = p.pixelDensity();
		let index: number, noise: number;
		for (let x = 0; x < ember.width; x++) {
			for (let y = 0; y < ember.height; y++) {
				for (let i = 0; i < d; i++) {
					for (let j = 0; j < d; j++) {
						index = 4 * ((y * d + j) * ember.width * d + (x * d + i));
						noise = p.noise(x * 2e-2, y * 2e-2, p.frameCount * 1e-2);
						ember.pixels[index + 0] = 192;
						ember.pixels[index + 1] = (noise * 128) | 0;
						ember.pixels[index + 2] = 0;
						ember.pixels[index + 3] = 255;
					}
				}
			}
		}
		ember.updatePixels();
		// Mask texture with shape
		ember.mask(emberMask);
		// Render texured ember
		p.image(ember, p.width / 2 - 32, p.height - 24, 64, 24);
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		background: b,
		foreground: f,
	}) => {
		b && (background = p.color(b));
		f && (foreground = p.color(f));
	};
};

import { Color } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export enum WaveFunction {
	SINE = "sine",
	SQUARE = "square",
	SAW = "saw",
	TRIANGLE = "triangle",
	CONSTANT = "constant",
}
export interface InterferenceSketchProps {
	func: WaveFunction;
	ampl: number;
	octaves: number;
}
export default (p: ReactP5<InterferenceSketchProps>) => {
	// period of wave function
	const freqm = 255,
		// half of the perid, floored
		freqn = (freqm / 2) | 0,
		// Breaking points for triangle wave
		freqi = (freqm + 1) / 4,
		freqj = freqm + 1 - freqi;
	let background: Color = p.color("black"),
		foreground: Color = p.color("red"),
		// This array is used as a queue and holds all the values that
		// get rendered onto the canvas
		wave: number[] = [],
		func: WaveFunction = WaveFunction.CONSTANT,
		ampl: number = 0.1,
		octaves: number = 1;
	p.setup = () => {
		// Define the canvas, use HD resolution and a 2D renderer
		p.createCanvas(1280, 720, p.P2D);
		// Degrees are easier to work with, used in the sine function
		p.angleMode(p.DEGREES);
	};
	p.draw = () => {
		// We use number of frames elapsed as a time measurement
		// and confine it into the range of the period, therefore
		// working with a "time relative to period start"
		let a = p.frameCount & freqm;
		switch (func) {
			case WaveFunction.SAW:
				// Saw wave rises...rises...rises, and then falls to zero
				wave.unshift((a - freqn) / freqn);
				break;
			case WaveFunction.SINE:
				// It's a sine wave. That's it.
				wave.unshift(p.sin((a / freqm) * 360));
				break;
			case WaveFunction.SQUARE:
				// Sqare wave is either at +1 or -1, no inbetween
				wave.unshift(a > freqn ? -1 : 1);
				break;
			case WaveFunction.TRIANGLE:
				// Rises for the first quarter period, to +1
				if (a < freqi) wave.unshift(p.map(a, 0, freqi, 0, 1));
				// Then falls for the next two querter periods to -1
				else if (a < freqj) wave.unshift(p.map(a, freqi, freqj, 1, -1));
				// And finally rises back to 0 for the remaining quarter period
				else wave.unshift(p.map(a, freqj, freqm, -1, 0));
				break;
			default:
				wave.unshift(0);
				break;
		}
		// Sets the number of noise layers, or how detailed the noise is
		p.noiseDetail(octaves, 0.5);
		// Add noise to the generated signal. Noise doesn't care about the
		// period, it's just helpful to keep it related so that the noise
		// makes a noticeable difference when using shorter periods.
		wave[0] += (p.noise(p.frameCount / freqi) - 0.5) * ampl;
		// Pop off the values that are "unshifted" outside the canvas
		while (wave.length > p.width) wave.pop();
		// Clear the canvas
		p.background(background);
		// Set style
		p.stroke(foreground);
		p.strokeWeight(2);
		p.noFill();
		// We draw the wave as a single "shape", which is significantly
		// faster than rendering it as a series of lines manually
		p.beginShape();
		wave.forEach((v, i) =>
		// Draw all the values, index is used as the x-coordinate and
		// the wave amplitude is used as y-coordinate
			p.vertex(p.width - i, ((-v / 2 + 1) * p.height) / 2)
		);
		// We don't want to close the shape, that would cause a line going
		// from the leftmost point all the way back to the rightmost one.
		p.endShape();
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		background: b,
		foreground: f,
		func: w,
		ampl: a,
		octaves: o,
	}) => {
		b && (background = p.color(b));
		f && (foreground = p.color(f));
		w && (func = w);
		a !== undefined && (ampl = a);
		o && (octaves = o);
	};
};

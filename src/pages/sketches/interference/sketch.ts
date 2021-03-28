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
	let background: Color = p.color("black"),
		foreground: Color = p.color("red"),
		wave: number[] = [],
		func: WaveFunction = WaveFunction.CONSTANT,
		ampl: number = 0.1,
		octaves: number = 1;
	p.setup = () => {
		p.createCanvas(1280, 720, p.P2D);
		p.angleMode(p.DEGREES);
	};
	p.draw = () => {
		let a = p.frameCount & 127;
		switch (func) {
			case WaveFunction.SAW:
				wave.unshift((a - 63) / 63);
				break;
			case WaveFunction.SINE:
				wave.unshift(p.sin((a / 128) * 360));
				break;
			case WaveFunction.SQUARE:
				wave.unshift(a > 63 ? -1 : 1);
				break;
			case WaveFunction.TRIANGLE:
				if (a < 32) wave.unshift(p.map(a, 0, 31, 0, 1));
				else if (a < 96) wave.unshift(p.map(a, 32, 92, 1, -1));
				else wave.unshift(p.map(a, 96, 127, -1, 0));
				break;
			default:
				wave.unshift(0);
				break;
		}
		for (let i = 0; i < octaves; i++)
			wave[0] +=
				((p.noise(p.frameCount / (127 / 2 ** i)) - 0.5) / 2 ** (-1 + i)) * ampl;
		while (wave.length > p.width) wave.pop();
		p.background(background);
		p.stroke(foreground);
		p.strokeWeight(2);
		p.noFill();
		p.beginShape();
		wave.forEach((v, i) =>
			p.vertex(p.width - i, ((-v / 2 + 1) * p.height) / 2)
		);
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

import p5 from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface SimpleSketchProps {
	speed: number;
	amplitude: number;
}
export default (p: ReactP5<SimpleSketchProps>) => {
	let speed: number = 0.01;
	let amplitude: number = 1;
	let background: p5.Color = p.color("gray");
	let foreground: p5.Color = p.color("black");
	const items: number[] = [];
	const count = 200;
	let offset = 0;

	p.setup = () => {
		p.createCanvas(1280, 720, p.P2D);
	};

	p.draw = () => {
		p.background(background);
		const usefulAmpl = p.map(amplitude, 0, 1, 0, p.height / 2);
		// Add new noise point to history
		items.unshift(
			p.height / 2 -
				p.map(p.noise(offset++ * speed), 0, 1, -usefulAmpl, usefulAmpl)
		);
		// Keep only up to `count` items in history
		while (items.length > count) items.pop();
		// Draw
		p.stroke(foreground);
		p.strokeWeight(2);
		p.fill(foreground);
		p.ellipse(p.width, items[0], 8);
		p.noFill();
		p.beginShape();
		for (let i = 0; i < items.length; i++)
			p.vertex(p.map(i, 0, count, p.width, 0), items[i]);
		p.endShape();
	};

	p.myCustomRedrawAccordingToNewPropsHandler = ({
		speed: s,
		amplitude: a,
		background: b,
		foreground: f,
	}) => {
		if (s) speed = s;
		if (a) amplitude = a;
		if (b) background = p.color(b);
		if (f) foreground = p.color(f);
	};
};

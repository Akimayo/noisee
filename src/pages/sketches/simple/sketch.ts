import p5 from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface SimpleSketchProps {
	speed: number;
	amplitude: number;
}
export default (p: ReactP5<SimpleSketchProps>) => {
	let speed: number = 0.01;
	let amplitude: number = 1;
	let background: p5.Color = p.color("black");
	let foreground: p5.Color = p.color("red");

	p.setup = () => {
		p.createCanvas(1280, 720, p.P2D);
		p.noLoop();
		p.redraw();
	};

	p.draw = () => {
		p.background(background);
		p.stroke(foreground);
		p.strokeWeight(2);
		p.noFill();
		const usefulAmpl = p.map(amplitude, 0, 1, 0, p.height / 2);
		p.beginShape();
		for (let i = 0; i < p.width; i++)
			p.vertex(
				i,
				p.height / 2 - p.map(p.noise(i * speed), 0, 1, -usefulAmpl, usefulAmpl)
			);
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
		(s || a || b || f) && p.redraw();
	};
};

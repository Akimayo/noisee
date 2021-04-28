import { Vector } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface FlowerSketchProps {
	layers: number;
	spacing: number;
	step: number;
	rotate: boolean;
	useVectorTransform: boolean;
}
export const FlowerDefaultProps: FlowerSketchProps = {
	layers: 40,
	spacing: 5,
	step: 4.5,
	rotate: true,
	useVectorTransform: false,
};
export default (p: ReactP5<FlowerSketchProps>) => {
	const degreeRads = 0.0174532925;
	let background = p.color(0),
		foreground = p.color(255),
		accent = p.color(255, 8),
		layers = FlowerDefaultProps.layers,
		spacing = FlowerDefaultProps.spacing,
		step = FlowerDefaultProps.step,
		rotate = FlowerDefaultProps.rotate,
		useVectorTransform = FlowerDefaultProps.useVectorTransform;
	p.setup = () => {
		p.createCanvas(1280, 720, p.P2D);
	};
	p.draw = () => {
		p.background(background);
		p.stroke(foreground);
		p.strokeWeight(1);
		p.fill(accent);
		p.translate(p.width / 2, p.height / 2);
		const time = p.frameCount / 1000;
		for (let i = layers; i > 0; i--) {
			const radius2 = (i * spacing) / 2;
			let v: Vector, n: number;
			p.beginShape();
			for (let a = 0; a < p.TWO_PI; a += degreeRads) {
				v = Vector.fromAngle(a);
				n = p.noise(v.x * step, v.y * step, +rotate * time);
				v.setMag(radius2 * 2);
				v = useVectorTransform
					? v.add(Vector.fromAngle(n * 2 * p.TWO_PI, radius2))
					: v.add(n * radius2, n * radius2);
				rotate && (v = v.rotate(time));
				p.vertex(v.x, v.y);
			}
			p.endShape(p.CLOSE);
		}
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		background: b,
		foreground: f,
		layers: l,
		spacing: s,
		step: t,
		rotate: r,
		useVectorTransform: v,
	}) => {
		b && (background = p.color(b));
		l && (layers = l) && accent.setAlpha((255 / layers) | 0);
		f &&
			(foreground = p.color(f)) &&
			(accent = p.color(f)) &&
			accent.setAlpha((255 / layers) | 0);
		s && (spacing = s);
		t && (step = t);
		r !== undefined && (rotate = r);
		v !== undefined && (useVectorTransform = v);
	};
};

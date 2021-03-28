import { Color } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface TopographySketchProps {
	classes: number;
}
export default (p: ReactP5<TopographySketchProps>) => {
	let foreground: Color = p.color("red"),
		background: Color = p.color("black"),
		classes: number = 2;
	const black: Color = p.color(0),
		step: number = 10;
	p.setup = () => {
		p.createCanvas(640, 360, p.WEBGL);
		p.noLoop();
		p.redraw();
	};
	p.draw = () => {
		p.background(background);
		p.translate(-p.width / 2, -p.height / 2);
		p.rectMode(p.CORNER);
		p.noStroke();
		const colorStep = 255 / classes,
			valueStep = 1 / classes;
		foreground.setAlpha(colorStep);
		p.fill(foreground);
		p.rect(0, 0, p.width, p.height);
		const grid: number[][] = [];
		for (let x = 0; x < p.width; x += step) {
			grid[x] = [];
			for (let y = 0; y < p.height; y += step)
				for (let c = 1; c < classes; c++)
					if (p.noise(x * 1e-2, y * 1e-2) > c * valueStep) {
						grid[x][y] = c;
					}
		}
		const follow = (x: number, y: number, c: number) => {
			grid[x][y] = -1;
			if (y > 0) 
			grid[x][y] = -0;
		};
		for (let c = 1; c < classes; c++) {
			foreground.setAlpha(colorStep * (c + 1));
			for (let x = 0; x < grid.length; x++)
				for (let y = 0; y < grid[x].length; y++)
					if (grid[x][y] === c){
						p.beginShape();
						follow(x, y, c);
						p.endShape();
					}
		}
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		foreground: f,
		background: b,
		classes: c,
	}) => {
		f && (foreground = p.color(f));
		b && (background = p.color(b));
		c && (classes = c);
		(f || b || c) && p.redraw();
	};
};

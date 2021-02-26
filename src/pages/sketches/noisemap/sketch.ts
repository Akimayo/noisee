import { Color } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface NoiseMapSketchProps {
	scale: number;
	quality: number;
}
export default (p: ReactP5<NoiseMapSketchProps>) => {
	const rectSizes = [16, 8, 1];

	let scale: number = 0.01;
	let fg: Color = p.color("red"),
		bg: Color = p.color("black");
	let quality: number = 0;
	let pixels: number[] = [];
	let pixelsWidth: number = 1;

	p.setup = () => {
		p.createCanvas(1280, 720, p.P2D);
		p.rectMode("corner");
		p.noLoop();
		p.redraw();
	};

	p.draw = () => {
		p.background(bg);
		p.noStroke();
		const rect = rectSizes[quality];
		pixels.forEach((v, i) => {
			fg.setAlpha(v * 100);
			p.fill(fg);
			p.rect(
				(i % pixelsWidth) * rect,
				((i / pixelsWidth) >> 0) * rect,
				rect,
				rect
			);
		});
	};

	p.myCustomRedrawAccordingToNewPropsHandler = ({
		scale: s,
		background: b,
		foreground: f,
		quality: q,
	}) => {
		b && (bg = p.color(b));
		f && (fg = p.color(f));
		if (s || q !== undefined) {
			s && (scale = s);
			q !== undefined && (quality = q);
			const rect = rectSizes[quality];
			if (p.width) {
				pixels = [];
				pixelsWidth = p.width / rect;
				const pixelsHeight = p.height / rect;
				for (let x = 0; x < pixelsWidth; x++) {
					for (let y = 0; y < pixelsHeight; y++) {
						pixels[y * pixelsWidth + x] = p.noise(
							x * scale * rect,
							y * scale * rect
						);
					}
				}
			}
		}
		p.redraw();
	};
};

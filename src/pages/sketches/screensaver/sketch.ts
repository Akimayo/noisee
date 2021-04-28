import { Vector } from "p5";
import { ReactP5 } from "../../../components/SketchContent";

export interface ScreensaverSketchProps {
	particleCount: number;
	fieldStrength: number;
	tiles: number;
}
export const ScreensaverDefaultProps: ScreensaverSketchProps = {
	particleCount: 4,
	fieldStrength: 0.1,
	tiles: 2,
};
export default (p: ReactP5<ScreensaverSketchProps>) => {
	const particles: Particle[] = [],
		field: Vector[][] = [];
	let particleCount = 10 ** ScreensaverDefaultProps.particleCount,
		fieldStrength = ScreensaverDefaultProps.fieldStrength,
		fitVertical = 9 * ScreensaverDefaultProps.tiles,
		fitHorizontal = 16 * ScreensaverDefaultProps.tiles,
		spanVertical = 0,
		spanHorizontal = 0,
		spanVerticalHalf = 0,
		spanHorizontalHalf = 0,
		bounds: Vector;
	p.setup = () => {
		p.createCanvas(1920, 1080, p.P2D);
		spanVertical = p.height / fitVertical;
		spanHorizontal = p.width / fitHorizontal;
		spanVerticalHalf = spanVertical / 2;
		spanHorizontalHalf = spanHorizontal / 2;
		bounds = p.createVector(p.width - 1, p.height - 1);
		p.colorMode(p.HSB, 255);
		p.frameRate(144);
		p.background(0);
	};
	p.draw = () => {
		// Not setting background here to keep trails of the particles
		let vector: Vector;
		for (let x = 0; x < fitHorizontal; x++) {
			field.length > x || field.push([]);
			for (let y = 0; y < fitVertical; y++) {
				vector = Vector.fromAngle(
					// Get an angle in radians from Perlin noise
					p.noise(x * 1e-1, y * 1e-1, p.frameCount * 5e-3) * 2 * p.TWO_PI
				)
					// Set force strength (vector magnitude)
					.setMag(fieldStrength);
				field[x][y] = vector;
			}
		}
		p.stroke((p.frameCount / 100) & 255, 255, 255, 1);
		let particle: Particle, position: Vector;
		for (let i = 0; i < particles.length; i++) {
			particle = particles[i];
			position = particle.position;
			position = particle.update(
				field[p.floor(position.x / spanHorizontal)][
					p.floor(position.y / spanVertical)
				]
			);
			p.point(position.x, position.y);
		}
	};
	p.myCustomRedrawAccordingToNewPropsHandler = ({
		particleCount: c,
		fieldStrength: s,
		tiles: t,
	}) => {
		if (c) {
			particleCount = 10 ** c;
			particles.slice();
			for (let i = 0; i < particleCount; i++)
				particles[i] = new Particle(bounds);
		}
		s && (fieldStrength = s);
		t &&
			(fitHorizontal = 16 * t) &&
			(fitVertical = 9 * t) &&
			(spanHorizontal = p.width / fitHorizontal) &&
			(spanVertical = p.height / fitVertical) &&
			(spanHorizontalHalf = spanHorizontal / 2) &&
			(spanVerticalHalf = spanVertical / 2);
		p.background(0);
	};
};

class Particle {
	// Particle's position
	private pos: Vector;
	public get position() {
		return this.pos.copy();
	}
	// Particle's velocity
	private vel: Vector;
	// Particle's acceleration
	private acc: Vector;
	// Canvas area to which the particle is bound
	private bounds: Vector;
	constructor(bounds: Vector) {
		// Random position on screen
		// Vector.random2D() always gives a vector with a magnitude of 1, therefore is not useful here
		this.pos = new Vector();
		this.pos.x = Math.random() * bounds.x;
		this.pos.y = Math.random() * bounds.y;
		// Initialize with random momentum
		this.vel = Vector.random2D();
		this.acc = Vector.random2D();
		// Register canvas bounds
		this.bounds = bounds;
	}
	update(force: Vector) {
		// Take effect of force
		this.acc = this.acc.add(force).limit(1);
		// Accelerate; limit velocity to 1 to prevent gaps between frames
		this.vel = this.vel.add(this.acc).limit(1);
		// Move
		this.pos = this.pos.add(this.vel);
		// Restrict the particle's position to within the bounds (canvas size)
		if (this.pos.x >= this.bounds.x) this.pos.x = 0;
		else if (this.pos.x < 0) this.pos.x = this.bounds.x;
		if (this.pos.y >= this.bounds.y) this.pos.y = 0;
		else if (this.pos.y < 0) this.pos.y = this.bounds.y;
		// Return position to render loop
		return this.pos.copy();
	}
}

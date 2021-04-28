import Intro from "../pages/intro";
import Thesis from "../pages/thesis";
import SketchesIndex from "../pages/sketches";
import Simple from "../pages/sketches/simple";
import App from "../pages/app";
import NoiseMap from "../pages/sketches/noisemap";
import Gen from "../pages/gen";
import Interference from "../pages/sketches/interference";
import Topography from "../pages/sketches/topography";
import Landscape from "../pages/sketches/landscape";
import Arcade from "../pages/sketches/arcade";
import Screensaver from "../pages/sketches/screensaver";
import Smoke from "../pages/sketches/smoke";
import Flower from "../pages/sketches/flower";

export interface RoutedObject {
	key: string;
	body: React.FC;
	icon?: string;
	isDefault?: boolean;
	isEnabled?: boolean;
	children?: RoutedObject[];
	isVisible?: boolean;
}
export const Sketches = [
	{ key: "sketches.simple", body: Simple, icon: "CompassNW" },
	{ key: "sketches.noisemap", body: NoiseMap, icon: "CompassNW" },
	{ key: "sketches.interference", body: Interference, icon: "LineChart" },
	{ key: "sketches.flower", body: Flower, icon: "Flower" },
	// { key: "sketches.topography", body: Topography, icon: "GridViewMedium" },
	{ key: "sketches.arcade", body: Arcade, icon: "Game" },
	{ key: "sketches.landscape", body: Landscape, icon: "PictureFill" },
	{ key: "sketches.screensaver", body: Screensaver, icon: "Stop" },
	// { key: "sketches.smoke", body: Smoke, icon: "GridViewSmall" },
] as RoutedObject[];

export const Routes = [
	{ key: "intro", body: Intro, icon: "Home", isDefault: true },
	{ key: "thesis", body: Thesis, icon: "Education" },
	{
		key: "sketches.$",
		body: SketchesIndex,
		isEnabled: true,
		children: Sketches,
	},
	{ key: "app", body: App, icon: "WebAppBuilderFragment" },
	{ key: "gen", body: Gen, icon: "ImageDiff", isVisible: false },
] as RoutedObject[];
export const PathPrefix: string = process.env.REACT_APP_HOME_PATH || "";

import Intro from "../pages/intro";
import Thesis from "../pages/thesis";
import SketchesIndex from "../pages/sketches";
import Simple from "../pages/sketches/simple";
import App from "../pages/app";

export interface RoutedObject {
	key: string;
	body: React.FC;
	icon?: string;
	isDefault?: boolean;
	isEnabled?: boolean;
	children?: RoutedObject[];
}
export const Sketches = [
	{ key: "sketches.simple", body: Simple, icon: "CompassNW" },
] as RoutedObject[];
export const Routes = [
	{ key: "intro", body: Intro, icon: "Home", isDefault: true },
	{ key: "thesis", body: Thesis, icon: "Education", isEnabled: false },
	{
		key: "sketches.$",
		body: SketchesIndex,
		isEnabled: true,
		children: Sketches,
	},
	{ key: "app", body: App, icon: "WebAppBuilderFragment", isEnabled: false },
] as RoutedObject[];

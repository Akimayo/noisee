import { Slider } from "office-ui-fabric-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";
import sketch, { TopographySketchProps } from "./sketch";

const Topography: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const isMobile = useIsMobile();
	const [classes, setClasses] = useState(2);
	return (
		<SketchContent
			bodyLocation={toText}
			sketch={sketch}
			sketchProps={{ classes } as TopographySketchProps}
		>
			<Slider
				value={classes}
				onChange={setClasses}
				vertical={!isMobile}
				min={2}
				max={5}
				step={1}
				snapToStep
				label={t("classes")}
			/>
		</SketchContent>
	);
};
export default Topography;

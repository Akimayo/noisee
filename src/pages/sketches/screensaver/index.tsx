import { Slider } from "office-ui-fabric-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";
import sketch, {
	ScreensaverDefaultProps,
	ScreensaverSketchProps,
} from "./sketch";

const Screensaver: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | null | undefined;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const [particleCount, setParticleCount] = useState(
		ScreensaverDefaultProps.particleCount
	);
	const [fieldStrength, setFieldStrength] = useState(
		ScreensaverDefaultProps.fieldStrength
	);
	const [tiles, setTiles] = useState(ScreensaverDefaultProps.tiles);
	const isMobile = useIsMobile();
	return (
		<SketchContent
			sketch={sketch}
			sketchProps={{ particleCount, tiles } as ScreensaverSketchProps}
			bodyLocation={toText}
		>
			<Slider
				vertical={!isMobile}
				label={t("particles")}
				min={1}
				max={5}
				value={particleCount}
				onChange={setParticleCount}
				valueFormat={(v) => (10 ** v).toString()}
			/>
			<Slider
				vertical={!isMobile}
				label={t("force")}
				min={0.1}
				max={8}
				step={0.1}
				value={fieldStrength}
				onChange={setFieldStrength}
				valueFormat={(v) => v.toFixed(2)}
			/>
			<Slider
				vertical={!isMobile}
				label={t("tiles")}
				min={1}
				max={10}
				value={tiles}
				onChange={setTiles}
				valueFormat={(v) => `${16 * v}×${9 * v}`}
			/>
		</SketchContent>
	);
};
export default Screensaver;

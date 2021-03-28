import { Slider } from "@fluentui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";

import sketch, { SimpleSketchProps } from "./sketch";

const Simple: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const [speed, setSpeed] = useState<number>(0.01);
	const [amplitude, setAmplitude] = useState<number>(1);
	const isMobile = useIsMobile();
	return (
		<SketchContent
			bodyLocation={toText}
			sketch={sketch}
			sketchProps={
				{
					speed,
					amplitude,
				} as SimpleSketchProps
			}
		>
				<Slider
					label={t("step")}
					min={0.0025}
					max={0.04}
					step={0.0025}
					value={speed}
					valueFormat={(v) => v.toFixed(4)}
					onChange={setSpeed}
					vertical={!isMobile}
				/>
				<Slider
					label={t("amplitude")}
					min={0.1}
					max={1.5}
					step={0.1}
					value={amplitude}
					valueFormat={(v) => `${Math.floor(v * 100)}%`}
					onChange={setAmplitude}
					vertical={!isMobile}
				/>
		</SketchContent>
	);
};
export default Simple;

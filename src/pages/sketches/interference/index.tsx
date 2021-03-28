import {
	ChoiceGroup,
	IChoiceGroupOption,
	Slider,
} from "office-ui-fabric-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";
import sketch, { InterferenceSketchProps, WaveFunction } from "./sketch";

const Interference: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const isMobile = useIsMobile();
	const [func, setFunc] = useState(WaveFunction.CONSTANT);
	const [ampl, setAmpl] = useState(0.1);
	const [octaves, setOctaves] = useState(1);
	return (
		<SketchContent
			bodyLocation={toText}
			sketch={sketch}
			sketchProps={{ func, ampl, octaves } as InterferenceSketchProps}
		>
			<Slider
				vertical={!isMobile}
				min={0}
				max={2}
				step={0.1}
				valueFormat={(v) => v.toFixed(1)}
				value={ampl}
				onChange={setAmpl}
				label={t("interferenceAmplitude")}
			/>
			<Slider
				vertical={!isMobile}
				min={1}
				max={10}
				value={octaves}
				onChange={setOctaves}
				label={t("octaves")}
				snapToStep
			/>
			<ChoiceGroup
				selectedKey={func}
				options={Object.keys(WaveFunction).map(
					(e) =>
						({
							key: e.toLowerCase(),
							text: t(`functions.${e.toLowerCase()}`),
						} as IChoiceGroupOption)
				)}
				onChange={(_, opt) => opt && setFunc(opt.key as WaveFunction)}
				label={t("function")}
			/>
		</SketchContent>
	);
};
export default Interference;

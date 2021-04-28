import { Slider, StackItem, Toggle } from "office-ui-fabric-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";

import sketch, { FlowerSketchProps, FlowerDefaultProps } from "./sketch";

const Flower: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	const isMobile = useIsMobile();
	let toText: string | null | undefined;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const [layers, setLayers] = useState(FlowerDefaultProps.layers);
	const [spacing, setSpacing] = useState(FlowerDefaultProps.spacing);
	const [step, setStep] = useState(FlowerDefaultProps.step);
	const [rotate, setRotate] = useState(FlowerDefaultProps.rotate);
	const [useVectorTransform, setVectorTransform] = useState(
		FlowerDefaultProps.useVectorTransform
	);
	return (
		<SketchContent
			sketch={sketch}
			sketchProps={
				{
					layers,
					spacing,
					step,
					rotate,
					useVectorTransform,
				} as FlowerSketchProps
			}
			bodyLocation={toText}
		>
			<Slider
				vertical={!isMobile}
				label={t("layers")}
				value={layers}
				min={1}
				max={100}
				step={1}
				onChange={setLayers}
			/>
			<Slider
				vertical={!isMobile}
				label={t("spacing")}
				value={spacing}
				min={1}
				max={8}
				step={0.5}
				valueFormat={(v) => v.toFixed(1)}
				onChange={setSpacing}
			/>
			<Slider
				vertical={!isMobile}
				label={t("step")}
				value={step}
				min={0.01}
				max={8}
				step={0.01}
				valueFormat={(v) => v.toFixed(2)}
				onChange={setStep}
			/>
			<StackItem>
				<Toggle
					label={t("rotate.$")}
					onText={t("rotate.on")}
					offText={t("rotate.off")}
					checked={rotate}
					onChange={(_, v) => setRotate(!!v)}
				/>
				<Toggle
					label={t("transform.$")}
					onText={t("transform.vector")}
					offText={t("transform.scalar")}
					checked={useVectorTransform}
					onChange={(_, v) => setVectorTransform(!!v)}
				/>
			</StackItem>
		</SketchContent>
	);
};
export default Flower;

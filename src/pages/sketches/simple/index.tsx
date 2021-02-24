import { Slider, Stack } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaPredicate } from "react-media-hook";
import SketchContent from "../../../components/SketchContent";

import sketch, { SimpleSketchProps } from "./sketch";

const Simple: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const palette = useTheme().palette;
	const [speed, setSpeed] = useState<number>(0.01);
	const [amplitude, setAmplitude] = useState<number>(1);
	const [background, setBackground] = useState<string>(
		palette.neutralQuaternary
	);
	const [foreground, setForeground] = useState<string>(palette.accent);
	useEffect(() => {
		setForeground(palette.accent);
		setBackground(palette.neutralQuaternary);
	}, [palette]);
	const isMobile = useMediaPredicate("(max-width: 900px)");
	return (
		<SketchContent
			bodyLocation={toText}
			sketch={sketch}
			sketchProps={
				{
					background,
					foreground,
					speed,
					amplitude,
				} as SimpleSketchProps
			}
		>
			<Stack
				horizontal={!isMobile}
				styles={{ root: { height: "calc(100% - 32px)" } }}
			>
				<Slider
					label={t("simple.speed")}
					min={0.0025}
					max={0.04}
					step={0.0025}
					value={speed}
					valueFormat={(v) => v.toFixed(4)}
					onChange={setSpeed}
					vertical={!isMobile}
				/>
				<Slider
					label={t("simple.amplitude")}
					min={0.1}
					max={1.5}
					step={0.1}
					value={amplitude}
					valueFormat={(v) => `${Math.floor(v * 100)}%`}
					onChange={setAmplitude}
					vertical={!isMobile}
				/>
			</Stack>
		</SketchContent>
	);
};
export default Simple;

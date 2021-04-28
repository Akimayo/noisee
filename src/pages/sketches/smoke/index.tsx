import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import sketch, { SmokeSketchProps, SmokeDefaultProps } from "./sketch";

const Smoke: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toBody: string | null | undefined;
	try {
		toBody = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toBody = null;
	}
	return (
		<SketchContent
			sketch={sketch}
			sketchProps={{} as SmokeSketchProps}
			bodyLocation={toBody}
		></SketchContent>
	);
};
export default Smoke;

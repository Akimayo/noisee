import React from "react";
import { useTranslation } from "react-i18next";
import StaticContent from "../../components/StaticContent";

import "./align-images.scss";

const Intro: React.FC = () => {
	const { i18n } = useTranslation();
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	return <StaticContent bodyLocation={toText} />;
};
export default Intro;

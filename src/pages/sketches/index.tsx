import { PrimaryButton } from "@fluentui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import StaticContent from "../../components/StaticContent";

const Intro: React.FC = () => {
	const { t, i18n } = useTranslation();
	const browserHistory = useHistory();
	let toBody: string | undefined | null;
	try {
		toBody = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toBody = null;
	}
	return (
		<StaticContent bodyLocation={toBody} childrenAfter>
			<PrimaryButton
				onClick={() => browserHistory.push("/sketches/simple")}
				iconProps={{ iconName: "Forward" }}
				text={t("sketches.simple")}
			/>
		</StaticContent>
	);
};
export default Intro;

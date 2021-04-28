import React from "react";
import { useTranslation } from "react-i18next";
import StaticContent from "../../components/StaticContent";

const App: React.FC = () => {
	const { i18n } = useTranslation();
	let toText: string | null | undefined;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	return <StaticContent bodyLocation={toText} />;
};
export default App;

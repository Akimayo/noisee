import { DefaultButton } from "office-ui-fabric-react";
import React from "react";
import { useTranslation } from "react-i18next";
import StaticContent from "../../components/StaticContent";
import { PathPrefix } from "../../lib/routing";

const Gen: React.FC = () => {
	const { i18n, t } = useTranslation();
	let toText: string | null | undefined;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	return (
		<StaticContent bodyLocation={toText} childrenAfter>
			<DefaultButton
				onClick={() => window.open(PathPrefix + "/ciesla-bp-gen.zip", "_blank")}
				iconProps={{ iconName: "ZipFolder" }}
				text={t("downloadGen")}
			/>
		</StaticContent>
	);
};
export default Gen;

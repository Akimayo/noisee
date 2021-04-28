import { DefaultButton, PrimaryButton, Text } from "office-ui-fabric-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import StaticContent from "../../components/StaticContent";

const Thesis: React.FC = () => {
	const { t } = useTranslation();
	const browserHistory = useHistory();
	return (
		<StaticContent>
			<Text>
				<h1>{t("thesis")}</h1>
				<p>{t("aboutThesis")}</p>
				<PrimaryButton
					onClick={() =>
						window.open(
							"https://theses.unicornuniversity.net/ciesla-michal",
							"_blank"
						)
					}
					iconProps={{ iconName: "NavigateExternalInline" }}
					text={t("thesis")}
				/>
				<DefaultButton
					onClick={() => browserHistory.push("/gen")}
					iconProps={{ iconName: "ImagePixel" }}
					text={t("gen")}
				/>
			</Text>
		</StaticContent>
	);
};
export default Thesis;

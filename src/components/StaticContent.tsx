import { Shimmer, ShimmerElementType } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PathPrefix } from "../lib/routing";
import Remark from "./Remark";

export interface StaticContentProps {
	bodyLocation?: string | null;
	childrenAfter?: boolean;
}
const StaticContent: React.FC<React.PropsWithChildren<StaticContentProps>> = ({
	bodyLocation,
	children,
	childrenAfter,
}) => {
	const [mdBody, setMdBody] = useState<string>();
	const { t } = useTranslation();
	/**
	 * Downloads markdown content from imput path
	 */
	useEffect(() => {
		if (bodyLocation)
			fetch(`${PathPrefix}${bodyLocation}`)
				.then((rs) => rs.text())
				.then((t) => setMdBody(t))
				.catch((error) =>
					setMdBody(t("noBody") + "  \n" + t("noBodyError", { error }))
				);
		else if (bodyLocation === null)
			setMdBody(t("noBody") + "  \n" + t("noBodyLocale"));
		else setMdBody("");
	}, [bodyLocation, setMdBody, t]);
	const palette = useTheme().palette;
	return (
		<>
			{childrenAfter || children}
			<Shimmer
				shimmerElements={[{ type: ShimmerElementType.line, height: 200 }]}
				shimmerColors={{
					shimmer: palette.neutralLight,
					shimmerWave: palette.themeLight,
					background: palette.white,
				}}
				isDataLoaded={mdBody !== undefined}
			>
				<Remark text={mdBody} />
			</Shimmer>
			{childrenAfter && children}
		</>
	);
};
export default StaticContent;

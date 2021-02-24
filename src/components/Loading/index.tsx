import { Spinner, SpinnerSize } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React from "react";

import "./styles.scss";

const Loading: React.FC = () => {
	const palette = useTheme().palette;
	return (
		<div id="loader" style={{ backgroundColor: palette.white }}>
			<div>
				<Spinner size={SpinnerSize.large} />
				<span id="loader-noisee">noisee</span>
			</div>
		</div>
	);
};
export default Loading;

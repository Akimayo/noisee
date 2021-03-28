import { DefaultEffects, Stack } from "@fluentui/react";
import React from "react";
import StaticContent, { StaticContentProps } from "./StaticContent";
import P5Wrapper from "react-p5-wrapper";
import p5 from "p5";

import "./sketches.scss";
import { useTheme } from "@fluentui/react-theme-provider";
import { useIsMobile } from "../lib/ismobile-hook";

interface SketchContentProps extends StaticContentProps {
	sketch: (p: ReactP5) => void;
	sketchProps: any;
}
const SketchContent: React.FC<React.PropsWithChildren<SketchContentProps>> = ({
	bodyLocation,
	children,
	sketch,
	sketchProps,
}) => {
	const palette = useTheme().palette;
	const isMobile = useIsMobile();
	return (
		<StaticContent bodyLocation={bodyLocation}>
			<Stack
				className="sketch-window"
				styles={{
					root: {
						boxShadow: DefaultEffects.elevation64,
						backgroundColor: palette.neutralQuaternary,
						overflow: "hidden",
					},
				}}
			>
				<Stack.Item grow={1} className="sketch-canvas-wrapper">
					<P5Wrapper
						sketch={sketch}
						{...sketchProps}
						background={palette.neutralQuaternary}
						foreground={palette.accent}
					/>
				</Stack.Item>
				<Stack.Item
					grow={1}
					className="sketch-controls-wrapper"
					styles={{
						root: {
							backgroundColor: palette.neutralQuaternaryAlt,
						},
					}}
				>
					<Stack
						horizontal={!isMobile}
						styles={{ root: { height: "calc(100% - 32px)" } }}
					>
						{children}
					</Stack>
				</Stack.Item>
			</Stack>
		</StaticContent>
	);
};
export default SketchContent;
export interface ReactP5<T = any> extends p5 {
	myCustomRedrawAccordingToNewPropsHandler: (
		props: T & { background: string; foreground: string }
	) => void;
}

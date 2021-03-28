import { Icon, Text } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React from "react";
import { Link } from "react-router-dom";

export const RemarkLink: React.FC<
	React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>
> = ({ href, children }) => {
	const theme = useTheme();
	const isLocal = href?.match(/^\/\w*/);
	return isLocal ? (
		<Link to={href || ""}>
			<Text
				styles={{ root: { color: theme.palette.themeDark } }}
				variant="large"
			>
				{children}
			</Text>
		</Link>
	) : (
		<a href={href} target="_blank">
			<Text
				styles={{ root: { color: theme.palette.themeDark } }}
				variant="large"
			>
				{children}
			</Text>
			<Icon
				iconName="OpenInNewTab"
				styles={{
					root: {
						fontSize: theme.fonts.tiny.fontSize,
						color: theme.palette.themeDarker,
						verticalAlign: "sup",
						paddingLeft: "2px",
					},
				}}
			/>
		</a>
	);
};
export const RemarkImageIcon: React.FC<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>
> = (props) => {
	const theme = useTheme();
	const { src, alt } = props;
	const isIcon = src && !src.includes("/");
	return isIcon ? (
		<>
			{alt}{" "}
			<Icon
				iconName={src}
				styles={{
					root: {
						fontSize: theme.fonts.large.fontSize,
						color: theme.palette.themeTertiary,
					},
				}}
			/>
		</>
	) : (
		<img {...props} />
	);
};

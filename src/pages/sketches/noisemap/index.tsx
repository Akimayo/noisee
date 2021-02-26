import {
	DirectionalHint,
	Icon,
	Label,
	Rating,
	RatingSize,
	Slider,
	Stack,
	TooltipHost,
} from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";
import sketch, { NoiseMapSketchProps } from "./sketch";

const NoiseMap: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | undefined | null;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const [scale, setScale] = useState(0.01);
	const [quality, setQuality] = useState(1);
	const isMobile = useIsMobile();
	const color = useTheme().palette.accent;
	return (
		<SketchContent
			bodyLocation={toText}
			sketch={sketch}
			sketchProps={{ scale, quality: quality - 1 } as NoiseMapSketchProps}
		>
			<Stack
				horizontal={!isMobile}
				styles={{ root: { height: "calc(100% - 32px)" } }}
			>
				<Slider
					value={scale}
					onChange={setScale}
					valueFormat={(v) => v.toFixed(3)}
					min={0.001}
					max={0.02}
					step={0.001}
					vertical={!isMobile}
					label={t("step")}
					disabled={quality > 2}
				/>
				<div>
					<Label>
						<TooltipHost
							content={t("quality.warning", { operations: 1280 * 720 })}
							directionalHint={DirectionalHint.bottomCenter}
						>
							{t("quality.quality")}&nbsp;
							<Icon
								iconName="Warning"
								aria-label={t("quality.warning", { operations: 1280 * 720 })}
								styles={{ root: { color, verticalAlign: "middle" } }}
							/>
						</TooltipHost>
					</Label>
					<Rating
						min={1}
						max={3}
						value={quality}
						onChange={(_, v) => setQuality(v || 1)}
						size={RatingSize.Large}
					/>
				</div>
			</Stack>
		</SketchContent>
	);
};
export default NoiseMap;

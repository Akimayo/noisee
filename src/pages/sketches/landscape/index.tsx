import { DirectionalHint, TooltipHost } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import {
	Checkbox,
	DefaultButton,
	Icon,
	Label,
	Slider,
	Stack,
	StackItem,
	Toggle,
} from "office-ui-fabric-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";

import sketch, { LandscapeDefaultProps, LandscapeSketchProps } from "./sketch";

const Landscape: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toText: string | null | undefined;
	try {
		toText = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toText = null;
	}
	const [offsetX, setXOff] = useState(LandscapeDefaultProps.offsetX);
	const [offsetY, setYOff] = useState(LandscapeDefaultProps.offsetY);
	const [offsetZ, setZOff] = useState(LandscapeDefaultProps.offsetZ);
	const [depth, setDepth] = useState(LandscapeDefaultProps.depth);
	const [tessSide, setTessSide] = useState(LandscapeDefaultProps.tessSide);
	const [frameRate, reportFrameRate] = useState(0);
	const [fpsReporting, setFpsReporting] = useState(false);
	const [useWireframe, setUseWireframe] = useState(
		LandscapeDefaultProps.useWireframe
	);
	const [renderTerrain, setRenderTerrain] = useState(
			LandscapeDefaultProps.renderTerrain
		),
		[renderWater, setRenderWater] = useState(LandscapeDefaultProps.renderWater),
		[renderClouds, setRenderClouds] = useState(
			LandscapeDefaultProps.renderClouds
		);
	const color = useTheme().palette.accent;
	const isMobile = useIsMobile();
	return (
		<SketchContent
			sketch={sketch}
			sketchProps={
				{
					offsetX,
					offsetY,
					offsetZ,
					depth,
					tessSide,
					reportFrameRate: fpsReporting && reportFrameRate,
					useWireframe,
					renderTerrain,
					renderWater,
					renderClouds,
				} as LandscapeSketchProps
			}
			bodyLocation={toText}
		>
			<Stack>
				<Checkbox
					label={`FPS${fpsReporting ? ": " + frameRate.toFixed(0) : ""}`}
					checked={fpsReporting}
					onChange={(_, v) => setFpsReporting(!!v)}
				/>
				<div>
					<Label>{t("components")}</Label>
					<Toggle
						onText={t("terrain")}
						offText={t("noTerrain")}
						checked={renderTerrain}
						onChange={(_, v) => setRenderTerrain(!!v)}
					/>
					<Toggle
						onText={t("water")}
						offText={t("noWater")}
						checked={renderWater}
						onChange={(_, v) => setRenderWater(!!v)}
					/>
					<Toggle
						onText={t("clouds")}
						offText={t("noClouds")}
						checked={renderClouds}
						onChange={(_, v) => setRenderClouds(!!v)}
					/>
				</div>
				<Toggle
					label={
						<TooltipHost
							content={t("wireframe.warning")}
							directionalHint={DirectionalHint.bottomCenter}
						>
							{t("wireframe.$")}&nbsp;
							<Icon
								iconName="Warning"
								aria-label={t("wireframe.warning")}
								styles={{ root: { color, verticalAlign: "middle" } }}
							/>
						</TooltipHost>
					}
					checked={useWireframe}
					onChange={(_, v) => setUseWireframe(!!v)}
					onText={t("wireframe.on")}
					offText={t("wireframe.off")}
				/>
				<StackItem
					styles={{
						root: {
							display: "grid",
							justifyItems: "center",
							gridRowGap: "20px",
						},
					}}
				>
					<DefaultButton
						styles={{
							root: {
								gridArea: "1 / 1",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setYOff(offsetY - 1)}
						title={t("moveDown")}
					>
						<Icon iconName="ChevronDownMed" />
					</DefaultButton>
					<DefaultButton
						styles={{
							root: {
								gridArea: "1 / 2",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setZOff(offsetZ + 1)}
					>
						<Icon iconName="TriangleSolidUp12" />
					</DefaultButton>
					<DefaultButton
						styles={{
							root: {
								gridArea: "1 / 3",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setYOff(offsetY + 1)}
						title={t("moveForward")}
					>
						<Icon iconName="ChevronUpMed" />
					</DefaultButton>
					<DefaultButton
						styles={{
							root: {
								gridArea: "2 / 1",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setXOff(offsetX - 1)}
						title={t("moveUp")}
					>
						<Icon iconName="TriangleSolidLeft12" />
					</DefaultButton>
					<DefaultButton
						styles={{
							root: {
								gridArea: "2 / 3",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setXOff(offsetX + 1)}
						title={t("moveRight")}
					>
						<Icon iconName="TriangleSolidRight12" />
					</DefaultButton>
					<DefaultButton
						styles={{
							root: {
								gridArea: "3 / 2",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						onClick={() => setZOff(offsetZ - 1)}
						title={t("moveBack")}
					>
						<Icon iconName="TriangleSolidDown12" />
					</DefaultButton>
				</StackItem>
			</Stack>
			<Slider
				vertical={!isMobile}
				label={t("depth")}
				min={40}
				max={160}
				step={10}
				value={depth}
				onChange={setDepth}
			/>
			<Slider
				vertical={!isMobile}
				label={t("tessSide")}
				min={10}
				max={80}
				step={10}
				value={tessSide}
				onChange={setTessSide}
			/>
		</SketchContent>
	);
};
export default Landscape;

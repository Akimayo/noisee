import {
	DefaultButton,
	Icon,
	Slider,
	Stack,
	StackItem,
	Toggle,
} from "@fluentui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SketchContent from "../../../components/SketchContent";
import { useIsMobile } from "../../../lib/ismobile-hook";
import sketch, { ArcadeSketchProps, ArcadeDefaultProps } from "./sketch";

const Arcade: React.FC = () => {
	const { t, i18n } = useTranslation("sketches");
	let toBody: string | undefined | null;
	try {
		toBody = require(`./locales/${i18n.language}.md`).default;
	} catch {
		toBody = null;
	}
	const [offsetX, setXOff] = useState(ArcadeDefaultProps.offsetX);
	const [offsetZ, setZOff] = useState(ArcadeDefaultProps.offsetZ);
	const [surrounding, setSurrounding] = useState({
		f: true,
		r: true,
		b: true,
		l: true,
	});
	const [athletic, setAthletic] = useState(ArcadeDefaultProps.athletic);
	const [waterLevel, setWaterLevel] = useState(ArcadeDefaultProps.waterLevel);
	const [mountainLevel, setMountainLevel] = useState(
		ArcadeDefaultProps.mountainLevel
	);
	const [gridSize, setGridSize] = useState(ArcadeDefaultProps.gridSize);
	const [terrainScale, setTerrainScale] = useState(
		ArcadeDefaultProps.terrainScale
	);
	const isMobile = useIsMobile();
	return (
		<SketchContent
			sketch={sketch}
			sketchProps={
				{
					offsetX,
					offsetZ,
					athletic,
					waterLevel,
					mountainLevel,
					gridSize,
					terrainScale,
					setSurrounding,
				} as ArcadeSketchProps
			}
			bodyLocation={toBody}
		>
			<Stack>
				<Toggle
					label={t("character.$")}
					onText={t("character.athletic")}
					offText={t("character.lazy")}
					checked={athletic}
					onChange={(_, v) => setAthletic(!!v)}
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
								gridArea: "1 / 2",
								height: "48px",
								width: "48px",
								minWidth: "unset",
							},
						}}
						disabled={!surrounding.f}
						onClick={() => setZOff(offsetZ + 1)}
						title={t("moveForward")}
					>
						<Icon iconName="TriangleSolidUp12" />
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
						disabled={!surrounding.l}
						onClick={() => setXOff(offsetX - 1)}
						title={t("moveLeft")}
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
						disabled={!surrounding.r}
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
						disabled={!surrounding.b}
						onClick={() => setZOff(offsetZ - 1)}
						title={t("moveBack")}
					>
						<Icon iconName="TriangleSolidDown12" />
					</DefaultButton>
				</StackItem>
			</Stack>
			<Stack horizontal={isMobile} styles={{ root: { rowGap: "48px" } }}>
				<Slider
					vertical={!isMobile}
					label={t("waterLevel")}
					min={0}
					max={0.5}
					step={0.05}
					valueFormat={(v) => v.toFixed(2)}
					value={waterLevel}
					onChange={setWaterLevel}
					styles={{ root: { flexGrow: 1, maxHeight: "45%" } }}
				/>
				<Slider
					vertical={!isMobile}
					label={t("mountainLevel")}
					min={0.55}
					max={1}
					step={0.05}
					valueFormat={(v) => v.toFixed(2)}
					value={mountainLevel}
					onChange={setMountainLevel}
					styles={{ root: { flexGrow: 1, maxHeight: "45%" } }}
				/>
			</Stack>
			<Slider
				vertical={!isMobile}
				label={t("gridSize")}
				min={10}
				max={80}
				step={10}
				value={gridSize}
				onChange={setGridSize}
				snapToStep
			/>
			<Slider
				vertical={!isMobile}
				label={t("terrainScale")}
				min={0.01}
				max={0.1}
				step={0.01}
				valueFormat={(v) => v.toFixed(2)}
				value={terrainScale}
				onChange={setTerrainScale}
			/>
		</SketchContent>
	);
};
export default Arcade;

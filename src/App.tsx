import { Toggle, Text } from "@fluentui/react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import React, { Suspense, useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AutoRouter from "./components/AutoRouter";
import Loading from "./components/Loading";
import { Routes } from "./lib/routing";
import { darkTheme, lightTheme } from "./lib/theming";

const App: React.FC = () => {
	const dark = useMediaPredicate("(prefers-color-scheme: dark)");
	const [isDarkTheme, setDarkTheme] = useState(dark);
	useEffect(() => setDarkTheme(dark), [dark]);
	const theme = isDarkTheme ? darkTheme : lightTheme;
	return (
		<ThemeProvider theme={theme}>
			<div id="content" style={{ backgroundColor: theme.palette.white }}>
				<Suspense fallback={<Loading />}>
					<div
						id="header"
						style={{ backgroundColor: isDarkTheme ? "#000" : "#eee" }}
					>
						<div>
							<Text
								variant="xLarge"
								styles={{ root: { color: theme.palette.themeDark } }}
							>
								noisee
							</Text>
							&nbsp;
							<Text
								variant="small"
								styles={{ root: { color: theme.palette.black } }}
							>
								by Michal Ciesla
							</Text>
						</div>
						<Toggle
							onText="🌚"
							offText="🌞"
							checked={isDarkTheme}
							onChange={(_, checked) => setDarkTheme(checked === true)}
						/>
					</div>
					<BrowserRouter>
						<AutoRouter>{Routes}</AutoRouter>
					</BrowserRouter>
				</Suspense>
			</div>
		</ThemeProvider>
	);
};

export default App;

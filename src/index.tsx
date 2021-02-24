import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initializeIcons } from "@fluentui/react";
import { PathPrefix } from "./lib/routing";

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "cs",
		supportedLngs: ["cs", "en"],
		debug: process.env.NODE_ENV == "development",
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: `${PathPrefix}/locales/{{lng}}/{{ns}}.json`
		}
	});
initializeIcons();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

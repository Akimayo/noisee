import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initializeIcons } from "@fluentui/react";
import { PathPrefix } from "./lib/routing";

// Setup translation provider
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
			loadPath: `${PathPrefix}/locales/{{lng}}/{{ns}}.json`,
		},
	});
// Load FluentUI's icons
initializeIcons();

// Attach application
ReactDOM.render(<App />, document.getElementById("root"));

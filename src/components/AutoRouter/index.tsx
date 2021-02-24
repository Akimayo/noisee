import {
	CommandBar,
	CompoundButton,
	DefaultEffects,
	FontIcon,
	INavLink,
	Nav,
	Panel,
} from "@fluentui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaPredicate } from "react-media-hook";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { RoutedObject } from "../../lib/routing";

import "./styles.scss";
import languages from "./langs.json";

/**
 * Transforms item key into its URL
 */
export const urlFromItem = (item: RoutedObject) =>
	`${process.env.HOME_PATH || ""}/${
		item.isDefault ? "" : item.key.replace(".$", "").replaceAll(".", "/")
	}`;
interface INavLinkMod extends INavLink {
	link: string;
	body: React.FC;
}
const AutoRouter: React.FC<{ children: RoutedObject[] }> = ({
	children: config,
}) => {
	const { t, i18n } = useTranslation();
	const browserHistory = useHistory();
	const location = useLocation();
	/**
	 * Recursively maps input objects into FluentUI's Nav items
	 */
	const routedObjectMapper: (
		item: RoutedObject,
		i: number
	) => INavLinkMod = useCallback(
		(item: RoutedObject) =>
			({
				name: t(item.key),
				link: urlFromItem(item),
				body: item.body,
				key: item.key,
				disabled: item.isEnabled === false,
				isExpanded: true,
				icon: item.icon,
				links: item.children?.map(routedObjectMapper),
			} as INavLinkMod),
		[t]
	);
	/**
	 * Recursively maps input objects into React Router's Routes
	 */
	const routeMapper: (
		item: RoutedObject,
		i: number
	) => React.ReactNode = useCallback(
		(item) => {
			return (
				<>
					{item.isEnabled !== false ? (
						<Route
							path={urlFromItem(item)}
							exact={item.isDefault || !!item.children?.length}
							key={item.key}
							component={item.body}
						/>
					) : (
						<Redirect key={item.key} to="/" />
					)}
					{item.children?.map(routeMapper)}
				</>
			);
		},
		[urlFromItem]
	);
	const isMobile = useMediaPredicate("(max-width: 900px");
	const [isOpen, setOpen] = useState(false);
	/**
	 * Transforms current location into the item key
	 */
	const getKeyFromPath = useCallback(
		() => location.pathname.substr(1).replaceAll("/", "."),
		[location]
	);
	const [selectedKey, setSelectedKey] = useState<string>();
	/**
	 * Attempts to correctly set selected item in FluentUI's Nav
	 */
	useEffect(() => {
		const keyFromPath = getKeyFromPath();
		setSelectedKey(
			!!keyFromPath
				? keyFromPath +
						(config.find((i) => i.key === keyFromPath + ".$") ? ".$" : "")
				: config.find((i) => i.isDefault)?.key || ""
		);
	}, [getKeyFromPath, location]);
	/**
	 * Replaces FluentUI's stupid links with React Router friendly redirects
	 */
	const handleLinkClick = useCallback(
		(evt?: React.MouseEvent<HTMLElement, MouseEvent>, item?: INavLink) => {
			evt?.preventDefault();
			item && item.key && setSelectedKey(item.key);
			browserHistory.push((item as INavLinkMod).link);
		},
		[setSelectedKey]
	);
	return (
		<>
			<Panel isOpen={isOpen && isMobile} onDismiss={() => setOpen(false)}>
				<Nav
					groups={[{ links: config.map(routedObjectMapper) }]}
					onLinkClick={handleLinkClick}
					selectedKey={selectedKey}
				/>
			</Panel>
			<Nav
				className="navpanel"
				groups={[{ links: config.map(routedObjectMapper) }]}
				onLinkClick={handleLinkClick}
				selectedKey={selectedKey}
			/>
			<CompoundButton
				className="navbtn"
				secondaryText={
					selectedKey &&
					!selectedKey.includes(".$") &&
					selectedKey.includes(".")
						? t(selectedKey.substr(0, selectedKey.lastIndexOf(".")) + ".$")
						: ""
				}
				onClick={() => setOpen(true)}
				styles={{ root: { boxShadow: DefaultEffects.elevation64 } }}
			>
				<span>
					<FontIcon iconName="GlobalNavButton" />
					{selectedKey && t(selectedKey)}
				</span>
			</CompoundButton>
			<CommandBar
				className="app-top-commands"
				items={[
					{
						key: "locale",
						cacheKey: i18n.language,
						iconProps: { iconName: "LocaleLanguage" },
						subMenuProps: {
							items: languages.map(({ code, name }) => ({
								key: `locale-${code}`,
								text: name,
								disabled: code == i18n.language,
								onClick: () => i18n.changeLanguage(code) && true,
							})),
						},
					},
					{
						key: "github",
						iconProps: { iconName: "OpenSource" },
						text: t("source"),
						href: `https://github.com/Akimayo/noisee/tree/master/src/pages${
							browserHistory.location.pathname.length > 1
								? browserHistory.location.pathname
								: "/" + config.find((i) => i.isDefault)?.key
						}`,
						target: "_blank",
					},
				]}
			/>
			<main>{config.map(routeMapper)}</main>
		</>
	);
};

export default AutoRouter;

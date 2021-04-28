import {
	CommandBar,
	CompoundButton,
	DefaultEffects,
	FontIcon,
	INavLink,
	Nav,
	Panel,
} from "@fluentui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { RoutedObject } from "../../lib/routing";

import "./styles.scss";
import languages from "./langs.json";
import { useIsMobile } from "../../lib/ismobile-hook";

/**
 * Transforms item key into its URL
 */
export const urlFromItem = (item: RoutedObject) =>
	`/${item.isDefault ? "" : item.key.replace(".$", "").replaceAll(".", "/")}`;
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
	const initPath = useMemo(() => location.pathname, []);
	const [navCount, setNavCount] = useState(0);
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
	const isMobile = useIsMobile();
	const [isOpen, setOpen] = useState(false);
	/**
	 * Transforms current location into the item key
	 */
	const getKeyFromPath = useCallback(
		(path?: string) =>
			(path || location.pathname).substr(1).replaceAll("/", "."),
		[location]
	);
	const [selectedKey, setSelectedKey] = useState<string>(
		getKeyFromPath(initPath)
	);
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
	 * When reloading page or typing URL manually, prevent going to homepage
	 */
	useEffect(() => {
		navCount < 3 && setNavCount(navCount + 1);
	}, [browserHistory, location, setNavCount]);
	navCount === 2 &&
		initPath.length > 1 &&
		location.pathname.length <= 1 &&
		browserHistory.push(initPath); // Technically, this should work inside the above side-effect, but it doesn't, so it's checked every render.
	/**
	 * Replaces FluentUI's stupid links with React Router friendly redirects
	 */
	const handleLinkClick = useCallback(
		(evt?: React.MouseEvent<HTMLElement, MouseEvent>, item?: INavLink) => {
			evt?.preventDefault();
			item && item.key && setSelectedKey(item.key);
			browserHistory.push((item as INavLinkMod).link);
			setOpen(false);
		},
		[setSelectedKey]
	);
	const downloadCanvas = useCallback(() => {
		document.querySelector("canvas")?.toBlob(
			(blob) => {
				const anchor = document.createElement("a");
				anchor.download = `${selectedKey}.png`;
				anchor.href = URL.createObjectURL(blob);
				anchor.click();
				URL.revokeObjectURL(anchor.href);
			},
			"image/png",
			1
		);
	}, [selectedKey]);
	const isSketch = location.pathname.includes("sketches/");
	const visibleItems = config.filter(i => i.isVisible !== false);
	return (
		<>
			<Panel isOpen={isOpen && isMobile} onDismiss={() => setOpen(false)}>
				<Nav
					groups={[{ links: visibleItems.map(routedObjectMapper) }]}
					onLinkClick={handleLinkClick}
					selectedKey={selectedKey}
				/>
			</Panel>
			<Nav
				className="navpanel"
				groups={[{ links: visibleItems.map(routedObjectMapper) }]}
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
					{
						key: "download",
						iconProps: isSketch ? { iconName: "Download" } : undefined,
						text: isSketch ? t("download") : undefined,
						onClick: downloadCanvas,
						disabled: !isSketch,
					},
				]}
			/>
			<main>{config.map(routeMapper)}</main>
		</>
	);
};

export default AutoRouter;

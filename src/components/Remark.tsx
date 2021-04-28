import React from "react";
import unified from "unified";
import remarkParse from "remark-parse";
import remark2react from "remark-react";
import { Text } from "@fluentui/react";
import { RemarkImageIcon, RemarkLink } from "./RemarkElements";

import "./remark.scss";
import remarkGfm from "remark-gfm";

const Remark: React.FC<{ text?: string }> = ({ text }) => {
	const body = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remark2react, { remarkReactComponents: { a: RemarkLink, img: RemarkImageIcon } })
		.processSync(text || "").result as React.ReactNode;
	return (
		<Text
			variant="large"
			className="text-body"
		>
			{body}
		</Text>
	);
};
export default Remark;

import React from "react";
import styles from "./titleWithSubtitle.module.scss";

type TitleWithSubtitleProps = {
	title: string;
	subtitle: string;
};

const TitleWithSubtitle = ({ title, subtitle }: TitleWithSubtitleProps) => {
	return (
		<div className={styles.TitleWithSubtitle}>
			<h2>{title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: subtitle.replace(/\n/g, "<br />"),
				}}
			/>
		</div>
	);
};

export default TitleWithSubtitle;

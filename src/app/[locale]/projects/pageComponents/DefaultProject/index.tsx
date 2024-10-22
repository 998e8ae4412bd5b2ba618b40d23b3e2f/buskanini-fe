import React from "react";
import styles from "./defultProject.module.scss";
import PreviewButton from "@/app/components/previewButton";

type CardProject = {
	name: string
	image: string;
};
const Index = ({ name, image }: CardProject) => {
	return (
		<article className={styles.defaultProjectCard}>
			<div className={styles.hoverInfo}>
				<div className={styles.name}>{name}</div>
				<PreviewButton />
			</div>
			<img src={image} alt="" />
		</article>
	);
};

export default Index;

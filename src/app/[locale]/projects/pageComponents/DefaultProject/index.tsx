import React from "react";
import styles from "./defultProject.module.scss";
import PreviewButton from "@/app/components/previewButton";

type CardProject = {
	name: string
	image: string;
	model: string;
	projectId: string;
};
const Index = ({ name, image, model, projectId }: CardProject) => {
	return (
		<article onClick={() => (window.location.href = `project/${projectId}`)} className={styles.defaultProjectCard}>
			<div className={styles.hoverInfo}>
				<div className={styles.name}>{name}</div>
				{model !== '' && <PreviewButton/>}
			</div>
			<img src={image} alt="" />
		</article>
	);
};

export default Index;

import PreviewButton from "@/app/components/previewButton";
import React, {useState} from "react";
import styles from "./defultProject.module.scss";
import truncateText from "@/app/utils/TruncateText";

type CardProject = {
	name: string;
	image: string;
	model: string;
	projectId: string;
	setModelModalActive: (model: boolean) => void;
	setModel: (model: string) => void;
};
const Index = ({ name, image, model, projectId, setModelModalActive, setModel }: CardProject) => {
	return (
		<>
			<article
				onClick={() => projectId && (window.location.href = `project/${projectId}`)}
				className={styles.defaultProjectCard}
			>
				<div className={styles.hoverInfo}>
					<div className={styles.name}>
						{truncateText(
							name !== undefined ? name : "Без назви",
							24
						)}
					</div>
					{model !== undefined && <PreviewButton onClick={(e) => {
						e.stopPropagation();
						setModelModalActive(true)
						setModel(model)
					}} />}
				</div>
				<img loading={"lazy"} src={image} alt="" />
			</article>
		</>

	);
};

export default Index;

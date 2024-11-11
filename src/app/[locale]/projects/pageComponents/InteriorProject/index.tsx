import React from "react";
import styles from "./interiorProject.module.scss";

type CardProject = {
	image: string;
	projectId: string;
};
const Index = ({ image, projectId }: CardProject) => {
	const tags = [
		"Меблі для спальні",
		"Ліжка преміум-класу",
		"М'які ліжка",
		"Індивідуальні меблі на замовлення",
	];

	return (
		<>
			<article className={styles.interiorProjectCardContainer}>
				<div
					onClick={() => (window.location.href = `project/${projectId}`)}
					className={styles.interiorProjectCard}
				>
					<div className={styles.hoverInfo}>
						<div className={styles.name}>THavana Hammock Chair</div>

						<div className={styles.tags}>
							{tags.map((tag) => (
								<div className={styles.tag}>{tag}</div>
							))}
						</div>
					</div>
					<img loading={"lazy"} src={image} alt=""/>
				</div>

				<div className={styles.tagsMob}
					 onClick={() => (window.location.href = `project/${projectId}`)}
				>
					{tags.map((tag) => (
						<div className={styles.tag}>{tag}</div>
					))}
				</div>
			</article>
		</>
	);
};

export default Index;

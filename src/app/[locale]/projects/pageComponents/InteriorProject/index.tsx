import React from "react";
import styles from "./interiorProject.module.scss";

type CardProject = {
	image: string;
};
const Index = ({ image }: CardProject) => {
	const tags = [
		"Меблі для спальні",
		"Ліжка преміум-класу",
		"М'які ліжка",
		"Індивідуальні меблі на замовлення",
	];


	return (
		<article onClick={() => (window.location.href = 'project/22')} className={styles.interiorProjectCard}>
			<div className={styles.hoverInfo}>
				<div className={styles.name}>THavana Hammock Chair</div>

				<div className={styles.tags}>
					{tags.map((tag) => (
						<div className={styles.tag}>{tag}</div>
					))}
				</div>
			</div>
			<img src={image} alt="" />
		</article>
	);
};

export default Index;

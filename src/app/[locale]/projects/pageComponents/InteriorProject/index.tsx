import React from "react";
import styles from "./interiorProject.module.scss";
import truncateText from "@/app/utils/TruncateText";
import {useLocale} from "use-intl";
import {useRouter} from "next/navigation";

type CardProject = {
	image: string;
	projectId: string;
	name: string;
};
const Index = ({ image, name, projectId }: CardProject) => {
	const locale = useLocale();
	const router = useRouter();
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
					onClick={() => router.push(`/${locale}/project/${projectId}`)}
					className={styles.interiorProjectCard}
				>
					<div className={styles.hoverInfo}>
						<div className={styles.name}>{truncateText(
							name !== undefined ? name : "Без назви",
							24
						)}</div>

						<div className={styles.tags}>
							{tags.map((tag) => (
								<div key={tag} className={styles.tag}>{tag}</div>
							))}
						</div>
					</div>
					<img loading={"lazy"} src={image} alt=""/>
				</div>

				<div className={styles.tagsMob}
					 onClick={() => router.push(`/${locale}/project/${projectId}`)}
				>
					{tags.map((tag) => (
						<div key={tag} className={styles.tag}>{tag}</div>
					))}
				</div>
			</article>
		</>
	);
};

export default Index;

import styles from "./serviceCard.module.scss";
import {forwardRef} from "react";
import {useTranslations} from "next-intl";

type ServiceCardProps = {
	title: string;
	subtitle: string;
	description: string;
};

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>((props, ref) => {
	const { title, subtitle, description } = props;
	const t = useTranslations("Home")

	return (
		<article ref={ref}  className={styles.serviceCard}>
			<div className={styles.titleSubtitle}>
				<h3>{title}</h3>
				<p>{subtitle}</p>
			</div>
			<div
				className={styles.description}
				dangerouslySetInnerHTML={{
					__html: description.replace(/\n/g, "<br />"),
				}}
			/>

			<button>{t("order")}</button>
		</article>
	);
});

export default ServiceCard;

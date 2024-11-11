import styles from "./serviceCard.module.scss";
import {forwardRef} from "react";

type ServiceCardProps = {
	title: string;
	subtitle: string;
	description: string;
};

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>((props, ref) => {
	const { title, subtitle, description } = props;

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

			<button>Замовити</button>
		</article>
	);
});

export default ServiceCard;

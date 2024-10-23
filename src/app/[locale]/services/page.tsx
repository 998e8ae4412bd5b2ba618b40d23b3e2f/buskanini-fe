import React from "react";
import Header from "@/app/components/header";
import styles from "./services.module.scss";
import InfoModel from "./components/InfoModel/index";
import HaveQuestion from "@/app/components/haveQuestion";

type BuskaniniBgTitleProps = {
	title: string;
	name: string;
};

const BuskaniniBgTitle = ({ title, name }: BuskaniniBgTitleProps) => (
	<div className={`${styles.buskaniniBgTitle} ${styles[name]}`}>
		<span>{title}</span>
	</div>
);

const Page = () => {
	const aboutPage = [
		{
			title: "3D Modelling",
			content: [
				"Основа для створення рендерів на білому тлі, візуалізації меблів в інтер'єрах, створення малюнків для каталогів і веб-сайтів. Допомагає залучити більше клієнтів, особливо серед дизайнерів інтер'єру.",
				"Моделювання меблів для меблевої фабрики - важливий етап у створенні якісних та естетично привабливих меблів, що допомагає виробникам уникнути зайвих витрат і вдосконалити виробничий процес.",
			],
			ctaText: "Замовити",
			images: [
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
			],
		},
		{
			title: "3D Product Rendering",
			content: [
				"Відображення меблів на білому тлі дозволяє зосередити увагу насамих меблях, не відволікаючись на  додаткові елементи чи контекст.",
				"Це дає можливість покупцям отримати чітке уявлення про зовнішній вигляд меблів ще до здійснення покупки, а також сприяє створенню привабливих і професійних зображень. Вони також використовуються в каталогах, веб-сайтах, соціальних мережах, рекламі тощо.",
			],
			ctaText: "Замовити",
			images: [
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
			],
		},
		{
			title: "3D Interior Visualization",
			content: [
				"Візуалізація меблів в інтер'єрі дозволяє побачити, як вони органічно вписуються в конкретне середовище. Це надає клієнтам можливість оцінити, як меблі виглядатимуть в реальному інтер'єрі, підкреслюючи їх стиль і функціональність.",
			],
			ctaText: "Замовити",
			images: [
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
			],
		},
		{
			title: "Product Design",
			content: [
				"Візуалізація меблів в інтер'єрі дозволяє побачити, як вони органічно вписуються в конкретне середовище. Це надає клієнтам можливість оцінити, як меблі виглядатимуть в реальному інтер'єрі, підкреслюючи їх стиль і функціональність.",
				"Відображення меблів на білому тлі дозволяє зосередити увагу насамих меблях, не відволікаючись на  додаткові елементи чи контекст.",
			],
			ctaText: "Замовити",
			images: [
				"https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
			],
		},
	];

	return (
		<>
			<Header />
			<main className={styles.main}>
				<BuskaniniBgTitle title="3D Modelling" name="Modelling" />

				<section className={`${styles.aboutUs} ${styles.container}`}>
					<InfoModel obj={aboutPage[0]} reverse={false} />
				</section>

				<BuskaniniBgTitle title="3D Product Rendering" name="Rendering" />

				<section className={`${styles.aboutUs} ${styles.container}`}>
					<InfoModel obj={aboutPage[1]} reverse />
				</section>

				<BuskaniniBgTitle title="3D Interior Visualization" name="Interior" />

				<section className={`${styles.aboutUs} ${styles.container}`}>
					<InfoModel obj={aboutPage[2]} reverse={false} />
				</section>

				<BuskaniniBgTitle title="Product Designs" name="Product" />

				<section className={`${styles.aboutUs} ${styles.container}`}>
					<InfoModel obj={aboutPage[3]} reverse />
				</section>

				<section className={`${styles.question}`}>
					<HaveQuestion />
				</section>
			</main>
		</>
	);
};

export default Page;

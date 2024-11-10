'use client'
import HaveQuestion from "@/app/components/haveQuestion";
import Header from "@/app/components/header";
import React, {useEffect, useState} from "react";
import InfoModel from "./components/InfoModel/index";
import styles from "./services.module.scss";
import {fetchGraphQL} from "@/app/lib/directus";
import LoadingScreen from "@/app/components/LoadingScreen";
import {useLocale} from "use-intl";
import Footer from "@/app/components/footer";

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
	const locale = useLocale();
	const [isLoading, setIsLoading] = useState(true);
	const [aboutPage, setAboutPage] = useState([
		{
			title: "",
			content: [],
			ctaText: "Замовити",
			images: []
		},
		{
			title: "",
			content: [],
			ctaText: "Замовити",
			images: []
		},
		{
			title: "",
			content: [],
			ctaText: "Замовити",
			images: []
		},
		{
			title: "",
			content: [],
			ctaText: "Замовити",
			images: []
		},
	]);

	useEffect(() => {
		const lang = locale === "en" ? "en-US" : "ua-UA";

		const fetchMedia = async () => {
			const query = `
			   query Services {
					services {
						modelling {
							directus_files_id {
								id
							}
						}
						rendering {
							directus_files_id {
								id
							}
						}
						visualization {
							id
						}
						design {
							id
						}
						translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
							first_block
							second_block
							fourth_block
							third_block
						}
					}
				}
        	`;

			try {
				const response = await fetchGraphQL(query).then(res => res.data.services);

				const modellingImages = response.modelling?.map((file: { directus_files_id: { id: any; }; }) => `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${file.directus_files_id.id}`) || [];
				const renderingImages = response.rendering?.map((file: { directus_files_id: { id: any; }; }) => `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${file.directus_files_id.id}`) || [];
				const visualizationImage = response.visualization ? `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${response.visualization.id}` : "";
				const designImage = response.design ? `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${response.design.id}` : "";

				const parseBlockContent = (block: any) =>
					block?.blocks?.map((item: any) => item.data.text) || [];

				const updatedAboutPage = [
					{
						title: parseBlockContent(response.translations[0].first_block)[0] || "3D Modelling",
						content: parseBlockContent(response.translations[0].first_block).slice(1),
						ctaText: "Замовити",
						images: modellingImages
					},
					{
						title: parseBlockContent(response.translations[0].second_block)[0] || "3D Product Rendering",
						content: parseBlockContent(response.translations[0].second_block).slice(1),
						ctaText: "Замовити",
						images: renderingImages
					},
					{
						title: parseBlockContent(response.translations[0].third_block)[0] || "3D Interior Visualization",
						content: parseBlockContent(response.translations[0].third_block).slice(1),
						ctaText: "Замовити",
						images: [visualizationImage]
					},
					{
						title: parseBlockContent(response.translations[0].fourth_block)[0] || "Product Design",
						content: parseBlockContent(response.translations[0].fourth_block).slice(1),
						ctaText: "Замовити",
						images: [designImage]
					},
				];

				setAboutPage(updatedAboutPage);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};
		fetchMedia();
	}, []);

	if(isLoading) {
		return <LoadingScreen/>
	}
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

			<Footer />
		</>
	);
};

export default Page;

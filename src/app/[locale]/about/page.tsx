'use client'
import HaveQuestion from "@/app/components/haveQuestion";
import Header from "@/app/components/header";
import BlackArrow from "../../../../public/svg/blackArrow.svg";
import styles from "./about.module.scss";
import { fetchGraphQL } from "@/app/lib/directus";
import { useLocale } from "use-intl";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/LoadingScreen";

type Block = {
	id: string;
	type: string;
	data: {
		text: string;
	};
};

type Translation = {
	name_occupation: {
		time: number;
		blocks: Block[];
		version: string;
	};
	about_description: {
		time: number;
		blocks: Block[];
		version: string;
	};
	about_me_description: {
		time: number;
		blocks: Block[];
		version: string;
	};
	folder: {
		time: number;
		blocks: Block[];
		version: string;
	};
};

type AboutData = {
	about_image: {
		id: string;
	};
	about_me: {
		id: string;
	};
	translations: Translation[];
};

const Page = () => {
	const locale = useLocale();
	const [data, setData] = useState<AboutData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchMedia = async () => {
			const query = `
			query About {
				about {
					about_image {
						id
					}
					about_me {
						id
					}
					translations(filter: { languages_code: { code: { _eq: "ua-UA" } } }) {
						name_occupation
						about_description
						about_me_description
						folder
					}
				}
			}
		`;

			try {
				const response = await fetchGraphQL(query);
				const data = response.data.about as AboutData;
				setData(data);
				console.log(data)
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchMedia();
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<>
			<Header />
			<section className={`${styles.aboutUs} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div className={styles.aboutUsText}>
						<h1>{data?.translations[0].about_description.blocks[0].data.text}</h1>
						{data?.translations[0].about_description.blocks.slice(1).map((block, index) => (
							<p key={index}>{block.data.text}</p>
						))}
					</div>
					<div
						className={styles.aboutUsImage}
						style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${data?.about_image.id})` }}
					/>
				</div>
			</section>

			<div className={`${styles.aboutBuskanini}`}>
				<span>bushkanini</span>
			</div>

			<section className={`${styles.aboutMe} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div className={styles.aboutMeTexts}>
						<h2>{data?.translations[0].about_me_description.blocks[0].data.text}</h2>
						{data?.translations[0].about_me_description.blocks.slice(1).map((block, index) => (
							<p key={index}>{block.data.text}</p>
						))}
					</div>

					<div className={styles.aboutMeInfo}>
						<div
							className={styles.aboutMeInfoImage}
							style={{
								backgroundImage: `url(${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${data?.about_me.id})`,
							}}
						/>
						<div className={styles.aboutMeInfoText}>
							<h3>{data?.translations[0].name_occupation.blocks[0].data.text}</h3>
							<p>{data?.translations[0].name_occupation.blocks[1].data.text}</p>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.aboutProjects}>
				<div className={styles.aboutProjectsWrap}>
					<div className={styles.aboutProjectsProject}>
						<h3>
							50+ <br />
							Проєктів
						</h3>
					</div>
					<div className={styles.aboutProjectsButtons}>
						<a href="#projects" className={styles.projectsLink}>
							Переглянути проєкти
						</a>
						<button className={styles.arrowBtn}>
							<div className={styles.arrowIcon}>
								<BlackArrow />
							</div>
						</button>
					</div>
				</div>
				<div className={styles.aboutProjectsText}>
					{data?.translations[0].folder.blocks.map((block, index) => (
						<p key={index}>{block.data.text}</p>
					))}
				</div>
			</section>

			<section className={styles.askSection}>
				<HaveQuestion />
			</section>
		</>
	);
};

export default Page;

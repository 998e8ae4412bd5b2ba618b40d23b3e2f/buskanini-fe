'use client'
import HaveQuestion from "@/app/components/haveQuestion";
import Header from "@/app/components/header";
import BlackArrow from "../../../../public/svg/blackArrow.svg";
import styles from "./about.module.scss";
import { fetchGraphQL } from "@/app/lib/directus";
import { useLocale } from "use-intl";
import React, {useEffect, useRef, useState} from "react";
import LoadingScreen from "@/app/components/LoadingScreen";
import gsap from "gsap";
import Link from "next/link";
import Footer from "@/app/components/footer";

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

interface Model {
	image: string;
	projectId: string;
}


const Page = () => {
	const locale = useLocale();
	const [data, setData] = useState<AboutData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchMedia = async () => {
			const query = `
			query AboutModels {
				about {
					about_image {
						id
					}
					about_me {
						id
					}
					translations(filter: { languages_code: { code: { _eq: "${locale === 'ua' ? 'ua-UA' : 'en-US'}" } } }) {
						name_occupation
						about_description
						about_me_description
						folder
					}
				},
				models(limit: 6) {
						model {
							id
						}
						project {
							id
						}
					}
			}
		`;

			try {
				const response = await fetchGraphQL(query);
				const data = response.data.about as AboutData;
				const objects: Model[] = response.data.models.map((obj: {
					model: { id: string};
					project: {id: string}
				}) => {
					return ({
						image: obj.model.id,
						projectId: obj.project.id,
					})
				})
				setModels(objects);
				setData(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchMedia();
	}, []);


	const aboutMeTextRef = useRef<HTMLDivElement | null>(null);
	const aboutMeImageRef = useRef<HTMLDivElement | null>(null);
	const aboutBuskaniniRef = useRef<HTMLDivElement | null>(null);
	const aboutUsTextRef = useRef<HTMLDivElement | null>(null);
	const aboutUsImageRef = useRef<HTMLDivElement | null>(null);
	const arrowBtnRef = useRef<HTMLButtonElement | null>(null);
	const aboutProjectsTextRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (aboutMeTextRef.current && aboutMeImageRef.current && aboutBuskaniniRef.current && aboutUsTextRef.current && aboutUsImageRef.current && aboutProjectsTextRef.current) {
			gsap.fromTo(
				aboutMeTextRef.current,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power2.out',
					stagger: 0.3,
					scrollTrigger: {
						trigger: aboutMeTextRef.current,
						start: 'top 80%',
						scrub: true
					}
				}
			);

			gsap.fromTo(
				aboutUsTextRef.current,
				{ opacity: 0, y: 50 }, // Start from opacity 0, 50px below
				{
					opacity: 1,
					y: 0, // End at original position
					duration: 1, // 1 second duration
					ease: 'power2.out', // Smooth easing
					stagger: 0.3, // Delay each child element slightly for a cascade effect
				}
			);

			// Animate the image
			gsap.fromTo(
				aboutUsImageRef.current,
				{ opacity: 0, scale: 0.9 }, // Start from opacity 0 and slightly smaller
				{
					opacity: 1,
					scale: 1, // End at original scale
					duration: 1.5, // Slightly longer duration for the image
					ease: 'power2.out',
				}
			);

			gsap.fromTo(
				aboutMeImageRef.current,
				{ opacity: 0, scale: 0.9 },
				{
					opacity: 1,
					scale: 1,
					duration: 1,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: aboutMeImageRef.current,
						start: 'top 60%',
						end: 'top 20%',
						scrub: true,
					}
				}
			);

			gsap.fromTo(
				aboutMeImageRef.current,
				{
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"
				}, // initial box shadow
				{
					boxShadow: "0 0 7.0625rem 1.625rem rgba(243, 226, 198, 0.13)", // box shadow when scrolled
					duration: 1,
					scrollTrigger: {
						trigger: aboutMeImageRef.current,
						start: 'top 60%',
						end: 'top 20%',
						scrub: true,
					},
				}
			);

			gsap.fromTo(
				aboutBuskaniniRef.current,
				{ y: 50 },
				{
					y: -100,
					scrollTrigger: {
						trigger: aboutBuskaniniRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				}
			);


			const paragraphs = aboutProjectsTextRef.current.querySelectorAll("p");
			gsap.fromTo(
				paragraphs,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
					stagger: 0.2,
					scrollTrigger: {
						trigger: aboutProjectsTextRef.current,
						start: "top 80%",
						end: "bottom 60%",
						scrub: true,
					},
				}
			);

		}
	}, [data]);

	const [models, setModels] = React.useState<Model[]>([]);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<>
			<Header/>
			<section className={`${styles.aboutUs} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div ref={aboutUsTextRef} className={styles.aboutUsText}>
						<h1>{data?.translations[0].about_description.blocks[0].data.text}</h1>
						{data?.translations[0].about_description.blocks.slice(1).map((block, index) => (
							<p key={index}>{block.data.text}</p>
						))}
					</div>
					<div
						ref={aboutUsImageRef}
						className={styles.aboutUsImage}
						style={{
							backgroundImage: `url(${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${data?.about_image.id})`,
						}}
					/>
				</div>
			</section>

			<div className={`${styles.aboutBuskanini}`} ref={aboutBuskaniniRef}>
				<span>bushkanini</span>
			</div>

			<section className={`${styles.aboutMe} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div ref={aboutMeTextRef} className={styles.aboutMeTexts}>
						<h2>{data?.translations[0].about_me_description.blocks[0].data.text}</h2>
						{data?.translations[0].about_me_description.blocks.slice(1).map((block, index) => (
							<p key={index}>{block.data.text}</p>
						))}
					</div>

					<div className={styles.aboutMeInfo}>
						<div
							ref={aboutMeImageRef}
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
					<div className={styles.mainWrapper}>
						<h3>
							50+ <br/>
							Проєктів
						</h3>
					</div>

					{
						models.map((obj, i) => {
							return <Link key={i} href={obj.projectId} className={styles.project}
										style={{
											backgroundImage: `url(${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${obj.image})`,
										}}
							/>
						})
					}

					<div className={styles.aboutProjectsButtons}>
						<a href="#projects" className={styles.projectsLink}>
							Переглянути проєкти
						</a>
						<button ref={arrowBtnRef} className={styles.arrowBtn}>
							<div className={styles.arrowIcon}>
								<BlackArrow/>
							</div>
						</button>
					</div>
				</div>
				<div
					className={styles.aboutProjectsText}
					ref={aboutProjectsTextRef}
				>
					{data?.translations[0].folder.blocks.map((block, index) => (
						<p key={index}>{block.data.text}</p>
					))}
				</div>
			</section>

			<section className={styles.askSection}>
				<HaveQuestion/>
			</section>
			<Footer />
		</>
	);
};

export default Page;

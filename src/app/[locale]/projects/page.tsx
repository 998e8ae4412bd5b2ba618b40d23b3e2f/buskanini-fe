"use client";
import { log } from "node:util";
import { DefaultProject } from "@/app/[locale]/projects/pageComponents";
import InteriorProject from "@/app/[locale]/projects/pageComponents/InteriorProject";
import Header from "@/app/components/header";
import { fetchGraphQL } from "@/app/lib/directus";
import gsap from "gsap";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "use-intl";
import PaginationArrow from "../../../../public/svg/PaginationArrow.svg";
import NavArrow from "../../../../public/svg/arrowNav.svg";
import styles from "./projects.module.scss";

interface ProjectTranslation {
	name: string;
}

interface ProjectImage {
	directus_files_id: string;
}

interface ProjectItem {
	model: string;
	drop: string;
	translations: ProjectTranslation[];
	project: { id: string };
	images: ProjectImage[];
}

const Page: React.FC = () => {
	const locale = useLocale();
	const lang = locale === "en" ? "en-US" : "ua-UA";

	const projectTypes = [
		{ name: "Інтер'єр", value: "interior" },
		{ name: "Рендер", value: "render" },
		{ name: "Моделювання", value: "modelling" },
	];

	const [projectsType, setProjectsType] = useState<string>(
		projectTypes[0].value,
	);
	const [projectsData, setProjectsData] = useState<
		Record<string, ProjectItem[]>
	>({
		interior: [],
		render: [],
		modelling: [],
	});

	const [projectCounts, setProjectCounts] = useState<Record<string, number>>({
		interior: 0,
		render: 0,
		modelling: 0,
	});

	const [currentPage, setCurrentPage] = useState(1);

	const arrowRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
		if (arrowRef.current) {
			gsap.to(arrowRef.current, {
				y: e.currentTarget.offsetTop,
			});
		}
	};

	const fetchModels = async () => {
		const query = `
		  query Models {
			modellingModels: models(filter: { drop: { _eq: "modelling" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model
        	  drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id}
			}
			renderModels: models(filter: { drop: { _eq: "render" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id}
			}
			interiorModels: models(filter: { drop: { _eq: "interior" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id}
			}
			interiorCount: models_aggregated(filter: { drop: { _eq: "interior" } }) {
				count {
					model
				}
			}
			renderCount: models_aggregated(filter: { drop: { _eq: "render" } }) {
				count {
					model
				}
			}
			 modellingCount: models_aggregated(filter: { drop: { _eq: "modelling" } }) {
				count {
					model
				}
			}
		}
		`;

		try {
			const response = await fetchGraphQL(query);
			setProjectsData({
				interior: response.data.interiorModels,
				render: response.data.renderModels,
				modelling: response.data.modellingModels,
			});

			setProjectCounts({
				interior: response.data.interiorCount[0].count.model,
				render: response.data.renderCount[0].count.model,
				modelling: response.data.modellingCount[0].count.model,
			});
		} catch (error) {
			console.error("Error fetching models:", error);
		}
	};

	useEffect(() => {
		fetchModels();
	}, [lang, projectsType, currentPage]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const currentProjects = projectsData[projectsType] || [];
	if (!currentProjects) return null;

	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.navLabel}>
					<nav>
						<ul>
							{projectTypes.map((item) => (
								<li key={item.value}>
									<button
										onClick={() => {
											setProjectsType(item.value);
											setCurrentPage(1);
										}}
										className={item.value === projectsType ? styles.active : ""}
									>
										{item.name}
									</button>
								</li>
							))}
						</ul>
					</nav>
					<p>
						Відкрийте для себе наші <br /> трансформаційні 3D-візуалізації.
					</p>
				</div>

				<div className={styles.projects}>
					<nav className={styles.projectsList}>
						<ul>
							{currentProjects &&
								currentProjects.map((el, i) => (
									<li key={i} onMouseEnter={handleMouseEnter}>
										<Link href="/">
											{el.translations.length > 0
												? el.translations[0].name
												: "Без назви"}
										</Link>
									</li>
								))}
						</ul>
						<div ref={arrowRef} className={styles.arrow}>
							<NavArrow />
						</div>
					</nav>

					<div className={styles.projectsGridPagination}>
						<div
							className={
								projectsType === "interior"
									? styles.interiorGrid
									: styles.defaultGrid
							}
						>
							{currentProjects.map((el, i) => {
								const imageUrl =
									el.images && el.images.length > 0
										? `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${el.images[0].directus_files_id}`
										: "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png";

								return projectsType === "interior" ? (
									<InteriorProject
										key={i}
										image={imageUrl}
										projectId={el.project.id}
									/>
								) : (
									<DefaultProject
										key={i}
										name={
											el.translations.length > 0
												? el.translations[0].name
												: "Без назви"
										}
										image={imageUrl}
										model={el.model ? el.model : ""}
										projectId={el.project.id}
									/>
								);
							})}
						</div>

						<div className={styles.pagination}>
							<button
								onClick={() => {
									scrollToTop();
									setTimeout(() => {
										setCurrentPage((prev) => Math.max(prev - 1, 1));
									}, 1000);
								}}
								disabled={currentPage === 1}
								className={`${currentPage > 1 ? styles.buttonActive : ""}`}
							>
								<PaginationArrow />
								Попередня сторінка
							</button>
							<div className={styles.circles}>
								{[...Array(Math.ceil(projectCounts[projectsType] / 8))].map(
									(_, idx) => (
										<div
											key={idx}
											className={`${styles.circle} ${currentPage === idx + 1 ? styles.active : ""}`}
											onClick={() => {
												scrollToTop();
												setTimeout(() => {
													setCurrentPage(idx + 1);
												}, 1000);
											}}
										/>
									),
								)}
							</div>

							<button
								onClick={() => {
									scrollToTop();
									setTimeout(() => {
										setCurrentPage((prev) => prev + 1);
									}, 1000);
								}}
								disabled={
									currentPage >= Math.ceil(projectCounts[projectsType] / 8)
								}
								className={`${currentPage < Math.ceil(projectCounts[projectsType] / 8) ? styles.buttonActive : ""}`}
							>
								Наступна сторінка
								<PaginationArrow />
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Page;

"use client";
import { DefaultProject, InteriorProject, ProjectsNav} from "@/app/[locale]/projects/pageComponents";
import Header from "@/app/components/header";
import { fetchGraphQL } from "@/app/lib/directus";
import React, {useState, useEffect, useRef} from "react";
import { useLocale } from "use-intl";
import PaginationArrow from "../../../../public/svg/PaginationArrow.svg";
import styles from "./projects.module.scss";
import LoadingScreen from "@/app/components/LoadingScreen";
import gsap from "gsap";

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
	const [isLoading, setIsLoading] = useState<boolean>(true)
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


	useEffect(() => {
		const fetchModels = async () => {
			const query = `
		  query Models {
			modellingModels: models(filter: { drop: { _eq: "modelling" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model { id } drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id { id } }
			}
			renderModels: models(filter: { drop: { _eq: "render" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model { id } drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id { id } }
			}
			interiorModels: models(filter: { drop: { _eq: "interior" } }, limit: 8, offset: ${(currentPage - 1) * 8}) {
			  model { id } drop translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) { name }
			  project { id }
			  images { directus_files_id { id } }
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

				setIsLoading(false)
			} catch (error) {
				console.error("Error fetching models:", error);
				setIsLoading(false)
			}
		};

		fetchModels();
	}, [lang, projectsType, currentPage]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const currentProjects = projectsData[projectsType] || [];
	const projectRefs = useRef<(HTMLDivElement | null)[]>([]);


	if (!currentProjects) return null;

	useEffect(() => {
		gsap.fromTo(
			projectRefs.current,
			{
				opacity: 0,
				y: 50,
			},
			{
				opacity: 1,
				y: 0,
				stagger: 0.2,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: {
					trigger: projectRefs.current,
					start: "top 80%",
					once: true
				},
			}
		);
	}, [currentProjects]);

	if (isLoading) {
		return (
			<LoadingScreen/>
		);
	}

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
					<ProjectsNav currentProjects={currentProjects}/>

					<div className={`${styles.projectsGridPagination} ${projectCounts[projectsType] / 8 > 1 ? '' : styles.bottomPadding}`}>
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
										? `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${el.images[0].directus_files_id.id}`
										: "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png";

								return (
									<div
										key={i}
										ref={(el) => (projectRefs.current[i] = el)} // Assign ref for each project
										className={styles.projectItem}
									>
										{projectsType === "interior" ? (
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
												model={el.model.id ? el.model.id : ""}
												projectId={el.project.id}
											/>
										)}
									</div>
								)
							})}
						</div>

						{projectCounts[projectsType] / 8 > 1 && <div className={styles.pagination}>
							<button
								onClick={() => {
									scrollToTop();
									setTimeout(() => {
										setCurrentPage((prev) => Math.max(prev - 1, 1));
									}, 200);
								}}
								disabled={currentPage === 1}
								className={`${currentPage > 1 ? styles.buttonActive : ""}`}
							>
								<PaginationArrow/>
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
									}, 200);
								}}
								disabled={
									currentPage >= Math.ceil(projectCounts[projectsType] / 8)
								}
								className={`${currentPage < Math.ceil(projectCounts[projectsType] / 8) ? styles.buttonActive : ""}`}
							>
								Наступна сторінка
								<PaginationArrow/>
							</button>
						</div>}
					</div>

				</div>
			</main>
		</>
	);
};

export default Page;

"use client";
import { DefaultProject, InteriorProject, ProjectsNav } from "@/app/[locale]/projects/pageComponents";
import Header from "@/app/components/header";
import { fetchGraphQL } from "@/app/lib/directus";
import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "use-intl";
import PaginationArrow from "../../../../public/svg/PaginationArrow.svg";
import styles from "./projects.module.scss";
import LoadingScreen from "@/app/components/LoadingScreen";
import gsap from "gsap";
import Footer from "@/app/components/footer";
import ModelModal from "@/app/[locale]/project/[id]/components/ModelModal";

const Page: React.FC = () => {
	const locale = useLocale();
	const lang = locale === "en" ? "en-US" : "ua-UA";

	const projectTypes = [
		{ name: "3D Моделювання", value: "modelling" },
		{ name: "Інтер'єр", value: "interior" },
		{ name: "Екстер'єр", value: "exterior" },
	];

	const [projectsType, setProjectsType] = useState<string>(
		projectTypes[0].value
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [modelModalActive, setModelModalActive] = useState<boolean>(false);
	const [model, setModel] = useState<string>('')
	const [projectsData, setProjectsData] = useState<Record<string, any[]>>({
		interior: [],
		exterior: [],
		modelling: [],
	});

	const [projectCounts, setProjectCounts] = useState<Record<string, number>>({
		interior: 0,
		exterior: 0,
		modelling: 0,
	});

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchModels = async () => {
			const query = `
        query Models {
          modellingModels: models(limit: 8, offset: ${(currentPage - 1) * 8}) {
            translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
              name
            }
            project {
              id
            }
            model {
				id
			}
            images(limit: 1) {
              directus_files_id {
                id
              }
            }
          }
          interiorModels: projects(filter: { type: { _eq: "interior" } }, limit: 8,  offset: ${(currentPage - 1) * 8}) {
            id
            translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
              name
            }
            photos(limit: 1) {
              directus_files_id {
                id
              }
            }
          }
          exteriorModels: projects(filter: { type: { _eq: "exterior" } }, limit: 8,  offset: ${(currentPage - 1) * 8}) {
            id
            translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
              name
            }
            photos(limit: 1) {
              directus_files_id {
                id
              }
            }
          }
          modellingCount: models_aggregated {
            count {
              model
            }
          }
          interiorCount: projects_aggregated(filter: { type: { _eq: "interior" } }) {
            count {
              type
            }
          }
          exteriorCount: projects_aggregated(filter: { type: { _eq: "exterior" } }) {
            count {
              type
            }
          }
        }
      `;

			try {
				const response = await fetchGraphQL(query);
				const {
					modellingModels,
					interiorModels,
					exteriorModels,
					modellingCount,
					interiorCount,
					exteriorCount,
				} = response.data;
				const interior = interiorModels.map((obj: { translations: { name: any; }[]; id: any; photos: { directus_files_id: { id: any; }; }[]; }) => {
					return ({
						name: obj?.translations[0]?.name,
						projectId: obj?.id,
						image: obj?.photos[0].directus_files_id.id
					})
				})

				const exterior = exteriorModels.map((obj: { translations: { name: any; }[]; id: any; photos: { directus_files_id: { id: any; }; }[]; }) => {
					return ({
						name: obj?.translations[0]?.name,
						projectId: obj?.id,
						image: obj?.photos[0].directus_files_id.id
					})
				})

				const modelling = modellingModels.map((obj: { translations: { name: any; }[]; project: { id: any; }; model: { id: any; }; images: { directus_files_id: { id: any; }; }[]; }) => {
					return ({
						name: obj?.translations[0]?.name,
						projectId: obj?.project?.id,
						model: obj?.model?.id,
						image: obj?.images[0]?.directus_files_id?.id
					})
				})

				setProjectsData({
					interior: interior,
					exterior: exterior,
					modelling: modelling,
				});

				setProjectCounts({
					interior: interiorCount[0]?.count?.type || 0,
					exterior: exteriorCount[0]?.count?.type || 0,
					modelling: modellingCount[0]?.count?.model || 0,
				});

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching models:", error);
				setIsLoading(false);
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


	useEffect(() => {
		if (currentProjects.length === 0) return;
		gsap.killTweensOf(projectRefs.current);
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
					once: true,
				},
			}
		);
	}, [projectsData]);

	if (!currentProjects) return null;

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<>
			<ModelModal
				model={model}
				active={modelModalActive}
				setActive={setModelModalActive}
			/>
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
					<ProjectsNav currentProjects={currentProjects} />

					<div
						className={`${styles.projectsGridPagination} ${
							projectCounts[projectsType] / 8 > 1 ? "" : styles.bottomPadding
						}`}
					>
						<div
							className={
								projectsType !== "modelling"
									? styles.interiorGrid
									: styles.defaultGrid
							}
						>
							{currentProjects.map((el, i) => {
								const imageUrl =
									el.image && el.image !== ''
										? `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${el.image}`
										: "https://www.landuse-ca.org/wp-content/uploads/2019/04/no-photo-available.png";

								return (
									<div
										key={i}
										ref={(el) => {
											projectRefs.current[i] = el;
										}}
										className={styles.projectItem}
									>
										{projectsType !== "modelling" ? (
											<InteriorProject
												key={i}
												image={imageUrl}
												name={el.name}
												projectId={el.projectId}
											/>
										) : (
											<DefaultProject
												key={i}
												name={
													el.name !== ''
														? el.name
														: "Без назви"
												}
												image={imageUrl}
												model={el.model ? el.model : ""}
												projectId={el.projectId}
												setModelModalActive={setModelModalActive}
												setModel={setModel}
											/>
										)}
									</div>
								);
							})}
						</div>

						{projectCounts[projectsType] / 8 > 1 && (
							<div className={styles.pagination}>
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
									<PaginationArrow />
									Попередня сторінка
								</button>
								<div className={styles.circles}>
									{[...Array(Math.ceil(projectCounts[projectsType] / 8))].map(
										(_, idx) => (
											<div
												key={idx}
												className={`${styles.circle} ${
													currentPage === idx + 1 ? styles.active : ""
												}`}
												onClick={() => {
													scrollToTop();
													setTimeout(() => {
														setCurrentPage(idx + 1);
													}, 1000);
												}}
											/>
										)
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
									className={`${
										currentPage < Math.ceil(projectCounts[projectsType] / 8)
											? styles.buttonActive
											: ""
									}`}
								>
									Наступна сторінка
									<PaginationArrow />
								</button>
							</div>
						)}
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Page;

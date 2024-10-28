import React from "react";
import Header from "@/app/components/header";
import styles from "./projects.module.scss";
import Link from "next/link";
import PaginationArrow from "../../../../public/svg/PaginationArrow.svg";
import InteriorProject from "@/app/[locale]/projects/pageComponents/InteriorProject";
import DefaultLayout from "next/dist/client/components/default-layout";
import {DefaultProject} from "@/app/[locale]/projects/pageComponents";

const Page = () => {
	const project = [
		{
			name: "Zenith Lounge Chair",
			image: "https://picsum.photos/2550/1440",
			is3D: false,
		},
		{
			name: "Zenith Horizon",
			image: "https://picsum.photos/2550/1440",
			is3D: true,
		},
		{
			name: "Lumina Residence",
			image: "https://picsum.photos/2550/1440",
			is3D: false,
		},
		{
			name: "Slate Pavilion Stool",
			image: "https://picsum.photos/2550/1440",
			is3D: true,
		},
		{
			name: "Vertex Studio Chair",
			image: "https://picsum.photos/2550/1440",
			is3D: false,
		},
		{
			name: "Aura Gardens Swing",
			image: "https://picsum.photos/2550/1440",
			is3D: true,
		},
		{
			name: "Echo Loft Rocker",
			image: "https://picsum.photos/2550/1440",
			is3D: false,
		},
		{
			name: "Lumina Residence Sofa",
			image: "https://picsum.photos/2550/1440",
			is3D: true,
		},
	];

	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.navLabel}>
					<nav>
						<ul>
							<li>
								<button className={styles.active}>Інтерєр</button>
							</li>
							<li>
								<button>Рендер</button>
							</li>
							<li>
								<button>Моделювання</button>
							</li>
						</ul>
					</nav>

					<p>
						Відкрийте для себе наші <br /> трансформаційні 3D-візуалізації.
					</p>
				</div>

				<div className={styles.projects}>
					<nav className={styles.projectsList}>
						<ul>
							{project.map((el) => (
								<li key={el.name}>
									<Link href="/">{el.name}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className={styles.projectsGridPagination}>
						<div className={styles.interiorGrid}>
							{project.map((el) => (
								<InteriorProject image={el.image} />
							))}
						</div>

						<div className={styles.pagination}>
							<button>
								<PaginationArrow />
								Попередня сторінка
							</button>

							<div className={styles.circles}>
								<div className={`${styles.circle} ${styles.active}`} />
								<div className={`${styles.circle}`} />
								<div className={`${styles.circle}`} />
								<div className={`${styles.circle}`} />
								<div className={`${styles.circle}`} />
							</div>

							<button>
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

'use client'
import React, { useState, useRef, useEffect } from "react";
import Header from "@/app/components/header";
import styles from "./projects.module.scss";
import Link from "next/link";
import PaginationArrow from "../../../../public/svg/PaginationArrow.svg";
import NavArrow from "../../../../public/svg/arrowNav.svg";
import { DefaultProject } from "@/app/[locale]/projects/pageComponents";
import gsap from 'gsap';
import InteriorProject from "@/app/[locale]/projects/pageComponents/InteriorProject";

interface Project {
	name: string;
	image: string;
	is3D: boolean;
}

const Page: React.FC = () => {
	const projectTypes = ["Інтер'єр", "Рендер", "Моделювання"];
	const [projectsType, setProjectsType] = useState<string>(projectTypes[0]);

	const projects: Project[] = [
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

	const arrowRef = useRef<HTMLDivElement>(null);
	const menuItemRefs = useRef<HTMLLIElement[]>([]);
	const [isPhone, setIsPhone] = useState<boolean>(false)

	const addToRefs = (el: HTMLLIElement) => {
		if (el && !menuItemRefs.current.includes(el)) {
			menuItemRefs.current.push(el);
		}
	};

	useEffect(() => {
		menuItemRefs.current.forEach((item) => {
			item.addEventListener('mouseenter', () => {
				if (arrowRef.current) {
					gsap.to(arrowRef.current, {
						y: item.offsetTop
					});
				}
			});
		});

		return () => {
			menuItemRefs.current.forEach((item) => {
				item.removeEventListener('mouseenter', () => {});
			});
		};
	}, []);

	useEffect(() => {
		window.innerWidth < 768 && setIsPhone(true)
	}, [])

	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.navLabel}>
					<nav>
						<ul>
							{projectTypes.map((item) => (
								<li key={item}>
									<button
										onClick={() => setProjectsType(item)}
										className={`${item === projectsType ? styles.active : ''}`}
									>
										{item}
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
							{projects.map((el) => (
								<li ref={addToRefs} key={el.name}>
									<Link href="/">{el.name}</Link>
								</li>
							))}
						</ul>
						<div ref={arrowRef} className={styles.arrow} style={{ color: "red" }}>
							<NavArrow/>
						</div>
					</nav>

					<div className={styles.projectsGridPagination}>
						<div className={`${projectsType === projectTypes[0] ? styles.interiorGrid : styles.defaultGrid}`}>
							{projects.map((el) => (
								projectsType === projectTypes[0]
									? <InteriorProject key={el.name} image={el.image}/>
									: <DefaultProject key={el.name} image={el.image} name={el.name} />
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

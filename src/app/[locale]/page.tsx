"use client";
import styles from "@/app/[locale]/home/page.module.scss";
import "@/app/[locale]/home/page.scss";
import ScrollDown from "../../../public/svg/arrow-down-circle.svg";

import {
	InfinitySlider,
	ServiceCard,
	SwiperComponent,
	TitleWithSubtitle,
} from "@/app/[locale]/home/components/HomeCoponents";
import WordCycler from "@/app/components/WordCycler";
import HaveQuestion from "@/app/components/haveQuestion";
import Header from "@/app/components/header";
import gsap from "gsap";
import Link from "next/link";
import React, {useEffect, useLayoutEffect, useRef} from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/app/components/footer";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const scrollToSection = () => {
		gsap.to(window, {
			duration: 1,
			scrollTo: {
				y: "#collaborateSection",
				offsetY: 0,
			},
			ease: "power2.inOut",
		});
	};

	const cardRefs = useRef<HTMLDivElement[]>([]);

	const addToRefs = (el: HTMLDivElement | null) => {
		if (el && !cardRefs.current.includes(el)) {
			cardRefs.current.push(el);
		}
	};

	useEffect(() => {
		if (cardRefs.current.length > 0) {
			gsap.fromTo(
				cardRefs.current,
				{ opacity: 0, x: "100vw" },
				{
					x: 0,
					opacity: 1,
					duration: 1.5,
					stagger: 0.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: cardRefs.current[0],
						start: "top 60%",
					},
					onComplete: () => {
						cardRefs.current.forEach((card) => {
							card.style.transition = "0.5s ease";
							card.classList.add("cardHoverAnim");
						});
					},
				}
			);
		}
	}, []);

	return (
		<>
			<section className={styles.banner}>
				<Header />

				<div className={styles.centerText}>
					<h1>
						3D візуалізація <br /> для
						<span>
							<WordCycler
								words={["комерції", "архітектури", "інтер'єрів"]}
								intervalTime={60}
								delayBetweenWords={200}
							/>
						</span>
					</h1>

					<p>
						Створюємо реалістичні <span>3D візуалізації</span> для бізнесу,
						архітектури та реклами.
					</p>
				</div>

				<div className={styles.scrollDown} onClick={scrollToSection}>
					<ScrollDown />
					<span>Прокрутіть униз</span>
				</div>

				<div className={styles.bannerContainer}>
					<img
						className={styles.bannerImage}
						alt="interior image"
						src="/images/home/banerImage.webp"
					/>
				</div>
			</section>

			<main className={styles.main}>
				<section id="collaborateSection" className={styles.sectionCollaborate}>
					<TitleWithSubtitle
						title="Співпраця"
						subtitle={`Співпраці з компаніями, \nякими пишаємося`}
					/>

					<div className={styles.slidersContainer}>
						<InfinitySlider />
						<InfinitySlider left={true} />
						<InfinitySlider />
					</div>
				</section>

				<section className={`${styles.sectionServices} ${styles.container}`}>
					<TitleWithSubtitle
						title="Послуги"
						subtitle={`Індивідуальні послуги 3D-дизайну \nщоб задовольнити всі ваші потреби.`}
					/>

					<div className={styles.cardServices}>
						<ServiceCard
							ref={addToRefs}
							title="3D Modelling"
							subtitle="Transforming Ideas into Reality"
							description={`Ваша візуалізація — наш політ фантазії. Ми створюємо простори, де ваш продукт стає центром уваги.\n\nОрганічно, вишукано, стильно.`}
						/>
						<ServiceCard
							ref={addToRefs}
							title="3D Product Rendering"
							subtitle="Lights. Camera. Wow!"
							description={`Покажіть свій продукт у вигідному світлі. \n\nМи додаємо магію до кожної текстури та матеріалу, створюючи образи, що викликають захоплення.`}
						/>
						<ServiceCard
							ref={addToRefs}
							title="3D Interior Visualization"
							subtitle="Static is Boring, Let’s Move!"
							description={`Динаміка — це новий стандарт. Покажіть світові, як ваш продукт працює та виглядає у русі.\n\nМи додаємо життя кожному кадру.`}
						/>
					</div>
				</section>

				<section
					className={`${styles.sectionFurnitureDesign} ${styles.container}`}
				>
					<TitleWithSubtitle
						title="Дизайн меблів"
						subtitle={`Відкрийте для себе наші \nтрансформаційні 3D-візуалізації.`}
					/>

					<div className={styles.sliderContainer}>
						<SwiperComponent/>

						<Link href="/en/projects" className={styles.seeMore}>
							Переглянути більше
						</Link>
					</div>
				</section>

				<section className={styles.sectionQuestion}>
					<HaveQuestion/>
				</section>
			</main>

			<Footer />
		</>
	);
}

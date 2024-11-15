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
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	const t = useTranslations("Home")
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
	const locale = useLocale();

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
						{t("3DVisualisation")} <br /> {t("for")}
						<span>
							<WordCycler
								words={[t("commercial"), t("architecture"), t("interiors")]}
								intervalTime={60}
								delayBetweenWords={200}
							/>
						</span>
					</h1>

					<p>
						{t('realisticVisualizations')} <span>{t("3DVisualisationParagraph")}</span> {t('forBusinessArchitectureAdvertising')}
					</p>
				</div>

				<div className={styles.scrollDown} onClick={scrollToSection}>
					<ScrollDown />
					<span>{t("ScrollDown")}</span>
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
						title={t('collaborationTitle')}
						subtitle={t('collaborationSubtitle')}
					/>

					<div className={styles.slidersContainer}>
						<InfinitySlider />
						<InfinitySlider left={true} />
						<InfinitySlider />
					</div>
				</section>

				<section className={`${styles.sectionServices} ${styles.container}`}>
					<TitleWithSubtitle
						title={t("servicesTitle")}
						subtitle={t("servicesSubtitle")}
					/>

					<div className={styles.cardServices}>
						<ServiceCard
							ref={addToRefs}
							title={t("cardServiceFirstTitle")}
							subtitle={t("cardServiceFirstSubtitle")}
							description={t("cardServiceFirstDescription")}
						/>
						<ServiceCard
							ref={addToRefs}
							title={t("cardServiceSecondTitle")}
							subtitle={t("cardServiceSecondSubtitle")}
							description={t("cardServiceSecondDescription")}
						/>
						<ServiceCard
							ref={addToRefs}
							title={t("cardServiceThirdTitle")}
							subtitle={t("cardServiceThirdSubtitle")}
							description={t("cardServiceThirdDescription")}
						/>
					</div>
				</section>

				<section
					className={`${styles.sectionFurnitureDesign} ${styles.container}`}
				>
					<TitleWithSubtitle
						title={t("productDesignTitle")}
						subtitle={t("productDesignSubtitle")}
					/>

					<div className={styles.sliderContainer}>
						<SwiperComponent/>

						<Link href={`/${locale}/projects`} className={styles.seeMore}>
							{t("seeMore")}
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

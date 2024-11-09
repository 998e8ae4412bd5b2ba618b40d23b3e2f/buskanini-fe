import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./serviceBlock.module.scss";

interface Props {
	title: string;
	content: string[];
	ctaText: string;
}

gsap.registerPlugin(ScrollTrigger);

const Index: React.FC<Props> = ({ title, content, ctaText }) => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const paragraphsRef = useRef<HTMLParagraphElement[]>([]);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const buttonTextRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (sectionRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);

			gsap.fromTo(
				paragraphsRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					stagger: 0.2,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);

			gsap.fromTo(
				buttonRef.current,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					delay: 0.5,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);

	useEffect(() => {
		const button = buttonRef.current;
		if (button) {
			const handleMouseEnter = () => {
				gsap.to(button, { background: "#F6F6F6", duration: 0.3, ease: "power2.out" });
			};

			const handleMouseLeave = () => {
				gsap.to(button, { background: "#F3E2C6", duration: 0.3, ease: "power2.out" });
			};

			button.addEventListener("mouseenter", handleMouseEnter);
			button.addEventListener("mouseleave", handleMouseLeave);

			return () => {
				button.removeEventListener("mouseenter", handleMouseEnter);
				button.removeEventListener("mouseleave", handleMouseLeave);
			};
		}
	}, []);

	useEffect(() => {
		if (buttonRef.current && buttonTextRef.current && sectionRef.current) {
			const link = buttonRef.current;
			const linkText = buttonTextRef.current;
			const block = sectionRef.current;

			gsap.timeline({
				scrollTrigger: {
					trigger: block,
					start: "top 40%",
					toggleActions: "play none none none",
				},
			})
				.fromTo(
					link,
					{ scaleX: 0, transformOrigin: "center", opacity: 0 },
					{ scaleX: 1, duration: 0.5, opacity: 1, delay: 0.4, ease: "power2.out" }
				)
				.fromTo(
					linkText,
					{ opacity: 0 },
					{ opacity: 1, duration: 1, ease: "power2.out", delay: 0.1 }
				);
		}
	}, []);

	return (
		<div className={styles.section} ref={sectionRef}>
			<h2 className={styles.title} ref={titleRef}>
				{title}
			</h2>
			<div className={styles.contentWrapper}>
				{content.map((item, index) => (
					<p
						key={index}
						ref={(el) => {
							paragraphsRef.current[index] = el!;
						}}
						className={styles.paragraph}
						dangerouslySetInnerHTML={{ __html: item }}
					/>
				))}
			</div>
			<button className={styles.ctaButton} ref={buttonRef}>
				<span ref={buttonTextRef}>{ctaText}</span>
			</button>
		</div>
	);
};

export default Index;
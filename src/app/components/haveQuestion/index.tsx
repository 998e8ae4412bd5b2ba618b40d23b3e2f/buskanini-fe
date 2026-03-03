import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./haveQuestion.module.scss";
import Link from "next/link";
import { useLocale } from "use-intl";
import {useTranslations} from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
	const locale = useLocale();
	const linkRef = useRef<HTMLAnchorElement>(null);
	const linkTextRef = useRef<HTMLSpanElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);
	const t = useTranslations("AskQuestions")

	useEffect(() => {
		const link = linkRef.current;
		if (!link) return;

		const handleMouseEnter = () => {
			gsap.to(link, { background: '#F6F6F6', duration: 0.3, ease: "power2.out" });
		};
		const handleMouseLeave = () => {
			gsap.to(link, { background: '#F3E2C6', duration: 0.3, ease: "power2.out" });
		};

		link.addEventListener("mouseenter", handleMouseEnter);
		link.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			link.removeEventListener("mouseenter", handleMouseEnter);
			link.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	useEffect(() => {
		if (linkRef.current && linkTextRef.current && blockRef.current) {
			const link = linkRef.current;
			const linkText = linkTextRef.current;
			const block = blockRef.current;

			const tl = gsap.timeline({
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

			return () => {
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		}
	}, []);

	const h4Ref = useRef<HTMLHeadingElement>(null);
	const pRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const triggers: ScrollTrigger[] = [];

		const animateText = (element: HTMLElement | null) => {
			if (!element) return;

			const text = element.textContent || '';
			const splitText = text.split(' ');
			element.innerHTML = splitText.map(word => `<span>${word}</span>`).join(' ');

			const anim = gsap.fromTo(
				element.querySelectorAll('span'),
				{
					opacity: 0,
					y: 50,
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: element,
						start: 'top 90%',
						once: true,
					},
				}
			);
			if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
		};

		animateText(h4Ref.current);
		animateText(pRef.current);

		return () => {
			triggers.forEach(t => t.kill());
		};
	}, []);

	return (
		<div ref={blockRef} className={styles.haveQuestion}>
			<h4 ref={h4Ref}>{t("title")}</h4>
			<p ref={pRef}>{t("subtitle")}</p>

			<Link ref={linkRef} href={`/${locale}/contacts`} className={styles.animatedLink}>
				<span ref={linkTextRef} className={styles.linkText}>{t("contact")}</span>
			</Link>
		</div>
	);
};

export default Index;

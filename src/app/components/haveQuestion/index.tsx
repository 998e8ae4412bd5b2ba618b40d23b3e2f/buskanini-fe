import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./haveQuestion.module.scss";
import Link from "next/link";
import { useLocale } from "use-intl";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
	const locale = useLocale();
	const linkRef = useRef<HTMLAnchorElement>(null);
	const linkTextRef = useRef<HTMLSpanElement>(null);
	const blockRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (linkRef.current) {
			const link = linkRef.current;

			link.addEventListener("mouseenter", () => {
				gsap.to(link, {  background: '#F6F6F6', duration: 0.3, ease: "power2.out" });
			});

			link.addEventListener("mouseleave", () => {
				gsap.to(link, { background: '#F3E2C6', duration: 0.3, ease: "power2.out" });
			});
		}

		return () => {
			if (linkRef.current) {
				linkRef.current.removeEventListener("mouseenter", () => {});
				linkRef.current.removeEventListener("mouseleave", () => {});
			}
		};
	}, []);

	useEffect(() => {
		if (linkRef.current && linkTextRef.current && blockRef.current) {
			const link = linkRef.current;
			const linkText = linkTextRef.current;
			const block = blockRef.current;

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

	const h4Ref = useRef<HTMLHeadingElement>(null);
	const pRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const animateText = (element: HTMLElement | null) => {
			if (!element) return;

			const text = element.textContent || '';
			const splitText = text.split(' ');
			element.innerHTML = splitText.map(word => `<span>${word}</span>`).join(' ');

			gsap.fromTo(
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
		};

		animateText(h4Ref.current);
		animateText(pRef.current);
	}, []);

	return (
		<div ref={blockRef} className={styles.haveQuestion}>
			<h4 ref={h4Ref}>Маєте запитання?</h4>
			<p ref={pRef}>
				Пишіть нам у будь-який час — ми завжди на зв'язку, щоб допомогти
				створити ваш ідеальний простір.
			</p>

			<Link ref={linkRef} href={`${locale}/contacts`} className={styles.animatedLink}>
				<span ref={linkTextRef} className={styles.linkText}>
				  Написати
				</span>
			</Link>
		</div>
	);
};

export default Index;

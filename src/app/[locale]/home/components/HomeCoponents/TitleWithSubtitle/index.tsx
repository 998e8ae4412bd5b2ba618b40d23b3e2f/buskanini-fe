import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './titleWithSubtitle.module.scss'

gsap.registerPlugin(ScrollTrigger);

const TitleWithSubtitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			const title = containerRef.current.querySelector("h2");
			const subtitle = containerRef.current.querySelector("p");

			if (title && subtitle) {
				gsap.timeline({
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top 75%",
						end: "bottom 50%",
					},
				})
					.fromTo(
						title,
						{ opacity: 0, y: 50 },
						{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
					)
					.fromTo(
						subtitle,
						{ opacity: 0, y: 30 },
						{ opacity: 1, y: 0, duration: 1, ease: "power2.out" },
						"<0.3"
					);
			}
		}
	}, []);

	return (
		<div ref={containerRef} className={styles.TitleWithSubtitle}>
			<h2>{title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: subtitle.replace(/\n/g, "<br />"),
				}}
			/>
		</div>
	);
};

export default TitleWithSubtitle;

'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./footer.module.scss";

import Behance from "../../../../public/svg/socialMedia/behance.svg";
import Facebook from "../../../../public/svg/socialMedia/facebook.svg";
import Instagram from "../../../../public/svg/socialMedia/instagram.svg";
import Patreon from "../../../../public/svg/socialMedia/patreon.svg";
import Telegram from "../../../../public/svg/socialMedia/telegram.svg";
import { fetchGraphQL } from "@/app/lib/directus";
import { useLocale } from "use-intl";

interface SocialLinks {
	instagram: string;
	telegram: string;
	behance: string;
	facebook: string;
	patreon: string;
}

const Footer: React.FC = () => {
	const locale = useLocale();
	const [media, setMedia] = useState<SocialLinks | null>(null);
	const footerRef = useRef<HTMLDivElement | null>(null);
	const footerContentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Fetch social links
		const fetchMedia = async () => {
			const query = `
        query Social {
          social {
            instagram
            telegram
            behance
            facebook
            patreon
          }
        }
      `;

			try {
				const response = await fetchGraphQL(query);
				setMedia(response.data.social[0]);
			} catch (error) {
				console.error("Error fetching social media links:", error);
			}
		};
		fetchMedia();

		// GSAP Animation
		gsap.registerPlugin(ScrollTrigger);

		if (footerRef.current && footerContentRef.current) {
			// Animation for the entire footer
			gsap.fromTo(
				footerRef.current,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 70%",
						end: "top 50%",
						toggleActions: "play none none"
					},
				}
			);

			const elements = gsap.utils.toArray(
				footerContentRef.current.querySelectorAll("div, p, ul, li, a, span")
			);

			gsap.fromTo(
				elements,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					stagger: 0.1, // Delay between animations for each element
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 80%",
						end: "top 50%",
						toggleActions: "play none none",
					},
				}
			);
		}
	}, []);

	return (
		<footer className={styles.footer} ref={footerRef}>
			<div className={styles.footerContainer} ref={footerContentRef}>
				<div className={styles.footerInfoNav}>
					<div className={styles.footerInfo}>
						<Link href="">buskanini</Link>

						<p>
							Ми створюємо унікальні рішення та пропонуємо широкий асортимент
							меблів і освітлення, щоб перетворити кожен простір на джерело
							натхнення і затишку.
						</p>
					</div>

					<div className={styles.footerNav}>
						<div
							className={`${styles.footerNavList} ${styles.footerNavListContacts}`}
						>
							<div className={styles.title}>Контакти</div>

							<ul>
								{media && (
									<>
										<li>
											<Link
												className={styles.icon}
												href={media.instagram}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Instagram />
											</Link>
										</li>
										<li>
											<Link
												className={styles.icon}
												href={media.telegram}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Telegram />
											</Link>
										</li>
										<li>
											<Link
												className={styles.icon}
												href={media.patreon}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Patreon />
											</Link>
										</li>
										<li>
											<Link
												className={styles.icon}
												href={media.facebook}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Facebook />
											</Link>
										</li>
										<li>
											<Link
												className={styles.icon}
												href={media.behance}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Behance />
											</Link>
										</li>
									</>
								)}
							</ul>
						</div>

						<nav className={styles.footerNavList}>
							<div className={styles.title}>Секції</div>

							<ul className={styles.vertical}>
								<li>
									<Link href={`/${locale}`}>Головна</Link>
								</li>
								<li>
									<Link href={`/${locale}/projects`}>3D Проєкти</Link>
								</li>
								<li>
									<Link href={`/${locale}/about`}>Досвід</Link>
								</li>
								<li>
									<Link href={`/${locale}/services`}>Послуги</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className={styles.allRights}>
					<Link href='https://frant.digital' className={styles.madeByFrant}>Made by Frant</Link>
					<span>© 2024, buskanini, All Rights Reserved.</span>
				</div>

				<div className={styles.bgBuskanini}>buskanini</div>
			</div>
		</footer>
	);
};

export default Footer;

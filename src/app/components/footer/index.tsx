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
import {useTranslations} from "next-intl";

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
	const t = useTranslations("Footer")

	useEffect(() => {
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

		gsap.registerPlugin(ScrollTrigger);

		if (footerRef.current && footerContentRef.current) {
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
						start: "top 90%",
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
					stagger: 0.1,
					scrollTrigger: {
						trigger: footerRef.current,
						start: "top 90%",
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

						<p>{t("description")}</p>
					</div>

					<div className={styles.footerNav}>
						<div
							className={`${styles.footerNavList} ${styles.footerNavListContacts}`}
						>
							<div className={styles.title}>{t("contacts")}</div>

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
									<Link href={`/${locale}`}>{t("Home")}</Link>
								</li>
								<li>
									<Link href={`/${locale}/projects`}>{t("3DProjects")}</Link>
								</li>
								<li>
									<Link href={`/${locale}/about`}>{t("AboutUs")}</Link>
								</li>
								<li>
									<Link href={`/${locale}/services`}>{t("Services")}</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className={styles.allRights}>
					<Link href='https://frant.digital' className={styles.madeByFrant}>{t("MadeByFrant")}</Link>
					<span>{t("AllRightsReserved")}</span>
				</div>

				<div className={styles.bgBuskanini}>buskanini</div>
			</div>
		</footer>
	);
};

export default Footer;
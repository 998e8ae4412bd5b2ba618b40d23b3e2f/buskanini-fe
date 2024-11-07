'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./footer.module.scss";

import Behance from "../../../../public/svg/socialMedia/behance.svg";
import Facebook from "../../../../public/svg/socialMedia/facebook.svg";
import Instagram from "../../../../public/svg/socialMedia/instagram.svg";
import Patreon from "../../../../public/svg/socialMedia/patreon.svg";
import Telegram from "../../../../public/svg/socialMedia/telegram.svg";
import { fetchGraphQL } from "@/app/lib/directus";

interface SocialLinks {
	instagram: string;
	telegram: string;
	behance: string;
	facebook: string;
	patreon: string;
}

const Footer: React.FC = () => {
	const [media, setMedia] = useState<SocialLinks | null>(null);

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
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
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
						<div className={`${styles.footerNavList} ${styles.footerNavListContacts}`}>
							<div className={styles.title}>Контакти</div>

							<ul>
								{media && (
									<>
										<li>
											<Link className={styles.icon} href={media.instagram} target="_blank" rel="noopener noreferrer">
												<Instagram />
											</Link>
										</li>
										<li>
											<Link className={styles.icon} href={media.telegram} target="_blank" rel="noopener noreferrer">
												<Telegram />
											</Link>
										</li>
										<li>
											<Link className={styles.icon} href={media.patreon} target="_blank" rel="noopener noreferrer">
												<Patreon />
											</Link>
										</li>
										<li>
											<Link className={styles.icon} href={media.facebook} target="_blank" rel="noopener noreferrer">
												<Facebook />
											</Link>
										</li>
										<li>
											<Link className={styles.icon} href={media.behance} target="_blank" rel="noopener noreferrer">
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
									<Link href="/">Головна</Link>
								</li>
								<li>
									<Link href="/projects">3D Проєкти</Link>
								</li>
								<li>
									<Link href="/about">Досвід</Link>
								</li>
								<li>
									<Link href="/services">Послуги</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className={styles.allRights}>
					<span>© 2024, buskanini, All Rights Reserved.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

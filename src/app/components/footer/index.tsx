import React from "react";
import styles from "./footer.module.scss";
import Link from "next/link";

import Instagram from "../../../../public/svg/socialMedia/instagram.svg";
import Telegram from "../../../../public/svg/socialMedia/telegram.svg";
import Patreon from "../../../../public/svg/socialMedia/patreon.svg";
import Facebook from "../../../../public/svg/socialMedia/facebook.svg";
import Behance from "../../../../public/svg/socialMedia/behance.svg";

const Index = () => {
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
						<div className={styles.footerNavList}>
							<div className={styles.title}>Контакти</div>

							<ul>
								<li>
									<Link href="/">
										<Instagram />
									</Link>
								</li>
								<li>
									<Link href="/">
										<Telegram />
									</Link>
								</li>
								<li>
									<Link href="/">
										<Patreon />
									</Link>
								</li>
								<li>
									<Link href="/">
										<Facebook />
									</Link>
								</li>
								<li>
									<Link href="/">
										<Behance />
									</Link>
								</li>
							</ul>
						</div>

						<nav className={styles.footerNavList}>
							<div className={styles.title}>Секції</div>

							<ul className={styles.vertical}>
								<li>
									<Link href="/">Головна</Link>
								</li>
								<li>
									<Link href="/">3D Проєкти</Link>
								</li>
								<li>
									<Link href="/">Докладніше</Link>
								</li>
								<li>
									<Link href="/">Портфоліо</Link>
								</li>
								<li>
									<Link href="/">Послуги</Link>
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

export default Index;

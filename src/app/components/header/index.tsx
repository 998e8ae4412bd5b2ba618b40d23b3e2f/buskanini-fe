import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import BurgerIcon from "../../../../public/svg/phone/burger-icon.svg";

const Index = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerLogo__block}>
				<Link href="/" className={styles.header__logo}>
					buskanini
				</Link>
			</div>

			<nav>
				<ul>
					<li>
						<Link href="/">Головна</Link>
					</li>
					<li>
						<Link href="/en/projects">3D Проєкти</Link>
					</li>
					<li>
						<Link href="/">Докладніше</Link>
					</li>
					<li>
						<Link href="/en/services">Досвід</Link>
					</li>
					<li>
						<Link href="/en/services">Послуги</Link>
					</li>
				</ul>
			</nav>

			<div className={styles.lanContacts}>
				<Link href="/en/contacts">Контакти</Link>

				<button>UA</button>
			</div>


			<div className={styles.burgerIcon}>
				<BurgerIcon/>
			</div>
		</header>
	);
};

export default Index;

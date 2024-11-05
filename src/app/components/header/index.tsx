'use client';
import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import BurgerIcon from '../../../../public/svg/phone/burger-icon.svg';
import BurgerHideIcon from '../../../../public/svg/phone/burger-hide-icon.svg';

const navItems = [
	{ name: 'Головна', link: '/' },
	{ name: '3D Проєкти', link: '/projects' },
	{ name: 'Досвід', link: '/about' },
	{ name: 'Послуги', link: '/services' },
];

const Header = () => {
	const [isBurgerMenuVisible, setIsBurgerMenuVisible] = React.useState(false);

	React.useEffect(() => {
		document.body.classList.toggle('no-scroll', isBurgerMenuVisible);
	}, [isBurgerMenuVisible]);

	const toggleBurgerMenu = () => {
		setIsBurgerMenuVisible((prev) => !prev);
	};

	return (
		<header className={`${styles.header} ${isBurgerMenuVisible ? styles.headerShow : ''}`}>
			<div className={styles.headerLogo__block}>
				<Link href="/" className={styles.header__logo}>
					buskanini
				</Link>
			</div>

			<nav>
				<ul>
					{navItems.map(({ name, link }, index) => (
						<li key={index}>
							<Link href={`/en${link}`}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.lanContacts}>
				<Link href="/en/contacts">Контакти</Link>
				<button>UA</button>
			</div>

			<div className={styles.burgerIcon} onClick={toggleBurgerMenu}>
				{isBurgerMenuVisible ? <BurgerHideIcon /> : <BurgerIcon />}
			</div>
		</header>
	);
};

export default Header;

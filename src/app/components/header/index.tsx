'use client';
import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import BurgerIcon from '../../../../public/svg/phone/burger-icon.svg';
import BurgerHideIcon from '../../../../public/svg/phone/burger-hide-icon.svg';

const Header = () => {
	const [showBurgerMenu, setShowBurgerMenu] = React.useState('idle');

	const toggleBurgerMenu = () => {
		setShowBurgerMenu(prevState => (prevState === 'show' ? 'hide' : 'show'));
	};

	console.log(showBurgerMenu)

	return (
		<header className={`${styles.header} ${showBurgerMenu === 'show' ? styles.headerShow : ''}`}>
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

			<div className={styles.burgerIcon} onClick={toggleBurgerMenu}>
				{showBurgerMenu === 'show' ? <BurgerHideIcon /> : <BurgerIcon />}
			</div>
		</header>
	);
};

export default Header;

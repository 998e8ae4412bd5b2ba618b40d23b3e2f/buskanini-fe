'use client';
import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import BurgerIcon from '../../../../public/svg/phone/burger-icon.svg';
import BurgerHideIcon from '../../../../public/svg/phone/burger-hide-icon.svg';

const Header = () => {
	const [showBurgerMenu, setShowBurgerMenu] = React.useState('idle');

	const toggleBurgerMenu = () => {
		showBurgerMenu !== 'show' ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');

		setShowBurgerMenu(prevState => (prevState === 'show' ? 'hide' : 'show'));
	};
	const navLinksRef = React.useRef(null);
	const nav = [
		{
			name: 'Головна',
			link: '/'
		},
		{
			name: '3D Проєкти',
			link: '/projects'
		},
		{
			name: 'Досвід',
			link: '/about'
		},
		{
			name: 'Послуги',
			link: '/services'
		}
	]

	return (
		<header className={`${styles.header} ${showBurgerMenu === 'show' ? styles.headerShow : ''}`}>
			<div className={styles.headerLogo__block}>
				<Link href="/" className={styles.header__logo}>
					buskanini
				</Link>
			</div>

			<nav>
				<ul ref={navLinksRef}>
					{nav.map((linkText, index) => (
						<li key={index}>
							<Link href={`/en${linkText.link}`} onClick={() => toggleBurgerMenu()}>{linkText.name}</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.lanContacts}>
				<Link href="/en/contacts">Контакти</Link>
				<button>UA</button>
			</div>

			<div className={styles.burgerIcon} onClick={toggleBurgerMenu}>
				{showBurgerMenu === 'show' ? <BurgerHideIcon/> : <BurgerIcon />}
			</div>
		</header>
	);
};

export default Header;
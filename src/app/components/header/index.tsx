"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import BurgerHideIcon from "../../../../public/svg/phone/burger-hide-icon.svg";
import BurgerIcon from "../../../../public/svg/phone/burger-icon.svg";
import styles from "./header.module.scss";
import { useLocale } from "use-intl"; // Додано useRouter для зміни мови
import { gsap } from "gsap";
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

const navItems = [
	{ name: "Home", link: "/" },
	{ name: "3DProjects", link: "/projects" },
	{ name: "AboutUs", link: "/about" },
	{ name: "Services", link: "/services" },
];

const Header = () => {
	const locale = useLocale();
	const router = useRouter(); // Додано для роботи з маршрутизатором
	const [isBurgerMenuVisible, setIsBurgerMenuVisible] = React.useState(false);
	const pathname = usePathname();
	const t = useTranslations("Header")

	const changeLanguage = () => {
		const newLocale = locale === "ua" ? "en" : "ua";

		const updatedPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

		router.push(updatedPathname);
	};

	React.useEffect(() => {
		document.body.classList.toggle("no-scroll", isBurgerMenuVisible);
	}, [isBurgerMenuVisible]);

	const toggleBurgerMenu = () => {
		if (!liRefs.current || !contactsRef.current || !bgScreenRef.current) return;

		gsap.killTweensOf([
			liRefs.current,
			contactsRef.current,
			bgScreenRef.current,
			lanRef.current,
			headerRef.current,
			navRef.current,
		]);

		if (!isBurgerMenuVisible) {
			gsap.set([liRefs.current], { opacity: 0, y: -20 });
			gsap.set(contactsRef.current, { opacity: 0, x: "-50%", y: 50 });
			gsap.set(bgScreenRef.current, { scale: 1, opacity: 1 });
			gsap.set(lanRef.current, { opacity: 0 });
			gsap.set(navRef.current, { opacity: 0, pointerEvents: "none" });

			gsap.to(navRef.current, {
				opacity: 1,
				pointerEvents: "auto",
				ease: "power2.out",
				duration: 0.5,
			});

			gsap.to(liRefs.current, {
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.2,
				ease: "power2.out",
			});

			gsap.to(contactsRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.2,
				ease: "power2.out",
				delay: 0.6,
			});

			gsap.to(bgScreenRef.current, {
				opacity: 1,
				scale: 55,
				duration: 1,
				ease: "power2.out",
			});

			gsap.to(headerRef.current, {
				height: `calc(100dvh - 2rem)`,
				ease: "power2.out",
			});

			gsap.to(lanRef.current, {
				opacity: 1,
				duration: 0.5,
				ease: "power2.out",
			});
		} else {
			gsap.to(liRefs.current, {
				opacity: 0,
				y: -20,
				duration: 0.2,
				stagger: 0.2,
				ease: "power2.in",
			});

			gsap.to(contactsRef.current, {
				opacity: 0,
				y: 50,
				duration: 0.5,
				ease: "power2.in",
				delay: 0.2,
			});

			gsap.to(bgScreenRef.current, {
				y: -100,
				scale: 1,
				duration: 1,
				ease: "power2.out",
				delay: 0.4,
			});

			gsap.to(lanRef.current, {
				opacity: 0,
				duration: 0.5,
				ease: "power2.out",
			});

			gsap.to(headerRef.current, {
				height: "auto",
				delay: 1,
				ease: "power2.out",
			});

			gsap.to(navRef.current, {
				opacity: 0,
				pointerEvents: "none",
				duration: 0.5,
				ease: "power2.out",
			});
		}

		setIsBurgerMenuVisible((prev) => !prev);
	};

	const headerRef = useRef(null);
	const ulRef = useRef(null);
	const navRef = useRef(null);
	const lanRef = useRef(null);
	const contactsRef = useRef(null);
	const bgScreenRef = useRef(null);
	const liRefs = useRef([]);

	useEffect(() => {
		gsap.fromTo(
			headerRef.current,
			{ opacity: 0, y: -50 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.out" }
		);

		gsap.fromTo(
			ulRef.current,
			{ opacity: 0, width: 0 },
			{ opacity: 1, width: "auto", duration: 1, ease: "power2.out", delay: 0.5 }
		);

		window.innerWidth > 768 &&
		gsap.fromTo(
			liRefs.current,
			{ opacity: 0, y: -20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.2,
				ease: "power2.out",
				delay: 1.2,
			}
		);
	}, []);

	return (
		<header
			ref={headerRef}
			className={`${styles.header} ${isBurgerMenuVisible ? styles.headerShow : ""}`}
		>
			<div className={styles.headerLogo__block}>
				<Link href="/" className={styles.header__logo}>
					buskanini
				</Link>
			</div>

			<nav ref={navRef}>
				<ul ref={ulRef}>
					{navItems.map(({ name, link }, index) => (
						<li
							key={index}
							ref={(el) => {
								if (el) {
									// @ts-ignore
									liRefs.current[index] = el;
								}
							}}
						>
							<Link href={`/${locale}${link}`}>{t(name)}</Link>
						</li>
					))}
				</ul>
			</nav>

			<div ref={contactsRef} className={styles.lanContacts}>
				<Link href={`/${locale}/contacts`}>{t("contacts")}</Link>
				<button
					className={styles.languageButton}
				>
					<span className={styles.languageText}>{locale.toUpperCase()}</span>
					<span onClick={changeLanguage} className={styles.languageHoverText}>
						{locale === "ua" ? "EN" : "UA"}
					</span>
				</button>
			</div>

			<button ref={lanRef} className={styles.lanButton}>
				{locale}
			</button>

			<div className={styles.burgerIcon} onClick={toggleBurgerMenu}>
				{isBurgerMenuVisible ? <BurgerHideIcon /> : <BurgerIcon />}
			</div>

			<div ref={bgScreenRef} className={styles.bgPhoneScreen} />
		</header>
	);
};

export default Header;

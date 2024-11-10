"use client";
import React, { useEffect, useState } from "react";
import Behance from "../../../../public/svg/goUp.svg";
import styles from "./goUpButton.module.scss";

const GoUpButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isAtBottom, setIsAtBottom] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleScroll = () => {
		const scrolled = window.scrollY;
		const threshold = document.documentElement.scrollHeight * 0.5;
		setIsVisible(scrolled > threshold);

		const isBottom =
			window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
		setIsAtBottom(isBottom);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<button
			className={`${isVisible ? styles.goUpButton : styles.goUpButtonIdle} ${
				isAtBottom ? styles.atBottom : ""
			}`}
			onClick={scrollToTop}
		>
			<div>
				<Behance />
			</div>
		</button>
	);
};

export default GoUpButton;

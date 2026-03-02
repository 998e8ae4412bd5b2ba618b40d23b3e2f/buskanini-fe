"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Behance from "../../../../public/svg/goUp.svg";
import styles from "./goUpButton.module.scss";

const GoUpButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isAtBottom, setIsAtBottom] = useState(false);
	const rafRef = useRef<number | null>(null);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleScroll = useCallback(() => {
		if (rafRef.current) return;
		rafRef.current = requestAnimationFrame(() => {
			const scrolled = window.scrollY;
			const threshold = document.documentElement.scrollHeight * 0.5;
			setIsVisible(scrolled > threshold);

			const isBottom =
				window.innerHeight + window.scrollY + 200 >= document.documentElement.scrollHeight - 1;
			setIsAtBottom(isBottom);
			rafRef.current = null;
		});
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [handleScroll]);

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

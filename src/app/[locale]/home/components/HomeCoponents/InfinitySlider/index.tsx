import type React from "react";
import LogoCompanyOne from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyOne.svg";
import LogoCompanyThree from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyThree.svg";
import LogoCompanyTwo from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyTwo.svg";
import styles from "./infinitySlider.module.scss";

interface ItemsProps {
	items: string[];
}

export const SliderItems = ({ items }: ItemsProps) => {
	return (
		<>
			{items.map((item, index) => (
				<div className={styles.item} key={index}>
					<img src={item} alt=""/>
				</div>
			))}
		</>
	);
};

interface SliderState {
	left?: boolean;
}

const InfinitySlider = ({ left = false }: SliderState) => {
	const logos = [
		'https://i.ibb.co/FVtRfS9/Logo-Company-Three.png',
		'https://i.ibb.co/Bt6xBtS/Logo-Company-Two.png',
		'https://i.ibb.co/WkczstK/Logo-Company-One.png',
		'https://i.ibb.co/FVtRfS9/Logo-Company-Three.png',
		'https://i.ibb.co/Bt6xBtS/Logo-Company-Two.png',
		'https://i.ibb.co/WkczstK/Logo-Company-One.png',
		'https://i.ibb.co/FVtRfS9/Logo-Company-Three.png',
		'https://i.ibb.co/Bt6xBtS/Logo-Company-Two.png',
		'https://i.ibb.co/WkczstK/Logo-Company-One.png',
		'https://i.ibb.co/WkczstK/Logo-Company-One.png',
	];

	return (
		<div className={styles.infinitySliderContainer}>
			<div
				className={`${styles.horizontalScrollingItems} ${left ? styles.left : ""}`}
			>
				<SliderItems items={logos} />
			</div>

			<div
				className={`${styles.horizontalScrollingItems} ${left ? styles.leftSecond : styles.second}`}
			>
				<SliderItems items={logos} />
			</div>
		</div>
	);
};

export default InfinitySlider;

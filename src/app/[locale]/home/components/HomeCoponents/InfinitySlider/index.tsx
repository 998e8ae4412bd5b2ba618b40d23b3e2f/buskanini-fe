import React from "react";
import styles from "./infinitySlider.module.scss";
import LogoCompanyOne from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyOne.svg";
import LogoCompanyTwo from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyTwo.svg";
import LogoCompanyThree from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyThree.svg";

interface ItemsProps {
	items: React.FC[];
}

export const SliderItems = ({ items }: ItemsProps) => {
	return (
		<>
			{items.map((ItemComponent, index) => (
				<div className={styles.item} key={index}>
					<ItemComponent />
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
		LogoCompanyOne,
		LogoCompanyTwo,
		LogoCompanyThree,
		LogoCompanyOne,
		LogoCompanyTwo,
		LogoCompanyThree,
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

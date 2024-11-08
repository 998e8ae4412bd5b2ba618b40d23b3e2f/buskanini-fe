import React, {useEffect, useState} from "react";
import LogoCompanyOne from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyOne.svg";
import LogoCompanyThree from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyThree.svg";
import LogoCompanyTwo from "../../../../../../../public/svg/sliderCompanyLogos/LogoCompanyTwo.svg";
import styles from "./infinitySlider.module.scss";
import {fetchGraphQL} from "@/app/lib/directus";

interface ItemsProps {
	items: string[];
}

export const SliderItems = ({ items }: ItemsProps) => {
	return (
		<>
			{items.map((item, index) => (
				<div className={styles.item} key={index}>
					<img src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${item}`} alt=""/>
				</div>
			))}
		</>
	);
};

interface SliderState {
	left?: boolean;
}

const InfinitySlider = ({ left = false }: SliderState) => {
	const [isPhone, setIsPhone] = useState<boolean>(false);
	const [logos, setLogos] = React.useState<string[]>([]);

	useEffect(() => {
		const fetchModels = async () => {
			const query = `
        query Collaboration_files {
          collaboration_files {
            directus_files_id {
              id
            }
          }
        }
      `;

			try {
				const response = await fetchGraphQL(query);
				const images = response.data.collaboration_files.map(
					(obj: any) => obj.directus_files_id.id
				);

				let finalImages = images;
				if (images.length < 9) {
					finalImages = [...images];
					while (finalImages.length < 9) {
						finalImages = [...finalImages, ...images].slice(0, 9); // Limit to 9
					}
				}

				setLogos(finalImages);
			} catch (error) {
				console.error("Error fetching models:", error);
			}
		};
		fetchModels();
	}, []);

	useEffect(() => {
		setIsPhone(window.innerWidth < 768);
	}, []);

	const dynamicWidth = logos.length <= 9 ? "100%" : `${100 + (logos.length - 9) * 10}%`;
	const dynamicAnimationDuration = logos.length <= 9 ? "20s" : `${20 + (logos.length - 9) * 2}s`;


	const slidesContainerSlides = {
		...(!isPhone ? { width: dynamicWidth } : { height: dynamicWidth }),
		animationDuration: dynamicAnimationDuration,
	};


	return (
		<div className={styles.infinitySliderContainer}>
			<div
				className={`${styles.horizontalScrollingItems} ${left ? styles.left : ""}`}
				style={slidesContainerSlides}
			>
				<SliderItems items={logos} />
			</div>

			<div
				className={`${styles.horizontalScrollingItems} ${left ? styles.leftSecond : styles.second}`}
				style={slidesContainerSlides}
			>
				<SliderItems items={logos} />
			</div>
		</div>
	);
};


export default InfinitySlider;

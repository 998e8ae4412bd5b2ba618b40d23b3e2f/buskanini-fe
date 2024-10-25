"use client";
import React, { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./swiperComponent.module.scss";
import { Pagination } from "swiper/modules";
import PreviewButton from "@/app/components/previewButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Slide {
	image: string;
}

interface SwiperComponentProps {
	elements: Slide[];
}
export const Slide = ({ image }: Slide) => {
	return (
		<article className={styles.sliderElement}>
			<img src="https://picsum.photos/200" alt="" />
			<PreviewButton />
		</article>
	);
};

export const SwiperComponent = ({ elements }: SwiperComponentProps) => {
	const swiperStyles: CSSProperties & { [key: string]: string | number } = {
		"--swiper-pagination-color": "#F3E2C6",
		"--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, .3)",
		"--swiper-pagination-bullet-inactive-opacity": "1",
		"--swiper-pagination-bullet-size": "1rem",
		"--swiper-pagination-bullet-horizontal-gap": "0.375rem",
		"--swiper-pagination-bottom": "35px",
	};

	const swiperStylesMobile: CSSProperties & { [key: string]: string | number } = {
		"--swiper-pagination-color": "#F3E2C6",
		"--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, .3)",
		"--swiper-pagination-bullet-inactive-opacity": "1",
		"--swiper-pagination-bullet-size": "0.794rem",
		"--swiper-pagination-bullet-horizontal-gap": "0.375rem",
		"--swiper-pagination-bottom": "1.5625rem",
	};


	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<Swiper
			style={isClient && window.innerWidth > 768 ? swiperStyles : swiperStylesMobile}
			slidesPerView={1.5}
			spaceBetween={25}
			className={`${styles.swiper}`}
			id="homeSlider"
			modules={[Pagination]}
			speed={500}
			centeredSlides={true}
			initialSlide={Math.floor(elements.length / 2)}
			loop={true}
			pagination={{
				clickable: true,
				dynamicBullets: true,
			}}
			breakpoints={{
				768: {
					slidesPerView: 3,
					spaceBetween: 40
				}
			}}
		>
			{elements.map((el, index) => (
				<SwiperSlide className="homeSlide" key={index}>
					<Slide image={el.image} key={index} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperComponent;

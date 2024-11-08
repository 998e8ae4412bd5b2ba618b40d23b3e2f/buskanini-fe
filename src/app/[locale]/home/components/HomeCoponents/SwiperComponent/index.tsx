"use client";
import PreviewButton from "@/app/components/previewButton";
import React, {useRef} from "react";
import { type CSSProperties, useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./swiperComponent.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchGraphQL } from "@/app/lib/directus";

const SWIPER_STYLES_DESKTOP: CSSProperties & {
	[key: string]: string | number;
} = {
	"--swiper-pagination-color": "#F3E2C6",
	"--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, .3)",
	"--swiper-pagination-bullet-inactive-opacity": "1",
	"--swiper-pagination-bullet-size": "1.4rem",
	"--swiper-pagination-bullet-horizontal-gap": "0.375rem",
	"--swiper-pagination-bottom": "1%",
};

const SWIPER_STYLES_MOBILE: CSSProperties & { [key: string]: string | number } =
	{
		"--swiper-pagination-color": "#F3E2C6",
		"--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, .3)",
		"--swiper-pagination-bullet-inactive-opacity": "1",
		"--swiper-pagination-bullet-size": "0.794rem",
		"--swiper-pagination-bullet-horizontal-gap": "0.375rem",
		"--swiper-pagination-bottom": "1.5625rem",
	};

interface Model {
	images: { directus_files_id: {id: string} }[];
	project: { id: string };
}

interface SlideProps {
	imageId: string;
	projectId: string;
}

const SlideComponent: React.FC<SlideProps> = ({ imageId, projectId }) => (
	<article
		className={styles.sliderElement}
		onClick={() => {
			window.location.href = `en/project/${projectId}`;
		}}
	>
		<img src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${imageId}`} alt="" />
		<PreviewButton />
	</article>
);

const SwiperComponent: React.FC = () => {
	const [models, setModels] = useState<Model[]>([]);
	const [isDesktop, setIsDesktop] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => setIsDesktop(window.innerWidth > 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const fetchModels = async () => {
			const query = `
				query Models {
				  models(limit: 8) {
					images {
					  directus_files_id { id }
					}
					project {
					  id
					}
				  }
				}
			  `;
			try {
				await fetchGraphQL(query).then(res => setModels(res.data.models));
			} catch (error) {
				console.error("Error fetching models:", error);
			}
		};
		fetchModels();
	}, []);

	return (
		models.length !== 0 && <Swiper
			initialSlide={2}
			style={isDesktop ? SWIPER_STYLES_DESKTOP : SWIPER_STYLES_MOBILE}
			slidesPerView={isDesktop ? 3 : 1.5}
			spaceBetween={isDesktop ? 40 : 25}
			centeredSlides={!isDesktop}
			className={styles.swiper}
			id="homeSlider"
			modules={[Pagination, Autoplay]}
			speed={500}
			loop
			pagination={{
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1
			}}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
			}}
		>
			{models.map((model, index) => (
				<SwiperSlide className="homeSlide" key={index}>
					<SlideComponent
						imageId={model.images[0]?.directus_files_id.id}
						projectId={model.project.id}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default SwiperComponent;

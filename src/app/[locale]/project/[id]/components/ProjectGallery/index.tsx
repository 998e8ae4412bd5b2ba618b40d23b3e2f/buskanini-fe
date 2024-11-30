import GalleryModal from "@/app/[locale]/project/[id]/components/GalleryModal";
import ModelModal from "@/app/[locale]/project/[id]/components/ModelModal";
import styles from "@/app/[locale]/project/[id]/project.module.scss";
import PreviewButton from "@/app/components/previewButton";
import React, {useEffect, useMemo, useState} from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper/types";
import ArrowButtonGallery from "../../../../../../../public/svg/arrowButtonGallery.svg";

const Index = ({ model, imageIds }: { model: string; imageIds: string[] }) => {
	const [isPhone, setIsPhone] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [galleryModalActive, setGalleryModalActive] = useState<string>("idle");
	const [modelModalActive, setModelModalActive] = useState<boolean>(false);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
	const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
	const handleNext = () => {
		if (mainSwiper) mainSwiper.slideNext();
	};
	const handlePrev = () => {
		if (mainSwiper) mainSwiper.slidePrev();
	};

	useEffect(() => {
		setIsPhone(window.innerWidth < 768);
	}, [imageIds]);

	const breakpoints = {
		0: {
			slidesPerView: 2,
		},
		778: {
			slidesPerView: 4,
		},
	};


	return (
		<>
			<ModelModal
				model={model}
				active={modelModalActive}
				setActive={setModelModalActive}
			/>
			<GalleryModal
				active={galleryModalActive}
				setModalActive={setGalleryModalActive}
				images={imageIds}
				handleNext={handleNext}
				handlePrev={handlePrev}
				setModelModalActive={setModelModalActive}
				initialSlide={activeIndex}
			/>
			<div className={styles.projectGallery}>
				<div className={styles.galleryBlock}>
					<div className={styles.swiperMainBlock}>
						<div className={styles.previous} onClick={handlePrev}>
							<ArrowButtonGallery />
						</div>
						<Swiper
							loop={true}
							onSwiper={setMainSwiper}
							spaceBetween={isPhone ? 25 : 100}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className={styles.swiperMain}
							onClick={() => {
								document.body.classList.add("no-scroll");
								setGalleryModalActive("show");
							}}
							onSlideChange={(swiper) => {
								setActiveIndex(swiper.realIndex);
							}}
						>
							{imageIds.length !== 0 &&
								imageIds.map((image: string, i: number) => (
									<SwiperSlide key={i} className={styles.slide}>
										<img src={image} alt={`Зображення ${i + 1}`} />
									</SwiperSlide>
								))}
						</Swiper>
						<div className={styles.next} onClick={handleNext}>
							<ArrowButtonGallery />
						</div>
						{model !== "" && (
							<PreviewButton
								onClick={() => {
									document.body.classList.add("no-scroll");
									setModelModalActive(true);
								}}
							/>
						)}
					</div>

					<div className={styles.swiperSecondaryBlock}>
						<Swiper
							loop={true}
							onSwiper={setThumbsSwiper}
							speed={1000}
							spaceBetween={28}
							watchSlidesProgress={true}
							modules={[FreeMode, Navigation, Thumbs]}
							className={styles.swiperSecondary}
							breakpoints={breakpoints}
							slidesPerView={4}
						>
							{imageIds.length !== 0 &&
								imageIds.map((image: string, i: number) => (
									<SwiperSlide key={i} className={styles.slide}>
										<img src={image} alt={`Мініатюра ${i + 1}`} />
									</SwiperSlide>
								))}
						</Swiper>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;

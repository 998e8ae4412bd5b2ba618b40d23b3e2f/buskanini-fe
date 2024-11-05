import React, { useEffect, useRef } from 'react';
import styles from './galleryModal.module.scss';
import ArrowButtonGallery from "../../../../../../../public/svg/arrowButtonGallery.svg";
import PreviewButton from "@/app/components/previewButton";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from 'swiper/types';

interface GalleryModalProps {
    active: string;
    setModalActive: (active: string) => void;
    images: string[];
    handleNext: () => void;
    handlePrev: () => void;
    setModelModalActive: (active: boolean) => void;
    initialSlide: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
                                                       active,
                                                       setModalActive,
                                                       images,
                                                       setModelModalActive,
                                                       initialSlide,
                                                   }) => {
    const swiperRef = useRef<SwiperCore>();

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideToLoop(initialSlide);
        }
    }, [initialSlide]);

    const closeModal = () => {
        document.body.classList.remove('no-scroll');
        setModalActive('out');
    };

    return (
        <section
            onClick={closeModal}
            className={`${styles.galleryModal} ${active === 'show' ? styles.show : ''} ${active === 'out' ? styles.out : ''}`}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.photoPagination}>
                    <div className={styles.close} onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M35 3.525L31.475 0L17.5 13.975L3.525 0L0 3.525L13.975 17.5L0 31.475L3.525 35L17.5 21.025L31.475 35L35 31.475L21.025 17.5L35 3.525Z" fill="#070707" />
                        </svg>
                    </div>
                    <div className={styles.photo}>
                        <Swiper
                            loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                swiper.slideToLoop(initialSlide, 0);
                            }}
                            className={styles.mainModalSwiper}
                        >
                            {images && images.map((image, i) => (
                                <SwiperSlide key={i}>
                                    <img src={image} alt={`Зображення ${i + 1}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className={styles.pagination}>
                        <div
                            className={styles.previous}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (swiperRef.current) {
                                    swiperRef.current.slidePrev();
                                }
                            }}
                        >
                            <ArrowButtonGallery viewBox="0 0 60 51" />
                        </div>
                        <PreviewButton
                            onClick={() => {
                                document.body.classList.add('no-scroll');
                                setModelModalActive(true);
                            }}
                        />
                        <div
                            className={styles.next}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (swiperRef.current) {
                                    swiperRef.current.slideNext();
                                }
                            }}
                        >
                            <ArrowButtonGallery viewBox="0 0 60 51" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GalleryModal;

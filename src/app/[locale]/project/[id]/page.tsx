'use client';
import React, { CSSProperties, useState, useEffect } from 'react';
import Header from "@/app/components/header";
import styles from './project.module.scss';
import './project.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import ArrowButtonGallery from '../../../../../public/svg/arrowButtonGallery.svg';

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import PreviewButton from "@/app/components/previewButton";
import PaginationArrow from "../../../../../public/svg/PaginationArrow.svg";
import HaveQuestion from "@/app/components/haveQuestion";
import GalleryModal from "@/app/[locale]/project/[id]/components/GalleryModal";
import ModelModal from "@/app/[locale]/project/[id]/components/ModelModal";

const Page = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [galleryModalActive, setGalleryModalActive] = useState<string>('idle');
    const [modelModalActive, setModelModalActive] = useState<boolean>(false);
    const [isPhone, setIsPhone] = useState<boolean>(false);

    useEffect(() => {
        setIsPhone(window.innerWidth < 768);
    }, []);

    const images: string[] = [
        "https://picsum.photos/1080/1920",
        "https://picsum.photos/1920/1080",
        "https://picsum.photos/1440/815",
        "https://picsum.photos/1080/1920",
        "https://picsum.photos/2550/1440"
    ];

    const handleNext = () => {
        if (mainSwiper) mainSwiper.slideNext();
    };
    const handlePrev = () => {
        if (mainSwiper) mainSwiper.slidePrev();
    };

    const swiperStyles: CSSProperties & { [key: string]: string | number } = isPhone ? {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "12.704px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "--swiper-pagination-bottom": "25px",
    } : {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "1.375rem",
        "--swiper-pagination-bullet-horizontal-gap": "7px",
        "--swiper-pagination-bottom": "1.75rem"
    };

    return (
        <>
            <section className={styles.banner}>
                <ModelModal active={modelModalActive} setActive={setModelModalActive} />
                <GalleryModal
                    active={galleryModalActive}
                    setModalActive={setGalleryModalActive}
                    images={images}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    setModelModalActive={setModelModalActive}
                    initialSlide={activeIndex}
                />

                <Header />

                <Swiper
                    style={swiperStyles}
                    className={styles.swiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    slidesPerView={1}
                    spaceBetween={25}
                    modules={[Pagination]}
                    speed={500}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {images.map((el, index) => (
                        <SwiperSlide key={index}>
                            <img src={el} alt={`Слайд ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            <main className={styles.main}>
                <section className={styles.galleryContainer}>
                    <h2 className={styles.projectTitle}>Frankof - Mexico Bed</h2>

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
                                        document.body.classList.add('no-scroll');
                                        setGalleryModalActive('show');
                                    }}
                                    onSlideChange={(swiper) => {
                                        setActiveIndex(swiper.realIndex);
                                    }}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image} alt={`Зображення ${i + 1}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className={styles.next} onClick={handleNext}>
                                    <ArrowButtonGallery />
                                </div>
                                <PreviewButton onClick={() => {
                                    document.body.classList.add('no-scroll');
                                    setModelModalActive(true);
                                }} />
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
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 2
                                        },
                                        778: {
                                            slidesPerView: 4
                                        }
                                    }}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image} alt={`Мініатюра ${i + 1}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.projectSection}>
                    <h2 className={styles.title}>Про проєкт</h2>
                    <p className={styles.description}>
                        Рендеринг, 3D моделювання та аналіз простору для нової колекції меблів бренду Artiq, <br />
                        створеної українським дизайнером Олексієм Марченком.
                    </p>

                    <div className={styles.detailsContainer}>
                        <div className={styles.detailItem}>
                            <h2 className={styles.detailTitle}>Дата створення</h2>
                            <p className={styles.detailValue}>2024</p>
                        </div>

                        <div className={styles.detailItem}>
                            <h2 className={styles.detailTitle}>Замовник</h2>
                            <p className={styles.detailValue}>Frankof</p>
                        </div>
                    </div>

                    <div className={styles.categoryContainer}>
                        <h2 className={styles.categoryTitle}>Категорія</h2>
                        <div className={styles.categoryButtons}>
                            <button className={styles.categoryButton}>Меблі для спальні</button>
                            <button className={styles.categoryButton}>Ліжка преміум-класу</button>
                            <button className={styles.categoryButton}>М'які ліжка</button>
                            <button className={styles.categoryButton}>
                                Індивідуальні меблі на замовлення
                            </button>
                        </div>
                    </div>
                </section>

                <div className={styles.pagination}>
                    <button>
                        <PaginationArrow />
                        Попередня сторінка
                    </button>

                    <button>
                        Наступна сторінка
                        <PaginationArrow />
                    </button>
                </div>

                <section className={styles.question}>
                    <HaveQuestion />
                </section>
            </main>
        </>
    );
};

export default Page;

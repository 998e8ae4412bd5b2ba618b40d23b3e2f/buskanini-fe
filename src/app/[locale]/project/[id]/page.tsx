'use client'
import React, {CSSProperties} from 'react';
import Header from "@/app/components/header";
import styles from './project.module.scss'
import {Swiper, SwiperSlide} from "swiper/react";
import {Swiper as SwiperCore} from "swiper/types";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import ArrowButtonGallery from '../../../../../public/svg/arrowButtonGallery.svg'

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
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperCore | null>(null);
    const [mainSwiper, setMainSwiper] = React.useState<SwiperCore | null>(null); // State for main swiper instance
    const [activeIndex, setActiveIndex] = React.useState<number>(0);
    const [galleryModalActive, setGalleryModalActive] = React.useState<string>('idle')
    const [modelModalActive, setModelModalActive] = React.useState<boolean>(false)
    const [isClient, setIsClient] = React.useState(false);
    const swiperStyles: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "1.375rem",
        "--swiper-pagination-bullet-horizontal-gap": "7px",
        "--swiper-pagination-bottom": "1.75rem"
    };

  const swiperStylesMobile: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "12.704px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "--swiper-pagination-bottom": "25px",
    };


    React.useEffect(() => {
        setIsClient(true);
    }, []);

  const images: string[] = [
        "https://picsum.photos/2550/1440",
        "https://picsum.photos/2550/1440",
        "https://picsum.photos/2550/1440",
        "https://picsum.photos/2550/1440",
        "https://picsum.photos/2550/1440"
    ];

    const handleNext = () => {
        if (mainSwiper) mainSwiper.slideNext();
    };
    const handlePrev = () => {
        if (mainSwiper) mainSwiper.slidePrev();
    };



    const isPhone = isClient && window.innerWidth < 768

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <section className={styles.banner}>
                <ModelModal active={modelModalActive} setActive={setModelModalActive}/>
                <GalleryModal active={galleryModalActive} setModalActive={setGalleryModalActive}
                              image={images[activeIndex]} handleNext={handleNext} handlePrev={handlePrev}/>
                <Header/>

                <Swiper
                    style={isPhone ? swiperStylesMobile : swiperStyles}
                    className={styles.swiper}
                    slidesPerView={1}
                    spaceBetween={25}
                    modules={[Pagination]}
                    speed={500}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}

                >
                    {images.map((el, index) => (
                        <SwiperSlide key={index}>
                            <img src={el} alt=""/>
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
                                    <ArrowButtonGallery/>
                                </div>
                                <Swiper
                                    loop={true}
                                    onSwiper={setMainSwiper}
                                    spaceBetween={isPhone ? 25 : 100}
                                    thumbs={{swiper: thumbsSwiper}}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={styles.swiperMain}
                                    onClick={() => setGalleryModalActive('show')}
                                    onSlideChange={(swiper) => {
                                        setActiveIndex(swiper.realIndex);
                                    }}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image}/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className={styles.next} onClick={handleNext}>
                                    <ArrowButtonGallery/>
                                </div>
                                <PreviewButton/>
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
                                            slidesPerView: 3
                                        }
                                    }}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image}/>
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
                        Рендеринг, 3D моделювання та аналіз простору для нової колекції меблів бренду Artiq, <br/>
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
                        <PaginationArrow/>
                        Попередня сторінка
                    </button>

                    <button>
                        Наступна сторінка
                        <PaginationArrow/>
                    </button>
                </div>

                <section className={styles.question}>
                    <HaveQuestion/>
                </section>
            </main>
        </>
    );
};

export default Page;

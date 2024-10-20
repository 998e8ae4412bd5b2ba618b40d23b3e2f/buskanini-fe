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

const Page = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperCore | null>(null);
    const [mainSwiper, setMainSwiper] = React.useState<SwiperCore | null>(null); // State for main swiper instance

    const swiperStyles: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "--swiper-pagination-bottom": "20px"
    };

    const images: string[] = [
        "https://i.pinimg.com/1200x/e6/6b/5c/e66b5c71de52d5bd02c3d9760b1f0e7f.jpg",
        "https://i.pinimg.com/564x/e8/c0/d9/e8c0d9d31d749f055a1a6a89a35c6fb1.jpg",
        "https://picsum.photos/1920",
        "https://picsum.photos/1919",
        "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
    ];

    const handleNext = () => {
        if (mainSwiper) {
            mainSwiper.slideNext(); // Go to the next slide
        }
    };

    const handlePrev = () => {
        if (mainSwiper) {
            mainSwiper.slidePrev(); // Go to the previous slide
        }
    };

    return (
        <>
            <section className={styles.banner}>
                <Header/>

                <Swiper
                    style={swiperStyles}
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
                        <div className={styles.previous} onClick={handlePrev}>
                            <ArrowButtonGallery/>
                        </div>
                        <div className={styles.galleryBlock}>
                            <div className={styles.swiperMainBlock}>
                                <Swiper
                                    loop={true}
                                    onSwiper={setMainSwiper} // Set swiper instance here
                                    spaceBetween={100}
                                    thumbs={{swiper: thumbsSwiper}}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={styles.swiperMain}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image}/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <PreviewButton/>
                            </div>

                            <div className={styles.swiperSecondaryBlock}>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    speed={1000}
                                    spaceBetween={28}
                                    slidesPerView={4}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={styles.swiperSecondary}
                                >
                                    {images.map((image, i) => (
                                        <SwiperSlide key={i} className={styles.slide}>
                                            <img src={image}/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className={styles.next} onClick={handleNext}>
                            <ArrowButtonGallery/>
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

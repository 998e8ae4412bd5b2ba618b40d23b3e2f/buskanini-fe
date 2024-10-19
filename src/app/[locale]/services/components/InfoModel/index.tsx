'use client'
import React, {CSSProperties} from 'react';
import ServiceBlock from "@/app/[locale]/services/components/ServiceBlock";
import styles from "./infoModel.module.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {Slide} from "@/app/[locale]/home/components/HomeCoponents/SwiperComponent";
import {Pagination} from "swiper/modules";
import '../../../../styles/sliderDots.scss'

import 'swiper/css';
import 'swiper/css/pagination';



interface Slide {
    image: string;
}

interface SwiperComponentProps {
    elements: Slide[];
    reverse: boolean
}


const Index = ({elements, reverse}: SwiperComponentProps) => {
    const text = ['Основа для створення рендерів на білому тлі, візуалізації меблів в інтер\'єрах, створення малюнків для каталогів і веб-сайтів. Допомагає залучити більше клієнтів, особливо серед дизайнерів інтер\'єру.', 'Моделювання меблів для меблевої фабрики - важливий етап у створенні якісних та естетично привабливих меблів, що допомагає виробникам уникнути зайвих витрат і вдосконалити виробничий процес.']

    const swiperStyles: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#070707",
        "--swiper-pagination-bullet-inactive-color": "hsla(0, 0%, 3%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
    }

    return (
        <div className={`${styles.infoModel} ${reverse ? styles.reverse : ''}`}>
            <ServiceBlock title='3D Modelling' content={text} ctaText='Замовити'/>
            <div className={styles.swiperContainer}>
                <Swiper
                    style={swiperStyles}
                    className={styles.swiper}
                    slidesPerView={1}
                    spaceBetween={25}
                    modules={[Pagination]}
                    speed={500}
                    loop={true}
                    pagination={{
                        clickable: true
                    }}
                >
                    {
                        elements.map((el, index) => (
                            <SwiperSlide key={index}>
                                <div style={{ backgroundImage: `url("${el.image}")` }} className={styles.imageContainer} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Index;
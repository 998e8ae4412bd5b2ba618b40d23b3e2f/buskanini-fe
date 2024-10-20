'use client'
import React, {CSSProperties} from 'react';
import ServiceBlock from "@/app/[locale]/services/components/ServiceBlock";
import styles from "./infoModel.module.scss"
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';



interface Obj {
    title: string;
    ctaText: string;
    images: string[];
    content: string[];
}

interface SwiperComponentProps {
    obj: Obj;
    reverse: boolean
}


const Index = ({obj, reverse}: SwiperComponentProps) => {
    const {title, ctaText, images, content} = obj;

    const swiperStyles: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#070707",
        "--swiper-pagination-bullet-inactive-color": "hsla(0, 0%, 3%, 0.3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
    }

    return (
        <div className={`${styles.infoModel} ${reverse ? styles.reverse : ''}`}>
            <ServiceBlock title={title} content={content} ctaText={ctaText}/>
            {
                images.length !== 1 ? <div className={styles.swiperContainer}>
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
                            images.map((el, index) => (
                                <SwiperSlide key={index}>
                                    <div style={{backgroundImage: `url("${el}")`}}
                                         className={styles.imageContainer}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                    : <div style={{backgroundImage: `url("${images[0]}")`}}
                           className={styles.imageContainer}/>
            }

        </div>
    );
};

export default Index;
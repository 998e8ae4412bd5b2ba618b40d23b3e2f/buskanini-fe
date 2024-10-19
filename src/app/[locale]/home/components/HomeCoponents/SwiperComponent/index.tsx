'use client'
import React, {CSSProperties} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./swiperComponent.module.scss";
import {Pagination} from "swiper/modules";
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
export const Slide = ({image}: Slide) => {
    return (
        <article className={styles.sliderElement}>
            <img src={image} alt=""/>
            <PreviewButton/>
        </article>
    )
}


export const SwiperComponent = ({elements}: SwiperComponentProps) => {
    const swiperStyles: CSSProperties & { [key: string]: string | number } = {
        "--swiper-pagination-color": "#F3E2C6",
        "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, .3)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        "--swiper-pagination-bottom": "10px"
    }
    return (
        <Swiper
            style={swiperStyles}
            slidesPerView={3}
            spaceBetween={25}
            className={`${styles.swiper}`}
            id='homeSlider'
            modules={[Pagination]}
            speed={500}
            initialSlide={Math.floor(elements.length / 2)}
            loop={true}
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
        >
            {
                elements.map((el, index) => (
                    <SwiperSlide key={index}>
                        <Slide image={el.image} key={index}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperComponent;
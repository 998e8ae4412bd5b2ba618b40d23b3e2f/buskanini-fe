'use client'
import LogoCompanyOne from '../../../../public/svg/sliderCompanyLogos/LogoCompanyOne.svg'
import LogoCompanyTwo from '../../../../public/svg/sliderCompanyLogos/LogoCompanyTwo.svg'
import LogoCompanyThree from '../../../../public/svg/sliderCompanyLogos/LogoCompanyThree.svg'
import React, {CSSProperties} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from './page.module.scss'
import './page.scss'
import {Pagination} from "swiper/modules";
import PreviewButton from "@/app/components/previewButton";



// TITLE AND SUBTITLE COMPONENT

type TitleWithSubtitleProps = {
    title: string,
    subtitle: string
}

export const TitleWithSubtitle = ({title, subtitle}: TitleWithSubtitleProps) => {
    return (
        <div className={styles.TitleWithSubtitle}>
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{
                __html: subtitle.replace(/\n/g, '<br />')
            }}/>
        </div>
    );
};



// Service CARD COMPONENT

type ServiceCardProps = {
    title: string,
    subtitle: string,
    description: string
}

export const ServiceCard = ({title, subtitle, description}: ServiceCardProps) => {
    return (
        <article className={styles.serviceCard}>

            <div className={styles.titleSubtitle}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, '<br />')
                }}
            >
            </div>

            <button>
                Замовити
            </button>
        </article>
    );
};


// SLIDER COMPONENT

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
        "--swiper-pagination-bottom": "-90px"
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





// INFINITY SLIDER COMPONENT

interface ItemsProps {
    items: React.FC[];
}

export const SliderItems = ({items}: ItemsProps) => {
    return (<>
        {
            items.map((ItemComponent, index) => (
                <div className={styles.item} key={index}>
                    <ItemComponent />
                </div>
            ))
        }
    </>)
}

interface SliderState {
    left?: boolean
}

export const InfinitySlider = ({left=false}: SliderState) => {
    const logos = [LogoCompanyOne, LogoCompanyTwo, LogoCompanyThree, LogoCompanyOne, LogoCompanyTwo, LogoCompanyThree]

    return (
        <div className={styles.infinitySliderContainer}>
            <div className={`${styles.horizontalScrollingItems} ${left ? styles.left : ''}`}>
                <SliderItems items={logos}/>
            </div>

            <div className={`${styles.horizontalScrollingItems} ${left ? styles.leftSecond : styles.second}`}>
                <SliderItems items={logos}/>
            </div>
        </div>
    );
};
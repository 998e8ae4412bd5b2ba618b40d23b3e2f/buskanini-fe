import React from 'react';
import Header from "@/app/components/header";
import styles from './services.module.scss'
import InfoModel from './components/InfoModel/index'


type BuskaniniBgTitleProps = {
    title: string;
};

const BuskaniniBgTitle = ({title}: BuskaniniBgTitleProps) => (
    <div className={styles.buskaniniBgTitle}>
        <span>{title}</span>
    </div>
)

const Page = () => {
    const aboutPage = [
        {

        }
    ]


    const elements  = [
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
        {
            image: 'https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg'
        },
    ]

    return <>
        <Header/>
        <main className={styles.main}>
            <BuskaniniBgTitle title='3D Modelling'/>
            <section className={`${styles.aboutUs} ${styles.container}`}>
                <InfoModel elements={elements} reverse={false}/>
            </section>

            <BuskaniniBgTitle title='3D Product Rendering'/>
            <section className={`${styles.aboutUs} ${styles.container}`}>
                <InfoModel elements={elements} reverse/>
            </section>

            <BuskaniniBgTitle title='3D Product Rendering'/>
            <section className={`${styles.aboutUs} ${styles.container}`}>
                <InfoModel elements={elements} reverse={false}/>
            </section>
        </main>
    </>
};

export default Page;
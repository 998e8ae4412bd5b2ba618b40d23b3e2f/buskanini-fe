import styles from './page/page.module.scss'
import ScrollDown from '../../../public/svg/arrow-down-circle.svg'

import Header from "@/app/components/header";
import {InfinitySlider, ServiceCard, SwiperComponent, TitleWithSubtitle} from "@/app/[locale]/page/pageComponents";
import React from "react";
import Link from "next/link";
import HaveQuestion from "@/app/components/haveQuestion";


export default function Home() {
    const elements = [
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
    return (
        <>
            <section className={styles.banner}>
                <Header/>

                <div className={styles.centerText}>
                    <h1><span>3D візуалізація</span> для комерції.</h1>

                    <p>Створюємо реалістичні <span>3D візуалізації</span> для бізнесу, архітектури та реклами.</p>
                </div>

                <div className={styles.scrollDown}>
                    <ScrollDown/>
                    <span>Прокрутіть униз</span>
                </div>

                <div className={styles.bannerContainer}>
                    <img className={styles.bannerImage} alt="interior image" src="/images/home/banerImage.png"/>
                </div>
            </section>

            <main className={styles.main}>
                <section className={styles.sectionCollaborate}>
                    <TitleWithSubtitle
                        title='Співпраця'
                        subtitle={`Співпраці з компаніями, \nякими пишаємося`}
                    />

                    <div className={styles.slidersContainer}>
                        <InfinitySlider/>
                        <InfinitySlider left={true}/>
                        <InfinitySlider/>
                    </div>
                </section>

                <section className={`${styles.sectionServices} ${styles.container}`}>
                    <TitleWithSubtitle
                        title='Послуги'
                        subtitle={`Індивідуальні послуги 3D-дизайну \nщоб задовольнити всі ваші потреби.`}
                    />

                    <div className={styles.cardServices}>
                        <ServiceCard
                            title='3D Modelling'
                            subtitle='Transforming Ideas into Reality'
                            description={`Ваша візуалізація — наш політ фантазії. Ми створюємо простори, де ваш продукт стає центром уваги.\n\nОрганічно, вишукано, стильно.`}
                        />
                        <ServiceCard
                            title='3D Product Rendering'
                            subtitle='Lights. Camera. Wow!'
                            description={`Покажіть свій продукт у вигідному світлі. \n\nМи додаємо магію до кожної текстури та матеріалу, створюючи образи, що викликають захоплення.`}
                        />
                        <ServiceCard
                            title='3D Interior Visualization'
                            subtitle='Static is Boring, Let’s Move!'
                            description={`Динаміка — це новий стандарт. Покажіть світові, як ваш продукт працює та виглядає у русі.\n\nМи додаємо життя кожному кадру.`}
                        />
                    </div>
                </section>

                <section className={`${styles.sectionFurnitureDesign} ${styles.container}`}>
                    <TitleWithSubtitle
                        title='Дизайн меблів'
                        subtitle={`Відкрийте для себе наші \nтрансформаційні 3D-візуалізації.`}
                    />

                    <div className={styles.sliderContainer}>
                        <SwiperComponent elements={elements}/>

                        <Link href='/' className={styles.seeMore}>Переглянути більше</Link>
                    </div>
                </section>

                <section className={styles.sectionQuestion}>
                    <HaveQuestion/>
                </section>
            </main>
        </>
    );
}
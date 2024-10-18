import React from 'react';
import Header from "@/app/components/header";
import styles from './projects.module.scss'
import Link from "next/link";
import DefaultProject from "@/app/[locale]/[projects]/pageComponents/defaultProject";
import PaginationArrow from '../../../../public/svg/PaginationArrow.svg'

const Page = () => {
    const project = [
        {
            name: "Zenith Lounge Chair",
            image: "https://st.depositphotos.com/1005979/3247/i/950/depositphotos_32470915-stock-photo-super-3d-word-best-choice.jpg",
            is3D: false
        },
        {
            name: "Nimbus Ottoman",
            image: "https://st.depositphotos.com/1005979/3247/i/950/depositphotos_32470915-stock-photo-super-3d-word-best-choice.jpg",
            is3D: true
        },
        {
            name: "Sienna Vista Bench",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: false
        },
        {
            name: "Slate Pavilion Stool",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: true
        },
        {
            name: "Vertex Studio Chair",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: false
        },
        {
            name: "Aura Gardens Swing",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: true
        },
        {
            name: "Echo Loft Rocker",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: false
        },
        {
            name: "Lumina Residence Sofa",
            image: "https://imgnewtabl.pravda.com.ua/images/doc/7/e/7eee42f-kyva.jpg",
            is3D: true
        }
    ];

    return <>
        <Header/>
        <main className={styles.main}>
            <div className={styles.navLabel}>
                <nav>
                    <ul>
                        <li><button className={styles.active}>Інтер'єр</button></li>
                        <li><button>Рендер</button></li>
                        <li><button>Моделювання</button></li>
                    </ul>
                </nav>

                <p>Відкрийте для себе наші <br/> трансформаційні 3D-візуалізації.</p>
            </div>

            <div className={styles.projects}>
                <nav className={styles.projectsList}>
                    <ul>
                        {
                            project.map(el => (
                                <li key={el.name}><Link href='/'>{el.name}</Link></li>
                            ))
                        }
                    </ul>
                </nav>

                <div className={styles.projectsGridPagination}>
                    <div className={styles.defaultGrid}>
                        {
                            project.map(el => (
                                <DefaultProject key={el.name} image={el.image} />
                            ))
                        }
                    </div>

                    <div className={styles.pagination}>
                        <button>
                            <PaginationArrow/>
                            Попередня сторінка
                        </button>

                        <div className={styles.circles}>
                            <div className={`${styles.circle} ${styles.active}`} />
                            <div className={`${styles.circle}`} />
                            <div className={`${styles.circle}`} />
                            <div className={`${styles.circle}`} />
                            <div className={`${styles.circle}`} />
                        </div>

                        <button>
                            Наступна сторінка
                            <PaginationArrow/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </>
};

export default Page;
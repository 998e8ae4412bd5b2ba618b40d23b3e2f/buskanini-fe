'use client';
import React, { CSSProperties, useState, useEffect } from 'react';
import Header from "@/app/components/header";
import styles from './project.module.scss';
import './project.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import PaginationArrow from "../../../../../public/svg/PaginationArrow.svg";
import HaveQuestion from "@/app/components/haveQuestion";
import ProjectGallery from "@/app/[locale]/project/[id]/components/ProjectGallery";
import { fetchGraphQL } from "@/app/lib/directus";
import { useLocale } from "use-intl";
import { useRouter, useParams } from 'next/navigation';

const Page = () => {
    const [project, setProject] = useState();
    const [models, setModels] = useState([]);
    const [projectIds, setProjectIds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const locale = useLocale();
    const [isPhone, setIsPhone] = useState<boolean>(false);
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    useEffect(() => {
        setIsPhone(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        const fetchModels = async () => {
            const lang = locale === 'en' ? "en-US" : "ua-UA";

            const query = `
                query Projects {
                    allProjects: projects {
                        id
                    }
                    currentProject: projects(filter: { id: { _eq: "${projectId}" }}) {
                        translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
                            name
                            description
                            client
                        }
                        tags {
                            tags_id {
                                name
                                translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
                                    name
                                }
                            }
                        }
                        photos {
                            directus_files_id
                        }
                        date
                    }
                    models(filter: { project: { id: { _eq: "${projectId}" } } }) {
                        model
                        translations(filter: { languages_code: { code: { _eq: "${lang}" } } }) {
                            name
                        }
                        images {
                            directus_files_id
                        }
                    }
                }
            `;

            try {
                const response = await fetchGraphQL(query);
                setProject(response.data.currentProject[0]);
                setModels(response.data.models);

                // Ensure project IDs are numbers for comparison
                const ids = response.data.allProjects.map(project => parseInt(project.id, 10));
                setProjectIds(ids);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };
        fetchModels();
    }, [projectId, locale]);

    // Convert projectId to integer for comparison
    const projectIdInt = parseInt(projectId, 10);
    const currentProjectIndex = projectIds.findIndex(id => id === projectIdInt);

    const handlePrevious = () => {
        const prevIndex = (currentProjectIndex - 1 + projectIds.length) % projectIds.length;
        const prevProjectId = projectIds[prevIndex];
        router.push(`/${locale}/project/${prevProjectId}`);
    };

    const handleNext = () => {
        const nextIndex = (currentProjectIndex + 1) % projectIds.length;
        const nextProjectId = projectIds[nextIndex];
        router.push(`/${locale}/project/${nextProjectId}`);
    };

    const swiperStyles: CSSProperties & { [key: string]: string | number } = isPhone
        ? {
            "--swiper-pagination-color": "#F3E2C6",
            "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "12.704px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
            "--swiper-pagination-bottom": "25px",
        }
        : {
            "--swiper-pagination-color": "#F3E2C6",
            "--swiper-pagination-bullet-inactive-color": "hsla(37, 65%, 86%, 0.3)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "1.375rem",
            "--swiper-pagination-bullet-horizontal-gap": "7px",
            "--swiper-pagination-bottom": "1.75rem",
        };

    const imageIds =
        models && models[currentIndex]?.images.map((image) => `http://localhost:8055/assets/${image.directus_files_id}`);
    const tags = project && project.tags.map((tag) => tag.tags_id.translations[0].name);

    const { description = "", client = "" } = project?.translations[0] || {};

    console.log(project)
    return (
        <>
            <section className={styles.banner}>
                <Header />
                <Swiper
                    style={swiperStyles}
                    className={styles.swiper}
                    slidesPerView={1}
                    spaceBetween={25}
                    modules={[Pagination]}
                    speed={500}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {project?.photos.map((el, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={`http://localhost:8055/assets/${el.directus_files_id}`}
                                alt={`Слайд ${index + 1}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <main className={styles.main}>
                <section className={styles.galleryContainer}>
                    <div className={styles.galleryTitles}>
                        <Swiper
                            loop={true}
                            speed={1000}
                            spaceBetween={28}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={styles.swiperSecondary}
                            centeredSlides={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1.8
                                }
                            }}
                            onSlideChange={(swiper) => {
                                const realIndex = swiper.realIndex;
                                setCurrentIndex(realIndex);
                            }}
                        >
                            {models &&
                                models.map((el, i) => (
                                    <SwiperSlide key={i} className={styles.slide}>
                                        <h2 className={styles.projectTitle}>{el.translations[0]?.name}</h2>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>

                    <ProjectGallery model={models[currentIndex]?.model} imageIds={imageIds} />
                </section>

                <section className={styles.projectSection}>
                    <h2 className={styles.title}>Про проєкт</h2>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.detailsContainer}>
                        <div className={styles.detailItem}>
                            <h2 className={styles.detailTitle}>Дата створення</h2>
                            <p className={styles.detailValue}>{project.date}</p>
                        </div>

                        <div className={styles.detailItem}>
                            <h2 className={styles.detailTitle}>Замовник</h2>
                            <p className={styles.detailValue}>{client}</p>
                        </div>
                    </div>

                    <div className={styles.categoryContainer}>
                        <h2 className={styles.categoryTitle}>Категорія</h2>
                        <div className={styles.categoryButtons}>
                            {tags &&
                                tags.map((el) => (
                                    <button key={el} className={styles.categoryButton}>
                                        {el}
                                    </button>
                                ))}
                        </div>
                    </div>
                </section>

                <div className={styles.pagination}>
                    <button onClick={handlePrevious}>
                        <PaginationArrow />
                        Попередня сторінка
                    </button>

                    <button onClick={handleNext}>
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

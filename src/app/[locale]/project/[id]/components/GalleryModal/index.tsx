import React from 'react';
import styles from './galleryModal.module.scss'
import ArrowButtonGallery from "../../../../../../../public/svg/arrowButtonGallery.svg";
import PreviewButton from "@/app/components/previewButton";

interface GalleryModalProps {
    active: string;
    setModalActive: (active: string) => void;
    image: string;
    handleNext: () => void;
    handlePrev: () => void;
    setModelModalActive: (active: boolean) => void;
}

const Index = ({active, setModalActive, image, handleNext, handlePrev, setModelModalActive}: GalleryModalProps) => {
    return (
        <section
            onClick={() => {
                document.body.classList.remove('no-scroll');
                setModalActive('out')
            }}
            className={`${styles.galleryModal} ${active === 'show' ? styles.show : null} ${active === 'out' ? styles.out : null}`}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.photoPagination}>
                    <div className={styles.close} onClick={() => {
                        document.body.classList.remove('no-scroll');
                        setModalActive('out')
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path
                                d="M35 3.525L31.475 0L17.5 13.975L3.525 0L0 3.525L13.975 17.5L0 31.475L3.525 35L17.5 21.025L31.475 35L35 31.475L21.025 17.5L35 3.525Z"
                                fill="#070707"/>
                        </svg>
                    </div>
                    <div className={styles.photo}>
                        <img src={image} alt=""/>
                    </div>
                    <div className={styles.pagination}>
                        <div
                            className={styles.previous}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}>
                            <ArrowButtonGallery viewBox="0 0 60 51"/>
                        </div>
                        <PreviewButton onClick={() => {
                            document.body.classList.add('no-scroll');
                            setModelModalActive(true)
                        }}/>
                        <div
                            className={styles.next}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}>
                            <ArrowButtonGallery viewBox="0 0 60 51"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
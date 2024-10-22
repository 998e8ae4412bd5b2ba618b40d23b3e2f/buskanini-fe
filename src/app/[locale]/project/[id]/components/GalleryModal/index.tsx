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
}

const Index = ({active, setModalActive, image, handleNext, handlePrev}: GalleryModalProps) => {
    return (
        <section onClick={() => setModalActive('out')}
                 className={`${styles.galleryModal} ${active === 'show' ? styles.show : null} ${active === 'out' ? styles.out : null}`}>
            <div className={styles.photoPagination}>
                <div className={styles.photo}>
                    <img src={image} alt=""/>
                </div>
                <div className={styles.pagination}>
                    <div
                        className={styles.previous}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext()
                        }}>
                        <ArrowButtonGallery/>
                    </div>
                    <PreviewButton/>
                    <div
                        className={styles.next}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev()
                        }}>
                        <ArrowButtonGallery/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
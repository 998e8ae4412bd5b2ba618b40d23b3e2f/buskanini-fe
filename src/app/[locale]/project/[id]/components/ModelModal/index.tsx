import React from 'react';
import styles from './modelModal.module.scss'
import CloseModalModel from "../../../../../../../public/svg/closeModalModel.svg";

interface ModalProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const Index = ({active, setActive}: ModalProps) => {
    return (
        <section onClick={() => setActive(false)} className={`${styles.modelModal} ${active ? styles.modalActive : null}`}>
            <div className={styles.modelContainer}>
                <div className={styles.model}>
                    <div className={styles.loading}>
                        <h3>Завантаження 3D моделі триває...</h3>
                        <p>Будь ласка, зачекайте кілька хвилин, поки модель повністю завантажиться.</p>
                        <div className={styles.loadingLine}/>
                    </div>
                </div>
                <div className={styles.close}>
                    <CloseModalModel/>
                </div>
            </div>
        </section>
    );
};

export default Index;
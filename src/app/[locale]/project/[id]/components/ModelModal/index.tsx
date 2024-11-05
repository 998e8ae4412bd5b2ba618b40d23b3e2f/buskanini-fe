import React from 'react';
import styles from './modelModal.module.scss';
import CloseModalModel from "../../../../../../../public/svg/closeModalModel.svg";
import ModelViewer from "@/app/[locale]/project/[id]/components/ModelViewer";

interface ModalProps {
    model: string;
    active: boolean;
    setActive: (active: boolean) => void;
}

const Index = ({ model, active, setActive }: ModalProps) => {
    const [modelLoaded, setModelLoaded] = React.useState<boolean>(false);

    return (
        <section className={`${styles.modelModal} ${active ? styles.modalActive : ''}`}>
            <div className={styles.modelContainer}>
                <div className={styles.model}>
                    {!modelLoaded && (
                        <div className={styles.loading}>
                            <h3>Завантаження 3D моделі триває...</h3>
                            <p>Будь ласка, зачекайте кілька хвилин, поки модель повністю завантажиться.</p>
                            <div className={styles.loadingLine} />
                        </div>
                    )}
                    <ModelViewer model={model} setModelLoaded={setModelLoaded} />
                </div>
                <div className={styles.close} onClick={() => {
                    setActive(false)
                    document.body.classList.remove('no-scroll');
                }}>
                    <CloseModalModel viewBox="0 0 35 35" />
                </div>
            </div>
        </section>
    );
};

export default Index;

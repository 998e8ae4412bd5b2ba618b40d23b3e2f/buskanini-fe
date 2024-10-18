import React from 'react';
import styles from "./defultProject.module.scss"
import PreviewButton from "@/app/components/previewButton";

type CardProject = {
    image: string
}
const Index = ({image}: CardProject) => {
    return (
        <article

            className={styles.defaultProjectCard}>
            <div className={styles.hoverInfo}>
                <div className={styles.name}>THavana Hammock Chair</div>
                <PreviewButton/>
            </div>
            <img src={image} alt=""/>
        </article>
    );
};

export default Index;
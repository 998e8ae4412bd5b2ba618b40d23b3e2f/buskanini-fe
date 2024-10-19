import React from 'react';
import styles from './serviceBlock.module.scss';


interface Props {
    title: string;
    content: string[];
    ctaText: string;
}

const Index: React.FC<Props> = ({ title, content, ctaText }) => {

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.contentWrapper}>
                {content.map((item, index) => (
                    <>
                        <p key={index} className={styles.paragraph}>
                            {item}
                        </p>
                    </>

                ))}
            </div>
            <button className={styles.ctaButton}>{ctaText}</button>
        </div>
    );

};


export default Index;
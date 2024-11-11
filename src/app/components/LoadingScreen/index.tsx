import React from 'react';
import styles from './loadingScreen.module.scss'

const Index = () => {
    return (
        <section className={styles.loadingScreen}>
            <div className={styles.loader}></div>
        </section>
    );
};

export default Index;
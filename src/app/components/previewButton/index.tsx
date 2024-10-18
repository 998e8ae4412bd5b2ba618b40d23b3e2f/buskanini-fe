import React from 'react';
import styles from "./preview.module.scss";
import Preview3D from "../../../../public/svg/preview3D.svg";

const Index = () => {
    return (
        <button className={styles.preview}>
            3D Перегляд
            <Preview3D/>
        </button>
    );
};

export default Index;
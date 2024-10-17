import React from 'react';
import Link from "next/link";
import styles from "./haveQuestion.module.scss"

const Index = () => {
    return (
        <div className={styles.haveQuestion}>
            <h4>Маєте запитання?</h4>
            <p>Пишіть нам у будь-який час — ми завжди на зв'язку, <br/> щоб допомогти створити ваш ідеальний простір.</p>

            <Link href='/contacts'>Написати</Link>
        </div>
    );
};

export default Index;
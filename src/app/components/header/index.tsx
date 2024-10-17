import React from 'react';
import styles from './header.module.scss'
import Link from "next/link";

const Index = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo__block}>
                <Link href='/' className={styles.header__logo}>
                    buskanini
                </Link>
            </div>

            <nav>
                <ul>
                    <li><Link href='/'>Головна</Link></li>
                    <li><Link href='/'>3D Проєкти</Link></li>
                    <li><Link href='/'>Докладніше</Link></li>
                    <li><Link href='/'>Досвід</Link></li>
                    <li><Link href='/'>Послуги</Link></li>
                </ul>
            </nav>

            <div className={styles.lanContacts}>
                <Link href='/'>Контакти</Link>

                <button>UA</button>
            </div>
        </header>
    );
};

export default Index;
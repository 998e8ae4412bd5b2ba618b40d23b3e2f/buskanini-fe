'use client';
import React, { useEffect, useState } from 'react';
import styles from './goUpButton.module.scss';
import Behance from '../../../../public/svg/goUp.svg';

const GoUpButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        const scrolled = window.scrollY;
        const threshold = document.documentElement.scrollHeight * 0.5;
        setIsVisible(scrolled > threshold);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button className={`${isVisible ? styles.goUpButton : styles.goUpButtonIdle}`} onClick={scrollToTop}>
            <div>
                <Behance/>
            </div>
        </button>
    );
};

export default GoUpButton;
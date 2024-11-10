import React, { useEffect, useRef } from 'react';
import styles from "@/app/[locale]/projects/projects.module.scss";
import Link from "next/link";
import NavArrow from "../../../../../../public/svg/arrowNav.svg";
import gsap from "gsap";

interface Props {
    currentProjects: ProjectItem[];
}

const Index = ({ currentProjects }: Props) => {
    const arrowRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);  // Ref for the <ul> element

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                y: e.currentTarget.offsetTop,
            });
        }
    };

    useEffect(() => {
        if (listRef.current) {
            gsap.fromTo(
                listRef.current.children,  // Target each <li> inside <ul>
                {
                    opacity: 0, // Start with opacity 0
                    y: 20, // Start with the items slightly shifted down (for a "slide-up" effect)
                },
                {
                    opacity: 1, // Fade in to opacity 1
                    y: 0, // Move items to their final position
                    stagger: 0.2, // Stagger each item with a 0.2s delay
                    ease: "power2.out", // Ease the animation for smoothness
                    duration: 0.5
                }
            );
        }
    }, [currentProjects]);

    return (
        <nav className={styles.projectsList}>
            <ul ref={listRef}>
                {currentProjects &&
                    currentProjects.map((el, i) => (
                        <li key={i} onMouseEnter={handleMouseEnter}>
                            <Link href="/">
                                {el.translations.length > 0
                                    ? el.translations[0].name
                                    : "Без назви"}
                            </Link>
                        </li>
                    ))}
            </ul>
            <div ref={arrowRef} className={styles.arrow}>
                <NavArrow />
            </div>
        </nav>
    );
};

export default Index;

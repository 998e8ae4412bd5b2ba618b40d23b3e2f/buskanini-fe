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
                listRef.current.children,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    ease: "power2.out",
                    duration: 0.5
                }
            );
        }
    }, []);

    console.log(currentProjects)

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <nav className={styles.projectsList}>
            <ul ref={listRef}>
                {currentProjects &&
                    currentProjects.map((el, i) => (
                        <li key={i} onMouseEnter={handleMouseEnter}>
                            <Link href="/">
                                {truncateText(
                                    el?.name !== undefined ? el?.name : "Без назви",
                                    12
                                )}
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

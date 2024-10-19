import styles from "./titleWithSubtitle.module.scss";
import React from "react";

type TitleWithSubtitleProps = {
    title: string,
    subtitle: string
}

const TitleWithSubtitle = ({title, subtitle}: TitleWithSubtitleProps) => {
    return (
        <div className={styles.TitleWithSubtitle}>
            <h2>{title}</h2>
            <p dangerouslySetInnerHTML={{
                __html: subtitle.replace(/\n/g, '<br />')
            }}/>
        </div>
    );
};

export default TitleWithSubtitle;
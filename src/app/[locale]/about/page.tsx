import Header from "@/app/components/header";
import styles from './about.module.scss'


const Page = () => {
    return (
        <>
            <Header/>
            <section className={styles.aboutUs}>
                <div></div>
            </section>
            <h1>About</h1>
            <h2>About 2</h2>
        </>
    );
};

export default Page;
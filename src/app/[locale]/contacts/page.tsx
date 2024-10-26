import React from 'react';
import Header from "@/app/components/header";
import {ContactForm} from "./components";
import styles from './contacts.module.scss'
import Instagram from '../../../../public/svg/socialMediaContacts/instagram.svg'
import Behance from '../../../../public/svg/socialMediaContacts/behance.svg'
import Facebook from '../../../../public/svg/socialMediaContacts/facebook.svg'
import Patreon from '../../../../public/svg/socialMediaContacts/Patreon.svg'
import Telegram from '../../../../public/svg/socialMediaContacts/telegram.svg'


const Page = () => {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <div className={styles.questionForm}>
                    <div className={styles.haveQuestionSide}>
                        <h1><span>Маєте запитання?</span> <br/> Напишіть нам!</h1>


                        <div className={styles.socMedias}>
                            <Instagram/>
                            <Behance/>
                            <Facebook/>
                            <Patreon/>
                            <Telegram/>
                        </div>
                    </div>

                    <ContactForm/>
                </div>
            </main>
        </>
    );
};

export default Page;
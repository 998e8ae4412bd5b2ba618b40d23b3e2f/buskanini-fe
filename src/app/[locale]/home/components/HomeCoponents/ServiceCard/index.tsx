import styles from './serviceCard.module.scss'
import InfinitySlider from "@/app/[locale]/home/components/HomeCoponents/InfinitySlider";

type ServiceCardProps = {
    title: string,
    subtitle: string,
    description: string
}

const ServiceCard = ({title, subtitle, description}: ServiceCardProps) => {
    return (
        <article className={styles.serviceCard}>

            <div className={styles.titleSubtitle}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, '<br />')
                }}
            >
            </div>

            <button>
                Замовити
            </button>
        </article>
    );
};

export default ServiceCard;
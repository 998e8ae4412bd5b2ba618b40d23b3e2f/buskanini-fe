import styles from './InfinitySlider.module.scss'
import LogoCompanyOne from '../../../../public/svg/sliderCompanyLogos/LogoCompanyOne.svg'
import LogoCompanyTwo from '../../../../public/svg/sliderCompanyLogos/LogoCompanyTwo.svg'
import LogoCompanyThree from '../../../../public/svg/sliderCompanyLogos/LogoCompanyThree.svg'

interface ItemsProps {
    items: React.FC[];
}

const Items = ({items}: ItemsProps) => {
    return (<>
        {
            items.map((ItemComponent, index) => (
                <div className={styles.item} key={index}>
                    <ItemComponent />
                </div>
            ))
        }
    </>)
}

interface SliderState {
    left?: boolean
}

const Index = ({left=false}: SliderState) => {
    const logos = [LogoCompanyOne, LogoCompanyTwo, LogoCompanyThree, LogoCompanyOne, LogoCompanyTwo, LogoCompanyThree]

    return (
        <div className={styles.container}>
            <div className={`${styles.horizontalScrollingItems} ${left ? styles.left : ''}`}>
                <Items items={logos}/>
            </div>

            <div className={`${styles.horizontalScrollingItems} ${left ? styles.leftSecond : styles.second}`}>
                <Items items={logos}/>
            </div>
        </div>
    );
};

export default Index;
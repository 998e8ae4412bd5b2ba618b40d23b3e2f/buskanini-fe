import type React from "react";
import Preview3D from "../../../../public/svg/preview3D.svg";
import styles from "./preview.module.scss";

interface PreviewButtonProps {
	onClick?: (e: Event) => void;
}

const Index: React.FC<PreviewButtonProps> = ({ onClick }) => {
	return (
		<button className={styles.preview} onClick={e => onClick}>
			3D Перегляд
			<Preview3D />
		</button>
	);
};

export default Index;

import React from "react";
import styles from "./preview.module.scss";
import Preview3D from "../../../../public/svg/preview3D.svg";


interface PreviewButtonProps {
	onClick: () => void;
}

const Index: React.FC<PreviewButtonProps> = ({ onClick }) => {
	return (
		<button className={styles.preview} onClick={onClick}>
			3D Перегляд
			<Preview3D />
		</button>
	);
};

export default Index;

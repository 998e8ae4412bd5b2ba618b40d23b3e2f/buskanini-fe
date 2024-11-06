import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styles from "../ModelModal/modelModal.module.scss";

interface ModelProps {
	model: string;
	setModelLoaded: (loaded: boolean) => void;
}

import * as THREE from "three";

const Model: React.FC<ModelProps> = ({ model, setModelLoaded }) => {
	const { scene } = useGLTF(`https://buskanini-cms.onrender.com/assets/${model}`, true) as any;

	React.useEffect(() => {
		setModelLoaded(true);

		// Обчислюємо обмежуючий об’єм моделі
		const box = new THREE.Box3().setFromObject(scene);
		const size = new THREE.Vector3();
		const center = new THREE.Vector3();

		// Отримуємо розміри та центр моделі
		box.getSize(size);
		box.getCenter(center);

		// Зміщуємо модель, щоб її центр був у (0, 0, 0)
		scene.position.set(-center.x, -center.y - 1.5, -center.z);

		// Додаємо масштабування, щоб модель виглядала більшою
		const scaleFactor = 5 / Math.max(size.x, size.y, size.z);
		scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

		return () => setModelLoaded(false);
	}, [scene, setModelLoaded]);

	return <primitive object={scene} />;
};

interface ModelViewerProps {
	model: string;
	setModelLoaded: (loaded: boolean) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ model, setModelLoaded }) => {
	return (
		<Canvas className={styles.canvas} camera={{ position: [0, 0, 10] }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} intensity={1} />

			<Suspense fallback={null}>
				<Center>
					<Model model={model} setModelLoaded={setModelLoaded} />
				</Center>
			</Suspense>
			<OrbitControls enablePan enableZoom enableRotate />
		</Canvas>
	);
};

export default ModelViewer;

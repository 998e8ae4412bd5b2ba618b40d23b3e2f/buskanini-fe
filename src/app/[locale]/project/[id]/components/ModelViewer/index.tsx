import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import styles from "../ModelModal/modelModal.module.scss";
import * as THREE from "three";

interface ModelProps {
	model: string;
	setModelLoaded: (loaded: boolean) => void;
	setError: (error: string | null) => void;
}

const Model: React.FC<ModelProps> = ({ model, setModelLoaded, setError }) => {
	let scene: THREE.Object3D;

	try {
		const gltf = useGLTF(
			`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL2}/assets/${model}`,
			true
		) as any;
		scene = gltf.scene;
	} catch (error) {
		console.error("Failed to load model:", error);
		setModelLoaded(true)
		setError("123");
		return null;
	}

	React.useEffect(() => {
		if (scene) {
			setModelLoaded(true);
			setError(null);

			const box = new THREE.Box3().setFromObject(scene);
			const size = new THREE.Vector3();
			const center = new THREE.Vector3();

			box.getSize(size);
			box.getCenter(center);

			scene.position.set(-center.x, -center.y - 1.5, -center.z);

			const scaleFactor = 5 / Math.max(size.x, size.y, size.z);
			scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
		}

		return () => setModelLoaded(false);
	}, [scene, setModelLoaded, setError]);

	return scene ? <primitive object={scene} /> : null;
};

interface ModelViewerProps {
	model: string;
	setModelLoaded: (loaded: boolean) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ model, setModelLoaded }) => {
	const [error, setError] = useState<string | null>(null);

	return (
		<div className={styles.viewerContainer}>
			{error ? (
				<div className={styles.errorMessage}>
					<h3>Не вдалось завантажити модель :(</h3>
				</div>
			) : (
				<Canvas className={styles.canvas} camera={{ position: [0, 0, 10] }}>
					<ambientLight intensity={0.5} />
					<directionalLight position={[5, 5, 5]} intensity={1} />

					<Suspense fallback={null}>
						<Center>
							<Model model={model} setModelLoaded={setModelLoaded} setError={setError} />
						</Center>
					</Suspense>
					<OrbitControls enablePan enableZoom enableRotate />
				</Canvas>
			)}
		</div>
	);
};

export default ModelViewer;

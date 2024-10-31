import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, useGLTF } from '@react-three/drei';
import styles from '../ModelModal/modelModal.module.scss'
import React, {Suspense} from "react";

interface ModelProps {
    setModelLoaded: (loaded: boolean) => void;
}

const Model: React.FC<ModelProps> = ({ setModelLoaded }) => {
    const { scene } = useGLTF('/models/5.glb', true) as any;

    React.useEffect(() => {
        setModelLoaded(true);
        return () => setModelLoaded(false);
    }, [setModelLoaded]);

    return <primitive object={scene} />;
};


interface ModelViewerProps {
    setModelLoaded: (loaded: boolean) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ setModelLoaded }) => {
    return (
        <Canvas
            className={styles.canvas}
            camera={{position: [0, 0, 10]}}
        >
            <ambientLight intensity={0.5}/>
            <directionalLight position={[5, 5, 5]} intensity={1}/>

            <Suspense fallback={null}>
                <Center>
                    <Model setModelLoaded={setModelLoaded}/>
                </Center>
            </Suspense>
            <OrbitControls enablePan enableZoom enableRotate/>
        </Canvas>
    );
};

export default ModelViewer;

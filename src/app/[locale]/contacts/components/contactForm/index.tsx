'use client'
import React, {ChangeEvent, FormEvent, useState, useRef} from 'react';
import FileSvg from '../../../../../../public/svg/file.svg';
import CircleSvg from '../../../../../../public/svg/closeCircle.svg';
import ArrowSubmit from '../../../../../../public/svg/ArrowSubmit.svg';
import Change from '../../../../../../public/svg/change.svg';
import styles from './contactForm.module.scss';

const ContactForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const serviceOptions = ['3D Modelling', '3D Product Rendering', '3D Interior Visualization', 'Product Design'];
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleServiceSelection = (service: string) => {
        setSelectedServices((previousSelection) => {
            return previousSelection.includes(service)
                ? previousSelection.filter((s) => s !== service)
                : [...previousSelection, service];
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <input type="text" placeholder="Name*" required className={styles.input} />
                <input type="email" placeholder="Email*" required className={styles.input} />
                <textarea placeholder="Message" className={styles.textarea}></textarea>
            </div>

            <div className={styles.fileUploadGroup}>
                <div className={styles.fileUploadLabel}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                    {selectedFile ? (
                        <div className={styles.fileInput}>
                            <div className={styles.fileIcon}>
                                <FileSvg/>
                            </div>
                            <span>{selectedFile.name.length > 10 ? `${selectedFile.name.slice(0, 10)}...` : selectedFile.name}</span>
                            <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={() => setSelectedFile(null)}
                            >
                                <CircleSvg/>
                            </button>


                            <button className={styles.changeButton} onClick={handleFileInputClick}>
                                <span>Замінити</span>

                                <div className={styles.changeIcon}>
                                    <Change/>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className={styles.fileInput}>
                        <div className={styles.fileIcon}>
                                <FileSvg/>
                            </div>
                            <button onClick={handleFileInputClick} formNoValidate>
                                Upload File
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.checkboxGroup}>
                {serviceOptions.map((service) => (
                    <label
                        key={service}
                        onClick={(event) => {
                            event.preventDefault();
                            toggleServiceSelection(service);
                        }}
                        className={`${styles.checkboxLabel} ${selectedServices.includes(service) ? styles.checkboxLabelActive : ''}`}
                    >
                        <input type="checkbox" />
                        <div className={styles.square} />
                        {service}
                    </label>
                ))}
            </div>

            <button type="submit" className={styles.submitButton}>
                Submit Form
                <ArrowSubmit />
            </button>
        </form>
    );
};

export default ContactForm;

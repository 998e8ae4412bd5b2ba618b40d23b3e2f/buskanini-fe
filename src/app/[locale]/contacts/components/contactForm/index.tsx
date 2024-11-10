"use client";
import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ArrowSubmit from "../../../../../../public/svg/ArrowSubmit.svg";
import ArrowSubmitAnim from "../../../../../../public/svg/ArrowSubmitAnim.svg";
import Change from "../../../../../../public/svg/change.svg";
import CircleSvg from "../../../../../../public/svg/closeCircle.svg";
import FileSvg from "../../../../../../public/svg/file.svg";
import FileAdd from "../../../../../../public/svg/fileAdd.svg";
import styles from "./contactForm.module.scss";

interface FormData {
	name: string;
	email: string;
	message: string;
	file: File | null;
	services: string[];
}

const ContactForm: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
		file: null,
		services: [],
	});

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFormData((prev) => ({
				...prev,
				file,
			}));
		}
	};

	const toggleServiceSelection = (service: string) => {
		setFormData((prev) => ({
			...prev,
			services: prev.services.includes(service)
				? prev.services.filter((s) => s !== service)
				: [...prev.services, service],
		}));
	};

	const handleFileInputClick = () => {
		fileInputRef.current?.click();
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		console.log("Submitting form data:", formData);
	};

	const serviceOptions = [
		"3D Modelling",
		"3D Product Rendering",
		"3D Interior Visualization",
		"Product Design",
	];

	const isReadyToSent = formData.name !== "" && formData.email !== "";

	// GSAP Animation on Form Load
	useEffect(() => {
		// Animate input fields (input and textarea)
		gsap.from(`.${styles.inputGroup} input, .${styles.inputGroup} textarea`, {
			opacity: 0,
			y: 30,
			stagger: 0.1,
			duration: 1.5,
			ease: "power3.out",
		});

		// Animate file upload group with a bounce effect
		gsap.from(`.${styles.fileUploadGroup}`, {
			opacity: 0,
			x: -50,
			duration: 1.5,
			ease: "power3.out",
		});

		// Animate service checkboxes with a "spring" effect
		gsap.from(`.${styles.checkboxGroup} label`, {
			opacity: 0,
			x: -50,
			stagger: 0.1,
			duration: 1.5,
			ease: "back.out(1.7)", // Adds a springy bounce effect
		});

		// Focus animation on input fields when clicked
		const inputs = document.querySelectorAll(`.${styles.input}, .${styles.textarea}`);
		inputs.forEach((input) => {
			input.addEventListener("focus", () => {
				gsap.to(input, { scale: 1.05, duration: 0.3, ease: "power1.out" });
			});
			input.addEventListener("blur", () => {
				gsap.to(input, { scale: 1, duration: 0.3, ease: "power1.out" });
			});
		});
	}, []);


	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.inputGroup}>
				<input
					type="text"
					name="name"
					placeholder="Name*"
					required
					className={styles.input}
					value={formData.name}
					onChange={handleInputChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email*"
					required
					className={styles.input}
					value={formData.email}
					onChange={handleInputChange}
				/>
				<textarea
					name="message"
					placeholder="Message"
					className={styles.textarea}
					value={formData.message}
					onChange={handleInputChange}
				/>
			</div>

			<div className={styles.fileUploadGroup}>
				<div className={styles.fileUploadLabel}>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						style={{ display: "none" }}
					/>
					{formData.file ? (
						<div className={styles.fileInput}>
							<div className={styles.fileIcon}>
								<FileSvg />
							</div>
							<span>
								{formData.file.name.length > 10
									? `${formData.file.name.slice(0, 10)}...`
									: formData.file.name}
							</span>
							<button
								type="button"
								className={styles.deleteButton}
								onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
							>
								<CircleSvg />
							</button>
							<button
								type="button"
								className={styles.changeButton}
								onClick={handleFileInputClick}
							>
								<span>Replace</span>
								<div className={styles.changeIcon}>
									<Change />
								</div>
							</button>
						</div>
					) : (
						<div className={styles.fileInput} onClick={handleFileInputClick}>
							<div className={styles.fileIcon}>
								<FileAdd />
							</div>
							<button type="button" className={styles.uploadButton}>
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
						className={`${styles.checkboxLabel} ${
							formData.services.includes(service) ? styles.checkboxLabelActive : ""
						}`}
						onClick={(e) => {
							e.preventDefault();
							toggleServiceSelection(service);
						}}
					>
						<input type="checkbox" checked={formData.services.includes(service)} readOnly />
						<div className={styles.square} />
						{service}
					</label>
				))}
			</div>

			<button
				type="submit"
				className={`${styles.submitButton} ${isReadyToSent ? styles.active : ""}`}
			>
				<span className={styles.fill}>Заповніть форму</span>
				<span className={styles.sent}>Надіслати запит</span>
				<ArrowSubmit />
			</button>
		</form>
	);
};

export default ContactForm;

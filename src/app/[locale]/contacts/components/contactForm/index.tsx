"use client";
import React, { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ArrowSubmit from "../../../../../../public/svg/ArrowSubmit.svg";
import Change from "../../../../../../public/svg/change.svg";
import CircleSvg from "../../../../../../public/svg/closeCircle.svg";
import FileSvg from "../../../../../../public/svg/file.svg";
import FileAdd from "../../../../../../public/svg/fileAdd.svg";
import styles from "./contactForm.module.scss";
import {useTranslations} from "next-intl";

interface FormData {
	name: string;
	email: string;
	message: string;
	file: File | null;
	services: string[];
}

type SubmitStatus = "idle" | "success" | "error";

const ContactForm: React.FC = () => {
	const t = useTranslations("Contacts");
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		message: "",
		file: null,
		services: [],
	});

	const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				alert(t("MaxFile"));
				event.target.value = "";
				return;
			}
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

		const formdata = new FormData();
		const message = `
			message: ${formData.message}\nemail: ${formData.email}\nservices: ${formData.services.join(
			", "
		)}
		`;

		// @ts-ignore
		formdata.append("file", formData.file);
		formdata.append("chatId", "1805986720");
		formdata.append("message", message);
		formdata.append("fileType", "document");

		setSubmitStatus("idle");

		fetch("https://buskanini-tg-k9ac.onrender.com/send-data", {
			method: "POST",
			body: formdata,
			redirect: "follow",
		})
			.then((response) => {
				if (response.ok) {
					setSubmitStatus("success");
					setTimeout(() => {
						setSubmitStatus("idle");
					}, 4000)
					setFormData({
						name: "",
						email: "",
						message: "",
						file: null,
						services: [],
					});
				} else {
					throw new Error("Failed to send");
				}
			})
			.catch(() => {
				setSubmitStatus("error"); // Помилка
				setTimeout(() => {
					setSubmitStatus("idle");
				}, 4000)
			});
	};


	const serviceOptions = [
		"3D Modelling",
		"3D Product Rendering",
		"3D Interior Visualization",
		"Product Design",
	];

	const isReadyToSent = formData.name !== "" && formData.email !== "";

	useEffect(() => {
		gsap.from(`.${styles.inputGroup} input, .${styles.inputGroup} textarea`, {
			opacity: 0,
			y: 30,
			stagger: 0.1,
			duration: 1.5,
			ease: "power3.out",
		});

		gsap.from(`.${styles.fileUploadGroup}`, {
			opacity: 0,
			x: -50,
			duration: 1.5,
			ease: "power3.out",
		});

		gsap.from(`.${styles.checkboxGroup} label`, {
			opacity: 0,
			x: -50,
			stagger: 0.1,
			duration: 1.5,
			ease: "back.out(1.7)",
		});

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
					placeholder={t("Name*")}
					required
					className={styles.input}
					value={formData.name}
					onChange={handleInputChange}
				/>
				<input
					type="email"
					name="email"
					placeholder={t("Email*")}
					required
					className={styles.input}
					value={formData.email}
					onChange={handleInputChange}
				/>
				<textarea
					name="message"
					placeholder={t("Message")}
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
								<span>{t("Replace")}</span>
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
								{t("UploadFile")}
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
						{t(service)}
					</label>
				))}
			</div>

			<button
				type="submit"
				className={`${styles.submitButton} ${isReadyToSent ? styles.active : ""} ${
					submitStatus === "success"
						? styles.success
						: submitStatus === "error"
							? styles.error
							: ""
				}`}
			>
				<span className={styles.fill}>{t("FillForm")}</span>
				<span
					className={`${styles.sent}`}
				>
					{t("Sent")}
				</span>
				<ArrowSubmit/>
			</button>
		</form>
	);
};

export default ContactForm;

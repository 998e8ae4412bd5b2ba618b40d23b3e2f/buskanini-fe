import HaveQuestion from "@/app/components/haveQuestion";
import Header from "@/app/components/header";
import BlackArrow from "../../../../public/svg/blackArrow.svg";
import styles from "./about.module.scss";

const Page = () => {
	return (
		<>
			<Header />
			<section className={`${styles.aboutUs} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div className={styles.aboutUsText}>
						<h1>Про нас</h1>
						<p>
							У Buskanini ми спеціалізуємося на створенні високодеталізованих,
							реалістичних 3D-моделей для дизайну інтер'єру та меблів. Наша
							команда фокусується на мінімалістичному та ергономічному дизайні,
							пропонуючи високоякісні візуалізації, які оживляють простір.
						</p>
						<p>
							Використовуючи передові інструменти, такі як Autodesk 3ds Max та
							<br />
							Corona Render, ми гарантуємо, що кожна деталь буде виконана з
							точністю та артистизмом. <br /> Незалежно від того, чи є ви
							архітектором, дизайнером або ентузіастом 3D, наші моделі піднесуть
							ваші проекти та забезпечать приголомшливі результати для
							візуалізації або виробництва.
						</p>
					</div>
					<div
						className={styles.aboutUsImage}
						style={{ backgroundImage: `url(/images/about/chair.webp)` }}
					/>
				</div>
			</section>

			<div className={`${styles.aboutBuskanini}`}>
				<span>bushkanini</span>
			</div>

			<section className={`${styles.aboutMe} ${styles.aboutSectionStyles}`}>
				<div className={styles.content}>
					<div className={styles.aboutMeTexts}>
						<h2>Про мене</h2>
						<p>
							Привіт! Я є творчою силою компанії Buskanini, де я поєдную свою
							любов до дизайну з моїм досвідом у 3D-моделюванні. <br /> Мені
							подобається створювати мінімалістичні та ергономічні меблі, які
							розповідають історію та покращують будь-який простір.
							<br /> Кожна модель, яку я створюю, є відображенням моєї
							пристрасті до деталей і якості, використовуючи першокласні
							інструменти, такі як Autodesk 3ds Max.
						</p>
						<p>
							Я завжди досліджую свіжі ідеї та тенденції, щоб просунути своє
							<br />
							ремесло далі. Приєднуйтесь до мене в цій захоплюючій подорожі
							<br />
							перетворення уяви в приголомшливу візуальну реальність!
						</p>
					</div>

					<div className={styles.aboutMeInfo}>
						<div
							className={styles.aboutMeInfoImage}
							style={{
								backgroundImage: `url(/images/about/MykolaBuskaniuk.webp)`,
							}}
						/>
						<div className={styles.aboutMeInfoText}>
							<h3>Mykola Bushkaniuk</h3>
							<p>Co-fouder</p>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.aboutProjects}>
				<div className={styles.aboutProjectsWrap}>
					<div className={styles.aboutProjectsProject}>
						<h3>
							50+ <br />
							Проєктів
						</h3>
					</div>
					<div className={styles.aboutProjectsButtons}>
						<a href="#projects" className={styles.projectsLink}>
							Переглянути проєкти
						</a>
						<button className={styles.arrowBtn}>
							<div className={styles.arrowIcon}>
								<BlackArrow />
							</div>
						</button>
					</div>
				</div>
				<div className={styles.aboutProjectsText}>
					<p>
						За три роки трансформовано понад 50 проєктів, досягнувши виняткових
						результатів для більш ніж 700 клієнтів. Прихильність до творчості та
						інновацій лежить в основі кожного проєкту, незалежно від його
						масштабу.
					</p>
					<p>Готові дізнатися більше?</p>
				</div>
			</section>

			<section className={styles.askSection}>
				<HaveQuestion />
			</section>
		</>
	);
};

export default Page;

import Header from "@/app/components/header";
import styles from "./about.module.scss";

const Page = () => {
  return (
    <>
      <Header />
      <section className={styles.aboutUs}>
        <div className={styles.aboutUsText}>
          <h3>Про нас</h3>
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
        <img src="" alt="" />
      </section>
      <div className={styles.aboutBuskaniniN}>
        <h1>bushkanini</h1>
      </div>
      <section className={styles.aboutMe}>
        <div className={styles.aboutMeText}>
          <h3>Про мене</h3>
          <p>
            Привіт! Я є творчою силою компанії Buskanini, де я поєдную свою
            любов до дизайну з моїм досвідом у 3D-моделюванні. Мені подобається
            створювати мінімалістичні та ергономічні меблі, які розповідають
            історію та покращують будь-який простір. Кожна модель, яку я
            створюю, є відображенням моєї пристрасті до деталей і якості,
            використовуючи першокласні інструменти, такі як Autodesk 3ds Max.
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
          <img src="" alt="" />
          <div className={styles.aboutMeInfoText}>
            <h3>Mykola Bushkaniuk</h3>
            <p>Co-fouder</p>
          </div>
        </div>
      </section>

      <section className={styles.aboutProjects}>
        <div className={styles.aboutProjectsWrap}>
          <div className={styles.aboutProjectsProject}>
            <h3 id="projects-heading">
              50+ <br />
              Проєктів
            </h3>
          </div>
          <div className={styles.aboutProjectsButtons}>
            <a href="#projects" className={styles.projectsLink}>
              Переглянути проєкти
            </a>
            <button className={styles.arrowBtn}>
              <img src="" alt="Дізнатися більше" />
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

      <section className={styles.aboutContact}>
        <h2 className={styles.aboutContactHeading}>Маєте запитання?</h2>
        <p className={styles.aboutContactText}>
          Пишіть нам у будь-який час — ми завжди на зв'язку, щоб допомогти
          створити ваш ідеальний простір.
        </p>
        <button className={styles.aboutContactButton}>Написати</button>
      </section>
    </>
  );
};

export default Page;

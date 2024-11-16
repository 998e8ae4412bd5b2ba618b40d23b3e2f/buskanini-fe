'use client'
import styles from './not-found/notFound.module.scss'
import '@/app/styles/default.scss'
import '@/app/styles/global.scss'

export default function NotFound() {
	return (
		<html>
			<body className={styles.notFoundBody}>
				<section className={styles.notFound}>
					<h1>Ой, схоже, ви не туди потрапили!</h1>
					<span>Здається, ця сторінка відсутня</span>
					<a href='/'><span>На головну</span></a>
				</section>
			</body>
		</html>
	);
}

import "../styles/fonts.scss";
import "../styles/default.scss";
import "../styles/global.scss";

import GoUpButton from "@/app/components/GoUpButton";
import { NextIntlClientProvider} from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type React from "react";
import {Metadata} from "next";



export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('metadata')

	return {
		title: t('main_title'),
		description: t('description'),
		applicationName: "Frant",
		generator: "Next js",
		keywords: [t('keywords')],
		creator: "Frant team",
		publisher: "Frant",
		alternates: { canonical: "https://buskanini-fe.vercel.app" },
		openGraph: {
			type: "website",
			url: "https://buskanini-fe.vercel.app",
			title: t("main_title"),
			description: t('openGraph.description'),
			siteName: "Frant website",
			images: [
				{
					url: "https://buskanini-fe.vercel.app/og_image.png",
					secureUrl: "https://buskanini-fe.vercel.app/og_image.png",
					alt: "Site development, Web Design, Custom Web Solutions, Order site development",
					type: "website",
					width: "1200px",
					height: "768px"
				}
			]
		},
		twitter: {
			card: "summary_large_image",
			site: "@site",
			creator: "Frant team",
			title: t('main_title'),
			description: t('twitter.description'),
			images: "https://buskanini-fe.vercel.app//og_image.png"
		}
	}
}

interface RootLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<RootLayoutProps>) {
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<head></head>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
					<GoUpButton />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

import '../styles/fonts.scss'
import '../styles/default.scss'
import '../styles/global.scss'

import {NextIntlClientProvider, useTranslations} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import Footer from "@/app/components/footer";
import React from "react";

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
      <html>
      <head>
      </head>
      <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
               {children}
              <Footer/>
          </NextIntlClientProvider>
      </body>
      </html>
  );
}
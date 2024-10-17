import {NextIntlClientProvider, useTranslations} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";

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
          </NextIntlClientProvider>
      </body>
      </html>
  );
}
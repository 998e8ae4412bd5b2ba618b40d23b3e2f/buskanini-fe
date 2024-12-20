import { locales } from "@/locales";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	// A list of all locales that are supported
	locales: locales,

	// Used when no locale matches
	defaultLocale: "en",
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/((?!api|_next|.*\\..*).*)', '/', '/(en|ua)/:path*'],
};
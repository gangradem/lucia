import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";
// import "lucia/polyfill/node";

const db = sqlite("main.db");

export const auth = lucia({
	adapter: betterSqlite3(db, {
		user: "user",
		session: "user_session",
		key: "user_key"
	}),
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs(),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			emailVerified: Boolean(data.email_verified)
		};
	}
});

export type Auth = typeof auth;

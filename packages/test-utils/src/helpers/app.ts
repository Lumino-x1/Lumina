import { auth } from "@lumina/auth";
import { profileRouter } from "../../../demo/api/modules/profile/profile.router.ts";
import { toNodeHandler } from "better-auth/node";
import express from "express";

export function createTestApp() {
	const app = express();

	app.use(express.json());

	app.all("/api/auth/*path", toNodeHandler(auth));
	app.use("/api/profile", profileRouter);

	app.get("/ok", (_req, res) => {
		res.status(200).json({ message: "OK" });
	});

	return app;
}

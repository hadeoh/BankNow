import { Router } from "express";
import authRoutes from "../routes/auth.routes";
import emailRoutes from "../routes/email.routes";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req, res) =>
  res.send({ check: "banknow server started ok" })
);

router.use("/auth", authRoutes);
router.use("/reset", emailRoutes);

export default router;

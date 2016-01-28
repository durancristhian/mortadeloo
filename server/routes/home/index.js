import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => res.render("home"));

export default router;

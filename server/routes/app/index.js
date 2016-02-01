import isntAuthenticated from "../../middlewares/isntAuthenticated";
import express from "express";

const router = express.Router();

router.get("/", isntAuthenticated, (req, res) => res.render("app", { user: req.user }));

export default router;

import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", passport.authenticate("twitter"));

router.get("/callback", passport.authenticate("twitter", {
    failureRedirect: "/",
    successRedirect: "/app"
}));

export default router;

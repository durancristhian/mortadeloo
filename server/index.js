import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import expressHandlebars from "express-handlebars";
import expressSession from "express-session";
import helmet from "helmet";
import http from "http";
import logger from "./lib/logger";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";

if (!process.env.NODE_ENV) {
    dotenv.load({
        path  : '.env-local',
        silent: true
    });
}

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

import * as handlebarsHelpers from "./lib/handlebarsHelpers";

const handlebars = expressHandlebars.create({
    extname      : "html",
    defaultLayout: "main",
    helpers      : handlebarsHelpers,
    layoutsDir   : path.join(__dirname, "views", "layouts")
});

app.engine("html", handlebars.engine);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(expressSession({
    secret           : process.env.SESSION_SECRET,
    resave           : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

import authentication from "./authentication";
authentication();

import locals from "./middlewares/locals";
app.use(locals);

app.use(express.static("public"));

import apiController from "./api";
import appController from "./routes/app";
import homeController from "./routes/home";
import logoutController from "./routes/logout";
import twitterController from "./routes/auth/twitter";

app.use("/", homeController);
app.use("/api", apiController);
app.use("/app", appController);
app.use("/auth/twitter", twitterController);
app.use("/logout", logoutController);

mongoose.connect(process.env.DB);

mongoose.connection.on("error", (error) => {
    logger.error(error);
    process.exit(1);
});

mongoose.connection.on("connected", () => {
    logger.info(process.env.DB);
    server.listen(port, () => logger.info(`http://localhost:${port}`));
});

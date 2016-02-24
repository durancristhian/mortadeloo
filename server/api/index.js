import express from "express";
import { getResults } from "../lib/get-results";

const router = express.Router();

router.get("/results", (req, res) => {
    getResults((error, results) => {
        if (error) {
            return res.status(error.statusCode).json(error);
        }

        return res.status(200).json(results);
    });
});

export default router;

import async from "async";
import { getResults } from "../get-results";
import logger from "../logger";
import schedule from "node-schedule";
import User from "../../models/user";

function collectData(callback) {
    async.parallel([
        getResults,
        function (callback) {
            User
                .find({})
                .select({
                    "id"              : 1,
                    "numbers"         : 1,
                    "profile.username": 1
                })
                .exec((err, users) => {
                    if (err) {
                        callback(err);
                    }

                    callback(null, users);
                });
        }
    ], callback);
}

function formatData(playName) {
    collectData((error, results) => {
        if (error) {
            return logger.error(error);
        }

        const [ numbers, users ] = results;

        const play = [
            parseInt(numbers.nacional[playName].substring(2)),
            parseInt(numbers.provincia[playName].substring(2))
        ];

        const filteredUsers = users.filter((user) => {
            return user.numbers.some((n) => {
                return play.indexOf(n) > -1;
            });
        });

        logger.info(filteredUsers);
    });
}

export function initSchedule() {
    schedule.scheduleJob("0 0 12 * * *", () => formatData("laPrimera"));
    schedule.scheduleJob("0 30 14 * * *", () => formatData("matutina"));
    schedule.scheduleJob("0 0 18 * * *", () => formatData("vespertina"));
    schedule.scheduleJob("0 30 21 * * *", () => formatData("nocturna"));
}

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

function formatData(playName, callback) {
    collectData((error, results) => {
        if (error) {
            callback(error);
        }

        const [ numbers, users ] = results;

        const play = [
            parseInt(numbers.nacional[playName].substring(2)),
            parseInt(numbers.provincia[playName].substring(2))
        ];

        const tweetsMetadata = users.reduce((tweets, user) => {
            const thereIsCoincidence = user.numbers.some((n) => {
                return play.indexOf(n) > -1;
            });

            if (thereIsCoincidence) {
                tweets.push({
                    user,
                    play,
                    playName
                });
            }

            return tweets;
        }, []);

        callback(null, tweetsMetadata);
    });
}

function sendTweets(playName) {
    formatData(playName, (error, tweetsMetadata) => {
        if (error) {
            logger.error(error);
        }

        logger.info(tweetsMetadata);
    });
}

export function initSchedule() {
    schedule.scheduleJob("0 0 12 * * *", () => sendTweets("laPrimera"));
    schedule.scheduleJob("0 30 14 * * *", () => sendTweets("matutina"));
    schedule.scheduleJob("0 0 18 * * *", () => sendTweets("vespertina"));
    schedule.scheduleJob("0 30 21 * * *", () => sendTweets("nocturna"));
}

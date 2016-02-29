import async from "async";
import { getResults } from "../get-results";
import logger from "../logger";
import schedule from "node-schedule";
import User from "../../models/user";

function buildTweetMetadata(users, playType, numberToFind) {
    return users.reduce((tweets, user) => {
        const thereIsCoincidence = user.numbers.indexOf(numberToFind) > -1;

        if (thereIsCoincidence) {
            tweets.push(`@${user.profile.username} salió el ${numberToFind} (${playType})`);
        }

        return tweets;
    }, []);
}

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
            return callback(error);
        }

        const [ numbers, users ] = results;

        const nacionalPlayNumber = parseInt(numbers.nacional[playName].substring(2));
        const nacionalPlayTweets = buildTweetMetadata(users, "nacional", nacionalPlayNumber);

        const provinciaPlayNumber = parseInt(numbers.provincia[playName].substring(2));
        const provinciaPlayTweets = buildTweetMetadata(users, "provincia", provinciaPlayNumber);

        callback(null, {
            nacionalPlayTweets,
            provinciaPlayTweets
        });
    });
}

function sendTweets(playName) {
    formatData(playName, (error, tweetsMetadata) => {
        if (error) {
            return logger.error(error);
        }

        logger.info(tweetsMetadata);
    });
}

export function initSchedule() {
    schedule.scheduleJob("0 0 12 * * 1-6", () => sendTweets("laPrimera"));
    schedule.scheduleJob("0 30 14 * * 1-6", () => sendTweets("matutina"));
    schedule.scheduleJob("0 0 18 * * 1-6", () => sendTweets("vespertina"));
    schedule.scheduleJob("0 30 21 * * 1-6", () => sendTweets("nocturna"));
}

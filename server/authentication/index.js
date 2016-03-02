import passport from "passport";
import passportTwitter from "passport-twitter";
import User from "../models/user";

const TwitterStrategy = passportTwitter.Strategy;

function deserializeUser(id, done) {
    User.findById(id, (error, user) => { done(error, user); });
}

function serializeUser(user, done) {
    done(null, user.id);
}

function twitterStrategyImplementation(token, tokenSecret, profile, done) {
    User.findOrCreate(
        { "profile.id": profile.id },
        { profile },
        (error, user) => {
            if (error) { return done(error); }
            done(null, user);
        }
    );
}

function init() {
    passport.use(new TwitterStrategy({
        callbackURL   : "/auth/twitter/callback",
        consumerKey   : process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET
    }, twitterStrategyImplementation));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}

export default init;

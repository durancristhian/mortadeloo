export default function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/app");
    } else {
        next();
    }
}

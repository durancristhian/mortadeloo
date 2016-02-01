export default function (req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
}

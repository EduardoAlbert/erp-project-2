var express = require("express");
var loginApp = require("../app/login/controller/ctlLogin");

var router = express.Router();

function authenticationMiddleware(req, res, next) {
    isLogged = req.session.isLogged;

    if (!isLogged) {
        console.log("[app.js] Entrou em isLogged");
        res.redirect("/Login");
    }
    next();
}

router.get("/", authenticationMiddleware, function (req, res, next) {
    userName = req.session.userName;
    res.render("index", { title: "Página principal", userName: userName });
});

router.get("/Login", loginApp.Login);
router.post("/Login", loginApp.Login);
router.get("/Logout", loginApp.Logout);

module.exports = router;

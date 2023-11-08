var express = require("express");
var paymentsToReceiveApp = require("../app/paymentsToReceive/controller/ctlPaymentsToReceive");

var router = express.Router();

function authenticationMiddleware(req, res, next) {
    isLogged = req.session.isLogged;

    if (!isLogged) {
        res.redirect("/Login");
    }
    next();
}

router.get(
    "/",
    authenticationMiddleware,
    paymentsToReceiveApp.getAllPaymentsToReceive
);
router.get(
    "/inserir",
    authenticationMiddleware,
    paymentsToReceiveApp.openPaymentsToReceiveInsert
);
router.get(
    "/atualizar/:id",
    authenticationMiddleware,
    paymentsToReceiveApp.openPaymentsToReceiveUpdate
);
router.post(
    "/inserir",
    authenticationMiddleware,
    paymentsToReceiveApp.insertPaymentsToReceive
);
router.post(
    "/getDados",
    authenticationMiddleware,
    paymentsToReceiveApp.getDados
);
router.post(
    "/atualizar",
    authenticationMiddleware,
    paymentsToReceiveApp.updatePaymentsToReceives
);
router.post(
    "/deletar",
    authenticationMiddleware,
    paymentsToReceiveApp.deletePaymentsToReceives
);

module.exports = router;

var express = require("express");
var billsToPayApp = require("../app/billsToPay/controller/ctlBillsToPay");

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
    billsToPayApp.getAllBillsToPay
);
router.get(
    "/inserir",
    authenticationMiddleware,
    billsToPayApp.openBillsToPayInsert
);
router.get(
    "/atualizar/:id",
    authenticationMiddleware,
    billsToPayApp.openBillsToPayUpdate
);
router.post(
    "/inserir",
    authenticationMiddleware,
    billsToPayApp.insertBillsToPay
);
router.post(
    "/getDados",
    authenticationMiddleware,
    billsToPayApp.getDados
);
router.post(
    "/atualizar",
    authenticationMiddleware,
    billsToPayApp.updateBillsToPays
);
router.post(
    "/deletar",
    authenticationMiddleware,
    billsToPayApp.deleteBillsToPays
);

module.exports = router;

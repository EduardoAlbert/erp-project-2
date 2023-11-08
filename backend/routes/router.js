const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appBillsToPay = require("../apps/billsToPay/controller/ctlBillsToPay");

routerApp.use((req, res, next) => {
    next();
});

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

routerApp.get(
    "/getAllBillsToPay",
    appLogin.AutenticaJWT,
    appBillsToPay.getAllBillsToPay
);
routerApp.post(
    "/getBillToPayByID",
    appLogin.AutenticaJWT,
    appBillsToPay.getBillToPayByID
);
routerApp.post(
    "/insertBillsToPay",
    appLogin.AutenticaJWT,
    appBillsToPay.insertBillsToPay
);
routerApp.post(
    "/updateBillsToPay",
    appLogin.AutenticaJWT,
    appBillsToPay.updateBillsToPay
);
routerApp.post(
    "/deleteBillsToPay",
    appLogin.AutenticaJWT,
    appBillsToPay.deleteBillsToPay
);

module.exports = routerApp;

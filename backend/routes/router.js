const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appPaymentsToReceive = require("../apps/paymentsToReceive/controller/ctlPaymentsToReceive");

routerApp.use((req, res, next) => {
    next();
});

routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

routerApp.get(
    "/getAllPaymentsToReceive",
    appLogin.AutenticaJWT,
    appPaymentsToReceive.getAllPaymentsToReceive
);
routerApp.post(
    "/getPaymentToReceiveByID",
    appLogin.AutenticaJWT,
    appPaymentsToReceive.getPaymentToReceiveByID
);
routerApp.post(
    "/insertPaymentsToReceive",
    appLogin.AutenticaJWT,
    appPaymentsToReceive.insertPaymentsToReceive
);
routerApp.post(
    "/updatePaymentsToReceive",
    appLogin.AutenticaJWT,
    appPaymentsToReceive.updatePaymentsToReceive
);
routerApp.post(
    "/deletePaymentsToReceive",
    appLogin.AutenticaJWT,
    appPaymentsToReceive.deletePaymentsToReceive
);

module.exports = routerApp;

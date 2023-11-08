const mdlPaymentsToReceive = require("../model/mdlPaymentsToReceive");

const getAllPaymentsToReceive = (req, res) =>
    (async () => {
        let paymentsToReceive =
            await mdlPaymentsToReceive.getAllPaymentsToReceive();
        res.json({ status: "ok", paymentsToReceive: paymentsToReceive });
    })();

const getPaymentToReceiveByID = (req, res) =>
    (async () => {
        const paymentToReceiveID = parseInt(req.body.id);
        let record = await mdlPaymentsToReceive.getPaymentToReceiveByID(
            paymentToReceiveID
        );

        res.json({ status: "ok", record: record });
    })();

const insertPaymentsToReceive = (request, res) =>
    (async () => {
        const record = request.body;
        let { msg, affectedRows } =
            await mdlPaymentsToReceive.insertPaymentsToReceive(record);
        res.json({ status: msg, affectedRows: affectedRows });
    })();

const updatePaymentsToReceive = (request, res) =>
    (async () => {
        const record = request.body;
        let { msg, affectedRows } =
            await mdlPaymentsToReceive.updatePaymentsToReceive(record);
        res.json({ status: msg, affectedRows: affectedRows });
    })();

const deletePaymentsToReceive = (request, res) =>
    (async () => {
        const record = request.body;
        let { msg, affectedRows } =
            await mdlPaymentsToReceive.deletePaymentsToReceive(record);
        res.json({ status: msg, affectedRows: affectedRows });
    })();

module.exports = {
    getAllPaymentsToReceive,
    getPaymentToReceiveByID,
    insertPaymentsToReceive,
    updatePaymentsToReceive,
    deletePaymentsToReceive,
};

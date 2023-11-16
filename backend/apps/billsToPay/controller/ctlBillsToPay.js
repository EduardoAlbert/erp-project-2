const mdlBillsToPay = require("../model/mdlBillsToPay");

const getAllBillsToPay = (req, res) =>
  (async () => {
    const userId = req.userId;
    let billsToPay = await mdlBillsToPay.getAllBillsToPay(userId);
    res.json({ status: "ok", billsToPay: billsToPay });
  })();

const getBillToPayByID = (req, res) =>
  (async () => {
    const userId = req.userId;

    const billToPayID = parseInt(req.body.id);
    let record = await mdlBillsToPay.getBillToPayByID(userId, billToPayID);

    res.json({ status: "ok", record: record });
  })();

const insertBillsToPay = (req, res) =>
  (async () => {
    const userId = req.userId;
    const record = req.body;
    let { msg, affectedRows } = await mdlBillsToPay.insertBillsToPay(userId, record);
    res.json({ status: msg, affectedRows: affectedRows });
  })();

const updateBillsToPay = (req, res) =>
  (async () => {
    const userId = req.userId;
    const record = req.body;
    let { msg, affectedRows } = await mdlBillsToPay.updateBillsToPay(userId, record);
    res.json({ status: msg, affectedRows: affectedRows });
  })();

const deleteBillsToPay = (req, res) =>
  (async () => {
    const userId = req.userId;
    const record = req.body;
    let { msg, affectedRows } = await mdlBillsToPay.deleteBillsToPay(userId, record);
    res.json({ status: msg, affectedRows: affectedRows });
  })();

module.exports = {
  getAllBillsToPay,
  getBillToPayByID,
  insertBillsToPay,
  updateBillsToPay,
  deleteBillsToPay,
};

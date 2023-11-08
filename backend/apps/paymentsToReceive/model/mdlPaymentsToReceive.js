const db = require("../../../database/databaseconfig");

const getAllPaymentsToReceive = async () => {
    return (
        await db.query(
            "SELECT * FROM payments_to_receive WHERE removed = false ORDER BY due_date ASC"
        )
    ).rows;
};

const getPaymentToReceiveByID = async (paymentToReceiveIDPar) => {
    return (
        await db.query(
            "SELECT * FROM payments_to_receive WHERE id = $1 and removed = false",
            [paymentToReceiveIDPar]
        )
    ).rows;
};

const insertPaymentsToReceive = async (recordPar) => {
    let affectedRows;
    let msg = "ok";
    try {
        affectedRows = (
            await db.query(
                "INSERT INTO payments_to_receive " +
                    "values(default, $1, $2, $3, $4)",
                [
                    recordPar.description,
                    recordPar.amount,
                    recordPar.due_date,
                    recordPar.removed,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaymentsToReceive|insertPaymentsToReceive] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

const updatePaymentsToReceive = async (recordPar) => {
    let affectedRows;
    let msg = "ok";
    try {
        affectedRows = (
            await db.query(
                "UPDATE payments_to_receive SET " +
                    "description = $2, " +
                    "amount = $3, " +
                    "due_date = $4, " +
                    "removed = $5 " +
                    "WHERE id = $1",
                [
                    recordPar.id,
                    recordPar.description,
                    recordPar.amount,
                    recordPar.due_date,
                    recordPar.removed,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaymentsToReceive|UpdatePaymentsToReceive] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

const deletePaymentsToReceive = async (recordPar) => {
    let affectedRows;
    let msg = "ok";

    try {
        affectedRows = (
            await db.query(
                "UPDATE payments_to_receive SET removed = true WHERE id = $1",
                [recordPar.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlPaymentsToReceive|DeletePaymentsToReceive] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

module.exports = {
    getAllPaymentsToReceive,
    getPaymentToReceiveByID,
    insertPaymentsToReceive,
    updatePaymentsToReceive,
    deletePaymentsToReceive,
};

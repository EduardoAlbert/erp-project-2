const db = require("../../../database/databaseconfig");

const getAllBillsToPay = async (userId) => {
    return (
        await db.query(
            "SELECT * FROM bills_to_pay WHERE user_id = $1 AND removed = false ORDER BY due_date ASC",
            [userId]
        )
    ).rows;
};

const getBillToPayByID = async (userId, billToPayIDPar) => {
    return (
        await db.query(
            "SELECT * FROM bills_to_pay WHERE user_id = $1 AND id = $2 and removed = false",
            [userId, billToPayIDPar]
        )
    ).rows;
};

const insertBillsToPay = async (userId, recordPar) => {
    let affectedRows;
    let msg = "ok";
    try {
        affectedRows = (
            await db.query(
                "INSERT INTO bills_to_pay " +
                    "values(default, $1, $2, $3, $4, $5)",
                [
                    userId,
                    recordPar.description,
                    recordPar.amount,
                    recordPar.due_date,
                    recordPar.removed,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlBillsToPay|insertBillsToPay] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

const updateBillsToPay = async (recordPar) => {
    let affectedRows;
    let msg = "ok";
    try {
        affectedRows = (
            await db.query(
                "UPDATE bills_to_pay SET " +
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
        msg = "[mdlBillsToPay|UpdateBillsToPay] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

const deleteBillsToPay = async (recordPar) => {
    let affectedRows;
    let msg = "ok";

    try {
        affectedRows = (
            await db.query(
                "UPDATE bills_to_pay SET removed = true WHERE id = $1",
                [recordPar.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlBillsToPay|DeleteBillsToPay] " + error.detail;
        affectedRows = -1;
    }

    return { msg, affectedRows };
};

module.exports = {
    getAllBillsToPay,
    getBillToPayByID,
    insertBillsToPay,
    updateBillsToPay,
    deleteBillsToPay,
};

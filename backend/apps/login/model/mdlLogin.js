const db = require("../../../database/databaseconfig");

const GetCredencial = async (loginPar) => {
    return (
        await db.query(
            "select username, password from users where username = $1 and removed = false",
            [loginPar]
        )
    ).rows;
};

module.exports = {
    GetCredencial,
};

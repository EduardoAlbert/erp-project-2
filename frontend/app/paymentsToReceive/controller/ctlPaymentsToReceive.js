const axios = require("axios");

//@ Abre o formulário de manutenção de pagamentos a receber
const getAllPaymentsToReceive = (req, res) =>
    (async () => {
        token = req.session.token;
        userName = req.session.userName;
        try {
            resp = await axios.get(
                process.env.SERVIDOR_DW3 + "/getAllPaymentsToReceive",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log("[ctlPaymentsToReceive.js] Valor resp:", resp.data);
            res.render("pagamentos_receber/view_manutencao", {
                title: "Manutenção de pagamentos a receber",
                data: resp.data,
                userName: userName,
            });
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|getAllPaymentsToReceive] Try Catch:Erro de requisição"
            );
        }
    })();

//@ Abre formulário de cadastro de pagamentos a receber
const openPaymentsToReceiveInsert = (req, res) =>
    (async () => {
        var oper = "";
        userName = req.session.userName;
        token = req.session.token;
        try {
            if (req.method == "GET") {
                oper = "c";
                res.render("pagamentos_receber/view_cadPagamentosReceber", {
                    title: "Cadastro de pagamentos a receber",
                    oper: oper,
                    userName: userName,
                });
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|openPaymentsToReceiveInsert] Try Catch: Erro não identificado",
                erro
            );
        }
    })();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
    if (regFormPar.id == "") {
        regFormPar.id = 0;
    } else {
        regFormPar.id = parseInt(regFormPar.id);
    }

    regFormPar.removed = regFormPar.removed === "true";

    return regFormPar;
}

//@ Abre formulário de atualização de pagamentos a receber
const openPaymentsToReceiveUpdate = (req, res) =>
    (async () => {
        var oper = "";
        userName = req.session.userName;
        try {
            if (req.method == "GET") {
                oper = "u";
                const id = req.params.id;
                parseInt(id);
                res.render("pagamentos_receber/view_cadPagamentosReceber", {
                    title: "Detalhes de pagamentos a receber",
                    oper: oper,
                    idBusca: id,
                    userName: userName,
                });
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|openPaymentsToReceiveUpdate] Try Catch: Erro não identificado",
                erro
            );
        }
    })();

//@ Recupera os dados dos pagamentos a receber
const getDados = (req, res) =>
    (async () => {
        const idBusca = req.body.idBusca;
        token = req.session.token;
        parseInt(idBusca);
        console.log("[ctlPaymentsToReceive.js|getDados] valor id :", idBusca);
        try {
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/getPaymentToReceiveByID",
                {
                    id: idBusca,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(resp.data);
            if (resp.data.status == "ok") {
                res.json({ status: "ok", record: resp.data.record[0] });
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|getDados] Try Catch: Erro não identificado",
                erro
            );
        }
    })();

//@ Realiza inserção de pagamentos a receber
const insertPaymentsToReceive = (req, res) =>
    (async () => {
        token = req.session.token;
        try {
            if (req.method == "POST") {
                const regPost = validateForm(req.body);
                regPost.id = 0;
                const resp = await axios.post(
                    process.env.SERVIDOR_DW3 + "/insertPaymentsToReceive",
                    regPost,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                if (resp.data.status == "ok") {
                    res.json({
                        status: "ok",
                        mensagem: "Pagamento inserido com sucesso!",
                    });
                } else {
                    res.json({
                        status: "erro",
                        mensagem: "Erro ao inserir pagamento!",
                    });
                }
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|insertPaymentsToReceive] Try Catch: Erro não identificado",
                erro
            );
        }
    })();

//@ Realiza atualização de pagamentos a receber
const updatePaymentsToReceives = (req, res) =>
    (async () => {
        token = req.session.token;
        try {
            if (req.method == "POST") {
                const regPost = validateForm(req.body);
                const resp = await axios.post(
                    process.env.SERVIDOR_DW3 + "/updatePaymentsToReceive",
                    regPost,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                if (resp.data.status == "ok") {
                    res.json({
                        status: "ok",
                        mensagem: "Pagamento atualizado com sucesso!",
                    });
                } else {
                    res.json({
                        status: "erro",
                        mensagem: "Erro ao atualizar pagamento!",
                    });
                }
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|updatePaymentsToReceives] Try Catch: Erro não identificado.",
                erro
            );
        }
    })();

//@ Realiza remoção soft de pagamentos a receber
const deletePaymentsToReceives = (req, res) =>
    (async () => {
        token = req.session.token;
        try {
            if (req.method == "POST") {
                const regPost = validateForm(req.body);
                regPost.id = parseInt(regPost.id);
                const resp = await axios.post(
                    process.env.SERVIDOR_DW3 + "/deletePaymentsToReceive",
                    {
                        id: regPost.id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );

                if (resp.data.status == "ok") {
                    res.json({
                        status: "ok",
                        mensagem: "Pagamento removido com sucesso!",
                    });
                } else {
                    res.json({
                        status: "erro",
                        mensagem: "Erro ao remover Pagamento!",
                    });
                }
            }
        } catch (erro) {
            console.log(
                "[ctlPaymentsToReceive.js|updatePaymentsToReceives] Try Catch: Erro não identificado",
                erro
            );
        }
    })();

module.exports = {
    getAllPaymentsToReceive,
    openPaymentsToReceiveInsert,
    insertPaymentsToReceive,
    openPaymentsToReceiveUpdate,
    getDados,
    updatePaymentsToReceives,
    deletePaymentsToReceives,
};

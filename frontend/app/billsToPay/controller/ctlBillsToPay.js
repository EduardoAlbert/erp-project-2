const axios = require("axios");

//@ Abre o formulário de manutenção de contas a pagar
const getAllBillsToPay = (req, res) =>
  (async () => {
    token = req.session.token;
    userName = req.session.userName;
    try {
      resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllBillsToPay", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log("[ctlBillsToPay.js] Valor resp:", resp.data);
      res.render("contas_pagar/view_manutencao", {
        title: "Manutenção de contas a pagar",
        data: resp.data,
        userName: userName,
      });
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|getAllBillsToPay] Try Catch:Erro de requisição"
      );
    }
  })();

//@ Abre formulário de cadastro de contas a pagar
const openBillsToPayInsert = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method == "GET") {
        oper = "c";
        res.render("contas_pagar/view_cadContasPagar", {
          title: "Cadastro de contas a pagar",
          oper: oper,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|openBillsToPayInsert] Try Catch: Erro não identificado",
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

//@ Abre formulário de atualização de contas a pagar
const openBillsToPayUpdate = (req, res) =>
  (async () => {
    var oper = "";
    userName = req.session.userName;
    try {
      if (req.method == "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("contas_pagar/view_cadContasPagar", {
          title: "Detalhes de contas a pagar",
          oper: oper,
          idBusca: id,
          userName: userName,
        });
      }
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|openBillsToPayUpdate] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Recupera os dados dos contas a pagar
const getDados = (req, res) =>
  (async () => {
    const idBusca = req.body.idBusca;
    token = req.session.token;
    parseInt(idBusca);
    console.log("[ctlBillsToPay.js|getDados] valor id :", idBusca);
    try {
      resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/getBillToPayByID",
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
        "[ctlBillsToPay.js|getDados] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Realiza inserção de contas a pagar
const insertBillsToPay = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.id = 0;
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/insertBillsToPay",
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
            mensagem: "Conta inserida com sucesso!",
          });
        } else {
          res.json({
            status: "erro",
            mensagem: "Erro ao inserir conta!",
          });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|insertBillsToPay] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

//@ Realiza atualização de contas a pagar
const updateBillsToPays = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/updateBillsToPay",
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
            mensagem: "Conta atualizada com sucesso!",
          });
        } else {
          res.json({
            status: "erro",
            mensagem: "Erro ao atualizar conta!",
          });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|updateBillsToPays] Try Catch: Erro não identificado.",
        erro
      );
    }
  })();

//@ Realiza remoção soft de contas a pagar
const deleteBillsToPays = (req, res) =>
  (async () => {
    token = req.session.token;
    try {
      if (req.method == "POST") {
        const regPost = validateForm(req.body);
        regPost.id = parseInt(regPost.id);
        const resp = await axios.post(
          process.env.SERVIDOR_DW3 + "/deleteBillsToPay",
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
            mensagem: "Conta removida com sucesso!",
          });
        } else {
          res.json({
            status: "erro",
            mensagem: "Erro ao remover Conta!",
          });
        }
      }
    } catch (erro) {
      console.log(
        "[ctlBillsToPay.js|updateBillsToPays] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

module.exports = {
  getAllBillsToPay,
  openBillsToPayInsert,
  insertBillsToPay,
  openBillsToPayUpdate,
  getDados,
  updateBillsToPays,
  deleteBillsToPays,
};

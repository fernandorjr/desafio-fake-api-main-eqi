import { getIndicadores, getSimulacoes } from "./modulos/modulos.js";
import { preencheDashboard } from "./dashboard.js";

// Criação de todos os componentes da Tela
const inpcdi = document.getElementById("cdi");
const inpipca = document.getElementById("ipca");
const aporteInicial = document.getElementById("aporteInicial");
const prazo = document.getElementById("prazo");
const aporteMensal = document.getElementById("aporteMensal");
const rentabilidade = document.getElementById("rentabilidade");
const valorFinalBruto = document.getElementById("valorFinalBruto");
const aliquotaIR = document.getElementById("aliquotaIR");
const valorPagoIR = document.getElementById("valorPagoIR");
const valorFinalLiquido = document.getElementById("valorFinalLiquido");
const valorTotalInvestido = document.getElementById("valorTotalInvestido");
const ganhoLiquido = document.getElementById("ganhoLiquido");
const resultado = document.getElementById("resultado");
const limpar = document.getElementById("botao-limpar");
const simular = document.getElementById("botao-simular");

//função para formatar números dos retornos das funções para monetário
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

// Retornar e adicionar os indicadores (IPCA / CDI) na tela
const main = () => {
  getIndicadores()
    .then((result) => {
      const [cdi, ipca] = result;
      inpcdi.value = `${cdi.valor}%`;
      inpipca.value = `${ipca.valor}%`;
    })
    .catch((err) => {
      console.error(err);
    });
};

// Preencher os cards de resultado da simulação
const preencheCards = (simulacao) => {
  valorFinalBruto.innerHTML = formatter.format(simulacao.valorFinalBruto);
  aliquotaIR.innerHTML = `${simulacao.aliquotaIR}`;
  valorPagoIR.innerHTML = formatter.format(simulacao.valorPagoIR);
  valorFinalLiquido.innerHTML = formatter.format(simulacao.valorFinalLiquido);
  valorTotalInvestido.innerHTML = formatter.format(
    simulacao.valorTotalInvestido
  );
  ganhoLiquido.innerHTML = formatter.format(simulacao.ganhoLiquido);
};

// Retorno da simulação e chamada das funções que usam os valores de retorno
const getSimulacao = (indexacao, rendimento) => {
  getSimulacoes(indexacao, rendimento)
    .then((response) => {
      const [simulacao] = response;
      preencheCards(simulacao);
      preencheDashboard(simulacao.graficoValores);
      resultado.style.display = "grid";
      console.log(simulacao.graficoValores.comAporte[3]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Limpar o formulário e desabilitar o resultado da simulação feita
limpar.addEventListener("click", (e) => {
  e.preventDefault();
  aporteInicial.value = "";
  prazo.value = "";
  rentabilidade.value = "";
  aporteMensal.value = "";
  resultado.style.display = "none";
});

// Botão Simular, só realiza a simulação se os campos de input estiverem preenchidos.
simular.addEventListener("click", (e) => {
  if (
    aporteInicial.value != "" &&
    prazo.value != "" &&
    aporteMensal.value != "" &&
    rentabilidade.value
  ) {
    e.preventDefault();
    const tipoIndexacao = document.querySelector(
      'input[name="radio-indexacao"]:checked'
    ).value;
    const tipoRendimento = document.querySelector(
      'input[name="radio-rendimento"]:checked'
    ).value;
    getSimulacao(tipoIndexacao, tipoRendimento);
  } else {
    return;
  }
});
main(cdi, ipca);

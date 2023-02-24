const valorTela = document.querySelector('.result');
const valorTelaAnterior = document.querySelector('.resultado-anterior');
const sinalTela = document.querySelector('.signal');
const valorOperacao = document.querySelectorAll('[data-operation]');
const valorNumero = document.querySelectorAll('.number');
const botaoIgual = document.querySelector('.equal');
const botaoLimpar = document.querySelector('[data-limpar]');
const calculo = {};
let trocouSinal = false;

valorOperacao.forEach((operacao) => operacao.addEventListener('click', adicionarOperacao));
valorNumero.forEach((botao) => botao.addEventListener('click', adicionarValor));
botaoLimpar.addEventListener('click', limparTela);

//* Digita o valor na tela.
function adicionarValor(event) {
  const valor = event.target.innerText;

  //? Caso não exista primeiro valor:
  if (!calculo.primeiroValor){
    valorTela.value += valor;
  }
  //? Caso exista primeiro valor e não exista o segundo:
  else if ((calculo.primeiroValor && !calculo.segundoValor)) {
    valorTelaAnterior.innerText += valor;
  }
  else if ((calculo.primeiroValor && calculo.segundoValor) && (trocouSinal == true)) {
    valorTelaAnterior.innerText = valor;
    trocouSinal = false;
  }

  //? Caso exista primeiro valor e exista o segundo:
  else if (calculo.primeiroValor && calculo.segundoValor) {
    valorTelaAnterior.innerText += valor;
  }
};

//* Adiciona a operação na tela.
//* Soma o valor atual ao valor anterior.
let operacaoAnterior;
function adicionarOperacao(event) {
  //? Muda o sinal da operação.
  const operacao = event.target.innerText
  sinalTela.innerText = operacao;

  //? Atualiza os valores da operação.
  calculo.primeiroValor = parseInt(valorTela.value);
  calculo.segundoValor = parseInt(valorTelaAnterior.innerText);
  calculo.operacao = operacao;

  //? Se o sinal for diferente do anterior, limpará o segundo valor.
  if (operacaoAnterior !== operacao) {
    operacaoAnterior = operacao;
    valorTelaAnterior.innerText = '';
  } else if (operacaoAnterior == operacao) {
    trocouSinal = true;
    calcular(calculo);
  } else {
    calcular(calculo);
  }
  operacaoAnterior = operacao;
};

//* Realiza o cálculo e mostra na tela.
function calcular(calculo) {

  let resultado;

  if (calculo.primeiroValor && calculo.segundoValor && calculo.operacao) {
    switch (calculo.operacao) {
      case '+':
        resultado = calculo.primeiroValor + calculo.segundoValor;
        break
      case '-':
        resultado = calculo.primeiroValor - calculo.segundoValor;
        break
      case '÷':
        resultado = calculo.primeiroValor / calculo.segundoValor;
        break
      case '×':
        resultado = calculo.primeiroValor * calculo.segundoValor;
        break
    }

    valorTela.value = resultado;
    return resultado;  
  }
}

//* Limpa o valor na tela.
function limparTela() {
  valorTela.value = '';
  calculo.primeiroValor = '';
  valorTelaAnterior.innerText = '';
  calculo.segundoValor = '';
};

//* Botão igual.
botaoIgual.addEventListener('click', () => {
  calculo.primeiroValor = parseInt(valorTela.value);
  calculo.segundoValor = parseInt(valorTelaAnterior.innerText);
  trocouSinal = true;
  calcular(calculo);
});
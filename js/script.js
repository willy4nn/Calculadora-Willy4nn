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

  //? Caso exista primeiro valor e não exista o segundo:
  if ((calculo.primeiroValor || calculo.primeiroValor === 0) && (!calculo.segundoValor)) {
    if (valor == '.' && !valorTelaAnterior.innerText.includes('.')) {
      valorTelaAnterior.innerText += valor;
    } else if(valor == '%' && !valorTelaAnterior.innerText.includes('%')) {
      valorTelaAnterior.innerText += valor;
    } else if (!isNaN(valor)) {
      valorTelaAnterior.innerText += valor;
    }
  }
  //? Caso não exista primeiro valor: 
  else if (!calculo.primeiroValor){
    if (valor == '.' && !valorTela.value.includes('.')) {
      valorTela.value += valor;
    } else if(valor == '%' && !valorTela.value.includes('%')) {
      valorTela.value += valor;
    } else if (!isNaN(valor)) {
      valorTela.value += valor;
    }
  }
  //? Caso exista o primeiro e exista o segundo valor:
  else if ((calculo.primeiroValor || calculo.primeiroValor === 0) && (calculo.segundoValor || calculo.segundoValor === 0) && (trocouSinal == true)) {
    valorTelaAnterior.innerText = valor;
    trocouSinal = false;
  }
  //? Caso exista primeiro valor e exista o segundo:
  else if ((calculo.primeiroValor || calculo.primeiroValor === 0) && calculo.segundoValor) {
    if (valor == '.' && !valorTela.value.includes('.')) {
      valorTelaAnterior.innerText += valor;
    } else if(valor == '%' && !valorTelaAnterior.innerText.includes('%')) {
      valorTelaAnterior.innerText += valor;
    }else if (!isNaN(valor)) {
      valorTelaAnterior.innerText += valor;
    }
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

  if (valorTelaAnterior.innerText.includes('%')) {
    calculo.primeiroValor = valorTela.value;
    calculo.segundoValor = valorTelaAnterior.innerText;
  }
  else {
    calculo.primeiroValor = parseFloat(valorTela.value);
    calculo.segundoValor = parseFloat(valorTelaAnterior.innerText);
  }
  
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

  if ((calculo.primeiroValor || calculo.primeiroValor == 0) && (calculo.segundoValor || calculo.primeiroValor == 0) && calculo.operacao && (typeof calculo.primeiroValor === 'string' || typeof calculo.segundoValor === 'string')) {
  if (calculo.primeiroValor.includes('%')) {
      calculo.primeiroValor = (parseFloat(calculo.primeiroValor.replace('%', '')) / 100) * 100;
  }
  if (calculo.segundoValor.includes('%')) {
      calculo.segundoValor = (parseFloat(calculo.segundoValor.replace('%', '')) / 100) * calculo.primeiroValor;
  }
  }
  
  if ((calculo.primeiroValor || calculo.primeiroValor == 0) && (calculo.segundoValor || calculo.primeiroValor == 0) && calculo.operacao && (!isNaN(calculo.primeiroValor) && !isNaN(calculo.segundoValor))) {
    switch (calculo.operacao) {
      case '+':
        resultado = parseFloat(calculo.primeiroValor) + parseFloat(calculo.segundoValor);
        break
      case '-':
        resultado = parseFloat(calculo.primeiroValor) - parseFloat(calculo.segundoValor);
        break
      case '÷':
        resultado = parseFloat(calculo.primeiroValor) / parseFloat(calculo.segundoValor);
        break
      case '×':
        resultado = parseFloat(calculo.primeiroValor) * parseFloat(calculo.segundoValor);
        break
    }

    //? Se for um número adicione o resultado, se não mostre o erro e limpe a tela:
    if (!isNaN(resultado)) {
      valorTela.value = resultado;
      return resultado;  
    } else if (isNaN(resultado)) {
      valorTela.value = 'Erro';
      setTimeout(() => {
        limparTela();
      }, 1000);
      return;
    }

  }
}

//* Limpa o valor na tela.
function limparTela() {
  valorTelaAnterior.innerText = '';
  calculo.segundoValor = '';
  valorTela.value = '';
  calculo.primeiroValor = '';
  sinalTela.innerText = '';
  calculo.operacao = '';
  operacaoAnterior = '';
};

//* Botão igual.
botaoIgual.addEventListener('click', () => {
  calculo.primeiroValor = parseFloat(valorTela.value);
  calculo.segundoValor = parseFloat(valorTelaAnterior.innerText);
  trocouSinal = true;
  calcular(calculo);
});
const valorInput = document.querySelector('.result');
const valorPrev = document.querySelector('.resultado-anterior');

const btnNumber = document.querySelectorAll('.number');
btnNumber.forEach((btn) => btn.addEventListener('click', addValue));

const btnOperation = document.querySelectorAll('.operation');
btnOperation.forEach((btn) => btn.addEventListener('click', addOperation));

const equal = document.querySelector('.equal');
equal.addEventListener('click', addResult);

const clear = document.querySelector('.clear');
clear.addEventListener('click', limpar);

let refazer = false;
let operacao = '';

const calculo = {};

function addValue(event) {
  if (event.target.className == 'number' && !refazer) {
    valorInput.value += event.target.innerText;
  } else if (event.target.className == 'number' && refazer) {
    valorInput.value = '';
    valorInput.value += event.target.innerText;
    refazer = false;
  }
  else {
    valorPrev.innerText += event.target.innerText;
    calculo.segundoValor = parseInt(valorPrev.innerText);
  }
};

function addOperation(event) {
  valorInput.value = parseInt(valorInput.value) || 0
  calculo.primeiroValor = parseInt(valorInput.value);
  btnNumber.forEach((btn) => {
    btn.classList.remove('number');
    btn.classList.add('number-second');
  });

  operacao = event.target.innerText;

  if(calculo.segundoValor !== undefined) {
    switch (operacao) {
      case '%':
        valorPrev.innerText = calculo.segundoValor + '%';
        break
      case '±':
        valorPrev.innerText = -(valorPrev.innerText);
        break
    }
  }
} 

function addResult() {
  calculo.primeiroValor = parseInt(valorInput.value);
  let resultado

  switch (operacao) {
    case '+':
      resultado = calculo.primeiroValor + calculo.segundoValor;
      break;
    case '-':
      resultado = calculo.primeiroValor - calculo.segundoValor;
      break;
    case '÷':
      resultado = calculo.primeiroValor / calculo.segundoValor;
      break;
    case '×':
      resultado = calculo.primeiroValor * calculo.segundoValor;
      break;
  }

  if (typeof resultado === 'number' && isFinite(resultado) && !isNaN(resultado)) {
    valorInput.value = resultado;
    valorPrev.innerText = '';
  } else if (resultado == undefined) {
    resultado = calculo.primeiroValor;
  } else {
    valorInput.value = resultado;
    setTimeout(() => {
      valorInput.value = '';
      valorPrev.innerText = '';
    }, 1000);
    btnNumber.forEach((btn) => {
      btn.classList.remove('number-second');
      btn.classList.add('number');
    });
  }

  if (isNaN(calculo.segundoValor)) {
    valorInput.value = calculo.primeiroValor;
    refazer = true;
  }

  console.log(` 
  Primeiro Valor: ${calculo.primeiroValor};
  Segundo Valor: ${calculo.segundoValor};
  Resultado: ${resultado};
  Operação: ${operacao};
  `);
}

function limpar() {
  valorInput.value = '';
  valorPrev.innerText = '';
  btnNumber.forEach((btn) => {
    btn.classList.remove('number-second');
    btn.classList.add('number');
  });
}

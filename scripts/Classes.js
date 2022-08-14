//Sinal do tipo de operação selecionada no modal (incomes(+)/expenses(-))
//para adicionar o valor negativo caso seja um valor de saída 

var signal = "";
export const Classes = {
  //Variáveis que irão chamar as funções de click
  typeExpenses: document.querySelector('.typeExpenses'),
  typeIncomes: document.querySelector('.typeIncomes'),

  //Função para ativar as classes e mudar as cores de acordo com o tipo de transação
  activeIncomes() {
    //Ativando as cores verdes para as entradas - label e input's
    document.querySelector('.typeIncomes').classList.add('green');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('incomes-bg');
      //Remove a cor vermelha do input
      input.classList.remove('expenses-bg');
    });
    //Recebe o sinal vazio que significa que o valor é positivo(incomes)
    // signal = "";
    //Remove a cor vermelha do label
    document.querySelector('.typeExpenses').classList.remove('red')
  },
  activeExpenses() {
    //Ativando as cores vermelhas para as saídas - label e input's
    document.querySelector('.typeExpenses').classList.add('red');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('expenses-bg');
      //Remove a cor verde do input
      input.classList.remove('incomes-bg');
    });
    //Recebe o sinal (-) que significa que o valor é negativo(expenses)
    // signal = "-";
    //Remove a cor verde do label
    document.querySelector('.typeIncomes').classList.remove('green')
  },
}
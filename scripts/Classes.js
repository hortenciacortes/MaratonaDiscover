export const Classes = {
  typeExpenses: document.querySelector('.typeExpenses'),
  typeIncomes: document.querySelector('.typeIncomes'),

  /**
   * Função para ativar as classes e mudar as cores de acordo com o tipo de transação
   */
  activeIncomes() {
    Classes.typeIncomes.classList.add('green');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('incomes-bg');
      input.classList.remove('expenses-bg');
    });
    Classes.typeExpenses.classList.remove('red');
  },
  activeExpenses() {
    Classes.typeExpenses.classList.add('red');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('expenses-bg');
      input.classList.remove('incomes-bg');
    });
    Classes.typeIncomes.classList.remove('green')
  },
}
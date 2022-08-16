/**
 * Change the colors of the fields according to the type of transaction selected
 * @param valueType - type transaction - incomes/expenses (string)
 * @param activeType - element HTML of type transaction (string)
 */
export const TypeTransaction = {
  expenses: document.querySelector('.typeExpenses'),
  incomes: document.querySelector('.typeIncomes'),

  changeType(valueType, activeType){
    const inactiveType = valueType === 'incomes' ? this.expenses : this.incomes;
    const inactiveValue = valueType === 'incomes' ? 'expenses' : 'incomes';
  
    activeType.classList.add(valueType);
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add(`${valueType}-bg`);
      input.classList.remove(`${inactiveValue}-bg`);
    });
    inactiveType.classList.remove(inactiveValue);
  }
}
export const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return Math.round(value);
  },
  //Formatando o valor para retornar para o input
  formatAmountForm(value) {
    value = Number(value) / 100;
    return Math.round(value);
  },
  //Formatando a data do formato type="date" para o formato utilizado no BR
  formatDate(date) {
    const splittedDate = date.split('-');
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
  //Formatando a data para o formato do type="date"
  formatDateForm(date) {
    const splittedDate = date.split('/');
    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
  },

  /**
   * Formatting value for Brazilian currency
   * @param value - currency (string)
   * 
   * @returns formated currency to BR (string)
   */
  formatCurrency(value) {
    value = String(value).replace(/\D/g, '');
    value = value / 100;
    value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    return value;
  },

  /**
   * Formatting value format brazilian currency to dollar
   * @param value - currency (string)
   * 
   * @returns formated dollar currency (string)
   */
  realToDolar(value){
    console.log(value)
    value = value.replace('R$', '');
    value = value.replace('.', '');
    value = value.replace(',', '.');
    console.log(value.trim())
    return value.trim();
  }
}
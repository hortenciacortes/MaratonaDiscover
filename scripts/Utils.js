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
    value = value.replace('R$ ', '');
    value = value.replace('.', '');
    value = value.replace(',', '.');
    return value.trim();
  },

  /**
   * Generate a random integer
   * @param min - min number (number)
   * @param max - max number (number)
   * 
   * @returns an integer between two defined values (min and max).
   */
  getRandomInt(min = 1, max = 100) {
    return (Math.random() * (max - min) + min).toFixed();
  },

  /**
   * Generate a new id
   * Checks if the id exists, if it exists generates a new number and only returns when the id does not exist
   * 
   * @returns new id 
   */
  generateId() {
    let newId = Utils.getRandomInt();
    const idExists = Transaction.all.map(element => {
      return element.id !== newId ? true : false;
    })

    if(idExists.indexOf(false) === -1){
      return newId;
    } else {
      this.generateId();
    }
  },
}
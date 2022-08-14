
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
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
  //Formatando a data para o formato do type="date"
  formatDateForm(date) {
    const splittedDate = date.split("/");
    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
  },
  formatCurrency(value) {
    const signal = Number(value) > 0 ? "" : "-";
    value = String(value).replace(/\D/g, "");
    value = value / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value;
  }
}
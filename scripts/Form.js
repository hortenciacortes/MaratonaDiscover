
//Sinal do tipo de operação selecionada no modal (incomes(+)/expenses(-))

import { App } from "./App.js";
import { Modal } from "./Modal.js";
import { Transaction } from "./Transaction.js";
import { Utils } from "./Utils.js";
// import { Form } from "./Form";

//para adicionar o valor negativo caso seja um valor de saída 
let signal = "";
let id = 0;
let idEdit = 0;

export const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      description: Form.description.value,
      amount: signal + Form.amount.value,
      date: Form.date.value,
    }
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (description === "" || amount.trim() === "" || date === "") {
      throw new Error('Por favor, preencha todos os campos');
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    if (idEdit !== 0) {
      id = idEdit;
    } else {
      id = Transaction.all.length + 1;
    }
    return {
      id,
      description,
      amount,
      date,
    }
  },
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },
  fields(value) {
    Form.description.value = value.description;
    if (value.amount < 0) {
      Classes.activeExpenses();
      value.amount = String(value.amount).replace(/\D/g, "");
    }
    Form.amount.value = Utils.formatAmountForm(value.amount);
    Form.date.value = Utils.formatDateForm(value.date);
  },
  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction)
      Form.clearFields();
      Modal.openClose();
      App.reload();

    } catch (error) {
      alert(error.message);
    }
  }
}
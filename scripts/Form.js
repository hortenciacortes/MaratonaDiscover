import { App } from "./App.js";
import { Modal } from "./Modal.js";
import { Transaction } from "./Transaction.js";
import { TypeTransaction } from "./TypeTransaction.js";
import { Utils } from "./Utils.js";

export const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  form: document.querySelector('.formulario'),
  
  getValues() {
    const signal = document.querySelector('.typeIncomes.incomes') !== null ? '' : '-';
    return {
      id: 0,
      description: Form.description.value,
      amount: signal + Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (description === '' || amount.trim() === '' || date === '') {
      throw new Error('Por favor, preencha todos os campos');
    }
  },

  formatValues() {
    let { id, description, amount, date } = Form.getValues();
    amount = Utils.realToDolar(amount);
    date = Utils.formatDate(date);
    id = Utils.generateId();
 
    return {
      id,
      description,
      amount,
      date,
    }
  },

  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },

  fields(value) {
    Form.description.value = value.description;
    if (value.amount < 0) {
      TypeTransaction.changeType('expenses', TypeTransaction.expenses);
      value.amount = String(value.amount).replace(/\D/g, '');
    }
    Form.amount.value = Utils.formatCurrency(value.amount);
    Form.date.value = Utils.formatDateForm(value.date);
  },
  
  submit(event) {
    event.preventDefault();
    try {
      const transaction = Form.formatValues();

      if(this.form.classList.contains('edit')){
        Transaction.all.forEach((element) => {
          if(element.id === Transaction.editId) {
            element.description = transaction.description;
            element.amount = transaction.amount;
            element.date = transaction.date;
          }
        })
        this.form.classList.remove('edit');
      } else {
        Form.validateFields();
        Transaction.add(transaction)
      }

      Form.clearFields();
      Modal.toggleModal();
      App.reload();

    } catch (error) {
      alert(error.message);
    }
  }
}

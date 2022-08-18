import { Order } from "./Order.js";
import { App } from "./App.js";
import { Form } from "./Form.js";
import { Modal } from "./Modal.js";
import { Storage } from "./Storage.js";

export const Transaction = {
  all: Storage.get(),
  editId: 0,

  add(transaction) {
    Transaction.all.push(transaction);
    Order.description()
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },

  edit(index) {
    Form.fields(Transaction.all[index]);
    Form.form.classList.add('edit');
    this.editId = Transaction.all[index].id;
    Modal.toggleModal();
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(function (transaction) {
      if (transaction.amount > 0) {
        income += Number(transaction.amount);
      }
    });
    return income.toFixed(2);
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach(function (transaction) {
      if (transaction.amount < 0) {
        expense += Number(transaction.amount);
      }
    });
    return expense.toFixed(2);
  },

  total() {
    return (+Transaction.incomes() + +Transaction.expenses()).toFixed(2);
  }
}
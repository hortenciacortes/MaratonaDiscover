import { Order } from "../Order.js";
import { App } from "./App.js";
import { DOM } from "./Dom.js";
import { Form } from "./Form.js";
import { Modal } from "./Modal.js";
import { Storage } from "./Storage.js";

let idEdit = 0;
let order = "crescent";

export const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);
    order = "crescent";
    Order.description()
    App.reload();
  },
  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },
  edit(index) {
    console.log(index)
    Form.fields(Transaction.all[index]);
    idEdit = Transaction.all[index].id;

    DOM.addTransaction(Transaction.all[index], Transaction.all[index].id)
    Transaction.remove(index);

    Modal.openClose();
  },
  incomes() {
    //somar as entradas
    let income = 0;
    Transaction.all.forEach(function (transaction) {
      if (transaction.amount > 0) {
        income += Number(transaction.amount);
      }
    });
    return income;
  },
  expenses() {
    //somar as saídas
    let expense = 0;
    Transaction.all.forEach(function (transaction) {
      if (transaction.amount < 0) {
        expense += Number(transaction.amount);
      }
    });
    return expense;
  },
  total() {
    //entradas - saídas
    return Transaction.incomes() + Transaction.expenses();
  }
}
import { Order } from "./Order.js";
import { App } from "./scripts/App.js";
import { Classes } from "./scripts/Classes.js";
import { Form } from "./scripts/Form.js";
import { Modal } from "./scripts/Modal.js";
import { Transaction } from "./scripts/Transaction.js";

feather.replace();

Modal.newTransaction.addEventListener('click', Modal.openClose);
Modal.btnCancel.addEventListener('click', Modal.openClose);

Order.thDescription.addEventListener('click', Order.description);
Order.thAmount.addEventListener('click', Order.amount);
Order.thDate.addEventListener('click', Order.date);

App.init();

document.querySelectorAll('.remove').forEach((item, index) => {
  item.addEventListener('click', () => Transaction.remove(index))
});

document.querySelectorAll('.edit').forEach((item, index) => {
  item.addEventListener('click', () => Transaction.edit(index))
});

document.querySelector('.confirm').addEventListener('click', Form.submit)


Classes.typeIncomes.addEventListener('click', Classes.activeIncomes);
Classes.typeExpenses.addEventListener('click', Classes.activeExpenses);

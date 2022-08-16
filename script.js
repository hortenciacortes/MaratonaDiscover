import { Order } from "./scripts/Order.js";
import { App } from "./scripts/App.js";
import { typeTransaction } from "./scripts/typeTransaction.js";
import { Form } from "./scripts/Form.js";
import { Modal } from "./scripts/Modal.js";
import { Transaction } from "./scripts/Transaction.js";
import { Utils } from "./scripts/Utils.js";

feather.replace();

/**
 * Formatting input with the value for Brazilian currency
 */
Form.amount.addEventListener('input', (event) => {
  event.target.value = Utils.formatCurrency(event.target.value);
})

/**
 * Toggle modal
 */
Modal.newTransaction.addEventListener('click', Modal.toggleModal);
Modal.overlay.addEventListener('click', Modal.handleModal);

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


/**
 * Change classes according to transaction type selected
 */
typeTransaction.incomes.addEventListener('click', () => typeTransaction.changeType('incomes', typeTransaction.incomes));
typeTransaction.expenses.addEventListener('click', () => typeTransaction.changeType('expenses', typeTransaction.expenses));
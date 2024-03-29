import { Order } from "./scripts/Order.js";
import { App } from "./scripts/App.js";
import { TypeTransaction } from "./scripts/TypeTransaction.js";
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

/**
 * Change classes according to transaction type selected
 */
 TypeTransaction.incomes.addEventListener('click', () => TypeTransaction.changeType('incomes', TypeTransaction.incomes));
 TypeTransaction.expenses.addEventListener('click', () => TypeTransaction.changeType('expenses', TypeTransaction.expenses));
 
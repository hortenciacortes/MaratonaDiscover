import { Transaction } from "./Transaction.js";
import { Utils } from "./Utils.js";
window.Transaction = Transaction;

export const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    let tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.setAttribute('id', index)
    tr.dataset.index = index
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'incomes' : 'expenses';
    const html = `
    <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${Utils.formatCurrency(transaction.amount)}</td>
    <td>${transaction.date}</td>
    <td>
    <a href="#" class="edit" onclick="Transaction.edit(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
    <a href="#" class="remove" onclick="Transaction.remove(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle expenses"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></a></td>
    `
    return html;
  },

  updateBalance() {
    document.querySelector('#incomes').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.querySelector('#expenses').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.querySelector('#total').innerHTML = Utils.formatCurrency(Transaction.total());
  },
  
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  }
}
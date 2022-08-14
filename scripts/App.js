import { DOM } from "./Dom.js";
import { Storage } from "./Storage.js";
import { Transaction } from "./Transaction.js";

export const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    Storage.set(Transaction.all);
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
}

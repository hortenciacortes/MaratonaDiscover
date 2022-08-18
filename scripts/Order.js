import { App } from "./App.js";
import { Transaction } from "./Transaction.js";

export const Order = {
  /** Variables that will call click function */
  thDescription: document.querySelector('#thDescription'),
  thAmount: document.querySelector('#thAmount'),
  thDate: document.querySelector('#thDate'),
  /** Change order */
  typeOrder: 'crescent',

  /**
   * Sort values ​​in ascending/descending order
   * @param aElement - element that will be changed to JavaScript code. (string)
   * @param bElement - element that will be changed to JavaScript code. (string)
   * 
   */
  sort(aElement, bElement) {
    if (Order.typeOrder === 'decreasing') {
      Transaction.all.sort(function (a, b) {
        Order.typeOrder = 'crescent';
        if (eval(aElement) > eval(bElement)) return -1;
        if (eval(aElement) < eval(bElement)) return 1;
        return 0;
      });
    } else if (Order.typeOrder === 'crescent') {
      Transaction.all.sort(function (a, b) {
        Order.typeOrder = 'decreasing';
        if (eval(aElement) < eval(bElement)) return -1;
        if (eval(aElement) > eval(bElement)) return 1;
        return 0;
      });
    }
    App.reload();
  },

  description() {
    /** All letters must be lowercase, as the sort function differentiates */
    Order.sort('a.description.toLowerCase()', 'b.description.toLowerCase()');
  },

  amount() {
    Order.sort('+a.amount', '+b.amount');
  },

  date() {
    Order.sort('a.date', 'b.date');
  },
}
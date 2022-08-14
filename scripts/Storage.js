
export const Storage = {
  //LocalStorage do navegador
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:")) || [];
  },
  set(transactions) {
    localStorage.setItem("dev.finances:", JSON.stringify(transactions))
  },
  setUp(transaction, index) {
    localStorage.setItem("dev.finances:", JSON.stringify(transaction, index));
  }
}
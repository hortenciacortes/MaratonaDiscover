import { App } from "./App.js"

export const Modal = {
  //Variáveis que irão chamar as funções de click
  newTransaction: document.querySelector('#new-transaction'),
  btnCancel: document.querySelector('.cancel'),

  //Função para abrir e fechar o modal
  openClose() {
    document.querySelector('.modal-overlay').classList.toggle('active')
    App.reload()
  },
}
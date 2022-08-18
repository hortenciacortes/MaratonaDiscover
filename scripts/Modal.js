import { Form } from "./Form.js"

export const Modal = {
  /** Variables that will call click function */
  newTransaction: document.querySelector('#new-transaction'),
  overlay: document.querySelector('.modal-overlay'),

  toggleModal() {
    document.querySelector('.modal-overlay').classList.toggle('active')
  },
  
  /**
   * Handle with modal
   * if click on the confirm button then the submit form function is called
   * if click on the cancel or in modal overlay then the toggle modal function is called
   */
  handleModal(event) {
    if (event.target.classList.value === 'confirm') {
      Form.submit(event)
    } else if (event.target.parentElement === this || event.target.classList.value === 'cancel') {
      Modal.toggleModal()
    }
  }
}
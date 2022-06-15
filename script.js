feather.replace();

//Sinal do tipo de operação selecionada no modal (incomes(+)/expenses(-))
//para adicionar o valor negativo caso seja um valor de saída 
let signal = "";
//Variável para mudar a ordem (crescente e decrescente) da visualização das transações
let order = 'crescent';

let id = 0;
let idEdit = 0;
const Modal = {
  //Variáveis que irão chamar as funções de click
  newTransaction: document.querySelector('#new-transaction'),
  btnCancel: document.querySelector('.cancel'),

  //Função para abrir e fechar o modal
  openClose() {
    document.querySelector('.modal-overlay').classList.toggle('active')
    App.reload()
  },
}

const Classes = {
  //Variáveis que irão chamar as funções de click
  typeExpenses: document.querySelector('.typeExpenses'),
  typeIncomes: document.querySelector('.typeIncomes'),

  //Função para ativar as classes e mudar as cores de acordo com o tipo de transação
  activeIncomes() {
    //Ativando as cores verdes para as entradas - label e input's
    document.querySelector('.typeIncomes').classList.add('green');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('incomes-bg');
      //Remove a cor vermelha do input
      input.classList.remove('expenses-bg');
    });
    //Recebe o sinal vazio que significa que o valor é positivo(incomes)
    signal = "";
    //Remove a cor vermelha do label
    document.querySelector('.typeExpenses').classList.remove('red')
  },
  activeExpenses() {
    //Ativando as cores vermelhas para as saídas - label e input's
    document.querySelector('.typeExpenses').classList.add('red');
    document.querySelectorAll('.input').forEach(function (input) {
      input.classList.add('expenses-bg');
      //Remove a cor verde do input
      input.classList.remove('incomes-bg');
    });
    //Recebe o sinal (-) que significa que o valor é negativo(expenses)
    signal = "-";
    //Remove a cor verde do label
    document.querySelector('.typeIncomes').classList.remove('green')
  },
}

const Order = {
  //Variáveis que irão chamar as funções de click
  thDescription: document.querySelector('#thDescription'),
  thAmount: document.querySelector('#thAmount'),
  thDate: document.querySelector('#thDate'),


  origin() {
    if (order === 'decreasing') {
      Transaction.all.sort(function (a, b) {
        //Mudando o valor de decrescente para crescente. 
        //Caso selecionado novamente entra na outra função fazendo o contrário
        order = 'crescent';
        //Necessário que todas as letras sejam minusculas, pois a função sort diferencia
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
    } else if (order === 'crescent') {
      Transaction.all.sort(function (a, b) {
        order = 'decreasing';

        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    }
    //Atualizando a aplicação para mostrar a ordem desejada
    App.reload();
  },

  //Função para orderar o array de transações de forma crescente e decrescente
  description() {
    //Se a order estiver decrescente -> percorrerá o array de transações 
    //utilizando a função sort para organizar em forma decrescente
    if (order === 'decreasing') {
      Transaction.all.sort(function (a, b) {
        //Mudando o valor de decrescente para crescente. 
        //Caso selecionado novamente entra na outra função fazendo o contrário
        order = 'crescent';
        //Necessário que todas as letras sejam minusculas, pois a função sort diferencia
        if (a.description.toLowerCase() > b.description.toLowerCase()) return -1;
        if (a.description.toLowerCase() < b.description.toLowerCase()) return 1;
        return 0;
      });
    } else if (order === 'crescent') {
      Transaction.all.sort(function (a, b) {
        order = 'decreasing';

        if (a.description.toLowerCase() < b.description.toLowerCase()) return -1;
        if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
        return 0;
      });
    }
    //Atualizando a aplicação para mostrar a ordem desejada
    App.reload();
  },
  amount() {
    if (order === 'decreasing') {
      Transaction.all.sort(function (a, b) {
        order = 'crescent';

        if (a.amount > b.amount) return -1;
        if (a.amount < b.amount) return 1;
        return 0;
      });
    } else if (order === 'crescent') {
      Transaction.all.sort(function (a, b) {
        order = 'decreasing';

        if (a.amount < b.amount) return -1;
        if (a.amount > b.amount) return 1;
        return 0;
      });
    }
    App.reload();
  },
  date() {
    if (order === 'decreasing') {
      Transaction.all.sort(function (a, b) {
        order = 'crescent';
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    } else if (order === 'crescent') {
      Transaction.all.sort(function (a, b) {
        order = 'decreasing';

        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    }
    App.reload();
  },
}

const Storage = {
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

const Transaction = {
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

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    let tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.setAttribute('id', index)
    tr.dataset.index = index
    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "green" : "red";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
    <td class="oi">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td>${transaction.date}</td>
    <td>
    <a href="#" onclick="Transaction.edit(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a>
    <a href="#" onclick="Transaction.remove(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle red"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></a></td>
    `
    return html;
  },
  updateBalance() {
    document.querySelector("#incomes").innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.querySelector("#expenses").innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.querySelector("#total").innerHTML = Utils.formatCurrency(Transaction.total());
  },
  clearTransactions() {
    id = 0;
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return Math.round(value);
  },
  //Formatando o valor para retornar para o input
  formatAmountForm(value) {
    value = Number(value) / 100;
    return Math.round(value);
  },
  //Formatando a data do formato type="date" para o formato utilizado no BR
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
  //Formatando a data para o formato do type="date"
  formatDateForm(date) {
    const splittedDate = date.split("/");
    return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`
  },
  formatCurrency(value) {
    const signal = Number(value) > 0 ? "" : "-";
    value = String(value).replace(/\D/g, "");
    value = value / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value;
  }
}
const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      description: Form.description.value,
      amount: signal + Form.amount.value,
      date: Form.date.value,
    }
  },
  validateFields() {
    const { description, amount, date } = Form.getValues();
    if (description === "" || amount.trim() === "" || date === "") {
      throw new Error('Por favor, preencha todos os campos');
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    if (idEdit !== 0) {
      id = idEdit;
    } else {
      id = Transaction.all.length + 1;
    }
    return {
      id,
      description,
      amount,
      date,
    }
  },
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },
  fields(value) {
    Form.description.value = value.description;
    if (value.amount < 0) {
      Classes.activeExpenses();
      value.amount = String(value.amount).replace(/\D/g, "");
    }
    Form.amount.value = Utils.formatAmountForm(value.amount);
    Form.date.value = Utils.formatDateForm(value.date);
  },
  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction)
      Form.clearFields();
      Modal.openClose();
      App.reload();

    } catch (error) {
      alert(error.message);
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    Storage.set(Transaction.all)
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
}

Modal.newTransaction.addEventListener('click', Modal.openClose);
Modal.btnCancel.addEventListener('click', Modal.openClose);

Order.thDescription.addEventListener('click', Order.description);
Order.thAmount.addEventListener('click', Order.amount);
Order.thDate.addEventListener('click', Order.date);

Classes.typeIncomes.addEventListener('click', Classes.activeIncomes);
Classes.typeExpenses.addEventListener('click', Classes.activeExpenses);

App.init();

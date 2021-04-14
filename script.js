/* DADOS
[
        {
            description: 'Luz',
            amount: -50001,
            date: '23/01/2021'
        },
        {
            description: 'WebSite',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20012,
            date: '23/01/2021'
        },
        {
            description: 'App',
            amount: 200000,
            date: '23/01/2021'
        },
    ],
*/

//Abrir e fechar o modal(formulário)
const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active');  
        //Adicionar a class hidden para esconder o footer, pois estava sobrepondo o modal
        document.querySelector('footer').classList.add('hidden');   
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active');
        //Remover a class hidden para voltar a aparecer o footer
        document.querySelector('footer').classList.remove('hidden');
    },
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
    },

    set(transactions){
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
    }
}

const Transaction = {
    all: Storage.get(),
    
    add(transaction){
        Transaction.all.push(transaction);
        
        App.reload();
    },

    remove(index){
        Transaction.all.splice(index, 1);
        App.reload();
    },

    incomes(){
        let income = 0;
        //pegar todas as transações
        //para cada transação:
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if(transaction.amount > 0){
                //somar a uma variável e retornar a variável
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses(){
        let expense = 0;
        //pegar todas as transações
        //para cada transação:
        Transaction.all.forEach(transaction => {
            //se ela for maior que zero
            if(transaction.amount < 0){
                //somar a uma variável e retornar a variável
                expense += transaction.amount;
            }
        })
        return expense;
    },
    
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td class="delete">
                <a href="#">
                    <img onclick="Transaction.remove(${index})" src="./img/delete.png" alt="Remover transação">
                </a>
            </td>
        `
        return html;
    },

    updateBalance(){
        document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
        document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
        document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatAmount(value){
        // value = Number(value.replace(/\,?\.?/g, "")) * 100;
        value = value * 100;
        return Math.round(value);
    },

    formatDate(date){
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        return signal + value;
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields(){
        const {description, amount, date} = Form.getValues();
        
        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Preencha todos os campos");
        }
    },

    formatValues(){
        let {description, amount, date} = Form.getValues();
        
        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);
        
        return {
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";
    },

    submit(event){
        event.preventDefault();

        try{
            Form.validateFields();
            const transaction = Form.formatValues();
            //salvar
            Transaction.add(transaction);
            //apagar os dados do formulário
            Form.clearFields();
            //fechar aplicação
            Modal.close();
        } catch(error){
            alert(error.message);
        }
    }
}

const App = {
    init(){
        Transaction.all.forEach((transaction, index) =>{
            DOM.addTransaction(transaction, index);
        });

        DOM.updateBalance();

        Storage.set(Transaction.all);

    },
    reload(){
        DOM.clearTransactions();
        App.init();
    },
}

App.init();


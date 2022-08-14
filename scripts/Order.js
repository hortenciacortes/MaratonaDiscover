import { App } from "./App.js";
import { Transaction } from "./Transaction.js";

//Variável para mudar a ordem (crescente e decrescente) da visualização das transações
let order = 'crescent';

export const Order = {
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
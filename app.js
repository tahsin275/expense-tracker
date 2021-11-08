const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTrans = [
    {id: 1, text: 'Salary', amount: 1200},
    {id: 2, text: 'T-Shirt', amount: -10},
    {id: 3, text: 'Camera', amount: -350},
    {id: 4, text: 'Sunglass', amount: -50}
];

let transactions = dummyTrans;

//Add transaction from user input
function addTransaction(e){
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please add text and amount");
    }
    else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addToDom(transaction);
        updateBalance();
        text.value = '';
        amount.value = '';
    }   
}

//Generate random ID
function generateId(){
    return Math.floor(Math.random()*100000000);
}

//Remove Item
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

//Add transaction to DOM
function addToDom(transaction){
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    //creating a list item
    const item = document.createElement('li');
    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    //adding inner html
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}.</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`
    //appending to the parent
    list.appendChild(item);
}

//Update balance
function updateBalance(){
    const amounts = transactions.map(transaction => transaction.amount);
    //calculate total balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //calculate income
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    //calculate expense
    const expense = Math.abs(amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2));
    //Update the DOM
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


//Initialize app
function init(){
    list.innerHTML = '';
    transactions.forEach(addToDom);
    updateBalance();
}

init();

form.addEventListener('submit', addTransaction);
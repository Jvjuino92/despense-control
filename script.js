const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransations = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions')  !== null ? localStorageTransations : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionsIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
            <span>${operator} $ ${amountWithoutOperator}</span>
            <button class="delete-btn" onClick="removeTransaction(${id})">X</button>
    `
    transactionsUl.prepend(li)
}

const getExpenses = transactionsAmount => Math.abs(transactionsAmount
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmount => transactionsAmount
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmount => transactionsAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(({ amount }) => amount)

    const total = getTotal(transactionsAmount)

    const income = getIncome(transactionsAmount)

    const expense = getExpenses(transactionsAmount)

    balanceDisplay.textContent = `$ ${total}`    
    incomeDisplay.textContent = `$ ${income}`    
    expenseDisplay.textContent = `$ ${expense}`    
}

const init = () => {
    transactionsUl.innerHTML = ''

    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if (isSomeInputEmpty) {
        alert('Please fill up both the name and amount fields!')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)

// 22:25
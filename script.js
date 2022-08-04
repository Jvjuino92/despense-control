const transactionsUl = document.querySelector('#transactions')

const dummyTransactions = [
    { id: 1, name: 'Chocalate cake', amount: -20 },
    { id: 2, name: 'Red Guard Uniform & Equipment', amount: -250 },
    { id: 3, name: 'Gracie Barra Ki', amount: -100 },
    { id: 4, name: '27th Regiment Weekly Pay Check', amount: 750 }
]

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} $ ${amountWithoutOperator}</span><button class="delete-btn">X</button>
    `
    transactionsUl.prepend(li)
}

const updateBalanceValues = () => {
    const transactionsAmount = dummyTransactions.map(transaction => transaction.amount)
    console.log(transactionsAmount);
}

const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

// 22:25
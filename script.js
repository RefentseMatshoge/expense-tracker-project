const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function displayExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <strong>${expense.description}</strong><br>
            Category: ${expense.category}<br>
            Amount: R${expense.amount.toFixed(2)}
            <br><br>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;

        expenseList.appendChild(listItem);
    });

    totalDisplay.textContent = total.toFixed(2);
}

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    const newExpense = {
        description: description,
        amount: amount,
        category: category
    };

    expenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    expenseForm.reset();

    displayExpenses();
});

function deleteExpense(index) {
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}

displayExpenses();

let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (amount === "" || category === "") {
        alert("Please fill all fields");
        return;
    }

    let transaction = {
        id: Date.now(),
        amount: Number(amount),
        type: type,
        category: category
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    filterTransactions();
    updateBalance();
}
function displayTransactions(){
    let list = document.getElementById("list");
    list.innerHTML = "";

    transactions.forEach(t => {
        let li = document.createElement("li");
        li.innerHTML = `${t.type} - $${t.amount} (${t.category}) 
        <button onclick="deleteTransaction(${t.id})">Delete</button>`;
        list.appendChild(li);
    });
}
function updateBalance() {
    let balance = 0;

    transactions.forEach(t => {
        if (t.type === "income") {
            balance += t.amount;
        } else {
            balance -= t.amount;
        }
    });

    document.getElementById("balance").innerText = balance;
}
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    filterTransactions();
    updateBalance();
}
function filterTransactions() {
    let filterElement = document.getElementById("filter");
    let filter = filterElement ? filterElement.value : "all";

    let list = document.getElementById("list");
    list.innerHTML = "";

    let filtered = transactions;

    if (filter !== "all") {
        filtered = transactions.filter(t => t.type === filter);
    }

    filtered.forEach(t => {
        let li = document.createElement("li");
        li.innerHTML = `${t.type} - $${t.amount} (${t.category}) 
        <button onclick="deleteTransaction(${t.id})">Delete</button>`;
        list.appendChild(li);
    });
}

// Load data when page opens
filterTransactions();
updateBalance();
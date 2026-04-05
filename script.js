// GLOBAL STATE
let state = {
  role: "viewer",
  transactions: [
    { date: "2026-04-01", amount: 150000, category: "Salary", type: "income" },
    { date: "2026-04-02", amount: 9000, category: "Food", type: "expense" },
    { date: "2026-04-03", amount: 12000, category: "Shopping", type: "expense" }
  ],
  filter: "all",
  search: ""
};

// EVENT LISTENERS

Chart.defaults.color = "#000"; // default light mode
document.getElementById("darkModeBtn").onclick = () => {
  document.body.classList.toggle("dark");

    Chart.defaults.color = document.body.classList.contains("dark")
    ? "#ffffff"
    : "#000000";

  renderCharts();
};
  

document.getElementById("role").addEventListener("change", (e) => {
  state.role = e.target.value;
  render();
});

document.getElementById("filter").addEventListener("change", (e) => {
  state.filter = e.target.value;
  renderTransactions();
});

document.getElementById("search").addEventListener("input", (e) => {
  state.search = e.target.value;
  renderTransactions();
});

// RENDER ALL
function render() {
  renderCards();
  renderTransactions();
  renderInsights();
  renderRoleUI();
  renderCharts();
}

// DASHBOARD CARDS
function renderCards() {
  let income = 0;
  let expense = 0;

  state.transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  const balance = income - expense;

  document.getElementById("cards").innerHTML = `
    <div class="card">Balance: ₹${balance}</div>
    <div class="card">Income: ₹${income}</div>
    <div class="card">Expense: ₹${expense}</div>
  `;
}

// TRANSACTIONS
function renderTransactions() {
  let data = state.transactions;

  if (state.filter !== "all") {
    data = data.filter(t => t.type === state.filter);
  }

  if (state.search) {
    data = data.filter(t =>
      t.category.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  document.getElementById("transactions").innerHTML =
  `
  <div class="row header">
    <span>Date</span>
    <span>Category</span>
    <span>Amount</span>
  </div>
  ` +
  data.map(t => `
    <div class="row">
      <span>${t.date}</span>
      <span>${t.category}</span>
      <span>₹${t.amount}</span>
    </div>
  `).join("");
}

// ROLE UI
function renderRoleUI() {
  const btn = document.getElementById("addBtn");
  document.getElementById("addBtn").addEventListener("click", () => {
  alert("This is a demo transaction feature");
});
  btn.style.display = state.role === "admin" ? "inline-block" : "none";
}

// INSIGHTS
function renderInsights() {
  let categories = {};

  state.transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  let highest = Object.keys(categories).reduce((a, b) =>
    categories[a] > categories[b] ? a : b
  );

  document.getElementById("insights").innerHTML = `
    <h3>Insights</h3>
    <p>Highest spending category: ${highest}</p>
  `;
}

// CHARTS
let lineChart, pieChart;
function renderCharts() {
  const ctx1 = document.getElementById("lineChart");
  const ctx2 = document.getElementById("pieChart");

  const isDark = document.body.classList.contains("dark");
  const textColor = isDark ? "#ffffff" : "#000000";
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  const amounts = state.transactions.map(t => t.amount);
  const categories = state.transactions.map(t => t.category);

  // ✅ destroy old charts (VERY IMPORTANT)
  if (lineChart) lineChart.destroy();
  if (pieChart) pieChart.destroy();

  // ✅ LINE CHART
  lineChart = new Chart(ctx1, {
    type: "line",
    data: {
      labels: categories,
      datasets: [{
        data: amounts,
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 20,
              weight: 'bold'
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            font: {
              size: 18,
              weight: 'bold'
            }

          },
          grid: {
            color: gridColor
            
          }
        },
        y: {
          ticks: {
            color: textColor,
            font: {
              size: 17,
              weight: 'bold'
            }
          },
          grid: {
            color: gridColor
          }
        }
      }
    }
  });

  // ✅ PIE CHART
  pieChart = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [{
        data: amounts
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        }
      }
    }
  });
}
// INITIAL LOAD
render();

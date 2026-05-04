let barChart;
let pieChart;

function calculateBusiness() {
    let investment = parseFloat(document.getElementById("investment").value);
    let expense = parseFloat(document.getElementById("expense").value);
    let revenue = parseFloat(document.getElementById("revenue").value);

    let totalCost = investment + expense;
    let monthlyProfit = revenue - totalCost;
    let yearlyProfit = monthlyProfit * 12;

    document.getElementById("monthlyProfit").innerHTML =
        `Monthly Profit/Loss: ₹${monthlyProfit}`;

    let statusElement = document.getElementById("monthlyStatus");

    if(monthlyProfit > 0){
        statusElement.innerHTML = "✅ PROFIT";
        statusElement.style.color = "lime";
    } else if(monthlyProfit < 0){
        statusElement.innerHTML = "❌ LOSS";
        statusElement.style.color = "red";
    } else {
        statusElement.innerHTML = "⚖ BREAK EVEN";
        statusElement.style.color = "yellow";
    }

    // restart animation every click
    statusElement.classList.remove("animate-alert");
    void statusElement.offsetWidth;
    statusElement.classList.add("animate-alert");

    document.getElementById("yearProfit").innerHTML =
        `Yearly Profit/Loss: ₹${yearlyProfit}`;

    updateCharts(investment, expense, revenue, monthlyProfit);
}

function updateCharts(investment, expense, revenue, profit){
    if(barChart) barChart.destroy();
    if(pieChart) pieChart.destroy();

    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Investment', 'Expense', 'Revenue', 'Profit'],
            datasets: [{
                data: [investment, expense, revenue, profit],
                backgroundColor: ['blue', 'red', 'green', 'orange']
            }]
        }
    });

    pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: ['Investment', 'Expense', 'Revenue'],
            datasets: [{
                data: [investment, expense, revenue],
                backgroundColor: ['blue', 'red', 'green']
            }]
        }
    });
}
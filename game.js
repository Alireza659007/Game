let crashMultiplier = 1.00;
let gameInterval;
let isBetting = false;
let hasCashedOut = false;
let userBalance = loadBalance();
let userName = "کاربر";

const ctx = document.getElementById('crashChart').getContext('2d');
let chart;
let dataPoints = [];

function updateDisplay() {
  document.getElementById("crash-display").textContent = `x${crashMultiplier.toFixed(2)}`;
  document.getElementById("user-balance").textContent = userBalance;
}

function startGame() {
  crashMultiplier = 1.00;
  updateDisplay();
  let crashPoint = Math.random() * 10 + 1.5;
  hasCashedOut = false;
  dataPoints = [];

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'ضریب',
        data: [],
        borderColor: 'gold',
        borderWidth: 2,
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      animation: false,
      scales: {
        x: { display: false },
        y: { beginAtZero: true }
      }
    }
  });

  gameInterval = setInterval(() => {
    crashMultiplier += 0.05 + crashMultiplier / 30;
    updateDisplay();

    chart.data.labels.push('');
    chart.data.datasets[0].data.push(crashMultiplier.toFixed(2));
    chart.update();

    if (crashMultiplier >= crashPoint) {
      endGame(false);
    }
  }, 100);
}

function placeBet() {
  if (isBetting) return;

  let amount = parseInt(document.getElementById("bet-amount").value);
  if (!amount || amount <= 0 || amount > userBalance) return alert("مبلغ نامعتبر است!");

  crashMultiplier = 1.00;
  userBalance -= amount;
  saveBalance(userBalance);
  isBetting = true;
  hasCashedOut = false;
  document.getElementById("bet-btn").disabled = true;
  document.getElementById("cashout-btn").disabled = false;

  startGame();
}

function cashOut() {
  if (!isBetting || hasCashedOut) return;

  let amount = parseInt(document.getElementById("bet-amount").value);
  let win = Math.floor(amount * crashMultiplier);
  userBalance += win;
  saveBalance(userBalance);
  hasCashedOut = true;

  endGame(true, amount, crashMultiplier, win);
}

function endGame(success, amount = null, multiplier = null, win = 0) {
  clearInterval(gameInterval);
  isBetting = false;
  document.getElementById("bet-btn").disabled = false;
  document.getElementById("cashout-btn").disabled = true;

  if (!hasCashedOut && amount !== null) {
    addToHistory(userName, amount, crashMultiplier, "باخت");
  } else if (amount !== null) {
    addToHistory(userName, amount, multiplier, `برد ${win}`);
  }

  updateDisplay();
}

function addToHistory(name, amount, multiplier, result) {
  let row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${amount}</td><td>x${multiplier.toFixed(2)}</td><td>${result}</td>`;
  document.getElementById("history-body").prepend(row);
}

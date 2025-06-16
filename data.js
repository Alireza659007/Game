function saveBalance(balance) {
  localStorage.setItem("balance", balance);
}

function loadBalance() {
  let b = localStorage.getItem("balance");
  if (!b) {
    localStorage.setItem("balance", 10000);
    return 10000;
  }
  return parseInt(b);
}

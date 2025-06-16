function showAdmin() {
  document.getElementById("admin-panel").style.display = "block";
}

function loginAdmin() {
  const pass = document.getElementById("admin-password").value;
  if (pass === "Alireza1313907") {
    document.getElementById("admin-controls").style.display = "block";
  } else {
    alert("رمز اشتباه است.");
  }
}

function chargeUser() {
  let amount = parseInt(document.getElementById("amount").value);
  if (isNaN(amount)) return alert("عدد وارد کن");

  userBalance += amount;
  saveBalance(userBalance);
  updateDisplay();
}

function deleteUser() {
  localStorage.removeItem("balance");
  userBalance = 0;
  updateDisplay();
}

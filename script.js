let currentData = [];

async function loadData() {
  const response = await fetch("data.json?nocache=" + Date.now());
  currentData = await response.json();
  currentData.sort((a, b) => b.points - a.points);
  renderTable(currentData);
}

function renderTable(data) {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = ""; // Clear previous rows

  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    const positionCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const pointsCell = document.createElement("td");

    positionCell.textContent = index + 1;
    nameCell.textContent = entry.name;
    pointsCell.textContent = entry.points;

    row.appendChild(positionCell);
    row.appendChild(nameCell);
    row.appendChild(pointsCell);
    tbody.appendChild(row);
  });
}

loadData();

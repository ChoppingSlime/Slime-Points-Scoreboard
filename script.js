async function loadData() {
  const response = await fetch("data.json?nocache=" + Date.now());
  const data = await response.json();
  const tbody = document.getElementById("table-body");

  data.sort((a, b) => b.points - a.points);

  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    const positionCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const pointsCell = document.createElement("td");

    positionCell.textContent = index + 1; // Rank starts at 1
    nameCell.textContent = entry.name;
    pointsCell.textContent = entry.points;

    row.appendChild(positionCell);
    row.appendChild(nameCell);
    row.appendChild(pointsCell);
    tbody.appendChild(row);
  });
}

let sortAsc = true;
function sortTable(columnIndex) {
  const table = document.getElementById("scoreboard");
  const rows = Array.from(table.rows).slice(1);
  const compare = (a, b) => {
    const valA = a.cells[columnIndex].textContent;
    const valB = b.cells[columnIndex].textContent;
    if (columnIndex === 1) return sortAsc ? valA - valB : valB - valA;
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  };
  rows.sort(compare);
  rows.forEach(row => table.appendChild(row));
  sortAsc = !sortAsc;
}

loadData();

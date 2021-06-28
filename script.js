/**
 * method which loads all countries from api to table on page
 */
function loadCountries() {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((response) => response.json())
    .then((data) => {
      let table = document.getElementById('table');
      let tblBody = document.createElement('tbody');

      for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');

        let allData = {
          name: data[i].name,
          currency: data[i].currencies[0].name + ` (${data[i].currencies[0].code}) `,
          language: data[i].languages[0].name,
          population: data[i].population,
          area: data[i].area,
        };

        for (let prop in allData) {
          let cell = document.createElement('td');
          let cellText = document.createTextNode(allData[prop]);

          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        let image = `<img src='${data[i].flag}' id="flag"/>`;
        let cell2 = document.createElement('td');

        cell2.innerHTML = image;
        row.appendChild(cell2);

        tblBody.appendChild(row);
      }
      table.appendChild(tblBody);
    });
}

/**
 *  function to sort a table for columns : country, currency, language in both directions alphabetically
 * */

function sortTable(n) {
  let table;
  table = document.getElementById('table');
  let i,
    x,
    y,
    count = 0;
  let switching = true;

  // Order is set as ascending
  let direction = 'ascending';
  let Switch;
  // Run loop until no switching is needed
  while (switching) {
    switching = false;
    let rows = table.rows;

    //Loop to go through all rows
    for (i = 1; i < rows.length - 1; i++) {
      Switch = false;

      // Fetch 2 elements that need to be compared
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      // Check the direction of order
      if (direction == 'ascending') {
        // Check if 2 rows need to be switched
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If yes, mark Switch as needed and break loop
          Switch = true;
          break;
        }
      } else if (direction == 'descending') {
        // Check direction
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If yes, mark Switch as needed and break loop
          Switch = true;
          break;
        }
      }
    }
    if (Switch) {
      // Function to switch rows and mark switch as completed
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      // Increase count for each switch
      count++;
    } else {
      // Run while loop again for descending order
      if (count == 0 && direction == 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}

// function for sorting population and area numerically

function sortTableNumbers(n) {
  let table;
  table = document.getElementById('table');
  let i,
    x,
    y,
    count = 0;
  let switching = true;
  let Switch;
  // Order is set as ascending
  let direction = 'ascending';

  // Run loop until no switching is needed
  while (switching) {
    switching = false;
    let rows = table.rows;

    //Loop to go through all rows
    for (i = 1; i < rows.length - 1; i++) {
      Switch = false;

      // Fetch 2 elements that need to be compared
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];

      // Check the direction of order
      if (direction == 'ascending') {
        // Check if 2 rows need to be switched
        if (x.innerHTML == 'null') {
          x.innerHTML = 0;
        }
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          // If yes, mark Switch as needed and break loop
          Switch = true;
          break;
        }
      } else if (direction == 'descending') {
        // Check direction
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          // If yes, mark Switch as needed and break loop
          Switch = true;
          break;
        }
      }
    }
    if (Switch) {
      // Function to switch rows and mark switch as completed

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      // Increase count for each switch
      count++;
    } else {
      // Run while loop again for descending order
      if (count == 0 && direction == 'ascending') {
        direction = 'descending';
        switching = true;
      }
    }
  }
}

/**
 * method which allows to search items through table
 */
function searchTable() {
  var input, filter, found, table, tr, td, i, j;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td');
    for (j = 0; j < td.length - 1; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[0].style.display = '';
      tr[i].style.display = '';
      found = false;
    } else {
      tr[0].style.display = '';
      tr[i].style.display = 'none';
    }
  }
}

/**
 * method for min max range population searching
 * it makes that max value cannot be less than min value
 */
function maxPopulation() {
  let minInput = document.getElementById('quantity');
  let maxInput = document.getElementById('quantity2');
  let min = minInput.value;

  maxInput.disabled = false;
  let max = Number(min) + 1;
  if (minInput.value == '') {
    maxInput.value = '';
  } else {
    maxInput.value = max;
    maxInput.min = max;
  }
}

/**
 * method search and showing countries with population in given range
 */
function searchPopulation() {
  let minInput = document.getElementById('quantity');
  let maxInput = document.getElementById('quantity2');
  let min = minInput.value;
  let max = maxInput.value;
  table = document.getElementById('table');
  tr = table.getElementsByTagName('tr');

  let rows = table.rows;
  for (i = 1; i < rows.length; i++) {
    x = rows[i].getElementsByTagName('TD')[3];

    if (Number(x.innerHTML) >= min && Number(x.innerHTML) <= max && min != '' && max != '') {
      tr[0].style.display = '';
      rows[i].style.display = '';
    } else {
      tr[0].style.display = '';
      rows[i].style.display = 'none';
    }
  }
}

/**
 * method resets searching and showing all data again
 */
function reset() {
  let minInput = document.getElementById('quantity');
  let maxInput = document.getElementById('quantity2');
  minInput.value = '';
  maxInput.value = '';
  maxInput.disabled = true;

  loadCountries();
}

/**
 * method opens dashboard page in new tab when clicking on Show statistics button
 */
function openPage() {
  window.open('./dashboard/dashboard.html');
}

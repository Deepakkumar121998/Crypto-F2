const gridTab = document.getElementById('gridTab');
const listTab = document.getElementById('listTab');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

// Fetch data from the API
function fetchData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayGridView(data);
      displayListView(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Display data in Grid View
function displayGridView(data) {
  gridView.innerHTML = ''; // Clear previous content

  data.forEach(crypto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${crypto.image}" alt="${crypto.name}" />
      <h3>${crypto.name}</h3>
      <p>Price: $${crypto.current_price}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
      <p>24h Change: ${crypto.price_change_percentage_24h}%</p>
    `;
    gridView.appendChild(card);
  });
}

// Display data in List View
function displayListView(data) {
  listView.innerHTML = ''; // Clear previous content

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    
  `;
  table.appendChild(headerRow);

  data.forEach(crypto => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <img src="${crypto.image}" alt="${crypto.name}" />
      <td>${crypto.name}</td>
      <td>$${crypto.current_price}</td>
      <td>$${crypto.market_cap}</td>
      <td>${crypto.price_change_percentage_24h}%</td>
    `;
    table.appendChild(row);
  });

  listView.appendChild(table);
}

// Event listeners for tab interaction
gridTab.addEventListener('click', showGridView);
listTab.addEventListener('click', showListView);

// Switch to Grid View
function showGridView() {
  gridView.style.display = 'block';
  listView.style.display = 'none';
  gridTab.classList.add('active');
  listTab.classList.remove('active');
}

// Switch to List View
function showListView() {
  gridView.style.display = 'none';
  listView.style.display = 'block';
  gridTab.classList.remove('active');
  listTab.classList.add('active');
}

// Fetch data on page load
fetchData();

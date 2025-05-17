const apiKey = 'UDGkxXPOne82TIEZdZ71ZFmowTfbxRpH';

async function fetchStockData(ticker, days) {

  if (!document.getElementById('stockInput').checkValidity()) {
    document.getElementById('stockInput').reportValidity();
    return;
  }
    
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
  const from = start.toISOString().split('T')[0];
  const to = end.toISOString().split('T')[0];
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      alert("No stock data found for this ticker.");
      return;
    }

    const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
    const prices = data.results.map(d => d.c);

    renderChart(labels, prices, ticker);
  } catch (err) {
    alert("Error fetching stock data.");
    console.error(err);
  }
}

function renderChart(labels, prices, ticker) {
  let ctx = document.getElementById('priceChart');
  
  if (!ctx) {
    ctx = document.createElement('ctx');
    ctx.id = 'priceChart';

  }
  if (window.priceChartRender) window.priceChartRender.destroy();
  window.priceChartRender = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: prices,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.2
      }]
    }
  });
}

document.getElementById('lookupButton').addEventListener('click', () => {
  const ticker = document.getElementById('stockInput').value.toUpperCase();
  const days = parseInt(document.getElementById('dayRange').value);
  if (ticker) fetchStockData(ticker, days);
});

async function loadRedditStocks() {
  const url = 'https://tradestie.com/api/v1/apps/reddit?date=2022-04-03';
  const res = await fetch(url);
  const data = await res.json();
  const top5 = data.slice(0, 5);
  const tbody = document.querySelector('#redditTable tbody');

  top5.forEach(stock => {
    const tr = document.createElement('tr');
    const link = `<a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a>`;
    const iconUrl = stock.sentiment === 'Bullish'
      ? 'https://img.freepik.com/free-vector/isolated-red-arrow-going-up_1308-111773.jpg?semt=ais_hybrid&w=740' 
      : 'https://t3.ftcdn.net/jpg/13/00/66/52/360_F_1300665299_KENyfnGyJkf9bxkOLf227p2sWEpOV2IF.jpg';

      const icon = `<img src="${iconUrl}" alt="${stock.sentiment}" style="width: 40px; height: auto;">`;
    tr.innerHTML = `
      <td>${link}</td>
      <td>${stock.no_of_comments}</td>
      <td style="font-size: 24px;">${icon}</td>
    `;
    tbody.appendChild(tr);
  });
}

loadRedditStocks();
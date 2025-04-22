// Pridaj event listener na vyhľadávacie tlačidlo
document.getElementById('search-button').addEventListener('click', function () {
  const inputAddress = document.getElementById('search-input').value.trim().toLowerCase();
  const resultDisplay = document.getElementById('result-display');
  const noAddressMsg = document.getElementById('no-address');
  const availableTechElem = document.getElementById('available-technologies'); // Keep this for no results message

  // Clear previous results and hide messages
  resultDisplay.innerHTML = ''; // Clear previous results
  resultDisplay.classList.add('hidden');
  noAddressMsg.classList.add('hidden');


  if (!inputAddress) {
    noAddressMsg.classList.remove('hidden');
    return;
  }

  // Načítaj dáta z JSON súboru
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Nájdi všetky záznamy, ktoré zodpovedajú zadanej adrese
      const results = data.filter(item => item.address.toLowerCase().includes(inputAddress));

      if (results.length > 0) {
        // Vytvor HTML pre každý nájdený záznam
        results.forEach(result => {
          const resultDiv = document.createElement('div');
          resultDiv.classList.add('result-item'); // Add a class for styling if needed
          resultDiv.innerHTML = `
            <p data-testid="ruian-code-${result.ruian_code}">Ruian kód: ${result.ruian_code}</p>
            <p data-testid="available-technologies-${result.ruian_code}">Dostupné technológie: ${result.available_technologies.join(', ')}</p>
            <hr> <!-- Optional separator -->
          `;
          resultDisplay.appendChild(resultDiv);
        });
        resultDisplay.classList.remove('hidden');
      } else {
        // Display "Address not found" message within the results area
        resultDisplay.innerHTML = '<p data-testid="not-found-message">Adresa sa nenašla.</p>';
        resultDisplay.classList.remove('hidden');
      }
    })
    .catch(err => {
      console.error('Chyba pri načítaní dát:', err);
      resultDisplay.innerHTML = '<p class="error">Chyba pri načítaní dát.</p>'; // Display error to user
      resultDisplay.classList.remove('hidden');
    });
});

// Optional: Add listener for Enter key in the input field
document.getElementById('search-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission if it were in a form
    document.getElementById('search-button').click(); // Trigger the search button click
  }
});

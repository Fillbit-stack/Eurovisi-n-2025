document.addEventListener('DOMContentLoaded', () => {
  const nameForm = document.getElementById('nameForm');
  const surveyForm = document.getElementById('surveyForm');
  const userDisplay = document.getElementById('userDisplay');
  const resultsBody = document.getElementById('resultsBody');
  const restartButton = document.getElementById('restart');

  // Manejo de la página de inicio
  if (nameForm) {
    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'encuesta.html';
      }
    });
  }

  // Manejo de la página de encuesta
  if (surveyForm) {
    const username = localStorage.getItem('username');
    if (!username) {
      window.location.href = 'index.html';
    } else {
      userDisplay.textContent = username;
    }

    // Cargar datos existentes
    const data = JSON.parse(localStorage.getItem('surveyData')) || {};
    if (data[username]) {
      document.getElementById('winner').value = data[username].winner;
      document.getElementById('melodyPosition').value = data[username].melodyPosition;
    }

    // Mostrar todos los datos
    const displayResults = () => {
      resultsBody.innerHTML = '';
      for (const [name, info] of Object.entries(data)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${name}</td><td>${info.winner}</td><td>${info.melodyPosition}</td>`;
        resultsBody.appendChild(row);
      }
    };
    displayResults();

    surveyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const winner = document.getElementById('winner').value.trim();
      const melodyPosition = document.getElementById('melodyPosition').value.trim();
      if (winner && melodyPosition) {
        data[username] = { winner, melodyPosition };
        localStorage.setItem('surveyData', JSON.stringify(data));
        displayResults();
        alert('Datos guardados correctamente.');
      }
    });

    restartButton.addEventListener('click', () => {
      localStorage.removeItem('username');
      window.location.href = 'index.html';
    });
  }
});
  

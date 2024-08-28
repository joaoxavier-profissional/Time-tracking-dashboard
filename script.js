//puxar dados
//transformar dados em html

fetch('/data.json').then((request) => {  
    if(!request.ok) {
      console.log('Oops! Something went wrong.');
      return null;
    }
    
    return request.json();
  }).then((data) => {
    console.log(data);
    console.log(data[0].timeframes);

    // Função para atualizar o conteúdo dos cards
    function updateCards(timeframe) {
        data.forEach(activity => {
          const card = document.getElementById(activity.title.toLowerCase());
          if (card) {
            const current = activity.timeframes[timeframe].current;
            const previous = activity.timeframes[timeframe].previous;
            card.querySelector('h1').textContent = `${current}hrs`;
            card.querySelector('p').textContent = `Last Week - ${previous}hrs`;
          }
        });
      }

      // Função para ativar o botão clicado e desativar os outros
      function activateButton(button) {
        document.querySelectorAll('.card-section button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      }

      // Adicionando evento de clique aos botões e pegando o data-timeframe deles
      document.querySelectorAll('.card-section button').forEach(button => {
        button.addEventListener('click', () => {
          const timeframe = button.getAttribute('data-timeframe');
          activateButton(button);
          updateCards(timeframe);
        });
      });
});



  
if (annyang) {
  const commands = {
    'go to home': () => window.location.href = 'index.html',
    'go to stocks': () => window.location.href = 'stocks.html',
    'go to dogs': () => window.location.href = 'dogs.html',
    'look up *ticker': ticker => {
      document.getElementById('stockInput').value = ticker.toUpperCase();
      document.getElementById('dayRange').value = 30;
      document.getElementById('lookupButton').click();
    },
    
    'load dog breed *breed': breedName => {
      const buttons = document.querySelectorAll('.breed-btn');
      const target = breedName.toLowerCase();

      for (let btn of buttons) {
        if (btn.textContent.toLowerCase() === target) {
          btn.click();
          return;
        }
      }

      alert(`Could not find a breed called "${breedName}"`);
    },

    'change the color to *color': color => {
      document.body.style.backgroundColor = color;
    },

    'hello': () => {
      alert('Hello there!');
    }
  };

  annyang.addCommands(commands);

window.addEventListener('load', () => {
  const startBtn = document.getElementById('startListening');
  const stopBtn = document.getElementById('stopListening');

  if (startBtn) startBtn.addEventListener('click', () => annyang.start({ autoRestart: false, continuous: false }));
  if (stopBtn) stopBtn.addEventListener('click', () => annyang.abort());
});
}

window.onload = function () {
  fetch('https://dog.ceo/api/breeds/image/random/10')
    .then(res => res.json())
    .then(data => {
      const slider = document.getElementById('dogSlider');
      const wrapper = document.createElement('div');

      data.message.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = "Random Dog";
        img.style.width = '100%';
        wrapper.appendChild(img);
      });

      slider.appendChild(wrapper);
    });


  fetch('https://dogapi.dog/api/v2/breeds')
    .then(res => res.json())
    .then(data => {
      const breeds = data.data;
      const container = document.getElementById('breedButtons');
      const shuffledBreeds = breeds.sort(() => 0.5 - Math.random());
      const randomBreeds = shuffledBreeds.slice(0, 10);

      randomBreeds.forEach(breed => {
        const btn = document.createElement('button');
        btn.textContent = breed.attributes.name;
        btn.classList.add('breed-btn');
        btn.setAttribute('data-breed-id', breed.id);

        btn.addEventListener('click', () => showBreedInfo(breed));
        container.appendChild(btn);
      });

    });
};

function showBreedInfo(breed) {
  const attrs = breed.attributes;
  document.getElementById('breedInfo').style.display = 'block';
  document.getElementById('breedName').textContent = attrs.name;
  document.getElementById('breedDescription').textContent = attrs.description || 'No description available.';
  document.getElementById('minLife').textContent = attrs.life?.min || 'Unknown';
  document.getElementById('maxLife').textContent = attrs.life?.max || 'Unknown';
}


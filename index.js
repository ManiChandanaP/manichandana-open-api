document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("breedselect");
  const image = document.getElementById("dogimage");
  const breedName = document.getElementById("breedname");
  const temperament = document.getElementById("breedtemperament");

  let allBreeds = [];

  // First fetch: Get all breeds
  fetch("https://api.thedogapi.com/v1/breeds")
    .then((res) => res.json())
    .then((breeds) => {
      allBreeds = breeds;

      // Populate dropdown
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
    });

  // When user selects a breed
  select.addEventListener("change", (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedBreed = allBreeds.find((b) => b.id === selectedId);

    if (selectedBreed) {
      // Show temperament from the breed data
      breedName.textContent = selectedBreed.name;
      temperament.textContent = `Temperament: ${selectedBreed.temperament || 'N/A'}`;

      // Second fetch: Get image by breed
      fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${selectedBreed.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0] && data[0].url) {
            image.src = data[0].url;
          } else {
            image.src = "";
            image.alt = "Image not found";
          }
        });
    }
  });
});

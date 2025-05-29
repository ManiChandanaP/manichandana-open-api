document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("breedselect");
  const breedName = document.getElementById("breedname");
  const temperament = document.getElementById("breedtemperament");
  const image = document.getElementById("dogimage");

  const showTemperamentBtn = document.getElementById("showTemperament");
  const showImageBtn = document.getElementById("showImage");

  let allBreeds = [];

  image.classList.add("hidden");
  fetch("https://api.thedogapi.com/v1/breeds")
    .then((res) => res.json())
    .then((breeds) => {
      allBreeds = breeds;
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Error fetching breed list:", err);
      alert("Failed to load breed list.");
    });

  //Temperament only
  showTemperamentBtn.addEventListener("click", () => {
    const selectedId = parseInt(select.value);
    if (!selectedId) {
      alert("Please select a breed.");
      return;
    }

    const selectedBreed = allBreeds.find((b) => b.id === selectedId);
    if (selectedBreed) {
      breedName.textContent = selectedBreed.name;
      temperament.textContent = `Temperament: ${selectedBreed.temperament || 'N/A'}`;
      breedName.classList.remove("hidden");
      temperament.classList.remove("hidden");
      image.classList.add("hidden");
    }
  });

  // Show Image only
  showImageBtn.addEventListener("click", () => {
    const selectedId = parseInt(select.value);
    if (!selectedId) {
      alert("Please select a breed.");
      return;
    }
    breedName.classList.add("hidden");
    temperament.classList.add("hidden");
    image.src = "";
    image.alt = "";

    fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${selectedId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].url) {
          image.src = data[0].url;
          image.alt = "Dog image";
          image.classList.remove("hidden");
        } else {
          alert("Image not available for this breed.");
          image.classList.add("hidden");
        }
      })
      .catch((err) => {
        console.error("Error fetching image:", err);
        alert("Failed to load image.");
        image.classList.add("hidden");
      });
  });
});

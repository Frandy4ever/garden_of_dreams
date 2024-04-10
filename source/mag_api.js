// Function to fetch plant images from Pexels API
async function fetchPlantImages() {
    const apiKey = 'KeT1nJOqbi1827RGTQXxNpm3F3nLTlpv87xTbD04kUyjRI0ZudI9w1fT';
    const response = await fetch(`https://api.pexels.com/v1/search?query=plants&per_page=5`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

// Function to dynamically create plant pages
async function createPlantPages() {
    const plantPagesContainer = document.getElementById('plant-pages');
    const plantImages = await fetchPlantImages();

    // Loop through each plant image and create a page for it
    plantImages.forEach((plant, index) => {
        const pageContainer = document.createElement('div');
        pageContainer.classList.add('book-page', 'page-right', 'turn');
        pageContainer.id = `plant-page-${index}`;

        const pageFront = document.createElement('div');
        pageFront.classList.add('page-front');

        const img = document.createElement('img');
        img.src = plant.src.medium; // Use medium-sized image for display
        img.alt = plant.photographer;

        const pageBack = document.createElement('div');
        pageBack.classList.add('page-back');

        const photographer = document.createElement('p');
        photographer.textContent = `Photographer: ${plant.photographer}`;

        const nextPageButton = document.createElement('span');
        nextPageButton.classList.add('nextprev-btn');
        nextPageButton.dataset.page = `plant-page-${index}`;
        nextPageButton.innerHTML = `<i class='bx bx-chevron-right'></i>`;

        // Append elements to respective containers
        pageFront.appendChild(img);
        pageBack.appendChild(photographer);
        pageContainer.appendChild(pageFront);
        pageContainer.appendChild(pageBack);
        pageContainer.appendChild(nextPageButton);
        plantPagesContainer.appendChild(pageContainer);
    });
}

// Call the function to create plant pages when the page loads
window.addEventListener('DOMContentLoaded', () => {
    createPlantPages();
});
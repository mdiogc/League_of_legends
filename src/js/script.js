import Legend from "./legends.js"; // Import the Legend class from the legends.js file

let legends = []; // Array where instances of champions (legends) will be stored

const button = document.querySelector("button"); // Select the button in the DOM
const loadingDataText = document.getElementById('loading-data-text'); // Element to show "Loading data..."

loadingDataText.style.visibility = 'hidden'; // Initially hide the loading message

// Add an event listener to the button to wait for the click
button.addEventListener("click", async () => {
    // On click, hide the button by changing its visibility
    button.style.visibility = 'hidden'; // Used 'button' directly instead of querying '#button' again

    // Change the visibility of the element with id 'lol' to show it
    document.querySelector('#lol').style.visibility = 'visible';

    // Show the "Loading data..." message before the fetch
    loadingDataText.style.visibility = 'visible';

    // Call the getLegend() function, which will begin the process of showing the champions
    await getLegend(); // Wait for getLegend to finish

    // Once the data is fetched, call showLegend to display the champions
    showLegend();
});

// Async function to fetch champions from the API
async function getLegend() {
    const url = "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json"; // API URL with champion data
    const response = await fetch(url); // Send a request to the API
    const data = (await response.json()).data; // Parse the response to JSON and access the "data" property that contains the champions
    
    // Loop through each champion (legend) in the data obtained from the API
    for (let legend in data) {
        // Create a new instance of the Legend class for each champion and add it to the legends array
        legends.push(new Legend(data[legend]));
    }

    // Hide the "Loading data..." message once the data is loaded
    loadingDataText.style.visibility = 'hidden';
}

// This function is responsible for displaying the champions stored in the legends array in the DOM
const showLegend = () => {
    const legendsContainer = document.getElementById("lol");
    legendsContainer.innerHTML = ''; // Clear previous content

    legends.forEach(legend => {
        const card = document.createElement('div');
        card.className = 'card';

        const name = document.createElement('div');
        name.className = 'name';
        name.innerText = legend.name;

        const img = document.createElement('img');
        img.src = legend.image;
        img.alt = legend.name;

        const title = document.createElement('div');
        title.className = 'title';
        title.innerText = legend.title;

        // Create a container for additional info
        const infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';
        infoContainer.innerHTML = `
            <div class="tags">Tags: ${legend.tags && legend.tags.length > 0 ? legend.tags.join(' & ') : 'No tags available'}</div>
            <div class="stats">
                Attack: ${legend.attack}, Defense: ${legend.defense}, Magic: ${legend.magic}, Difficulty: ${legend.difficulty}
            </div>
        `;
        
        // Hide the info container initially
        infoContainer.style.display = 'none';

        // Show the info container on mouseover
        card.addEventListener('mouseover', () => {
            infoContainer.style.display = 'block';
        });

        // Hide the info container on mouseout
        card.addEventListener('mouseout', () => {
            infoContainer.style.display = 'none';
        });

        // Append all elements to the card
        card.appendChild(name);
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(infoContainer);

        // Append the card to the legends container
        legendsContainer.appendChild(card);
    });
};


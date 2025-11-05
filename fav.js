window.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const searchInput = document.querySelector('.search-wrapper input[type="search"]');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Function to display favorites based on filtered items
    function displayFavorites(filteredFavorites) {
        // Clear container content
        favoritesContainer.innerHTML = '';

        if (filteredFavorites.length > 0) {
            // Display each favorite item in a styled box
            filteredFavorites.forEach(item => {
                const topicDiv = document.createElement('div');
                topicDiv.classList.add('favorite-box'); // Add a class for styling
                topicDiv.innerHTML = `
                    <h3><a href="${item.link}">${item.title}</a></h3>
                    <p>${item.description}</p>
                `;
                favoritesContainer.appendChild(topicDiv);
            });
        } else {
            // Display a message if no favorites match the search
            const noFavoritesMessage = document.createElement('p');
            noFavoritesMessage.innerText = 'Nothing in Favourites';
            noFavoritesMessage.classList.add('no-favorites-message'); // Optional class for styling
            favoritesContainer.appendChild(noFavoritesMessage);
        }
    }

    // Initial display of all favorites
    displayFavorites(favorites);

    // Event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            // Filter favorites based on search term
            const filteredFavorites = favorites.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm)
                );
            });

            // Display filtered favorites
            displayFavorites(filteredFavorites);
        });
    }
});

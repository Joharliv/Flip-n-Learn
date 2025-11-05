window.addEventListener('DOMContentLoaded', () => {
    const recentsContainer = document.getElementById('recents-container');
    const searchInput = document.querySelector('.search-wrapper input[type="search"]');
    const recents = JSON.parse(localStorage.getItem('recents')) || [];

    // Function to display recent items in the container
    function displayRecents(filteredRecents) {
        // Clear the recents container
        recentsContainer.innerHTML = '';

        if (filteredRecents.length > 0) {
            // Display each recent item in a styled box
            filteredRecents.forEach(item => {
                const topicDiv = document.createElement('div');
                topicDiv.classList.add('recent-card'); // Add a class for styling
                topicDiv.innerHTML = `
                    <h3><a href="${item.link}">${item.title}</a></h3>
                    <p>${item.description}</p>
                `;
                recentsContainer.appendChild(topicDiv);
            });
        } else {
            // Display a message if there are no recent items matching the search
            const noRecentsMessage = document.createElement('p');
            noRecentsMessage.innerText = 'Nothing in Recents';
            noRecentsMessage.classList.add('no-favorites-message'); // Optional class for styling
            recentsContainer.appendChild(noRecentsMessage);
        }
    }

    // Initial display of all recents
    displayRecents(recents);

    // Event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            // Filter recents based on search term
            const filteredRecents = recents.filter(item => {
                return (
                    item.title.toLowerCase ().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm)
                );
            });

            // Display filtered recents
            displayRecents(filteredRecents);
        });
    }
});

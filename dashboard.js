// JavaScript to handle like button click and maintain liked state
// Load favorites once when the page loads
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

document.querySelectorAll('.like-button input').forEach((likeButton) => {
    const topicElement = likeButton.closest('.topic');
    const title = topicElement.querySelector('h3 a').innerText;
    const link = topicElement.querySelector('h3 a').getAttribute('href');
    const description = topicElement.querySelector('p').innerText;
    const favoriteItem = { title, description, link };

    // Set the liked state based on local storage
    const isLiked = favorites.some(item => item.link === link);
    likeButton.checked = isLiked;

    // Event listener for updating the liked state
    likeButton.addEventListener('change', function () {
        if (this.checked) {
            // Add to favorites if liked and not already in list
            if (!favorites.some(item => item.link === link)) {
                favorites.push(favoriteItem);
            }
        } else {
            // Remove from favorites if unliked
            favorites = favorites.filter(item => item.link !== link);
        }

        // Save updated favorites list back to local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
})

document.querySelectorAll('.topic a').forEach(flashcard => {
    flashcard.addEventListener('click', function (event) {
        const title = this.textContent;
        // Ensure you are correctly selecting the description <p> tag
        const description = this.closest('.topic').querySelector('p') ? this.closest('.topic').querySelector('p').textContent : "No description available";
        const link = this.getAttribute('href');

        // Retrieve and update recents in local storage
        let recents = JSON.parse(localStorage.getItem('recents')) || [];
        
        // Remove duplicates and add new flashcard
        recents = recents.filter(item => item.title !== title); 
        recents.unshift({ title, description, link });

        // Limit the recents list to a certain number (e.g., 5)
        if (recents.length > 5) recents.pop();

        localStorage.setItem('recents', JSON.stringify(recents));
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-wrapper input[type="search"]');
    const cardSingles = document.querySelectorAll('.card-single');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            
            cardSingles.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'flex'; // Show matching card
                } else {
                    card.style.display = 'none'; // Hide non-matching card
                }
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-wrapper input');
    const topicElements = document.querySelectorAll('.topic');

    // Event listener for search input
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        // Filter topics based on search term
        topicElements.forEach(topic => {
            const title = topic.querySelector('h3').textContent.toLowerCase();
            const description = topic.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                topic.style.display = ''; // Show the topic
            } else {
                topic.style.display = 'none'; // Hide the topic
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const profileModal = document.getElementById('profile-modal');
    const profileUpload = document.getElementById('profile-upload');
    const profilePic = document.getElementById('profile-pic');
    const profileIcon = document.getElementById('profile-icon');

    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            if (profileModal) profileModal.style.display = 'block';
            setTimeout(() => {
                if (profileUpload) profileUpload.click();
            }, 0);
        });
    }

    if (profileUpload) {
        profileUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    if (profilePic) {
                        profilePic.src = e.target.result;
                        profilePic.style.display = 'block';
                    }
                    if (profileIcon) profileIcon.style.display = 'none';
                    if (profileModal) profileModal.style.display = 'none';
                    localStorage.setItem('profileImage', e.target.result);
                };

                reader.readAsDataURL(file);
            }
        });
    }

    window.addEventListener('load', function() {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            if (profilePic) {
                profilePic.src = storedImage;
                profilePic.style.display = 'block';
            }
            if (profileIcon) profileIcon.style.display = 'none';
        } else {
            if (profilePic) profilePic.style.display = 'none';
            if (profileIcon) profileIcon.style.display = 'block';
        }
    });
});

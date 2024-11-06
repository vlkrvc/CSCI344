import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    await loadUserProfile();
    await loadSuggestedAccounts();
    await loadStories();
    await loadPosts();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// Load the user's profile information
async function loadUserProfile() {
    try {
        const response = await fetch(`${rootURL}/api/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await response.json();
        const userProfileHTML = `
            <div class="user-profile">
                <img src="${userData.image_url}" alt="${userData.username}" class="profile-img">
                <h3>${userData.username}</h3>
                <p>${userData.bio}</p>
            </div>`;
        document.querySelector('#right-panel-profile').innerHTML = userProfileHTML;
    } catch (error) {
        console.error("Error loading user profile:", error);
    }
}

// Load suggested accounts
async function loadSuggestedAccounts() {
    try {
        const response = await fetch(`${rootURL}/api/suggestions`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const suggestions = await response.json();
        const suggestionsHTML = suggestions.map(suggestion => `
            <div class="suggested-account flex items-center gap-2">
                <img src="${suggestion.image_url}" alt="${suggestion.username}" class="suggestion-img w-8 h-8 rounded-full">
                <span>${suggestion.username}</span>
            </div>`).join('');
        document.querySelector('#right-panel-suggestions').innerHTML = suggestionsHTML;
    } catch (error) {
        console.error("Error loading suggested accounts:", error);
    }
}

// Load stories from the user's network
async function loadStories() {
    try {
        const response = await fetch(`${rootURL}/api/stories`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const stories = await response.json();
        const storiesHTML = stories.map(story => `
            <div class="story flex flex-col items-center">
                <img src="${story.user.image_url}" alt="${story.user.username}" class="story-img w-16 h-16 rounded-full">
                <span class="text-sm mt-2">${story.user.username}</span>
            </div>`).join('');
        document.querySelector('#stories-panel').innerHTML = storiesHTML;
    } catch (error) {
        console.error("Error loading stories:", error);
    }
}

// Load posts and apply like/bookmark/comment logic
async function loadPosts() {
    try {
        const response = await fetch(`${rootURL}/api/posts`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const posts = await response.json();
        const postsHTML = posts.slice(0, 10).map(post => {
            const likeIcon = post.current_user_like_id ? "❤️" : "🤍"; // Red heart if liked
            const bookmarkIcon = post.current_user_bookmark_id ? "🔖" : "🔲"; // Filled bookmark if bookmarked

            // Comments display logic
            const commentHTML = post.comments.length > 1 
                ? `<button class="text-blue-700">View all ${post.comments.length} comments</button><p>${post.comments[0].text}</p>`
                : post.comments.length === 1 
                ? `<p>${post.comments[0].text}</p>`
                : "";

            return `
                <div class="post p-4 border-b">
                    <h4 class="font-bold mb-2">${post.user.username}</h4>
                    <img src="${post.image_url}" alt="${post.title}" class="post-img w-full mb-2">
                    <div class="post-content">
                        <p>${post.title}</p>
                        ${commentHTML}
                        <div class="post-actions flex gap-4 mt-2">
                            <span class="like-icon">${likeIcon}</span>
                            <span class="bookmark-icon">${bookmarkIcon}</span>
                        </div>
                    </div>
                </div>`;
        }).join('');
        document.querySelector('#posts-panel').innerHTML = postsHTML;
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

// Initialize the screen on load
initializeScreen();

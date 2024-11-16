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
    try {
        const token = await getAccessToken(rootURL, username, password);
        if (!token) throw new Error("Token retrieval failed");
        console.log("Token:", token);
        return token;
    } catch (error) {
        console.error("Error fetching token:", error);
    }
}


function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
        <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
        <ul class="flex gap-4 text-sm items-center justify-center">
            <li><span>${username}</span></li>
            <li><button class="text-blue-700 py-2">Sign out</button></li>
        </ul>
    </nav>`;
}

async function loadUserProfile() {
    try {
        const response = await fetch(`${rootURL}/api/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to load profile");
        const profile = await response.json();
        document.querySelector('#right-panel-profile').innerHTML = `
            <div class="user-profile">
                <img src="${profile.image_url}" alt="${profile.username}" class="profile-img rounded-full">
                <h3>${profile.username}</h3>
                <p>${profile.bio}</p>
            </div>`;
    } catch (error) {
        console.error(error);
    }
}

async function loadSuggestedAccounts() {
    const response = await fetch(`${rootURL}/api/suggestions`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const suggestions = await response.json();
    const suggestionsHTML = suggestions.map(user => `
        <div class="suggested-account flex items-center gap-2">
            <img src="${user.image_url}" alt="${user.username}" class="suggestion-img w-8 h-8 rounded-full">
            <span>${user.username}</span>
            <button class="text-blue-500 text-sm" onclick="followUser(${user.id})">Follow</button>
        </div>
    `).join('');
    document.querySelector('#right-panel-suggestions').innerHTML = suggestionsHTML;
}

async function followUser(userId) {
    await fetch(`${rootURL}/api/suggestions/${userId}/follow`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    loadSuggestedAccounts();
}

async function loadStories() {
    const response = await fetch(`${rootURL}/api/stories`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const stories = await response.json();
    const storiesHTML = stories.map(story => `
        <div class="story">
            <img src="${story.user.image_url}" alt="${story.user.username}" class="story-img w-16 h-16 rounded-full">
            <p>${story.user.username}</p>
        </div>
    `).join('');
    document.querySelector('#stories-panel').innerHTML = storiesHTML;
}

async function loadPosts() {
    const response = await fetch(`${rootURL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const posts = await response.json();

    const postsHTML = posts.map(post => {
        const likeIcon = post.current_user_like_id ? "fas fa-heart text-red-500" : "far fa-heart";
        const bookmarkIcon = post.current_user_bookmark_id ? "fas fa-bookmark" : "far fa-bookmark";
        const commentsHTML = post.comments.map(comment => `
            <p><strong>${comment.user.username}</strong> ${comment.text}</p>
        `).join('');

        return `
            <div class="post bg-white border mb-4 p-4" id="post-${post.id}">
                <h4 class="font-bold mb-2">${post.user.username}</h4>
                <img src="${post.image_url}" class="w-full mb-2">
                <div class="flex gap-4">
                    <button class="like-button" data-post-id="${post.id}" data-like-id="${post.current_user_like_id}">
                        <i class="${likeIcon}"></i>
                    </button>
                    <button class="bookmark-button" data-post-id="${post.id}" data-bookmark-id="${post.current_user_bookmark_id}">
                        <i class="${bookmarkIcon}"></i>
                    </button>
                </div>
                <p>${post.title}</p>
                <div>${commentsHTML}</div>
                <input type="text" placeholder="Add a comment..." id="comment-input-${post.id}" class="comment-input w-full mt-2">
                <button class="comment-button text-blue-500" data-post-id="${post.id}">Post</button>
            </div>`;
    }).join('');

    document.querySelector('#posts-panel').innerHTML = postsHTML;

    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = event.target.getAttribute('data-post-id');
            await postComment(postId);
        });
    });

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = button.getAttribute('data-post-id');
            const likeId = button.getAttribute('data-like-id');
            await toggleLike(postId, likeId);
        });
    });
}


async function toggleLike(postId, likeId) {
    const url = `${rootURL}/api/posts/${postId}/likes/${likeId ? likeId : ''}`;
    const method = likeId ? 'DELETE' : 'POST';
    console.log(`Toggling like for postId: ${postId}, likeId: ${likeId}`);

    try {
        const response = await fetch(url, {
            method: method,
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error(`Failed to toggle like: ${response.status}`);
            return;
        }

        console.log("Like toggled successfully");
        loadPosts(); 
    } catch (error) {
        console.error("Error toggling like:", error);
    }
}


async function updatePost(postId) {
    const response = await fetch(`${rootURL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const post = await response.json();
    document.querySelector(`#post-${postId}`).outerHTML = renderPost(post);
}


async function toggleBookmark(postId, bookmarkId) {
    const url = `${rootURL}/api/posts/${postId}/bookmarks/${bookmarkId ? bookmarkId : ''}`;
    const method = bookmarkId ? 'DELETE' : 'POST';

    await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` }
    });
    loadPosts();
}

async function postComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    if (!commentInput) {
        console.error(`Comment input not found for postId: ${postId}`);
        return;
    }

    const commentText = commentInput.value.trim();
    if (!commentText) {
        console.error("Empty comment text");
        return;
    }

    console.log(`Posting comment: "${commentText}" for postId: ${postId}`);

    try {
        const response = await fetch(`${rootURL}/api/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: commentText })
        });

        if (!response.ok) {
            console.error(`Failed to post comment: ${response.status}`);
            const errorText = await response.text();
            console.error("Server response:", errorText);
            return;
        }

        console.log("Comment posted successfully");
        commentInput.value = ''; 
        await loadPosts(); 
    } catch (error) {
        console.error("Error posting comment:", error);
    }
}



initializeScreen();

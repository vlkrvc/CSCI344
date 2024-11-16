import { getAccessToken } from "./utilities.js";

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev";
let password = "password";

// Initialize the screen
async function initializeScreen() {
    token = await getToken();
    if (!token) {
        console.error("Failed to retrieve token");
        alert("Failed to retrieve token. Check your API credentials.");
        return;
    }
    console.log("Token retrieved:", token);
    await loadPosts();
}


// Get the access token
async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

// Fetch and display posts
async function loadPosts() {
    try {
        const response = await fetch(`${rootURL}/api/posts`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Failed to fetch posts:", response.status);
            return;
        }

        console.log("Posts fetched successfully");
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}


function renderPosts(posts) {
    const postsPanel = document.querySelector('#posts-panel');
    postsPanel.innerHTML = posts.map(post => {
        const bookmarkIcon = post.current_user_bookmark_id ? "fas fa-bookmark text-yellow-500" : "far fa-bookmark";
        return `
            <div class="post bg-white border mb-4 p-4" id="post-${post.id}">
                <h4 class="font-bold">${post.user.username}</h4>
                <img src="${post.image_url}" class="w-full mt-2 mb-2">
                <div class="flex items-center gap-4">
                    <button class="bookmark-button" 
                            data-post-id="${post.id}" 
                            data-bookmark-id="${post.current_user_bookmark_id || ''}">
                        <i class="${bookmarkIcon}"></i>
                    </button>
                </div>
                <p>${post.title}</p>
            </div>
        `;
    }).join('');

    // Attach event listeners to bookmark buttons
    document.querySelectorAll('.bookmark-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const postId = button.getAttribute('data-post-id');
            const bookmarkId = button.getAttribute('data-bookmark-id');
            if (bookmarkId) {
                await deleteBookmark(postId, bookmarkId);
            } else {
                await createBookmark(postId);
            }
        });
    });
}

// Create the HTML for each post
function createPostHTML(post) {
    const bookmarkIcon = post.current_user_bookmark_id ? "fas fa-bookmark text-yellow-500" : "far fa-bookmark";
    return `
        <div class="post bg-white border mb-4 p-4" id="post-${post.id}">
            <h4 class="font-bold">${post.user.username}</h4>
            <img src="${post.image_url}" class="w-full mt-2 mb-2">
            <div class="flex items-center gap-4">
                <button class="bookmark-button" data-post-id="${post.id}" data-bookmark-id="${post.current_user_bookmark_id}">
                    <i class="${bookmarkIcon}"></i>
                </button>
            </div>
            <p>${post.title}</p>
        </div>
    `;
}

async function createBookmark(postId) {
    try {
        const response = await fetch(`${rootURL}/api/posts/${postId}/bookmarks`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Failed to create bookmark");
            return;
        }
        await loadPosts(); // Refresh posts to reflect the new bookmark
    } catch (error) {
        console.error("Error creating bookmark:", error);
    }
}

async function deleteBookmark(postId, bookmarkId) {
    try {
        const response = await fetch(`${rootURL}/api/posts/${postId}/bookmarks/${bookmarkId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Failed to delete bookmark");
            return;
        }
        await loadPosts(); // Refresh posts to reflect the removed bookmark
    } catch (error) {
        console.error("Error deleting bookmark:", error);
    }
}

// Function to create a bookmark
async function createBookmark(postId) {
    try {
        const response = await fetch(`${rootURL}/api/posts/${postId}/bookmarks`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Failed to create bookmark");
            return;
        }
        console.log("Bookmark created for post:", postId);
        await loadPosts(); // Refresh posts to reflect the new bookmark
    } catch (error) {
        console.error("Error creating bookmark:", error);
    }
}

// Function to delete a bookmark
async function deleteBookmark(postId, bookmarkId) {
    try {
        const response = await fetch(`${rootURL}/api/posts/${postId}/bookmarks/${bookmarkId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            console.error("Failed to delete bookmark");
            return;
        }
        console.log("Bookmark deleted for post:", postId);
        await loadPosts(); // Refresh posts to reflect the removed bookmark
    } catch (error) {
        console.error("Error deleting bookmark:", error);
    }
}



initializeScreen();

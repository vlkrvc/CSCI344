import React, { useEffect, useState } from "react";

export default function Posts({ token }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("/api/posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch posts.");
                }

                const data = await response.json();
                setPosts(data.posts); // Assume posts are in data.posts
            } catch (err) {
                setError(err.message);
            }
        }

        fetchPosts();
    }, [token]);

    const toggleBookmark = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, bookmarked: !post.bookmarked }
                    : post
            )
        );
    };

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <section className="bg-white border p-4 rounded">
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="mb-4 border-b pb-4">
                        <h2 className="font-bold text-lg">{post.title}</h2>
                        <p>{post.content}</p>
                        <button
                            className={`mt-2 ${
                                post.bookmarked
                                    ? "text-red-500"
                                    : "text-blue-500"
                            }`}
                            onClick={() => toggleBookmark(post.id)}
                        >
                            {post.bookmarked ? "Remove Bookmark" : "Bookmark"}
                        </button>
                    </div>
                ))
            )}
        </section>
    );
}

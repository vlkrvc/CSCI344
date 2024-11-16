import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Posts({ token }) {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        const data = await getDataFromServer(token, "/api/posts");
        console.log(data);
        setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return <div>TODO: output all of the posts: {posts.length}</div>;
}

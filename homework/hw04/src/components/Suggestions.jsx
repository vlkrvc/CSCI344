import React, { useEffect, useState } from "react";

export default function Suggestions({ token }) {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSuggestions() {
            try {
                const response = await fetch("/api/suggestions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch suggestions.");
                }

                const data = await response.json();
                setSuggestions(data.suggestions); // Assume suggestions are in data.suggestions
            } catch (err) {
                setError(err.message);
            }
        }

        fetchSuggestions();
    }, [token]);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">Suggestions for You</p>
            <section className="flex flex-col gap-4">
                {suggestions.length === 0 ? (
                    <p>No suggestions available.</p>
                ) : (
                    suggestions.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center bg-white p-3 rounded border shadow-sm"
                        >
                            <div>
                                <p className="font-bold">{user.username}</p>
                                <p className="text-sm text-gray-500">{user.bio}</p>
                            </div>
                            <button className="text-blue-500 font-semibold hover:underline">
                                Follow
                            </button>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

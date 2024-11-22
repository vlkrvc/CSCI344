import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Stories from "./Stories";
import Posts from "./Posts";
import Suggestions from "./Suggestions";

export default function App({ token, username }) {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navigation Bar */}
            <NavBar username={username} />

            {/* Main Content */}
            <div className="container mx-auto pt-20 px-4">
                <div className="flex gap-6">
                    {/* Left Sidebar */}
                    <div className="w-1/4">
                        <Profile token={token} />
                        <Stories token={token} />
                    </div>

                    {/* Posts Section */}
                    <div className="w-1/2">
                        <Posts token={token} />
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-1/4">
                        <Suggestions token={token} />
                    </div>
                </div>
            </div>
        </div>
    );
}

document.getElementById("search-button").addEventListener("click", async () => {
    const location = document.getElementById("location").value.trim();
    const term = document.getElementById("term").value.trim() || "restaurants";
    const openNow = document.getElementById("open-now").checked;

    const endpoint = "https://www.apitutor.org/yelp/simple/v3/businesses/search";
    const params = new URLSearchParams({
        location,
        term: term || "restaurants",
        limit: 10,
    });

    if (openNow) {
        params.append("open_now", "true");
    }

    try {
        console.log("Full Request URL:", `${endpoint}?${params.toString()}`);

        const response = await fetch(`${endpoint}?${params.toString()}`);
        
        console.log("Response Status:", response.status);
        
        const data = await response.json();
        console.log("Received Data:", data);
        
        data.forEach((business, index) => {
            console.log(`Business ${index + 1}:`, {
                name: business.name,
                address: business.location?.display_address,
                rating: business.rating,
                price: business.price,
                imageUrl: business.image_url
            });
        });
        
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ""; 

        if (data && data.length > 0) {
            data.forEach((business) => {
                resultsContainer.innerHTML += businessToHTML(business);
            });
        } else {
            resultsContainer.innerHTML = "<p>No businesses found.</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("results").innerHTML = `<p>Error loading results: ${error.message}</p>`;
    }
});

function businessToHTML(business) {
    return `
        <div class="business">
            <h2>${business.name}</h2>
            <img src="${business.image_url || 'https://via.placeholder.com/150'}" alt="${business.name}">
            <p><strong>Address:</strong> ${business.location?.display_address?.join(', ') || 'No address'}</p>
            <p><strong>Rating:</strong> ${business.rating || 'N/A'} stars</p>
            <p><strong>Price:</strong> ${business.price || 'N/A'}</p>
            <p><strong>Reviews:</strong> ${business.review_count || 0}</p>
        </div>
    `;
}
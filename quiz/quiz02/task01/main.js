// 1. Create your getBusinesses function here:

const API_KEY = "YOUR_API_KEY";

/** 
 * Fetch businesses from Yelp API based on location, search term, and result limit.
 * @param {string} location 
 * @param {string} term 
 * @param {number} limit 
 * @returns {Promise<Array>} 
 */
async function getBusinesses(location, term, limit) {
    const endpoint = "https://api.yelp.com/v3/businesses/search";
    const headers = {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    };

    const params = new URLSearchParams({
        location: location,
        term: term,
        limit: limit.toString(),
    });

    try {
        const response = await fetch(`${endpoint}?${params.toString()}`, { headers });

        if (!response.ok) {
            throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.businesses || [];
    } catch (error) {
        console.error("Error fetching businesses:", error);
        return [];
    }
}





 console.log(
    "Should display 3 pizza restaurants in Asheville:",
    getBusinesses("Asheville, NC", "pizza", 3)
    );
console.log(
    "Should display 10 thai restaurants in San Francisco:",
    getBusinesses("San Francisco, CS", "thai", 10)
    );








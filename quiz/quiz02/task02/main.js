// 1. Create your businessToHTML function here:


/**
 * Converts a business object into an HTML string representation.
 * @param {Object} business - The business object containing details like name, address, image, etc.
 * @returns {string} - An HTML string representing the business.
 */
function businessToHTML(business) {
    const name = business.name || "Unknown Name";
    const address = business.display_address || "Unknown Address";
    const imageUrl = business.image_url || "https://via.placeholder.com/150";
    const rating = business.rating || "No Rating";
    const price = business.price || "";
    const reviewCount = business.review_count || 0;

    return `
        <div class="business">
            <h2>${name}</h2>
            <p><strong>Address:</strong> ${address}</p>
            <img src="${imageUrl}" alt="Image of ${name}" width="150" height="150">
            <p><strong>Rating:</strong> ${rating} stars</p>
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>Reviews:</strong> ${reviewCount} reviews</p>
        </div>
    `;
}







// 2. When you're done, uncomment the test code below and preview index.html in your browser:

const businessObjPriceDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    price: "$$",
    review_count: 1257,
};

const businessObjPriceNotDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    review_count: 1257,
};


console.log("HTML representation of a business:", businessToHTML(businessObjPriceDefined));
console.log("HTML representation of a business (no price):", businessToHTML(businessObjPriceNotDefined));


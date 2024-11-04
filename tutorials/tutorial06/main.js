// Part 1.1a: Filter function to check if a course is full
const filterClassFull = (course) => {
    return course.EnrollmentCurrent >= course.EnrollmentMax;
};

// Part 1.1b: Filter function to check if a course matches the search term
const filterTermMatched = (course, searchTerm) => {
    const term = searchTerm.toLowerCase();
    return (
        course.Code.toLowerCase().includes(term) ||
        course.Title.toLowerCase().includes(term) ||
        course.CRN.toString().includes(term) ||
        course.Instructors.some(instructor => instructor.Name.toLowerCase().includes(term))
    );
};

// Part 1.2: Convert course data to HTML
const dataToHTML = (course) => {
    const isFull = course.EnrollmentCurrent >= course.EnrollmentMax ? "Full" : "Open";
    const instructors = course.Instructors.map(inst => inst.Name).join(", ");
    return `
        <section class="course">
            <h2>${course.Code}: ${course.Title}</h2>
            <p>
                <i class="fa-solid ${isFull === "Full" ? "fa-circle-xmark" : "fa-circle-check"}"></i>
                ${isFull} &bull; ${course.CRN} &bull; Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
            </p>
            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>
            <p><strong>${instructors}</strong></p>
        </section>
    `;
};

// Part 2: Show data based on the search term and filter for open classes
const showData = (searchTerm, openOnly) => {
    // Filter courses based on open status and search term
    const filteredCourses = data
        .filter(course => !openOnly || !filterClassFull(course)) // Only include open courses if openOnly is true
        .filter(course => filterTermMatched(course, searchTerm)); // Include courses that match the search term

    // Map the filtered courses to HTML strings
    const htmlString = filteredCourses.map(dataToHTML).join("");

    // Clear existing content and insert the new HTML into the DOM
    const courseContainer = document.querySelector(".courses");
    courseContainer.innerHTML = htmlString; // Clear any existing courses and insert the new HTML
};

// Event handler for the search button
const search = (ev) => {
    ev.preventDefault(); // Prevent default form submission behavior

    // Get user's preferences
    const searchTerm = document.querySelector("#search_term").value;
    const openOnly = document.querySelector("#is_open").checked;

    // Pass the user's preferences into the showData function
    showData(searchTerm, openOnly);
};

// Attach the event handler to the search button
document.querySelector("#searchButton").addEventListener("click", search);

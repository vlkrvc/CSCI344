// Function to reset to default theme
const defaultTheme = (ev) => {
    document.querySelector("body").className = ""; // Unset any theme
};

// Function to apply ocean theme
const oceanTheme = (ev) => {
    document.querySelector("body").className = "ocean"; // Apply ocean theme
};

// Function to apply desert theme
const desertTheme = (ev) => {
    document.querySelector("body").className = "desert"; // Apply desert theme
};

// Function to apply high-contrast theme
const highContrastTheme = (ev) => {
    document.querySelector("body").className = "high-contrast"; // Apply high-contrast theme
};

// Attach event listeners to buttons (in case you prefer not using onclick in HTML)
document.getElementById("default").addEventListener("click", defaultTheme);
document.getElementById("ocean").addEventListener("click", oceanTheme);
document.getElementById("desert").addEventListener("click", desertTheme);
document.getElementById("high-contrast").addEventListener("click", highContrastTheme);

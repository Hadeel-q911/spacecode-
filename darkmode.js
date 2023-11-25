document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const storedTheme = localStorage.getItem("theme");

    // Set the theme based on user preference
    if (storedTheme) {
        body.classList.add(storedTheme);
    }

    // Toggle between themes on button click
    const toggleBtn = document.getElementById("toggle-dark-mode");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {
            body.classList.toggle("dark-theme");
            const currentTheme = body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
            localStorage.setItem("theme", currentTheme);
        });
    }
});
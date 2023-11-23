document.addEventListener("DOMContentLoaded", function () {
    // Retrieve child's name from local storage
    var storedChildName = localStorage.getItem("childName");

    // Populate the select element for children
    var childrenSelect = document.getElementById("children");

    // If there is a stored child name, add it to the select element
    if (storedChildName) {
        var option = document.createElement("option");
        option.value = storedChildName;
        option.textContent = storedChildName;
        childrenSelect.appendChild(option);
    }

    // Define the courses array
    var courses = [
        { tutor: "Manar Muath", course: "Introduction to Programming", prerequisite: "None" },
        { tutor: "Safiah Hamad", course: "HTML Basics", prerequisite: "None" },
        { tutor: "Manar Muath", course: "JavaScript Fundamentals", prerequisite: "HTML Basics" },
        { tutor: "Safiah Hamad", course: "CSS Styling", prerequisite: "HTML Basics" },
        { tutor: "Ahmed Ali", course: "Python Basics", prerequisite: "None" },
        { tutor: "Noura Saleh", course: "Java Programming", prerequisite: "Introduction to Programming" },
        { tutor: "Ahmed Ali", course: "Web Development with Django", prerequisite: "Python Basics" },
        { tutor: "Noura Saleh", course: "Advanced JavaScript", prerequisite: "JavaScript Fundamentals" },
        { tutor: "Manar Muath", course: "Responsive Web Design", prerequisite: "CSS Styling" },
        // Add more courses as needed
    ];
    

// Populate filter options for tutor and prerequisite
var tutorsFilter = document.getElementById("tutor1");
var prerequisitesFilter = document.getElementById("prerequisite");

// Use Set to keep track of unique tutor and prerequisite names
var uniqueTutors = new Set();
var uniquePrerequisites = new Set();

courses.forEach(function (course) {
    uniqueTutors.add(course.tutor);
    uniquePrerequisites.add(course.prerequisite);
});

// Add unique tutors to the filter options
uniqueTutors.forEach(function (tutor) {
    var option = document.createElement("option");
    option.value = tutor;
    option.textContent = tutor;
    tutorsFilter.appendChild(option);
});

// Add unique prerequisites to the filter options
uniquePrerequisites.forEach(function (prerequisite) {
    var option = document.createElement("option");
    option.value = prerequisite;
    option.textContent = prerequisite;
    prerequisitesFilter.appendChild(option);
});


    // Handle form submission
    var form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check if a child is selected
        var selectedChild = childrenSelect.value;
        if (!selectedChild) {
            alert("Please select a child.");
            return;
        }

        // Check if a course is selected
        var selectedCourse = document.querySelector("input[name='radio']:checked");
        if (!selectedCourse) {
            alert("Please select a course.");
            return;
        }

        // Display information on the page
        var informationContainer = document.querySelector(".enral");
        informationContainer.innerHTML = "<h2>Enrollment Information</h2> <br>";
        informationContainer.innerHTML += "<p>Child Name: " + selectedChild + "</p> ";
        informationContainer.innerHTML += "<p>Selected Courses:</p>";
        informationContainer.innerHTML += "<ul>";

        // Find and display selected courses and their tutors
        courses.forEach(function (course) {
            if (course.course === selectedCourse.nextSibling.nodeValue.trim()) {
                informationContainer.innerHTML += "<li>" + course.course + " (Tutor: " + course.tutor + ")</li>";
            }
        });

        informationContainer.innerHTML += "</ul>";

        // Clear the form
        form.reset();
    });
});

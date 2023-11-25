document.addEventListener("DOMContentLoaded", function () {
  console.log("content_loaded");

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
    {
      tutor: "Manar Muath",
      course: "Scratch",
      prerequisite: "None",
      img: "image/scratch (2).png",
    },
    {
      tutor: "Safiah Hamad",
      course: "Html & css",
      prerequisite: "None",
      img: "image/htmlcss .png",
    },
    {
      tutor: "Manar Muath",
      course: "Java",
      prerequisite: "None",
      img: "images/java.png",
    },
    {
      tutor: "Safiah Hamad",
      course: "PHP",
      prerequisite: "Html & css",
      img: "image/php.png",
    },
    {
      tutor: "Ahmed Ali",
      course: "Python",
      prerequisite: "Java",
      img: "image/202729c0-34b4-4191-b5fc-9ac4012ca21c.jpeg",
    },
    {
      tutor: "Noura Saleh",
      course: "JavaScript",
      prerequisite: "Java",
      img: "images/JavaScript .png",
    },
    {
      tutor: "Ahmed Ali",
      course: "AI",
      prerequisite: "Python",
      img: "image/AI (1).png",
    },
    {
      tutor: "Noura Saleh",
      course: "swift",
      prerequisite: "C#",
      img: "image/swift.png",
    },
    {
      tutor: "Manar Muath",
      course: "C#",
      prerequisite: "Scratch",
      img: "images/cc.png",
    },
    // Add more courses as needed
  ];

  // Populate filter options for tutors and prerequisites
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

  // Show all courses initially
  displayFilteredCourses(courses);

  // Handle filter change event
  tutorsFilter.addEventListener("change", function () {
    filterAndDisplayCourses();
  });

  prerequisitesFilter.addEventListener("change", function () {
    filterAndDisplayCourses();
  });

  function filterAndDisplayCourses() {
    // Get the selected tutor and prerequisite
    var selectedTutor = tutorsFilter.value;
    var selectedPrerequisite = prerequisitesFilter.value;

    // Filter courses based on selected tutor and prerequisite
    var filteredCourses = courses.filter(function (course) {
      return (
        (selectedTutor === "All" || course.tutor === selectedTutor) &&
        (selectedPrerequisite === "All" ||
          course.prerequisite === selectedPrerequisite)
      );
    });

    // Display filtered courses in the FilterDiv
    displayFilteredCourses(filteredCourses);
  }

  function displayFilteredCourses(filteredCourses) {
    // Get the FilterDiv
    var filterDiv = document.getElementById("FilterDiv");

    // Clear previous content
    filterDiv.innerHTML = "";

    // Generate HTML for filtered courses
    filteredCourses.forEach(function (course) {
      var courseLabel = document.createElement("label");
      courseLabel.classList.add("Acourse");

      var courseImage = document.createElement("img");
      courseImage.src = course.img;
      courseImage.alt = course.course;
      courseImage.style.width = "100%";
      courseImage.style.height = "20%";

      var courseCheckbox = document.createElement("input");
      courseCheckbox.type = "checkbox";
      courseCheckbox.name = "checkbox";
      // You might want to set the value attribute to something unique for each course
      courseCheckbox.value = course.course;

      var checkmarkSpan = document.createElement("span");
      checkmarkSpan.classList.add("checkmark");

      courseLabel.appendChild(courseImage);
      courseLabel.appendChild(document.createElement("br"));
      courseLabel.appendChild(courseCheckbox);
      courseLabel.appendChild(
        document.createTextNode(" " + course.course + " ")
      );
      courseLabel.appendChild(checkmarkSpan);

      filterDiv.appendChild(courseLabel);
    });
  }

  // Handle form submission
  var form = document.querySelector("#f");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check if a child is selected
    var selectedChild = childrenSelect.value;
    if (!selectedChild) {
      alert("Please select a child.");
      return;
    }

    // Store the selected child name in local storage
    localStorage.setItem("childName", selectedChild);

    // Check if a course is selected
    var selectedCourses = document.querySelectorAll(
      "input[name='checkbox']:checked"
    );
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    // Get the selected tutor and prerequisite
    var selectedTutor = tutorsFilter.value;
    var selectedPrerequisite = prerequisitesFilter.value;

    // Display information on the page
    var informationContainer = document.querySelector(".enral");
    informationContainer.innerHTML = "<h2>Enrollment Information</h2> <br>";
    informationContainer.innerHTML +=
      "<p>Child Name: " + selectedChild + "</p> ";
    informationContainer.innerHTML += "<p>Selected Courses:</p>";
    informationContainer.innerHTML += "<ul>";

    // Find and display selected courses and their tutors based on filters
    selectedCourses.forEach(function (selectedCourse) {
      // Get the associated label text
      var label = selectedCourse.closest("label");
      var courseName = label.textContent.trim();
      console.log(courseName);

      console.log(selectedPrerequisite);
      courses.forEach(function (course) {
        if (
          course.course === courseName &&
          (selectedTutor === "All" || course.tutor === selectedTutor) &&
          (selectedPrerequisite === "All" ||
            course.prerequisite === selectedPrerequisite)
        ) {
          console.log("in if");
          informationContainer.innerHTML +=
            "<li>" + course.course + " (Tutor: " + course.tutor + ")</li>";
        }
      });
    });

    informationContainer.innerHTML += "</ul>";

    // Clear the form
    form.reset();
  });
});

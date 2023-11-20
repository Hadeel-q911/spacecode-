
<script>
    function sortTutors() {
        var container = document.querySelector('.Tutors');
        var tutors = Array.from(container.getElementsByClassName('tutor'));

        var sortOrder = document.getElementById('sort').value;

        tutors.sort(function (a, b) {
            var nameA = a.querySelector('.title').textContent.trim().toLowerCase();
            var nameB = b.querySelector('.title').textContent.trim().toLowerCase();

            if (sortOrder === 'az') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        tutors.forEach(function (tutor) {
            container.appendChild(tutor);
        });
    }
</script>

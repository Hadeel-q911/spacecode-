document.addEventListener('DOMContentLoaded', function() {
    const kids = ['Child 1', 'Child 2']; // Names of the children

    // Check if local storage has the parent's children
    if (!localStorage.getItem('parentChildren')) {
        // If local storage is empty, save the children's names
        localStorage.setItem('parentChildren', JSON.stringify(kids));
    } else {
        // Retrieve children's names from local storage
        const storedKids = JSON.parse(localStorage.getItem('parentChildren'));
        displayKids(storedKids);
    }
});

function displayKids(kidsArray) {
    const selectKid = document.getElementById('select-kid');
    const kidImages = document.querySelectorAll('.kid-images img');

    kidsArray.forEach((kid, index) => {
        const option = document.createElement('option');
        option.value = `kid${index + 1}`;
        option.textContent = kid;
        selectKid.appendChild(option);

        if (kidImages[index]) {
            kidImages[index].setAttribute('src', `images/${kid.toLowerCase()}.png`);
            kidImages[index].setAttribute('alt', kid);
        }
    });
}
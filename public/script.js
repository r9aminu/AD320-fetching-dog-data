// get data using breedId
function fetchBreedInfo(breedId) {
    fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`)
        .then(response => response.json())
        .then(data => {
            showBreedInfo(data.data.attributes);
        })
        .catch(error => console.error('Cannot fetch breed details:', error));
}

// display information about breeed
function showBreedInfo(breedInfo) {
    const breedInfoContainer = document.getElementById('breedInfo');
    breedInfoContainer.innerHTML = `<h2>${breedInfo.name}</h2>
                               <p>${breedInfo.description}</p>`;
}

// display different breeds of dogs
function displayDogBreeds() {
    fetch('https://dogapi.dog/api/v2/breeds')
        .then(response => response.json())
        .then(data => {
            const breedsList = document.getElementById('breedList');
            
            data.data.forEach(breed => {
                const breedListItem = document.createElement('li');
                breedListItem.textContent = breed.attributes.name;

                breedListItem.id = `breed${breed.id}`;

                // Add a click event listener to fetch breed details on click
                breedListItem.addEventListener('click', () => {
                    fetchBreedInfo(breed.id);
                });

                breedsList.appendChild(breedListItem);
            });
        })
        .catch(error => console.error('Cannot fetch breeds:', error));
}

// show random facts about dogs
function displayDogFacts() {
    fetch('https://dogapi.dog/api/v2/facts')
        .then(response => response.json())
        .then(data => {
            const factsContainer = document.getElementById('dogFacts');
            // Display dog facts in the container
            factsContainer.innerHTML = data.data.map(fact => `<p>${fact.attributes.body}</p>`).join('');
        })
        .catch(error => console.error('Cannot find facts:', error));
}

// show dog groups
function displayDogGroups() {
    fetch('https://dogapi.dog/api/v2/groups')
        .then(response => response.json())
        .then(data => {
            const groupsContainer = document.getElementById('dogGroups');

            data.data.forEach(group => {
                const groupId = group.id;
                const groupElement = document.createElement('div');
                groupElement.textContent = group.attributes.name;
                
                // clicking will show group details
                groupElement.addEventListener('click', () => {
                    fetchGroupInfo(groupId);
                });

                groupsContainer.appendChild(groupElement);
            });
        })
        .catch(error => {
            console.error('Cannot find groups:', error);
        });
}

// call all the functions
displayDogBreeds();
displayDogFacts();
displayDogGroups();

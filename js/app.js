// Load data from API
const loadFeatures = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayFeatures(data.data.tools.slice(0,6));
}

// function compareByDate(a, b) {
//     const dateA = new Date(a.published_in);
//     const dateB = new Date(b.published_in);
//     return dateA - dateB;
// }

const displayFeatures = features => {
    const featuresContainer = document.getElementById('features-container');
    featuresContainer.innerHTML = '';
    
    // Sorted data
    // const sortByDate = document.getElementById("sort-button").addEventListener('click', function(){
    //     features.sort(compareByDate);
    //     // Display the sorted features on the page
    //     // ...
    //   });

    // slice feature with 6 items
    // const seeMore = document.getElementById('see-more-section');
    // if (features.length > 6) {
    //     features = features;
    //     seeMore.classList.remove('d-none');
    // }


    features.forEach(feature => {
        const featureDiv = document.createElement('div');
        featureDiv.classList.add('col');
        featureDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${feature.image}" class="card-img-top rounded-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="features card-text text-muted fw-light">${feature.features}</p>
            </div>
            <div class="gap-5 d-flex justify-content-between align-items-center">
                <div class="card-footer mt-2">
                    <strong class="feature-name">${feature.name}</strong>
                    <p class="fav-icon text-muted"> <i class="fa-solid fa-calendar-days"></i> ${feature.published_in}</p>
                </div>
                <div>
                    <button onclick="showDetails('${feature.id}')" data-bs-toggle="modal" data-bs-target="#featureDetailModal" class="arrow rounded-pill"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            </div>
            `;
        featuresContainer.appendChild(featureDiv);
    })
    // Stop Spinner
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

// Add click handler with button See More
const restItem = document.getElementById('see-more-btn').addEventListener('click', function () {
    const loadFeatures = async () => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`
        const res = await fetch(url);
        const data = await res.json();
        displayFeatures(data.data.tools);
    }
    loadFeatures();
})

// Start spinner
toggleSpinner(true);

loadFeatures();


const showDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}

displayDetails = details => {
    console.log(details);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.classList.add('col');

    // Integrations
    // integrations.forEach(integration => {
    //     const data = getDataFromIntegration(integration);
    //     console.log(data ? data : "no data found");
    //   });
      

    // Multiply accuracy with 100
    const accuracyScore = details.accuracy.score * 100;
    detailsContainer.innerHTML = `
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex justify-content-between g-5">
            <div class="details-section-container container ps-5">
                <h1 class="details-description">${details.description}</h1>
                <div class="d-flex gap-5">
                    <p class="green">${details.pricing[0].price}</p>
                    <p class="orange">${details.pricing[1].price}</p>
                    <p class="red">${details.pricing[2].price}</p>
                </div>
                <div class="container px-5 d-flex gap-5 justify-content-between">
                    <p>Features</p>
                    <p>Integration</p>
                </div>
                <div class="d-flex gap-5">
                    <div>
                        <ul>
                            <li>${details.features[1].feature_name}</li>
                            <li>${details.features[2].feature_name}</li>
                            <li>${details.features[3].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>${details.integrations[0]}</li>
                            <li>${details.integrations[1]}</li>
                            <li>${details.integrations[2]}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="detail-image">
                <div class="card" style="width: 18rem;">
                    <img src="${details.image_link[0]}" class="card-img-top" alt="...">
                    <div class="input-text">
                        <p class="card-text">${details.input_output_examples[0].input}</p>
                        <p class="card-text">${details.input_output_examples[1].input}</p>
            
                    </div>
                    </div>
                        <button id="accuracy-button" class="btn-accuracy btn btn-danger">${accuracyScore ? accuracyScore : 'No Accuracy'}% accuracy</button>
                    </div>
                </div>
            </div>
        </div>
        
    `

}


// showDetails();
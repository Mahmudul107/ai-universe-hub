// Load data from API
const loadFeatures = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayFeatures(data.data.tools);
}

const displayFeatures = features =>{
    const featuresContainer = document.getElementById('features-container');
    // featuresContainer.textContent = '';

    // slice feature with 6 items
    const seeMore = document.getElementById('see-more-section');
    if(features.length > 6){
        features = features.slice(0,6);
        seeMore.classList.remove('d-none');
    }

    features.forEach(feature =>{
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
                    <button onclick="showDetails('${feature.id}')" data-bs-toggle="modal" data-bs-target="#arrowDetailModal" class="arrow rounded-pill"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            </div>
            `;
            featuresContainer.appendChild(featureDiv);
        })
    // Stop Spinner
    toggleSpinner(false);
}

const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

 // Add click handler with button See More
const restItem = document.getElementById('see-more-btn').addEventListener('click', function(){
    // loadFeatures();
 })

// Start spinner
toggleSpinner(true);

loadFeatures();


const showDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch (url);
    const data = await res.json();
    displayDetails(data.data);
}

displayDetails = feature =>{
    console.log(feature);  
    const modalDescription = document.getElementById('arrowDetailModalLabel');
    modalDescription.innerText = feature.description;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="d-flex gap-5">
            <p class="green">${feature.pricing[0].price}</p>
            <p class="orange">${feature.pricing[1].price}</p>
            <p class="red">${feature.pricing[2].price}</p>
        </div>
        <div class="container px-5 d-flex gap-5 justify-content-between">
            <p>Features</p>
            <p>Integration</p>
        </div>
        <div class="d-flex gap-5">
            <div>
                <ul>
                    <li>${feature.features[1].feature_name}</li>
                    <li>${feature.features[2].feature_name}</li>
                    <li>${feature.features[3].feature_name}</li>
                </ul>
            </div>
             <div>
                <ul>
                    <li>${feature.integrations[0]}</li>
                    <li>${feature.integrations[1]}</li>
                    <li>${feature.integrations[2]}</li>
                </ul>
            </div>
        </div>
    `
}

// showDetails();
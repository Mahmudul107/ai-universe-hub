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

    // slice feature items
    features = features.slice(0,6);
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
                    <button class="arrow rounded-pill"><i class="fa-solid fa-arrow-right"></i></button>
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

toggleSpinner(true);
loadFeatures();
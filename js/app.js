// Load data from API
const loadFeatures = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayFeatures(data.data.tools);
}

const displayFeatures = features =>{
    const featuresContainer = document.getElementById('features-container');
    features.forEach(feature =>{
        const featureDiv = document.createElement('div');
        featureDiv.classList.add('col');
        featureDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${feature.image}" class="card-img-top rounded-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text text-muted fw-light">${feature.features}</p>
            </div>
            <div class="card-footer">
                <strong class="">${feature.name}</strong>
            </div>
        </div>
        `;
        featuresContainer.appendChild(featureDiv);
    })
}

loadFeatures();
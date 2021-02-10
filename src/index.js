// DOM ELEMENTS
const fetchURL = 'http://localhost:3000/spiceblends/1'
const spiceImages = document.querySelector('#spice-images')
const spiceDetails = document.querySelector('#spice-blend-detail')
const ingredientsList = spiceDetails.querySelector('.ingredients-list') 

// EVENT LISTENERS
window.addEventListener('load', getASpice)
document.body.addEventListener('submit', submitHandler)

function submitHandler(e){
    e.preventDefault()
    switch (true) {
        case (e.target.id === "update-form"):
            const title  = e.target['title'].value
            updateBlend(title)
        break
        case (e.target.id === "ingredient-form"):
            const ingredient = e.target['name'].value
            addIngredient(ingredient)
        break
    }
}



// LOGIC HANDLERS
function getASpice(){
    fetch(fetchURL)
    .then(response => response.json())
    .then(data => renderASpice(data))
}



function updateBlend(title){
    fetch(fetchURL, {
        method: "PATCH",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({title})
    })
    .then(response => response.json())
    .then(data => renderASpice(data))
}


function renderASpice(spiceData){
    spiceDetails.dataset.id = spiceData.id
    
    const image = spiceDetails.querySelector('.detail-image')
    image.src = spiceData.image
    const title = spiceDetails.querySelector('h2')
    title.textContent = spiceData.title
    
    if (spiceData.ingredients){
        spiceData.ingredients.forEach(ingredient => {
            const ingredientName = ingredient.name
            addIngredient(ingredientName)
        })
    }
}

function addIngredient(ingredientName){
    const ingredLi = document.createElement('li')
    ingredLi.classname = "ingredient"
    ingredLi.textContent = ingredientName
    ingredientsList.append(ingredLi)
}
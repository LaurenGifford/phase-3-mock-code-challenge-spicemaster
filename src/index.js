// DOM ELEMENTS
// const fetchSpicesURL = 'http://localhost:3000/spiceblends/1'
const fetchSpicesURL = 'http://localhost:3000/spiceblends'
const fetchIngredURL = 'http://localhost:3000/ingredients'
const spiceImages = document.querySelector('#spice-images')
const spiceDetails = document.querySelector('#spice-blend-detail')
const ingredientsList = spiceDetails.querySelector('.ingredients-list')
// const id = spiceDetails.dataset.id

// EVENT LISTENERS
window.addEventListener('load', getASpice(1))
window.addEventListener('load', getAllSpices)
document.body.addEventListener('submit', submitHandler)
spiceImages.addEventListener('click', (e) =>{
    const spiceId = e.target.dataset.id
    getASpice(spiceId)
})

function submitHandler(e){
    e.preventDefault()
    switch (true) {
        case (e.target.id === "update-form"):
            const title  = e.target['title'].value
            // const id = spiceDetails.dataset.id
            updateBlend(title)
        break
        case (e.target.id === "ingredient-form"):
            const ingredient = e.target['name'].value
            updateIngredients(ingredient)
        break
    }
}



// LOGIC HANDLERS
function getAllSpices(){
    fetch(`${fetchSpicesURL}`)
    .then(response => response.json())
    .then(spiceBlendData => displayPics(spiceBlendData))
}


function getASpice(id){
    fetch(`${fetchSpicesURL}/${id}`)
    .then(response => response.json())
    .then(data => renderASpice(data))
}


function updateBlend(title){
    const id = spiceDetails.dataset.id
    fetch(`${fetchSpicesURL}/${id}`, {
        method: "PATCH",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({title})
    })
    .then(response => response.json())
    .then(data => renderASpice(data))
}

function updateIngredients(name){
    const spiceblendId = parseInt(spiceDetails.dataset.id)
    fetch(`${fetchIngredURL}`, {
        method: "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({name, spiceblendId})
    })
    .then(response => response.json())
    .then(ingredientData => {
        const ingredientName = ingredientData.name
        addIngredient(ingredientName)
    })
}

function displayPics(spicyData){
    spicyData.forEach(data => {
        const spicePic = document.createElement('img')
        spicePic.className = 'spice-pic'
        spicePic.src = data.image
        spicePic.dataset.id = data.id
        spiceImages.append(spicePic)
    })
}


function renderASpice(spiceData){
    spiceDetails.dataset.id = spiceData.id
    
    const image = spiceDetails.querySelector('.detail-image')
    image.src = spiceData.image
    const title = spiceDetails.querySelector('h2')
    title.textContent = spiceData.title
    
    // if (spiceData.ingredients){
    //     ingredientsList.innerHTML = 
    //     spiceData.ingredients.forEach(ingredient => {
    //         const ingredientName = ingredient.name
    //         addIngredient(ingredientName)
    //     })
    // }



    if (spiceData.ingredients){
        spiceData.ingredients.forEach(ingredient => {
            const ingredientName = ingredient.name
            addIngredient(ingredientName)
        })
    }
}

function addIngredient(ingredientName){
    // `
    // <li class="ingredient" >${ingredientName}</li>
    // `
    const ingredLi = document.createElement('li')
    ingredLi.classname = "ingredient"
    ingredLi.textContent = ingredientName
    ingredientsList.append(ingredLi)
}


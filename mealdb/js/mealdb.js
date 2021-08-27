const loadMeals =(searchText) => {
    if(searchText == '') {
        document.getElementById('spinner').classList.add('d-none');
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(res => res.json())
    .then(data => displayMeals(data))
    .catch(error =>{
        document.getElementById('spinner').classList.add('d-none');
        document.getElementById('error').style.display = "block";
        console.log(error)
    })
}

document.getElementById('search-btn').addEventListener('click', () =>{
    document.getElementById('cards-container').textContent = '';
    document.getElementById('error').style.display = "none";
    document.getElementById('spinner').classList.remove('d-none')
    const input = document.getElementById('search-input');
    loadMeals(input.value);
    input.value = '';
});

const displayMeals = data =>{
    const meals = data.meals;
    const cards = document.getElementById('cards-container');
    meals.forEach(meal =>{
        const div = document.createElement('div');
        const mealsText = meal.strInstructions;
        div.innerHTML = `
        <div class="col">
        <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${mealsText.slice(0,200)}...</p>
            <button type="button" class="btn btn-outline-dark btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="showDetails(${meal.idMeal})">
            More
            </button>
          </div>
        </div> `;
      cards.appendChild(div);
    });
    document.getElementById('spinner').classList.add('d-none');
    console.log(data.meals)
}
const showDetails =async id =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const resource = await fetch(url);
    const data  = await resource.json();
    const meal = data.meals[0];
    const modal = document.getElementById('modal-body');
    modal.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">${meal.strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <h6>Category: ${meal.strCategory}<h6>
        <hr>
        <h6>Ingredients</h6>
        <ol id="modal-list">
            <li><span>${meal.strIngredient1}</span><span>${meal.strMeasure1}</span></li>
            <li><span>${meal.strIngredient2}</span><span>${meal.strMeasure2}</span></li>
            <li><span>${meal.strIngredient3}</span><span>${meal.strMeasure3}</span></li>
            <li><span>${meal.strIngredient4}</span><span>${meal.strMeasure4}</span></li>
            <li><span>${meal.strIngredient5}</span><span>${meal.strMeasure5}</span></li>
            <li><span>${meal.strIngredient6}</span><span>${meal.strMeasure6}</span></li>
            <li><span>${meal.strIngredient7}</span><span>${meal.strMeasure7}</span></li>
            <li><span>${meal.strIngredient8}</span><span>${meal.strMeasure8}</span></li>
            <li><span>${meal.strIngredient9}</span><span>${meal.strMeasure9}</span></li>
            <li><span>${meal.strIngredient10}</span><span>${meal.strMeasure10}</span></li>
            <li><span>${meal.strIngredient11}</span><span>${meal.strMeasure11}</span></li>
            <li><span>${meal.strIngredient12}</span><span>${meal.strMeasure12}</span></li>
            <li><span>${meal.strIngredient13}</span><span>${meal.strMeasure13}</span></li>
            <li><span>${meal.strIngredient14}</span><span>${meal.strMeasure14}</span></li>
            <li><span>${meal.strIngredient15}</span><span>${meal.strMeasure15}</span></li>
            <li><span>${meal.strIngredient16} </span><span>${meal.strMeasure16}</span></li>
            <li><span>${meal.strIngredient17}</span><span>${meal.strMeasure17}</span></li>
            <li><span>${meal.strIngredient18}</span><span>${meal.strMeasure18}</span></li>
            <li><span>${meal.strIngredient19}</span><span>${meal.strMeasure19}</span></li>
            <li><span>${meal.strIngredient20}</span><span>${meal.strMeasure20}</span></li>
        </ol>
        <hr>
        <h6>Instructions</h6>
        <p>${meal.strInstructions}<p>
        <hr>
        <a href="${meal.strYoutube}" target="balnk"> <button class="btn btn-danger btn-sm">Watch on Youtube</button></a>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    `
}

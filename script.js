const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal')

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = ''

    // Get search term
    const term = search.value

    // Check for empty
    if(term.trim()){
        //make a getch request, if it's a Get we don't need to specify the method
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
            console.log(data)
            resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`
            // check- are there any meals for the search term?
            if(data.meals == null){
                resultHeading.innerHTML = `<p>There are no search results. Try again! </p>`
            } else {
                meals.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `
                ).join('')

            }
        
        })
        // Clear search text
        search.value = ''
    } else {
        alert('Please enter a search term')
    }
}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]
            addMealToDOM(meal)
        })


}

// Add meal to DOM
function addMealToDOM(meal){
    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        //is there an ingredient?
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            //if it's not found
            break;
        }
    }

    single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}"/>
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ``}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ``}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>`;
}



// Event listeners
submit.addEventListener('submit', searchMeal)
mealsEl.addEventListener('click', e => {
    // gives us the meal element that we click
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID)
    }
})
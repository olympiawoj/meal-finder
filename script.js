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


// Event listeners
submit.addEventListener('submit', searchMeal)
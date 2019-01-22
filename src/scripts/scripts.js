fetch("http://localhost:8088/foods")
.then(response => response.json())
.then(myParsedFoods => {
    myParsedFoods.forEach(food => {
       
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
            .then(response => response.json())
            .then(productInfo => {
                
                food.ingredients = productInfo.product.ingredients_text
                food.country = ""
                food.calories = productInfo.product.nutriments.energy
                food.fat = productInfo.product.nutriments.fat
                food.sugar = productInfo.product.nutriments.sugars

                const foodAsHTML = foodDOMComponent(food)

                writeToDom(foodAsHTML)
            })
    })
})

let foodDOMComponent = (foodItem) => `
 <div class="card foodCard" style="width: 18rem;">
<div class="card-body" "oneFood">
  <h5 class="card-title foodName">${foodItem.name}</h5>
  <h6 class="card-subtitle mb-2 text-muted foodcategory">${foodItem.category}</h6>
  <p class="card-text foodEthnicity">Ethnicity: ${foodItem.ethnicity}</p>
  <p class="card-text foodingredients">Ingredients: ${foodItem.ingredients}</p>
  <p class="card-text foodCalories">Calories: ${foodItem.calories}cal</p>
  <p class="card-text foodFat">Fat: ${foodItem.fat}g</p>
  <p class="card-text foodSugar">Sugar: ${foodItem.sugar}g</p>
</div> 
</div>`

let foodSection = document.querySelector(".foodList")

const writeToDom = (whatToPrint) => {
    foodSection.innerHTML += whatToPrint
}





    
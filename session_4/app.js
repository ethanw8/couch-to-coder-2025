
document.addEventListener("DOMContentLoaded", async () => {
    const response =
        fetch("http://localhost:3000/recipes");
    const recipes = await response.json();

    for (recipe of recipes) {
        const recipeContainer = document.createElement("div")

        //create the name tag (h3), add text to it, glue it onto the container
        const nameTag = document.createElement("h3");
        nameTag.innerText = recipe.name;
        recipeContainer.appendChild(nameTag);
        //same with cuisine and time tags
        const cuisineTag = document.createElement("p");
        cuisineTag.innerText = recipe.cuisine;
        recipeContainer.appendChild(cuisineTag);
        const timeTag = document.createElement("p");
        timeTag.innerText = recipe.time;
        recipeContainer.appendChild(timeTag);
        //create the unordered list element for the ingredients
        const ingredientsListTag = document.createElement("ul");
        //create the list items for the ingredients list
        const ingredientsListItemTag = document.createElement("li");

        ingredientsListItemTag.innerText = recipe.ingredients;
        ingredientsListTag.appendChild(ingredientsListItemTag);
        recipeContainer.appendChild(ingredientsListTag);
        recipeContainer.appendChild(document.createElement("br"));
        //create the ordered list element for the steps of the recipe
        const stepsListTag = document.createElement("ol");
        //create the list items for the steps list
        const stepsListItemTag = document.createElement("li");
        stepsListItemTag.innerText = recipe.steps;
        stepsListTag.appendChild(stepsListItemTag);
        recipeContainer.appendChild(stepsListTag);
        const recipeList = document.querySelector("#recipe-list");
        recipeList.appendChild(recipeContainer);


    }

    //create the unordered list element for the ingredients
    const ingredientsListTag = document.createElement("ul");
    //create the list items for the ingredients list
    for (ingredient of recipe.ingredients) { //remember, this property is an array initself!
        const ingredientsListItemTag = document.createElement("li");
        ingredientsListItemTag.innerText = ingredient;
        ingredientsListTag.appendChild(ingredientsListItemTag);
    }
    recipeContainer.appendChild(ingredientsListTag);

    const newRecipeForm = document.querySelector("form");
    newRecipeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(event.target);
        event.preventDefault();
        const newRecipe = {};
        newRecipe.name = event.target.name.value;
        newRecipe.cuisine = event.target.cuisine.value;
        newRecipe.time = event.target.time.value;
        const ingredients = event.target.ingredients.value.split(/\r?\n/);
        newRecipe.ingredients = ingredients;
        const steps = event.target.steps.value.split(/\r?\n/);
        newRecipe.steps = steps;

        fetch('http://localhost:3000/recipes', {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(newRecipe) // Convert the JSON object to a string
        })
    })

    const cuisineResponse = await fetch("http://localhost:3000/cuisine-data");
    const cuisineData = await cuisineResponse.json();
    
    const xValues = Object.keys(cuisineData);
    const yValues = Object.values(cuisineData);

    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Cuisine Popularity"
            }
        }
    });








})

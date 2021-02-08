// search section
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    // clearArea();
    const searchForm = document.getElementById('search-area');
    let mealName = searchForm.value;

    // fullName or letter
    if (mealName.length > 1)
        searchByFullName(mealName);
    else
        searchByFirstLetter(mealName);
});

// const clearArea = () =>{
//     document.getElementById("message").innerHTML(`<h3> ghedf</h3>`);
// }

// search by firstLetter function
const searchByFirstLetter = (mealName) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        creatingMealDetail(meals);
    })
    .catch(error => {
        const mealDiv = document.createElement('div');
        const htmlTag = `<h3>Error! No meal is available</h3>`;
        mealDiv.innerHTML = htmlTag;
        mealDiv.addEventListener('click',mealDivClick)
        document.getElementById("message").appendChild(mealDiv);
    })
};

// search by fullName function
const searchByFullName=(mealName) =>{
     let result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals;
        creatingMealDetail(meals);
    })
    .catch(error => {
        const mealDiv = document.createElement('div');
        const htmlTag = `<h3>Error! No meal is available</h3>`;
        mealDiv.innerHTML = htmlTag;
        mealDiv.addEventListener('click',mealDivClick)
        document.getElementById("message").appendChild(mealDiv);
    })
};

const creatingMealDetail = (meals) => {
    meals.forEach(element => {
            const mealDiv = document.createElement('div');
            const htmlTag = `<div class="card h-100 shadow p-3 mb-5 bg-white rounded"  >
                            <div class="cardImgHolder">
                                 <img src="${element.strMealThumb}"class="card-img-top cardImgFeatures">
                              </div>
            
                             <div class="card-body">
                                 <h3>${element.strMeal}</h3>
                             </div>
                            
                            `;
            
            mealDiv.innerHTML = htmlTag;
            mealDiv.addEventListener('click',mealDivClick(element.strMeal))
            document.getElementById("card-element").appendChild(mealDiv);
        });
};

function mealDivClick(mealName)

    let result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(res => res.json())
        .then(data => {
            let name = "";
            let url = "";
            console.log(data.meals.length);
            for (let i = 0; i < data.meals.length; i++){
                if (mealName === data.meals[i].strMeal) {
                    name = data.meals[i].strMeal;
                    url = data.meals[i].strMealThumb;
                    break;
                }
            }
            const element = data.meals[0];
            const mealDiv = document.createElement('div');
            const htmlTag = `<img src="${url}">
                            <h2>${name}</h2>
                            <h4>Ingridients</h4>
                            <ul>
                                <li>${element.strIngredient1}</li>
                                <li>${element.strIngredient2}</li>
                                <li>${element.strIngredient3}</li>
                                <li>${element.strIngredient4}</li>
                                <li>${element.strIngredient5}</li>
                            </ul>
                            `;
            mealDiv.innerHTML = htmlTag;
            document.getElementById("card-element").appendChild(mealDiv);
    })
}
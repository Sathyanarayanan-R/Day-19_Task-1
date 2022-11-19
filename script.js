//Main Div

const mainDivEle = document.createElement('div');
mainDivEle.setAttribute('class', 'flex-container');

// H1 Element

const h1Ele = document.createElement('h1');
h1Ele.innerText = 'Recipes Videos';
h1Ele.setAttribute('class', 'h1-align');

// async/await Function to get the Meal names, Images & Videos from the MealsDB API
const getMealsDetails = async () => {

    try {

        // MealsDB API request & its response
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
        const mealsObj = await response.json();

        // forEach array method to get the Meal names, Images & Videos from mealsObj.meals[]
        mealsObj.meals.forEach((meal) => {

            try {

                // inner Image Div

                const imgDivEle = document.createElement('div');

                imgDivEle.setAttribute('class', 'img-div col-sm-6 col-md-6 col-lg-4 col-xl-3');

                // Dish Name Div

                const dishNameEle = document.createElement('div');
                dishNameEle.innerText = meal.strMeal;
                dishNameEle.setAttribute('class', 'dish-name');

                // Image Element

                const imgEle = document.createElement('img');
                imgEle.src = meal.strMealThumb;
                imgEle.setAttribute('class', 'img-width');

                imgEle.setAttribute('data-bs-toggle', 'modal');
                imgEle.setAttribute('data-bs-target', '#exampleModal');
                imgEle.setAttribute('data-bs-whatever', '@getbootstrap');

                imgDivEle.append(dishNameEle, imgEle);

                mainDivEle.append(imgDivEle);

                // Click Listener Function for Images

                imgEle.addEventListener('click', () => {

                    // Modal Title
                    const mealTitleEle = document.getElementById('exampleModalLabel');
                    mealTitleEle.innerText = meal.strMeal;

                    // Video Element which can be viewed in Modal
                    const videoID = meal.strYoutube.slice(meal.strYoutube.length - 11, meal.strYoutube.length);
                    const addVideo = document.getElementById('video-content');
                    addVideo.innerHTML = `<iframe id="videoId" width="100%" height="100%" src="https://www.youtube.com/embed/${videoID}" title="Turkish Vegetable Lentil Soup Recipe – Traditional Turkish Red Lentil" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                })
            }
            catch (error) {
                console.log(error);
            }

        })

        document.body.append(h1Ele, mainDivEle);

        const btnCloseEle = document.getElementById('btnClose');

        btnCloseEle.addEventListener('click', (event) => {
            event.stopPropagation();
            const video = document.getElementById("videoId");
            video.src = '';
        });

    }
    catch (error) {
        console.log(error);
    }
}

getMealsDetails();
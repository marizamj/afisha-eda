const getRecipes = require('./getRecipes');
const getRecipe = require('./getRecipe');

getRecipes({ page: 1, category: 'salaty' }, (err, recipes) => {
  if (err) {
    if (err.error) {
      console.log(`Error: ${err.error}`);
    }

    if (err.status) {
      console.log(`Status code: ${err.status}`);
    }

  } else {
    // console.log(recipes[0]);
    // return recipes[0];

    getRecipe(recipes[0].id, (err1, recipe) => {
      console.log(recipe);
    });
  }

});

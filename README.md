### Afisha Eda API

Afisha Eda (http://eda.ru) API.

#### Install

`npm install afisha-eda`

#### Example

```js
const eda = require('afisha-eda');

eda.getRecipes({ page: 1 }, recipes => {

  // get recipes from page 1
  // params object should contain either 'page' or 'category' or both of them

  console.log(recipes);

  /*
  [
    {
      id: '/recepty/vypechka-deserty/brauni-brownie-20955?from=recipescatalog',
      title: 'Брауни (brownie)',
      url: 'http://eda.ru/recepty/vypechka-deserty/brauni-brownie-20955?from=recipescatalog',
      author: 'Anastasia Sheveleva',
      authorUrl: 'http://eda.ru/avtory/692617',
      count: 20054,
      rating: 92,
      time: '40 минут',
      hasVideo: true,
      image: 'http://img07.rl0.ru/eda/c172x172/s1.afisha-eda.ru/StaticContent/VideoFileCovers/235.jpg'
    },

    ...
  ]
  */

eda.getRecipe(id, recipe => {

  console.log(recipe);

  /*
  {
    id: '/recepty/salaty/salat-iz-krasnoj-fasoli-s-tvorozhnim-sirom-krasnim-lukom-i-sezonnim-salatom-16922',
    url: 'http://eda.ru/recepty/salaty/salat-iz-krasnoj-fasoli-s-tvorozhnim-sirom-krasnim-lukom-i-sezonnim-salatom-16922',
    name: 'Салат из красной фасоли с творожным сыром, красным луком и сезонным салатом',
    calories: 341,
    proteins: 11.1,
    carbohydrates: 22.7,
    fats: 23,
    ingredients: [
      {
        name: 'Руккола',
        amount: '100 г',
        id: '/wiki/ingredienty-zelen-travy/rukkola-13888',
        url: 'http://eda.ru/wiki/ingredienty-zelen-travy/rukkola-13888'
      },

      ...
    ]
  }
  */

})

});
```

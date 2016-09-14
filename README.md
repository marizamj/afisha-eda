### Afisha Eda API

Afisha Eda (http://eda.ru) API.

#### Install

`npm install afisha-eda`

#### Example

```js
const eda = require('afisha-eda');

eda.loadRecipes(1, recipes => {

	// recipes from page 1
	console.log(recipes);

	/*
	[
		{
			id: 'brauni-brownie-20955',
	    title: 'Брауни (brownie)',
	    url: '/recepty/vypechka-deserty/brauni-brownie-20955?from=recipescatalog',
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
});
```

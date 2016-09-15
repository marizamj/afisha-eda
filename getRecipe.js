const cheerio = require('cheerio');
const request = require('request');

function textToNumber(text) {
  return Number(text.replace(',', '.'));
}

function getRecipe(id, callback) {
  request(`http://eda.ru${id}`, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(body);

      const energyList = $('.b-paper__inner .energy-value__list .item');

      const ingredients = $('.b-ingredients-list .ingredient').map((i, ingredient) => {

        const href = $(ingredient).find('.name').attr('href');

        return {
          name:   $(ingredient).find('.name').text(),
          amount: $(ingredient).find('.amount').text(),
          id:     href || '',
          url:    href ? ('http://eda.ru' + href) : ''
        }
      }).get();

      const recipe = {
        id,
        url:          'http://eda.ru' + id,
        name:          $('.s-recipe-name').text(),
        calories:      textToNumber(energyList.find('span:contains("Калорийность")').next().text()),
        proteins:      textToNumber(energyList.find('span:contains("Белки")').next().text()),
        carbohydrates: textToNumber(energyList.find('span:contains("Углеводы")').next().text()),
        fats:          textToNumber(energyList.find('span:contains("Жиры")').next().text()),
        ingredients
      }

      callback(err, recipe);
    } else {
      callback({
        error: err,
        status: res.statusCode
      }, null);
    }
  });
}

module.exports = getRecipe;

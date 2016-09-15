const cheerio = require('cheerio');
const request = require('request');

function getRecipes(params, callback) {
  let url;

  if (params.category && params.page) {
    url = `http://eda.ru/recepty/${params.category}/page${params.page}`
  } else if (!params.category && params.page) {
    url = `http://eda.ru/recepty/page${params.page}`;
  } else {
    callback({
      error: 'Wrong type of params. Try again.'
    }, null);
    return;
  }

  request(url, (err, res, body) => {

    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(body);

      const recipes = $('.b-recipe-widget').map(function (i, recipe) {
        const id = $(this)
          .find('.b-recipe-widget__name a')
          .attr('href')
          .replace('?from=recipescatalog', '');

        const url = 'http://eda.ru'
          + $(this)
          .find('.b-recipe-widget__name a')
          .attr('href')
          .replace('?from=recipescatalog', '');

        return {
          id,
          url,
          title:     $(this).find('.b-recipe-widget__name a').text(),
          author:    $(this).find('.b-recipe-widget-author span.name').text(),
          authorUrl: $(this).find('.b-recipe-widget-author .profile-link').attr('href'),
          count:     Number($(this).find('.count').text()),
          rating:    Number($(this).find('.b-recipe-rating .number').text()),
          time:      $(this).find('.time').text(),
          hasVideo:  $(this).find('.b-video-label').length > 0,
          image:     $(this).find('.b-recipe__figure img').attr('src'),
        }
      }).get();

      callback(err, recipes);
    } else {
      callback({
        error: err,
        status: res.statusCode
      }, null);
    }
  });
}

module.exports = getRecipes;


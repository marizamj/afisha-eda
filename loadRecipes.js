const cheerio = require('cheerio');
const http = require('http');

function request(page, callback) {
	var req = http.request({
		host: `eda.ru`,
	  path: `/recepty/page${page}`

	}, function(res) {
		const body = [];

		res.setEncoding('utf8');

		res.on('data', (chunk) => {
	    body.push(chunk);
	  });

		res.on('end', () => {
			callback(body.join(''));
		});
	});

	req.end();
}

function loadRecipes(page, callback) {

	request(page, html => {
		const $ = cheerio.load(html);

		const recipes = $('.b-recipe-widget').map(function (i, recipe) {
			const id = $(this)
				.find('.b-recipe-widget__name a')
				.attr('href')
				.replace('?from=recipescatalog', '')
				.split('/').pop();

			return {
				id,
				title:     $(this).find('.b-recipe-widget__name a').text(),
				url:       $(this).find('.b-recipe-widget__name a').attr('href'),
				author:    $(this).find('.b-recipe-widget-author span.name').text(),
				authorUrl: $(this).find('.b-recipe-widget-author .profile-link').attr('href'),
				count:     Number($(this).find('.count').text()),
				rating:    Number($(this).find('.b-recipe-rating .number').text()),
				time:      $(this).find('.time').text(),
				hasVideo:  $(this).find('.b-video-label').length > 0,
				image:     $(this).find('.b-recipe__figure img').attr('src'),
			}
		}).get();

		callback(recipes);
	});
}

module.exports = loadRecipes;


'use strict';

const getRecipe = require('../getRecipe');

const assert = require('assert');

describe('getRecipe', function() {
  this.timeout(10000);

  let recipe;

  before(done => {
    const id = '/recepty/salaty/salat-iz-krasnoj-fasoli-s-tvorozhnim-sirom-krasnim-lukom-i-sezonnim-salatom-16922';

    getRecipe(id, (err, _recipe) => {
      recipe = _recipe;
      done();
    });
  });

  it('should return an object', function(done) {

    assert.equal(typeof recipe, 'object');

    done();
  });

  it('should return correct values', function(done) {

    assert.equal(typeof recipe.name, 'string');
    assert.equal(typeof recipe.calories, 'number');
    assert.equal(Array.isArray(recipe.ingredients), true);
    assert.equal(typeof recipe.ingredients[0].name, 'string');

    done();
  });

  it('should contain correct keys', function(done) {
    const correctKeys = [
      'id',
      'url',
      'name',
      'calories',
      'fats',
      'proteins',
      'carbohydrates',
      'ingredients'
    ].sort();

    const keys = Object.keys(recipe).sort();

    assert.deepEqual(keys, correctKeys);

    done();
  });
});

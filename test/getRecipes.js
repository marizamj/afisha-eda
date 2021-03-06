'use strict';

const getRecipes = require('../getRecipes');

const assert = require('assert');

describe('getRecipes', function() {
  this.timeout(10000);

  let recipes;

  before(done => {
    getRecipes({ page: 1 }, (err, _recipes) => {
      recipes = _recipes;
      done();
    });
  });

  it('should return non empty array', function(done) {
    assert.equal(Array.isArray(recipes), true);
    assert.equal(recipes.length > 0, true);

    done();
  });

  it('should return correct values', function(done) {

    assert.equal(typeof recipes[0], 'object');
    assert.equal(typeof recipes[0].count, 'number');

    done();
  });

  it('should contain correct keys', function(done) {
    const correctKeys = [
      'id',
      'title',
      'url',
      'author',
      'authorUrl',
      'count',
      'rating',
      'time',
      'hasVideo',
      'image'
    ].sort();

    const keys = Object.keys(recipes[0]).sort();

    assert.deepEqual(keys, correctKeys);

    done();
  });
});

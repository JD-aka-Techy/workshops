const { myAdder } = require('./reducer.js');
var chai = require('chai');
var expect = chai.expect;


describe('Callback functions', () => {


  // return sum of numbers in array
  describe(`
    create a function called myAdder that takes two numbers 
    and returns the sum of the two numbers
    `, () => {

    it('myAdderCallback is a function', () => {
      expect(isAFunction(myAdder)).to.be.true
    });

    it('returns a number', () => {
      const testData = [
        [1,1,2], [2,1,3]
      ];
      testData.forEach((dp) => expect( myAdder(dp[0], dp[1])).to.equal(dp[2]));

    });

    xit('returns the sum of numbers passed in');

  });


  // reduce callback as map
  describe(`
    create a function called myDoublerPusher that takes an array, and a number
    multiplies the number by two
    adds it to the end of the array
    and then returns the array
  `, () => {

    it('returns an array');
    it('returns the array with an added item');
    it('returns the array with the original number doubled added');

  });


  // reduce callback returning an object that counts occurances of each item in the array
  describe(`
    create a function that takes an object of key value pairs (a string, and a number), and a string
    if the string is one of the objects keys, increment the number that belongs to the key
    if the string is not of of the object keys, set it as one with the value 1
  `, () => {

    it('returns an object');
    it('the object has the string passed in as a key');
    it('increments the value of the key if it already exists');
    it('sets the value of the key to 1 if it didnt already exist');
    
  });


  describe(`
    create a function that takes an array, number, and another number(index)
    if the index is an even number add the first number to the array and return it
    if the index is an odd number return the original array
  `, () => {

    it('returns the array with the number added if the index is even');
    it('returns the array unchanged if index is odd');

  });



});



describe('writing our own reduce function', () => {

  describe(`create a higher order function`, () => {

    it('is a function called myHOFunc');
    it('calls a function when passed in');

  });


  describe(`
    have your higher order function 
    take an array as its first parameter;
    a function as its second parameter;
    and have it call the callback passing in each item from the array`,
    () => {

      it('calls the function passed in for each item in the array.');

  });


  describe(`
    have your function take a third parameter as an initial starting value
    each time your function calls the callback function pass in the this value, the current item in the array
    and then replace the initialValue with the result of the callback. 
    Return this value from myHOFunc once you have finished with the whole array.
  `, () => {

    it('passes initialValue and the current array value to the callback function');
    it('replaces the initialValue passed into the callback with the result of the last time the callback was called');
    it('passes this new value in the next time the callback is called')
    it('returns the initialValue once we have looped over every item');
    it('for extra credit - passes in the first item of the array as an initialValue if we dont give it one');

  });


  describe(`
    for each item in the array you pass into the callback function, also provide
    the index of the item in the array
    and the whole original array
  `, () => {

    it('passes in the index of each item in the array');
    it('passes in the original array for each item in the array');

  });


  describe(`
    Make sure your function doesnt change the original array
  `, () => {
    it('doesnt change the original array');
  });


});







// ADVANCED - promise thens in series
// dont yet have any real life example or examples that use the 4th callback param or reduce's this






// helpers

function isAFunction(func) {
  return typeof func === 'function';
}

// gets argument names of functions
var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null)
    result = [];
  return result;
}
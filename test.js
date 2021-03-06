const { myAdder, myDoublerPusher, myResultFormatter, myArrayCounter, myReduceFunc, kittyRejigger } = require('./reducer.js');

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const _ = require('lodash');
chai.use(sinonChai);

// these tests could probably do with cleaning up a little bit, were written in a hurry
// maybe add works with reduce to show they are working as reduce callbacks?
describe('Callback functions', () => {


  // return sum of numbers in array
  describe(`
    create a function called myAdder that takes two numbers 
    and returns the sum of the two numbers
    `, () => {

    it('myAdderCallback is a function', () => {
      expect(isObject(myArrayCounter({}, 1))).to.be.true
    });

    it('returns a number', () => {
      expect(typeof myAdder(1,2)).to.equal('number')
    });

    it('returns the sum of numbers passed in', () => {
      const testData = [[1,1,2], [2,1,3], [142,1523, 1665], [0.3, 0.2, 0.5]];
      testData.forEach((dp) => expect( myAdder(dp[0], dp[1])).to.equal(dp[2]));
    });

  });


  // reduce callback as map
  describe(`
    create a function called myDoublerPusher that takes an array, and a number
    multiplies the number by two
    adds it to the end of the array
    and then returns the array
  `, () => {

    it('returns an array', () => {
      expect(Array.isArray(myDoublerPusher([], 1))).to.be.true;
    });

    it('returns the array with an added item', () => {
      expect(myDoublerPusher([], 2).length).to.equal(1);
      expect(myDoublerPusher([1,2,3], 4).length).to.equal(4);
    });

    it('returns the array with the original number doubled added',() => {
      expect(myDoublerPusher([], 1)).to.eql([2]);
    });

    it('returns the array with the original number doubled added to the end',() => {
      expect(myDoublerPusher([1,2],3)).to.eql([1,2,6]);
      expect(myDoublerPusher([1,2,3,4,5,6,1,2,3,4,5,6],7)).to.eql([1,2,3,4,5,6,1,2,3,4,5,6,14]);
    });

  });


  describe(`
    create a function called myResultFormatter
    that takes an array, a number, and another number(index)
    if the index is even turn it into a string in the format: studentId: {number}
    if the index is an odd number turn it into a string in the format: grade: {number}
    add the string to the array and return it.
  `, () => {

    it('returns an array', () => {
      expect(Array.isArray(myResultFormatter([], 1, 1))).to.be.true;
    });

    it('returns an array with a new item added', () => {
      expect(myResultFormatter([], 1, 1).length).to.equal(1);
    });

    it('returns the new item as a string', () => {
      expect(typeof myResultFormatter([], 1, 1)[0]).to.equal('string');
      expect(typeof myResultFormatter(['studentId: 1', 'grade: 2'], 1, 2)[2]).to.equal('string');
    });

    it('returns string of format "studentId: {number}" with an even index', () => {
      expect(myResultFormatter([], 1, 0)).to.eql(['studentId: 1']);
      expect(myResultFormatter(['studentId: 1', ''], 2, 4)).to.eql(['studentId: 1', '', 'studentId: 2']);
    });

    it('returns string of format "grade: {number}" with an odd index', () => {
      expect(myResultFormatter(['studentId: 1'], 2, 1)).to.eql(['studentId: 1', 'grade: 2']);
      expect(myResultFormatter(['studentId: 1', 'grade: 2', 'studentId: 2'], 5, 3)).to.eql(['studentId: 1', 'grade: 2', 'studentId: 2', 'grade: 5']);
    });

  });

  // NB: maybe add intermediate create an object challenge



  // reduce callback returning an object that counts occurances of each item in the array
  describe(`
    create a function called myArrayCounter 
    that takes an object of key value pairs (a string, and a number), and a string
    if the string is one of the objects keys, increment the number that belongs to the key
    if the string is not of of the object keys, set it as one with the value 1
  `, () => {

    it('returns an object', () => {
      expect(isObject(myArrayCounter({}, 'hello'))).to.be.true;
    });

    it('the object has the string passed in as a key', () => {
      expect(myArrayCounter({}, 'hello').hasOwnProperty('hello')).to.be.true;
      expect(myArrayCounter({ hello: 1 }, 'hello').hasOwnProperty('hello')).to.be.true;
    });

    it('increments the value of the key if it already exists', () => {
        expect(myArrayCounter({ hello: 1 }, 'hello')).to.eql({ hello: 2 });
    });

    it('sets the value of the key to 1 if it didnt already exist', () => {
        expect(myArrayCounter({}, 'hello')).to.eql({ hello: 1 });
    });
    
  });

});



describe('writing our own reduce function', () => {

  describe(`
    create a function called myReduceFunc
    it will take an array as its first function (called it arr)
    it will take a function as a parameter (call it callback )
    name this parameter, callback
    our function should call the callback function and return the result.
  `, () => {

    it('is a function called myReduceFunc', () => {
      expect(isAFunction(myReduceFunc)).to.be.true;
    });

    it('has a parameter named callback', () => {
      expect(getParamNames(myReduceFunc)).to.include('callback')
    });

    it('has a parameter named arr', () => {
      expect(getParamNames(myReduceFunc)).to.include('arr')
    });

    it('has a parameter in the right order for our little contrived example', () => {
      expect(getParamNames(myReduceFunc)[0]).to.equal('arr');
      expect(getParamNames(myReduceFunc)[1]).to.equal('callback');
    });

    it('calls the callback inside the function', () => {
      // const testCallback = chai.spy(() => {});
      const testCallback = sinon.spy();
      myReduceFunc([1], testCallback, 0);
      expect(testCallback).to.have.been.called;
    });

  });


  describe(`
    give your function a new third parameter called initialValue
    have your function loop through the array(arr) and on each iteration pass in 
    the initialValue from your parameter as the first value (this will make sense later on)
    and the item from this iteration as the second value.
    `,() => {

      it('has a new third parameter named initialValue', () => {
        expect(getParamNames(myReduceFunc)[2]).to.equal('initialValue');
      });

      it('calls the function passed in for each item in the array.', () => {
        const testCallback = sinon.spy();
        myReduceFunc([1,2,3], testCallback, 0);
        expect(testCallback).to.have.been.callCount(3);
        myReduceFunc([1], testCallback, 0);
        expect(testCallback).to.have.been.callCount(4);
      });

      // these will need cleaning up, abstract out the called with functionality
      it('calls the callback function and passes initialValue as its first parameter', () => {
        const calledWith = [];
        const testCallback = (param1, param2) => {
          calledWith.push(param1);
        };
        myReduceFunc([1], testCallback, 0);
        expect(calledWith).to.eql([0]);
      });

      it('calls the callback function with each item from the array as the second value', () => {
        const calledWith = [];
        const testCallback = (param1, param2) => {
          calledWith.push(param2);
        };
        myReduceFunc([1,2,3], testCallback, 0);
        expect(calledWith).to.eql([1,2,3]);
      });

  });


  describe(`
    Now each time you call the callback function replace the initialValue with the result of the callback, 
    and pass this new value into the next loop, 
    once there are no more loops, return the final value from your function.
  `, () => {

    it('passes initialValue to the calback on the first loop', () => {
        const calledWith = [];
        const testCallback = (acc, item) => {
          calledWith.push({acc, item});
        };
        myReduceFunc([1], testCallback, 42);
        expect(calledWith[0]).to.eql({ acc: 42, item: 1 });
    });

    it('replaces the initialValue with the result of each callback and passes this new value into the callback', () => {
      const calledWith = [];
      const testCallback = (acc, item) => {
        calledWith.push({acc, item});
        return 'im the new value'
      };
      myReduceFunc([1,2], testCallback, 42);
      expect(calledWith[1]).to.eql({ acc: 'im the new value', item: 2 }); 
    });

    it('returns the initialValue once we have looped over every item', () => {
      const testCallback = (a,b) => {
        return a + b
      }
      expect(myReduceFunc([1,2], testCallback, 10)).to.equal(13);
    });

    it('for extra credit - pass in the first item of the array as a first initialValue if we dont give it one', () => {
      const testCallback = (a,b) => {
        return a + b
      }
      expect(myReduceFunc([1,2], testCallback)).to.equal(3);
    });

  });


  describe(`
    for each item in the array you pass into the callback function, also provide
    the index of the item in the array
    and the whole original array
  `, () => {

    it('passes in the index of each item in the array', () => {
      const calledWith = [];
      const testCallback = (acc, item, index) => {
        calledWith.push({acc, item, index});
        return 'im the new value'
      };
      myReduceFunc([1,2], testCallback, 42);
      expect(calledWith[1]).to.eql({ acc: 'im the new value', item: 2, index: 1 }); 
    });

    it('passes in the original array for each item in the array', () => {
      const calledWith = [];
      const testCallback = (acc, item, index, arr) => {
        calledWith.push({acc, item, index, arr});
        return 'im the new value'
      };
      myReduceFunc([1,2], testCallback, 42);
      expect(calledWith[1]).to.eql({ acc: 'im the new value', item: 2, index: 1, arr: [1,2] }); 
    });

  });


  describe(`
    Make sure your function doesnt change the original array
  `, () => {
    it('doesnt change the original array', () => {
      const testArray = [1,2,3];
      const testCallback = (acc, item, index, arr) => {
        arr.splice(0,1)
        return item;
      }
      myReduceFunc(testArray, testCallback);
      expect(testArray).to.eql(testArray);
      expect(testArray).to.equal(testArray);

    });
  });


});



describe('kitty rejigger', () => {
  // map data from string csv to json
  // in format   Breed  name gender colour  birthdate              
  let csvString1 = `Breed,Name,Gender,Colour,DOB
Maine Coon,Fiona,Female,Orange,12/07/2016
RagDoll,Joelle,Female,Pink,12/20/2016
RagDoll,Major,Male,Yellow,04/11/2014
Maine Coon,Ric,Male,Blue,11/28/2013
Maine Coon,Martguerita,Female,Goldenrod,02/02/2017
Maine Coon,Selia,Female,Purple,04/08/2017
RagDoll,Nap,Male,Puce,12/27/2012
Siamese,Odey,Male,Green,12/02/2016
Maine Coon,Adriano,Male,Blue,04/03/2012
Persian,Alair,Male,Mauv,09/03/2014
Persian,Perri,Female,Maroon,12/28/2010
Maine Coon,Thomasine,Female,Red,02/21/2012
Maine Coon,Priscella,Female,Turquoise,02/08/2017
RagDoll,Bonnie,Female,Puce,07/07/2010
RagDoll,Putnem,Male,Mauv,08/03/2015
Maine Coon,Elspeth,Female,Red,10/02/2015
Persian,Dennie,Male,Puce,01/08/2016
Maine Coon,Lilllie,Female,Teal,03/29/2013
Siamese,Gib,Male,Indigo,06/06/2012
RagDoll,Cornelle,Female,Yellow,05/16/2013`

    let csvString2 = `Breed,Name,Gender,Colour,DOB
Maine Coon,Fiona,Female,Orange,12/07/2016
Maine Coon,Ric,Male,Blue,11/28/2013
Maine Coon,Martguerita,Female,Goldenrod,02/02/2017
Maine Coon,Selia,Female,Purple,04/08/2017
Siamese,Odey,Male,Green,12/02/2016
Maine Coon,Adriano,Male,Blue,04/03/2012
Persian,Alair,Male,Mauv,09/03/2014
Persian,Perri,Female,Maroon,12/28/2010
Maine Coon,Thomasine,Female,Red,02/21/2012
Maine Coon,Priscella,Female,Turquoise,02/08/2017
Maine Coon,Elspeth,Female,Red,10/02/2015
Persian,Dennie,Male,Puce,01/08/2016
Maine Coon,Lilllie,Female,Teal,03/29/2013
Siamese,Gib,Male,Indigo,06/06/2012`

  it('returns an object', () => {
     expect(isObject(kittyRejigger(csvString1))).to.be.true;
  });


  it('creates an item in the json result for each breed', () => {
    expect(Object.keys(kittyRejigger(csvString1)).length).to.equal(4);
    expect(Object.keys(kittyRejigger(csvString2)).length).to.equal(3);
  });

  it('has the right keys', () => {
    // dont have time to implement pattern matcher right now
    let actual = Object.keys(kittyRejigger(csvString1))
    expect(actual).to.have.same.members(['Maine Coon', 'Siamese', 'Persian', 'RagDoll' ]);

    actual = Object.keys(kittyRejigger(csvString2))
    expect(actual).to.have.same.members(['Maine Coon', 'Siamese', 'Persian' ]);
  })

  it('doesnt include the header line in the result', () => {
    // not ideal in a rush
    const str = JSON.stringify(kittyRejigger(csvString1))
    expect(str).not.to.contain('Breed')
  });

  it('contains the right results in the right format', () => {
    let expected1 = {"Maine Coon":[{"name":"Fiona","gender":"Female","colour":"Orange","dob":"12/07/2016"},{"name":"Ric","gender":"Male","colour":"Blue","dob":"11/28/2013"},{"name":"Martguerita","gender":"Female","colour":"Goldenrod","dob":"02/02/2017"},{"name":"Selia","gender":"Female","colour":"Purple","dob":"04/08/2017"},{"name":"Adriano","gender":"Male","colour":"Blue","dob":"04/03/2012"},{"name":"Thomasine","gender":"Female","colour":"Red","dob":"02/21/2012"},{"name":"Priscella","gender":"Female","colour":"Turquoise","dob":"02/08/2017"},{"name":"Elspeth","gender":"Female","colour":"Red","dob":"10/02/2015"},{"name":"Lilllie","gender":"Female","colour":"Teal","dob":"03/29/2013"}],"RagDoll":[{"name":"Joelle","gender":"Female","colour":"Pink","dob":"12/20/2016"},{"name":"Major","gender":"Male","colour":"Yellow","dob":"04/11/2014"},{"name":"Nap","gender":"Male","colour":"Puce","dob":"12/27/2012"},{"name":"Bonnie","gender":"Female","colour":"Puce","dob":"07/07/2010"},{"name":"Putnem","gender":"Male","colour":"Mauv","dob":"08/03/2015"},{"name":"Cornelle","gender":"Female","colour":"Yellow","dob":"05/16/2013"}],"Siamese":[{"name":"Odey","gender":"Male","colour":"Green","dob":"12/02/2016"},{"name":"Gib","gender":"Male","colour":"Indigo","dob":"06/06/2012"}],"Persian":[{"name":"Alair","gender":"Male","colour":"Mauv","dob":"09/03/2014"},{"name":"Perri","gender":"Female","colour":"Maroon","dob":"12/28/2010"},{"name":"Dennie","gender":"Male","colour":"Puce","dob":"01/08/2016"}]}
    let result1 = kittyRejigger(csvString1);
    let test1 = _.isEqual(sortResult(expected1), sortResult(result1))
    expect(test1).to.be.true;

    let expected2 = {"Maine Coon":[{"name":"Fiona","gender":"Female","colour":"Orange","dob":"12/07/2016"},{"name":"Ric","gender":"Male","colour":"Blue","dob":"11/28/2013"},{"name":"Martguerita","gender":"Female","colour":"Goldenrod","dob":"02/02/2017"},{"name":"Selia","gender":"Female","colour":"Purple","dob":"04/08/2017"},{"name":"Adriano","gender":"Male","colour":"Blue","dob":"04/03/2012"},{"name":"Thomasine","gender":"Female","colour":"Red","dob":"02/21/2012"},{"name":"Priscella","gender":"Female","colour":"Turquoise","dob":"02/08/2017"},{"name":"Elspeth","gender":"Female","colour":"Red","dob":"10/02/2015"},{"name":"Lilllie","gender":"Female","colour":"Teal","dob":"03/29/2013"}],"Siamese":[{"name":"Odey","gender":"Male","colour":"Green","dob":"12/02/2016"},{"name":"Gib","gender":"Male","colour":"Indigo","dob":"06/06/2012"}],"Persian":[{"name":"Alair","gender":"Male","colour":"Mauv","dob":"09/03/2014"},{"name":"Perri","gender":"Female","colour":"Maroon","dob":"12/28/2010"},{"name":"Dennie","gender":"Male","colour":"Puce","dob":"01/08/2016"}]}
    let result2 = kittyRejigger(csvString2);
    let test2 = _.isEqual(sortResult(expected2), sortResult(result2))
    expect(test2).to.be.true;
  });

});




function sortResult(result) {
  let sorted
  try {
    let keys = Object.keys(result).sort((a, b) => a.localeCompare(b));

    sorted = keys.reduce((acc, key) => {
      const sortedCats = result[key].sort((a, b) => a.name.localeCompare(b.name));
      let newObj = Object.assign(acc);
      newObj[key] = sortedCats;
      return newObj;
    }, {});
    return sorted;
  }
  catch (e) {
    console.log('kittyRejigger returned the wrong format!', e)
  }
}


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

function isObject(val) {
    if (val === null || Array.isArray(val)) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

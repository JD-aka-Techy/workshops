/*
 * create a function called myAdder
 * it should take two numbers
 * and return the sum of the two numbers
 */
function myAdder(a,b) {
 return a+b
}


/*
 * Create a function called myDoublerPusher
 * that takes an array and a number
 * doubles the number
 * adds it to the end of the array
 * and returns that new array
 */
function myDoublerPusher(arr, num) {
    return [...arr, num * 2];
}


/*
 * create a function called myResultFormatter 
 * that takes an array, a number, and another number(index) 
 * if the index is even turn it into a string in the format: studentId: {number}
 * if the index is an odd number turn it into a string in the format: grade: {number}
 * add the string to the array and return it.
 */  
function myResultFormatter(arr, item, index) {
    return [...arr, `${index % 2 !== 0 ? 'grade' : 'studentId'}: ${item}`];
}




function myArrayCounter(obj, item) {
    if(obj.hasOwnProperty(item)) {
        obj[item] ++;
    } else {
        obj[item] = 1;
    }
    return obj
}


/*
 * writing our own reduce function
 */
function myReduceFunc(arr, callback, initialValue) {
  
  var originalArray = [...arr]

  if(initialValue === undefined) {
      var initialValue = arr[0];
      arr.splice(0,1)
  }

  for(let x = 0; x < arr.length; x++) {

    initialValue = callback(initialValue, arr[x], x, originalArray);

  }

  return initialValue;

}



module.exports = {
    myAdder,
    myDoublerPusher,
    myResultFormatter,
    myArrayCounter,
    myReduceFunc

}

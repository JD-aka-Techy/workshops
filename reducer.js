/*
 * create a function called myAdder
 * it should take two numbers
 * and return the sum of the two numbers
 */
function myAdder() {

}


/*
 * Create a function called myDoublerPusher
 * that takes an array and a number
 * doubles the number
 * adds it to the end of the array
 * and returns that new array
 */
function myDoublerPusher() {

}


/*
 * create a function called myResultFormatter 
 * that takes an array, a number, and another number(index) 
 * if the index is even turn it into a string in the format: studentId: {number}
 * if the index is an odd number turn it into a string in the format: grade: {number}
 * add the string to the array and return it.
 */  
function myResultFormatter() {
}




function myArrayCounter() {

}


/*
 * writing our own reduce function
 */
function myReduceFunc() {
  


}


/*
 *
 * write a function that uses reduce to take a csv string in the format
 * Breed  name gender colour  birthdate              
 * eg "Breed,Name,Gender,Colour,DOB
 *     Maine Coon,Fiona,Female,Orange,12/07/2016
 *     RagDoll,Joelle,Female,Pink,12/20/2016
 *     RagDoll,Major,Male,Yellow,04/11/2014
 *     Maine Coon,Ric,Male,Blue,11/28/2013
 *     Maine Coon,Martguerita,Female,Goldenrod,02/02/2017"
 *  and returns a json object in the format eg:
 *  {
 *    "Maine Coon": [
 *      {
 *        name: "Fiona",
 *        gender: "Female",
 *        colour: "Orange",
 *        dob: "12/07/2016"
 *      },
 *      ... other maine coons
 *    ],
 *    ... other breeds of cat
 *  }   
 *
 */
function kittyRejigger() {

}



module.exports = {
    myAdder,
    myDoublerPusher,
    myResultFormatter,
    myArrayCounter,
    myReduceFunc,
    kittyRejigger
}

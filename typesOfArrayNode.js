//--------------------------------------------------------------------------------------------------
// an array of names
var names = ["rj", "ricky", "alex"];
console.log(names);
//calculating the length of array
var len = names.length;
console.log(len);

//Another way to create array
var arr = new Array(3); // declare an array "arr" of size 3
arr = [1, 5, 7]; // initialize elements of array

//OR
// declare and initialize in a single statement
var arr1 = new Array(2, 5, 7);
console.log("arr : " + arr);
console.log("arr 1 : " + arr1);

//--------------------------------------------------------------------------------------------------

//push method in arrays is used to insert an element in the end of the array
arr = ["a", "e", "i", "o"];
console.log(arr); // [ 'a', 'e', 'i', 'o' ]
arr.push("u");
console.log(arr); // [ 'a', 'e', 'i', 'o', 'u' ]

//pop method in arrays is used to remove the element from the end of the array
arr = [5, 5, 8, 7, 6];
console.log(arr); // [ 5, 5, 8, 7, 6 ]
arr.pop();
console.log(arr); // [ 5, 5, 8, 7 ]

//unshift method in arrays is used insert an element in the beginning of the array
arr = [5, 5, 8, 7, 6];
console.log(arr); // [ 5, 5, 8, 7, 6 ]
arr.unshift(1);
console.log(arr); // [ 1, 5, 5, 8, 7, 6 ]

//shift method is used to remove the element from the beginning of the array
arr = ["b", "a", "e", "i", "o", "u"];
console.log(arr); // [ 'b', 'a', 'e', 'i', 'o', 'u' ]
arr.shift();
console.log(arr); // [ 'a', 'e', 'i', 'o', 'u' ]

//reverse method is used to reverse the order of the array such that the
//first element becomes the last and the last element becomes the first
arr = ["b", "e", "a", "o", "p", "n", "r"];
console.log(arr); // [ 'b', 'e', 'a', 'o', 'p', 'n', 'r' ]
arr.reverse();
console.log(arr); // [ 'r', 'n', 'p', 'o', 'a', 'e', 'b' ]

//sort method is used to sort the elements of array in term of their occurrences
arr = ["b", "e", "a", "o", "p", "n", "r"];
console.log(arr); // [ 'b', 'e', 'a', 'o', 'p', 'n', 'r' ]
arr.sort();
console.log(arr); // [ 'a', 'b', 'e', 'n', 'o', 'p', 'r' ]

//splice method can be used in two ways
//i.e to either add the element into the array or remove the elements from the array

//Add using splice
arr = ["b", "e", "a", "o", "p", "n", "r"];
console.log(arr); // [ 'b', 'e', 'a', 'o', 'p', 'n', 'r' ]
arr.splice(2, 2, "rj", "nodejs");
console.log(arr); // [ 'b', 'e', 'rj', 'nodejs', 'p', 'n', 'r' ]

//Remove using splice
arr = ["b", "e", "a", "o", "p", "n", "r"];
console.log(arr); // [ 'b', 'e', 'a', 'o', 'p', 'n', 'r' ]
arr.splice(2, 2);
console.log(arr); // [ 'b', 'e', 'p', 'n', 'r' ]

//concat method is used to join two arrays and returns
//a new array consisting the elements of both the arrays one after other
arr = ["tomatoes", "pineapple"];
arr2 = ["mango", "peach", "apple"];
console.log(arr); // [ 'tomatoes', 'pineapple' ]
console.log(arr2); // [ 'mango', 'peach', 'apple' ]
var new_arr = arr.concat(arr2);
console.log(new_arr); // [ 'tomatoes', 'pineapple', 'mango', 'peach', 'apple' ]

//indexOf method is used to return the first index of the element passed
//within the array or otherwise it will return -1 if the value is not found
arr = [5, 2, 8, 5, 6];
console.log(arr); // [ 5, 2, 8, 5, 6 ]
var pos = arr.indexOf(8);
console.log("index of 8 is : " + pos); // index of 8 is : 2
var pos1 = arr.indexOf(5);
console.log("index of 5 is : " + pos1); // index of 5 is : 0

//lastIndexOf method is used to return the last index of the element passed
//within the array or otherwise it will return -1 if the value is not found
arr = [5, 2, 8, 5, 6];
console.log(arr); // [ 5, 2, 8, 5, 6 ]
var pos = arr.lastIndexOf(5);
console.log("index of 5 is : " + pos); // index of 5 is : 3

// join method is used to join the elements into a string and returns the string.
// The elements will be separated by a specific separator while joining which will be passed
// while calling the method. The default separator is , (comma)
arr = [5, 2, 8, 5, 6];
arr1 = ["a", "b", "c", "d"];
console.log(arr); // [ 5, 2, 8, 5, 6 ]
console.log(arr1); // [ 'a', 'b', 'c', 'd' ]
var str = arr.join();
var str1 = arr1.join(":");
console.log(str); // 5,2,8,5,6
console.log(str1); // a:b:c:d

//slice method is used to extract a section of an array and returns a new array. Slice method take two arguments
//i.e start and end. If both elements are omitted then it will slice the whole array {slice(start,end)}

//start : This is an integer which specifies where to start. The default value is index 0
//If omitted like this :: slice(,end) it will use the default value as start.
//We can also start from the end by using negative values

//end : This is an integer value which specifies where to end (last index excluded).
//If omitted like this :: slice(start,)
//it will slice upto the last element. We can use negative values to select from the end.

// Note : It will not change the original array
arr = [5, 2, 8, 5, 6];
arr1 = ["a", "b", "c", "d"];
console.log(arr); // [ 5, 2, 8, 5, 6 ]
console.log(arr1); // [ 'a', 'b', 'c', 'd' ]
var str = arr.slice(2, 4);
var str1 = arr1.slice(-2, -1);
console.log(str); // [ 8, 5 ]
console.log(str1); // [ 'c' ]

//every method is used to check whether a condition in fulfilled by all the elements or not.
//every method returns true if the condition is satisfied by all the elements of the array otherwise every method will return false
arr = [2, 4, 6, 8, 10];
arr1 = [2, 3, 4, 6, 8];
function even(value) {
  if (value % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

var out = arr.every(even);
var out1 = arr1.every(even);
console.log("Output of array 1 : " + out); // Output of array 1 : true
console.log("Output of array 2 :" + out1); // Output of array 2 :false

//filter method is used to create a new array
//filled with all the elements that passes a test condition usually passed as a function from the current array
arr = [2, 4, 6, 8, 10];
arr1 = [2, 3, 4, 6, 8];
function even(value) {
  if (value % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

var out = arr.filter(even);
var out1 = arr1.filter(even);
console.log("Output of array 1 : " + out); // Output of array 1 : 2,4,6,8,10
console.log("Output of array 2 :" + out1); // Output of array 2 : 2,4,6,8

//find method returns the first value in the array which passes a test provided as a function.
//If no element matches the condition , it will return undefined
arr = [2, 4, 6, 8, 10];
arr1 = [2, 3, 4, 7, 8];
function odd(value) {
  if (value % 2 == 1) {
    return true;
  } else {
    return false;
  }
}

var out = arr.filter(odd);
var out1 = arr1.filter(odd);
console.log("Output of array 1 : " + out); // Output of array 1 :
console.log("Output of array 2 :" + out1); // Output of array 2 :3,7

//forEach method in arrays is a loop which is used to call a function for each element in the array
var arr = ["1", "2", "3", "5", "8"];

arr.forEach(function(element) {
  console.log(element);
}); // 1,2,3,5,8

//reduce method is used to reduce the array to a single value.
//This method executes the provided function for each value of the array and stores the result in accumulator.
//Note : It does not execute on array with no values
arr = [5, 5, 8, 7, 6];
console.log(arr); // [ 5, 5, 8, 7, 6 ]
function mul(value, total) {
  total = value * total;
  return total;
}
var output = arr.reduce(mul);
console.log("The product of the array is : " + output); // The product of the array is : 8400

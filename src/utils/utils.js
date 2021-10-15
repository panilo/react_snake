// This function compare the content of two arrays
export function arraysEqual(arrayOne, arrayTwo) {
  // Compare the size
  if (arrayOne.length !== arrayTwo.length) {
    return false;
  }

  // Compare the content
  for (var i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] != arrayTwo[i]) {
      return false;
    }
  }

  return true;
}

// Check if an array is contained in another array
export function isArrayInArray(containerArray, itemArray) {
  // The some function returns true if at least one element of the array satisfy the tests implemented by the provided function
  const contains = containerArray.some((element) => {
    return arraysEqual(element, itemArray); // In this case we need to check if the itemArray is equal to element (another array)
  });
  return contains;
}

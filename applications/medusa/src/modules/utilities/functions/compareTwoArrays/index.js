/**
 * @flow
 */

// Function for comparing the equality of two arrays
// Returns true if both arrays are equal

export default function compareTwoArrays (arrayOne, arrayTwo) {
  const firstComparison = arrayOne.every((item) => arrayTwo.includes(item))
  const secondComparison = arrayTwo.every((item) => arrayOne.includes(item))

  return firstComparison && secondComparison
}

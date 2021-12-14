// Function for comparing the equality of two arrays
// Returns true if both arrays are equal
// Order of the arrays does not matter as long as contents are equal

export default function compareTwoArrays (arrayOne: any[], arrayTwo: any[]): any {
  const firstComparison = arrayOne.every((item) => arrayTwo.includes(item))
  const secondComparison = arrayTwo.every((item) => arrayOne.includes(item))

  return firstComparison && secondComparison
}

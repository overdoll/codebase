// Function for comparing the order of two arrays
// Returns true if both arrays have the same order
// Will return false if they are not of equal length

export default function compareTwoArrayOrders (arrayOne: any[], arrayTwo: any[]): boolean {
  if (arrayOne.length !== arrayTwo.length) return false

  return arrayOne.every((item, index) => arrayTwo[index] === item)
}

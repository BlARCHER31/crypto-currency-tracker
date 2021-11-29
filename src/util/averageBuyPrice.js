export function calculateAverageBuyPrice(buyArray) {
  let avgBuyPrice
  let sum = 0

  for (let i in buyArray) {
    sum += buyArray[i]
  }

  avgBuyPrice = sum / buyArray.length
  return Math.round(100 * avgBuyPrice) / 100
}

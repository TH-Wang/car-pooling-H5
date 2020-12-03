// 价格的前缀样式
export function priceClass (price) {
  return price === 0 ? '' : 'price-prefix'
}

// 价格的前缀样式
export function priceText (price) {
  if (price === 0) return '免费'
  else {
    const decimal = price.toString().split('.')[1]
    return decimal ? price : price + '.00'
  }
}

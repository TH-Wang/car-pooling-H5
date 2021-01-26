export default function (type) {
  return {
    isDriverMsg: [6, 8, 10, 12, 14].indexOf(type) !== -1,
    customer: {
      name: [8, 10, 12, 14].indexOf(type) !== -1,
      line: type === 8,
      people: [8, 10].indexOf(type) !== -1,
      cancel: [12, 14].indexOf(type) !== -1
    },
    driver: {
      name: [9, 11, 13, 15].indexOf(type) !== -1,
      detail: [9, 11].indexOf(type) !== -1,
      cancel: [13, 15].indexOf(type) !== -1
    }
  }
}

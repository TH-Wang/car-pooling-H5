export default function () {
  const query = window.location.href.split('?')[1]
  if (!query) return {}
  const url = query.split('&')
  const queryString = url
  const obj = {}
  queryString.forEach(item => {
    const [key, value] = item.split('=')
    obj[key] = value
  })
  return obj
}

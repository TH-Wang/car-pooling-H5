import { Toast } from 'vant'

export default function (content) {
  const aux = document.createElement('textarea')
  aux.value = content
  document.body.appendChild(aux)
  aux.select()
  aux.setSelectionRange(0, aux.value.length)
  document.execCommand('copy')
  document.body.removeChild(aux)
  Toast.success('复制成功')
}

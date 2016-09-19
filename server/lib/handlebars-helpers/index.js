import moment from 'moment'

moment.locale('es', {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
})

export function getClassIfActive (numbers, number) {
  return numbers.indexOf(number) !== -1 ? 'toggle-active' : ''
}

export function getDream (data, number) {
  return data.dreams[number]
}

export function pad (number) {
  return (number < 10) ? ('0' + number) : number
}

export function times (to, block) {
  let accumulator = ''

  for (let i = 0; i < to; ++i) {
    accumulator += block.fn(i)
  }

  return accumulator
}

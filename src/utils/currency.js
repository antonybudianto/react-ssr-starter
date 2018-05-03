import numeral from 'numeral'

import { GOLD_DECIMAL_LIMIT } from '../data'

numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: ''
  }
})
numeral.locale('id')

export const formatCurrency = (num, maxFraction = 0) => {
  const val = parseFloat(num || 0)
  let suffix = ''
  for (let i = 0; i < maxFraction; i++) {
    suffix += '0'
  }
  const f = numeral(val).format(`0,0.[${suffix}]`)
  return f
}

export const formatGold = number => {
  return formatCurrency(number, GOLD_DECIMAL_LIMIT)
}

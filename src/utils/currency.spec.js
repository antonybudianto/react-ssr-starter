import { formatCurrency } from './currency'

describe('Currency util', () => {
  it('should format non decimal value with default fraction', () => {
    const res = formatCurrency(100000)
    expect(res).toEqual('100.000')
  })

  it('should format decimal value with fraction set', () => {
    const res = formatCurrency(100000.45, 2)
    expect(res).toEqual('100.000,45')
  })

  it('should format decimal value with no fraction', () => {
    const res = formatCurrency(100000.45, 0)
    expect(res).toEqual('100.000')
  })

  it('should format decimal with no ending zeroes', () => {
    const res = formatCurrency(100000.4, 2)
    expect(res).toEqual('100.000,4')
  })

  it('should handle millions decimal', () => {
    const res = formatCurrency(3000000.45, 2)
    expect(res).toEqual('3.000.000,45')
  })

  it('should handle 4 digits comma', () => {
    const res = formatCurrency(100000.4539, 4)
    expect(res).toEqual('100.000,4539')
  })

  it('should handle 4 digits comma without ending zeroes', () => {
    const res = formatCurrency(100000.453, 4)
    expect(res).toEqual('100.000,453')
  })
})

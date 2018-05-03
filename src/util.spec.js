import { roundTo } from './util'

describe('generic util - roundTo', () => {
  it('should round to fixed', () => {
    const res = roundTo(0.12345678, 2)
    expect(res).toEqual(0.12)
  })

  it('should round up correctly', () => {
    const res = roundTo(0.128, 2)
    expect(res).toEqual(0.12)
  })

  it('should round down correctly', () => {
    const res = roundTo(0.123, 2)
    expect(res).toEqual(0.12)
  })

  it('should round to zero when zeroes exceed digits', () => {
    const res = roundTo(0.00001, 4)
    expect(res).toEqual(0)
  })
})

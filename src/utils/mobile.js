import { UAParser } from 'ua-parser-js'

const parser = new UAParser()

export const MOBILE_BREAKPOINT = 1024

export function isMobile() {
  return window.innerWidth < MOBILE_BREAKPOINT
}

export function isWebview() {
  const res = parser.getResult()
  return ['Android', 'iOS', 'BlackBerry'].indexOf(res.os.name) !== -1
}

import { useUserAgentContext } from '../agent'
import { useMemo } from 'react'

export interface UseSnifferReturn {
  os: {
    isWindowsPhone: boolean
    isSymbian: boolean
    isAndroid: boolean
    isFireFox: boolean
    isTablet: boolean
    isPhone: boolean
    isPc: boolean
  }
  browser: 'firefox' | 'ie' | 'chrome' | 'opera' | 'safari'
  device: 'pc' | 'mobile'
}

export default function useSniffer (): UseSnifferReturn {
  const userAgent = useUserAgentContext()

  const getOs = (): UseSnifferReturn['os'] => {
    const isWindowsPhone = /(?:Windows Phone)/.test(userAgent)
    const isSymbian = /(?:SymbianOS)/.test(userAgent) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(userAgent)
    const isFireFox = /(?:Firefox)/.test(userAgent)
    const isTablet = /(?:iPad|PlayBook)/.test(userAgent) || (isAndroid && !/(?:Mobile)/.test(userAgent)) || (isFireFox && /(?:Tablet)/.test(userAgent))
    const isPhone = /(?:iPhone)/.test(userAgent) && !isTablet
    const isPc = !isPhone && !isAndroid && !isSymbian && !isTablet
    return {
      isTablet,
      isPhone,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    }
  }

  const getBrowser = (): UseSnifferReturn['browser'] => {
    const ua = userAgent.toLowerCase()
    const reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    }
    // @ts-expect-error
    return [].concat(Object.keys(reg).filter(key => reg[key].test(ua)))[0] || ''
  }

  const memoOs = useMemo(() => getOs(), [userAgent])

  const getDevice = (): UseSnifferReturn['device'] => {
    return memoOs.isPc ? 'pc' : 'mobile'
  }

  const memoBrowser = useMemo(() => getBrowser(), [userAgent])

  const memoDevice = useMemo(() => getDevice(), [userAgent])

  return {
    os: memoOs,
    browser: memoBrowser,
    device: memoDevice
  }
}

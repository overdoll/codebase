interface SnifferProps {
  os: {
    isWindowsPhone: boolean
    isSymbian: boolean
    isAndroid: boolean
    isFireFox: boolean
    isTablet: boolean
    isPhone: boolean
    isPc: boolean
  }
  browser: string
  device: 'pc' | 'mobile'
}

const sniffer: SnifferProps = {
  os: {
    isWindowsPhone: false,
    isSymbian: false,
    isAndroid: false,
    isFireFox: false,
    isTablet: false,
    isPhone: false,
    isPc: false
  },
  browser: '',
  device: 'mobile'
}

Object.defineProperty(sniffer, 'device', {
  get: function () {
    const r = sniffer.os
    return r.isPc ? 'pc' : 'mobile'
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  }
})

Object.defineProperty(sniffer, 'browser', {
  get: function () {
    const ua = navigator.userAgent.toLowerCase()
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
})

Object.defineProperty(sniffer, 'os', {
  get: function () {
    const ua = navigator.userAgent
    const isWindowsPhone = /(?:Windows Phone)/.test(ua)
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
    const isAndroid = /(?:Android)/.test(ua)
    const isFireFox = /(?:Firefox)/.test(ua)
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet
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
})

export default sniffer

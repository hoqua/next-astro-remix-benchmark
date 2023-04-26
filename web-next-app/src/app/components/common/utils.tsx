
export const getTranslationSafe = (translations: Record<string, string>, itemKeyName: string) => {
  if (itemKeyName in translations) {
    return translations[itemKeyName]
  }

  return itemKeyName
}

export const redirectedPathName = (pathName: string, newLocale: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = newLocale
  return segments.join('/')
}



const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

export const rgbToDataUrl = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
        triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

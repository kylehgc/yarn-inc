import fontPairs from '../Data/fontpairs.json'

const getFontPair = () => {
  
  const fontIndex = Math.floor(Math.random() * fontPairs.pairs.length)
  return fontPairs.pairs[fontIndex]
}

export default getFontPair
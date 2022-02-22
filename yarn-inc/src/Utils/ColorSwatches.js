import tinyColor from "tinycolor2";
import pantoneColor from '../Data/pantone-colors.json'
import getNames from './getNames'
import fontPairs from '../Data/fontpairs.json'

const colorTransformations = ['splitcomplement','complement','monochromatic']

const getColorTransformation = () => {
  return colorTransformations[Math.floor(Math.random() * colorTransformations.length)]
}



const getSplitComplementSwatch = (color) => {
  const splitCompliments = tinyColor(color).splitcomplement()
  const splitComplimentHex = splitCompliments.map((color) => color.toHexString())
  const splitSwatch = splitComplimentHex.reduce((array, color) => {
    const brighterColour = tinyColor(color).brighten(20).toHexString()
    return array.concat([color,brighterColour])
  },[])

  
  return splitSwatch
}
const getMonochromaticSwatch = (color) => {
    
  const monoSwatch = tinyColor(color).monochromatic()
  return [...monoSwatch.map(color=> color.toHexString())]
}
const getRandomColor = () => {
  
  const colorIndex= Math.floor(Math.random() * pantoneColor.names.length)
  const colorName = pantoneColor.names[colorIndex]
  const colorHex = pantoneColor.values[colorIndex]
   
  return { name: colorName, color: colorHex}
    
}
  
const getPastelSwatch = (color) => {
  
  const pastels = [30,60].map((adjustment) => tinyColor(color).brighten(adjustment).toString())
  return [color, ...pastels]
}
const getComplementSwatch = (colorString) => {
  
  
  const complimentaryColorString = tinyColor(colorString).complement().toHexString()
  
  const colorSwatch = getPastelSwatch(colorString)
 
  const complimentarySwatch = getPastelSwatch(complimentaryColorString)
  return colorSwatch.concat(complimentarySwatch)
}

const getSwatches = (transformation,color) => {
  if(transformation === 'complement') {
    return getComplementSwatch(color)
  } else if (transformation=== 'monochromatic') {
    return getMonochromaticSwatch(color)
  } else if (transformation === 'splitcomplement') {
    return getSplitComplementSwatch(color)
  }

    
}
const getReadableArray = () => { 
  const bgColorIndex = 0
  const minimumContrast = 4.5
  let mostReadableContrast = 0
 
  let colors = {}
  
  while (mostReadableContrast < minimumContrast) {
    const transformation = getColorTransformation()
    console.log(transformation)
    const color = getRandomColor()
    const swatchColors = getSwatches(transformation,color.color)
    console.log(swatchColors[bgColorIndex])
    const mostReadable = tinyColor.mostReadable(swatchColors[bgColorIndex],swatchColors).toHexString()
    
    const indexOfMostReadable = swatchColors.indexOf(mostReadable)
    mostReadableContrast = tinyColor.readability(swatchColors[bgColorIndex],swatchColors[indexOfMostReadable])
    console.log(mostReadableContrast)
    swatchColors[indexOfMostReadable] = swatchColors[5]
    swatchColors[5] = mostReadable
    colors = {colors: swatchColors, transformation: transformation,color:color}
    
  }
  return colors
}
    
const getColorSwatches = async () => {
  const colors = getReadableArray()
  console.log(colors)
  // const swatchNames = await getNames(colors.colors)
 
  // const swatch = colors.colors.map((color,index) => (
  //   {color: color, name: swatchNames[index]}
  // ))


  
  return {colors: colors.colors, transformation: colors.transformation}

}

export default getColorSwatches


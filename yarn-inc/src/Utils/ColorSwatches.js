import tinyColor from "tinycolor2";
import pantoneColor from '../Data/pantone-colors.json'
import getNames from './getNames'
import fontPairs from '../Data/fontpairs.json'

const colorTransformations = ['splitcomplement','complement','monochromatic','analogous']

const getColorTransformation = () => {
  return colorTransformations[Math.floor(Math.random() * colorTransformations.length)]
}

const getAnalogousSwatch = (color) => {
  const results = 6
  const colorSlices = 5
  const analogousSwatch = tinyColor(color).analogous(results,colorSlices)
  return [...analogousSwatch.map(color=> color.toHexString())]
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
  } else if (transformation === 'analogous') {
    return getAnalogousSwatch(color)
  } else if (transformation === 'splitcomplement') {
    return getSplitComplementSwatch(color)
  }

    
}

    
const getColorSwatches = async () => {

  const transformation = getColorTransformation()
  console.log(transformation)
  const color = getRandomColor()
  const swatchColors = getSwatches(transformation,color.color)
    
  const swatchNames = await getNames(swatchColors)
  const swatch = swatchColors.map((color,index) => (
    {color: color, name: swatchNames[index]}
  ))
  const mostReadable = tinyColor.mostReadable(swatchColors[0],[swatchColors])
  
  
  return {...color, swatch: swatch, transformation: transformation}

}

export default getColorSwatches


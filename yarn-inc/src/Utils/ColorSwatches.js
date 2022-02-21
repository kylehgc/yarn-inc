import tinyColor from "tinycolor2";
import pantoneColor from '../Data/pantone-colors.json'
import getNames from './getNames'
const colorTransformations = ['complement','monochromatic']

const getColorTransformation = () => {
  return colorTransformations[Math.floor(Math.random() * 2)]
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
  
  return [10,20].map((adjustment) => tinyColor(color).lighten(adjustment).toString())
    
}


const getSwatches = (transformation,color) => {
  if(transformation === 'complement') {
    return getComplementSwatch(color)
  } else if (transformation=== 'monochromatic') {
    return getMonochromaticSwatch(color)
  }

    
}
const getComplementSwatch = (colorString) => {
  

  const complimentaryColorString = tinyColor(colorString).complement().toHexString()
   
  const colorSwatch = [...getPastelSwatch(colorString), colorString]
  const complimentarySwatch = [...getPastelSwatch(complimentaryColorString),complimentaryColorString]
  return colorSwatch.concat(complimentarySwatch)
}
    
const getColorSwatches = async () => {
  
  const transformation = getColorTransformation()
   
  const color = getRandomColor()
  const swatchColors = getSwatches(transformation,color.color)
    
  const swatchNames = await getNames(swatchColors)
  const swatch = swatchColors.map((color,index) => (
    {color: color, name: swatchNames[index]}
  ))
  return {...color, swatch: swatch, transformation: transformation}

}

export default getColorSwatches


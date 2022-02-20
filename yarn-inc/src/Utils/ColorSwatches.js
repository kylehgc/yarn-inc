import tinyColor from "tinycolor2";
import openColor from '../Data/open-color.json'

const getColorSwatches = () => {
  const colorTransformations = ['complement','monochromatic']
  const getColorTransformation = () => {
    return colorTransformations[Math.floor(Math.random() * 2)]
  }
  
  const getMonochromaticSwatch = () => {
    const color = getRandomColor()
    const monoSwatch = tinyColor(color).monochromatic()
    console.log([...monoSwatch.map(color=> color.toHexString()), ['monochromatic']])
    return [[...monoSwatch.map(color=> color.toHexString())],'monochromatic']
  }
  const getRandomColor = () => {
    console.log("I am running")
    const colors = Object.keys(openColor);
    const colorName = colors[Math.floor(Math.random() * colors.length)];
    const colorNumber = Math.floor(Math.random() * 4) + 4;
    console.log(colorName+" " + " " + colorNumber)
    console.log(openColor[colorName][colorNumber])
    return openColor[colorName][colorNumber]
    
  }
  
  
  const getPastelSwatch = (color) => {
    return [10,20].map((adjustment) => tinyColor(color).lighten(adjustment).toString())
    
  }
  const getSwatches = (transformation) => {
    if(transformation === 'complement') {
      return getComplementSwatch
    } else if (transformation=== 'monochromatic') {
      return getMonochromaticSwatch
    }

    
  }
  const getComplementSwatch = () => {
    const colorString = getRandomColor()
    
    const complimentaryColorString = tinyColor(colorString).complement().toHexString()
    const colorSwatch = [...getPastelSwatch(colorString), colorString]
    const complimentarySwatch = [...getPastelSwatch(complimentaryColorString),complimentaryColorString]
    return [colorSwatch.concat(complimentarySwatch),'complement']
  }
    
    const transformation = getColorTransformation()
    console.log(transformation)
    return getSwatches(transformation)

  }

  export default getColorSwatches


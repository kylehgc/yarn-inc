import SubNavCTA from '../Components/Navs/SubNavCTA'
import GridListWithHeading from './Features/GridListWithHeading.js'
import LgLogo from './Footers/LgLogo'
import { Flex, Button} from '@chakra-ui/react'
import getFontPair from '../Utils/api'
import { useState,useEffect } from 'react'
import getColors from '../Utils/ColorSwatches'
import bigRedButton from '../Images/bigRedButton.png'


const Template = () => {
  
  const [colors,setColors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fonts, setFonts] = useState(null)

  const handleKeyPress = (event) => {
    if (event.repeat) {
      return
    }
    if (event.code === 'Space') {
      event.preventDefault()
      resetTemplate()
    }
  
  }
  
  useEffect(() => {
    document.addEventListener('dblclick', resetTemplate)
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('dblclick', resetTemplate)
      document.removeEventListener('keydown', handleKeyPress)
    }
  },[])


  useEffect(() => {
    const fetchTemplate = async () => {
      if(colors && fonts) {
        setLoading(false)
      } else {
        
        setColors(await getColors());
        setFonts(await getFontPair())
        setLoading(false)
      }
    }
    fetchTemplate()
    
    
  }, []);

  const resetTemplate = async () => {
    const newColours = await getColors()
    const newFonts = await getFontPair()
    setColors(newColours)
    setFonts(newFonts)
  }

  if(loading) {
    return null
  }


  
  const colorStrings = colors.swatch.map((color) => color.color)
  
  return (
    
    <Flex bg={colors.swatch[0].color} direction='column'>
      <Button position='fixed' 
        rounded='3xl'
        variant='ghost'
        color={colorStrings[3]}
        transform='translateX(-50%)'
        bg={colorStrings[4]} 
        left='50%' top='75%' 
        height='20%' width='25%' 
        
        onClick={resetTemplate}>
        RELOAD
      </Button>

      <SubNavCTA colors={colorStrings} fonts={fonts}/ >
      <GridListWithHeading colors={colorStrings} fonts={fonts}/>
      <LgLogo fonts={fonts} colors={colors.swatch} />
    </Flex>
  )
}

export default Template


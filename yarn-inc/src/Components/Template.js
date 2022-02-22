import SubNavCTA from '../Components/Navs/SubNavCTA'
import GridListWithHeading from './Features/GridListWithHeading.js'
import LgLogo from './Footers/LgLogo'
import { Flex, Button} from '@chakra-ui/react'
import getFontPair from '../Utils/api'
import { useState,useEffect } from 'react'
import getColors from '../Utils/ColorSwatches'

const Template = () => {
  const [colors,setColors] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fonts, setFonts] = useState(null)
  const handleKeyPress = (event) => {
    if (event.repeat) {
      event.preventDefault()
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  return (
    <Flex bg={colors.colors[0]} direction='column'>
      <Button position='fixed' 
        rounded='3xl'
        variant='ghost'
        color={colors.colors[3]}
        transform='translateX(-50%)'
        bg={colors.colors[4]} 
        left='50%' top='75%' 
        height='20%' width='25%' 
        onClick={resetTemplate}>
        RELOAD
      </Button>

      <SubNavCTA colors={colors.colors} fonts={fonts}/ >
      <GridListWithHeading colors={colors.colors} fonts={fonts}/>
      <LgLogo fonts={fonts} colors={colors.colors} />
    </Flex>
  )
}

export default Template


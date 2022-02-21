
import getColors from "../Utils/ColorSwatches"
import {Fragment,useEffect,useState } from "react";
import { useTheme,Button, Flex, Spacer } from "@chakra-ui/react";

const Palette = () => {
  const [colors,setColors] = useState()
  const [loading, setLoading] = useState(true)
  const theme = useTheme() 
  console.log(theme)

  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      resetColors()
    }
  }
  useEffect(() => {
    
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }

    
  })

  useEffect(() => {
    const fetchColours = async () => {
      if(colors) {
        setLoading(false)
      } else {
        
        setColors(await getColors());
        setLoading(false)
      }
    }
    fetchColours()
    
    
  }, [colors]);

  const resetColors = () => {
    setLoading(true)
    setColors(null)
  }

  if(loading) {
    return null
  }

  return (
    <Fragment>
      
      <Flex flexDir='column'>
        {colors.swatch.map((color,index) => (
          <Flex bg={color.color} key={index}  height='13vh'>Color: {color.color} {color.name} Type: {colors.transformation}</Flex>  
        ))} 
        <Button alignSelf='center' onKeyDown={resetColors} width='40%' onClick={resetColors} colorScheme='blue' size='lg'>New Colors</Button>
      </Flex>
    </Fragment>
  )
  
      
   
   
}

export default Palette
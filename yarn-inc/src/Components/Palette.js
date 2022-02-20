import Swatch from "./Swatch";
import getColors from "../Utils/ColorSwatches"
import {Fragment,useEffect,useState } from "react";
import { useTheme,Button, Flex, Spacer } from "@chakra-ui/react";

const Palette = () => {
  const [colors,setColors] = useState()
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

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
    console.log("Do I run a lot?")
    setColors(getColors());
    setLoading(false)
  }, [loading]);

  const resetColors = () => {
    setLoading(true)
  }

  if(loading) {
    return null
  }

  return (
    <Fragment>
     
    <Flex flexDir='column'>
       {colors[0].map((color,index) => (
            <Flex bg={color.toString()} key={index}  height='13vh'>Color: {color} Type: {colors[1]}</Flex>  
          ))} 
      <Button alignSelf='center' onKeyDown={resetColors} width='40%' onClick={resetColors} colorScheme='blue' size='lg'>New Colors</Button>
    </Flex>
    </Fragment>
    )
  
      
   
   
}

export default Palette
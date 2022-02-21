import { Center, Flex } from '@chakra-ui/react'
import { Fragment } from 'react'



const Swatch = ({swatch, label}) => {
  console.log(swatch)
  
  

  return (
    <Fragment>
            
     
     
      <Fragment>
          
        {swatch.map((color,index) => (
          <Flex bg={color.toString()} key={index}  height='13vh'>Color: {color} Type: {label}</Flex>  
        ))} 
      </Fragment>
      
    </Fragment>
  )
}

export default Swatch
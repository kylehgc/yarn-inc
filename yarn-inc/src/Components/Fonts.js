import fonts from '../Data/fontpairs.json'
import { useState, useEffect } from 'react'

import {
  useTheme,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';


const getRandomFont = (fontPairs) => {
  
  const fontIndex = Math.floor(Math.random() * fontPairs.pairs.length)
  console.log(fontIndex)
  return fontPairs.pairs[fontIndex]
}


  
  

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: 'Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
  };
});

export default function GridListWithHeading() {
  const [fontPair, setFontPair] = useState(getRandomFont(fonts))
  const theme = useTheme()
  console.log(theme)
  useEffect(() => {
    
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.removeEventListener('keyup', handleKeyPress)
    }

    
  })
  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      setFontPair(getRandomFont(fonts))
    }
  }


  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontFamily={fontPair[0]} fontSize={'3xl'}>This is the headline</Heading>
        <Text fontFamily={fontPair[1]} color={'gray.600'} fontSize={'xl'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontFamily={fontPair[0]} fontWeight={600}>{feature.title}</Text>
                <Text fontFamily={fontPair[1]} color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
      <Button onClick={()=>setFontPair(getRandomFont(fonts))} size='lg'> CLICK ME</Button>
    </Box>
    
  );
}
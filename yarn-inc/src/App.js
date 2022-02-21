
import Fonts from './Components/Fonts'
import React from 'react';
import Palette from './Components/Palette';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>
    </ChakraProvider>
  );
}

export default App;

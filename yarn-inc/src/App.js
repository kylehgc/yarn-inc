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
      <Palette/>
    </ChakraProvider>
  );
}

export default App;

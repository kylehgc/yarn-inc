import Palette from './Components/Palette'
import Fonts from './Components/Fonts'
import React from 'react';
import { ChakraProvider, theme} from '@chakra-ui/react';
import Template from './Components/Template';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Template/ >
    </ChakraProvider>
  );
}

export default App;

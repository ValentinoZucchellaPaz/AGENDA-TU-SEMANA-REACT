// export const styles = {
//   h2: 'text-xl font-medium',
//   button: 'px-4 py-1 flex justify-center items-center hover:bg-primary transition-all rounded-full',
//   input: 'px-3 py-1 text-black'
// }

// export const layouts = {
//   header: 'flex flex-row justify-center items-center h-14 w-full text-white bg-primary',
//   footer: 'flex flex-row justify-center items-center h-14 w-full text-white bg-primary absolute b-0'
// }

// theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#444',
    },
  },
  components: {
    Card: {
      baseStyle: {
        bg: 'brand.500',
        color: 'white',
      },
    },
  },
});

export default theme;

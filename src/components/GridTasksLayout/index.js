import { Grid } from '@chakra-ui/react';
import React from 'react';

export default function GridTasksLayout({ children }) {
  function difTemplateColString(layout) {
    let texto;

    switch (layout) {
      case 'home':
        texto = {
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        };
        break;
      case 'semana':
        texto = 'Estás en la página de la semana';
        break;
      case 'detail':
        texto = 'Esta es la página de detalle';
        break;
      default:
        texto = 'Opción no válida';
        break;
    }

    return texto;
  }

  return (
    <Grid
      mx={'auto'}
      w={'fit-content'}
      templateColumns={difTemplateColString('home')}
      gap={4}
    >
      {children}
    </Grid>
  );
}

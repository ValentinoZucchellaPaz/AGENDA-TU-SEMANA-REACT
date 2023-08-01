import { Button, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function ReloadButton({ onClickCallback }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onClickCallback();
  };

  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [loading]);

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      bg={loading ? 'gray.200' : 'blue.500'}
      textColor={'white'}
      minW={'200px'}
      w={'fit-content'}
      mx={'auto'}
      _hover={{ bg: loading ? 'gray.200' : 'blue.600' }}
      _active={{ bg: loading ? 'gray.200' : 'blue.700' }}
    >
      {loading ? <Spinner size='sm' color='blue.500' /> : 'Volver a cargar'}
    </Button>
  );
}

export default ReloadButton;

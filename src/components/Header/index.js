import useUser from '@/hooks/useUser';
import {
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
  Heading,
} from '@chakra-ui/react';

export default function Header() {
  const { user, SignOut } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <header className='flex flex-row justify-center items-center relative h-14 w-full text-white bg-primary'>
      <Heading size={'md'}>ORGANIZA TU SEMANA</Heading>
      {user && (
        <div className='absolute top-3 right-4 flex flex-row gap-3'>
          <Tooltip hasArrow label='Cambiar cuenta'>
            <Tag
              onClick={onOpen}
              variant='subtle'
              cursor='pointer'
              colorScheme='facebook'
              px={4}
              py={2}
            >
              {user.email}
            </Tag>
          </Tooltip>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>¿Quieres cambiar de cuenta?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Dejarás de ver las tareas creadas en esta cuenta, ¿seguro
                quieres hacerlo?
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => {
                    SignOut();
                    onClose();
                  }}
                >
                  Salir
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </header>
  );
}

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
import Nav from '../Nav';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Header() {
  const { user, SignOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <header className={`grid ${user ? 'grid-cols-3 items-center justify-between' : 'place-content-center'} h-14 w-full text-white bg-primary md:px-10 px-2`}>
      <Heading size={'md'} textAlign={'center'}><Link href='/'>ORGANIZA TU SEMANA</Link></Heading>
      {user && (
        <>
          <div className='flex flex-row justify-center gap-3'>
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
          <Nav />
        </>
      )}
    </header>
  );
}

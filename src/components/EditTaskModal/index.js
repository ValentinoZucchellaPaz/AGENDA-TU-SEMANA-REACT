import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
  Button,
  AlertDialogFooter,
  MenuItem,
} from '@chakra-ui/react';
import { useRef } from 'react';
import Form from '../Form';

export default function EditTaskModal({ task }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <MenuItem onClick={onOpen}>Edit</MenuItem>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent px={6} w='fit-content' maxW='90vw'>
          <AlertDialogHeader py={2}>Editar Tarea</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Form
              task={task}
              submitButton={
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    onClick={onClose}
                    colorScheme='green'
                    ml={3}
                  >
                    Save
                  </Button>
                </AlertDialogFooter>
              }
            />
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

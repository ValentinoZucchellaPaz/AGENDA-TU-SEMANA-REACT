import Form from '../Form';

export default function FormContainer() {
  return (
    <div className='w-full md:w-2/3 bg-darkGray flex flex-col gap-3 justify-center items-center px-8 py-3 mt-10 rounded-xl text-white'>
      <Form heading='Agregar tarea' />
    </div>
  );
}

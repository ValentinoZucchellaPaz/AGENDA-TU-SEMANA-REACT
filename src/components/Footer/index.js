export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className='flex flex-row justify-center items-center h-14 w-full text-white bg-primary absolute b-0'>
      agenda tu semana | {year}
    </footer>
  );
}

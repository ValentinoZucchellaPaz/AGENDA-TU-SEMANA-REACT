import { navLinks } from '@/constants/links';
import Link from 'next/link';
import { Menu, MenuList, MenuItem, MenuButton, Button, MenuIcon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';


export default function Nav() {
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <nav className='mx-auto'>
      {
        isMobile ?
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='solid'
              w='fit-content'
            />
            <MenuList className='flex flex-col gap-2 justify-center items-center'>
              {
                navLinks.map(obj => <MenuItem key={obj.title} textColor={'black'} as={Link} href={obj.url}>{obj.title}</MenuItem>)
              }
            </MenuList>
          </Menu> :
          <div className='hidden md:flex flex-row justify-center gap-5'>
            {navLinks.map(obj => (
              <Link key={obj.title} href={obj.url} className='font-bold text-white hover:text-indigo-200 transition-all duration-300'>
                {obj.title}
              </Link>
            ))}
          </div>

      }
    </nav>
  )
}

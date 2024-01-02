import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-yellow-500 p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Left side - Logo/Icon */}
        <div className='flex items-center'>
          <Image src='/icon.png' width={40} height={40} alt='Logo' />
        </div>

        {/* Right side - Menu options */}
        <ul className='flex space-x-4'>
          <li className='nav-item'>
            <Link className='nav-link' href='/'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' href='/team'>
              Team
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' href='/docs'>
              Docs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

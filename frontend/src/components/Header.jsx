import React from 'react';

const Header = ({ category, title }) => (
  <div className='mb-10'>
    <p className='text-lg text-gray-400'>{category}</p>
    <p className='text-3xl font-extrabold tracking-tight text-gray-700 dark:text-gray-200'>
      {title}
    </p>
  </div>
);

export default Header;

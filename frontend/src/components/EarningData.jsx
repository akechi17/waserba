import React from 'react'

const EarningData = ({iconColor, iconBg, icon, amount, pcColor, percentage, title}) => {
  return (
    <div className='bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 w-44 p-4 pt-9 rounded-2xl '>
      <button
        type='button'
        style={{ color: iconColor, backgroundColor: iconBg }}
        className='text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl'
      >
        {icon}
      </button>
      <p className='mt-3'>
        <span className='text-lg font-semibold'>{amount}</span>
        <span className={`text-sm text-${pcColor} ml-2`}>{percentage}</span>
      </p>
      <p className={`text-sm text-${pcColor ? pcColor : 'gray-400'}  mt-1`}>{title}</p>
    </div>
  );
}

export default EarningData
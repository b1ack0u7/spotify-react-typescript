import React from 'react';

const SmallItem = ({img, text}: {img: string, text: string}) => {
  return (
    <div className='flex items-center w-[320px] xl:w-[520px] h-[64px] xl:h-[80px] bg-[#27252d] rounded-md transition hover:bg-[#3e3d44]'>
      <img className='max-w-full max-h-full rounded-l-md' src={img} alt='bgimage'/>
      <p className='mb-[2px] ml-4 font-semibold select-none xl:text-[16px]'>{text}</p>
    </div>
  )
}

export default SmallItem
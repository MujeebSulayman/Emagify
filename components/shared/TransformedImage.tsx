import Image from 'next/image';
import React from 'react'

const TransformedImage = ({title, image, type, transformationConfig, setIsTransforming,isTransforming, hasDownload = false}: TransformedImageProps) => {

  const downloadHandler = () => {};
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex-between'>
        <h3 className='h3-bold text-dark-600'>
          After
        </h3>
        {hasDownload && (
          <button className='download-btn' onClick={downloadHandler}>
           <Image src='/assets/icons/download.svg' alt='download' width='24' height='24' className='pb-[6px]'/>
          </button>
        )}
      </div>
    </div>
  )
}

export default TransformedImage
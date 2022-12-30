import React from 'react'
import { ISong } from '../../interfaces/interfaces'
import { useState } from 'react';

const SongItem = ({song, handleDownloadSong}: {song: ISong, handleDownloadSong: (music_id: string) => Promise<void>}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  return (
    <div 
      className='mx-4 rounded-md transition cursor-pointer group hover:bg-[#282828]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleDownloadSong(song.id)}
    >
      <div className='flex mx-4 my-2 items-center justify-between'>
        <div className='flex items-center'>
            { isHovered ?
              <i className='text-[16px] w-[16px] pr-10 font-light fi fi-sr-play transition ease-in-out duration-300 hover:scale-110'/>
              :
              <p className='text-[16px] w-[16px] pr-10 font-light'>{song.order}</p>
            }
          <div>
            <p>{song.name}</p>
            <span className='font-light text-[13px] hover:underline'>{song.artist_name}</span>
          </div>
        </div>

        <div className='flex gap-x-14 mr-6'>
          { isHovered &&
            <i className='fi fi-rr-heart transition hover:text-teal-200'/>
          }
          <p className='text-right font-light text-gray-400'>5:20</p>
        </div>
      </div>
    </div>
  )
}

export default SongItem
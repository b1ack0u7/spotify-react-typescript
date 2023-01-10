import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { IAudio, ISong } from '../../interfaces/interfaces';

const SongItem = ({song, currentSong, handleDownloadSong, setLCurrentSong}: {song: ISong, currentSong: IAudio | null, handleDownloadSong?: (currentSongData: ISong) => Promise<void>, setLCurrentSong: React.Dispatch<React.SetStateAction<IAudio>>}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  return (
    <div 
      className='mx-4 rounded-md transition cursor-pointer group hover:bg-[#282828]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setLCurrentSong(song as IAudio)}
    >
      <div className='flex mx-[2px] md:mx-4 my-2 items-center justify-between'>
        <div className='flex items-center'>
          { currentSong?.id == song.id && currentSong?.isLoading ? 
              <div className='pr-5'>
                <CircularProgress
                  size={20}
                  thickness={6}
                  sx={{
                    color: '#E5E7EB'
                  }}
                />
              </div>
            :
              currentSong?.id == song.id && currentSong?.order == song.order ?
                <>
                  { isHovered ?
                    <i className='text-[16px] w-[16px] pr-10 font-light fi fi-sr-pause'/>
                    :
                    <i className='text-[16px] w-[16px] pr-10 font-light fi fi-sr-play'/>
                  }
                </>
                :
                <>
                  { isHovered ?
                    <i className='text-[16px] w-[16px] pr-10 font-light fi fi-sr-play'/>
                    :
                    <p className='text-[16px] w-[16px] pr-10 font-light'>{song.order}</p>
                  }
                </>
          }
          <div>
            <p>{song.name}</p>
            <span className='font-light text-[13px] hover:underline'>{song.artist_name}</span>
          </div>
        </div>

        <div className='flex gap-x-14 mr-[18px] md:mr-6'>
          <i className='fi fi-rr-heart hidden transition opacity-0 md:block group-hover:opacity-100 md:hover:text-teal-200'/>
          <p className='text-right font-light text-gray-400'>5:20</p>
        </div>
      </div>
    </div>
  )
}

export default SongItem
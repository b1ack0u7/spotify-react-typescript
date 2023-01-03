import { Slider } from '@mui/material';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';

const useHover = () => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  const onMouseEnter = useCallback(() => setIsHovered(true),[]);
  const onMouseLeave = useCallback(() => setIsHovered(false),[]);
  const classN = isHovered ? 'sr' : 'rr';
  return { isHovered, onMouseEnter, onMouseLeave, classN };
}

const Controls = () => {
  const songObject = useSelector((state: RootState) => state.audioReducer);
  const currentPath = useLocation().pathname;
  const rewind = useHover();
  const play = useHover();
  const forward = useHover();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<string>('0:00');
  
  const audioRef = useRef<HTMLAudioElement>(new Audio(songObject.audio_file));
  const intervalRef = useRef<any>();

  const { duration } = audioRef.current;
  const exceptionsPaths: string[] = ['/app', '/app/search'];

  const convertSecondsToDuration = (value: number): string => `${Math.floor(value / 60)}:${String(Math.ceil(value % 60)).padStart(2, '0')}`;
  
  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        //Next track
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const onScrub = (value: number) => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);

    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer();
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying]);

  useEffect(() => {
    if (songObject.audio_file) {
      if (exceptionsPaths.find(i => i == currentPath)) {
        setIsPlaying(true);
      } else {
          clearInterval(intervalRef.current);
          setTrackProgress(0);
          setIsPlaying(false);
          const audioTemp = new Audio(songObject.audio_file)
          
          setTimeout(() => {
            audioRef.current = audioTemp;
            setTotalDuration(convertSecondsToDuration(audioTemp.duration))
            setIsPlaying(true);
          }, 100);
        }
    }

    return (() => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    });
  }, [songObject.audio_file]);
  

  return (
    <div className='absolute bottom-0 flex w-full h-[90px] text-white bg-[#181818] border-t border-[#282828]'>
      <div className='grid w-full place-content-center grid-cols-3 mx-4'>
        <div className='flex items-center'>
          <div className='mr-8'>
            <p className='select-none text-[15px]'>{songObject.name ?? 'None'}</p>
            <p className='select-none text-[12px] text-gray-300 transition hover:text-white'>{songObject.artist_name ?? 'None'}</p>
          </div>
          <div className='mt-1'>
            <i className='fi fi-rr-following mr-4 text-gray-300 transition hover:text-white'/>
            <i className='fi fi-rr-computer text-gray-300 transition hover:text-white'/>
          </div>
        </div>

        <div>
          <div className='grid grid-flow-col place-items-center mx-8'>
            <i className='fi fi-rr-shuffle cursor-pointer'/>
            <button
              className='disabled:text-gray-500'
              disabled={!songObject.audio_file}
              {...rewind}
            >
              <i className={`fi fi-${rewind.classN}-rewind`}/>
            </button>
            <button
              className='disabled:text-gray-500'
              disabled={!songObject.audio_file}
              onClick={() => setIsPlaying(!isPlaying)}
              {...play}
            >
              <i className={`fi fi-${play.classN}-${isPlaying ? 'pause' : 'play'}`}/>
            </button>
            <button
              className='disabled:text-gray-500'
              disabled={!songObject.audio_file}
              {...forward}
            >
              <i className={`fi fi-${forward.classN}-forward`}/>
            </button>
            <i  className='fi fi-rr-refresh cursor-pointer'/>
          </div>

          <div className='flex items-center gap-x-4 select-none'>
            <p className='text-[12px] text-gray-300 w-[40px] text-center'>{convertSecondsToDuration(trackProgress)}</p>
            <Slider
              aria-label="time-indicator"
              disabled={!songObject.audio_file}
              max={duration}
              min={0}
              onChange={(_: any, value: any) => onScrub(value as number)}
              onChangeCommitted={() => audioRef.current.play()}
              size="small"
              step={1}
              value={trackProgress}
              valueLabelDisplay="off"
              sx={{
                color: '#fff',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)',
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <p className='text-[12px] text-gray-300 w-[40px] text-center'>{totalDuration}</p>
          </div>
        </div>

        <div className='grid grid-flow-col gap-x-8 place-content-end my-auto'>
          <i className='fi fi-rr-microphone'/>
          <i className='fi fi-rr-apps-sort'/>
          <i className='fi fi-rr-screen'/>
          <i className='fi fi-rr-headphones'/>
        </div>
      </div>
    </div>
  )
}

export default Controls
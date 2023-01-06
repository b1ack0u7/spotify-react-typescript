import { Slider } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFile } from '../../firebase/firebaseManager';
import { setIsLoading, setIsPlaying } from '../../redux/slices/audioSlice';
import { RootState } from '../../redux/store';

const useHover = () => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  const onMouseEnter = useCallback(() => setIsHovered(true),[]);
  const onMouseLeave = useCallback(() => setIsHovered(false),[]);
  const classN = isHovered ? 'sr' : 'rr';
  return { isHovered, onMouseEnter, onMouseLeave, classN };
}

const Controls = () => {
  const dispatch = useDispatch();
  const forward = useHover();
  const play = useHover();
  const rewind = useHover();
  const songObject = useSelector((state: RootState) => state.audioReducer);

  const [totalDuration, setTotalDuration] = useState<string>('0:00');
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const intervalRef = useRef<any>();

  const { duration } = audioRef.current;

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

    if (!songObject.isPlaying) {
      dispatch(setIsPlaying(true));
    }
    startTimer();
  };

  const initializeSong = async () => {
    dispatch(setIsLoading(true));
    const audioTemp = new Audio (await fetchFile('music', songObject.id+'.mp3'));
    dispatch(setIsLoading(false));
    clearInterval(intervalRef.current);

    setTimeout(()=> {
      audioRef.current = audioTemp;
      setTotalDuration(convertSecondsToDuration(audioTemp.duration));
      dispatch(setIsPlaying(true));
    }, 100);
  };

  useEffect(() => {
    if (songObject.isPlaying) {
      audioRef.current.play()
      startTimer();
    } else {
      audioRef.current.pause()
    }
  }, [songObject.isPlaying]);
  
  useEffect(() => {
    if (songObject.id) {
      initializeSong();
    }

    return (() => {
      dispatch(setIsPlaying(false));
      setTrackProgress(0);
      clearInterval(intervalRef.current);
    });
  }, [songObject.id]);

  return (
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
            disabled={!songObject.id || songObject.isLoading}
            {...rewind}
          >
            <i className={`fi fi-${rewind.classN}-rewind`}/>
          </button>
          <button
            className='disabled:text-gray-500'
            disabled={!songObject.id || songObject.isLoading}
            onClick={() => dispatch(setIsPlaying(!songObject.isPlaying))}
            {...play}
          >
            <i className={`fi fi-${play.classN}-${songObject.isPlaying ? 'pause' : 'play'}`}/>
          </button>
          <button
            className='disabled:text-gray-500'
            disabled={!songObject.id || songObject.isLoading}
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
            disabled={!songObject.id || songObject.isLoading}
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
        <i className='fi fi-rr-microphone text-gray-300 transition hover:text-white'/>
        <i className='fi fi-rr-apps-sort text-gray-300 transition hover:text-white'/>
        <i className='fi fi-rr-screen text-gray-300 transition hover:text-white'/>
        <i className='fi fi-rr-headphones text-gray-300 transition hover:text-white'/>
      </div>
    </div>
  )
}

export default Controls
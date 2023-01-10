import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDocument } from '../../firebase/firebaseManager';
import { encodeB64 } from '../../helpers/base64';
import { IAlbum, IAudio } from '../../interfaces/interfaces';
import { setCurrentSong, setIsPlaying } from '../../redux/slices/audioSlice';

const MediumItem = ({albumData, currentSong}: {albumData: IAlbum, currentSong: IAudio}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const getRandomSong = (song_list: string[]) => {
    return song_list[Math.floor(Math.random() * song_list.length)];
  }
  
  const handlePlayRandomSong = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (albumData.id == currentSong.album.id) {
      dispatch(setIsPlaying(!currentSong.isPlaying));
    } else {
      let randomSongData: IAudio = await fetchDocument('songs', getRandomSong(albumData.song_list));
      if (albumData.isMix) {
        randomSongData.album = {
          id: albumData.id,
          name: albumData.album_name
        };
      }
      dispatch(setCurrentSong(randomSongData));
    }
  }

  return (
    <div
      className='relative w-[149px] h-[239px] lg:w-[178px] lg:h-[268px] xl:w-[207px] xl:h-[297px] bg-[#181818] p-4 rounded-lg cursor-pointer transition group hover:bg-[#282828]'
      onClick={() => navigate('/app/album/'+encodeB64({stringToEncode: albumData.id}))}
    >
      <img
        alt=''
        className='rounded-sm lg:rounded-md'
        onDragStart={(e) => e.preventDefault()}
        src={albumData.thumbnail}
      />
      <button
        className='absolute opacity-100 w-[40px] h-[40px] bottom-[7.1rem] right-[1.5rem] bg-emerald-400 rounded-full transition ease-in-out hidden md:block md:group-hover:opacity-100 md:hover:scale-110 disabled:cursor-not-allowed'
        onClick={handlePlayRandomSong}
        disabled={currentSong.isLoading}
      >
        <div className='flex items-center justify-center text-center'>
          { albumData.id == currentSong.album.id && currentSong.isLoading ?
              <CircularProgress
                size={20}
                thickness={6}
                sx={{
                  color: '#E5E7EB'
                }}
              />
            :
            albumData.id == currentSong.album.id && currentSong.isPlaying ?
              <i className='mt-[5px] fi fi-sr-pause'/>
            :
              <i className='mt-[5px] fi fi-sr-play'/>
          }
        </div>
      </button>
      <p className='mt-5 mb-2'>{albumData.album_name}</p>
      <p className='text-gray-400 font-light text-[13px] underline'>{albumData.artist.name}</p>
    </div>
  )
}

export default MediumItem
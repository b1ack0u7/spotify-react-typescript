import { encodeB64 } from '../../helpers/base64';
import { IAlbum, IAudio } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

const MediumItem = ({albumData, currentSong}: {albumData: IAlbum, currentSong: IAudio}) => {
  console.log("🚀 ~ file: MediumItem.tsx:6 ~ MediumItem ~ currentSong", currentSong)
  console.log("🚀 ~ file: MediumItem.tsx:6 ~ MediumItem ~ albumData", albumData)
  const navigate = useNavigate();

  return (
    <div
      className='relative w-[178px] h-[268px] xl:w-[207px] xl:h-[297px] bg-[#181818] p-4 rounded-lg cursor-pointer transition group hover:bg-[#282828]'
      onClick={() => navigate('/app/album/'+encodeB64({stringToEncode: albumData.id}))}
    >
      <img
        alt=''
        className='rounded-sm'
        onDragStart={(e) => e.preventDefault()}
        src={albumData.thumbnail}
      />
      <div className='absolute opacity-0 w-[40px] h-[40px] bottom-[7.1rem] right-[1.5rem] bg-emerald-400 rounded-full transition ease-in-out group-hover:opacity-100 hover:scale-110'>
        <div className='mt-[10px] text-center'>
          <i className='fi fi-sr-play'/>
        </div>
      </div>
      <p className='mt-5 mb-2'>{albumData.album_name}</p>
      <p className='text-gray-400 font-light text-[13px] underline'>{albumData.artist.name}</p>
    </div>
  )
}

export default MediumItem
import { orderBy, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import SongItem from '../components/album/SongItem';
import Redirectors from "../components/ui/Redirectors";
import { fetchCollection, fetchDocument, fetchFile } from '../firebase/firebaseManager';
import { decodeB64 } from "../helpers/base64";
import { IAlbum, IArtist, IAudio, ISong } from '../interfaces/interfaces';
import { setCurrentSong } from '../redux/slices/audioSlice';
import { RootState } from '../redux/store';

const Album = () => {
  const { idAlbum } = useParams<string>();
  const dispatch = useDispatch();
  const currentSong = useSelector((state: RootState) => state.audioReducer);
  
  const [albumData, setAlbumData] = useState<IAlbum | null>(null);
  const [artistData, setArtistData] = useState<IArtist | null>(null);
  const [lCurrentSong, setLCurrentSong] = useState<IAudio>(currentSong);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<ISong[]>([]);

  const loadAlbum = async() => {
    const decodedAlbumId:string = decodeB64({stringToDecode: idAlbum!});
    
    let songList: ISong[] = [];
    let albumInfo = await fetchDocument('albums', decodedAlbumId) as IAlbum;
    albumInfo.thumbnail = await fetchFile('icons', albumInfo.thumbnail);
    
    let artistInfo = await fetchDocument('artists', albumInfo.artist.id) as IArtist;
    artistInfo.picture = await fetchFile('profile_pictures', artistInfo.picture);

    songList = await fetchCollection('songs', where('album.id', '==', decodedAlbumId), orderBy('order', 'asc'));
    
    setAlbumData({...albumInfo});
    setArtistData({...artistInfo});
    setSongs([...songList]);
    setIsLoading(false);
  };

  useMemo(() => dispatch(setCurrentSong(lCurrentSong)), [lCurrentSong]);

  useEffect(() => {
    loadAlbum();
  }, []);
  
  if (!isLoading) {
    return (
      <div className='select-none'>
        <Redirectors />
        
        <div className='flex gap-x-8 my-8'>
          <img 
            alt=''
            className="w-[192px] h-[192px] xl:w-[232px] xl:h-[232px]"
            onDragStart={(e) => e.preventDefault()}
            src={albumData?.thumbnail}
          />
  
          <div className='flex flex-col my-4'>
            <p className='text-[14px]'>ÁLBUM</p>
            <p className='font-extrabold text-[4rem] xl:text-[5.5rem]'>{albumData?.album_name}</p>
  
            <div className='flex gap-x-2 items-center'>
              <img
                alt=''
                className="w-[25px] h-[25px] rounded-full"
                onDragStart={(e) => e.preventDefault()}
                src={artistData?.picture}
              />
              <p className='capitalize font-semibold hover:underline cursor-pointer'>{albumData?.artist.name}</p>
              <i className='bg-white mt-1 w-[6px] h-[6px] rounded-full'/>
            </div>
          </div>
        </div>

        <div className='flex flex-col border-b border-indigo-300 border-opacity-20 mb-4'>
          <div className='flex my-2 mx-8 text-[14px]'>
            <p className='w-[16px] pr-10 font-light text-[#B3B3B3]'>#</p>
            <div className='flex flex-1'>
              <p className='w-full font-light text-[#B3B3B3]'>TÍTULO</p>
              <p className='w-full text-right font-light text-[#B3B3B3]'>DURACIÓN</p>
            </div>
          </div>
        </div>

        <div className='grid grid-flow-row'>
          { 
            songs.map((item, idx) => 
              <SongItem 
                key={idx}
                song={item}
                currentSong={currentSong}
                setLCurrentSong={setLCurrentSong}
              />
            )
          }
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Album
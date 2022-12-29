import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Redirectors from "../components/ui/Redirectors";
import { db } from "../firebase/config";
import { fetchDocument, fetchImage } from '../firebase/firebaseManager';
import { decodeB64 } from "../helpers/base64";
import { IAlbum, ISong } from '../interfaces/interfaces';

const Album = () => {
  const { idAlbum } = useParams<string>();
  
  const [songs, setSongs] = useState<ISong[]>([]);
  const [albumData, setAlbumData] = useState<IAlbum | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAlbum = async() => {
    let songList: ISong[] = [];
    const decodedAlbumId:string = decodeB64({stringToDecode: idAlbum!});
    
    let albumPreData = await fetchDocument('albums', decodedAlbumId) as IAlbum;
    albumPreData.thumbnail = await fetchImage('icons', albumPreData.thumbnail);
    
    const songQuery = await getDocs(query(collection(db, 'songs'), where('album.id', '==', decodedAlbumId), orderBy('order', 'desc')));
    songQuery.forEach(item => songList.push({...item.data()} as ISong));
    
    setAlbumData({...albumPreData});
    setSongs([...songList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAlbum();
  }, []);
  
  if (!isLoading)
  return (
    <div>
      <Redirectors />
      
      <div className='flex gap-x-8 mt-8'>
        <img 
          className="w-[232px] h-[232px]"
          src={albumData?.thumbnail}
        />

        <div className='flex flex-col my-4'>
          <p className='text-[14px]'>ÁLBUM</p>
          <p className='font-extrabold text-[6rem] uppercase'>{albumData?.album_name}</p>
          <p>{albumData?.artist}</p>
        </div>
      </div>

      { 
        songs.map(i => 
          <p>{i.name} {i.order}</p>
        )
      }
    </div>
  )
}

export default Album
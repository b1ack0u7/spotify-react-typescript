import { documentId, orderBy, where } from 'firebase/firestore';
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import SongItem from '../components/album/SongItem';
import { fetchCollection, fetchDocument, fetchFile } from '../firebase/firebaseManager';
import { decodeB64 } from "../helpers/base64";
import { IAlbum, IArtist, IAudio, ISong } from '../interfaces/interfaces';
import { setCurrentSong } from '../redux/slices/audioSlice';
import { RootState } from '../redux/store';
import { Stack } from '@mui/system';
import { Skeleton, Box, Grid } from '@mui/material';

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

    let albumInfo: IAlbum = await fetchDocument('albums', decodedAlbumId);
    albumInfo.thumbnail = await fetchFile('album_thumbnails', albumInfo.thumbnail);
    
    let artistInfo: IArtist = await fetchDocument('artists', albumInfo.artist.id) ;
    artistInfo.picture = await fetchFile('profile_pictures', artistInfo.picture);

    if (albumInfo.isMix) {
      songList = await fetchCollection('songs', where(documentId(), 'in', albumInfo.song_list));
      songList.forEach((item, idx) => {
        item.order = idx+1;
      });
    } else {
      songList = await fetchCollection('songs', where('album.id', '==', decodedAlbumId), orderBy('order', 'asc'));
    }
    
    setAlbumData({...albumInfo});
    setArtistData({...artistInfo});
    setSongs([...songList]);
    setIsLoading(false);
  };

  useMemo(() => {
    let tempCurrentSong: IAudio = {...lCurrentSong};
    if (albumData?.isMix) {
      tempCurrentSong.album = {
        id: albumData.id,
        name: albumData.album_name
      };
    }
    dispatch(setCurrentSong(tempCurrentSong));
  }, [lCurrentSong]);

  useEffect(() => {
    loadAlbum();
  }, []);
  
  return (
    <div className='select-none'>        
      <div className='flex gap-x-8 my-8'>
        { isLoading ?
          <Skeleton
            variant="rounded"
            width={192}
            height={192}
            animation="wave"
            sx={{ bgcolor: 'grey.800' }}
          />
          :
          <img 
            alt=''
            className="w-[122px] h-[122px] md:w-[192px] md:h-[192px] xl:w-[232px] xl:h-[232px]"
            onDragStart={(e) => e.preventDefault()}
            src={albumData?.thumbnail}
          />
        }

        <div className='flex flex-col my-auto'>
          { isLoading ? 
            <Skeleton
              variant="text"
              animation="wave"
              width={200}
              sx={{ bgcolor: 'grey.800', fontSize: '1rem' }}
            />
            :
            <p className='text-[12px] md:text-[14px]'>ÁLBUM</p>
          }

          { isLoading ? 
            <Skeleton
              variant="text"
              animation="wave"
              width={300}
              sx={{ bgcolor: 'grey.800', fontSize: '6rem' }}
            />
            :
            <p className='font-extrabold text-[1.8rem] md:text-[4rem] xl:text-[5.5rem] break-al'>{albumData?.album_name}</p>
          }

          <div className='flex gap-x-2 items-center'>
            { isLoading ?
              <Skeleton
                variant="circular"
                animation="wave"
                width={25}
                height={25}
                sx={{ bgcolor: 'grey.800', fontSize: '6rem' }}
              />
              :
              <img
                alt=''
                className="w-[15px] h-[15px] md:w-[25px] md:h-[25px] rounded-full"
                onDragStart={(e) => e.preventDefault()}
                src={artistData?.picture}
              />
            }

            { isLoading ? 
              <Skeleton
                variant="text"
                animation="wave"
                width={265}
                sx={{ bgcolor: 'grey.800', fontSize: '1rem' }}
              />
              :
              <>
                <p className='capitalize font-semibold text-[13px] md:text-[16px] hover:underline cursor-pointer'>{albumData?.artist.name}</p>
                <i className='bg-white md:mt-1 w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full'/>
              </>
            }
          </div>
        </div>
      </div>

      <div className='flex flex-col border-b border-indigo-300 border-opacity-20 mb-4'>
        <div className='flex my-2 mx-4 md:mx-8 text-[14px]'>
          <p className='w-[16px] pr-10 font-light text-[#B3B3B3]'>#</p>
          <div className='flex flex-1'>
            <p className='w-full font-light text-[#B3B3B3]'>TÍTULO</p>
            <p className='w-full text-right font-light text-[#B3B3B3]'>DURACIÓN</p>
          </div>
        </div>
      </div>

      <div className='grid grid-flow-row'>
        { songs.length == 0 ?
          <Skeleton
            variant="text"
            animation="wave"
            width={265}
            sx={{ bgcolor: 'grey.800', fontSize: '1rem' }}
          />
          :
          songs.map((item, idx) => 
            <SongItem 
              key={idx}
              currentSong={currentSong}
              setLCurrentSong={setLCurrentSong}
              song={item}
            />
          )
        }
      </div>
    </div>
  )
}

export default Album
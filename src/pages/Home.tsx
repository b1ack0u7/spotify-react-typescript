import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
import { useEffect, useState } from 'react';
import MediumItem from '../components/home/MediumItem';
import SmallItem from '../components/home/SmallItem';
import Redirectors from '../components/ui/Redirectors';
import { fetchCollection, fetchFile } from '../firebase/firebaseManager';
import { IAlbum } from '../interfaces/interfaces';

const Home = () => {
  const [albums, setAlbums] = useState<IAlbum[] | null>(null);
  const fetchAlbums = async() => {
    let albumList: IAlbum[] = [];
    let promiseThumbnails: Promise<string>[] = [];
  
    albumList = await fetchCollection('albums');
    albumList.forEach(item => promiseThumbnails.push(fetchFile('icons', item.thumbnail)));
    await Promise.all(promiseThumbnails)
    .then((thumbnails) => thumbnails.forEach((item, idx) => albumList[idx].thumbnail = item));

    setAlbums([...albumList]);
  };

  const determineWelcomeText = (): string => {
    const currentHour = Number(moment(new Date()).format('HH'));
    let welcomeLabel;

    if (currentHour > 5 && currentHour < 12 ) {
      welcomeLabel = 'Días';
    } else if (currentHour >= 12 && currentHour < 19) {
      welcomeLabel = 'Tardes';
    } else {
      welcomeLabel = 'Noches';
    }

    return 'Buenas ' + welcomeLabel;
  };

  useEffect(() => {
    fetchAlbums();
  }, []);
  
  return (
    <div className='select-none'>
      <Redirectors />

      <p className='font-bold text-[2.2rem] mb-6'>{determineWelcomeText()}</p>
      <p className='font-bold text-[1.3rem] mb-4'>Escudado recientemente</p>
      <div className='grid grid-cols-4 gap-x-5 mb-6'>
        { albums ?
          albums.map((item, idx) => 
            <MediumItem
              key={idx}
              albumData={item}
            />  
          )
          :
          <Stack>
            <Skeleton
              variant="rounded"
              width={210}
              height={60}
              animation="wave"
              sx={{ bgcolor: 'grey.800' }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ bgcolor: 'grey.800', fontSize: '1rem' }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ bgcolor: 'grey.800', fontSize: '1rem' }}
            />
          </Stack>
        }
      </div>

      <p className='font-bold text-[1.3rem] mb-6'>Tus mixes</p>

      <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
        <SmallItem text='slouzzz phonk music' img='https://i.scdn.co/image/ab67706c0000da8492148c680bf2baa3fd47303e'/>
        <SmallItem text='Adrenaline Workout' img='https://i.scdn.co/image/ab67706f00000002929e39d3550da276515b31f2'/>
        <SmallItem text='Broken Heart' img='https://i.scdn.co/image/ab67706f0000000250f34f0e7a0b73effe02fa6f'/>
        <SmallItem text='GYM' img='https://mosaic.scdn.co/300/ab67616d00001e025f4c9262d32be3019e1dda3eab67616d00001e027abf4b0f94830241dcf61f6eab67616d00001e02be86ef103692ddebae2ec8cbab67616d00001e02daa4a83d2f794c1e31265dab'/>
      </div>
    </div>
  )
}

export default Home
import { Navigate, Route, Routes } from 'react-router-dom';
import Album from '../pages/Album';
import Controls from '../components/ui/Controls';
import Home from '../pages/Home';
import Sidebar from '../components/ui/Sidebar';
import Redirectors from '../components/ui/Redirectors';

const Layout = () => {
  return (
    <div className='flex flex-col font-[Inter] bg-[#121212] h-screen'>
      <div className='flex h-[612px] xl:h-[747px] 2xl:h-[770px]'>
        <div className='w-[265px] bg-black select-none'>
          <Sidebar/>
        </div>

        <div className='text-white mx-7 mt-7 overflow-y-scroll'>
          <Redirectors />

          <div className='flex flex-col mt-12 mb-4'>
            <Routes>
              <Route path='/home' element={<Home/>}/>
              <Route path='/album/:idAlbum' element={<Album/>}/>

              <Route path='/' element={<Navigate replace to='/app/home'/>}/>
            </Routes>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 flex w-full h-[90px] text-white bg-[#181818] border-t border-[#282828]'>
        <Controls/>
      </div>
    </div>
  )
}

export default Layout

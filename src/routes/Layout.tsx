import { Navigate, Route, Routes } from 'react-router-dom';
import Album from '../pages/Album';
import Controls from '../components/ui/Controls';
import Home from '../pages/Home';
import Sidebar from '../components/ui/Sidebar';

const Layout = () => {
  return (
    <div className='flex font-[Inter] h-screen bg-[#121212]'>
      <Sidebar/>

      <div className='w-full text-white'>
        <div className='m-7'>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/album/:idAlbum' element={<Album/>}/>

            <Route path='/' element={<Navigate replace to='/app/home'/>}/>
          </Routes>
        </div>
      </div>

      <Controls/>
    </div>
  )
}

export default Layout

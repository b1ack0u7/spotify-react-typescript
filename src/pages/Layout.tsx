import { Navigate, Route, Routes } from 'react-router-dom';
import Album from './Album';
import Controls from '../components/ui/Controls';
import Home from './Home';
import Sidebar from '../components/ui/Sidebar';

const Layout = () => {
  return (
    <div className='flex yfont-[Inter] h-screen bg-[#121212]'>
      <Sidebar/>

      <div className='m-7 text-white'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/album/:idAlbum' element={<Album/>}/>
        </Routes>
      </div>

      <Controls/>
    </div>
  )
}

export default Layout

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Controls from '../components/ui/Controls';
import Redirectors from '../components/ui/Redirectors';
import Sidebar from '../components/ui/Sidebar';
import Album from '../pages/Album';
import Home from '../pages/Home';

const Layout = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='flex flex-col font-[Inter] bg-[#121212] h-screen'>
      <div className='flex h-[751px] lg:h-[612px] xl:h-[747px] 2xl:h-[770px]'>
        <motion.div
          className='absolute top-[31px] left-[8.5rem] flex items-center justify-center w-[32px] h-[32px] rounded-full bg-white z-10 lg:hidden'
          animate={{ x: showMenu ? 60 : 0 }}
          onClick={() => setShowMenu(!showMenu)}
          transition={{ ease: "easeInOut", duration: 0.2 }}
        >
          <i className='mt-1 fi fi-br-menu-burger'/>
        </motion.div>

        <AnimatePresence>
          { showMenu &&
            <>
              <div 
                className='absolute w-full h-full z-20'
                onClick={() => setShowMenu(false)}
              ></div>
              <motion.div
                className='w-[180px] bg-black select-none absolute z-20 h-screen md:hidden'
                initial={{ x: '-20vh' }}
                animate={{ x: 0 }}
                exit={{ x: '-20vh' }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
              >
                <Sidebar setShowMenu={setShowMenu}/>
              </motion.div>
            </>
          }
        </AnimatePresence>

        <div className='w-[265px] bg-black select-none hidden md:block'>
          <Sidebar/>
        </div>

        <div className='flex-1 text-white mx-7 mt-7 overflow-y-scroll'>
          <Redirectors />

          <div className='flex flex-col mt-12 mb-[90px] md:mb-4'>
            <Routes>
              <Route path='/home' element={<Home/>}/>
              <Route path='/album/:idAlbum' element={<Album/>}/>

              <Route path='/' element={<Navigate replace to='/app/home'/>}/>
            </Routes>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 flex w-full h-[90px] text-white bg-[#181818] border-t border-[#282828] z-30'>
        <Controls/>
      </div>
    </div>
  )
}

export default Layout

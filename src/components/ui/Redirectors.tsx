import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Redirectors = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed flex gap-x-5">
      <motion.i 
        className="fi fi-sr-angle-circle-left text-[2rem] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={() => navigate(-1)}
      />

      <motion.i 
        className="fi fi-sr-angle-circle-right text-[2rem] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={() => navigate(1)}
      />
    </div>
  )
}

export default Redirectors
import { db, storage } from './config';
import { doc, getDoc } from 'firebase/firestore';
import { getBlob, ref } from 'firebase/storage';

const fetchDocument = async(document:string, value:string):Promise<Object> => {
  const albumQuery = await getDoc(doc(db, document, value));
  if (!albumQuery.exists()) {
    return {...albumQuery.data(), success: true}
  }
  return {success: false, reason: 'No existe'};
}

const fetchImage = async(folder:string, imageName:string):Promise<string> => {
  const blob = await getBlob(ref(storage, `${folder}/${imageName}`));
  return URL.createObjectURL(blob);
}

export {
  fetchDocument,
  fetchImage,
}
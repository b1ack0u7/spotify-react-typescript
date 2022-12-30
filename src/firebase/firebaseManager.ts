import { db, storage } from './config';
import { doc, getDoc, getDocs, query, collection, QueryConstraint } from 'firebase/firestore';
import { getBlob, ref } from 'firebase/storage';

const fetchCollection = async <T>(collectionName: string, ...queryConstrains: QueryConstraint[]): Promise<T[]> => {
  const collectQuery = await getDocs(query(collection(db, collectionName), ...queryConstrains));
  let collectionList:T[] = [];
  collectQuery.forEach(item => collectionList.push({...item.data(), id: item.id} as T));
  return collectionList;
}

const fetchDocument = async(document: string, value: string): Promise<Object> => {
  const documentQuery = await getDoc(doc(db, document, value));
  if (documentQuery.exists()) {
    return {...documentQuery.data(), success: true}
  }
  return {success: false, reason: `El objeto en el documento "${document}" con valor "${value}" no existe`};
}

const fetchFile = async(folder: string, fileName: string): Promise<string> => {
  const blob = await getBlob(ref(storage, `${folder}/${fileName}`));
  return URL.createObjectURL(blob);
}

export {
  fetchCollection,
  fetchDocument,
  fetchFile,
}
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const deleteItem = async (collectionItem: string, idItem: string) => {
  
  await deleteDoc(doc(db, collectionItem, idItem))
}

const getNumberNewServiceOrder = async () => {

  const docRef = doc(db, "numberNewServiceOrder", "number");
  const docSnap = await getDoc(docRef);  
    
  if(docSnap.exists())
    return docSnap.data().number
  else
    return "1000"
}

const updateNumberNewServiceOrder = async () => {

  const docRef = doc(db, "numberNewServiceOrder", "number");
  const docSnap = await getDoc(docRef);  
    
  if (docSnap.exists()) {
    let newNumber = docSnap.data().number + 1
    await setDoc(doc(db, "numberNewServiceOrder", "number"), { number: newNumber.toString() });
  }
}



export const GeneralFunctions = {deleteItem, getNumberNewServiceOrder, updateNumberNewServiceOrder}
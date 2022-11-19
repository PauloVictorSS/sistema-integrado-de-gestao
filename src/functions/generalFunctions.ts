import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

const deleteItem = async (collectionItem:string, idItem: string) => {

  await deleteDoc(doc(db, collectionItem, idItem))
}

export const GeneralFunctions = {deleteItem}
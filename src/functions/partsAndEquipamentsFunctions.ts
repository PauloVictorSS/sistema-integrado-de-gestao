import { db } from "../config/firebase"
import { collection, query, getDocs, doc, setDoc, addDoc } from "firebase/firestore"; 
import { IPartsAndEquipaments } from "../interfaces/IPartsAndEquipaments";
import { ISearchParametersPartsAndEquipaments } from "../interfaces/ISearchParameters";

const getAll = async () => {
  const q = query(collection(db, "partsAndEquipaments"))
  const querySnapshot = await getDocs(q)

  let allPartsAndEquipaments: Array<IPartsAndEquipaments> = []

  querySnapshot.forEach((partsAndEquipaments) => {
    let id = partsAndEquipaments.id
    let infos = { ...partsAndEquipaments.data() }
    
    allPartsAndEquipaments.push({
      id,
      model: infos.model,
      application: infos.application,
      type: infos.type,
      qtd: infos.qtd,
      brand: infos.brand,
    })
  });
  
  return allPartsAndEquipaments
}

const filterPartsAndEquipaments = (partsAndEquipaments:IPartsAndEquipaments, searchParameters:ISearchParametersPartsAndEquipaments) => {

  const model = partsAndEquipaments.model.toLowerCase()
  const application = partsAndEquipaments.application.toLowerCase()
  const type = partsAndEquipaments.type.toLowerCase()
  const brand = partsAndEquipaments.brand.toLowerCase()

  const partsAndEquipamentsHasTheAttributes = (model.includes(searchParameters.search) || 
                                    application.includes(searchParameters.search) || 
                                    type.includes(searchParameters.search) || 
                                    brand.includes(searchParameters.search))
  
  return partsAndEquipamentsHasTheAttributes
}

const applyFilters = (allPartsAndEquipaments:Array<IPartsAndEquipaments>, currentPage:number, searchParameters:ISearchParametersPartsAndEquipaments) => {
  let filteredPartsAndEquipaments: Array<IPartsAndEquipaments> = []

  filteredPartsAndEquipaments = allPartsAndEquipaments

  if (searchParameters.search !== "") {
    filteredPartsAndEquipaments = filteredPartsAndEquipaments.filter(partsAndEquipaments => {
      return filterPartsAndEquipaments(partsAndEquipaments, searchParameters)
    })
  }

  filteredPartsAndEquipaments = filteredPartsAndEquipaments.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)

  return filteredPartsAndEquipaments
}

const addNewPartsAndEquipaments = async (infos:IPartsAndEquipaments) => {

  await addDoc(collection(db, "partsAndEquipaments"), infos);
}

const savePartsAndEquipaments = async (infos:IPartsAndEquipaments) => {

  const infosWithoutID = {
    model: infos.model,
    application: infos.application,
    qtd: infos.qtd,
    type: infos.type,
    brand: infos.brand
  }
  
  await setDoc(doc(db, "partsAndEquipaments", infos.id), infosWithoutID);
}

export const PartsAndEquipaments = { getAll, applyFilters, addNewPartsAndEquipaments, savePartsAndEquipaments }
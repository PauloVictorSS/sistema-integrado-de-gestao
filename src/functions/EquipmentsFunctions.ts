import { db } from "../config/firebase"
import { collection, query, getDocs, doc, setDoc, addDoc } from "firebase/firestore"; 
import { IEquipments } from "../interfaces/IEquipments";
import { ISearchParametersEquipments } from "../interfaces/ISearchParameters";

const getAll = async () => {
  const q = query(collection(db, "partsAndEquipaments"))
  const querySnapshot = await getDocs(q)

  let allEquipments: Array<IEquipments> = []

  querySnapshot.forEach((Equipments) => {
    let id = Equipments.id
    let infos = { ...Equipments.data() }
    
    allEquipments.push({
      id,
      model: infos.model,
      application: infos.application,
      type: infos.type,
      qtd: infos.qtd,
      brand: infos.brand,
    })
  });
  
  return allEquipments
}

const filterEquipments = (Equipments:IEquipments, searchParameters:ISearchParametersEquipments) => {

  const model = Equipments.model.toLowerCase()
  const application = Equipments.application.toLowerCase()
  const type = Equipments.type.toLowerCase()
  const brand = Equipments.brand.toLowerCase()

  const EquipmentsHasTheAttributes = (model.includes(searchParameters.search) || 
                                    application.includes(searchParameters.search) || 
                                    type.includes(searchParameters.search) || 
                                    brand.includes(searchParameters.search))
  
  return EquipmentsHasTheAttributes
}

const applyFilters = (allEquipments:Array<IEquipments>, currentPage:number, searchParameters:ISearchParametersEquipments) => {
  let filteredEquipments: Array<IEquipments> = []

  filteredEquipments = allEquipments

  if (searchParameters.search !== "") {
    filteredEquipments = filteredEquipments.filter(Equipments => {
      return filterEquipments(Equipments, searchParameters)
    })
  }

  filteredEquipments = filteredEquipments.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)

  return filteredEquipments
}

const addNewEquipments = async (infos:IEquipments) => {

  await addDoc(collection(db, "partsAndEquipaments"), infos);
}

const saveEquipments = async (infos:IEquipments) => {

  const infosWithoutID = {
    model: infos.model,
    application: infos.application,
    qtd: infos.qtd,
    type: infos.type,
    brand: infos.brand
  }
  
  await setDoc(doc(db, "partsAndEquipaments", infos.id), infosWithoutID);
}

export const Equipments = { getAll, applyFilters, addNewEquipments, saveEquipments }
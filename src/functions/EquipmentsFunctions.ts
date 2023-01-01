import { db } from "../config/firebase"
import { collection, query, getDocs, doc, setDoc, addDoc } from "firebase/firestore"; 
import { IEquipment } from "../interfaces/IEquipment";
import { ISearchParametersEquipments } from "../interfaces/ISearchParameters";

const getAll = async () => {
  const q = query(collection(db, "partsAndEquipaments"))
  const querySnapshot = await getDocs(q)

  let allEquipments: Array<IEquipment> = []

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

const filterEquipments = (Equipments:IEquipment, searchParameters:ISearchParametersEquipments) => {

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

const applyFilters = (allEquipments:Array<IEquipment>, searchParameters:ISearchParametersEquipments) => {
  let filteredEquipments: Array<IEquipment> = []

  filteredEquipments = allEquipments

  if (searchParameters.search !== "") {
    filteredEquipments = filteredEquipments.filter(Equipments => {
      return filterEquipments(Equipments, searchParameters)
    })
  }

  return filteredEquipments
}

const applyPagination = (filteredEquipments:Array<IEquipment>, currentPage:number) => {
  return filteredEquipments.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)
}

const addNewEquipments = async (infos:IEquipment) => {

  await addDoc(collection(db, "partsAndEquipaments"), infos);
}

const saveEquipments = async (infos:IEquipment) => {

  const infosWithoutID = {
    model: infos.model,
    application: infos.application,
    qtd: infos.qtd,
    type: infos.type,
    brand: infos.brand
  }
  
  await setDoc(doc(db, "partsAndEquipaments", infos.id), infosWithoutID);
}

export const Equipments = { getAll, applyFilters, addNewEquipments, saveEquipments, applyPagination }
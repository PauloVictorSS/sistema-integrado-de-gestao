import { db } from "../config/firebase"
import { collection, query, getDocs, doc, setDoc, addDoc } from "firebase/firestore"; 
import { IClient } from "../interfaces/IClients";
import { clientSorterOptions, ISearchParametersClients } from "../interfaces/ISearchParameters";
import { getDefinedValue } from "../utils/helpers/verifications";

const getAll = async () => {
  const q = query(collection(db, "clients"))
  const querySnapshot = await getDocs(q)

  let allClients: Array<IClient> = []

  querySnapshot.forEach((client) => {
    let id = client.id
    let infos = { ...client.data() }
    
    allClients.push({
      id: id,
      firstDate:  (infos.firstDate === undefined ? "" : infos.firstDate),
      lastDate: (infos.lastDate === undefined ? "" : infos.lastDate),
      name: (infos.name === undefined ? "" : infos.name),
      accessories: (infos.accessories === undefined ? "" : infos.accessories),
      approval: (infos.approval === undefined ? "" : infos.approval),
      done: (infos.done === undefined ? "" : infos.done),
      brand: (infos.brand === undefined ? "" : infos.brand),
      budgetComponent: (infos.budgetComponent === undefined ? "" : infos.budgetComponent),
      budgetLabel: (infos.budgetLabel === undefined ? "" : infos.budgetLabel),
      changedEquipments: (infos.changedEquipments === undefined ? "" : infos.changedEquipaments),
      city: (infos.city === undefined ? "" : infos.city),
      defect: (infos.defect === undefined ? "" : infos.defect),
      district: (infos.district === undefined ? "" : infos.district),
      equipment: (infos.equipment === undefined ? "" : infos.equipment),
      fone: (infos.fone === undefined ? "" : infos.fone),
      local: (infos.local === undefined ? "" : infos.local),
      model: (infos.model === undefined ? "" : infos.model),
      paid: (infos.paid === undefined ? "" : infos.paid),
      technicalEvaluationt: (infos.technicalEvaluationt === undefined ? "" : infos.technicalEvaluationt)
    })
  });

  return allClients
}

const filterClients = (client:IClient, searchParameters:ISearchParametersClients) => {

  const clientName = client.name.toLowerCase()
  const clientEquipament = client.equipment.toLowerCase()
  const clientBrand = client.brand.toLowerCase()
  const clientModel = client.model.toLowerCase()
  const clientApproval = client.approval.toLowerCase()

  const clientHasSameApproval = (clientApproval.includes(searchParameters.approval))
  const clientHadSearched = (clientName.includes(searchParameters.search) || clientEquipament.includes(searchParameters.search) || clientBrand.includes(searchParameters.search) || clientModel.includes(searchParameters.search))

  if (searchParameters.search === "")
    return clientHasSameApproval
  else if (searchParameters.approval === "")
    return clientHadSearched
  
  return clientHasSameApproval && clientHadSearched
}

const orderClients = (filteredClients:IClient[], orderBy:clientSorterOptions) => {

  filteredClients.sort((a, b) => {
    if (orderBy === "name") {
      if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
      else
          return 0;
    }
    else {
      if (parseInt(a[orderBy]) > parseInt(b[orderBy]))
          return -1;
      else
          return 0;
    }
  });

  return filteredClients
}

const applyFilters = (allClients:Array<IClient>, searchParameters:ISearchParametersClients) => {
  let filteredClients: Array<IClient> = []

  filteredClients = allClients

  if (searchParameters.search !== "" || searchParameters.approval !== "") {
    filteredClients = filteredClients.filter(client => {
      return filterClients(client, searchParameters)
    })
  }

  filteredClients = orderClients(filteredClients, searchParameters.orderBy)

  return filteredClients
}

const applyPagination = (filteredClients:Array<IClient>, currentPage:number) => {
  
  return filteredClients.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)
}

const saveClient = async (infos:IClient) => {

  const infosWithoutID = {
    firstDate: infos.firstDate,
    lastDate: infos.lastDate,
    name: infos.name,
    accessories: infos.accessories,
    approval: infos.approval,
    done: infos.done,
    brand: infos.brand,
    budgetComponent: infos.budgetComponent,
    budgetLabel: infos.budgetLabel,
    changedEquipments: getDefinedValue(infos.changedEquipments),
    city: infos.city,
    defect: infos.defect,
    district: infos.district,
    equipment: infos.equipment,
    fone: infos.fone,
    local: infos.local,
    model: infos.model,
    paid: infos.paid,
    technicalEvaluationt: infos.technicalEvaluationt
  }
  
  await setDoc(doc(db, "clients", infos.id), infosWithoutID);
}

export const Client = { getAll, applyFilters, saveClient, applyPagination }
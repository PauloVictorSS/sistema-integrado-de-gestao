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
      name: (infos.name === undefined ? "Não especificado" : infos.name),
      accessories: (infos.accessories === undefined ? "Não especificado" : infos.accessories),
      approval: (infos.approval === undefined ? "Não especificado" : infos.approval),
      done: (infos.done === undefined ? "Não especificado" : infos.done),
      brand: (infos.brand === undefined ? "Não especificado" : infos.brand),
      budgetComponent: (infos.budgetComponent === undefined ? "Não especificado" : infos.budgetComponent),
      budgetLabel: (infos.budgetLabel === undefined ? "Não especificado" : infos.budgetLabel),
      changedEquipments: (infos.changedEquipments === undefined ? "Não especificado" : infos.changedEquipaments),
      city: (infos.city === undefined ? "Não especificado" : infos.city),
      defect: (infos.defect === undefined ? "Não especificado" : infos.defect),
      district: (infos.district === undefined ? "Não especificado" : infos.district),
      equipment: (infos.equipment === undefined ? "Não especificado" : infos.equipment),
      fone: (infos.fone === undefined ? "Não especificado" : infos.fone),
      local: (infos.local === undefined ? "Não especificado" : infos.local),
      model: (infos.model === undefined ? "Não especificado" : infos.model),
      paid: (infos.paid === undefined ? "Não especificado" : infos.paid),
      technicalEvaluationt: (infos.technicalEvaluationt === undefined ? "Não especificado" : infos.technicalEvaluationt)
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

const applyFilters = (allClients:Array<IClient>, currentPage:number, searchParameters:ISearchParametersClients) => {
  let filteredClients: Array<IClient> = []

  filteredClients = allClients

  if (searchParameters.search !== "" || searchParameters.approval !== "") {
    filteredClients = filteredClients.filter(client => {
      return filterClients(client, searchParameters)
    })
  }

  filteredClients = orderClients(filteredClients, searchParameters.orderBy)
  filteredClients = filteredClients.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)

  return filteredClients
}

const saveClient = async (infos:IClient) => {

  console.log(infos);

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

export const Client = { getAll, applyFilters, saveClient }
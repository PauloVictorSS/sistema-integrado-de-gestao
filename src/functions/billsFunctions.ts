import { db } from "../config/firebase"
import { collection, query, getDocs, doc, setDoc, addDoc } from "firebase/firestore"; 
import { IBill } from "../interfaces/IBill";
import { ISearchParametersBills } from "../interfaces/ISearchParameters";

const getAll = async () => {
  const q = query(collection(db, "bills"))
  const querySnapshot = await getDocs(q)

  let allBills: Array<IBill> = []

  querySnapshot.forEach((Bills) => {
    let id = Bills.id
    let infos = { ...Bills.data() }
    
    allBills.push({
      id,
      name: infos.name,
      value: infos.value,
      dueDate: infos.dueDate
    })
  });
  
  return allBills
}

const filterBills = (Bills: IBill, searchParameters: ISearchParametersBills) => {

  let dueDate = new Date(searchParameters.dueDate)
  let billDueDate = new Date(Bills.dueDate)

  const billHasNameSearched = (searchParameters.search !== "" && Bills.name.toLowerCase().includes(searchParameters.search))
  const billHasDueDateSearched = (searchParameters.dueDate !== "" && billDueDate.getTime() >= dueDate.getTime())

  return billHasNameSearched || billHasDueDateSearched
}

const applyFilters = (allBills:Array<IBill>, searchParameters:ISearchParametersBills) => {
  let filteredBills: Array<IBill> = []

  if (searchParameters.search !== "" || searchParameters.dueDate !== "") {
    filteredBills = allBills.filter(Bills => {
      return filterBills(Bills, searchParameters)
    })
  }

  return filteredBills
}

const addNewBills = async (infos:IBill) => {

  await addDoc(collection(db, "bills"), infos);
}

const saveBills = async (infos:IBill) => {

  const infosWithoutID = {
    name: infos.name,
    value: infos.value,
    dueDate: infos.dueDate
  }
  
  await setDoc(doc(db, "bills", infos.id), infosWithoutID);
}

export const Bills = { getAll, applyFilters, addNewBills, saveBills }
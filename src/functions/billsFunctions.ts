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
  
  console.log(searchParameters);

  const billHasNameSearched = (searchParameters.search !== "" && Bills.name.toLowerCase().includes(searchParameters.search))
  const billHasDueDateSearched = (searchParameters.dueDate !== "" && Bills.dueDate >= searchParameters.dueDate)

  return billHasNameSearched || billHasDueDateSearched
}

const applyFilters = (allBills:Array<IBill>, searchParameters:ISearchParametersBills) => {
  let filteredBills: Array<IBill> = []

  filteredBills = allBills

  if (searchParameters.search !== "" || searchParameters.dueDate !== "") {
    filteredBills = filteredBills.filter(Bills => {
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
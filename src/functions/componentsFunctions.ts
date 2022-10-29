import { db } from "../config/firebase"
import { collection, query, getDocs } from "firebase/firestore"; 
import { IComponent } from "../interfaces/IComponents";
import { componentSorterOptions, ISearchParametersComponent } from "../interfaces/ISearchParameters";

const getAll = async () => {
  const q = query(collection(db, "components"))
  const querySnapshot = await getDocs(q)

  let allComponents: Array<IComponent> = []

  querySnapshot.forEach((component) => {
    let id = component.id
    let infos = { ...component.data() }
    
    allComponents.push({
      id,
      name: infos.name,
      local: infos.local,
      qtd: infos.qtd,
      qtdMin: (infos.qtdMin === undefined ? 0 : infos.qtdMin),
      description: infos.description,
      lastUpdate: infos.lastUpdate.toDate().toLocaleString()
    })
  });
  
  return allComponents
}

const filterComponents = (component:IComponent, searchParameters:ISearchParametersComponent) => {

  const componentName = component.name.toLowerCase()
  const componentLocal = component.local.toLowerCase()
  const componentDescription = component.description.toLowerCase()

  const componentHasSameLocal = (componentLocal.includes(searchParameters.local))
  const componentHasSameNameOrDescription = (componentName.includes(searchParameters.search) || componentDescription.includes(searchParameters.search))

  if (searchParameters.search === "")
    return componentHasSameLocal
  else if (searchParameters.local === "")
    return componentHasSameNameOrDescription
  
  return componentHasSameLocal && componentHasSameNameOrDescription
}

const orderComponents = (filteredComponents:IComponent[], orderBy:componentSorterOptions) => {

  filteredComponents.sort((a, b) => {
    if (orderBy === "name") {
      if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
      else
          return 0;
    }
    else {
      if (a[orderBy] < b[orderBy])
          return -1;
      else
          return 0;
    }
  });

  return filteredComponents
}

const applyFilters = (allComponents:Array<IComponent>, currentPage:number, searchParameters:ISearchParametersComponent) => {
  let filteredComponents: Array<IComponent> = []

  filteredComponents = allComponents

  if (searchParameters.search !== "" || searchParameters.local !== "") {
    filteredComponents = filteredComponents.filter(component => {
      return filterComponents(component, searchParameters)
    })
  }

  filteredComponents = orderComponents(filteredComponents, searchParameters.orderBy)
  filteredComponents = filteredComponents.slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)

  return filteredComponents
}

export const Component = { getAll, applyFilters }
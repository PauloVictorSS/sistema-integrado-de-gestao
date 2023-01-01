export type componentSorterOptions = "name" | "lastUpdate";
export type clientSorterOptions = "name" | "id";


export interface ISearchParametersComponent{
  search: string
  local: string
  orderBy: componentSorterOptions
}

export interface ISearchParametersEquipments{
  search: string
}

export interface ISearchParametersClients{
  search: string
  approval: string
  orderBy: clientSorterOptions
}

export interface ISearchParametersBills{
  search: string
  dueDate: string
}

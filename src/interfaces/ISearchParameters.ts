export type componentSorterOptions = "name" | "lastUpdate";

export interface ISearchParametersComponent{
  search: string
  local: string
  orderBy: componentSorterOptions
}

export interface ISearchParametersPartsAndEquipaments{
  search: string
}
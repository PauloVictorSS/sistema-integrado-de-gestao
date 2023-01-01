import { TotalElementsPerPage } from "../constants/generalConstants"

export function getAvaliablePages(allElement: Array<any>) { 
  let numberTotalPages = Math.ceil(allElement.length / 8)
  let avaliablePages = []

  for (let index = 1; index <= numberTotalPages; index++) 
    avaliablePages.push(index)
  
  return avaliablePages
}


export const applyPagination = (array:Array<any>, currentPage:number) => {
  return array.slice((currentPage - 1) * TotalElementsPerPage, (currentPage - 1) * TotalElementsPerPage + TotalElementsPerPage)
}

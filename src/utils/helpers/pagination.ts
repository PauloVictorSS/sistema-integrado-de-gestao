export function getAvaliablePages(allElement: Array<any>) { 
  let numberTotalPages = Math.ceil(allElement.length / 8)
  let avaliablePages = []

  for (let index = 1; index <= numberTotalPages; index++) 
    avaliablePages.push(index)
  
  return avaliablePages
}

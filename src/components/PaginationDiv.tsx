import { Text } from "./Text"

interface PaginationDivProps{
  allPages: number[],
  currentPage: number,
  setCurrentPage: (page:number) => void
}

export function PaginationDiv({ allPages, currentPage, setCurrentPage }: PaginationDivProps) {
  
  const getViewPages = () => {
    let inicio = allPages.indexOf(currentPage) - 2
    let fim = allPages.indexOf(currentPage) + 3
  
    let viewPages = []

    if(currentPage <= 4)
      viewPages = allPages.slice(0, 5)
    else if(currentPage > (allPages.length - 2))
      viewPages = allPages.slice(allPages.length - 5, allPages.length)
    else
      viewPages = allPages.slice(inicio, fim)

    return viewPages
  }

  const viewPages = getViewPages()

  return (
    <div className="flex items-center justify-between w-52 mt-4 mx-auto">
      <div className="flex gap-0 cursor-pointer font-bold" onClick={() => { setCurrentPage(1) }}>
        <span>&lt;</span>
        <span>&lt;</span>
      </div>
      {
        viewPages.map((page) => {
          return (
            <div
              className={"cursor-pointer underline " + (page === currentPage? "text-cyan-500 font-bold" : "")}
              key={page}
              onClick={() => { setCurrentPage(page) }}
            >
              <Text className={(page === currentPage? "text-cyan-500 font-bold" : "")}>{page > 9 ? page : "0" + page}</Text>
            </div>
          )
        })
      }
      <div className="flex gap-0 cursor-pointer font-bold" onClick={() => { setCurrentPage(allPages.length) }}>
        <span>&gt;</span>
        <span>&gt;</span>
      </div>
    </div>
  )
}
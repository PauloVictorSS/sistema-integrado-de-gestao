import { ReactNode } from "react"

interface TableProps{
  children: ReactNode
  className?: string
}

function content({children, className}: TableProps) {
  return (
    <table className={"w-full " + className}>
      {children}
    </table>
  )
}

function thead({children, className}: TableProps) {
  return (
    <thead className={"border-b-[1px] " + className}>
      {children}
    </thead>
  )
}

function tbody({children, className}: TableProps) {
  return (
    <tbody>
      {children}
    </tbody>
  )
}

function tr({children, className}: TableProps) {
  return (
    <tr>
      {children}
    </tr>
  )
}

function th({children, className}: TableProps) {
  return (
    <th className={"py-1 text-start text-xs " + className}>
      {children}
    </th>
  )
}

function td({children, className}: TableProps) {
  return (
    <td className={"py-1 text-xs " + className}>
      {children}
    </td>
  )
}

export const Table = {content, thead, tbody, tr, th, td}
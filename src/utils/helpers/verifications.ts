export const getDefinedValue = (s:undefined|string) => {
  return (s === undefined ? "" : s)
}

export const toNotSpecified = (s:string) => {
  return (s === "" ? "Não especificado" : s)
}

export const getStringValue = (s:undefined|string) => {
  return toNotSpecified(getDefinedValue(s))
}
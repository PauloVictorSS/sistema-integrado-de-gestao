export function setFoneMask(fone: string) {
  let v = fone

  v = v.replace(/\D/g, "")
  v = v.replace(/^(\d\d)(\d)/g, "($1) $2")

  if (fone.length <= 14)
    v = v.replace(/(\d{4})(\d)/, "$1-$2")
  else if (fone.length === 15)
    v = v.replace(/(\d{5})(\d)/, "$1-$2")
  
  return v
}
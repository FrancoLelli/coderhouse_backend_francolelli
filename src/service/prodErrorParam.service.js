export const generateProdErrorParam = (prodId)=>{
  return `
      product id no es valido, debe ser un valor numerico, pero se recibio ${prodId}
  `
}
export const generateProductErrorInfo = (prod)=>{
  return `
      Alguno de los campos para crear el producto no es valido
      Lista de campos requeridos:
      title: debe ser un campo de tipo String, pero se recibio ${prod.title},
      description: debe ser un campo de tipo String, pero se recibio ${prod.description},
      price:debe ser un campo de tipo Number, pero se recibio ${prod.price},
  `
}
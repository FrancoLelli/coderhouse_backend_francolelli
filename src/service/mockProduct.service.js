import { generateProduct } from "../utils/faker.js";

let products = [];

export const generateProductService = () =>{
    const productToGenerate = 100;
    for(let i=0;i<productToGenerate;i++){
        const productToPush = generateProduct();
        products.push(productToPush);
    }
    return products
}
import { generateProductService } from "../service/mockProduct.service.js";

export const mockProductController = async (req,res) =>{
const results = await generateProductService();
res.json({ status: "success", payLoad: results });
}
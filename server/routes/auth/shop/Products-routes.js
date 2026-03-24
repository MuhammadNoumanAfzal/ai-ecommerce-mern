
const express=require("express");
const router=express.Router();
const {
 getFilterProducts,
}=require("../../../controllers/shop/productsController");
const {upload}=require("../../../helpers/cloudinary");



router.get('/get',getFilterProducts)

module.exports=router


const express=require("express");
const router=express.Router();
const {
 getFilterProducts,
}=require("../../../controllers/shop/productsController");



router.get('/get',getFilterProducts)

module.exports=router

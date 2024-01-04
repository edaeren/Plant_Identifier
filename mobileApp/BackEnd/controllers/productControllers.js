const Product = require('../models/Products')
module.exports={

    getAllProduct: async(req,res)=>{
        try {
            const products = await Product.find().sort({createdAt : -1})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json("Ürünler getirilemedi...")
        }
    },

    getProduct :async (req,res)=>{
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("Ürün getirilemedi...")
        }
    },

    searchProduct: async (req,res) => {
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "furniture",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json("Failed to search")
        }
    }
   
}
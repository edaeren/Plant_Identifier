const router = require('express').Router();
const cartController = require('../controllers/cartController');
const{verifyToken} = require('../middleware/verifyToken');

router.get("/find",verifyToken,cartController.getCart);
router.post("/",verifyToken,cartController.addToCart);
router.post("/quantity",cartController.decrementCartItem);
router.delete("/:cartItemId",cartController.deleteCartItems);

module.exports = router;
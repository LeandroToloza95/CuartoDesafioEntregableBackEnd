import { Router } from "express";
import { cartManagerClass } from '../cartManager.js'

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManagerClass.createCart()
        return res.status(200).json({ message: `New cart created with id ${newCart.idCart}`, cart: newCart })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

router.get('/:idCart', async (req, res) => {
    try {
        const { idCart } = req.params
        const carrito = await cartManagerClass.getCartsbyID(+idCart)
        if (carrito === -1) {
            return res.status(400).json({ message: 'Cart no found' })
        }
        return res.status(200).json({ message: `Cart with id ${idCart}`, cart: carrito })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
})

router.post('/:idCart/product/:idProduct', async (req, res) => {
    try {
        
        const { idCart } = req.params;
        const { idProduct } = req.params;
        const cart = await cartManagerClass.addProductToCart(req.params)
        if (cart === -1) {
            return res.status(400).json({ message: `Product with id: ${idProduct} not found`})
        }
        return res.status(200).json({ message: `Product with id: ${idProduct} loaded to cart with id: ${idCart} succesfully`, cart: cart })
    }
    catch (error) {
        return res.status(500).json({ message: error })
    }
})

export default router
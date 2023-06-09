import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( ()=> {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect( ()=> {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step: 1=> get id of the added product
        for(const id in storedCart){
            // step :2 => get the product from products by using id
            const addedProducts = products.find(product => product.id === id);

            if(addedProducts){
            // step :3 => add quantity 
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;
                
                // step :4 => add the added Products to the saveCart
                saveCart.push(addedProducts);
            }
        }
        setCart(saveCart);

    },[products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        // if product doesn't exists in the cart , set the quantity = 1
        // if exist , then update the quantity by 1
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart)
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                    key={product.id}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;
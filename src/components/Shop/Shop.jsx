import React, { useEffect, useState } from 'react';
import './Shop.css'
const Shop = () => {
    const [productts, setProducts] = useState([]);

    useEffect( ()=> {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    return (
        <div className='shop-container'>
            <div className="product-container">
                <h4>Products are coming here : {productts.length}</h4>
            </div>
            <div className="cart-container">
                <h4>Ordere Summary</h4>
            </div>
        </div>
    );
};

export default Shop;
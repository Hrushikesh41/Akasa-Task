import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./Cart.css"
import { useNavigate } from 'react-router-dom';
import { HashLoader } from "react-spinners"
import ProductCard from '../../components/ProductCard/ProductCard';

const Cart = () => {
    const [id, setID] = useState()
    const [auth, setAuth] = useState()
    const [product, setProduct] = useState([])
    const [carts, setCart] = useState([])
    const [prices, setPrices] = useState([])
    const navigate = useNavigate();
    var name;
    var count = 0;
    var token;
    const handleSubmit = async () => {
        token = localStorage.getItem("ID")
        setID(token)
        console.log(id)
        const res = await fetch("https://foodsys.onrender.com/cartProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token
            })
        });

        const result = await res.json();
        console.log(result)
        setProduct(result.cart)
        setAuth(true)
        const status = res.status;
        console.log(status);
        name = result.name;
    }

    useEffect(() => {
        handleSubmit()
    }, [])
    useEffect(() => {
        if (product && product.length > 0) {
            product.map(async (productID, key) => {
                console.log("Hello");
                const res = await fetch("https://foodsys.onrender.com/product_id", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productID
                    })
                });
                const products = await res.json();
                setCart((prevItems) => [...prevItems, products.product]);
                setPrices((prevItems) => [...prevItems, products.product.price]);
            });
        }
    }, [product]);

    const handleClick = async () => {
        const res = await fetch("https://foodsys.onrender.com/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, product
            })
        });
        const result = await res.json();
        console.log(result);

        if (result.message == "Order Placed") {
            navigate("/", { replace: true })
        }
    }

    return (
        <>
            <Navbar />
            {
                prices.map((price) => {
                    count = count + price;
                })
            }
            {carts.length == 0 ? <>
                <div className="notFound">
                    <HashLoader
                        color="#36d7b7"
                        size={100}
                    />
                </div>
            </> :
                <>

            <h2>Total Amount : {count}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((productDetail, key) => {
                        return (
                            <>
                                <tr>
                                    <td>{productDetail.name}</td>
                                    <td>{productDetail.price}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            </>
            }

<button class="btn btn-danger mx-2" onClick={handleClick}>Proceed to Checkout</button>
        </>
    )
}

export default Cart
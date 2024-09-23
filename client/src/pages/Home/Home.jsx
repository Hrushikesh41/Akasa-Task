import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ProductCard from '../../components/ProductCard/ProductCard';
import { HashLoader } from "react-spinners"
import "./Home.css"

const Home = () => {
    const [product, setProduct] = useState([]);

    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:3000/product");
            const data = await res.json();
            console.log(data);
            if (res.status == 200) {
                setProduct(data.products);
                console.log(blogDetails);
            } else {
                console.log("Error Occurred");
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <Navbar />
            {product.length == 0 ? <>
                <div className="notFound">
                    <HashLoader
                        color="#36d7b7"
                        size={100}
                    />
                </div>
            </> :
                <div className='main-div'>
                    {product.map((productDetail, key) => {
                        return (
                            <>

                                <ProductCard productDetail={productDetail} key={key}/>

                            </>
                        )
                    })
                    }
                </div>
            }
        </>
    )
}

export default Home
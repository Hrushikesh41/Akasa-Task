import React, {useEffect} from 'react'
import "./ProductCard.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = (productDetail) => {
    // const element = document.querySelector('.main-card-div');  // Selects the first element with class 'myClass'
    // const id = element.id;
    // console.log(id);
    var id;

    useEffect(() => {
        // Use querySelector to get the element by class name
        const element = document.querySelector('.main-card-div');
        if (element) {
            id = element.id
        }
      }, []);

    const userID = localStorage.getItem("ID")
    const addToCart = async () => {
        const res = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, userID
            })
        });
        const result = await res.json();
        console.log(result);
        const status = res.status;
        if (status == 200) {
            toast('✌️ Item Added to Cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Please Try After Sometime', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <>
            <div className='inner-div'>
                <ToastContainer />

                <div class="container my-4 main-card-div" id={productDetail.productDetail._id}>
                    <div class="col mb-2">
                        <div class="col-md-6 main-inner-div">
                            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col p-4 d-flex flex-column position-static">
                                    <strong class="d-inline-block mb-2 text-primary">{productDetail.productDetail.category}</strong>
                                    <h3 class="mb-0">{productDetail.productDetail.name}</h3>
                                    <div class="mb-1 text-muted">{productDetail.productDetail.price}</div>
                                    <p class="card-text mb-auto">{productDetail.productDetail.description}</p>
                                    <button class="btn btn-primary" onClick={addToCart}>Add to cart</button>
                                </div>
                                <div class="col-auto d-none d-lg-block" >
                                    <img src="https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.jpg?s=612x612&w=0&k=20&c=jXInOVcduhEnfuUVffbUacldkF5CwAeThD3MDUXCItM=" width="200" height="250" class="bd-placeholder-img" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard
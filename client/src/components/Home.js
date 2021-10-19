import React, {useState, useEffect} from "react";
const API = process.env.REACT_APP_API_URL;

export const Products = () => {

    const [products, setProducts] = useState([])
    // const [id, setId] = useState()

    const getProducts = async () => {
        const response = await fetch(`${API}/products`)
        const datas = await response.json();
        setProducts(datas)
    }

    useEffect( () => {
        getProducts();
    },[])

    return (
        <div className="container_services">

            {products.map( product => (
                <div className="card_product" key={product[0]}>

                    <div className="img_service">
                        <img src={product[4]} alt=""/>
                    </div>
                    <div className="info_card"> 
                        <div className="header_card">
                            <p> {product[1]} </p>
                        </div>
                        <div className="body_card">
                            <p className="name_service">{product[2]}</p>
                            <p className="name_user">{product[3]}</p>     
                            {/* <p className="description">{product[5]}</p>                             */}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
} 
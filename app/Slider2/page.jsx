//generar un slider de targetas
"use client"
// import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Slider from "../../components/slider";
import { getProductById } from "../lista/axion";

export default function SliderPage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProductById();
                setProducts(productsData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, []);

    //funcion que genera un producto de una targeta
    const productCard = (product, index) => (
        <div
         key={product.id}        
         className={`w-[180px] h-[280px] bg-yellow-200 p-2 border 1 rounded rounded-lg text-red`}
         >
         {/* Mostrar solo la primera imagen de la galería */}
         {product.gallery && product.gallery.length > 0 && (
             <img src={product.gallery[0].original} alt={product.name} style={{ maxWidth: '100%', maxHeight: '80%' }} />
         )}
         <p>{product.name}</p>
         <p>{product.price}</p>
        </div>
    )


    return(
        <div className="p-2 w-full">
            
            
            <Slider
              height={280}
              cardWidth={180}
              items={products.map((product) => productCard(product))}
              className="my-6 mx4">
            </Slider>

        </div>
    )
}
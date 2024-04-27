// ProductPage.jsx
'use client'

import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { getImages, getProductById } from '../axion';
import { useRouter } from 'next/navigation';

import 'react-image-gallery/styles/css/image-gallery.css';
import Slider from '@/components/slider';

export default function ProductPage({ params }) {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages(params.id);
      setImages(images);
    };

    fetchImages();
  }, [params.id]);

  function navigateToProducts() {
    router.push('/lista');
  }
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




 // cambiar color de retrocesos
 return (
  
  <div className="w-full">
      <div className="mt-5 ml-5">
      <p> Regresar</p>
          <button className="btn  p-5 text-lg" onClick={navigateToProducts}><svg class="w-5 h-3 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M10 25 L45 25 M35 15 L45 25 L35 35" fill="none" stroke="black" stroke-width="2" />
              </svg>  
          </button>
      </div>
    
  
    <div className="flex justify-center items-center">
      <ImageGallery items={images} className="w-1/2" />
    </div>
    <div className="p-2 w-full">
            <h1 className="text-xl font-bold mb-3">Slider de tarjetas</h1>
            
            <Slider
              height={280}
              cardWidth={180}
              items={products.map((product) => productCard(product))}
              className="my-6 mx4">
            </Slider>

        </div>
  </div>


);
}
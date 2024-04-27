'use client'

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { todoProduct } from '../api/consulta';
import Link from 'next/link';
import { useRouter }  from 'next/navigation';
import Slider from '@/components/slider';
import { getProductById } from './axion';

export default function Page() {
  const [products, setProduct] = useState(null);
  const [search, setSearch] = useState('');
  const supabase = createClient();
  const router = useRouter();
  const [productos, setProducts] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const  data  = await todoProduct();
      setProduct(data.products);
    };
  
    getData();
  }, []);
  
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


  async function handleSearch(e) { 
    e.preventDefault();
    const {data, error  } = await supabase.from('Product').select()
    .like('name', `%${search}%`);
    setProduct(data);

    console.log(error)
  }
  const handleProductClick = (producto) => {
    router.push(`/lista/${producto.id}`); // Redirección a la ruta dinámica
  };
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <form className="pb-4 bg-white dark:bg-gray-900 flex items-center" onSubmit={handleSearch} >
        <input
          type="text"
          className="flex pt-2 ps-10 text-sm text-white-600 border border-gray-300 rounded-lg  focus:ring-white-500 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 m-auto"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-yellow-300 px-3 py-2 rounded-md text-black" type="submit">
          Buscar
        </button>
        <Link href="/agregar" className="bg-yellow-300 px-3 py-2 rounded-md text-black"> 
        Agregar
        </Link>
        
      </form>
      <div className="p-2 w-full">
           
            
            <Slider
              height={280}
              cardWidth={180}
              items={productos?.map((product) => productCard(product))}
              className="my-6 mx4">
            </Slider>

        </div>

      <div className="flex justify-center items-center h-full mt-2">
        <div className="grid grid-cols-2 gap-6">
          {products?.map(product => (
            <div key={product.name} className="bg-white-200 shadow-md rounded-md overflow-hidden w-90" onClick={() => handleProductClick(product)} >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Name: {product.name}</h3>
                <p className="text-black-600 mb-2">Description: {product.description}</p>
                <p className="text-black-800 font-bold mb-2">Price: ${product.price}</p>
                <p className="text-black-600">codigo: {product.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
'use client'
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import {consulta } from '../api/consulta';
import { useRouter } from 'next/navigation';

export default function addProduct(){
  const router = useRouter();
  const supabase = createClient();
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    codigo: 0,
    
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
          try {
            const result = await consulta(producto);
            if (result.success) {
              setProducto({
                nombre: '',
                descripcion: '',
                precio: 0,
                codigo: 0,
                
              });
              setErrores({});
              router.push('/lista');
            } else {
              setErrores(result.errors);
            }
          } catch (error) {
            console.log(error.message)
          }
          
    
  };

  

  const validarProducto = (prod) => {
    let errores = {};
    if (!prod.nombre) {
      errores.nombre = 'El nombre del producto es requerido';
    }
    if (!prod.descripcion) {
      errores.descripcion = 'La descripción del producto es requerida';
    }
    if (prod.precio <= 0) {
      errores.precio = 'El precio del producto debe ser mayor que 0';
    }
    if(!prod.precio){
      errores.precio = 'El precio es obligatorio';   
    }
    if(isNaN(prod.precio)){
        errores.precio = 'El precio debe ser un numero';
    }
    if (prod.codigo < 0) {
      errores.codigo = 'La codigo del producto debe ser mayor o igual a 0';
      
    }
    if (!prod.codigo) {
        errores.codigo = 'el codigo es obligatorio'
    }
    
    return errores;
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className=" font-semibold mb-4 text-yellow">Agrega tu Producto</h1>
      <form onSubmit={handleSubmit} className="bg-yellow p-4 rounded-lg shadow-md">
        <div className="mb-2">
          <label htmlFor="nombre" className="block text-sm font-small text-blue-600">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            className="mt-1 p-2  border-gray-100 rounded-md w-full"
          />
          {errores.nombre && <p className="text-red-200 text-sm mt-1">{errores.nombre}</p>}
        </div>
        <div className="mb-2">
          <label htmlFor="descripcion" className= "block text-sm font-small text-blue-600">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className="mt-1 p-2  border-gray-100 rounded-md w-full"
          />
          {errores.descripcion && <p className="text-red-200 text-sm mt-1">{errores.descripcion}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block text-sm font-small text-blue-600">
            Precio:
          </label>
          <input
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            className="mt-1 p-2  border-gray-100 rounded-md w-full"
          />
          {errores.precio && <p className="text-red-200 text-sm mt-1">{errores.precio}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="codigo" className="block text-sm font-small text-blue-600">
            codigo:
          </label>
          <input
            id="codigo"
            name="codigo"
            value={producto.codigo}
            onChange={handleChange}
            className="mt-1 p-2  border-gray-100 rounded-md w-full"
          />
          {errores.codigo && <p className="text-red-200 text-sm mt-1">{errores.codigo}</p>}
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-red rounded-md hover:bg-red-400 focus:ring focus:border-black-200"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}
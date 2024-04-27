'use server'
import { createClient } from '@/utils/supabase/client';
export async function todoProduct(){
  const supabase = createClient();
  const { data,error } = await supabase.from('Product').select();
  return{
      products: data,
      error,
  }
}

export async function consulta(product:{
  
nombre: string,
descripcion: string,
precio: number,
codigo: number,}) 
{
    let errores: Record<string, string> = {};
    if (!product.nombre) {
        errores.nombre = 'El nombre del producto es requerido';
      }
      if (!product.descripcion) {
        errores.descripcion = 'La descripción del producto es requerida';
      }
      if (product.precio <= 0) {
        errores.precio = 'El precio del producto debe ser mayor que 0';
      }
      if(!product.precio){
        errores.precio = 'El precio es obligatorio';   
      }
      if(isNaN(product.precio)){
          errores.precio = 'El precio debe ser un numero';
      }
      if (product.codigo < 0) {
        errores.codigo = 'La codigo del producto debe ser mayor o igual a 0';
        
      }
      if (!product.codigo) {
          errores.codigo = 'el codigo es obligatorio'
      }
        if (Object.keys(errores).length > 0) {
            return { success: false,errors: errores };
          }else{
            try {
                const supabase = createClient();
                const newProduct = {
                    name:product.nombre,
                    description: product.descripcion,
                    price: product.precio,
                    codigo: product.codigo,
                }
                const { data, error } = await supabase.from('Product').insert([newProduct]);
                if (error) {
                  console.error('Error adding product to database:', error.message);
                  return { success: false, errors: { database: 'Error adding product to database' } };
                }
                return { success: true, message: 'Product created successfully', data: data };
              } catch (error) {
                console.error('Unexpected error:', error);
                return { success: false, errors: { unexpected: 'Unexpected error' } };
              }
          }
        }
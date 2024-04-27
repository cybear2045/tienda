//listar.jsx
"use server"

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


// Exporta la función getImages
export async function getImages(productId) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
  
    const { data, error } = await supabase
      .from('Product')
      .select('gallery')
      .eq('id', productId)
      .single();
  
    if (error) {
      throw new Error('Error al obtener las imágenes del producto');
    }
  
    return data.gallery;
}
export async function getProductById() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: {session}} = await supabase.auth.getSession();
  console.log (session)
  if (!session) {
    return redirect ('/login')
  }

  const { data, error } = await supabase
    .from('Product')
    .select('*');

  if (error) {
    throw new Error('Error al obtener el producto');
  }

  return data;
}
activar urls 
alter table notes enable row level security;
Create policy “solo los usuarios autenticados pueden leer notas”
On notas for select
To authenticated
Using (true);

Create policy “solo los usuarios autenticados pueden actualizar notas”
On notas for update
To authenticated
Using (true);


Create policy “solo los usuarios autenticados pueden eliminar notas”
On notas for delete
To authenticated
Using (true);


Create policy “solo los usuarios autenticados pueden crear notas”
On notas for insert
To authenticated
With check (true);
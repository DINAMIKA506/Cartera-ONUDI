# Publicación en GitHub y Vercel

## GitHub desde el navegador

1. Cree un repositorio nuevo en GitHub.
2. Descomprima este ZIP.
3. En el repositorio, seleccione **Add file → Upload files**.
4. Arrastre el contenido de la carpeta descomprimida, no la carpeta contenedora.
5. Confirme con **Commit changes**.

## Vercel

1. Entre a Vercel y seleccione **Add New → Project**.
2. Conecte GitHub e importe el repositorio.
3. Seleccione **Next.js** como Framework Preset.
4. Use Node.js 22.x.
5. Mantenga `npm install` y `npm run build` como comandos.
6. No configure Output Directory ni variables de entorno.
7. Seleccione **Deploy**.

## Actualizaciones

Los cambios enviados a la rama `main` del repositorio producirán una nueva publicación automática en Vercel.

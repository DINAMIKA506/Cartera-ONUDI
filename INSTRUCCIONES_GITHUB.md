# Cartera ONUDI Costa Rica 2026

Este paquete contiene el código fuente completo de la plataforma, sus imágenes y la configuración necesaria para instalarla y compilarla.

## Publicar el código en GitHub

1. Cree un repositorio vacío en GitHub.
2. Descomprima este archivo ZIP.
3. Suba todo el contenido de la carpeta descomprimida a la raíz del repositorio.

También puede hacerlo con Git desde una terminal:

```bash
git init
git add .
git commit -m "Versión inicial de la plataforma Cartera ONUDI"
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

## Ejecutar localmente

Requiere Node.js 22.13 o una versión posterior.

```bash
npm ci
npm run dev
```

## Compilar para producción

```bash
npm run build
```

## Contenido principal

- `app/`: interfaz, contenido y estilos.
- `public/brand/`: imágenes utilizadas en la plataforma.
- `package.json` y `package-lock.json`: dependencias y comandos del proyecto.
- `.openai/hosting.json`: configuración del alojamiento actual en OpenAI Sites.

El paquete no incluye `node_modules`, archivos temporales, compilaciones locales ni historial previo de Git. Las dependencias se restauran con `npm ci`.

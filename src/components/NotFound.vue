<template>
  <div class="flex items-center justify-center h-screen text-center">
    <div>
      <h1 class="text-4xl font-bold">404 - Página no encontrada</h1>
      <h1 class="text-5xl">😭</h1>
      <p class="mt-4">Lo sentimos, la página que estás buscando no existe.</p>
      <div class="mt-6 font-bold">
        <router-link to="/" class="text-violet-500 hover:underline"
          >Regresa al inicio</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style></style>

<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Opiniones del Juego</h1>
      <form @submit.prevent="addOpinion" class="mb-4">
        <textarea v-model="newOpinionText" placeholder="Escribe tu opinión" class="w-full p-2 border rounded" required></textarea>
        <button type="submit" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Agregar Opinión</button>
      </form>
  
      <p v-if="!opinions.length">No existen opiniones para este juego.</p>
      <div v-for="(opinion, index) in opinions" :key="index" class="mb-4 border p-4 rounded">
        <h3 class="font-semibold">Usuario</h3>
        <p>{{ opinion.text }}</p>
        <button @click="editOpinion(index)" class="mt-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button @click="deleteOpinion(index)" class="mt-2 ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        opinions: [],
        newOpinionText: '',
      };
    },
    methods: {
      addOpinion() {
        const newOpinion = { text: this.newOpinionText };
        this.opinions.push(newOpinion);
        this.newOpinionText = '';
      },
      editOpinion(index) {
        const updatedText = prompt('Edita tu opinión:', this.opinions[index].text);
        if (updatedText !== null) {
          this.opinions[index].text = updatedText;
        }
      },
      deleteOpinion(index) {
        this.opinions.splice(index, 1);
      }
    }
  };
  </script>
  
  <style>
  </style>
  
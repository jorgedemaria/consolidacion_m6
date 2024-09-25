<template>
  <div class="container mx-auto p-4">
    <div v-if="game" class="text-center">
      <h1 class="text-xl font-bold mb-4">Opiniones de <br />{{ game.name }}</h1>
      <img
        :src="game.background_image"
        alt="Carátula del juego"
        class="mx-auto w-60 h-60 object-cover rounded-full mb-4"
      />
      <div class="inline-block bg-green-500 text-white p-2 rounded-full">
        <span class="font-bold px-2"> {{ game.rating }} ⭐️ </span>
      </div>
    </div>

    <div class="mt-8 max-w-lg mx-auto" id="opinion__container">
      <input
        v-model="newOpinion.user"
        type="text"
        placeholder="Ingresa tu nombre"
        class="border p-2 mb-4 w-full rounded"
      />
      <textarea
        v-model="newOpinion.text"
        placeholder="Escribe tu opinión"
        class="border p-2 w-full rounded"
      ></textarea>
      <button
        @click="addOpinion"
        class="text-white px-4 py-2 mt-2 bg-violet-700 rounded hover:bg-violet-500"
      >
        Publicar opinión
      </button>

      <p v-if="errorMessage" class="text-red-500 italic mt-4">
        {{ errorMessage }}
      </p>

      <div
        v-for="(opinion, index) in opinions"
        :key="index"
        class="mt-6 bg-violet-100 p-4 rounded-lg"
      >
        <p class="text-base font-semibold">{{ opinion.user }} <span class="text-sm font-normal">comentó:</span></p>
        <p class="text-sm italic mb-2">{{ opinion.text }}</p>
        <p class="text-xs text-gray-500 mt-2">
          <span v-if="opinion.edited">editado el {{ opinion.editTime }}</span>
          <span v-else>publicado el {{ opinion.timestamp }}</span>
        </p>

        <div class="flex justify-end">
          <button
            @click="startEditOpinion(index)"
            class="text-blue-500 hover:underline"
          >
            Editar
          </button>
          <button
            @click="deleteOpinion(index)"
            class="text-red-500 hover:underline ml-4"
          >
            Eliminar
          </button>
        </div>
        <div v-if="editingIndex === index" class="mt-2">
          <textarea
            v-model="editText"
            class="border p-2 w-full rounded"
          ></textarea>
          <button
            @click="saveEdit(index)"
            class="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      game: null,
      newOpinion: {
        user: "",
        text: "",
      },
      opinions: [],
      editingIndex: null,
      editText: "",
      errorMessage: "",
    };
  },
  created() {
    this.fetchGameDetails();
  },
  methods: {
    async fetchGameDetails() {
      try {
        const API_KEY = process.env.VUE_APP_API_KEY;
        const API_URL = `https://api.rawg.io/api/games/${this.id}?key=${API_KEY}`;
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        this.game = data;
      } catch (error) {
        console.error("Error al obtener los detalles del juego:", error);
      }
    },
    addOpinion() {
      if (!this.newOpinion.user || !this.newOpinion.text) {
        this.errorMessage = "Por favor, llena ambos campos antes de publicar una opinión";
        return;
      }

      const currentTime = new Date().toLocaleString("es-ES", { 
        hour12: false, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      
      this.opinions.push({
        ...this.newOpinion,
        timestamp: currentTime,
        edited: false,
        editTime: null,
      });

      this.newOpinion.user = "";
      this.newOpinion.text = "";
      this.errorMessage = "";
    },
    startEditOpinion(index) {
      this.editingIndex = index;
      this.editText = this.opinions[index].text;
    },
    saveEdit(index) {
      const currentTime = new Date().toLocaleString("es-ES", { 
        hour12: false, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      
      this.opinions[index].text = this.editText;
      this.opinions[index].edited = true;
      this.opinions[index].editTime = currentTime;
      this.editingIndex = null;
      this.editText = "";
    },
    deleteOpinion(index) {
      this.opinions.splice(index, 1);
    },
  },
};
</script>

<style scoped>
input,
textarea {
  font-size: 12px;
}
</style>

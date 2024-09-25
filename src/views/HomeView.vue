<template>
  <div class="container mx-auto p-4">
    <h1 class="font-bold mb-4 pl-6">Lista de Juegos</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="game in games"
        :key="game.id"
        class="bg-white rounded-lg shadow-md p-4"
      >
        <img
          :src="game.background_image"
          alt="carátula"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <h1 class="font-bold mt-2">{{ game.name }}</h1>
        <p class="mt-1">
          Géneros: {{ game.genres.map((genre) => genre.name).join(", ") }} 🎮 
        </p>
        <p class="mt-1">Rating: {{ game.rating }} ⭐️</p>
        <p class="mt-1">Fecha de lanzamiento: {{ game.released }} 📅</p>
        <div class="flex items-center justify-between">
          <button
            @click="goToOpinions(game.id)"
            class="mt-4 text-white px-4 py-2 bg-violet-700 rounded hover:bg-violet-500"
          >
            Opinar
          </button>
          <HeartButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeartButton from "@/components/HeartButton.vue";

export default {
  components: {
    HeartButton,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    goToOpinions(gameId) {
      this.$router.push({ name: "opinions", params: { id: gameId } });
    },
    async fetchGames() {
      try {
        const API_KEY = process.env.VUE_APP_API_KEY;
        const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        this.games = data.results;
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    },
  },
  created() {
    this.fetchGames();
  },
};
</script>

<style>
button {
  font-size: 12px;
}
</style>

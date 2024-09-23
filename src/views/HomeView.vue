<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Juegos</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <h2 class="text-xl font-semibold mt-2">{{ game.name }}</h2>
        <p class="mt-1">
          Géneros: {{ game.genres.map((genre) => genre.name).join(", ") }}
        </p>
        <p class="mt-1">Rating: {{ game.rating }}</p>
        <p class="mt-1">Fecha de lanzamiento: {{ game.released }}</p>
        <p class="mt-1">Última actualización: {{ game.updated }}</p>
        <button
          @click="goToOpinions(game.id)"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Opinar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      games: [], //  Lista de juegos
    };
  },
  methods: {
    // Método que navega a la vista de opiniones
    goToOpinions(gameId) {
      this.$router.push({ name: "Opiniones", params: { id: gameId } });
    },
    // Método para obtener los juegos desde la API usando fetch
    async fetchGames() {
      try {
        const API_KEY = "6dc73930d6744759a55ed8ad18d45671";
        console.log(API_KEY);
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

<style></style>

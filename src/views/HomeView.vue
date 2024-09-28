<template>
  <div class="container mx-auto p-4">
    <div v-if="!loading">
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
    <div v-else>
      <div class="loader loader--style2 mt-3" title="1">
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="150px"
          height="150px"
          viewBox="0 0 50 50"
          style="enable-background: new 0 0 50 50"
          xml:space="preserve"
        >
          <path
            fill="#000"
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      <div class="text-center">
        <h3 class="text-lg mt-6">Cargando la lista de juegos</h3>
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
      loading: false,
    };
  },
  methods: {
    goToOpinions(gameId) {
      this.$router.push({ name: "opinions", params: { id: gameId } });
    },
    async fetchGames() {
      try {
        this.loading = true;
        const API_KEY = process.env.VUE_APP_API_KEY;
        const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        this.games = data.results;
        this.loading = false;
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
svg path,
svg rect {
  fill: #6d28d9;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

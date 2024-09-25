<template>
  <div id="app">
    <Navbar v-if="$route.name !== 'NotFound'" />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");
body {
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 56%,
    rgba(237, 233, 254, 1) 100%
  );
  min-height: 100vh;
}

* {
  font-family: "Space Mono", monospace;
}
h1 {
  letter-spacing: -0.4px;
}
p {
  font-size: 12px;
  letter-spacing: -0.4px;
}
</style>

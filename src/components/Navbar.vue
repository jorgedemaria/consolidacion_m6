<template>
  <nav>
    <router-link to="/" id="nav">
      <img :src="joystickImg" alt="" />
      <h1 class="text-white text-xs">INICIO</h1>
      </router-link>
  </nav>
</template>

<script>
import joystick from "@/assets/img/joystick.webp";

export default {
  name: "AppNavbar",
  data() {
    return {
      joystickImg: joystick,
    };
  },
};
</script>

<style scoped>
nav {
  background-color: #6d28d9;
  padding: 10px;
  padding-left: 40px;
}

#nav {
  display: flex;
  align-items: center;
  gap: 20px;
} 

h1 {
  font-weight: 900;
  letter-spacing: 2px; /* Ajusta el valor en píxeles según el espaciado que necesites */
}

img {
  width: 40px;
  fill: white;
}
</style>

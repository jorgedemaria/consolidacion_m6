<template>
    <span
      class="material-icons heart-icon cursor-pointer"
      :class="{ liked: isLiked }"
      @click="toggleLike"
    >
      favorite
    </span>
  </template>
  
  <script>
  export default {
    name: "HeartButton",
    data() {
      return {
        isLiked: false,
      };
    },
    methods: {
      toggleLike() {
        this.isLiked = !this.isLiked;
      },
    },
  };
  </script>
  
  <style scoped>
  .heart-icon {
    transition: color 0.2s;
    font-size: 25px;
    color: gray;
  }
  
  .heart-icon.liked {
    color: red; /* Color cuando está "liked" */
    animation: like-anim 0.4s steps(28) forwards;
  }
  
  @keyframes like-anim {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>
  
<script setup>
import { peliculas } from '@/data/peliculas.js'
</script>

<template>
  <section class="movies-page">
    <h1>Películas</h1>
    <div class="grid">
      <RouterLink
        v-for="p in peliculas"
        :key="p.id"
        :to="{ name: 'detalle-pelicula', params: { id: p.id } }"
        class="card"
      >
        <img :src="p.imagen_thumb" :alt="p.titulo" class="filme_img">
        <div class="card__info">
          <p class="card__title">{{ p.titulo }}</p>
          <p class="card__meta">{{ p.año }} · {{ p.duracion }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.movies-page { padding-top: 70px; }
h1 { padding: 0 0 20px 20px; font-size: 2rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0 10px;
}
.card { display: block; position: relative; overflow: hidden; }
.filme_img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 450ms;
  border-radius: 2px;
  display: block;
}
.filme_img:hover { transform: scale(1.04); }
.card__info {
  padding: 8px 4px 12px;
}
.card__title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
.card__meta  { font-size: 12px; color: #aaa; }
</style>

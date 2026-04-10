<script setup>
import { peliculas } from '@/data/peliculas.js'
import { series }   from '@/data/series.js'

// Use JS strings so Vite doesn't try to statically import these paths
const bannerPoster = '/images/HomePage/Header/SAW.jpeg'
const bannerVideo  = "/images/HomePage/Header/Saw%20'Jigsaw%20Killer'%20Scene.mp4"
const bannerLogo   = '/images/HomePage/Header/Saw_logo.png'
const playIcon     = '/images/HomePage/Header/play.svg'
const infoIcon     = '/images/HomePage/Header/info.svg'

const top10 = [
  '/images/HomePage/Body/Top10/large-movie1.jpg',
  '/images/HomePage/Body/Top10/large-movie2.jpg',
  '/images/HomePage/Body/Top10/large-movie3.jpg',
  '/images/HomePage/Body/Top10/large-movie4.jpg',
  '/images/HomePage/Body/Top10/large-movie5.jpg',
  '/images/HomePage/Body/Top10/large-movie6.jpg',
  '/images/HomePage/Body/Top10/large-movie7.jpg',
  '/images/HomePage/Body/Top10/large-movie8.jpg',
  '/images/HomePage/Body/Top10/large-movie1.jpg',
  '/images/HomePage/Body/Top10/large-movie2.jpg',
]

const peliculasHome = peliculas.slice(0, 8)
const seriesHome    = series.slice(0, 8)
</script>

<template>
  <!-- Banner -->
  <div class="banner">
    <div class="bg-overlay"></div>
    <video id="background-video" autoplay loop muted :poster="bannerPoster">
      <source :src="bannerVideo" type="video/mp4">
    </video>
    <div class="banner__contents">
      <img :src="bannerLogo" class="banner__title" alt="SAW">
      <p class="banner__description">
        Un hombre llamado Adam se encuentra encadenado a una tubería oxidada, y su angustiante
        desafío implica un acertijo que lo llevará a la libertad o a la muerte.
      </p>
      <div class="banner__buttons">
        <button class="banner__button play">
          <img class="icon" :src="playIcon" alt="">Reproducir
        </button>
        <button class="banner__button info">
          <img class="icon" :src="infoIcon" alt="">Más información
        </button>
      </div>
    </div>
  </div>

  <!-- Top 10 -->
  <div class="row">
    <h2>Argentina: top 10 en películas hoy</h2>
    <div class="row_posters-10">
      <div v-for="(src, i) in top10" :key="i" class="item">
        <div class="number">{{ i + 1 }}</div>
        <div><img :src="src" class="row__posterLarge" :alt="`Top ${i + 1}`"></div>
      </div>
    </div>
  </div>

  <!-- Películas recientes -->
  <div class="row">
    <h2>Películas estrenadas recientemente</h2>
    <div class="row_posters">
      <RouterLink
        v-for="p in peliculasHome"
        :key="p.id"
        :to="{ name: 'detalle-pelicula', params: { id: p.id } }"
      >
        <img :src="p.imagen_thumb" :alt="p.titulo" class="row__poster">
      </RouterLink>
    </div>
  </div>

  <!-- Series recientes -->
  <div class="row">
    <h2>Series estrenadas recientemente</h2>
    <div class="row_posters">
      <RouterLink
        v-for="s in seriesHome"
        :key="s.id"
        :to="{ name: 'detalle-serie', params: { id: s.id } }"
      >
        <img :src="s.imagen_thumb" :alt="s.titulo" class="row__poster">
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
#background-video {
  width: 100%;
  object-fit: cover;
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: -2;
  height: 60rem;
}
.bg-overlay {
  width: 100%;
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: -1;
  height: 60rem;
  background: linear-gradient(0deg, rgba(17,17,17,1) 0%, rgba(17,17,17,0) 15%);
}
.banner { height: 50rem; }
.banner__contents {
  margin-left: 30px;
  padding-top: 240px;
  z-index: 1;
}
.banner__title {
  height: 20rem;
  padding-bottom: 0.3rem;
}
.banner__description {
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 20px;
  font-weight: 500;
  max-width: 560px;
  padding-bottom: 30px;
  color: #fff;
}
.banner__buttons { display: flex; }
.banner__button {
  cursor: pointer;
  border: none;
  font-weight: 600;
  font-size: 20px;
  border-radius: 3px;
  padding: 15px 20px;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
}
.icon { height: 25px; padding-right: 10px; }
.play { background-color: #fdfdfd; color: #111; }
.info { color: #fff; background-color: rgba(216,216,216,0.459); }
.play:hover { background-color: rgb(204,204,204); }
.info:hover  { background-color: rgba(216,216,216,0.185); }

h2 { padding: 40px 0 0 20px; color: #fff; }
.row { margin-left: 20px; z-index: 1; }

.row_posters {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px;
}
.row_posters::-webkit-scrollbar { display: none; }
.row__poster {
  max-height: 130px;
  margin-right: 10px;
  transition: transform 450ms;
  border-radius: 2px;
}
.row__poster:hover { transform: scale(1.08); }

.row_posters-10 {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 20px;
}
.row_posters-10::-webkit-scrollbar { display: none; }
.item {
  position: relative;
  display: flex;
  min-height: 200px;
  max-height: 250px;
  min-width: 380px;
  transition: transform 450ms;
}
.item + .item { margin-left: 280px; }
.item:hover { transform: scale(1.08); z-index: 1; }
.number {
  position: absolute;
  height: 108%;
  display: flex;
  align-items: center;
  left: -15px;
  font-weight: bold;
  font-size: 275px;
  line-height: 0;
  color: black;
  -webkit-text-stroke: 4px rgb(102,102,102);
  text-shadow: 0 0 30px black;
}
.item img {
  position: absolute;
  margin: 4px 0 4px 90px;
  box-shadow: 0 0 32px black;
  height: 200px;
  z-index: 1;
}
.row__posterLarge { max-height: 250px; }
</style>

<script setup>
import { series } from '@/data/series.js'

// Group series into rows of 4
const grupos = []
for (let i = 0; i < series.length; i += 4) {
  grupos.push(series.slice(i, i + 4))
}
</script>

<template>
  <div class="series-page">
    <div class="titulo-row">
      <h1>Series</h1>
    </div>

    <div v-for="(grupo, gi) in grupos" :key="gi" class="sesion">
      <RouterLink
        v-for="s in grupo"
        :key="s.id"
        :to="{ name: 'detalle-serie', params: { id: s.id } }"
        class="serie-card"
      >
        <img :src="s.imagen_thumb" :alt="s.titulo" class="serie-img">
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.series-page {
  padding-top: 80px;
  width: 100%;
}
.titulo-row {
  display: flex;
  align-items: center;
  margin: 20px 20px 4px;
}
h1 {
  color: #e5e5e5;
  font-size: 2.5rem;
}
.sesion {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0 45px 30px;
}
.serie-card { display: block; overflow: hidden; border-radius: 4px; }
.serie-img {
  width: 100%;
  display: block;
  transition: transform 0.5s;
  border-radius: 4px;
}
.serie-img:hover { transform: scale(1.1); }
</style>

<script setup>
import { peliculas } from '@/data/peliculas.js'
</script>

<template>
  <section class="movies-page">
    <h1 class="page-title">Películas</h1>

    <div class="grid">
      <RouterLink
        v-for="p in peliculas"
        :key="p.id"
        :to="{ name: 'detalle-pelicula', params: { id: p.id } }"
        class="card"
      >
        <div class="card__thumb">
          <img :src="p.imagen_thumb" :alt="p.titulo" class="card__img" />
          <div class="card__overlay">
            <div class="card__actions">
              <button class="btn-play" aria-label="Reproducir">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button class="btn-icon" aria-label="Agregar a mi lista">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
              </button>
              <button class="btn-icon btn-like" aria-label="Me gusta">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
              </button>
              <button class="btn-icon btn-more" aria-label="Más información">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
              </button>
            </div>
            <div class="card__meta">
              <span class="meta-match">{{ p.relevancia }}% match</span>
              <span class="meta-rating">{{ p.clasificacion }}</span>
              <span class="meta-duration">{{ p.duracion }}</span>
            </div>
            <p class="card__title">{{ p.titulo }}</p>
            <p class="card__genres">{{ p.generos.split(',').slice(0, 2).join(' · ') }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.movies-page {
  padding: 80px 4% 60px;
  background: #141414;
  min-height: 100vh;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-bottom: 16px;
  letter-spacing: 0.01em;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
}

/* ── Card base ── */
.card {
  display: block;
  position: relative;
  cursor: pointer;
  z-index: 1;
  transition: z-index 0s 0.25s;
  text-decoration: none;
  color: inherit;
}

.card__thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: visible;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 2px;
  transition: transform 0.35s ease, border-radius 0.35s ease;
}

/* ── Overlay (hidden by default) ── */
.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #181818;
  border-radius: 0 0 4px 4px;
  padding: 10px 12px 12px;
  opacity: 0;
  transform: translateY(0);
  transition: opacity 0.2s ease 0.15s;
  pointer-events: none;
}

/* ── Hover state ── */
.card:hover {
  z-index: 10;
  transition: z-index 0s 0s;
}

.card:hover .card__img {
  transform: scale(1.35) translateY(-8%);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
}

.card:hover .card__overlay {
  opacity: 1;
  pointer-events: all;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.7);
}

/* ── Action buttons ── */
.card__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.btn-play {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  flex-shrink: 0;
}

.btn-play svg { width: 18px; height: 18px; margin-left: 2px; }

.btn-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  transition: border-color 0.15s;
}

.btn-icon svg { width: 14px; height: 14px; }
.btn-icon:hover { border-color: #fff; }

.btn-more {
  margin-left: auto;
}

/* ── Meta info ── */
.card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.meta-match {
  color: #46d369;
  font-size: 11px;
  font-weight: 700;
}

.meta-rating {
  font-size: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 4px;
  color: #bcbcbc;
  line-height: 1.6;
}

.meta-duration {
  font-size: 11px;
  color: #bcbcbc;
}

.card__title {
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.card__genres {
  font-size: 10px;
  color: #bcbcbc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import HomePage       from '@/views/HomePage.vue'
import MoviesPage     from '@/views/MoviesPage.vue'
import SeriesPage     from '@/views/SeriesPage.vue'
import DetallePelicula from '@/views/DetallePelicula.vue'
import DetalleSerie    from '@/views/DetalleSerie.vue'

const routes = [
  { path: '/',              component: HomePage,        name: 'inicio' },
  { path: '/peliculas',     component: MoviesPage,      name: 'peliculas' },
  { path: '/series',        component: SeriesPage,      name: 'series' },
  { path: '/pelicula/:id',  component: DetallePelicula, name: 'detalle-pelicula' },
  { path: '/serie/:id',     component: DetalleSerie,    name: 'detalle-serie' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

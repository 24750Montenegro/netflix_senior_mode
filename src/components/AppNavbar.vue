<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route    = useRoute()
const scrolled = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 50 }

onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = [
  { name: 'inicio',    label: 'Inicio'              },
  { name: 'series',    label: 'Series'              },
  { name: 'peliculas', label: 'Películas'           },
  { name: null,        label: 'En tendencia'        },
  { name: null,        label: 'Mi lista'            },
  { name: null,        label: 'Explorar por idiomas'},
]
</script>

<template>
  <nav class="nav" :class="{ scrolled }">
    <RouterLink to="/">
      <img src="/images/MoviesPage/icons/netflix-logo.png" alt="Netflix" class="nav__logo">
    </RouterLink>

    <ul>
      <li v-for="link in links" :key="link.label">
        <RouterLink
          v-if="link.name"
          class="head-link"
          :to="{ name: link.name }"
          :class="{ active: route.name === link.name }"
        >
          {{ link.label }}
        </RouterLink>
        <a v-else class="head-link" href="#">{{ link.label }}</a>
      </li>
    </ul>

    <img class="lupa"        src="/images/HomePage/Navbar/lupa.svg"   alt="Buscar">
    <img class="bell"        src="/images/HomePage/Navbar/bell.svg"   alt="Notificaciones">
    <img class="nav__avatar" src="/images/HomePage/Navbar/user.jpg"   alt="Perfil">
    <img class="seta"        src="/images/HomePage/Navbar/arrow.svg"  alt="">
  </nav>
</template>

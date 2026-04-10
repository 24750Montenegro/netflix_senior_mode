<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { series }  from '@/data/series.js'
import { resenas } from '@/data/resenas.js'

const route = useRoute()

const serie = computed(() =>
  series.find(s => s.id === route.params.id)
)

const resenasSerie = computed(() =>
  resenas.filter(r => r.id === route.params.id && r.tipo === 'serie')
)

function clasifColor(c) {
  if (c === '+10' || c === '+12') return { bg: 'yellow',  text: '#181818' }
  if (c === '+14')                 return { bg: '#bf7c00', text: '#fff'    }
  if (c === '+16')                 return { bg: '#e50914', text: '#fff'    }
  return                                  { bg: '#000',    text: '#fff'    }
}

function estrellas(n) { return '★'.repeat(n) + '☆'.repeat(5 - n) }

const nuevoComentario = ref('')
function enviarResena() {
  if (!nuevoComentario.value.trim()) return
  nuevoComentario.value = ''
}
</script>

<template>
  <div v-if="serie" class="detalle">
    <!-- Banner image -->
    <section class="conteudo-img">
      <img :src="serie.imagen_banner" :alt="serie.titulo" class="img-fundo">

      <div class="icone-inicio">
        <RouterLink to="/series">
          <img src="/images/ModeloPages/icons/remove.svg" alt="Volver" class="icone">
        </RouterLink>
      </div>

      <div class="icones-meio">
        <a href="#" class="link">
          <img src="/images/ModeloPages/icons/play.svg" alt="Reproducir" class="icone-play"> Reproducir
        </a>
        <img src="/images/ModeloPages/icons/add.svg"  alt="Agregar"   class="icone">
        <img src="/images/ModeloPages/icons/like.svg" alt="Me gusta"  class="icone">
      </div>

      <div class="icone-fim">
        <img src="/images/ModeloPages/icons/speaker 1.svg" alt="Volumen" class="icone">
      </div>
    </section>

    <!-- Info grid -->
    <section class="modelo-info">
      <section class="conteudo1">
        <p>
          <span class="span-verde">{{ serie.relevancia }}% relevante</span>
          {{ serie.año }} {{ serie.episodios }}
          <span class="span-italico">HD</span>
        </p>
        <div class="clasificacion">
          <span
            class="badge-clasif"
            :style="{ backgroundColor: clasifColor(serie.clasificacion).bg,
                      color:           clasifColor(serie.clasificacion).text }"
          >{{ serie.clasificacion }}</span>
          <span>{{ serie.advertencia }}</span>
        </div>
        <p>{{ serie.descripcion }}</p>
      </section>

      <section class="conteudo2">
        <p><span class="span-gris">Elenco:</span> {{ serie.elenco }}</p>
        <p><span class="span-gris">Géneros:</span> {{ serie.generos }}</p>
        <p><span class="span-gris">Escenas y momentos:</span> {{ serie.escenas }}</p>
      </section>
    </section>

    <!-- Reviews -->
    <section class="perfil-usuario">
      <h2>Reseñas de la Serie</h2>

      <div v-for="r in resenasSerie" :key="r.usuario" class="avaliacao-usuario">
        <div class="usuario">
          <img src="/images/ModeloPages/icons/perfil 1.svg" alt="Usuario" class="icone-usuario">
          <h4>{{ r.usuario }} {{ estrellas(r.estrellas) }}</h4>
        </div>
        <p class="comentario-usuario">{{ r.comentario }}</p>
        <p class="gostos-usuario">Reseña de la serie <strong>{{ serie.titulo }}</strong></p>
      </div>
    </section>

    <!-- Review form -->
    <section class="formulario-avaliacao">
      <form @submit.prevent="enviarResena">
        <p class="conteudo-destaque"><strong>Deja tu reseña sobre la serie:</strong></p>
        <textarea v-model="nuevoComentario" placeholder="Escribe tu reseña aquí..." required></textarea>
        <button type="submit">Enviar reseña</button>
      </form>
    </section>

    <!-- About -->
    <section class="informaciones">
      <p class="conteudo-destaque"><strong>Sobre {{ serie.titulo }}</strong></p>
      <p><span class="span-gris">Creación:</span> {{ serie.creador }}</p>
      <p><span class="span-gris">Elenco:</span> {{ serie.elenco }}</p>
      <p><span class="span-gris">Géneros:</span> {{ serie.generos }}</p>
      <p><span class="span-gris">Escenas y momentos:</span> {{ serie.escenas }}</p>
      <p>
        <span class="span-gris">Clasificación etaria:</span>
        <span
          class="badge-clasif"
          :style="{ backgroundColor: clasifColor(serie.clasificacion).bg,
                    color:           clasifColor(serie.clasificacion).text }"
        >{{ serie.clasificacion }}</span>
        {{ serie.advertencia }}. No recomendado para menores de {{ serie.clasificacion.replace('+','') }} años.
      </p>
    </section>
  </div>

  <div v-else class="not-found">
    <p>Serie no encontrada.</p>
    <RouterLink to="/series">← Volver a Series</RouterLink>
  </div>
</template>

<style scoped>
.detalle {
  padding: 2% 20%;
  background-color: #000;
  color: #fff;
  font-family: sans-serif;
  line-height: 1.5;
}
@media (max-width: 600px)                        { .detalle { padding: 2% 1%; } }
@media (min-width: 600px) and (max-width: 799px) { .detalle { padding: 2% 2%; } }
@media (min-width: 800px) and (max-width: 1199px){ .detalle { padding: 2% 10%; } }
@media (min-width: 1200px) and (max-width: 1599px){ .detalle { padding: 2% 15%; } }
@media (min-width: 1600px)                       { .detalle { padding: 2% 25%; } }

.conteudo-img { position: relative; }
.img-fundo { display: block; width: 100%; height: auto; border-radius: 15px 15px 0 0; }

.icone-inicio { position: absolute; top: 0; right: 0; margin: 25px 30px 0 0; }
.icones-meio  { position: absolute; bottom: 0; left: 0; margin: 0 0 45px 50px; gap: 20px; display: flex; }
.icone-fim    { position: absolute; bottom: 0; right: 0; margin: 0 30px 45px 0; }

.icone       { width: 40px; height: auto; transition: transform 0.3s; cursor: pointer; }
.icone:hover { transform: scale(1.1); }
.icone-play  { width: 30px; height: 30px; }

.link {
  display: flex; align-items: center; gap: 15px;
  padding: 10px 30px; background: #fff; color: #181818;
  border-radius: 5px; text-decoration: none; transition: transform 0.3s;
}
.link:hover { transform: scale(1.1); }

.modelo-info {
  background: #181818;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}
.conteudo1 { padding: 20px 0 50px 50px; display: flex; flex-direction: column; gap: 10px; }
.conteudo2 { padding: 20px 50px 50px 10px; display: flex; flex-direction: column; gap: 10px; }

.span-verde  { color: rgb(147,255,147); font-weight: bold; }
.span-gris   { color: #949494; }
.span-italico { border: 0.9px solid #fff; border-radius: 4px; padding: 1px 5px; font-size: 12px; }

.clasificacion { display: flex; align-items: center; gap: 8px; }
.badge-clasif {
  border-radius: 5px; padding: 3px 6px; font-size: 14px;
  font-weight: bold; letter-spacing: -1px; display: inline-block;
}

.perfil-usuario {
  background: #181818;
  border-top: 0.1px solid #303030;
  border-bottom: 0.1px solid #303030;
  padding: 40px 50px;
}
.avaliacao-usuario {
  background: #161616; border-radius: 5px;
  margin-top: 15px; padding: 10px;
  transition: transform 0.3s;
}
.avaliacao-usuario:hover { transform: scale(1.03); }
.usuario { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.icone-usuario { width: 30px; }
.comentario-usuario { padding-left: 38px; }
.gostos-usuario { text-align: right; padding-right: 15px; margin-top: 6px; }

.formulario-avaliacao { background: #181818; padding: 40px 50px; }
.formulario-avaliacao form { display: flex; flex-direction: column; gap: 15px; }
.formulario-avaliacao textarea {
  width: 100%; height: 125px; padding: 20px;
  border: 0.1px solid #686767; border-radius: 5px;
  background: #161616; color: #fff;
  font-family: Arial, sans-serif; font-size: 17px; resize: vertical;
}
.formulario-avaliacao button {
  align-self: flex-start; padding: 10px 20px;
  background: #fff; color: #000; border: none;
  border-radius: 5px; cursor: pointer; transition: background 0.3s, color 0.3s;
}
.formulario-avaliacao button:hover { background: #0056b3; color: #fff; }
.conteudo-destaque { font-size: 1.2rem; }

.informaciones {
  background: #181818; padding: 40px 50px;
  border-radius: 0 0 10px 10px; line-height: 1.5;
  display: flex; flex-direction: column; gap: 10px;
}

.not-found { padding: 120px 30px; text-align: center; font-size: 1.2rem; }
.not-found a { color: #e50914; }
</style>

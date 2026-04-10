/**
 * components.js — Componentes reutilizables para todas las páginas
 * Cada función devuelve un string HTML listo para inyectar con innerHTML.
 * BASE_PATH debe estar definido en la página antes de cargar este script.
 */

/* ─────────────────────────── NAVBAR ─────────────────────────── */
function navbarHTML(paginaActiva) {
  const links = [
    { href: `${BASE_PATH}Pages/HomePage/index.html`,   label: 'Inicio'            },
    { href: `${BASE_PATH}Pages/SeriesPage/series.html`, label: 'Series'           },
    { href: `${BASE_PATH}Pages/MoviesPage/index.html`,  label: 'Películas'        },
    { href: '#', label: 'En tendencia'  },
    { href: '#', label: 'Mi lista'      },
    { href: '#', label: 'Explorar por idiomas' },
  ];

  const items = links.map(l => {
    const active = l.label === paginaActiva ? ' class="active"' : '';
    return `<li><a class="head-link"${active} href="${l.href}"> ${l.label}</a></li>`;
  }).join('\n            ');

  return `
    <a href="${BASE_PATH}Pages/HomePage/index.html">
      <img src="${BASE_PATH}images/MoviesPage/icons/netflix-logo.png" alt="Logo de Netflix" class="nav__logo">
    </a>
    <ul>
      ${items}
    </ul>
    <img class="lupa"       src="${BASE_PATH}images/HomePage/Navbar/lupa.svg"   alt="Buscar">
    <img class="bell"       src="${BASE_PATH}images/HomePage/Navbar/bell.svg"   alt="Notificaciones">
    <img class="nav__avatar" src="${BASE_PATH}images/HomePage/Navbar/user.jpg"  alt="Avatar">
    <img class="seta"       src="${BASE_PATH}images/HomePage/Navbar/arrow.svg"  alt="Flecha">
  `;
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function footerHTML() {
  return `
    <div class="footer__icons">
      <div class="svg_container"><img class="svg" src="${BASE_PATH}images/HomePage/Footer/facebook.svg"  alt="Facebook"></div>
      <div class="svg_container"><img class="svg" src="${BASE_PATH}images/HomePage/Footer/instagram.svg" alt="Instagram"></div>
      <div class="svg_container"><img class="svg" src="${BASE_PATH}images/HomePage/Footer/twitter.svg"   alt="Twitter"></div>
      <div class="svg_container"><img class="svg" src="${BASE_PATH}images/HomePage/Footer/youtube.svg"   alt="YouTube"></div>
    </div>
    <div class="footer__container">
      <div class="footer__row">
        <ul class="column">
          <li><a href="#">Audiodescripción</a></li>
          <li><a href="#">Centro de ayuda</a></li>
          <li><a href="#">Tarjeta de prepago</a></li>
          <button class="footer__serviceCode">Código de servicio</button>
        </ul>
        <ul class="column">
          <li><a href="#">Prensa</a></li>
          <li><a href="#">Relaciones con inversores</a></li>
          <li><a href="#">Empleos</a></li>
        </ul>
        <ul class="column">
          <li><a href="#">Términos de uso</a></li>
          <li><a href="#">Privacidad</a></li>
          <li><a href="#">Avisos legales</a></li>
        </ul>
        <ul class="column">
          <li><a href="#">Preferencias de cookies</a></li>
          <li><a href="#">Información corporativa</a></li>
          <li><a href="#">Contáctenos</a></li>
        </ul>
      </div>
    </div>
    <span class="footer__trademark">© 1997-2024 Netflix, Inc.</span>
  `;
}

/* ─────────────────────── TARJETA DE PELÍCULA ─────────────────────── */
/**
 * @param {Object} p  - Objeto película del CSV
 * @param {string} duracion - Duración formateada (puede venir del CSV)
 */
function tarjetaPeliculaHTML(p) {
  return `
    <div class="div">
      <a href="${BASE_PATH}Pages/detalle-pelicula.html?id=${p.id}">
        <img class="filme_img" src="${BASE_PATH}${p.imagen_thumb}" alt="${p.titulo}">
      </a>
      <p>${p.titulo}</p>
      <div class="grid2">
        <p class="p">${p.año}</p>
        <img class="relogio" src="${BASE_PATH}images/MoviesPage/icons/simbolo_relogio.svg" alt="Duración">
        <p class="p">${p.duracion}</p>
      </div>
    </div>
  `;
}

/* ─────────────────────── TARJETA DE SERIE ─────────────────────── */
function tarjetaSerieHTML(s) {
  return `
    <div>
      <a href="${BASE_PATH}Pages/detalle-serie.html?id=${s.id}">
        <img class="borda" src="${BASE_PATH}${s.imagen_thumb}" alt="${s.titulo}">
      </a>
    </div>
  `;
}

/* ────────────────── PÓSTER PEQUEÑO (HOMEPAGE) ────────────────── */
function posterPeliculaHTML(p) {
  return `
    <a href="${BASE_PATH}Pages/detalle-pelicula.html?id=${p.id}">
      <img src="${BASE_PATH}${p.imagen_thumb}" alt="${p.titulo}" class="row__poster">
    </a>
  `;
}

function posterSerieHTML(s) {
  return `
    <a href="${BASE_PATH}Pages/detalle-serie.html?id=${s.id}">
      <img src="${BASE_PATH}${s.imagen_thumb}" alt="${s.titulo}" class="row__poster">
    </a>
  `;
}

/* ──────────────────── SECCIÓN DE RESEÑAS ──────────────────────── */
function resenaHTML(r) {
  const estrellas = '★'.repeat(parseInt(r.estrellas)) + '☆'.repeat(5 - parseInt(r.estrellas));
  return `
    <section class="avaliacao-usuario">
      <div class="usuario">
        <img src="${BASE_PATH}images/ModeloPages/icons/perfil 1.svg" alt="Usuario" class="icone-usuario">
        <h4>${r.usuario} ${estrellas}</h4>
      </div>
      <div>
        <p class="comentario-usuario">${r.comentario}</p>
      </div>
    </section>
  `;
}

/* ──────────────── BADGE DE CLASIFICACIÓN ──────────────────────── */
function badgeClasificacion(clasificacion) {
  const num = clasificacion.replace('+', '');
  let cls = 'span-A12';
  if (num === '16') cls = 'span-A16';
  else if (num === '14') cls = 'span-A14';
  else if (num === '18') cls = 'span-A18';
  else if (num === '10') cls = 'span-A10';
  return `<span class="${cls}"><strong>${clasificacion}</strong></span>`;
}

/* ──────────────── PÁGINA DE DETALLE (PELÍCULA O SERIE) ─────────── */
function detalleContenidoHTML(item, resenas, tipo) {
  const espelicula = tipo === 'pelicula';
  const urlVolver = espelicula
    ? `${BASE_PATH}Pages/MoviesPage/index.html`
    : `${BASE_PATH}Pages/SeriesPage/series.html`;
  const labelTipo     = espelicula ? 'película' : 'serie';
  const labelEpisodio = espelicula ? item.duracion : item.episodios;

  const resenasHTML = resenas.length > 0
    ? resenas.map(resenaHTML).join('')
    : `<p class="sin-resenas">Todavía no hay reseñas. ¡Sé el primero en opinar!</p>`;

  const creadorHTML = (!espelicula && item.creador)
    ? `<div><p><span class="span-texto-cinza">Creación:</span> ${item.creador}</p></div>`
    : '';

  return `
    <main class="container-geral">
      <section class="conteudo-img">
        <section>
          <img src="${BASE_PATH}${item.imagen_banner}" alt="${item.titulo}" class="img-fundo-serie">
        </section>
        <div class="icone-inicio">
          <a href="${urlVolver}">
            <img src="${BASE_PATH}images/ModeloPages/icons/remove.svg" alt="Cerrar" class="icone">
          </a>
        </div>
        <div class="icones-meio">
          <a href="#" class="link">
            <img src="${BASE_PATH}images/ModeloPages/icons/play.svg" alt="Reproducir" class="icone-play"> Reproducir
          </a>
          <img src="${BASE_PATH}images/ModeloPages/icons/add.svg"  alt="Agregar"   class="icone">
          <img src="${BASE_PATH}images/ModeloPages/icons/like.svg" alt="Me gusta"  class="icone">
        </div>
        <div class="icone-fim">
          <img src="${BASE_PATH}images/ModeloPages/icons/speaker 1.svg" alt="Altavoz" class="icone">
        </div>
      </section>

      <section class="modelo-serie">
        <section class="conteudo1">
          <div>
            <p>
              <span class="span-verde">${item.relevancia}% de coincidencia</span>
              ${item.año} &nbsp; ${labelEpisodio}
              <span class="span-italico">HD</span>
            </p>
          </div>
          <div class="classificacao">
            <p>${badgeClasificacion(item.clasificacion)}</p>
            <p>${item.advertencia}</p>
          </div>
          <div><p>${item.descripcion}</p></div>
        </section>
        <section class="conteudo2">
          <div><p><span class="span-texto-cinza">Reparto:</span> ${item.elenco}</p></div>
          <div><p><span class="span-texto-cinza">Géneros:</span> ${item.generos}</p></div>
          <div><p><span class="span-texto-cinza">Escenas y momentos:</span> ${item.escenas}</p></div>
        </section>
      </section>

      <section>
        <section class="perfil-usuario">
          <h2>Reseñas de la ${labelTipo}</h2>
          ${resenasHTML}
        </section>
        <section class="formulario-avaliacao">
          <form id="form-avaliacao">
            <p class="conteudo-destaque"><strong>Deja tu reseña sobre la ${labelTipo}:</strong></p>
            <textarea id="texto-avaliacao" placeholder="Escribe tu reseña aquí..." required></textarea>
            <button type="submit">Enviar reseña</button>
          </form>
        </section>
      </section>

      <section class="informacoes-serie">
        <div><p class="conteudo-destaque"><strong>Acerca de ${item.titulo}</strong></p></div>
        ${creadorHTML}
        <div><p><span class="span-texto-cinza">Reparto:</span> ${item.elenco}</p></div>
        <div><p><span class="span-texto-cinza">Géneros:</span> ${item.generos}</p></div>
        <div><p><span class="span-texto-cinza">Escenas y momentos:</span> ${item.escenas}</p></div>
        <div>
          <p>
            <span class="span-texto-cinza">Clasificación de edad:</span>
            ${badgeClasificacion(item.clasificacion)}
            ${item.advertencia}
          </p>
        </div>
      </section>
    </main>
  `;
}

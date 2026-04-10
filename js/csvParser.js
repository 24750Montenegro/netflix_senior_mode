/**
 * Carga y parsea un archivo CSV con separador ";"
 * @param {string} path - Ruta al archivo CSV
 * @returns {Promise<Array<Object>>} Array de objetos con los datos
 */
async function loadCSV(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar: ${path}`);
  const text = await response.text();
  return parseCSV(text);
}

/**
 * Parsea texto CSV con separador ";"
 * @param {string} text - Contenido del CSV
 * @returns {Array<Object>}
 */
function parseCSV(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(';').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(';');
    return headers.reduce((obj, header, index) => {
      obj[header] = (values[index] || '').trim();
      return obj;
    }, {});
  });
}

/**
 * Filtra un array de reseñas por id de contenido
 * @param {Array} resenas
 * @param {string} id
 * @returns {Array}
 */
function filtrarResenas(resenas, id) {
  return resenas.filter(r => r.id_contenido === id);
}

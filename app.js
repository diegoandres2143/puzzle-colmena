function generarHexagonoSVG(id) {
    const cadenaVertices = VERTICES_HEXAGONO.map(v => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(' ');
    
    return `
        <div class="hexagono" id="hexagono-${id}" data-rot="0">
            <svg class="hexagono-svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                <polygon class="forma-hexagono" points="${cadenaVertices}"/>
                <g class="conexiones"></g>
            </svg>
        </div>
    `;
}

function generarEstructuraHexagonos() {
    const contenedor = document.getElementById('contenedor-hexagonos');
    
    // Generar los 7 hexágonos directamente
    let html = '';
    for (let i = 0; i < 7; i++) {
        html += generarHexagonoSVG(i);
    }
    
    contenedor.innerHTML = html;
}


// Índice del puzzle actual (comienza en 0)
let indicePuzzleActual = 0;

function inicializarPuzzle() {
    // Obtener el puzzle según el índice actual
    const plantilla = PUZZLES[indicePuzzleActual];

    // Mostrar nombre del template con su número
    const nombreTemplate = document.getElementById('nombre-template');
    if (nombreTemplate) {
        nombreTemplate.textContent = `Template ${indicePuzzleActual + 1}/${PUZZLES.length}: ${plantilla.nombre}`;
    }
    
    // Incrementar el índice para el siguiente puzzle (vuelve al inicio al llegar al final)
    indicePuzzleActual = (indicePuzzleActual + 1) % PUZZLES.length;

    const hexagonos = document.querySelectorAll(".hexagono");
    hexagonos.forEach((hexagono, i) => {
        const configuracion = plantilla.hexagonos[i] || { lados: [], rotacion: 0, bloqueado: true };
        const { lados, rotacion, bloqueado } = configuracion;

        // metadata
        hexagono.classList.remove("bloqueado");
        hexagono.dataset.bloqueado = "false";
        hexagono.dataset.rot = "0";

        const conexiones = hexagono.querySelector(".conexiones");
        conexiones.innerHTML = ""; // limpiar

        // Para SVG: aplicaremos transform con setAttribute. Usaremos el centro de tu SVG como pivote.
        // También es importante garantizar que el elemento <g> exista y sea el lugar donde se dibujan las conexiones.
        if (bloqueado) {
            hexagono.dataset.bloqueado = "true";
            hexagono.classList.add("bloqueado");
            hexagono.dataset.rot = rotacion.toString();

            // generar conexiones (sin rotación adicional: la rotación base del bloque la dejamos aplicada)
            conexiones.innerHTML = generarPalitos(lados);
            conexiones.setAttribute('transform', `rotate(${rotacion * 60} ${CENTRO_X_HEXAGONO} ${CENTRO_Y_HEXAGONO})`);
        } else {
            // Rotación aleatoria para el puzzle
            const rotacionAleatoria = Math.floor(Math.random() * 6);
            hexagono.dataset.rot = rotacionAleatoria.toString();
            conexiones.innerHTML = generarPalitos(lados);
            conexiones.setAttribute('transform', `rotate(${rotacionAleatoria * 60} ${CENTRO_X_HEXAGONO} ${CENTRO_Y_HEXAGONO})`);
        }
    });
}

/* ================================
   VERIFICAR PUZZLE
================================== */

function verificarPuzzle() {
    const hexagonos = document.querySelectorAll(".hexagono");
    const plantilla = PUZZLES[indicePuzzleActual === 0 ? PUZZLES.length - 1 : indicePuzzleActual - 1];

    // Verificar que cada hexágono esté en su rotación correcta
    for (let i = 0; i < hexagonos.length; i++) {
        const hexagono = hexagonos[i];
        const configuracionEsperada = plantilla.hexagonos[i];
        const rotacionActual = Number(hexagono.dataset.rot || 0);
        
        // Saltar hexágonos bloqueados o vacíos
        if (configuracionEsperada.bloqueado || configuracionEsperada.lados.length === 0) continue;

        // CASO ESPECIAL: Hexágono con 6 lados (simetría completa) - cualquier rotación es válida
        if (configuracionEsperada.lados.length === 6) {
            continue;
        }

        // CASO ESPECIAL: Hexágono con 4 lados en patrón X (lados opuestos) - válido en 0° o 180°
        // Patrón X puede ser: [0,2,3,5], [1,2,4,5] o [0,1,3,4] (3 orientaciones de cruz)
        if (configuracionEsperada.lados.length === 4) {
            // Convertir array a string para comparación simple
            const patronLados = configuracionEsperada.lados.slice().sort((a, b) => a - b).join(',');
            const patronesX = ['0,2,3,5', '1,2,4,5', '0,1,3,4'];
            
            if (patronesX.includes(patronLados)) {
                // La X es válida en rotación original o girada 180° (espejo - reflejo simétrico)
                const rotacionOpuesta = (configuracionEsperada.rotacion + 3) % 6;
                if (rotacionActual === configuracionEsperada.rotacion || rotacionActual === rotacionOpuesta) {
                    continue;
                }
            }
        }

        // Verificar que la rotación sea exactamente la del template
        if (rotacionActual !== configuracionEsperada.rotacion) {
            return false;
        }
    }

    return true;
}

/* ================================
   EVENTOS
================================== */

function configurarEventos() {
    document.querySelectorAll('.hexagono').forEach(hexagono => {
        hexagono.addEventListener('click', () => {
            if (hexagono.dataset.bloqueado === "true") return;

            let rotacion = Number(hexagono.dataset.rot);
            rotacion = (rotacion + 1) % 6;
            hexagono.dataset.rot = rotacion.toString();

            const conexiones = hexagono.querySelector('.conexiones');
            conexiones.setAttribute('transform', `rotate(${rotacion * 60} ${CENTRO_X_HEXAGONO} ${CENTRO_Y_HEXAGONO})`);
        });
    });
}

const btnNuevoPuzzle = document.getElementById('btn-nuevo-puzzle');
if (btnNuevoPuzzle) {
    btnNuevoPuzzle.addEventListener('click', inicializarPuzzle);
}

const btnVerificar = document.getElementById('btn-verificar');
if (btnVerificar) {
    btnVerificar.addEventListener('click', () => {
        if (verificarPuzzle()) {
            mostrarExito();
        } else {
            // Efecto de sacudida en hexágonos incorrectos
            document.querySelectorAll('.hexagono').forEach(hex => {
                if (hex.dataset.bloqueado !== "true") {
                    hex.style.animation = 'sacudir 0.3s ease-in-out';
                    setTimeout(() => {
                        hex.style.animation = '';
                    }, 300);
                }
            });
        }
    });
}

/* ================================
   FUNCIÓN DE ÉXITO
================================== */

function mostrarExito() {
    const hexagonos = document.querySelectorAll('.hexagono');
    
    // Añadir animación de éxito a todos los hexágonos
    hexagonos.forEach((hexagono, indice) => {
        setTimeout(() => {
            hexagono.classList.add('exito');
            setTimeout(() => {
                hexagono.classList.remove('exito');
            }, 1200);
        }, indice * 50);
    });
}

/* ================================
   INICIALIZAR AL CARGAR
================================== */

// Generar la estructura de hexágonos primero
generarEstructuraHexagonos();

// Configurar eventos en los hexágonos generados
configurarEventos();

// Luego inicializar el puzzle
inicializarPuzzle();

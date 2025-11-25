/* ================================
   CONFIGURACIÓN DEL HEXÁGONO
================================== */

const HEX_CENTER_X = 100;
const HEX_CENTER_Y = 100;
const HEX_RADIUS = 86.6;

// Generar vértices del hexágono regular (30° rotado para que apunte arriba)
function generarVerticesHexagono() {
    const vertices = [];
    for (let i = 0; i < 6; i++) {
        const angulo = (Math.PI / 3) * i - Math.PI / 2; // -90° para que apunte arriba
        const x = HEX_CENTER_X + HEX_RADIUS * Math.cos(angulo);
        const y = HEX_CENTER_Y + HEX_RADIUS * Math.sin(angulo);
        vertices.push([x, y]);
    }
    return vertices;
}

// Generar puntos medios de los lados del hexágono
function generarPuntosMediosLados() {
    const vertices = generarVerticesHexagono();
    const medios = [];
    for (let i = 0; i < 6; i++) {
        const v1 = vertices[i];
        const v2 = vertices[(i + 1) % 6];
        const mx = (v1[0] + v2[0]) / 2;
        const my = (v1[1] + v2[1]) / 2;
        medios.push([mx, my]);
    }
    return medios;
}

const HEX_VERTICES = generarVerticesHexagono();
const HEX_LADOS_MEDIOS = generarPuntosMediosLados();

// Líneas llegan exactamente al punto medio del lado
const LINE_REACH = 1.0;
// Posición de la bolita
const DOT_FACTOR = 0.75;



/* ================================
   PLANTILLAS DE PUZZLES
================================== */

const PUZZLES = [
    {
        nombre: "Radial Total",
        hexagonos: [
            { lados: [1, 2, 3], rot: 0, bloqueado: false },       // 0: conecta con 3
            { lados: [2, 3, 4], rot: 0, bloqueado: false },       // 1: conecta con 3
            { lados: [0, 1, 2], rot: 0, bloqueado: false },       // 2: conecta con 3
            { lados: [0, 1, 2, 3, 4, 5], rot: 0, bloqueado: false }, // 3: centro con todos
            { lados: [3, 4, 5], rot: 0, bloqueado: false },       // 4: conecta con 3
            { lados: [0, 1, 5], rot: 0, bloqueado: false },       // 5: conecta con 3
            { lados: [0, 4, 5], rot: 0, bloqueado: false }        // 6: conecta con 3
        ]
    },
    {
        nombre: "Pirámides",
        hexagonos: [
            { lados: [2, 3], rot: 0, bloqueado: false }, // 0: garra conectada a 3
            { lados: [2, 3], rot: 0, bloqueado: false },
            { lados: [0, 1], rot: 0, bloqueado: false }, // 2: garra conectada a 3
            { lados: [0, 1, 4, 5], rot: 0, bloqueado: false }, // 3: centro con 3 conexiones
            { lados: [4, 5], rot: 0, bloqueado: false }, // 4: garra conectada a 3
            { lados: [], rot: 0, bloqueado: true },
            { lados: [], rot: 0, bloqueado: true }
        ]
    },
    {
        nombre: "Triángulo",
        hexagonos: [
            { lados: [], rot: 0, bloqueado: true },
            { lados: [], rot: 0, bloqueado: true },
            { lados: [], rot: 0, bloqueado: true },
            { lados: [1, 2], rot: 0, bloqueado: false },   // 3: conecta con 4 y 6
            { lados: [3, 4], rot: 0, bloqueado: false },      // 4: conecta con 3
            { lados: [], rot: 0, bloqueado: true },
            { lados: [0, 5], rot: 0, bloqueado: false }       // 6: conecta con 3
        ]
    },
    {
        nombre: "Árbol",
        hexagonos: [
            { lados: [2], rot: 0, bloqueado: false },      // 0: hoja conectada a 3
            { lados: [3], rot: 0, bloqueado: false },      // 1: hoja conectada a 3
            { lados: [], rot: 0, bloqueado: true },        // 2: bloqueado
            { lados: [0, 2, 5], rot: 0, bloqueado: false },// 3: tronco con 3 ramas
            { lados: [], rot: 0, bloqueado: true },        // 4: bloqueado
            { lados: [], rot: 0, bloqueado: true },        // 5: bloqueado
            { lados: [5], rot: 0, bloqueado: false }       // 6: hoja conectada a 3
        ]
    },
    {
        nombre: "Circuito",
        hexagonos: [
            { lados: [1, 2], rot: 0, bloqueado: false },   // 0: esquina conecta con 1 y 3
            { lados: [3, 4], rot: 0, bloqueado: false },   // 1: esquina conecta con 0 y 3
            { lados: [], rot: 0, bloqueado: true },
            { lados: [0, 2, 3, 5], rot: 0, bloqueado: false },// 3: conecta con 0, 1 y 6
            { lados: [], rot: 0, bloqueado: true },
            { lados: [0, 1], rot: 0, bloqueado: false },
            { lados: [4, 5], rot: 0, bloqueado: false }    // 6: esquina conecta con 3
        ]
    },
    {
        nombre: "Hexágono",
        hexagonos: [
            { lados: [1, 3], rot: 0, bloqueado: false },   // 0: conecta con 1 y 3
            { lados: [2, 4], rot: 0, bloqueado: false },   // 1: conecta con 0 y 4
            { lados: [0, 2], rot: 0, bloqueado: false },   // 2: conecta con 3
            { lados: [], rot: 0, bloqueado: true },   // 3: conecta con 0 y 2
            { lados: [3, 5], rot: 0, bloqueado: false },      // 4: conecta con 1
            { lados: [1, 5], rot: 0, bloqueado: false },
            { lados: [0, 4], rot: 0, bloqueado: false }
        ]
    },
    {
        nombre: "Triángulo Cortado",
        hexagonos: [
            { lados: [2,3], rot: 0, bloqueado: false },      // 0: arriba conecta con 3
            { lados: [], rot: 0, bloqueado: true },
            { lados: [0, 1, 2], rot: 0, bloqueado: false },      // 2: izquierda conecta con 3
            { lados: [1, 4, 5], rot: 0, bloqueado: false },// 3: centro en cruz
            { lados: [3, 4], rot: 0, bloqueado: false },      // 4: derecha conecta con 3
            { lados: [1, 5], rot: 0, bloqueado: false },
            { lados: [0, 4], rot: 0, bloqueado: false }       // 6: abajo conecta con 3
        ]
    },
    {
        nombre: "Infinito",
        hexagonos: [
            { lados: [1, 2], rot: 0, bloqueado: false },   // 0: conecta con 1 y 3
            { lados: [2, 4], rot: 0, bloqueado: false },   // 1: conecta con 0 y 4
            { lados: [1, 2], rot: 0, bloqueado: false },// 2: conecta con 3 y 5
            { lados: [1, 2, 4, 5], rot: 0, bloqueado: false },// 3: conecta con 0, 2 y 6
            { lados: [4, 5], rot: 0, bloqueado: false },   // 4: conecta con 1 y 6
            { lados: [1, 5], rot: 0, bloqueado: false },   // 5: conecta con 2 y 3
            { lados: [4, 5], rot: 0, bloqueado: false }    // 6: conecta con 3 y 4
        ]
    }
];

/* ================================
   FUNCIONES AUXILIARES
================================== */

// Generar el SVG del hexágono base
function generarHexagonoSVG(id) {
    const verticesStr = HEX_VERTICES.map(v => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(' ');
    
    return `
        <div class="hex" id="hex-${id}" data-rot="0">
            <svg class="hex-svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                <polygon class="hex-shape" points="${verticesStr}"/>
                <g class="inner"></g>
            </svg>
        </div>
    `;
}

function generarPalitos(lados) {
    // devuelve markup SVG con líneas y bolitas que apuntan al centro de los lados
    return lados.map(idx => {
        const [sideX, sideY] = HEX_LADOS_MEDIOS[idx];

        // vector desde centro al punto medio del lado
        const dx = sideX - HEX_CENTER_X;
        const dy = sideY - HEX_CENTER_Y;

        // punto final real de la línea según LINE_REACH
        const xEnd = HEX_CENTER_X + dx * LINE_REACH;
        const yEnd = HEX_CENTER_Y + dy * LINE_REACH;

        // bolita más cercana al centro para estética
        const bx = HEX_CENTER_X + dx * DOT_FACTOR;
        const by = HEX_CENTER_Y + dy * DOT_FACTOR;

        // cada línea y su bolita
        return `
            <line x1="${HEX_CENTER_X.toFixed(1)}" y1="${HEX_CENTER_Y.toFixed(1)}" x2="${xEnd.toFixed(1)}" y2="${yEnd.toFixed(1)}" />
            <circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3" />
        `;
    }).join('');
}

/* ================================
   GENERAR ESTRUCTURA HTML
================================== */

function generarEstructuraHexagonos() {
    const grid = document.getElementById('hex-flower-grid');
    
    // Generar los 7 hexágonos directamente
    let html = '';
    for (let i = 0; i < 7; i++) {
        html += generarHexagonoSVG(i);
    }
    
    grid.innerHTML = html;
}

/* ================================
   INICIALIZAR PUZZLE
================================== */

// Índice del puzzle actual (comienza en 0)
let puzzleActualIndex = 0;

function inicializarPuzzle() {
    // Obtener el puzzle según el índice actual
    const template = PUZZLES[puzzleActualIndex];

    // Mostrar nombre del template con su número
    const templateDisplay = document.getElementById('template-name');
    if (templateDisplay) {
        templateDisplay.textContent = `Template ${puzzleActualIndex + 1}/${PUZZLES.length}: ${template.nombre}`;
    }
    
    // Incrementar el índice para el siguiente puzzle (vuelve al inicio al llegar al final)
    puzzleActualIndex = (puzzleActualIndex + 1) % PUZZLES.length;

    const hexes = document.querySelectorAll(".hex");
    hexes.forEach((hex, i) => {
        const tpl = template.hexagonos[i] || { lados: [], rot: 0, bloqueado: true };
        const { lados, rot, bloqueado } = tpl;

        // metadata
        hex.classList.remove("bloqueado");
        hex.dataset.bloqueado = "false";
        hex.dataset.rot = "0";

        const inner = hex.querySelector(".inner");
        inner.innerHTML = ""; // limpiar

        // Para SVG: aplicaremos transform con setAttribute. Usaremos el centro de tu SVG como pivote.
        // También es importante garantizar que el elemento <g> exista y sea el lugar donde se dibujan palitos.
        if (bloqueado) {
            hex.dataset.bloqueado = "true";
            hex.classList.add("bloqueado");
            hex.dataset.rot = rot.toString();

            // generar palitos (sin rotación adicional: la rotación base del bloque la dejamos aplicada)
            inner.innerHTML = generarPalitos(lados);
            inner.setAttribute('transform', `rotate(${rot * 60} ${HEX_CENTER_X} ${HEX_CENTER_Y})`);
        } else {
            // Rotación aleatoria para el puzzle
            const randomRot = Math.floor(Math.random() * 6);
            hex.dataset.rot = randomRot.toString();
            inner.innerHTML = generarPalitos(lados);
            inner.setAttribute('transform', `rotate(${randomRot * 60} ${HEX_CENTER_X} ${HEX_CENTER_Y})`);
        }
    });
}

/* ================================
   VERIFICAR PUZZLE
================================== */

function verificarPuzzle() {
    const hexes = document.querySelectorAll(".hex");
    const template = PUZZLES[puzzleActualIndex === 0 ? PUZZLES.length - 1 : puzzleActualIndex - 1];

    // Verificar que cada hexágono esté en su rotación correcta
    for (let i = 0; i < hexes.length; i++) {
        const hex = hexes[i];
        const hexTemplate = template.hexagonos[i];
        const rotacionActual = Number(hex.dataset.rot || 0);
        
        // Saltar hexágonos bloqueados o vacíos
        if (hexTemplate.bloqueado || hexTemplate.lados.length === 0) continue;

        // CASO ESPECIAL: Hexágono con 6 lados (simetría completa) - cualquier rotación es válida
        if (hexTemplate.lados.length === 6) {
            continue;
        }

        // Verificar que la rotación sea exactamente la del template
        if (rotacionActual !== hexTemplate.rot) {
            return false;
        }
    }

    return true;
}

/* ================================
   EVENTOS
================================== */

function configurarEventos() {
    document.querySelectorAll('.hex').forEach(hex => {
        hex.addEventListener('click', () => {
            if (hex.dataset.bloqueado === "true") return;

            let rot = Number(hex.dataset.rot);
            rot = (rot + 1) % 6;
            hex.dataset.rot = rot.toString();

            const inner = hex.querySelector('.inner');
            inner.setAttribute('transform', `rotate(${rot * 60} ${HEX_CENTER_X} ${HEX_CENTER_Y})`);
        });
    });
}

const btnRandomize = document.getElementById('randomize-btn');
if (btnRandomize) {
    btnRandomize.addEventListener('click', inicializarPuzzle);
}

const btnVerify = document.getElementById('verify-btn');
if (btnVerify) {
    btnVerify.addEventListener('click', () => {
        if (verificarPuzzle()) {
            mostrarExito();
        } else {
            // Efecto de shake en hexágonos incorrectos
            document.querySelectorAll('.hex').forEach(hex => {
                if (hex.dataset.bloqueado !== "true") {
                    hex.style.animation = 'shake 0.3s ease-in-out';
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
    const hexes = document.querySelectorAll('.hex');
    
    // Añadir animación de éxito a todos los hexágonos
    hexes.forEach((hex, i) => {
        setTimeout(() => {
            hex.classList.add('success');
            setTimeout(() => {
                hex.classList.remove('success');
            }, 1200);
        }, i * 50);
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

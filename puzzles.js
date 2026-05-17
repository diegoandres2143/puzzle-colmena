const PUZZLES = [
    {
        nombre: "Radial Total",
        hexagonos: [
            { lados: [1, 2, 3], rotacion: 0, bloqueado: false },       // 0: conecta con 3
            { lados: [2, 3, 4], rotacion: 0, bloqueado: false },       // 1: conecta con 3
            { lados: [0, 1, 2], rotacion: 0, bloqueado: false },       // 2: conecta con 3
            { lados: [0, 1, 2, 3, 4, 5], rotacion: 0, bloqueado: false }, // 3: centro con todos
            { lados: [3, 4, 5], rotacion: 0, bloqueado: false },       // 4: conecta con 3
            { lados: [0, 1, 5], rotacion: 0, bloqueado: false },       // 5: conecta con 3
            { lados: [0, 4, 5], rotacion: 0, bloqueado: false }        // 6: conecta con 3
        ]
    },
    {
        nombre: "Pirámides",
        hexagonos: [
            { lados: [2, 3], rotacion: 0, bloqueado: false }, // 0: garra conectada a 3
            { lados: [2, 3], rotacion: 0, bloqueado: false },
            { lados: [0, 1], rotacion: 0, bloqueado: false }, // 2: garra conectada a 3
            { lados: [0, 1, 4, 5], rotacion: 0, bloqueado: false }, // 3: centro con 3 conexiones
            { lados: [4, 5], rotacion: 0, bloqueado: false }, // 4: garra conectada a 3
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [], rotacion: 0, bloqueado: true }
        ]
    },
    {
        nombre: "Triángulo",
        hexagonos: [
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [1, 2], rotacion: 0, bloqueado: false },   // 3: conecta con 4 y 6
            { lados: [3, 4], rotacion: 0, bloqueado: false },      // 4: conecta con 3
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [0, 5], rotacion: 0, bloqueado: false }       // 6: conecta con 3
        ]
    },
    {
        nombre: "Árbol",
        hexagonos: [
            { lados: [2], rotacion: 0, bloqueado: false },      // 0: hoja conectada a 3
            { lados: [3], rotacion: 0, bloqueado: false },      // 1: hoja conectada a 3
            { lados: [], rotacion: 0, bloqueado: true },        // 2: bloqueado
            { lados: [0, 2, 5], rotacion: 0, bloqueado: false },// 3: tronco con 3 ramas
            { lados: [], rotacion: 0, bloqueado: true },        // 4: bloqueado
            { lados: [], rotacion: 0, bloqueado: true },        // 5: bloqueado
            { lados: [5], rotacion: 0, bloqueado: false }       // 6: hoja conectada a 3
        ]
    },
    {
        nombre: "Circuito",
        hexagonos: [
            { lados: [1, 2], rotacion: 0, bloqueado: false },   // 0: esquina conecta con 1 y 3
            { lados: [3, 4], rotacion: 0, bloqueado: false },   // 1: esquina conecta con 0 y 3
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [0, 2, 3, 5], rotacion: 0, bloqueado: false },// 3: conecta con 0, 1 y 6
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [0, 1], rotacion: 0, bloqueado: false },
            { lados: [4, 5], rotacion: 0, bloqueado: false }    // 6: esquina conecta con 3
        ]
    },
    {
        nombre: "Hexágono",
        hexagonos: [
            { lados: [1, 3], rotacion: 0, bloqueado: false },   // 0: conecta con 1 y 3
            { lados: [2, 4], rotacion: 0, bloqueado: false },   // 1: conecta con 0 y 4
            { lados: [0, 2], rotacion: 0, bloqueado: false },   // 2: conecta con 3
            { lados: [], rotacion: 0, bloqueado: true },   // 3: conecta con 0 y 2
            { lados: [3, 5], rotacion: 0, bloqueado: false },      // 4: conecta con 1
            { lados: [1, 5], rotacion: 0, bloqueado: false },
            { lados: [0, 4], rotacion: 0, bloqueado: false }
        ]
    },
    {
        nombre: "Triángulo Cortado",
        hexagonos: [
            { lados: [2,3], rotacion: 0, bloqueado: false },      // 0: arriba conecta con 3
            { lados: [], rotacion: 0, bloqueado: true },
            { lados: [0, 1, 2], rotacion: 0, bloqueado: false },      // 2: izquierda conecta con 3
            { lados: [1, 4, 5], rotacion: 0, bloqueado: false },// 3: centro en cruz
            { lados: [3, 4], rotacion: 0, bloqueado: false },      // 4: derecha conecta con 3
            { lados: [1, 5], rotacion: 0, bloqueado: false },
            { lados: [0, 4], rotacion: 0, bloqueado: false }       // 6: abajo conecta con 3
        ]
    },
    {
        nombre: "Infinito",
        hexagonos: [
            { lados: [1, 2], rotacion: 0, bloqueado: false },   // 0: conecta con 1 y 3
            { lados: [2, 4], rotacion: 0, bloqueado: false },   // 1: conecta con 0 y 4
            { lados: [1, 2], rotacion: 0, bloqueado: false },// 2: conecta con 3 y 5
            { lados: [1, 2, 4, 5], rotacion: 0, bloqueado: false },// 3: conecta con 0, 2 y 6
            { lados: [4, 5], rotacion: 0, bloqueado: false },   // 4: conecta con 1 y 6
            { lados: [1, 5], rotacion: 0, bloqueado: false },   // 5: conecta con 2 y 3
            { lados: [4, 5], rotacion: 0, bloqueado: false }    // 6: conecta con 3 y 4
        ]
    }
];
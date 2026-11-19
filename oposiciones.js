// Definición de cada oposición: temario, bloques, examen de conocimientos y pruebas físicas.
// Fuentes: convocatorias en el BOE (Policía Nacional: BOE-A-2026-15055; Guardia Civil: BOE-A-2026-9982)
// y los artículos de opomapas.com. Revisa siempre las bases de tu convocatoria.

const PN_TEMAS = [
  'Derecho y persona jurídica', 'Constitución Española (I)', 'Constitución Española (II)',
  'Unión Europea y cooperación policial internacional', 'Administración General del Estado',
  'Funcionarios públicos', 'Ministerio del Interior y Secretaría de Estado de Seguridad',
  'Dirección General de la Policía y Policía Nacional', 'LO 2/1986, de Fuerzas y Cuerpos de Seguridad',
  'Entrada y residencia de extranjeros', 'Infracciones en materia de extranjería', 'Protección internacional',
  'Seguridad privada', 'LO 4/2015, de protección de la seguridad ciudadana', 'Infraestructuras críticas y ciberseguridad',
  'Derecho Penal: parte general', 'Delitos contra las personas', 'Delitos contra el patrimonio',
  'Delitos contra el orden público', 'Delitos informáticos', 'Derecho Procesal Penal y detención',
  'Estatuto de la víctima del delito', 'Igualdad y no discriminación', 'Prevención de riesgos laborales: introducción',
  'Prevención de riesgos laborales: marco normativo', 'Protección de datos personales',
  'Derechos Humanos', 'Globalización', 'Actitudes y valores sociales', 'Principios éticos de la sociedad actual',
  'Inmigración', 'Geografía humana y demografía', 'La seguridad', 'Drogodependencias', 'Desarrollo sostenible',
  'Gramática de la lengua española', 'Ortografía de la lengua española',
  'Sistemas operativos', 'Redes informáticas', 'Inteligencia', 'Ciberdelincuencia y amenazas', 'Armas de fuego',
  'Vehículo prioritario', 'Seguridad en la conducción de vehículos prioritarios', 'Prevención de riesgos laborales en seguridad vial',
];

const GC_TEMAS = [
  'Derechos humanos', 'Igualdad efectiva de mujeres y hombres', 'Prevención de riesgos laborales', 'Derecho constitucional',
  'Derecho de la Unión Europea', 'Instituciones internacionales', 'Derecho civil', 'Derecho penal', 'Derecho procesal penal',
  'Derecho administrativo', 'Protección de datos', 'Extranjería e inmigración',
  'Seguridad pública y seguridad privada', 'Ministerio del Interior y Ministerio de Defensa', 'Fuerzas y Cuerpos de Seguridad. Guardia Civil',
  'Protección civil y sostenibilidad', 'TIC y ciberseguridad', 'Topografía', 'Deontología profesional',
  'Responsabilidad penal de los menores', 'Violencia de género', 'Armas y explosivos',
];

export const OPOSICIONES = {
  pn: {
    id: 'pn',
    nombre: 'Policía Nacional',
    escala: 'Escala Básica',
    marca: 'Oposición PN',
    bloques: { J: 'Ciencias Jurídicas', S: 'Ciencias Sociales', T: 'Materias Técnico-científicas' },
    temas: PN_TEMAS.map((titulo, i) => ({ id: i + 1, titulo, bloque: i < 26 ? 'J' : i < 37 ? 'S' : 'T' })),
    // Prueba de conocimientos: [A – E/(n–1)] × escala / P
    examen: { preguntas: 100, alternativas: 3, escala: 10, minimo: 3, texto: '100 preguntas con 3 alternativas: cada error resta medio acierto. Nota de 0 a 10 (mínimo 3).' },
    fisicas: {
      modo: 'puntos',
      // Anclas aproximadas (puntos 0, 5 y 10). p0 de agilidad = tiempo máximo eliminatorio.
      pruebas: {
        agilidad: { nombre: 'Circuito de agilidad', tipo: 'seg', menorMejor: true },
        fuerza: { nombre: { H: 'Dominadas', M: 'Suspensión en barra' }, tipo: { H: 'rep', M: 'seg' }, menorMejor: false },
        carrera: { nombre: 'Carrera 1000 m', tipo: 'mmss', menorMejor: true },
      },
      baremo: {
        agilidad: { H: [11.7, 10.5, 8.2], M: [12.8, 11.6, 9.3] },
        fuerza: { H: [3, 10, 17], M: [19, 57, 95] },
        carrera: { H: [234, 204, 174], M: [294, 249, 204] },
      },
      nota: 'Puntos aproximados por interpolación entre las marcas de 0, 5 y 10 puntos. Cada prueba de 0 a 10: un cero elimina y la media mínima es 5. Compruébalo con el anexo de tu convocatoria.',
    },
  },
  gc: {
    id: 'gc',
    nombre: 'Guardia Civil',
    escala: 'Escala de Cabos y Guardias',
    marca: 'Oposición GC',
    bloques: { J: 'Ciencias jurídicas', S: 'Seguridad y Guardia Civil', T: 'Materias técnico-científicas' },
    temas: GC_TEMAS.map((titulo, i) => ({ id: i + 1, titulo, bloque: i < 12 ? 'J' : i < 15 ? 'S' : 'T' })),
    examen: { preguntas: 100, alternativas: 4, escala: 100, minimo: 50, texto: 'Conocimientos generales: 100 preguntas con 4 alternativas; los errores descuentan (un tercio de acierto). Nota de 0 a 100 (mínimo 50).' },
    fisicas: {
      modo: 'apto',
      // Marcas mínimas del apéndice II de la Resolución 160/38243/2026 (BOE-A-2026-9982),
      // por tramo de edad: [menor de 35, de 35 a 39, 40 o más].
      tramos: ['Menos de 35 años', 'De 35 a 39 años', '40 años o más'],
      pruebas: {
        resistencia: { nombre: '2.000 m lisos', tipo: 'mmss', menorMejor: true },
        agilidad: { nombre: 'Circuito de agilidad y coordinación', tipo: 'seg', menorMejor: true },
        extensiones: { nombre: 'Extensiones de brazos', tipo: 'rep', menorMejor: false },
        natacion: { nombre: 'Natación 50 m libres', tipo: 'seg', menorMejor: true },
      },
      marcas: {
        resistencia: { H: [565, 588, 633], M: [674, 695, 769] },
        agilidad: { H: [14, 14.4, 15.1], M: [16, 16.4, 17.9] },
        extensiones: { H: [16, 16, 14], M: [11, 11, 9] },
        natacion: { H: [70, 71, 73], M: [81, 83, 88] },
      },
      nota: 'Las cuatro pruebas son de apto o no apto: hay que superar todas las marcas mínimas, que cambian según el sexo y la edad. Compruébalo con el apéndice de tu convocatoria.',
    },
  },
};

export const LISTA_OPOSICIONES = Object.values(OPOSICIONES);

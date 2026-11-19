// Repaso rápido: ideas clave, trampas de examen y preguntas tipo test de cada tema.
// Contenido de opomapas.com (artículos por tema, páginas del temario de Guardia Civil,
// simulacro gratis y tests del blog). Material de estudio no oficial: contrasta con el BOE.
//
// Cómo añadir más: en el tema que quieras, añade a "preguntas" objetos así:
//   { q: 'Enunciado', opts: ['opción a', 'opción b', 'opción c'], ok: 1, src: 'art. 17.2 CE' }   (tipo test; ok = índice de la correcta, empezando en 0)
//   { q: 'Pregunta abierta', a: 'Respuesta (art. …)' }                                          (tarjeta: piensa y mira la respuesta)
// y a "trampas" frases cortas. Usa **texto** para poner en negrita.
export default {
 "pn": {
  "1": {
   "ideas": [
    "**Art. 1.1 CC:** fuentes = **ley, costumbre y principios generales del derecho**. **Art. 1.2:** carecen de validez las disposiciones que contradigan otra de rango superior.",
    "**Art. 6.1 CC:** la ignorancia de las leyes **no excusa de su cumplimiento**. **Art. 7.1:** los derechos deben ejercitarse conforme a la **buena fe**."
   ],
   "trampas": [
    "El plazo general de residencia es de **10 años**; los 5, 2 y 1 año son supuestos concretos. No confundas **nacionalidad** (art. 17 y ss.) con **vecindad civil** (art. 14).",
    "La **costumbre** solo rige **en defecto de ley**; los tratados exigen **publicación íntegra en el BOE**. Las leyes entran en vigor a los **20 días** salvo disposición en contra.",
    "En el cómputo civil de plazos **no se excluyen los días inhábiles** (art. 5.2)."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos años de residencia legal y continuada exige con carácter general la nacionalidad española por residencia?",
     "a": "**10 años** (art. 22.1 CC)."
    }
   ]
  },
  "2": {
   "ideas": [
    "**Art. 116.1:** una ley orgánica regula los estados de alarma, excepción y sitio. Durante ellos **no puede disolverse el Congreso** (art. 116.5).",
    "**Art. 17.2 CE:** detención preventiva = tiempo estrictamente necesario y, en todo caso, **máximo 72 horas**.",
    "**Art. 18.2 CE:** el domicilio es inviolable; entrada y registro solo con **consentimiento, resolución judicial o flagrante delito**."
   ],
   "trampas": [
    "El art. 55.1 solo prevé suspender derechos en **excepción o sitio**, no en alarma. En excepción, el **art. 17.3** (derechos del detenido) no puede suspenderse.",
    "El **secreto de las comunicaciones** solo cede ante **resolución judicial** (no hay excepción por flagrante delito, que es del domicilio). La información protegida por el art. 20 es la **veraz**."
   ],
   "preguntas": [
    {
     "q": "El estado de excepción será declarado por el Gobierno, previa autorización del Congreso, por un plazo máximo de…",
     "a": "**30 días**, prorrogables por otro plazo igual (art. 116.3)."
    },
    {
     "q": "Ninguna entrada o registro podrá hacerse en el domicilio sin consentimiento del titular o resolución judicial, salvo en caso de:",
     "opts": [
      "orden del superior jerárquico",
      "flagrante delito",
      "sospecha de delito"
     ],
     "ok": 1,
     "src": "art. 18.2 CE"
    },
    {
     "q": "Según el artículo 15 de la Constitución, la pena de muerte:",
     "opts": [
      "Está abolida sin ninguna excepción.",
      "Queda abolida, salvo lo que puedan disponer las leyes penales militares para tiempos de guerra.",
      "Solo puede imponerse por delitos de terrorismo."
     ],
     "ok": 1,
     "src": "Es la literalidad del art. 15 CE. Trampa: la LO 11/1995 la abolió también en tiempos de guerra, pero en el test sobre la Constitución la respuesta es la del texto constitucional."
    },
    {
     "q": "La libertad ideológica, religiosa y de culto no tiene más limitación, en sus manifestaciones, que:",
     "opts": [
      "La necesaria para el mantenimiento del orden público protegido por la ley.",
      "La seguridad nacional.",
      "La moral pública."
     ],
     "ok": 0,
     "src": "Art. 16.1 CE."
    },
    {
     "q": "Según el artículo 16.2, nadie podrá ser obligado a declarar sobre:",
     "opts": [
      "Su ideología, religión o creencias.",
      "Su domicilio.",
      "Su nacionalidad."
     ],
     "ok": 0,
     "src": "Art. 16.2 CE."
    },
    {
     "q": "Señala la afirmación correcta sobre el artículo 16.3:",
     "opts": [
      "La religión católica es la religión oficial del Estado.",
      "Ninguna confesión tendrá carácter estatal.",
      "Los poderes públicos no pueden cooperar con ninguna confesión."
     ],
     "ok": 1,
     "src": "Art. 16.3 CE. Trampa: la c) es falsa, porque el mismo artículo dice que los poderes públicos mantendrán relaciones de cooperación con la Iglesia Católica y las demás confesiones."
    },
    {
     "q": "La detención preventiva no podrá durar más del tiempo estrictamente necesario y, en todo caso, en el plazo máximo de:",
     "opts": [
      "24 horas.",
      "48 horas.",
      "72 horas."
     ],
     "ok": 2,
     "src": "Art. 17.2 CE: en el plazo máximo de setenta y dos horas, el detenido deberá ser puesto en libertad o a disposición de la autoridad judicial. Trampa: 72 horas es un tope, no un plazo que haya que agotar."
    },
    {
     "q": "Toda persona detenida debe ser informada de sus derechos y de las razones de su detención:",
     "opts": [
      "En el plazo de 24 horas.",
      "De forma inmediata y de modo que le sea comprensible.",
      "Cuando llegue a dependencias policiales."
     ],
     "ok": 1,
     "src": "Art. 17.3 CE, que añade que no podrá ser obligada a declarar."
    },
    {
     "q": "La Constitución garantiza la asistencia de abogado al detenido:",
     "opts": [
      "Solo en las diligencias judiciales.",
      "En las diligencias policiales y judiciales, en los términos que la ley establezca.",
      "Únicamente si el detenido lo solicita por escrito."
     ],
     "ok": 1,
     "src": "Art. 17.3 CE."
    },
    {
     "q": "El plazo máximo de duración de la prisión provisional:",
     "opts": [
      "Es de 72 horas.",
      "Lo determinará la ley.",
      "Es de dos años."
     ],
     "ok": 1,
     "src": "Art. 17.4 CE, el mismo apartado que obliga a regular por ley el procedimiento de habeas corpus. Trampa: no confundir con las 72 horas de la detención preventiva (art. 17.2)."
    },
    {
     "q": "Ninguna entrada o registro podrá hacerse en el domicilio sin consentimiento del titular o:",
     "opts": [
      "Resolución judicial, únicamente.",
      "Resolución judicial, salvo en caso de flagrante delito.",
      "Orden del Ministro del Interior."
     ],
     "ok": 1,
     "src": "Art. 18.2 CE: tres vías, que son consentimiento, resolución judicial y flagrante delito."
    },
    {
     "q": "Se garantiza el secreto de las comunicaciones, en especial de las postales, telegráficas y telefónicas, salvo:",
     "opts": [
      "Resolución judicial.",
      "Flagrante delito.",
      "Las respuestas a) y b) son correctas."
     ],
     "ok": 0,
     "src": "Art. 18.3 CE. Trampa clásica: el flagrante delito permite entrar en un domicilio (art. 18.2), pero **no** intervenir las comunicaciones."
    },
    {
     "q": "Según el artículo 19 de la Constitución, el derecho a entrar y salir libremente de España no podrá ser limitado por motivos:",
     "opts": [
      "Políticos o ideológicos.",
      "De seguridad nacional.",
      "Económicos o fiscales."
     ],
     "ok": 0,
     "src": "Art. 19 CE, párrafo segundo: el derecho se ejerce en los términos que la ley establezca y no podrá ser limitado por motivos políticos o ideológicos."
    },
    {
     "q": "¿Quiénes son los titulares del derecho a elegir libremente su residencia y a circular por el territorio nacional según el literal del artículo 19?",
     "opts": [
      "Todas las personas.",
      "Los españoles.",
      "Los ciudadanos de la Unión Europea."
     ],
     "ok": 1,
     "src": "Art. 19 CE: «Los españoles tienen derecho a elegir libremente su residencia…». Trampa: fíjate en el sujeto de cada artículo; el 19 habla de «los españoles», no de «todos» o «toda persona»."
    },
    {
     "q": "¿Cuál de los siguientes derechos NO aparece en el artículo 20.1 de la Constitución?",
     "opts": [
      "La producción y creación literaria, artística, científica y técnica.",
      "La libertad de cátedra.",
      "La libertad de enseñanza."
     ],
     "ok": 2,
     "src": "El art. 20.1 CE recoge la libertad de expresión, la creación literaria, artística, científica y técnica, la libertad de cátedra y la libertad de información. Trampa: la libertad de enseñanza está en el art. 27.1 CE, no en el 20; la de cátedra sí está en el 20.1.c)."
    },
    {
     "q": "El artículo 20.1.d) reconoce el derecho a comunicar o recibir libremente información:",
     "opts": [
      "Oficial, por los medios públicos.",
      "Veraz, por cualquier medio de difusión.",
      "Contrastada, solo a través de periodistas acreditados."
     ],
     "ok": 1,
     "src": "Art. 20.1.d) CE, que añade que la ley regulará el derecho a la cláusula de conciencia y al secreto profesional."
    },
    {
     "q": "El ejercicio de los derechos del artículo 20 no puede restringirse mediante:",
     "opts": [
      "Ninguna ley orgánica.",
      "Resolución judicial.",
      "Ningún tipo de censura previa."
     ],
     "ok": 2,
     "src": "Art. 20.2 CE."
    },
    {
     "q": "El secuestro de publicaciones, grabaciones y otros medios de información solo podrá acordarse en virtud de:",
     "opts": [
      "Resolución judicial.",
      "Orden del Ministro del Interior.",
      "Acuerdo del Consejo de Ministros."
     ],
     "ok": 0,
     "src": "Art. 20.5 CE."
    },
    {
     "q": "Según el artículo 21.1, el ejercicio del derecho de reunión pacífica y sin armas:",
     "opts": [
      "Necesita autorización previa de la autoridad gubernativa.",
      "Necesita comunicación previa en todo caso.",
      "No necesitará autorización previa."
     ],
     "ok": 2,
     "src": "Art. 21.1 CE. Trampa: la comunicación previa a la autoridad solo se exige para las reuniones en lugares de tránsito público y las manifestaciones (art. 21.2), y nunca es una autorización."
    },
    {
     "q": "La autoridad solo podrá prohibir las reuniones en lugares de tránsito público y las manifestaciones cuando existan razones fundadas de:",
     "opts": [
      "Molestias a los vecinos o al tráfico.",
      "Alteración del orden público, con peligro para personas o bienes.",
      "Coincidencia con otra manifestación ya comunicada."
     ],
     "ok": 1,
     "src": "Art. 21.2 CE."
    },
    {
     "q": "Las asociaciones constituidas al amparo del artículo 22 deberán inscribirse en un registro:",
     "opts": [
      "A los solos efectos de publicidad.",
      "Como requisito para existir legalmente.",
      "Solo si reciben subvenciones públicas."
     ],
     "ok": 0,
     "src": "Art. 22.3 CE. Trampa: la inscripción no es constitutiva; el registro sirve solo para dar publicidad."
    },
    {
     "q": "Las asociaciones solo podrán ser disueltas o suspendidas en sus actividades en virtud de:",
     "opts": [
      "Resolución gubernativa motivada.",
      "Acuerdo del registro en el que estén inscritas.",
      "Resolución judicial motivada."
     ],
     "ok": 2,
     "src": "Art. 22.4 CE. Trampa: no la confundas con el art. 22.2 (son ilegales las que persigan fines o utilicen medios tipificados como delito) ni con el 22.5 (se prohíben las asociaciones secretas y las de carácter paramilitar)."
    }
   ]
  },
  "3": {
   "ideas": [
    "**Congreso:** 300-400 diputados, 4 años, circunscripción provincial. **Senado:** 4 por provincia, 4 años, cámara de representación territorial.",
    "**Art. 56.3 CE:** la persona del Rey es **inviolable** y no está sujeta a responsabilidad; sus actos carecen de validez sin **refrendo**.",
    "**Art. 97 CE:** el Gobierno dirige la política interior y exterior, la Administración civil y militar y la defensa del Estado."
   ],
   "trampas": [
    "En investidura: **mayoría absoluta** la primera vez y **mayoría simple** a las 48 horas. La inmunidad permite la detención **solo en flagrante delito**.",
    "El Rey **declara la guerra y hace la paz**, pero **previa autorización de las Cortes Generales**. Del acto del Rey responde **quien lo refrenda**.",
    "El Gobierno cesante continúa **en funciones** hasta que toma posesión el nuevo."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos senadores se eligen en cada provincia peninsular?",
     "a": "**4** (art. 69.2 CE)."
    },
    {
     "q": "¿Quién ostenta el mando supremo de las Fuerzas Armadas?",
     "opts": [
      "El Rey",
      "El Ministro de Defensa",
      "El Presidente del Gobierno"
     ],
     "ok": 0,
     "src": "art. 62.h CE"
    },
    {
     "q": "¿Quién nombra y separa a los demás miembros del Gobierno?",
     "opts": [
      "El Congreso de los Diputados",
      "El Rey, a propuesta del Presidente",
      "El Consejo de Ministros por mayoría"
     ],
     "ok": 1,
     "src": "art. 100 CE"
    }
   ]
  },
  "4": {
   "ideas": [
    "**Art. 288 TFUE:** reglamento, directiva, decisión, recomendación y dictamen. El reglamento es **directamente aplicable**; la directiva fija el **resultado**.",
    "**Art. 2 TUE:** valores = dignidad humana, libertad, democracia, igualdad, Estado de Derecho y derechos humanos.",
    "**Art. 14.3 TUE:** los eurodiputados se eligen por sufragio universal directo, libre y secreto, para un mandato de **5 años**. **Art. 15.1:** el Consejo Europeo **no ejerce función legislativa**."
   ],
   "trampas": [
    "**No mezcles tribunales:** el TJUE se rige por los Tratados de la UE; el TEDH, por el Convenio de Roma.",
    "**Consejo Europeo ≠ Consejo**: el Consejo Europeo reúne a los **Jefes de Estado o de Gobierno** y **no legisla**; el Consejo (de ministros) sí. El Presidente del Consejo Europeo: **2,5 años** renovables **una vez**."
   ],
   "preguntas": [
    {
     "q": "¿Qué acto de la UE es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro?",
     "a": "el **reglamento** (art. 288 TFUE)."
    },
    {
     "q": "¿Qué acto de la UE es obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro?",
     "opts": [
      "El reglamento",
      "La directiva",
      "La recomendación"
     ],
     "ok": 0,
     "src": "art. 288 TFUE"
    },
    {
     "q": "¿Cuál es la moneda de la unión económica y monetaria de la UE?",
     "opts": [
      "La libra",
      "El euro",
      "El ecu"
     ],
     "ok": 1,
     "src": "art. 3.4 TUE"
    }
   ]
  },
  "5": {
   "ideas": [
    "**Órganos superiores:** Ministros y Secretarios de Estado. **Órganos directivos:** Subsecretarios, Secretarios generales, Directores generales y Subdirectores generales.",
    "**Art. 2 Ley 50/1997:** el Presidente dirige la acción del Gobierno, coordina a los demás miembros y **convoca, preside y fija el orden del día** del Consejo de Ministros."
   ],
   "trampas": [
    "Los **Subdirectores generales** son órganos directivos pero **no tienen la condición de alto cargo** (art. 55.6). Los Delegados del Gobierno tienen rango de Subsecretario; los Subdelegados, nivel de Subdirector general."
   ],
   "preguntas": [
    {
     "q": "¿Cuáles son los órganos superiores de la organización central de la AGE?",
     "a": "**Ministros y Secretarios de Estado** (art. 55.3.a Ley 40/2015)."
    },
    {
     "q": "¿Cuáles son los órganos superiores de la organización central de la AGE?",
     "opts": [
      "Ministros y Subsecretarios",
      "Ministros y Secretarios de Estado",
      "Subsecretarios y Directores generales"
     ],
     "ok": 1,
     "src": "art. 55.3.a Ley 40/2015"
    },
    {
     "q": "¿Quién convoca, preside y fija el orden del día del Consejo de Ministros?",
     "opts": [
      "El Vicepresidente primero",
      "El Rey",
      "El Presidente del Gobierno"
     ],
     "ok": 2,
     "src": "art. 2.2.g Ley 50/1997"
    }
   ]
  },
  "6": {
   "ideas": [
    "El funcionario de carrera se hace con **cuatro pasos sucesivos** (art. 62): proceso selectivo, nombramiento, acatamiento de la Constitución y toma de posesión.",
    "**Art. 14.a EBEP:** los funcionarios de carrera tienen derecho a la **inamovilidad** en su condición. **Art. 14.m:** a las vacaciones, descansos, permisos y licencias."
   ],
   "trampas": [
    "**Mayor de 16 años**, no de 18, para participar en los procesos selectivos (art. 56.1.c). Y la renuncia necesita **aceptación expresa** de la Administración."
   ],
   "preguntas": [
    {
     "q": "Es causa de pérdida de la condición de funcionario de carrera…",
     "a": "renuncia, pérdida de nacionalidad, **jubilación total**, separación firme o inhabilitación firme (art. 63)."
    }
   ]
  },
  "7": {
   "ideas": [
    "La **Secretaría de Estado de Seguridad** es un órgano superior: ejerce el **mando de las Fuerzas y Cuerpos de Seguridad del Estado**, bajo la autoridad del titular del Ministerio.",
    "**Art. 2.4 RD 207/2024:** el titular de la Secretaría de Estado de Seguridad **preside el Comité Ejecutivo de Coordinación**; la DG de Coordinación y Estudios ejerce sus funciones de **secretaría**."
   ],
   "trampas": [
    "La **DG de Tráfico** NO depende de la Secretaría de Estado de Seguridad, sino de la **Subsecretaría del Interior**. La Dirección General de la Policía sí depende de la SES."
   ],
   "preguntas": [
    {
     "q": "¿De qué órgano superior depende la Dirección General de la Policía?",
     "a": "de la **Secretaría de Estado de Seguridad** (art. 1.5.a RD 207/2024)."
    }
   ]
  },
  "8": {
   "ideas": [
    "**Cuatro escalas:** Superior, Ejecutiva, Subinspección y Básica. La Escala Básica (Oficial de Policía y Policía) se clasifica en el **Grupo C, subgrupo C1**.",
    "**Art. 3.3 RD 207/2024:** las funciones policiales operativas en el nivel central las realizan **cinco Comisarías Generales** (Información, Policía Judicial, Seguridad Ciudadana, Extranjería y Fronteras y Policía Científica) con nivel de **subdirección general**."
   ],
   "trampas": [
    "En faltas leves la suspensión es de **1 a 4 días** y en graves de **5 días a 3 meses**; la suspensión de **3 meses y 1 día a 6 años** es solo para muy graves."
   ],
   "preguntas": [
    {
     "q": "¿En qué subgrupo se clasifica la Escala Básica de la Policía Nacional?",
     "a": "**C1** (art. 17.3.c LO 9/2015)."
    },
    {
     "q": "¿Qué Comisaría General se encarga de la criminalística y los informes periciales?",
     "opts": [
      "La de Información",
      "La de Policía Judicial",
      "La de Policía Científica"
     ],
     "ok": 2,
     "src": "art. 3.3.e RD 207/2024"
    }
   ]
  },
  "9": {
   "ideas": [
    "**Art. 7.1:** en el ejercicio de sus funciones, los miembros de las FCS tienen a todos los efectos legales el carácter de **agentes de la autoridad**.",
    "**Art. 11.1 LO 2/1986:** la misión de las FCSE es proteger el libre ejercicio de los derechos y libertades y garantizar la seguridad ciudadana."
   ],
   "trampas": [
    "La **obediencia debida** no ampara órdenes que constituyan **delito manifiesto** o sean contrarias a la Constitución o a las leyes (art. 5.1.d). Las **armas** solo se usan ante riesgo grave para vida o integridad."
   ],
   "preguntas": [
    {
     "q": "Los miembros de las FCS podrán ejercer el derecho de huelga…",
     "a": "**FALSO**: no podrán ejercerlo, ni acciones sustitutivas (art. 6.8)."
    }
   ]
  },
  "10": {
   "ideas": [
    "**Menos de 3 meses:** basta documento de identidad o pasaporte en vigor. **Más de 3 meses:** trabajar, recursos y seguro, estudiar o ser familiar.",
    "**Art. 32 LO 4/2000:** la residencia de larga duración se obtiene tras **5 años** de residencia temporal continuada y permite residir y trabajar **indefinidamente**."
   ],
   "trampas": [
    "El ciudadano de la UE entra con **pasaporte o documento de identidad**; el **visado** solo puede exigirse a **familiares no comunitarios** (art. 4.2). La tarjeta de familiar es obligatoria pasados 3 meses."
   ],
   "preguntas": [
    {
     "q": "Para estancias inferiores a tres meses, a un ciudadano de la UE le basta…",
     "a": "**pasaporte o documento de identidad en vigor** (art. 6 RD 240/2007)."
    }
   ]
  },
  "11": {
   "ideas": [
    "**Art. 57.3:** en ningún caso podrán imponerse conjuntamente la sanción de **expulsión y multa**. La expulsión extingue cualquier autorización para permanecer en España.",
    "**Art. 58.1:** la expulsión conlleva la **prohibición de entrada** en España, que **no excederá de cinco años** (hasta diez en caso de amenaza grave)."
   ],
   "trampas": [
    "Los plazos de prescripción de las **infracciones** (leves: 6 meses) no son los de las **sanciones** (leves: 1 año). Estar irregularmente en España es infracción **grave**, no muy grave."
   ],
   "preguntas": [
    {
     "q": "La multa por una infracción grave de extranjería oscila entre…",
     "a": "**501 y 10.000 euros** (art. 55.1.b LO 4/2000)."
    },
    {
     "q": "La prohibición de entrada derivada de una expulsión tiene una duración que, en general, no excederá de:",
     "opts": [
      "Veinte años",
      "Un año",
      "Cinco años"
     ],
     "ok": 2,
     "src": "art. 58.1 LO 4/2000 (hasta 10 en caso de amenaza grave)"
    }
   ]
  },
  "12": {
   "preguntas": [
    {
     "q": "¿En qué plazo puede pedirse el reexamen de una inadmisión en frontera?",
     "opts": [
      "10 días",
      "2 días desde la notificación",
      "24 horas"
     ],
     "ok": 1,
     "src": "art. 21.4 Ley 12/2009"
    }
   ]
  },
  "14": {
   "ideas": [
    "**Art. 16.2:** la permanencia en dependencias policiales para identificarse no puede superar **6 horas**, y solo a los efectos de la identificación.",
    "**Art. 35 LO 4/2015:** solo son **4** infracciones muy graves: infraestructuras básicas, armas y explosivos sin autorización, espectáculos prohibidos y haces de luz sobre conductores."
   ],
   "trampas": [
    "Las diligencias de identificación, registro y comprobación **no están sujetas a las formalidades de la detención** (art. 19.1). El DNI es obligatorio a los **14** años, no a los 18."
   ],
   "preguntas": [
    {
     "q": "¿Cuál es el tiempo máximo que puede permanecer una persona en dependencias policiales a los solos efectos de su identificación?",
     "a": "**6 horas** (art. 16.2)."
    }
   ]
  },
  "16": {
   "ideas": [
    "**Art. 19 CP:** los menores de dieciocho años no serán responsables criminalmente con arreglo a este Código.",
    "**Prisión superior a 5 años = pena grave**; de 3 meses a 5 años = menos grave. **Multa de hasta 3 meses = leve**; de más de 3 meses = menos grave."
   ],
   "trampas": [
    "La **legítima defensa** exige los **tres** requisitos a la vez, y la confesión es atenuante solo si se hace **antes de conocer** que el procedimiento se dirige contra el culpable."
   ],
   "preguntas": [
    {
     "q": "¿Cuáles son los requisitos de la legítima defensa?",
     "a": "**agresión ilegítima**, **necesidad racional del medio** empleado y **falta de provocación suficiente** (art. 20.4 CP)."
    }
   ]
  },
  "17": {
   "ideas": [
    "**Homicidio:** 10 a 15 años. **Asesinato:** 15 a 25 años (alevosía, precio, ensañamiento o facilitar/ocultar otro delito).",
    "**Detención ilegal (art. 163.1):** el particular que encerrare o detuviere a otro privándole de su libertad → prisión de **4 a 6 años**."
   ],
   "trampas": [
    "En las lesiones, la **simple vigilancia o seguimiento facultativo** no se considera tratamiento médico (art. 147.1). La pérdida de un órgano **principal** (6-12 años) no es la del **no principal** (3-6 años)."
   ],
   "preguntas": [
    {
     "q": "¿Qué pena corresponde al homicidio del art. 138.1 CP?",
     "a": "prisión de **diez a quince años**."
    },
    {
     "q": "El particular que encerrare o detuviere a otro, privándole de su libertad, será castigado con prisión de:",
     "opts": [
      "Cuatro a seis años",
      "Diez a quince años",
      "Uno a tres años"
     ],
     "ok": 0,
     "src": "art. 163.1 CP"
    }
   ]
  },
  "18": {
   "ideas": [
    "**Robo:** con **fuerza en las cosas** (arts. 238-240) o con **violencia o intimidación en las personas** (arts. 237 y 242). El **hurto** no emplea ni fuerza ni violencia.",
    "**Art. 245.2 CP:** ocupar un inmueble ajeno **que no sea morada** sin autorización o mantenerse en él contra la voluntad de su titular → multa de **3 a 6 meses**."
   ],
   "trampas": [
    "La cuantía de **400 €** separa el hurto con pena de prisión de la multa. En el uso de vehículos, **no restituirlo en 48 horas** convierte el hecho en hurto o robo."
   ],
   "preguntas": [
    {
     "q": "El robo con violencia o intimidación en las personas se castiga con prisión de…",
     "a": "**2 a 5 años** (art. 242.1 CP)."
    }
   ]
  },
  "19": {
   "ideas": [
    "**Atentado (art. 550):** agresión o resistencia grave con violencia o intimidación contra autoridad, agentes o funcionarios en el ejercicio de sus funciones o con ocasión de ellas.",
    "**Art. 561 CP:** simular una situación de peligro o siniestro que obligue a movilizar servicios de policía, asistencia o salvamento → prisión de **3 meses y 1 día a 1 año** o multa de 3 a 18 meses."
   ],
   "trampas": [
    "**Atentado ≠ resistencia o desobediencia:** el atentado exige agresión, intimidación grave o violencia; la resistencia o desobediencia grave (art. 556) se aplica a quien **no está comprendido en el art. 550**."
   ],
   "preguntas": [
    {
     "q": "Atentado contra autoridad: prisión de…",
     "a": "**1 a 4 años** y multa de 3 a 6 meses (art. 550.2 CP)."
    },
    {
     "q": "El atentado contra la autoridad se castiga con:",
     "opts": [
      "Prisión de 1 a 4 años y multa de 3 a 6 meses",
      "Prisión de 4 a 6 años",
      "Prisión de 6 meses a 1 año"
     ],
     "ok": 0,
     "src": "art. 550.2 CP"
    }
   ]
  },
  "20": {
   "ideas": [
    "**Art. 197 bis CP:** acceder a un sistema de información **vulnerando las medidas de seguridad** o mantenerse en él contra la voluntad de quien tenga derecho a excluirlo → prisión de **6 meses a 2 años**."
   ],
   "trampas": [
    "En la prueba digital, la **simple incautación** de ordenadores o móviles en un registro **no autoriza leer su contenido**: hace falta que el juez lo autorice (art. 588 sexies a.2)."
   ],
   "preguntas": [
    {
     "q": "Difundir los datos o imágenes obtenidos mediante descubrimiento de secretos se castiga con prisión de…",
     "a": "**2 a 5 años** (art. 197.3 CP)."
    },
    {
     "q": "¿Qué pena tiene el acceso ilícito a un sistema de información?",
     "opts": [
      "Prisión de tres a seis años",
      "Multa de uno a tres meses",
      "Prisión de seis meses a dos años"
     ],
     "ok": 2,
     "src": "art. 197 bis.1 CP"
    }
   ]
  },
  "21": {
   "ideas": [
    "**Art. 17.2 CE:** la detención preventiva no puede durar más del tiempo estrictamente necesario y, en todo caso, el plazo máximo es de **72 horas**: libertad o puesta a disposición judicial."
   ],
   "trampas": [
    "**No confundas plazos:** el art. 496 LECrim habla de **24 horas** para poner en libertad o entregar al juez al detenido; el máximo constitucional (art. 17.2 CE y 520.1) es de **72 horas**."
   ],
   "preguntas": [
    {
     "q": "El plazo máximo de la detención preventiva, antes de poner al detenido en libertad o a disposición judicial, es de…",
     "a": "**72 horas** (art. 17.2 CE)."
    },
    {
     "q": "¿En qué delitos puede renunciar el detenido al abogado?",
     "opts": [
      "En los exclusivamente contra la seguridad del tráfico",
      "En cualquier delito con pena inferior a tres años",
      "En los delitos de hurto"
     ],
     "ok": 0,
     "src": "art. 520.8 LECrim"
    }
   ]
  },
  "22": {
   "ideas": [
    "**Art. 3.1:** toda víctima tiene derecho a la protección, información, apoyo, asistencia, atención y reparación, así como a la **participación activa** en el proceso penal.",
    "**Art. 8 Ley 4/2015:** abogados y procuradores no pueden ofrecer sus servicios a víctimas de catástrofes hasta pasados **45 días** desde el hecho."
   ],
   "trampas": [
    "La ley **no se aplica a terceros** que hayan sufrido perjuicios derivados del delito (art. 2). Y la mediación y la conciliación están **vedadas** en violencia sexual y de género."
   ],
   "preguntas": [
    {
     "q": "Son víctimas indirectas en caso de muerte causada por un delito…",
     "a": "el **cónyuge no separado** y los hijos que convivieran con la víctima (art. 2.b)."
    },
    {
     "q": "¿Cuántos días de reflexión se imponen a abogados para ofrecer servicios a víctimas de catástrofes?",
     "opts": [
      "45 días",
      "90 días",
      "15 días"
     ],
     "ok": 0,
     "src": "art. 8 Ley 4/2015"
    }
   ]
  },
  "23": {
   "ideas": [
    "**Art. 3:** el principio de igualdad de trato supone la **ausencia de toda discriminación directa o indirecta** por razón de sexo, en especial por maternidad, obligaciones familiares y estado civil.",
    "**Art. 13 LO 3/2007:** si se alega discriminación por razón de sexo, la **parte demandada** debe probar la ausencia de discriminación; **no rige en procesos penales**."
   ],
   "trampas": [
    "**Directa ≠ indirecta:** la directa trata peor **por razón del sexo**; la indirecta usa un criterio **aparentemente neutro** que perjudica a un sexo. El **embarazo** y la maternidad son discriminación **directa**."
   ],
   "preguntas": [
    {
     "q": "¿Cuándo aprueba el Gobierno el Plan para la Igualdad en la AGE?",
     "a": "**al inicio de cada legislatura** (art. 64 LO 3/2007)."
    }
   ]
  },
  "24": {
   "ideas": [
    "**Riesgo laboral:** posibilidad de que un trabajador sufra un daño derivado del trabajo; se califica por la **probabilidad** y la **severidad** del daño.",
    "**Art. 16 Ley 31/1995:** los **instrumentos esenciales** del plan de prevención son la **evaluación de riesgos** y la **planificación de la actividad preventiva**."
   ],
   "trampas": [
    "La **protección colectiva** se antepone a la individual (art. 15.1.h) y el **coste de la prevención** nunca recae sobre los trabajadores (art. 14.5)."
   ],
   "preguntas": [
    {
     "q": "Según la Ley 31/1995, ¿qué debe anteponerse en las medidas preventivas?",
     "a": "la **protección colectiva** a la individual (art. 15.1.h)."
    }
   ]
  },
  "25": {
   "ideas": [
    "**Art. 21.2 Ley 31/1995:** el trabajador tiene derecho a **interrumpir su actividad y abandonar el lugar de trabajo** ante un riesgo grave e inminente para su vida o su salud.",
    "**Art. 4 RD 2/2006:** priorizar la **protección colectiva** sobre la individual, evitar riesgos, evaluar los inevitables y combatirlos en su origen."
   ],
   "trampas": [
    "Los **reconocimientos médicos** de los policías son **voluntarios**, salvo que una norma disponga otra cosa o sean necesarios para detectar patologías que puedan causar **grave riesgo** a los funcionarios o a los ciudadanos (art. 10.2 RD 2/2006)."
   ],
   "preguntas": [
    {
     "q": "¿Qué modalidades de organización preventiva establece el RD 39/1997 (art. 10)?",
     "a": "**asunción personal**, **trabajadores designados**, **servicio propio** y **servicio ajeno**."
    },
    {
     "q": "¿Qué protección debe priorizarse según el RD 2/2006?",
     "opts": [
      "Ninguna tiene prioridad",
      "La individual sobre la colectiva",
      "La colectiva sobre la individual"
     ],
     "ok": 2,
     "src": "art. 4.f RD 2/2006"
    }
   ]
  },
  "26": {
   "ideas": [
    "**Art. 7 LO 3/2018:** el tratamiento de datos de un menor solo puede fundarse en su consentimiento cuando sea **mayor de 14 años**.",
    "**Art. 12.4 LO 3/2018:** la prueba del cumplimiento del deber de responder a la solicitud de ejercicio de derechos recae sobre el **responsable** del tratamiento."
   ],
   "trampas": [
    "**Menores de 14:** hace falta el consentimiento del titular de la **patria potestad o tutela**. El deber de confidencialidad **no termina** al acabar la relación con el responsable."
   ],
   "preguntas": [
    {
     "q": "A partir de qué edad puede un menor consentir el tratamiento de sus datos personales",
     "a": "**14 años** (art. 7.1 LO 3/2018)."
    }
   ]
  },
  "27": {
   "ideas": [
    "**Art. 3 CEDH:** «Nadie podrá ser sometido a tortura ni a penas o tratos inhumanos o degradantes.» La **Declaración Universal** lo recoge en su **art. 5**.",
    "**Art. 9 DUDH:** nadie podrá ser **arbitrariamente detenido, preso ni desterrado**."
   ],
   "trampas": [
    "La **orden de un superior** NO justifica la tortura (CAT art. 2.3) y el **mecanismo nacional** español es el **Defensor del Pueblo**, no un órgano judicial. No confundas el art. 5 DUDH (tortura) con el art. 3 CEDH."
   ],
   "preguntas": [
    {
     "q": "¿Qué institución ejerce en España las funciones del Mecanismo Nacional de Prevención de la Tortura?",
     "a": "el **Defensor del Pueblo** (LO 3/1981, disposición final única)."
    },
    {
     "q": "¿Qué institución ejerce en España las funciones del Mecanismo Nacional de Prevención de la Tortura?",
     "opts": [
      "El Fiscal General del Estado",
      "El Defensor del Pueblo",
      "El Tribunal Constitucional"
     ],
     "ok": 1,
     "src": "LO 3/1981, disposición final única"
    }
   ]
  },
  "28": {
   "ideas": [
    "**Declaración del Milenio, párr. 5:** la tarea fundamental es lograr que la mundialización sea una **fuerza positiva para todos**, pues sus beneficios y costos se reparten de forma muy desigual.",
    "**Declaración del Milenio, párr. 9:** medidas concertadas contra el **terrorismo internacional**, la droga y la delincuencia transnacional, incluida la **trata** y el **blanqueo de dinero**."
   ],
   "trampas": [
    "El texto de la ONU habla de **«mundialización»**. Reconoce que ofrece grandes posibilidades, pero **no** que sus beneficios estén repartidos por igual: se distribuyen de forma **muy desigual**."
   ],
   "preguntas": [
    {
     "q": "Según la Declaración del Milenio, la tarea fundamental es conseguir que la mundialización se convierta en…",
     "a": "**una fuerza positiva para todos los habitantes del mundo**."
    },
    {
     "q": "Según la Declaración del Milenio, la tarea fundamental es conseguir que la mundialización se convierta en:",
     "opts": [
      "Un proceso inevitable sin regulación",
      "Un motor de crecimiento solo para los países ricos",
      "Una fuerza positiva para todos los habitantes del mundo"
     ],
     "ok": 2,
     "src": "Declaración del Milenio, párr. 5"
    }
   ]
  },
  "29": {
   "ideas": [
    "**Art. 4.1 Ley 15/2022:** el derecho a la igualdad de trato implica la **ausencia de toda discriminación**; se prohíbe toda disposición, conducta, acto, criterio o práctica que lo vulnere.",
    "**Art. 2.1 Ley 15/2022:** el derecho corresponde a toda persona **con independencia de su nacionalidad**, edad o de si tiene **residencia legal**."
   ],
   "trampas": [
    "**Directa ≠ indirecta:** la directa trata **menos favorablemente** por una causa; la indirecta se esconde tras un criterio **aparentemente neutro**. Una diferencia de trato **objetivamente justificada** por finalidad legítima, adecuada, necesaria y proporcionada no es discriminación (art. 4.2)."
   ],
   "preguntas": [
    {
     "q": "La discriminación fundada en una apreciación incorrecta de las características de la persona se denomina…",
     "a": "**discriminación por error** (art. 6.2.b)."
    }
   ]
  },
  "30": {
   "ideas": [
    "**Art. 510.1.a CP:** quienes públicamente fomenten, promuevan o inciten al **odio, hostilidad, discriminación o violencia** contra un grupo o persona por su pertenencia a él: prisión de 1 a 4 años y multa de 6 a 12 meses.",
    "**Art. 22.4.ª CP:** agravante de cometer el delito por motivos racistas, antisemitas, antigitanos u otra discriminación, **aunque tales condiciones no concurran efectivamente** en la víctima."
   ],
   "trampas": [
    "La agravante del **art. 22.4.ª** se aplica **aunque la condición no concurra** realmente en la víctima. Y hacerlo por **internet** o redes sube la pena a su **mitad superior** (art. 510.3)."
   ],
   "preguntas": [
    {
     "q": "Pena base de quienes públicamente inciten al odio, hostilidad, discriminación o violencia contra un grupo (art. 510.1.a)",
     "a": "prisión de **1 a 4 años** y multa de **6 a 12 meses**."
    }
   ]
  },
  "31": {
   "ideas": [
    "**Art. 2 ter LO 4/2000:** los poderes públicos promoverán la **plena integración** de los extranjeros en la sociedad española, con el único límite del respeto a la Constitución y la ley.",
    "**A/RES/73/195, párr. 7:** el Pacto Mundial es un marco de cooperación **no vinculante jurídicamente**, aprobado en Marrakech (10 y 11 de diciembre de 2018)."
   ],
   "trampas": [
    "El Pacto Mundial no es un tratado, es una **resolución de la Asamblea General**. La política de inmigración la define el **Gobierno**, sin perjuicio de las competencias autonómicas."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos objetivos contiene el Pacto Mundial para la Migración Segura, Ordenada y Regular?",
     "a": "**23** (Resolución 73/195 de la Asamblea General)."
    },
    {
     "q": "¿Cuántos objetivos contiene el Pacto Mundial para la Migración Segura, Ordenada y Regular?",
     "opts": [
      "17",
      "10",
      "23"
     ],
     "ok": 2,
     "src": "Resolución 73/195 de la Asamblea General"
    }
   ]
  },
  "32": {
   "ideas": [
    "**Saldo vegetativo = nacimientos − defunciones** (por cada 1.000 habitantes). Natalidad y mortalidad se miden por 1.000 habitantes; la fecundidad, por 1.000 mujeres de 15 a 49 años.",
    "**INE, IDB, apdo. 2:** son residentes habituales quienes han residido **al menos doce meses** o llevan menos pero tienen **intención de permanecer al menos un año**."
   ],
   "trampas": [
    "**Natalidad ≠ fecundidad:** la tasa global de fecundidad se calcula sobre las **mujeres de 15 a 49 años**, no sobre toda la población. El INE usa el término **«saldo vegetativo»** para el crecimiento natural."
   ],
   "preguntas": [
    {
     "q": "El saldo vegetativo de una población se obtiene…",
     "a": "**restando las defunciones a los nacimientos** de un año (por cada 1.000 habitantes)."
    }
   ]
  },
  "33": {
   "ideas": [
    "**Art. 104 CE:** las FCS, bajo la dependencia del Gobierno, tienen como misión **proteger el libre ejercicio de los derechos y libertades** y **garantizar la seguridad ciudadana**.",
    "**Art. 9.1 Ley 36/2015:** los componentes fundamentales de la Seguridad Nacional son la **Defensa Nacional**, la **Seguridad Pública** y la **Acción Exterior**."
   ],
   "trampas": [
    "La seguridad pública es competencia **exclusiva del Estado** (aunque CCAA y Corporaciones Locales participan en su mantenimiento); la seguridad privada es **complementaria** de las FCS, no sustitutiva."
   ],
   "preguntas": [
    {
     "q": "La Seguridad Pública es competencia…",
     "a": "**exclusiva del Estado** (art. 1.1 LO 2/1986)."
    }
   ]
  },
  "34": {
   "ideas": [
    "**ENA 2017-2024:** dos metas (sociedad más **saludable** —demanda— y más **segura** —oferta—), seis áreas transversales y dos planes de acción cuatrienales.",
    "**ENA 2017-2024:** tres objetivos generales: **disminuir los daños**, **disminuir la presencia y el consumo** y **retrasar la edad de inicio**."
   ],
   "trampas": [
    "El **consumo en la vía pública** no es delito: es **infracción grave** de la LO 4/2015 (36.16). El **tráfico** (art. 368 CP) distingue **3-6 años** (grave daño a la salud) y **1-3 años** (resto)."
   ],
   "preguntas": [
    {
     "q": "Penas del art. 368 CP para sustancias que causan grave daño a la salud",
     "a": "prisión de **3 a 6 años** y multa del tanto al triplo."
    }
   ]
  },
  "35": {
   "ideas": [
    "**Agenda 2030:** 17 ODS y 169 metas, que integran las dimensiones **económica, social y ambiental**. En España, la **neutralidad climática** debe alcanzarse antes de 2050 (Ley 7/2021).",
    "**A/RES/70/1:** **17 objetivos** y **169 metas**, adoptados en Nueva York del 25 al 27 de septiembre de 2015, para cumplirse **de aquí a 2030**."
   ],
   "trampas": [
    "**Evaluación ambiental estratégica** = planes y programas; **evaluación de impacto ambiental** = proyectos. Las dimensiones del desarrollo sostenible son **tres**; las esferas de acción, **cinco**."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos Objetivos de Desarrollo Sostenible contiene la Agenda 2030?",
     "a": "**17** objetivos y **169** metas."
    },
    {
     "q": "¿Cuántos Objetivos de Desarrollo Sostenible contiene la Agenda 2030?",
     "opts": [
      "12 objetivos y 100 metas",
      "20 objetivos y 200 metas",
      "17 objetivos y 169 metas"
     ],
     "ok": 2,
     "src": "Resolución A/RES/70/1"
    }
   ]
  },
  "36": {
   "ideas": [
    "**Común** (el/la artista): una forma, dos géneros por el determinante. **Ambiguo** (el/la mar): dos géneros, **misma** entidad. **Epiceno** (la víctima): un solo género para ambos sexos.",
    "**RAE, NGLE 11.1g:** el **masculino** es el género **no marcado** en español y el **femenino** el género marcado."
   ],
   "trampas": [
    "El **artículo el ante «a» tónica** (el agua, el alma) no hace masculino al sustantivo: lo correcto es **esta hacha, toda el hambre, poca agua**. Los sustantivos **no tienen género neutro**."
   ],
   "preguntas": [
    {
     "q": "¿Cómo se llaman los sustantivos que, como el artista / la artista, no cambian de forma entre masculino y femenino?",
     "a": "**comunes en cuanto al género**."
    }
   ]
  },
  "37": {
   "ideas": [
    "**Agudas**: tilde si acaban en vocal, **n** o **s**. **Llanas**: tilde si acaban en consonante **distinta de n o s**. **Esdrújulas**: **siempre**.",
    "**Hiato con vocal cerrada tónica** (río, María, raíz): **siempre** lleva tilde sobre la **cerrada**, aunque las reglas generales no la exijan."
   ],
   "trampas": [
    "Aguda terminada en **más de una consonante** (robots) **no** se tilda; llana terminada en **-y** (póney) **sí**. Los **monosílabos** no llevan tilde salvo la diacrítica."
   ],
   "preguntas": [
    {
     "q": "¿Por qué lleva tilde además?",
     "a": "es **aguda terminada en -s**."
    }
   ]
  },
  "38": {
   "ideas": [
    "**NTFS** ofrece **seguridad** (ACL y cifrado), compresión y journaling de metadatos; **FAT32** no, y limita los archivos a **4 GiB**.",
    "**kernel.org:** Linux es un **clon de Unix** escrito desde cero por **Linus Torvalds**, distribuido bajo la **GPL v2**."
   ],
   "trampas": [
    "**FAT32 ≠ exFAT ≠ NTFS:** solo NTFS tiene **ACL, cifrado de sistema de archivos y compresión**. El límite de **4 GiB por archivo** es de **FAT32**."
   ],
   "preguntas": [
    {
     "q": "¿Qué sistema de archivos limita el tamaño máximo de un archivo a 4 GiB?",
     "a": "**FAT32**."
    }
   ]
  },
  "39": {
   "ideas": [
    "**OSI = 7 capas** (1 Física, 2 Enlace, 3 Red, 4 Transporte, 5 Sesión, 6 Presentación, 7 Aplicación). **IPv4 = 32 bits; IPv6 = 128 bits.**",
    "**X.200, 6.1.2:** el modelo de referencia OSI tiene **siete capas**: aplicación, presentación, sesión, transporte, red, enlace de datos y física."
   ],
   "trampas": [
    "Las direcciones **10.x.x.x, 172.16-31.x.x y 192.168.x.x** son **privadas**. En DHCP, el cliente **descubre** (DISCOVER) y el servidor **ofrece** (OFFER)."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos bits tiene una dirección IPv6?",
     "a": "**128 bits** (RFC 8200)."
    }
   ]
  },
  "40": {
   "ideas": [
    "**Control judicial previo:** las medidas del CNI que afecten al domicilio o a las comunicaciones requieren autorización de un **Magistrado del Tribunal Supremo**, que resuelve en **72 horas** (24 con urgencia).",
    "**Art. 3 Ley 11/2002:** el Gobierno aprueba **anualmente** los objetivos del CNI mediante la **Directiva de Inteligencia**, de **carácter secreto**."
   ],
   "trampas": [
    "**Deep Web ≠ Dark Web**: la Dark Web es solo una **sección más reducida** de la Deep Web."
   ],
   "preguntas": [
    {
     "q": "¿Quién autoriza las medidas del CNI que afecten a la inviolabilidad del domicilio o al secreto de las comunicaciones?",
     "a": "un **Magistrado del Tribunal Supremo** (LO 2/2002)."
    }
   ]
  },
  "41": {
   "ideas": [
    "**Malware** = software malicioso (virus, gusanos, troyanos, backdoors, spyware). **Ransomware** = cifra la información y exige un **rescate** por la contraseña de descifrado.",
    "**Phishing** = estafa telemática para obtener **información confidencial**. **Pharming** = manipula el **DNS** para llevar al usuario a una **web falsa**."
   ],
   "trampas": [
    "**Virus ≠ gusano:** el virus necesita **acción humana**; el gusano se propaga **solo**. **DoS** = un ataque que satura; **DDoS** = saturación **distribuida y coordinada** desde varios equipos (a menudo una botnet)."
   ],
   "preguntas": [
    {
     "q": "El malware que cifra los archivos y pide un rescate por la clave de descifrado se denomina…",
     "a": "**ransomware**."
    }
   ]
  },
  "42": {
   "ideas": [
    "**Art. 3 RD 137/1993:** 1.ª = armas de fuego **cortas**; 2.ª = largas de guardería y **rayadas de caza mayor**; 3.ª = deportivas, **escopetas** y aire comprimido de más de **24,2 julios**.",
    "**Art. 4 RD 137/1993:** están prohibidas las armas de fabricación ilícita, los **puñales** (hoja menor de 11 cm, dos filos y puntiaguda), las **navajas automáticas** y los bastones-estoque."
   ],
   "trampas": [
    "El corte entre **corta y larga** es **30 cm de cañón** o **60 cm de longitud total**. Las armas **antiguas** son las de modelo o año de fabricación **anterior al 1 de enero de 1890**."
   ],
   "preguntas": [
    {
     "q": "Las pistolas y revólveres pertenecen a la categoría…",
     "a": "**1.ª** (art. 3 RD 137/1993)."
    }
   ]
  },
  "43": {
   "ideas": [
    "**Art. 68.2 RGC:** son prioritarios los vehículos de **policía, extinción de incendios, protección civil y salvamento y asistencia sanitaria** en servicio urgente, que se anuncian con **luz y sonido** a la vez.",
    "**Art. 69 RGC:** los demás conductores facilitan el paso al vehículo prioritario, **apartándose normalmente a su derecha** o deteniéndose si es preciso."
   ],
   "trampas": [
    "El conductor prioritario puede saltarse normas **bajo su exclusiva responsabilidad**, pero **nunca las órdenes y señales de los agentes**. Y debe **cerciorarse** de que no pone en peligro a nadie."
   ],
   "preguntas": [
    {
     "q": "Los conductores de vehículos prioritarios pueden dejar de cumplir las normas de los títulos II, III y IV, salvo…",
     "a": "**las órdenes y señales de los agentes** (art. 68.1)."
    }
   ]
  }
 },
 "gc": {
  "1": {
   "ideas": [
    "La Organización se basa en el principio de la **igualdad soberana** de todos sus Miembros (art. 2.1)."
   ],
   "trampas": [
    "Suspende la **Asamblea General**, pero **restituye** los derechos el **Consejo de Seguridad** (art. 5). Ojo: el Consejo de Derechos Humanos **no** es órgano principal de la Carta."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos órganos principales establece el art. 7 de la Carta de las Naciones Unidas?",
     "opts": [
      "4",
      "5",
      "6",
      "7"
     ],
     "ok": 2,
     "src": "art. 7.1"
    },
    {
     "q": "Los miembros no permanentes del Consejo de Seguridad se eligen por un periodo de:",
     "opts": [
      "1 año",
      "2 años",
      "3 años",
      "5 años"
     ],
     "ok": 1,
     "src": "art. 23.2"
    },
    {
     "q": "¿Cuántos miembros tiene el Consejo Económico y Social?",
     "opts": [
      "15",
      "27",
      "54",
      "193"
     ],
     "ok": 2,
     "src": "art. 61.1"
    },
    {
     "q": "¿Qué artículo de la DUDH reconoce el derecho a buscar asilo en caso de persecución?",
     "opts": [
      "9",
      "13",
      "14",
      "15"
     ],
     "ok": 2,
     "src": "art. 14.1 DUDH"
    },
    {
     "q": "¿Cuál de estos artículos del CEDH NO puede derogarse en caso de guerra?",
     "opts": [
      "Art. 8",
      "Art. 10",
      "Art. 3",
      "Art. 11"
     ],
     "ok": 2,
     "src": "art. 15.2 CEDH"
    },
    {
     "q": "¿Cuántos jueces forman la Gran Sala del TEDH?",
     "opts": [
      "7",
      "9",
      "15",
      "17"
     ],
     "ok": 3,
     "src": "art. 26.1 CEDH"
    },
    {
     "q": "Según la Carta Social Europea (revisada), el descanso total por maternidad será como mínimo de:",
     "opts": [
      "12 semanas",
      "14 semanas",
      "16 semanas",
      "18 semanas"
     ],
     "ok": 1,
     "src": "art. 8.1"
    },
    {
     "q": "¿Cuántos miembros tiene el Comité de Derechos Humanos del PIDCP?",
     "opts": [
      "10",
      "15",
      "18",
      "47"
     ],
     "ok": 2,
     "src": "art. 28.1 PIDCP"
    },
    {
     "q": "Según el PIDESC, la enseñanza primaria debe ser:",
     "opts": [
      "Obligatoria y gratuita",
      "Voluntaria y gratuita",
      "Obligatoria y progresivamente gratuita",
      "Gratuita solo para nacionales"
     ],
     "ok": 0,
     "src": "art. 13.2.a"
    },
    {
     "q": "¿Cuántos Estados integran el Consejo de Derechos Humanos?",
     "opts": [
      "15",
      "18",
      "47",
      "54"
     ],
     "ok": 2,
     "src": "Res. 60/251, pár. 7"
    },
    {
     "q": "¿Puede usarse como prueba una declaración obtenida mediante tortura?",
     "opts": [
      "Sí, si la confirma el juez",
      "No, salvo contra el acusado de tortura como prueba de que se hizo",
      "Sí, en terrorismo",
      "Solo con abogado"
     ],
     "ok": 1,
     "src": "art. 15"
    },
    {
     "q": "¿Quién preside el Consejo Asesor del Mecanismo Nacional de Prevención de la Tortura?",
     "opts": [
      "El Defensor del Pueblo",
      "El Adjunto en quien se delegan las funciones del MNP",
      "El Secretario General",
      "Un Vocal elegido"
     ],
     "ok": 1,
     "src": "art. 19.3 RDP"
    }
   ]
  },
  "2": {
   "ideas": [
    "La igualdad de trato y de oportunidades es un **principio informador del ordenamiento jurídico** (art. 4)."
   ],
   "trampas": [
    "Acoso **sexual** = conducta de **naturaleza sexual**. Acoso **por razón de sexo** = conducta **en función del sexo**, sin contenido sexual. La discriminación **indirecta** parte de un criterio **aparentemente neutro**."
   ],
   "preguntas": [
    {
     "q": "Una disposición aparentemente neutra que pone a personas de un sexo en desventaja particular constituye:",
     "opts": [
      "Discriminación directa",
      "Discriminación indirecta",
      "Acoso por razón de sexo",
      "Acción positiva"
     ],
     "ok": 1,
     "src": "art. 6.2"
    },
    {
     "q": "La inversión de la carga de la prueba del art. 13 de la LO 3/2007 NO se aplica a los procesos:",
     "opts": [
      "Civiles",
      "Laborales",
      "Contencioso-administrativos",
      "Penales"
     ],
     "ok": 3,
     "src": "art. 13.2"
    },
    {
     "q": "La publicidad que comporte una conducta discriminatoria según la LO 3/2007 se considera:",
     "opts": [
      "Publicidad engañosa",
      "Publicidad ilícita",
      "Publicidad desleal",
      "Infracción leve"
     ],
     "ok": 1,
     "src": "art. 41"
    },
    {
     "q": "¿A partir de cuántos trabajadores es obligatorio el plan de igualdad?",
     "opts": [
      "25",
      "50",
      "100",
      "250"
     ],
     "ok": 1,
     "src": "art. 45.2"
    },
    {
     "q": "¿Qué porcentaje mínimo de plazas se reserva a las empleadas públicas en los cursos de formación para el acceso a puestos directivos de la AGE?",
     "opts": [
      "25 %",
      "30 %",
      "40 %",
      "50 %"
     ],
     "ok": 2,
     "src": "art. 60.2"
    },
    {
     "q": "El órgano colegiado de consulta y asesoramiento que sirve de cauce para la participación de las mujeres es:",
     "opts": [
      "La Comisión Interministerial de Igualdad",
      "Las Unidades de Igualdad",
      "El Consejo de Participación de la Mujer",
      "El Instituto de la Mujer"
     ],
     "ok": 2,
     "src": "art. 78.1"
    }
   ]
  },
  "3": {
   "ideas": [
    "Las normas laborales de la Ley 31/1995 son **Derecho necesario mínimo indisponible**, mejorables por convenio colectivo (art. 2.2)."
   ],
   "trampas": [
    "La exclusión de la Guardia Civil es solo de sus **actividades militares** y de las de policía cuyas particularidades lo impidan; en lo demás se aplica la normativa general (RD 179/2005)."
   ],
   "preguntas": [
    {
     "q": "Para calificar la gravedad de un riesgo laboral se valoran conjuntamente:",
     "opts": [
      "Coste y duración",
      "Probabilidad y severidad del daño",
      "Frecuencia y número de trabajadores",
      "Tipo de actividad y sector"
     ],
     "ok": 1,
     "src": "art. 4.2.º"
    },
    {
     "q": "El órgano científico técnico especializado de la AGE en seguridad y salud en el trabajo es:",
     "opts": [
      "La Inspección de Trabajo",
      "El Instituto Nacional de Seguridad e Higiene en el Trabajo",
      "La Comisión Nacional de Seguridad y Salud",
      "El Comité de Seguridad y Salud"
     ],
     "ok": 1,
     "src": "art. 8.1"
    },
    {
     "q": "Según el art. 15 de la Ley 31/1995, ¿qué protección debe anteponerse?",
     "opts": [
      "La individual a la colectiva",
      "La colectiva a la individual",
      "La de los trabajadores especialmente sensibles",
      "La de los menores"
     ],
     "ok": 1,
     "src": "art. 15.1.h"
    },
    {
     "q": "La paralización de trabajos ordenada por la Inspección de Trabajo puede impugnarse ante la autoridad laboral en el plazo de:",
     "opts": [
      "24 horas",
      "3 días hábiles",
      "10 días",
      "1 mes"
     ],
     "ok": 1,
     "src": "art. 44.1"
    },
    {
     "q": "¿Cuántas especialidades preventivas debe tener como mínimo un servicio de prevención propio en la AGE?",
     "opts": [
      "Una",
      "Dos",
      "Tres",
      "Cuatro"
     ],
     "ok": 1,
     "src": "art. 7.3 RD 67/2010"
    },
    {
     "q": "¿Cuál de estos NO es un órgano de prevención de la Guardia Civil según el RD 179/2005?",
     "opts": [
      "Servicio de Prevención",
      "Sección de Prevención de Zona",
      "Oficina de Prevención de Comandancia",
      "Comité de Seguridad y Salud de Puesto"
     ],
     "ok": 3,
     "src": "art. 13.2"
    }
   ]
  },
  "4": {
   "ideas": [
    "La soberanía es **nacional** y reside en el **pueblo español**; la forma política es la **Monarquía parlamentaria**."
   ],
   "trampas": [
    "Los valores superiores son **4** (libertad, justicia, igualdad, pluralismo político): la **dignidad** no es valor superior (es fundamento, art. 10)."
   ],
   "preguntas": [
    {
     "q": "¿Qué NO es valor superior según el art. 1.1 CE?",
     "opts": [
      "Justicia",
      "Pluralismo político",
      "Seguridad jurídica",
      "Igualdad"
     ],
     "ok": 2,
     "src": "art. 1.1 CE"
    },
    {
     "q": "La interdicción de la arbitrariedad de los poderes públicos se garantiza en el art.:",
     "opts": [
      "9.1",
      "9.2",
      "9.3",
      "103"
     ],
     "ok": 2,
     "src": "art. 9.3 CE"
    },
    {
     "q": "Los extranjeros podrán tener sufragio pasivo en:",
     "opts": [
      "Generales",
      "Autonómicas",
      "Municipales",
      "Europeas solo"
     ],
     "ok": 2,
     "src": "art. 13.2 CE"
    },
    {
     "q": "El plazo máximo de la detención preventiva es:",
     "opts": [
      "24 h",
      "48 h",
      "72 h",
      "5 días"
     ],
     "ok": 2,
     "src": "art. 17.2 CE"
    },
    {
     "q": "El secuestro de publicaciones solo puede acordarse:",
     "opts": [
      "Por el Gobierno",
      "Por resolución judicial",
      "Por el Ministerio Fiscal",
      "Por ley"
     ],
     "ok": 1,
     "src": "art. 20.5 CE"
    },
    {
     "q": "Los miembros de Institutos armados pueden ejercer el derecho de petición:",
     "opts": [
      "Colectivamente",
      "Solo individualmente",
      "No pueden",
      "Con autorización"
     ],
     "ok": 1,
     "src": "art. 29.2 CE"
    },
    {
     "q": "El deber de trabajar se recoge en el art.:",
     "opts": [
      "31",
      "35",
      "37",
      "40"
     ],
     "ok": 1,
     "src": "art. 35.1 CE"
    },
    {
     "q": "El derecho a una vivienda digna se encuentra en:",
     "opts": [
      "Secc. 1.ª Cap. II",
      "Secc. 2.ª Cap. II",
      "Cap. III",
      "Cap. IV"
     ],
     "ok": 2,
     "src": "art. 47 CE"
    },
    {
     "q": "¿Qué derecho NO puede suspenderse en estado de excepción?",
     "opts": [
      "17.2",
      "17.3",
      "19",
      "21"
     ],
     "ok": 1,
     "src": "art. 55.1 CE"
    },
    {
     "q": "La Regencia nombrada por las Cortes se compone de:",
     "opts": [
      "1 o 3",
      "3 o 5",
      "1, 3 o 5",
      "2 o 4"
     ],
     "ok": 2,
     "src": "art. 59.3 CE"
    },
    {
     "q": "¿Quién refrenda el nombramiento del Presidente del Gobierno?",
     "opts": [
      "El propio Presidente",
      "El Presidente del Congreso",
      "El del Senado",
      "Ningún refrendo"
     ],
     "ok": 1,
     "src": "art. 64.1 CE"
    },
    {
     "q": "El Congreso electo debe ser convocado dentro de los:",
     "opts": [
      "15 días",
      "25 días",
      "30 días",
      "60 días siguientes a las elecciones"
     ],
     "ok": 1,
     "src": "art. 68.6 CE"
    }
   ]
  },
  "5": {
   "ideas": [
    "El **TUE** y el **TFUE** tienen el **mismo valor jurídico**, y la Carta de Derechos Fundamentales también (arts. 1 y 6 TUE)."
   ],
   "trampas": [
    "La ciudadanía de la Unión **se añade** a la nacional, **no la sustituye**. Para el «riesgo claro» basta el Consejo por **4/5**; para la «violación grave y persistente», **unanimidad** del Consejo Europeo."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos ciudadanos de la Unión se requieren como mínimo para la iniciativa ciudadana europea?",
     "opts": [
      "500.000",
      "1 millón",
      "2 millones",
      "100.000"
     ],
     "ok": 1,
     "src": "art. 11.4 TUE"
    },
    {
     "q": "¿Cuál es el número máximo de escaños por Estado en el Parlamento Europeo?",
     "opts": [
      "72",
      "96",
      "99",
      "150"
     ],
     "ok": 1,
     "src": "art. 14.2 TUE"
    },
    {
     "q": "¿Cuántos Estados miembros deben participar como mínimo en una cooperación reforzada?",
     "opts": [
      "5",
      "7",
      "9",
      "14"
     ],
     "ok": 2,
     "src": "art. 20.2 TUE"
    },
    {
     "q": "¿Cuál de estas es competencia exclusiva de la Unión?",
     "opts": [
      "Medio ambiente",
      "Unión aduanera",
      "Protección civil",
      "Transportes"
     ],
     "ok": 1,
     "src": "art. 3.1.a TFUE"
    },
    {
     "q": "La unión aduanera implica entre los Estados miembros:",
     "opts": [
      "Un arancel por Estado",
      "La prohibición de derechos de aduana y exacciones de efecto equivalente",
      "Controles fronterizos de mercancías",
      "Cupos de importación"
     ],
     "ok": 1,
     "src": "art. 28.1 TFUE"
    },
    {
     "q": "La aplicación de medidas coercitivas en una actividad operativa de Europol corresponde a:",
     "opts": [
      "Europol",
      "Eurojust",
      "Exclusivamente las autoridades nacionales competentes",
      "La Comisión"
     ],
     "ok": 2,
     "src": "art. 88.3 TFUE"
    },
    {
     "q": "¿Qué principio NO figura en el art. 191 TFUE sobre medio ambiente?",
     "opts": [
      "Cautela",
      "Quien contamina paga",
      "Acción preventiva",
      "Reciprocidad"
     ],
     "ok": 3,
     "src": "art. 191.2 TFUE"
    },
    {
     "q": "¿En qué plazo debe interponerse el recurso de anulación ante el TJUE?",
     "opts": [
      "1 mes",
      "2 meses",
      "3 meses",
      "6 meses"
     ],
     "ok": 1,
     "src": "art. 263 TFUE"
    },
    {
     "q": "¿Qué acto de la Unión obliga al Estado destinatario en cuanto al resultado, dejándole elegir la forma y los medios?",
     "opts": [
      "Reglamento",
      "Directiva",
      "Decisión",
      "Dictamen"
     ],
     "ok": 1,
     "src": "art. 288 TFUE"
    }
   ]
  },
  "6": {
   "ideas": [
    "Los **6 órganos principales** de la ONU están en el **art. 7** de la Carta; el **Consejo de Seguridad** tiene la responsabilidad primordial de la paz."
   ],
   "trampas": [
    "El Secretario General lo **nombra la Asamblea General**, pero a **recomendación del Consejo de Seguridad**. La CIJ tiene sede en **La Haya**, no en Nueva York."
   ],
   "preguntas": [
    {
     "q": "¿Cuántos miembros tiene el Consejo Económico y Social?",
     "opts": [
      "15",
      "27",
      "54",
      "193"
     ],
     "ok": 2,
     "src": "art. 61 de la Carta"
    },
    {
     "q": "¿Dónde tiene su sede el Consejo de Europa?",
     "opts": [
      "Bruselas",
      "Luxemburgo",
      "Estrasburgo",
      "La Haya"
     ],
     "ok": 2,
     "src": "art. 11 del Estatuto"
    },
    {
     "q": "¿Ante quién notifica un Estado su intención de retirarse de la Unión?",
     "opts": [
      "Comisión",
      "Consejo Europeo",
      "Parlamento Europeo",
      "Tribunal de Justicia"
     ],
     "ok": 1,
     "src": "art. 50.2 TUE"
    },
    {
     "q": "¿Qué artículo del Tratado del Atlántico Norte recoge la defensa colectiva?",
     "opts": [
      "3",
      "4",
      "5",
      "10"
     ],
     "ok": 2,
     "src": ""
    },
    {
     "q": "¿Por cuántos años se nombra al Secretario General de INTERPOL?",
     "opts": [
      "3",
      "4",
      "5",
      "6"
     ],
     "ok": 2,
     "src": "art. 28 del Estatuto"
    },
    {
     "q": "¿Cuál es el único órgano de enlace entre Europol y las autoridades de cada Estado?",
     "opts": [
      "La OCN",
      "La unidad nacional",
      "El miembro nacional",
      "El oficial de enlace"
     ],
     "ok": 1,
     "src": "art. 7 Reglamento 2016/794"
    },
    {
     "q": "¿Dónde tiene su sede CEPOL?",
     "opts": [
      "Varsovia",
      "La Haya",
      "Budapest",
      "Lisboa"
     ],
     "ok": 2,
     "src": "art. 25 Reglamento 2015/2219"
    },
    {
     "q": "¿Cuántos miembros tiene el Consejo Ejecutivo de la OMS?",
     "opts": [
      "24",
      "34",
      "49",
      "54"
     ],
     "ok": 1,
     "src": "art. 24 de la Constitución de la OMS"
    }
   ]
  },
  "7": {
   "ideas": [
    "Orden de aplicación: **1.º ley**, **2.º costumbre** (probada), **3.º principios generales del derecho**."
   ],
   "trampas": [
    "La **jurisprudencia NO es fuente**: **complementa** el ordenamiento. Y la **vacatio legis** general es de **20 días**, no de 15."
   ],
   "preguntas": [
    {
     "q": "Salvo que dispongan otra cosa, las leyes entran en vigor a los:",
     "opts": [
      "15 días",
      "20 días",
      "1 mes",
      "3 meses de su publicación"
     ],
     "ok": 1,
     "src": "art. 2.1 CC"
    },
    {
     "q": "¿En cuál NO cabe la aplicación analógica?",
     "opts": [
      "Leyes civiles",
      "Leyes penales",
      "Normas mercantiles",
      "Reglamentos"
     ],
     "ok": 1,
     "src": "art. 4.2 CC"
    },
    {
     "q": "Las leyes penales, de policía y de seguridad pública obligan a:",
     "opts": [
      "Los españoles",
      "Los residentes",
      "Todos los que se hallen en territorio español",
      "Los nacionales y extranjeros residentes"
     ],
     "ok": 2,
     "src": "art. 8.1 CC"
    },
    {
     "q": "La vecindad civil se adquiere sin declaración por residencia continuada de:",
     "opts": [
      "2 años",
      "5 años",
      "10 años",
      "15 años"
     ],
     "ok": 2,
     "src": "art. 14.5 CC"
    },
    {
     "q": "La consolidación de la nacionalidad exige posesión y utilización continuada durante:",
     "opts": [
      "5 años",
      "10 años",
      "15 años",
      "2 años"
     ],
     "ok": 1,
     "src": "art. 18 CC"
    },
    {
     "q": "El casado con español puede obtener la nacionalidad con una residencia de:",
     "opts": [
      "6 meses",
      "1 año",
      "2 años",
      "5 años"
     ],
     "ok": 1,
     "src": "art. 22.2.d CC"
    },
    {
     "q": "La acción de nulidad por fraude en la adquisición de la nacionalidad prescribe a los:",
     "opts": [
      "5 años",
      "10 años",
      "15 años",
      "20 años"
     ],
     "ok": 2,
     "src": "art. 25.2 CC"
    },
    {
     "q": "El domicilio de las personas naturales es:",
     "opts": [
      "El de empadronamiento",
      "El de su residencia habitual",
      "El fiscal",
      "El de nacimiento"
     ],
     "ok": 1,
     "src": "art. 40 CC"
    },
    {
     "q": "¿Qué impedimento puede dispensar el Juez?",
     "opts": [
      "Línea recta",
      "Vínculo matrimonial",
      "Colaterales de tercer grado",
      "Menor no emancipado"
     ],
     "ok": 2,
     "src": "art. 48 CC"
    },
    {
     "q": "La acción de nulidad por miedo grave caduca si los cónyuges conviven tras cesar el miedo durante:",
     "opts": [
      "3 meses",
      "6 meses",
      "1 año",
      "2 años"
     ],
     "ok": 2,
     "src": "art. 76 CC"
    },
    {
     "q": "El adoptante debe ser mayor de:",
     "opts": [
      "18 años",
      "21 años",
      "25 años",
      "30 años"
     ],
     "ok": 2,
     "src": "art. 175.1 CC"
    },
    {
     "q": "Si varios están obligados a dar alimentos, se reclamarán en primer lugar a:",
     "opts": [
      "Los ascendientes",
      "Los descendientes",
      "El cónyuge",
      "Los hermanos"
     ],
     "ok": 2,
     "src": "art. 144 CC"
    }
   ]
  },
  "8": {
   "ideas": [
    "**Nullum crimen, nulla poena sine lege**: delito y pena deben estar en una **ley anterior** (arts. 1 y 2)."
   ],
   "trampas": [
    "La ley penal **favorable** es retroactiva incluso con **sentencia firme**; los hechos bajo una **ley temporal** se juzgan conforme a ella."
   ],
   "preguntas": [
    {
     "q": "Para la ley penal aplicable en el tiempo, el delito se entiende cometido:",
     "opts": [
      "Al producirse el resultado",
      "Al ejecutar la acción u omitir el acto debido",
      "Al denunciarse",
      "Al juzgarse"
     ],
     "ok": 1,
     "src": "art. 7 CP"
    },
    {
     "q": "El error vencible sobre la ilicitud del hecho conlleva:",
     "opts": [
      "Exención",
      "Pena inferior en 1 o 2 grados",
      "Imprudencia",
      "Atenuante"
     ],
     "ok": 1,
     "src": "art. 14.3 CP"
    },
    {
     "q": "¿Cuál NO es requisito de la legítima defensa?",
     "opts": [
      "Agresión ilegítima",
      "Necesidad racional del medio",
      "Falta de provocación suficiente",
      "Que el mal causado no sea mayor"
     ],
     "ok": 3,
     "src": "art. 20.4.º CP"
    },
    {
     "q": "Prevalerse del carácter público que tenga el culpable es:",
     "opts": [
      "Atenuante",
      "Agravante",
      "Eximente",
      "Mixta"
     ],
     "ok": 1,
     "src": "art. 22.7.ª CP"
    },
    {
     "q": "Según el art. 24 CP, tienen siempre la consideración de autoridad:",
     "opts": [
      "Los guardias civiles",
      "Los miembros del Ministerio Fiscal",
      "Los funcionarios de prisiones",
      "Los policías locales"
     ],
     "ok": 1,
     "src": "art. 24.1 CP"
    },
    {
     "q": "Quien coopera a la ejecución con un acto sin el cual no se habría efectuado es:",
     "opts": [
      "Cómplice",
      "Encubridor",
      "Autor",
      "Inductor"
     ],
     "ok": 2,
     "src": "art. 28.b CP"
    },
    {
     "q": "¿Cuál es una medida de seguridad privativa de libertad?",
     "opts": [
      "Libertad vigilada",
      "Custodia familiar",
      "Internamiento en centro de deshabituación",
      "Expulsión"
     ],
     "ok": 2,
     "src": "art. 96.2 CP"
    },
    {
     "q": "El agente de la autoridad que, requerido, no presta el auxilio debido a la Justicia será castigado con suspensión de:",
     "opts": [
      "6 meses a 2 años",
      "1 a 3 años",
      "2 a 3 años",
      "3 a 5 años"
     ],
     "ok": 2,
     "src": "art. 412.2 CP"
    },
    {
     "q": "El funcionario que recibe dádiva para realizar un acto contrario a sus deberes será castigado con prisión de:",
     "opts": [
      "6 meses a 1 año",
      "2 a 4 años",
      "3 a 6 años",
      "4 a 8 años"
     ],
     "ok": 2,
     "src": "art. 419 CP"
    },
    {
     "q": "Las autoridades que no hayan resistido la rebelión serán castigadas con inhabilitación absoluta de:",
     "opts": [
      "6 a 12 años",
      "10 a 15 años",
      "12 a 20 años",
      "15 a 25 años"
     ],
     "ok": 2,
     "src": "art. 482 CP"
    },
    {
     "q": "Invadir con fuerza la sede del Congreso estando reunido se castiga con prisión de:",
     "opts": [
      "1 a 3 años",
      "2 a 4 años",
      "3 a 5 años",
      "5 a 10 años"
     ],
     "ok": 2,
     "src": "art. 493 CP"
    },
    {
     "q": "¿Cuál NO es asociación ilícita según el art. 515?",
     "opts": [
      "Paramilitares",
      "Las que promuevan delitos",
      "Las no inscritas en el registro",
      "Las que inciten al odio"
     ],
     "ok": 2,
     "src": "art. 515 CP"
    }
   ]
  },
  "9": {
   "ideas": [
    "El habeas corpus busca la **inmediata puesta a disposición judicial** del detenido ilegalmente y se resuelve en **24 horas**."
   ],
   "trampas": [
    "El auto que incoa o deniega el procedimiento **no admite recurso**; y para pedirlo **no hace falta abogado ni procurador**."
   ],
   "preguntas": [
    {
     "q": "El Juez debe resolver el habeas corpus en el plazo de:",
     "opts": [
      "12 h",
      "24 h",
      "48 h",
      "72 h desde el auto de incoación"
     ],
     "ok": 1,
     "src": "art. 7 LO 6/1984"
    },
    {
     "q": "Constituyen la Policía Judicial en sentido estricto las Unidades Orgánicas integradas por:",
     "opts": [
      "Todas las FCS",
      "CNP y Guardia Civil",
      "Solo CNP",
      "Policías autonómicas"
     ],
     "ok": 1,
     "src": "art. 7 RD 769/1987"
    },
    {
     "q": "Las Comisiones Provinciales de Coordinación de la Policía Judicial se reúnen:",
     "opts": [
      "Semanalmente",
      "Mensualmente",
      "Trimestralmente",
      "Semestralmente"
     ],
     "ok": 1,
     "src": "art. 38 RD 769/1987"
    },
    {
     "q": "¿Pueden encomendarse a las unidades de Policía Judicial funciones ajenas a la policía judicial?",
     "opts": [
      "Sí, si lo ordena el Gobierno",
      "Sí, en urgencias",
      "En ningún caso",
      "Solo el Fiscal"
     ],
     "ok": 2,
     "src": "art. 549.2 LOPJ"
    },
    {
     "q": "¿Quién NO está obligado a denunciar según el art. 261 LECrim?",
     "opts": [
      "Un primo del delincuente",
      "Su hermano",
      "Un vecino que lo presencia",
      "Un médico que lo conoce por su oficio"
     ],
     "ok": 1,
     "src": "art. 261 LECrim"
    },
    {
     "q": "Los atestados de la Policía Judicial se considerarán a efectos legales:",
     "opts": [
      "Prueba plena",
      "Denuncias",
      "Querellas",
      "Documentos públicos"
     ],
     "ok": 1,
     "src": "art. 297 LECrim"
    },
    {
     "q": "Por la presunta comisión de un delito leve:",
     "opts": [
      "Siempre se puede detener",
      "Nunca",
      "Solo si no tiene domicilio conocido ni da fianza bastante",
      "Solo con orden judicial"
     ],
     "ok": 2,
     "src": "art. 495 LECrim"
    },
    {
     "q": "El abogado designado debe acudir al centro de detención en un plazo máximo de:",
     "opts": [
      "1 hora",
      "3 horas",
      "8 horas",
      "24 horas desde el encargo"
     ],
     "ok": 1,
     "src": "art. 520.5 LECrim"
    },
    {
     "q": "Si el interesado no está ni hay familiar, el registro se practicará en presencia de:",
     "opts": [
      "Un agente más",
      "Dos testigos vecinos del mismo pueblo",
      "El Fiscal",
      "Un notario"
     ],
     "ok": 1,
     "src": "art. 569 LECrim"
    },
    {
     "q": "¿En qué supuestos está vedada la mediación según el art. 3 de la Ley 4/2015?",
     "opts": [
      "Delitos leves",
      "Violencia sexual y de género",
      "Delitos contra el patrimonio",
      "Menores"
     ],
     "ok": 1,
     "src": "art. 3.1"
    },
    {
     "q": "¿Qué requisito exige el art. 15 para la justicia restaurativa?",
     "opts": [
      "Que el delito sea leve",
      "Que el infractor haya reconocido los hechos esenciales",
      "Que lo acuerde el Fiscal",
      "Sentencia firme"
     ],
     "ok": 1,
     "src": "art. 15.1.a"
    },
    {
     "q": "¿Exige el acceso a los servicios de apoyo de las Oficinas de Asistencia a las Víctimas haber denunciado antes?",
     "opts": [
      "Sí, siempre",
      "No",
      "Solo en delitos graves",
      "Solo para extranjeros"
     ],
     "ok": 1,
     "src": "art. 28.3"
    }
   ]
  },
  "10": {
   "ideas": [
    "Son interesados quienes promueven el procedimiento, quienes tienen **derechos** afectados y quienes tienen **intereses legítimos** afectados y **se personan** (art. 4)."
   ],
   "trampas": [
    "Quien solo tiene un **interés legítimo** no es interesado hasta que **se persona** en el procedimiento. La falta de acreditación de la representación se subsana en **10 días**."
   ],
   "preguntas": [
    {
     "q": "¿Cuál es la validez máxima de los poderes inscritos en el registro electrónico de apoderamientos?",
     "opts": [
      "2 años",
      "3 años",
      "5 años",
      "Indefinida"
     ],
     "ok": 2,
     "src": "art. 6.6"
    },
    {
     "q": "Cuando la norma reguladora no fije el plazo máximo para resolver, este será de:",
     "opts": [
      "1 mes",
      "3 meses",
      "6 meses",
      "1 año"
     ],
     "ok": 1,
     "src": "art. 21.3"
    },
    {
     "q": "Cuando los plazos se señalan por días, se excluyen del cómputo:",
     "opts": [
      "Solo los domingos y festivos",
      "Los sábados, domingos y festivos",
      "Ningún día",
      "Solo los festivos"
     ],
     "ok": 1,
     "src": "art. 30.2"
    },
    {
     "q": "La notificación electrónica se entiende rechazada si no se accede a su contenido en:",
     "opts": [
      "5 días hábiles",
      "10 días naturales",
      "10 días hábiles",
      "15 días"
     ],
     "ok": 1,
     "src": "art. 43.2"
    },
    {
     "q": "El plazo del trámite de audiencia a los interesados será:",
     "opts": [
      "No inferior a 5 ni superior a 10 días",
      "No inferior a 10 ni superior a 15 días",
      "20 días",
      "1 mes"
     ],
     "ok": 1,
     "src": "art. 82.2"
    },
    {
     "q": "El plazo máximo para dictar y notificar la resolución del recurso de alzada es de:",
     "opts": [
      "1 mes",
      "2 meses",
      "3 meses",
      "6 meses"
     ],
     "ok": 2,
     "src": "art. 122.2"
    },
    {
     "q": "¿Quién preside la Comisión General de Secretarios de Estado y Subsecretarios?",
     "opts": [
      "El Presidente del Gobierno",
      "Un Vicepresidente o, en su defecto, el Ministro de la Presidencia",
      "El Ministro de Hacienda",
      "El Secretario de Estado más antiguo"
     ],
     "ok": 1,
     "src": "art. 8.2 Ley 50/1997"
    },
    {
     "q": "¿Cuál de estas competencias NO puede delegarse según el art. 9 de la Ley 40/2015?",
     "opts": [
      "La firma de oficios",
      "La adopción de disposiciones de carácter general",
      "La gestión de expedientes",
      "La tramitación de subvenciones"
     ],
     "ok": 1,
     "src": "art. 9.2.b"
    },
    {
     "q": "Si la ley no fija plazos, las infracciones graves prescriben a:",
     "opts": [
      "6 meses",
      "1 año",
      "2 años",
      "3 años"
     ],
     "ok": 2,
     "src": "art. 30.1"
    },
    {
     "q": "¿Qué rango tienen los Delegados del Gobierno en las Comunidades Autónomas?",
     "opts": [
      "Secretario de Estado",
      "Subsecretario",
      "Director general",
      "Subdirector general"
     ],
     "ok": 1,
     "src": "art. 55.4"
    },
    {
     "q": "¿Quién preside la Conferencia de Presidentes?",
     "opts": [
      "El Rey",
      "El Presidente del Gobierno",
      "El Presidente del Senado",
      "Rota entre las CCAA"
     ],
     "ok": 1,
     "src": "art. 146.1"
    }
   ]
  },
  "11": {
   "ideas": [
    "La LO 3/2018 adapta el ordenamiento al **RGPD** y desarrolla el derecho fundamental del **art. 18.4 CE** (art. 1)."
   ],
   "trampas": [
    "La ley **no se aplica** a los datos de fallecidos, **salvo** lo que dispone el art. 3. Aunque el fallecido lo prohíba, los herederos pueden acceder a los datos **patrimoniales**."
   ],
   "preguntas": [
    {
     "q": "La LO 3/2018 NO es de aplicación a los tratamientos:",
     "opts": [
      "Automatizados",
      "De ficheros manuales",
      "Sometidos a la normativa sobre materias clasificadas",
      "De empresas privadas"
     ],
     "ok": 2,
     "src": "art. 2.2.c"
    },
    {
     "q": "¿A partir de qué edad puede un menor consentir el tratamiento de sus datos?",
     "opts": [
      "12 años",
      "14 años",
      "16 años",
      "18 años"
     ],
     "ok": 1,
     "src": "art. 7.1"
    },
    {
     "q": "Se puede considerar repetitivo el derecho de acceso ejercido más de una vez en el plazo de:",
     "opts": [
      "1 mes",
      "3 meses",
      "6 meses",
      "1 año"
     ],
     "ok": 2,
     "src": "art. 13.3"
    },
    {
     "q": "¿En qué plazo máximo deben suprimirse las imágenes de videovigilancia, salvo que acrediten hechos ilícitos?",
     "opts": [
      "72 horas",
      "15 días",
      "1 mes",
      "3 meses"
     ],
     "ok": 2,
     "src": "art. 22.3"
    },
    {
     "q": "¿En qué plazo deben comunicarse a la AEPD los nombramientos y ceses de los delegados de protección de datos?",
     "opts": [
      "5 días",
      "10 días",
      "15 días",
      "1 mes"
     ],
     "ok": 1,
     "src": "art. 34.3"
    },
    {
     "q": "¿Cuál es la duración del mandato de la Presidencia de la AEPD?",
     "opts": [
      "4 años",
      "5 años",
      "6 años",
      "9 años"
     ],
     "ok": 1,
     "src": "art. 48.5"
    }
   ]
  },
  "12": {
   "ideas": [
    "Son extranjeros quienes **carezcan de la nacionalidad española**; los ciudadanos de la UE se rigen por el **régimen comunitario** (art. 1)."
   ],
   "trampas": [
    "La tarjeta de identidad de extranjero corresponde a estancias o autorizaciones de **más de 6 meses** y se pide en **1 mes**. Los diplomáticos están **excluidos** de la ley."
   ],
   "preguntas": [
    {
     "q": "¿En qué plazo debe solicitar personalmente la tarjeta de identidad de extranjero quien tenga un visado de más de seis meses?",
     "opts": [
      "15 días",
      "1 mes",
      "3 meses",
      "6 meses"
     ],
     "ok": 1,
     "src": "art. 4.2"
    },
    {
     "q": "Para ser reagrupables, los ascendientes en primer grado deben ser mayores de:",
     "opts": [
      "60 años",
      "65 años",
      "67 años",
      "70 años"
     ],
     "ok": 1,
     "src": "art. 17.1.d"
    },
    {
     "q": "La situación de estancia permite permanecer en España por un periodo no superior a:",
     "opts": [
      "30 días",
      "60 días",
      "90 días",
      "6 meses"
     ],
     "ok": 2,
     "src": "art. 30.1"
    },
    {
     "q": "Las infracciones graves de la LO 4/2000 se sancionan con multa de:",
     "opts": [
      "Hasta 500 €",
      "501 a 10.000 €",
      "10.001 a 100.000 €",
      "6.001 a 60.000 €"
     ],
     "ok": 1,
     "src": "art. 55.1.b"
    },
    {
     "q": "¿Cuál es la duración máxima del internamiento de un extranjero en un centro de internamiento?",
     "opts": [
      "40 días",
      "60 días",
      "72 horas",
      "90 días"
     ],
     "ok": 1,
     "src": "art. 62.2"
    },
    {
     "q": "¿Tras cuántos años de residencia legal continuada adquiere un ciudadano de la UE el derecho a residir con carácter permanente?",
     "opts": [
      "3 años",
      "5 años",
      "10 años",
      "2 años"
     ],
     "ok": 1,
     "src": "art. 10.1 RD 240/2007"
    }
   ]
  }
 }
};

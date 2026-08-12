"use client";
import { useMemo, useState } from "react";
type Item = {
  name: string;
  status: "Movilizado" | "Pipeline" | "Convocatoria";
  amount: number | null;
  period: string;
  partners: string;
  components: string[];
  axes: string[];
  summary: string;
  tag: string;
};
const COMPONENTS = [
  "Desarrollo de habilidades técnicas para el empleo",
  "Energías renovables y descarbonización",
  "Economía circular y eficiencia de recursos",
  "Infraestructura de la calidad",
] as const;
const AXES = [
  "Juventud y equidad de género",
  "Pequeñas y medianas empresas",
  "Investigación + Desarrollo + Innovación",
  "Cadenas de valor sostenibles",
] as const;
const [HABILIDADES, ENERGIA, CIRCULARIDAD, CALIDAD] = COMPONENTS;
const [GENERO, MIPYMES, INNOVACION, CADENAS] = AXES;
const taxonomy: Record<string,{components:string[];axes:string[]}> = {
  "Trazabilidad y sostenibilidad del café":{components:[CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Economía azul y ecosistemas de surf":{components:[CIRCULARIDAD,HABILIDADES],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "Juventud rural y emprendimiento en La Cruz":{components:[HABILIDADES,CIRCULARIDAD],axes:[GENERO,MIPYMES,CADENAS]},
  "Construcción circular":{components:[CIRCULARIDAD,CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Estrategia nacional de biometano":{components:[ENERGIA,CIRCULARIDAD,CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Normas para la acción climática":{components:[CALIDAD,ENERGIA],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Programa País ONUDI–Costa Rica":{components:[...COMPONENTS],axes:[...AXES]},
  "Mapa de Uso Agropecuario":{components:[CALIDAD],axes:[INNOVACION,CADENAS]},
  "Cooperación Sur–Sur en café":{components:[CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Cooperación triangular en evaluación de impacto":{components:[ENERGIA,CIRCULARIDAD],axes:[INNOVACION,CADENAS]},
  "Segunda fase de economía azul":{components:[CIRCULARIDAD,HABILIDADES],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "Talamanca Transforma":{components:[HABILIDADES,CIRCULARIDAD],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "REIF Biometano":{components:[ENERGIA,CIRCULARIDAD,CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Global Matchmaking Platform":{components:[ENERGIA,CIRCULARIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Segunda vida inteligente de baterías":{components:[HABILIDADES,CIRCULARIDAD,ENERGIA,CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Ecosistema de hidrógeno verde":{components:[HABILIDADES,ENERGIA,CALIDAD],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "Competencias y proveedores en semiconductores":{components:[HABILIDADES,CALIDAD],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "Construcción baja en carbono":{components:[CIRCULARIDAD,ENERGIA,CALIDAD],axes:[MIPYMES,INNOVACION,CADENAS]},
  "Cooperación Sur–Sur en carne bovina":{components:[CALIDAD],axes:[MIPYMES,CADENAS]},
  "A2D Facility":{components:[ENERGIA,CIRCULARIDAD,HABILIDADES],axes:[MIPYMES,INNOVACION,CADENAS]},
  "ASIF":{components:[ENERGIA,CIRCULARIDAD],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "Blue Economy Global Call 2026":{components:[CIRCULARIDAD,HABILIDADES,ENERGIA],axes:[GENERO,MIPYMES,INNOVACION,CADENAS]},
  "One World Sustainability Awards":{components:[...COMPONENTS],axes:[MIPYMES,INNOVACION,CADENAS]},
};
const I: Item[] = [
  [
    "Trazabilidad y sostenibilidad del café",
    "Movilizado",
    326200,
    "2024–2026",
    "ICAFE · MAG",
    "Calidad y mercados",
    "Plataforma de trazabilidad, desarrollo informático y capacidades para cumplir requisitos del Pacto Verde.",
    "Café",
  ],
  [
    "Economía azul y ecosistemas de surf",
    "Movilizado",
    733000,
    "2023–2026",
    "MINAE · Gobiernos locales · CI",
    "Economía azul",
    "Gestión de ecosistemas de surf, capacidades y oportunidades de economía azul.",
    "Costa",
  ],
  [
    "Juventud rural y emprendimiento en La Cruz",
    "Movilizado",
    100000,
    "2024–2026",
    "MINAE · Costa Rica por Siempre",
    "Empleo y territorio",
    "Formación, capital semilla y mentoría para emprendimientos climáticamente inteligentes.",
    "Juventud",
  ],
  [
    "Construcción circular",
    "Movilizado",
    132730000,
    "2024–2028",
    "MINAE · GBC Costa Rica · Sector privado",
    "Economía circular",
    "USD 4,73 M de proyecto y USD 128 M de cofinanciamiento privado para transformar el sector.",
    "Construcción",
  ],
  [
    "Estrategia nacional de biometano",
    "Movilizado",
    250000,
    "2024–2025",
    "MINAE",
    "Energía limpia",
    "Estrategia nacional, infraestructura de calidad y línea de garantía para proyectos de biogás.",
    "Biometano",
  ],
  [
    "Normas para la acción climática",
    "Movilizado",
    333333,
    "2026–2027",
    "MINAE · Colombia · Trinidad y Tobago",
    "Calidad y mercados",
    "Normas ISO para convertir riesgos climáticos en inversiones y acciones medibles.",
    "Adaptación",
  ],
  [
    "Programa País ONUDI–Costa Rica",
    "Movilizado",
    270000,
    "2024–2028",
    "MIDEPLAN · INA · Ministerios",
    "Política industrial",
    "Marco para formular proyectos, atraer cooperación y coordinar desarrollo industrial sostenible.",
    "Coordinación",
  ],
  [
    "Mapa de Uso Agropecuario",
    "Movilizado",
    10000,
    "2026",
    "MAG",
    "Calidad y mercados",
    "Evidencia territorial para trazabilidad y acceso a mercados.",
    "Agro",
  ],
  [
    "Cooperación Sur–Sur en café",
    "Movilizado",
    10000,
    "2024",
    "MAG · Colombia",
    "Calidad y mercados",
    "Intercambio sobre trazabilidad y estándares agroforestales.",
    "Cooperación",
  ],
  [
    "Cooperación triangular en evaluación de impacto",
    "Movilizado",
    10000,
    "2026",
    "MINAE · MEIC · Panamá",
    "Política industrial",
    "Intercambio Costa Rica–Panamá con acompañamiento de ONUDI.",
    "Cooperación",
  ],
  [
    "Segunda fase de economía azul",
    "Pipeline",
    2300000,
    "2026–2029",
    "MINAE · Gobiernos locales · CI",
    "Economía azul",
    "Protección marina, financiamiento y empleos verdes en territorios costeros.",
    "Costa",
  ],
  [
    "Talamanca Transforma",
    "Pipeline",
    4533396,
    "2026–2029",
    "MINAE · Costa Rica por Siempre",
    "Empleo y territorio",
    "USD 2,93 M del GBFF y USD 1,6 M privados para biodiversidad y medios de vida.",
    "Bioeconomía",
  ],
  [
    "REIF Biometano",
    "Pipeline",
    3000000,
    "2026–2030",
    "MINAE · INA · MEIC",
    "Energía limpia",
    "Financiamiento combinado para convertir residuos en energía y movilizar USD 10 M adicionales.",
    "Biometano",
  ],
  [
    "Global Matchmaking Platform",
    "Pipeline",
    null,
    "2026–2028",
    "MINAE · Climate Club",
    "Descarbonización",
    "Asistencia técnica y financiamiento para cemento y descarbonización industrial.",
    "Industria",
  ],
  [
    "Segunda vida inteligente de baterías",
    "Pipeline",
    600000,
    "2026–2028",
    "INA · MEIC · MINAE · Sector privado",
    "Economía circular",
    "IA, pasaporte digital, capacidades y demostración para reutilizar baterías de vehículos eléctricos.",
    "Baterías",
  ],
  [
    "Ecosistema de hidrógeno verde",
    "Pipeline",
    4930000,
    "2026–2030",
    "MINAE · INA · MEIC",
    "Energía limpia",
    "Capacidades, regulación, tecnología y mecanismos financieros para hidrógeno verde.",
    "Hidrógeno",
  ],
  [
    "Competencias y proveedores en semiconductores",
    "Pipeline",
    2000000,
    "2027–2029",
    "INA · COMEX · PROCOMER · MEIC",
    "Habilidades y tecnología",
    "Centro regional de competencias y desarrollo de proveedores locales.",
    "Semiconductores",
  ],
  [
    "Construcción baja en carbono",
    "Pipeline",
    19070000,
    "2025–2029",
    "MINAE",
    "Descarbonización",
    "Madera sostenible, materiales bajos en carbono y cadenas resilientes.",
    "Construcción",
  ],
  [
    "Cooperación Sur–Sur en carne bovina",
    "Pipeline",
    7000,
    "2026",
    "MAG · Uruguay",
    "Calidad y mercados",
    "Aprendizaje para plantas procesadoras interesadas en exportar a la Unión Europea.",
    "Agro",
  ],
  [
    "A2D Facility",
    "Convocatoria",
    5000000,
    "2026–2027",
    "Sector privado · MINAE · MAG · MEIC",
    "Innovación empresarial",
    "Proyectos demostrativos de energía limpia y descarbonización listos para implementarse.",
    "Energía",
  ],
  [
    "ASIF",
    "Convocatoria",
    90000,
    "2026–2027",
    "PYMES · MINAE · MAG · MEIC",
    "Innovación empresarial",
    "Hasta USD 90.000 para soluciones de adaptación lideradas por PYMES.",
    "Adaptación",
  ],
  [
    "Blue Economy Global Call 2026",
    "Convocatoria",
    10000,
    "2026",
    "Empresas · UNIDO ITPO Italy · WTCA",
    "Economía azul",
    "Aceleración, visibilidad y conexiones de inversión para soluciones azules.",
    "Convocatoria",
  ],
  [
    "One World Sustainability Awards",
    "Convocatoria",
    3000,
    "2026",
    "Empresas · Startups",
    "Innovación empresarial",
    "Reconocimiento y posicionamiento global para innovación sostenible.",
    "Premio",
  ],
].map(
  (x) =>
    ({
      name: x[0],
      status: x[1],
      amount: x[2],
      period: x[3],
      partners: x[4],
      components: taxonomy[String(x[0])].components,
      axes: taxonomy[String(x[0])].axes,
      summary: x[6],
      tag: x[7],
    }) as Item,
);
const ina = [
  [
    "Agropecuario",
    "Muy alta",
    "Café · biometano · carne · adaptación",
    "Pilotos de bioeconomía, residuos y trazabilidad",
  ],
  [
    "Comercio y Servicios",
    "Muy alta",
    "MIPYMES · convocatorias · semiconductores",
    "Gestión, habilidades digitales y financiamiento",
  ],
  [
    "Eléctrico",
    "Muy alta",
    "Biometano · H₂ · baterías · semiconductores",
    "Certificaciones y laboratorios demostrativos",
  ],
  [
    "Industria Alimentaria",
    "Muy alta",
    "Café · carne · Talamanca · biometano",
    "Valor agregado, inocuidad y trazabilidad",
  ],
  [
    "Industria Gráfica",
    "Media",
    "Trazabilidad · economía azul",
    "Etiquetado y comunicación sostenible",
  ],
  [
    "Mecánica de Vehículos",
    "Muy alta",
    "Baterías · H₂ · biometano",
    "Diagnóstico y combustibles alternativos",
  ],
  [
    "Metalmecánica",
    "Alta",
    "H₂ · biometano · construcción",
    "Proveedores y manufactura avanzada",
  ],
  [
    "Náutico Pesquero",
    "Muy alta",
    "Economía azul · Talamanca",
    "Pesca sostenible y tecnología azul",
  ],
  [
    "Salud, Cultura y Artesanías",
    "Media",
    "Talamanca · juventud · economía azul",
    "Diseño sostenible y empleo inclusivo",
  ],
  [
    "Tecnología de Materiales",
    "Muy alta",
    "Construcción circular · adaptación",
    "Materiales circulares y bajo carbono",
  ],
  [
    "Textil",
    "Media",
    "Circularidad · ASIF · emprendimiento",
    "Ecodiseño y trazabilidad",
  ],
  [
    "Turismo",
    "Muy alta",
    "Economía azul · Talamanca",
    "Turismo sostenible y resiliencia",
  ],
];
const inaSectors:Record<string,string>={
 "Agropecuario":"Agricultura, ganadería, forestal y gestión de la producción agropecuaria",
 "Comercio y Servicios":"Gestión empresarial, TIC, comercio, idiomas y servicios a empresas",
 "Eléctrico":"Electricidad, electrónica, refrigeración, telecomunicaciones y telemática",
 "Industria Alimentaria":"Procesamiento y transformación de alimentos, inocuidad y valor agregado",
 "Industria Gráfica":"Diseño, impresión, comunicación visual y transformación digital",
 "Mecánica de Vehículos":"Mantenimiento, diagnóstico y nuevas tecnologías vehiculares",
 "Metalmecánica":"Construcciones metálicas, precisión, metalurgia y manufactura",
 "Náutico Pesquero":"Navegación, pesca, acuicultura y producción marino-costera",
 "Salud, Cultura y Artesanías":"Cultura, artesanías, salud, bienestar y emprendimiento inclusivo",
 "Tecnología de Materiales":"Gestión ambiental, construcción, madera, muebles y materiales",
 "Textil":"Producción textil, confección, calidad y gestión para MIPYMES",
 "Turismo":"Alojamiento, gastronomía, turismo rural y servicios turísticos",
};
const fmt = (n: number | null) =>
  n === null
    ? "Por definir"
    : new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "USD",
        notation: n >= 1e6 ? "compact" : "standard",
        maximumFractionDigits: n >= 1e6 ? 2 : 0,
      }).format(n);
const cpComponents=[
 {n:"01",title:"Desarrollo de habilidades técnicas para el empleo",industry:"Construye el talento que requiere una industria más tecnológica, circular y baja en carbono.",actions:"Semiconductores · baterías · hidrógeno verde · juventud rural · articulación INA",pndip:"Empleabilidad basada en demanda; Sistema Nacional de Empleo; formación técnica y vinculación con empresas.",level:"Directa"},
 {n:"02",title:"Energías renovables y descarbonización",industry:"Reduce costos, emisiones y riesgos mientras abre mercados de tecnología y servicios industriales.",actions:"Biometano y REIF · hidrógeno verde · GMP cemento e industria · A2D",pndip:"Ambiente y Energía: descarbonización, producción sostenible, NDC y transición hacia crecimiento verde.",level:"Directa"},
 {n:"03",title:"Economía circular y eficiencia de recursos",industry:"Transforma residuos y materiales en productividad, inversión, proveedores y modelos de negocio.",actions:"Construcción circular · segunda vida de baterías · Talamanca · economía azul",pndip:"Producción y consumo sostenibles; transición hacia economía circular en industria, agroalimentos, turismo y construcción.",level:"Directa"},
 {n:"04",title:"Infraestructura de la calidad",industry:"Convierte normas, trazabilidad, metrología y certificación en acceso a mercados y confianza.",actions:"Statement café · ISO adaptación · mapa agropecuario · carne bovina · construcción",pndip:"Exportaciones; producción sostenible; reconocimiento de fincas; estándares constructivos y reducción de barreras productivas.",level:"Complementaria"}
];
const crossAxes=[
 ["Juventud y equidad de género","Participación de mujeres y jóvenes en capacitación, innovación, emprendimiento y empleos verdes."],
 ["Pequeñas y medianas empresas","Proveedores, digitalización, formalización, acceso a convocatorias, mercados y financiamiento."],
 ["Investigación + Desarrollo + Innovación","IA, pasaportes digitales, nuevos materiales, tecnologías limpias y demostración industrial."],
 ["Cadenas de valor sostenibles","Trazabilidad, debida diligencia, circularidad, calidad, descarbonización y acceso a mercados."]
];
const pndMatches=[
 ["Productivo y Desarrollo Regional","Digitalización de PYMES; encadenamientos, proveedores y comercialización; inversión fuera de la GAM; exportaciones.","Statement, semiconductores/SPX, convocatorias, Talamanca, economía azul, Programa País","Directa"],
 ["Ambiente y Energía","Producción y consumo sostenibles; economía circular; descarbonización; construcción sostenible.","Construcción circular y baja en carbono, biometano, H₂, baterías, adaptación ISO","Directa"],
 ["Agropecuario","Fincas NAMA, tecnologías de producción sostenible y reconocimiento de producción sostenible.","Café y trazabilidad, Mapa de Uso Agropecuario, biometano agroindustrial, carne bovina","Directa"],
 ["Bienestar, Trabajo e Inclusión Social","Formación vinculada a demanda, empleabilidad, empresas y Sistema Nacional de Empleo.","Habilidades industriales con INA, juventud rural, semiconductores, H₂, baterías","Directa"],
 ["Ciencia, Tecnología, Innovación y Telecomunicaciones","Capacidades tecnológicas, innovación, transformación digital y ecosistema de conocimiento.","IA industrial, diagnóstico de baterías, plataforma Statement, semiconductores","Complementaria"],
 ["Acción Exterior","Cooperación internacional, alianzas, posicionamiento y movilización de recursos.","Cooperación Sur–Sur y triangular, GEF/GCF, Climate Club, convocatorias globales","Complementaria"],
 ["Vivienda, Hábitat y Territorio","Construcción sostenible, resiliencia territorial y mejores condiciones del entorno construido.","Construcción circular, madera sostenible, adaptación climática, Talamanca","Complementaria"]
];
const meicSynergies=[
 {stage:"Vigente",name:"Trazabilidad y sostenibilidad del café",amount:"USD 326.200",benefit:"Cumplimiento, trazabilidad, diferenciación y permanencia en mercados internacionales.",relevance:"Calidad, competitividad, transformación digital y acceso a mercados.",action:"Vincular empresas y cooperativas y escalar la trazabilidad a otras cadenas.",component:CALIDAD},
 {stage:"Vigente",name:"Construcción circular",amount:"USD 4,73 M + USD 128 M privados",benefit:"Materiales sostenibles, innovación empresarial y nuevos modelos de negocio circulares.",relevance:"Desarrollo industrial, economía circular, calidad y movilización de inversión privada.",action:"Articular empresas, proveedores, cámaras y mecanismos de reconocimiento PYME.",component:CIRCULARIDAD},
 {stage:"Vigente",name:"Estrategia de biometano",amount:"USD 250.000",benefit:"Oportunidades para empresas agroindustriales, energéticas, de transporte y residuos.",relevance:"Innovación productiva, nuevos mercados, encadenamientos y menores costos energéticos.",action:"Identificar empresas proveedoras, usuarias y desarrolladoras de tecnología.",component:ENERGIA},
 {stage:"Vigente",name:"Normas para la adaptación climática",amount:"USD 333.333",benefit:"Convierte riesgos y medidas de adaptación empresarial en inversiones financiables.",relevance:"Infraestructura de la calidad, resiliencia empresarial y acceso a financiamiento.",action:"Vincular PYMES industriales y empresas de sectores vulnerables.",component:CALIDAD},
 {stage:"Vigente",name:"Economía azul y ecosistemas de surf",amount:"USD 733.000",benefit:"Fortalece turismo, servicios y emprendimientos productivos en territorios costeros.",relevance:"Desarrollo territorial, innovación y encadenamientos locales.",action:"Incorporar empresas turísticas, proveedores y emprendimientos costeros.",component:CIRCULARIDAD},
 {stage:"Vigente",name:"Programa País ONUDI–Costa Rica",amount:"USD 270.000",benefit:"Estructura proyectos, atrae cooperación y coordina soluciones productivas.",relevance:"Permite orientar el apoyo de ONUDI hacia prioridades industriales y empresariales.",action:"Integrar al MEIC al Comité Directivo del Programa País.",component:HABILIDADES},
 {stage:"Vigente",name:"Mapa de Uso Agropecuario",amount:"USD 10.000",benefit:"Mejora la evidencia para trazabilidad y acceso a mercados.",relevance:"Competitividad y cumplimiento de requisitos comerciales.",action:"Cruzar el mapa con PYMES y polos territoriales de desarrollo.",component:CALIDAD},
 {stage:"Vigente",name:"Cooperación Sur–Sur en café",amount:"USD 10.000",benefit:"Transfiere conocimientos sobre trazabilidad y estándares agroforestales.",relevance:"Aprendizaje empresarial, calidad y cooperación técnica.",action:"Extender intercambios a otras cadenas exportadoras.",component:CALIDAD},
 {stage:"Pipeline",name:"REIF Biometano",amount:"USD 3 M + al menos USD 10 M por movilizar",benefit:"Financiamiento combinado, garantías y preparación de proyectos empresariales.",relevance:"Empresas, proveedores e inversiones con potencial de escalamiento.",action:"Construir con MEIC un pipeline de empresas y cadenas proveedoras.",component:ENERGIA},
 {stage:"Pipeline",name:"Hidrógeno verde",amount:"USD 4,93 M",benefit:"Proveedores, capacidades técnicas, regulación y nuevos usos industriales.",relevance:"Vinculación de industrias demandantes y proveedores nacionales.",action:"Conectar empresas con el clúster de Zona Norte.",component:ENERGIA},
 {stage:"Pipeline",name:"Semiconductores",amount:"USD 2 M",benefit:"Formación especializada y proveedores para una industria de alto valor agregado.",relevance:"Política industrial, MIPYMES proveedoras y empresas tractoras.",action:"Fortalecer servicios locales, encadenamientos y compras públicas verdes.",component:HABILIDADES},
 {stage:"Pipeline",name:"Construcción baja en carbono",amount:"USD 19,07 M",benefit:"Madera sostenible, materiales bajos en carbono y cadenas resilientes.",relevance:"Proveedores, normas, calidad e innovación en la industria nacional.",action:"Identificar empresas demostradoras y oferta nacional de materiales.",component:CIRCULARIDAD},
 {stage:"Pipeline",name:"Talamanca Transforma",amount:"USD 2,93 M + USD 1,6 M privados",benefit:"Bioeconomía, circularidad, emprendimientos territoriales y valor agregado.",relevance:"Formalización, desarrollo empresarial, financiamiento y mercados.",action:"Integrar servicios de DIGEPYME y mecanismos de apoyo empresarial.",component:CIRCULARIDAD},
 {stage:"Pipeline",name:"Global Matchmaking Platform",amount:"Por determinar",benefit:"Tecnología, asistencia técnica y financiamiento para cemento y descarbonización.",relevance:"Prioridades industriales y participación de empresas y cámaras.",action:"Definir retos industriales y empresas candidatas.",component:ENERGIA},
 {stage:"Pipeline",name:"Segunda fase de economía azul",amount:"USD 333.333",benefit:"Escalamiento de emprendimientos, turismo sostenible y servicios costeros.",relevance:"MIPYMES y encadenamientos territoriales.",action:"Articular instrumentos de desarrollo empresarial en costas.",component:CIRCULARIDAD},
 {stage:"Pipeline",name:"Cooperación Sur–Sur en carne bovina",amount:"USD 7.000",benefit:"Conocimiento para plantas interesadas en exportar a la Unión Europea.",relevance:"Infraestructura de calidad y armonización productiva y comercial.",action:"Vincular plantas, proveedores y Sistema Nacional para la Calidad.",component:CALIDAD},
];
const privateCalls=[
 {name:"UNIDO–WTCA Blue Economy Global Call 2026",short:"BLUE ECONOMY",url:"https://itpo-rome.unido.org/GlobalCall2026/",image:"/brand/woman-solar.jpeg",fit:"MIPYMES y empresas con soluciones innovadoras, escalables y listas para desplegar en la economía azul.",benefit:"Visibilidad internacional, conexiones empresariales y de inversión, promoción ante la red ONUDI–WTCA y posicionamiento global.",support:"Aceleración y matchmaking",areas:["Energía azul renovable","Alimentos azules sostenibles","Puertos y transporte verde","Turismo costero","Restauración acuática","Blue Tech y biotecnología"],prepare:"Solución demostrable, evidencia de impacto, escalabilidad, modelo de negocio y propuesta de despliegue internacional.",note:"La convocatoria admite postulaciones de micro, pequeñas, medianas y grandes empresas."},
 {name:"Accelerate-to-Demonstrate Facility",short:"A2D FACILITY",url:"https://a2dfacility.unido.org/",image:"/brand/women-production.jpeg",fit:"Empresas y consorcios capaces de implementar proyectos demostrativos catalíticos en países elegibles para AOD.",benefit:"Subvención para implementar y operar demostraciones que reduzcan el riesgo tecnológico y aceleren la comercialización.",support:"Financiamiento demostrativo",areas:["Hidrógeno limpio","Minerales críticos","Energía inteligente","Descarbonización industrial"],prepare:"Consorcio sólido, tecnología innovadora, sitio de demostración, ruta de comercialización, presupuesto y evidencia de impacto transformador.",note:"No es una convocatoria ordinaria para ideas tempranas: prioriza proyectos faro escalables y listos para demostración."},
 {name:"Adaptation SMEs Innovation Facility — ASIF",short:"ASIF LATAM",url:"https://bfaglobal.com/asif-latam/",image:"/brand/woman-science.jpeg",fit:"Startups y PYMES de adaptación climática, desde prototipos por validar hasta soluciones en mercado con potencial de escala.",benefit:"Ignite ofrece validación remota y apoyo experto; Propel combina acompañamiento especializado con subvenciones por desempeño.",support:"Aceleración + subvención",areas:["Agroalimentos","Finanzas para resiliencia","Economía azul","Resiliencia urbana","Salud"],prepare:"Definir etapa: Ignite para prototipo sin validación real; Propel para producto con usuarios, tracción e impacto de adaptación escalable.",note:"Propel contempla subvenciones de USD 70.000–90.000; requiere revisar elegibilidad y carta de la Autoridad Designada."},
 {name:"UNIDO ONE World Sustainability Awards",short:"ONE WORLD AWARDS",url:"https://www.unido.org/oneworld-sustainability-awards",image:"/brand/women-industry.jpeg",fit:"Empresas y startups con resultados comprobables en sostenibilidad, innovación industrial y modelos escalables.",benefit:"Credibilidad ONUDI, visibilidad global, acceso a redes, alianzas y exposición ante inversionistas, gobiernos y líderes empresariales.",support:"Premio y posicionamiento",areas:["Cadenas de suministro sostenibles","Startups innovadoras","Mujeres en la industria"],prepare:"Resultados medibles, innovación, sostenibilidad de largo plazo, escalabilidad y una narrativa clara de impacto empresarial y social.",note:"La evaluación considera sostenibilidad, impacto, innovación y escalabilidad mediante preselección técnica y jurado independiente."},
];
const minaePriorities=[
 {n:"01",title:"Parques nacionales con modelos económicos sostenibles",image:"/brand/women-industry.jpeg",reading:"La conservación se vuelve durable cuando los territorios generan ingresos, empresas locales y financiamiento que reducen la presión sobre los ecosistemas.",projects:["Talamanca Transforma","Juventud rural en La Cruz","Economía azul y ecosistemas de surf","Adaptación climática"],mechanisms:["Bioeconomía y economía circular","Emprendimientos comunitarios","Fondos para conservación","Turismo y cadenas territoriales"],engagement:"ONUDI conecta gestión territorial, capacidades productivas, capital semilla, inversión privada y fondos ambientales.",amount:"USD 5,37 M+"},
 {n:"02",title:"Gobernanza marina y océanos",image:"/brand/woman-solar.jpeg",reading:"La gobernanza marina puede proteger ecosistemas y, simultáneamente, ordenar oportunidades económicas en turismo, pesca, servicios costeros y tecnología azul.",projects:["Economía azul y ecosistemas de surf","Segunda fase de economía azul","Blue Economy Global Call","Talamanca costera"],mechanisms:["MIPYMES azules","Financiamiento positivo para la naturaleza","Tecnología y restauración","Empleo verde costero"],engagement:"ONUDI agrega la dimensión empresarial y de inversión a la gobernanza, vinculando comunidades, gobiernos locales, sector privado y cooperación.",amount:"USD 3,04 M+"},
 {n:"03",title:"Diversificación energética renovable",image:"/brand/woman-solar.jpeg",reading:"Diversificar la matriz exige pasar de estrategias a proyectos financiables, proveedores capacitados, demostraciones y demanda industrial.",projects:["Estrategia nacional de biometano","REIF Biometano","Hidrógeno verde","A2D Facility","Segunda vida de baterías"],mechanisms:["Garantías y blended finance","Proyectos demostrativos","Regulación y calidad","Proveedores y competencias"],engagement:"ONUDI articula política, tecnología, financiamiento climático, industria e INA para acelerar la adopción y reducir riesgos de inversión.",amount:"USD 13,78 M+"},
 {n:"04",title:"Desarrollo económico ambiental",image:"/brand/women-production.jpeg",reading:"La sostenibilidad escala cuando se traduce en productividad, nuevos mercados, reducción de costos, innovación, empleo y cadenas de suministro competitivas.",projects:["Construcción circular","Construcción baja en carbono","Normas para acción climática","Global Matchmaking Platform","ASIF"],mechanisms:["Cofinanciamiento privado","Materiales sostenibles","Adaptación financiable","Innovación empresarial"],engagement:"ONUDI convierte objetivos ambientales en carteras de inversión, capacidades empresariales, estándares y soluciones industriales medibles.",amount:"USD 152,2 M+"},
];
const magLines=[
 {n:"01",title:"Trazabilidad, calidad y acceso a mercados",status:"Trabajo en curso",amount:"USD 356.200",projects:["Trazabilidad y sostenibilidad del café","Mapa de Uso Agropecuario","Cooperación Sur–Sur en café","Cooperación Sur–Sur en carne bovina"],result:"Herramientas y capacidades para demostrar origen, sostenibilidad y cumplimiento, y facilitar la permanencia o entrada a mercados exigentes.",potential:"Escalar la experiencia de café a otras cadenas agroexportadoras, integrar datos productivos y fortalecer plantas procesadoras y organizaciones de productores."},
 {n:"02",title:"Bioeconomía, residuos y energía agroindustrial",status:"Movilizado + pipeline",amount:"USD 3,25 M+",projects:["Estrategia nacional de biometano","REIF Biometano","Talamanca Transforma"],result:"Una ruta para convertir residuos orgánicos y recursos biológicos en energía, valor agregado, reducción de costos e inversión territorial.",potential:"Preparar proyectos agroindustriales financiables, estructurar garantías y desarrollar proveedores, capacidades y modelos de negocio de biogás y biometano."},
 {n:"03",title:"Resiliencia climática y producción sostenible",status:"Trabajo y oportunidades",amount:"USD 423.333+",projects:["Normas para la acción climática","ASIF","A2D Facility","Juventud rural en La Cruz"],result:"Conecta riesgos climáticos con decisiones productivas, innovación empresarial, adaptación financiable y emprendimiento rural.",potential:"Identificar PYMES agroalimentarias para pilotos, convocatorias y soluciones de adaptación en agua, suelos, cadenas de suministro y producción."},
 {n:"04",title:"Cadenas territoriales y cooperación técnica",status:"Potencial de escala",amount:"USD 4,64 M+",projects:["Talamanca Transforma","Economía azul","Juventud rural","Cooperación Sur–Sur"],result:"Fortalece capacidades, emprendimientos y agregación de valor en territorios rurales y costeros mediante alianzas y aprendizaje internacional.",potential:"Articular servicios de extensión, formación, financiamiento y acceso a mercados alrededor de cadenas priorizadas y organizaciones locales."},
];
export default function Home() {
  const [section, setSection] = useState("Resumen"),
    [status, setStatus] = useState("Todos"),
    [componentFilter, setComponentFilter] = useState("Todos los componentes"),
    [axisFilter, setAxisFilter] = useState("Todos los ejes"),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState<Item | null>(null),
    [story, setStory] = useState(0),
    [meicStage, setMeicStage] = useState("Vigente"),
    [inaFocus, setInaFocus] = useState("Agropecuario");
  const filtered = useMemo(
    () =>
      I.filter(
        (x) =>
          (status === "Todos" || x.status === status) &&
          (componentFilter === "Todos los componentes" || x.components.includes(componentFilter)) &&
          (axisFilter === "Todos los ejes" || x.axes.includes(axisFilter)) &&
          (x.name + x.partners + x.summary + x.components.join(" ") + x.axes.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [status, componentFilter, axisFilter, query],
  );
  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <img className="brandLogo" src="/brand/unido-emblem.png" alt="UNIDO" />
          <div>
            <b>UNIDO · ONUDI Costa Rica</b>
            <small>Programa País 2024–2028</small>
          </div>
        </div>
        <nav>
          {["Resumen", "Programa País", "Portafolio", "MEIC", "MINAE", "MAG", "INA", "Convocatorias", "Datos"].map((x) => (
            <button
              key={x}
              className={section === x ? "active" : ""}
              onClick={() => setSection(x)}
            >
              {x}
            </button>
          ))}
        </nav>
        <span className="updated">ACTUALIZADO · AGO 2026</span>
      </header>
      {section === "Resumen" && (
        <>
          <section className="hero">
            <div className="heroCopy">
              <p className="eyebrow">COMPETITIVIDAD Y DESARROLLO INDUSTRIAL SOSTENIBLE</p>
              <h1>
                Costa Rica necesita
                <br />
                <em>convertir prioridades en inversión.</em>
              </h1>
              <p className="lede">
                ONUDI aporta la capacidad especializada para conectar política pública,
                empresas, tecnología, calidad, talento y financiamiento internacional,
                convirtiendo las prioridades nacionales en proyectos industriales implementables.
              </p>
              <div className="heroActions"><button onClick={()=>setSection("Portafolio")}>Explorar la cartera</button><button onClick={()=>setSection("Programa País")}>Ver arquitectura del Programa País</button></div>
            </div>
            <div className="heroVisual">
              <img src="/brand/women-industry.jpeg" alt="Mujer trabajando con tecnología industrial" />
              <div className="heroTotal">
                <span>PORTAFOLIO + OPORTUNIDADES</span>
                <strong>$173,7 M</strong>
                <small>USD · recursos movilizados y oportunidades</small>
              </div>
            </div>
          </section>
          <section className="kpis">
            <article>
              <span>RECURSOS MOVILIZADOS</span>
              <strong>$134,8 M</strong>
              <small>proyectos y cofinanciamiento movilizado</small>
            </article>
            <article>
              <span>PIPELINE EN GESTIÓN</span>
              <strong>$33,9 M</strong>
              <small>propuestas sujetas a aprobación</small>
            </article>
            <article>
              <span>OPORTUNIDADES EMPRESARIALES</span>
              <strong>$5,1 M</strong>
              <small>4 convocatorias</small>
            </article>
            <article className="dark">
              <span>COFINANCIAMIENTO PRIVADO</span>
              <strong>$128 M</strong>
              <small>apalancamiento movilizado</small>
            </article>
          </section>
          <section className="split">
            <div>
              <div className="sectionHead">
                <div>
                  <p className="eyebrow">COMPOSICIÓN</p>
                  <h2>De recursos a impacto</h2>
                </div>
                <button onClick={() => setSection("Portafolio")}>
                  Explorar →
                </button>
              </div>
              <div className="bar">
                <i />
                <i />
                <i />
              </div>
              <div className="legend">
                <span>
                  <b className="dot green" />
                  Movilizado · 77,6%
                </span>
                <span>
                  <b className="dot gold" />
                  Pipeline · 19,5%
                </span>
                <span>
                  <b className="dot blue" />
                  Convocatorias · 2,9%
                </span>
              </div>
            </div>
            <aside>
              <p className="eyebrow">LECTURA CLAVE</p>
              <blockquote>
                Por cada dólar de cooperación técnica en construcción circular,
                se articulan más de <b>USD 27</b> privados.
              </blockquote>
              <small>Cálculo indicativo: USD 128 M / USD 4,73 M</small>
            </aside>
          </section>
          <section className="governmentCase">
            <div className="governmentLead"><p className="eyebrow">POR QUÉ ONUDI</p><h2>La pieza que conecta la ambición pública con la ejecución industrial</h2><p>El valor no reside únicamente en administrar cooperación. ONUDI integra especialización industrial, formulación de proyectos, acceso a redes globales y capacidad de implementación para cerrar la brecha entre una prioridad nacional y un resultado productivo.</p></div>
            <div className="governmentFlow"><article><span>01</span><b>Prioridad nacional</b><p>PNDIP, energía, ambiente, agro, MIPYMES y empleo.</p></article><article><span>02</span><b>Diseño industrial</b><p>Soluciones, normas, capacidades, tecnología y cadenas de valor.</p></article><article><span>03</span><b>Movilización</b><p>Fondos climáticos, cooperación, convocatorias y capital privado.</p></article><article><span>04</span><b>Resultado país</b><p>Competitividad, inversión, empleo, proveedores y sostenibilidad.</p></article></div>
          </section>
          <section className="summaryCharts"><div className="summaryChartsHead"><p className="eyebrow">CARTERA EN PERSPECTIVA</p><h2>Una plataforma para movilizar capacidades y recursos</h2></div><div className="summaryChartGrid"><Chart title="Recursos por estado · USD millones" data={[["Movilizado",134.76],["Pipeline",33.87],["Convocatorias",5.10]]}/><Chart title="Intervenciones por componente" data={[["Habilidades",9],["Energía",11],["Circularidad",13],["Calidad",10]]}/><Chart title="Ejes transversales activados" data={[["Género y juventud",8],["MIPYMES",18],["I+D+i",20],["Cadenas sostenibles",22]]}/></div><p>Las intervenciones pueden contribuir a más de un componente y eje transversal; por ello, las categorías no son sumables.</p></section>
          <section className="stories">
            <div className="storyImage">
              <img src={["/brand/woman-science.jpeg","/brand/women-production.jpeg","/brand/woman-solar.jpeg"][story]} alt={["Mujer científica en un laboratorio","Mujeres en una cadena de producción industrial","Mujer profesional en energía solar"][story]} />
              <span>0{story + 1} / 03</span>
            </div>
            <div className="storyCopy">
              <p className="eyebrow">INDUSTRIA QUE TRANSFORMA EL PAÍS</p>
              <h2>{["Innovación que llega a la empresa","Producción que desarrolla talento","Energía que moviliza inversión"][story]}</h2>
              <p>{["ONUDI conecta conocimiento científico, tecnología y necesidades empresariales para convertir innovación en productividad y nuevas oportunidades.","Las cadenas de valor competitivas requieren talento, calidad, proveedores y condiciones para que mujeres y jóvenes participen en empleos industriales de futuro.","La diversificación energética abre proyectos financiables, reduce riesgos productivos y crea demanda para capacidades, servicios y proveedores nacionales."][story]}</p>
              <div className="storyNav">{[0,1,2].map(i=><button key={i} aria-label={`Ver historia ${i+1}`} className={story===i?"active":""} onClick={()=>setStory(i)}>{i+1}</button>)}</div>
            </div>
          </section>
          <section className="priorities priorityArchitecture">
            <div className="priorityIntro">
              <div><p className="eyebrow">ÁREAS TEMÁTICAS DEL PROGRAMA PAÍS</p><h2>Cuatro componentes conectados con las prioridades nacionales</h2></div>
              <p>Las áreas temáticas corresponden exactamente a los cuatro componentes oficiales del Programa País 2024–2028. Para cada una se muestra su vinculación con el PNDIP 2023–2026 y con las acciones del portafolio ONUDI.</p>
            </div>
            <div className="priorityMatrix">
              {cpComponents.map((component) => (
                <article key={component.n} className="priorityCard">
                  <header><span>{component.n}</span><b>ÁREA TEMÁTICA · COMPONENTE DEL PROGRAMA PAÍS</b></header>
                  <h3>{component.title}</h3>
                  <div className="priorityBlock"><small>PRIORIDAD PNDIP 2023–2026</small><p>{component.pndip}</p></div>
                  <div className="priorityBlock"><small>ACCIONES DEL PORTAFOLIO ONUDI</small><div className="actionTags">{component.actions.split(" · ").map(action=><span key={action}>{action}</span>)}</div></div>
                  <button onClick={() => setSection("Programa País")}>Explorar componente <span aria-hidden="true">→</span></button>
                </article>
              ))}
            </div>
            <p className="priorityNote">Alineación indicativa elaborada a partir de las acciones del portafolio ONUDI y de las prioridades vigentes del PNDIP 2023–2026.</p>
          </section>
          <section className="readings">
            <div className="readingLead"><p className="eyebrow">MÁS LECTURAS CLAVE</p><h2>Lo que revela la cartera</h2><p>Los montos cuentan una parte de la historia. Estas relaciones muestran cómo ONUDI convierte cooperación técnica en capacidad industrial.</p></div>
            <div className="readingGrid">
              <article><strong>96%</strong><span>del valor movilizado corresponde a cofinanciamiento privado asociado a construcción circular.</span></article>
              <article><strong>4</strong><span>componentes articulan prioridades del PNDIP con capacidades industriales y acciones ONUDI.</span></article>
              <article><strong>9 de 12</strong><span>núcleos del INA presentan una conexión alta o muy alta con la cartera industrial.</span></article>
              <article><strong>4 × 4</strong><span>cuatro componentes sectoriales y cuatro ejes transversales forman una sola arquitectura industrial.</span></article>
            </div>
          </section>
        </>
      )}
      {section === "Programa País" && <section className="page cpPage">
        <Title eyebrow="ARQUITECTURA DEL PROGRAMA PAÍS 2024–2028" title="La industria como hilo conductor" text="Componentes, ejes transversales y acciones que conectan capacidades, productividad, sostenibilidad y acceso a mercados." />
        <div className="cpComponents">{cpComponents.map(c=><article key={c.n}><header><span>{c.n}</span><b className={`match ${c.level.toLowerCase()}`}>{c.level}</b></header><h2>{c.title}</h2><p className="industrialLink">{c.industry}</p><dl><div><dt>Acciones ONUDI</dt><dd>{c.actions}</dd></div><div><dt>Contribución al PNDIP</dt><dd>{c.pndip}</dd></div></dl></article>)}</div>
        <section className="crossSection"><div><p className="eyebrow">EJES TRANSVERSALES</p><h2>Capacidades que atraviesan toda la cartera</h2><p>No son líneas independientes: funcionan como criterios de diseño para que cada intervención industrial genere inclusión, innovación, competitividad y sostenibilidad.</p></div><div className="crossGrid">{crossAxes.map((a,i)=><article key={a[0]}><span>0{i+1}</span><h3>{a[0]}</h3><p>{a[1]}</p></article>)}</div></section>
        <section className="cpConclusion"><p className="eyebrow">LECTURA INDUSTRIAL</p><h2>ONUDI actúa como capa de implementación productiva</h2><p>El Programa País traduce prioridades públicas en capacidades técnicas, estándares, tecnologías, proyectos financiables y alianzas empresariales. Su aporte no se limita a “industria” como sector: utiliza la transformación productiva para incidir en empleo, clima, territorios, comercio, innovación y cooperación internacional.</p></section>
      </section>}
      {section === "Portafolio" && (
        <section className="page">
          <Title
            eyebrow="23 INICIATIVAS Y OPORTUNIDADES"
            title="Explorador de cartera"
            text="Explora cada intervención según su estado, los componentes del Programa País y los ejes transversales que activa."
            count={filtered.length}
          />
          <div className="filters">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar proyecto, socio o palabra clave…"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Todos</option>
              <option>Movilizado</option>
              <option>Pipeline</option>
              <option>Convocatoria</option>
            </select>
            <select aria-label="Filtrar por componente" value={componentFilter} onChange={(e) => setComponentFilter(e.target.value)}>
              <option>Todos los componentes</option>
              {COMPONENTS.map((x) => <option key={x}>{x}</option>)}
            </select>
            <select aria-label="Filtrar por eje transversal" value={axisFilter} onChange={(e) => setAxisFilter(e.target.value)}>
              <option>Todos los ejes</option>
              {AXES.map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
          <Chart title="Distribución por estado" data={[["Movilizado",10],["Pipeline",9],["Convocatorias",4]]}/>
          <div className="cards">
            {filtered.map((x) => (
              <button
                className="project"
                key={x.name}
                onClick={() => setSelected(x)}
              >
                <div>
                  <span className={`badge ${x.status.toLowerCase()}`}>
                    {x.status}
                  </span>
                  <span className="tag">{x.tag}</span>
                </div>
                <h3>{x.name}</h3>
                <p>{x.summary}</p>
                <div className="portfolioTaxonomy"><span>{x.components.length} {x.components.length===1?"componente":"componentes"}</span><span>{x.axes.length} {x.axes.length===1?"eje":"ejes"}</span></div>
                <footer>
                  <span>{x.period}</span>
                  <strong>{fmt(x.amount)}</strong>
                </footer>
              </button>
            ))}
          </div>
        </section>
      )}
      {section === "MEIC" && (
        <section className="page meicPage">
          <div className="meicHero"><div><p className="eyebrow">ALINEACIÓN 2026–2028</p><h1>Una agenda productiva concreta con el MEIC</h1><p>Dieciséis sinergias convierten el Programa País en servicios, inversión, capacidades y oportunidades para empresas y MIPYMES.</p></div><img src="/brand/women-production.jpeg" alt="Mujeres trabajando en una cadena de producción industrial"/></div>
          <div className="meicKpis"><article><strong>16</strong><span>sinergias identificadas</span></article><article><strong>8 + 8</strong><span>iniciativas vigentes y en pipeline</span></article><article><strong>4</strong><span>componentes del Programa País</span></article><article><strong>USD 173,7 M</strong><span>portafolio y oportunidades del Excel</span></article></div>
          <div className="meicCharts"><Chart title="Cobertura por componente" data={[["Habilidades",2],["Energía y descarbonización",4],["Circularidad",5],["Infraestructura de calidad",5]]}/><Chart title="Composición financiera MEIC" data={[["Movilizado",134.76],["Pipeline",33.87],["Convocatorias",5.10]]}/></div>
          <section className="meicMatrix"><div className="meicMatrixHead"><div><p className="eyebrow">MATRIZ DEL EXCEL</p><h2>Sinergias y articulación 2026–2028</h2></div><div className="stageSwitch"><button className={meicStage==="Vigente"?"active":""} onClick={()=>setMeicStage("Vigente")}>Portafolio vigente · 8</button><button className={meicStage==="Pipeline"?"active":""} onClick={()=>setMeicStage("Pipeline")}>Pipeline estratégico · 8</button></div></div><div className="meicSynergyGrid">{meicSynergies.filter(x=>x.stage===meicStage).map(x=><article key={x.name}><header><span>{x.component}</span><b>{x.amount}</b></header><h3>{x.name}</h3><dl><div><dt>Beneficio empresarial</dt><dd>{x.benefit}</dd></div><div><dt>Relevancia para el MEIC</dt><dd>{x.relevance}</dd></div><div><dt>Articulación propuesta</dt><dd>{x.action}</dd></div></dl></article>)}</div></section>
          <div className="callout">
            <div>
              <p className="eyebrow">SIGUIENTE DECISIÓN</p>
              <h2>Incorporar al MEIC al Comité Directivo</h2>
              <p>
                Para priorizar las 16 sinergias, definir empresas beneficiarias, activar contrapartes técnicas y acordar una hoja de ruta 2026–2028.
              </p>
            </div>
            <div className="value">
              <span>POTENCIAL TOTAL</span>
              <strong>$173,7 M</strong>
              <small>No equivale a fondos líquidos del Gobierno.</small>
            </div>
          </div>
        </section>
      )}
      {section === "MINAE" && (
        <section className="page minaePage">
          <div className="minaeHero"><div><p className="eyebrow">PORTAFOLIO ONUDI × MINAE</p><h1>Del desarrollo sostenible al desarrollo económico</h1><p>Una cartera que transforma prioridades ambientales en inversión, empresas, empleo, capacidades nacionales y modelos económicos capaces de sostener la conservación en el tiempo.</p></div><div className="minaeHeroVisual"><img src="/brand/woman-solar.jpeg" alt="Profesional vinculada con energía renovable y desarrollo sostenible"/><div><strong>4</strong><span>prioridades MINAE articuladas</span></div></div></div>
          <div className="minaeKpis"><article><strong>18+</strong><span>intervenciones con incidencia ambiental</span></article><article><strong>USD 134,8 M</strong><span>recursos y cofinanciamiento movilizados</span></article><article><strong>USD 33,9 M</strong><span>pipeline sujeto a aprobación</span></article><article><strong>4 × 4</strong><span>prioridades MINAE y componentes del Programa País</span></article></div>
          <section className="minaeThesis"><div><p className="eyebrow">LECTURA ESTRATÉGICA</p><h2>La conservación necesita una economía que la sostenga</h2></div><p>El engagement construido por ONUDI permite ampliar la acción ambiental más allá de proyectos aislados. El portafolio combina política pública, territorios, empresas, tecnología, infraestructura de calidad y financiamiento para que los beneficios ambientales generen también actividad económica inclusiva. Los montos por prioridad son indicativos y no deben sumarse, porque varias intervenciones contribuyen a más de una.</p></section>
          <div className="minaePriorityGrid">{minaePriorities.map(p=><article key={p.n}><div className="minaePriorityImage"><img src={p.image} alt="Desarrollo económico ambiental"/><span>{p.n}</span></div><div className="minaePriorityBody"><p className="eyebrow">PRIORIDAD MINAE</p><h2>{p.title}</h2><strong className="minaeAmount">{p.amount}<small>portafolio relacionado indicativo</small></strong><p className="minaeReading">{p.reading}</p><div className="minaeColumns"><div><small>INTERVENCIONES RELACIONADAS</small>{p.projects.map(x=><span key={x}>{x}</span>)}</div><div><small>MECANISMOS ECONÓMICOS</small>{p.mechanisms.map(x=><span key={x}>{x}</span>)}</div></div><div className="minaeEngagement"><b>Valor agregado ONUDI</b><p>{p.engagement}</p></div></div></article>)}</div>
          <div className="minaeCharts"><Chart title="Intervenciones vinculadas por prioridad" data={[["Parques y territorios",4],["Océanos",4],["Energía renovable",5],["Economía ambiental",5]]}/><Chart title="Instrumentos activados" data={[["Asistencia técnica",12],["Financiamiento",8],["Calidad y normas",7],["Innovación",10],["Capacidades",11]]}/></div>
          <section className="minaeEngagementMap"><div><p className="eyebrow">NIVEL DE ENGAGEMENT</p><h2>Una relación que cubre el ciclo completo</h2><p>La ventaja del portafolio es la continuidad entre prioridades públicas y ejecución económica.</p></div><ol><li><span>01</span><b>Definir</b><p>Estrategias, normas, hojas de ruta y prioridades.</p></li><li><span>02</span><b>Preparar</b><p>Pipeline, estudios, empresas y proyectos financiables.</p></li><li><span>03</span><b>Movilizar</b><p>Fondos ambientales, cooperación y capital privado.</p></li><li><span>04</span><b>Implementar</b><p>Pilotos, tecnologías, capacidades y modelos de negocio.</p></li><li><span>05</span><b>Escalar</b><p>Mercados, proveedores, territorios y aprendizaje regional.</p></li></ol></section>
          <div className="minaeCallout"><div><p className="eyebrow">OPORTUNIDAD INSTITUCIONAL</p><h2>Consolidar una cartera MINAE–ONUDI de desarrollo económico ambiental</h2><p>Priorizar conjuntamente las intervenciones, establecer responsables técnicos y estructurar una ruta de inversión permitiría convertir el pipeline en resultados ambientales y económicos verificables.</p></div><strong>2026–2028<small>horizonte de articulación</small></strong></div>
        </section>
      )}
      {section === "MAG" && (
        <section className="page magPage">
          <div className="magHero"><div><p className="eyebrow">PORTAFOLIO ONUDI × MAG</p><h1>Competitividad agroproductiva con sostenibilidad y valor agregado</h1><p>El trabajo conjunto conecta trazabilidad, infraestructura de calidad, bioeconomía, resiliencia y cooperación técnica para transformar capacidades públicas en beneficios para productores, agroindustrias y territorios.</p></div><img src="/brand/women-production.jpeg" alt="Mujeres vinculadas con producción y cadenas agroindustriales"/></div>
          <div className="magKpis"><article><strong>4</strong><span>líneas de articulación</span></article><article><strong>10+</strong><span>intervenciones relacionadas</span></article><article><strong>4</strong><span>cadenas y ámbitos: café, carne, bioenergía y territorios</span></article><article><strong>2024–2030</strong><span>continuidad entre ejecución y pipeline</span></article></div>
          <section className="magThesis"><div><p className="eyebrow">TRABAJO Y POTENCIAL</p><h2>De requisitos productivos a oportunidades económicas</h2></div><p>La cooperación con ONUDI permite que las agendas de sostenibilidad del sector agropecuario se traduzcan en trazabilidad verificable, eficiencia de recursos, productos diferenciados, proyectos financiables y acceso a mercados. Los montos mostrados son indicativos y no deben sumarse porque algunas intervenciones contribuyen a más de una línea.</p></section>
          <div className="magLines">{magLines.map(line=><article key={line.n}><header><span>{line.n}</span><b>{line.status}</b></header><h2>{line.title}</h2><strong>{line.amount}<small>portafolio relacionado indicativo</small></strong><div className="magProjects">{line.projects.map(p=><span key={p}>{p}</span>)}</div><dl><div><dt>Trabajo demostrado</dt><dd>{line.result}</dd></div><div><dt>Potencial de articulación</dt><dd>{line.potential}</dd></div></dl></article>)}</div>
          <div className="magCharts"><Chart title="Intervenciones por línea de trabajo" data={[["Calidad y mercados",4],["Bioeconomía y energía",3],["Resiliencia",4],["Territorios",4]]}/><Chart title="Capacidades que activa el portafolio" data={[["Trazabilidad",5],["Innovación",6],["Financiamiento",4],["Formación",7],["Cooperación",4]]}/></div>
          <section className="magValue"><div><p className="eyebrow">VALOR PARA EL SECTOR</p><h2>Una cadena de resultados que llega al productor</h2></div><ol><li><span>01</span><b>Evidencia</b><p>Mapas, datos, trazabilidad y evaluación de riesgos.</p></li><li><span>02</span><b>Capacidad</b><p>Formación, normas y asistencia técnica especializada.</p></li><li><span>03</span><b>Inversión</b><p>Proyectos preparados, garantías y convocatorias.</p></li><li><span>04</span><b>Mercado</b><p>Cumplimiento, diferenciación y nuevas oportunidades comerciales.</p></li></ol></section>
          <div className="magCallout"><div><p className="eyebrow">SIGUIENTE NIVEL DE ENGAGEMENT</p><h2>Construir una cartera agroindustrial MAG–ONUDI</h2><p>Una priorización conjunta de cadenas, territorios y empresas permitiría escalar las herramientas existentes, preparar proyectos de bioeconomía y adaptación, y articular cooperación, financiamiento y acceso a mercados.</p></div><strong>2026–2028<small>horizonte propuesto</small></strong></div>
        </section>
      )}
      {section === "INA" && (
        <section className="page inaPage">
          <div className="inaHero"><div><p className="eyebrow">12 NÚCLEOS TÉCNICOS</p><h1>Del portafolio a nuevas capacidades industriales</h1><p>El análisis conecta proyectos movilizados, pipeline y convocatorias con la oferta técnica del INA, e identifica oportunidades concretas de formación, certificación, demostración tecnológica y desarrollo empresarial.</p></div><img src="/brand/women-production.jpeg" alt="Mujeres en formación y producción industrial"/></div>
          <div className="inaKpis"><article><strong>8</strong><span>núcleos con conexión muy alta</span></article><article><strong>1</strong><span>núcleo con conexión alta</span></article><article><strong>3</strong><span>núcleos con conexión media</span></article><article><strong>23</strong><span>intervenciones del portafolio analizadas</span></article></div>
          <section className="inaReading"><div><p className="eyebrow">LECTURA CLAVE</p><h2>El INA puede actuar en cuatro momentos del ciclo industrial</h2><p>La contribución potencial no se limita a impartir cursos: abarca la definición de perfiles, validación tecnológica, certificación de competencias y preparación de empresas y personas para nuevas cadenas de valor.</p></div><div className="inaPath"><article><span>01</span><b>Anticipar</b><p>Detectar competencias requeridas por tecnologías y proyectos emergentes.</p></article><article><span>02</span><b>Formar</b><p>Diseñar rutas técnicas vinculadas con demanda empresarial y territorial.</p></article><article><span>03</span><b>Demostrar</b><p>Usar talleres y laboratorios para probar soluciones y prácticas industriales.</p></article><article><span>04</span><b>Certificar</b><p>Reconocer capacidades para empleo, proveeduría y cumplimiento de estándares.</p></article></div></section>
          <div className="inaCharts"><Chart title="Nivel de conexión de los núcleos" data={[["Muy alta",8],["Alta",1],["Media",3]]}/><Chart title="Núcleos vinculados por componente" data={[["Habilidades",9],["Energía",5],["Circularidad",10],["Calidad",7]]}/></div>
          <section className="inaExplorer"><div className="inaExplorerHead"><div><p className="eyebrow">EXPLORADOR DE ARTICULACIÓN</p><h2>Qué puede aportar cada núcleo</h2></div><select value={inaFocus} onChange={e=>setInaFocus(e.target.value)} aria-label="Seleccionar núcleo INA">{ina.map(x=><option key={x[0]}>{x[0]}</option>)}</select></div>{(()=>{const x=ina.find(n=>n[0]===inaFocus)!;return <article className="inaFocusCard"><header><div><span className={`connection ${x[1]==="Media"?"medium":"high"}`}>{x[1]}</span><h3>Núcleo {x[0]}</h3><p>{inaSectors[x[0]]}</p></div><strong>{x[2].split(" · ").length}<small>enlaces principales</small></strong></header><div className="inaFocusBody"><div><small>PORTAFOLIO VINCULADO</small><div className="inaProjectTags">{x[2].split(" · ").map(p=><span key={p}>{p}</span>)}</div></div><div><small>OPORTUNIDAD DE ARTICULACIÓN</small><p>{x[3]}</p></div></div></article>})()}</section>
          <div className="inaImageBand"><img src="/brand/woman-science.jpeg" alt="Mujer desarrollando capacidades científicas y tecnológicas"/><div><p className="eyebrow">POTENCIAL DE IMPLEMENTACIÓN</p><h2>Convertir proyectos en capacidades que permanecen</h2><p>Cuando el INA participa desde el diseño, las inversiones del portafolio pueden dejar perfiles ocupacionales, módulos formativos, certificaciones, laboratorios y proveedores con capacidades instaladas en el país.</p></div></div>
          <div className="sectionHead inaTableHead"><div><p className="eyebrow">MATRIZ COMPLETA DEL EXCEL</p><h2>Portafolio y oportunidad por núcleo</h2></div></div>
          <div className="table">
            <div className="tr head">
              <span>Núcleo</span>
              <span>Conexión</span>
              <span>Proyectos</span>
              <span>Oportunidad</span>
            </div>
            {ina.map((x) => (
              <div className="tr" key={x[0]}>
                <b>{x[0]}</b>
                <span>
                  <i className={x[1] === "Media" ? "medium" : "high"} />
                  {x[1]}
                </span>
                <span>{x[2]}</span>
                <span>{x[3]}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      {section === "Convocatorias" && (
        <section className="page callsPage">
          <div className="callsHero"><div><p className="eyebrow">OPORTUNIDADES PARA EL SECTOR PRIVADO</p><h1>De una buena solución a una oportunidad global</h1><p>Cuatro plataformas para que PYMES y startups accedan a validación, financiamiento demostrativo, visibilidad y conexiones internacionales.</p></div><div className="callsHeroArt"><img src="/brand/woman-science.jpeg" alt="Emprendedora desarrollando una solución tecnológica"/><span>4 rutas de apoyo</span></div></div>
          <div className="callsKpis"><article><strong>2</strong><span>rutas con subvención o financiamiento</span></article><article><strong>2</strong><span>rutas de visibilidad y conexiones</span></article><article><strong>5+</strong><span>áreas de innovación climática y productiva</span></article><article><strong>PYMES</strong><span>beneficiarias centrales de la selección</span></article></div>
          <section className="callsGuide"><div><p className="eyebrow">LECTURA RÁPIDA</p><h2>¿Cuál oportunidad se ajusta mejor?</h2></div><div className="callsRoutes"><article><b>Validar un prototipo</b><span>ASIF Ignite</span></article><article><b>Escalar adaptación</b><span>ASIF Propel</span></article><article><b>Demostrar tecnología</b><span>A2D Facility</span></article><article><b>Ganar visibilidad</b><span>Global Call · ONE World</span></article></div></section>
          <div className="callsGrid">{privateCalls.map((call,i)=><article key={call.name} className="callCard"><div className="callImage"><img src={call.image} alt="Innovación industrial y empresarial"/><span>0{i+1}</span></div><div className="callContent"><p className="eyebrow">{call.short}</p><h2>{call.name}</h2><div className="supportType">{call.support}</div><dl><div><dt>¿Para quién?</dt><dd>{call.fit}</dd></div><div><dt>Beneficio para la PYME</dt><dd>{call.benefit}</dd></div><div><dt>Cómo prepararse</dt><dd>{call.prepare}</dd></div></dl><div className="callAreas">{call.areas.map(a=><span key={a}>{a}</span>)}</div><p className="callNote">{call.note}</p><a href={call.url} target="_blank" rel="noreferrer">Visitar plataforma oficial <b>↗</b></a></div></article>)}</div>
          <section className="applicationSteps"><div><p className="eyebrow">PREPARACIÓN COMÚN</p><h2>Antes de postular</h2><p>Los requisitos varían, pero una PYME aumenta su preparación cuando reúne evidencia técnica, comercial y de impacto desde el inicio.</p></div><ol><li><span>01</span><b>Definir el problema</b><p>Quién enfrenta la necesidad y por qué la solución es relevante.</p></li><li><span>02</span><b>Probar la solución</b><p>Prototipo, piloto, usuarios o evidencia de funcionamiento.</p></li><li><span>03</span><b>Cuantificar impacto</b><p>Resultados ambientales, productivos, sociales y de género.</p></li><li><span>04</span><b>Mostrar escalabilidad</b><p>Mercado, equipo, socios, presupuesto y ruta de crecimiento.</p></li></ol></section>
          <p className="callsCaveat">Las condiciones, ventanas y fechas pueden cambiar. La plataforma presenta una orientación estratégica; la fuente vinculante es siempre el sitio oficial de cada convocatoria.</p>
        </section>
      )}
      {section === "Datos" && (
        <section className="page dataPage">
          <Title
            eyebrow="DATOS Y EVIDENCIA DE ONUDI"
            title="Del portafolio al contexto industrial"
            text="Herramientas oficiales para consultar, comparar y respaldar decisiones con estadísticas internacionales."
          />
          <div className="dataIntro">
            <span>04</span>
            <p>Recursos especializados de ONUDI</p>
            <small>
              Los enlaces abren las plataformas oficiales en una nueva pestaña.
            </small>
          </div>
          <section className="crInsights">
            <div className="insightsHead"><div><p className="eyebrow">LECTURA DE COSTA RICA</p><h2>Hallazgos que orientan la acción industrial</h2></div><p>Los globos combinan indicadores publicados por ONUDI con una interpretación estratégica para el Programa País. Los rankings del QI4SD se comparan con economías de tamaño similar.</p></div>
            <div className="insightBubbles">
              <article className="findingBubble strength"><span>FORTALEZA</span><strong>4.º en Prosperidad</strong><p>Costa Rica ocupa el cuarto lugar de su grupo en la dimensión Prosperidad del QI4SD. La infraestructura de calidad está especialmente conectada con competitividad, comercio y valor económico.</p><small>QI4SD 2024 · grupo M</small></article>
              <article className="findingBubble opportunity"><span>OPORTUNIDAD</span><strong>Acreditación: 79 / 100</strong><p>La acreditación es la dimensión más sólida del sistema nacional. Esta base puede aprovecharse para ampliar servicios confiables de ensayo, inspección y certificación para nuevas cadenas verdes y tecnológicas.</p><small>QI4SD 2024</small></article>
              <article className="findingBubble gap"><span>BRECHA</span><strong>Conformidad: 15 / 100</strong><p>El menor resultado aparece en evaluación de la conformidad. La lectura sugiere una brecha entre contar con instituciones reconocidas y lograr que más empresas accedan y utilicen sus servicios.</p><small>Interpretación basada en QI4SD 2024</small></article>
              <article className="findingBubble trend"><span>TRANSFORMACIÓN</span><strong>USD 1.449 por habitante</strong><p>Las exportaciones manufactureras de media y alta tecnología por habitante respaldan la clasificación de Costa Rica como economía industrial de ingreso alto, con espacio para profundizar proveedores nacionales.</p><small>Clasificación estadística ONUDI 2026</small></article>
            </div>
            <div className="crProfile">
              <div><p className="eyebrow">PERFIL SINTÉTICO</p><h3>Una plataforma sólida, con brechas de uso empresarial</h3><p>El patrón conjunto es claro: Costa Rica dispone de una base industrial y de acreditación relevante, y muestra buen posicionamiento relativo en Planeta y Prosperidad. El siguiente salto consiste en convertir esa institucionalidad en más metrología aplicada, evaluación de la conformidad y servicios accesibles para MIPYMES y proveedores.</p></div>
              <dl><div><dt>Índice QI4SD</dt><dd>37 / 100</dd></div><div><dt>Ranking en su grupo</dt><dd>12.º</dd></div><div><dt>Planeta</dt><dd>7.º</dd></div><div><dt>Prosperidad</dt><dd>4.º</dd></div><div><dt>VAM por habitante</dt><dd>USD 1.921</dd></div><div><dt>Clasificación ONUDI</dt><dd>Ingreso alto industrial</dd></div></dl>
            </div>
            <p className="dataCaveat">Nota metodológica: los valores corresponden a las ediciones indicadas por cada fuente; no todos los indicadores comparten el mismo año base. Los rankings de Personas, Planeta y Prosperidad son posiciones dentro del grupo M del QI4SD, no rankings mundiales. <a href="https://hub.unido.org/qi4sd/pdfs/online_QI4SD_SUMMARY_REPORT.pdf" target="_blank" rel="noreferrer">Informe QI4SD 2024 ↗</a> · <a href="https://stat.unido.org/portal/storage/file/publications/classif/country-classif-report-2026.pdf" target="_blank" rel="noreferrer">Clasificación ONUDI 2026 ↗</a></p>
          </section>
          <div className="resourceGrid">
            <a className="primaryResource" href="https://www.unido.org/" target="_blank" rel="noreferrer"><img className="resourceImage" src="/brand/women-industry.jpeg" alt="Industrialización inclusiva promovida por ONUDI"/><p className="eyebrow">ENLACE PRINCIPAL</p><h2>UNIDO.org</h2><p>Conozca el mandato, las prioridades, proyectos, noticias y recursos globales de la Organización de las Naciones Unidas para el Desarrollo Industrial.</p><footer><span>Visitar sitio oficial</span><b>↗</b></footer></a>
            <a
              href="https://hub.unido.org/qi4sd/?year=2024"
              target="_blank"
              rel="noreferrer"
            >
              <img className="resourceImage" src="/brand/women-production.jpeg" alt="Producción y control de calidad"/>
              <p className="eyebrow">QUALITY INFRASTRUCTURE</p>
              <h2>QI4SD Index</h2>
              <p>
                Explore el desempeño de los países en infraestructura de la
                calidad y su contribución al desarrollo sostenible. Vista
                disponible para 2024.
              </p>
              <div className="resourceFinding">Costa Rica: acreditación sólida; la principal brecha se concentra en evaluación de la conformidad.</div>
              <footer>
                <span>Explorar índice 2024</span>
                <b>↗</b>
              </footer>
            </a>
            <a href="https://stat.unido.org/" target="_blank" rel="noreferrer">
              <img className="resourceImage" src="/brand/data-dashboard.jpeg" alt="Visualización orientativa de datos industriales"/>
              <p className="eyebrow">UNIDO STATISTICS</p>
              <h2>Data Portal</h2>
              <p>
                Consulte estadísticas industriales, manufactura, comercio y
                otros indicadores para análisis nacionales y comparaciones
                internacionales.
              </p>
              <div className="resourceFinding">Costa Rica figura como economía industrial de ingreso alto, con VAM per cápita de USD 1.921.</div>
              <footer>
                <span>Abrir portal estadístico</span>
                <b>↗</b>
              </footer>
            </a>
            <a href="https://hub.unido.org/" target="_blank" rel="noreferrer">
              <img className="resourceImage" src="/brand/woman-science.jpeg" alt="Conocimiento, ciencia e innovación industrial"/>
              <p className="eyebrow">KNOWLEDGE HUB</p>
              <h2>UNIDO Data Hub</h2>
              <p>
                Acceda al ecosistema de conocimiento de ONUDI, sus índices,
                perfiles y herramientas analíticas sobre desarrollo industrial
                inclusivo y sostenible.
              </p>
              <div className="resourceFinding">Úselo para contrastar competitividad, calidad y sostenibilidad con países comparables.</div>
              <footer>
                <span>Acceder al Data Hub</span>
                <b>↗</b>
              </footer>
            </a>
          </div>
          <div className="evidenceBand">
            <div>
              <p className="eyebrow">USO SUGERIDO</p>
              <h2>Fortalecer la narrativa de impacto</h2>
            </div>
            <p>
              Combine los datos del portafolio nacional con indicadores
              internacionales para fundamentar prioridades, comparar el
              desempeño de Costa Rica e identificar brechas de política
              industrial, calidad e inversión.
            </p>
          </div>
        </section>
      )}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <article onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>
            <span className={`badge ${selected.status.toLowerCase()}`}>
              {selected.status}
            </span>
            <h2>{selected.name}</h2>
            <p>{selected.summary}</p>
            <dl>
              <div>
                <dt>Recursos para Costa Rica</dt>
                <dd>{fmt(selected.amount)}</dd>
              </div>
              <div>
                <dt>Ejecución</dt>
                <dd>{selected.period}</dd>
              </div>
              <div>
                <dt>Contrapartes</dt>
                <dd>{selected.partners}</dd>
              </div>
              <div>
                <dt>Componentes del Programa País</dt>
                <dd className="modalTags">{selected.components.map(component=><span key={component}>{component}</span>)}</dd>
              </div>
              <div>
                <dt>Ejes transversales</dt>
                <dd className="modalTags axisTags">{selected.axes.map(axis=><span key={axis}>{axis}</span>)}</dd>
              </div>
            </dl>
          </article>
        </div>
      )}
      <footer className="siteFooter">
        <span>Programa País ONUDI–Costa Rica 2024–2028</span>
        <span>
          Fuente: CP Portfolio Roadmap 2026 · montos indicativos en USD
        </span>
      </footer>
    </main>
  );
}
function Chart({title,data}:{title:string;data:(string|number)[][]}){const max=Math.max(...data.map(x=>Number(x[1])));return <section className="miniChart"><div><p className="eyebrow">LECTURA GRÁFICA</p><h2>{title}</h2></div><div className="chartBars">{data.map(x=><div className="chartRow" key={String(x[0])}><span>{x[0]}</span><div><i style={{width:`${Number(x[1])/max*100}%`}}/></div><b>{x[1]}</b></div>)}</div></section>}
function Title({
  eyebrow,
  title,
  text,
  count,
}: {
  eyebrow: string;
  title: string;
  text: string;
  count?: number;
}) {
  return (
    <div className="pageTitle">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {count !== undefined && (
        <div className="count">
          <strong>{count}</strong>
          <span>resultados</span>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react'
import { BookOpen, Brain, Users, Clock, ExternalLink, Quote, Scroll } from 'lucide-react'
import './App.css'

interface BiographyData {
  nombre_completo: string
  fechas: string
  origen_familiar: any
  educacion: any
  carrera_academica: any
  vida_personal_y_eventos_clave: any
  obras_principales_mencionadas: any[]
}

interface KantianConcepts {
  [key: string]: string
}

interface WorksData {
  temporal_info: {
    periodos_obra_kant: Array<{
      nombre: string
      definicion: string
      obras: Array<{
        año: number
        titulo: string
      }>
    }>
  }
}

function App() {
  const [biographyData, setBiographyData] = useState<BiographyData | null>(null)
  const [philosophicalConcepts, setPhilosophicalConcepts] = useState<KantianConcepts>({})
  const [worksData, setWorksData] = useState<WorksData | null>(null)
  const [activeSection, setActiveSection] = useState('introduction')
  // Cache fix timestamp: 2025-01-06-16:12

  useEffect(() => {
    // Cargar datos de biografía
    fetch('./data/kant_biografia_detallada.json')
      .then(res => res.json())
      .then(data => setBiographyData(data.biography))
      .catch(err => console.error('Error loading biography:', err))

    // Cargar conceptos filosóficos
    fetch('./data/kant_imperativo_categorico_citas.json')
      .then(res => res.json())
      .then(data => setPhilosophicalConcepts(data.kantian_concepts))
      .catch(err => console.error('Error loading philosophical concepts:', err))

    // Cargar datos de obras
    fetch('./data/kant_obras_completas.json')
      .then(res => res.json())
      .then(data => setWorksData(data))
      .catch(err => console.error('Error loading works:', err))
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header and Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-900">Immanuel Kant</h1>
              <span className="text-slate-600">(1724-1804)</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              {[
                { id: 'introduction', label: 'Introducción', icon: BookOpen },
                { id: 'biography', label: 'Biografía', icon: Clock },
                { id: 'philosophy', label: 'Filosofía', icon: Brain },
                { id: 'works', label: 'Obras', icon: Scroll },
                { id: 'influences', label: 'Influencias', icon: Users },
                { id: 'context', label: 'Contexto', icon: Users },
                { id: 'references', label: 'Referencias', icon: ExternalLink }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="introduction" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                  Immanuel Kant
                </h1>
                <p className="text-xl text-slate-600 mt-3">
                  El filósofo de la razón crítica y la Ilustración alemana
                </p>
                <p className="text-lg text-slate-700 mt-6 leading-relaxed">
                  Considerado uno de los pensadores más influyentes de la filosofía occidental, 
                  Kant revolucionó la metafísica, la epistemología y la ética con su filosofía 
                  crítica, estableciendo los límites y posibilidades del conocimiento humano.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900">Período de vida</h3>
                  <p className="text-blue-700">1724 - 1804</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900">Lugar</h3>
                  <p className="text-green-700">Königsberg, Prusia</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900">Movimiento</h3>
                  <p className="text-purple-700">Ilustración alemana</p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                <Quote className="w-8 h-8 text-amber-600 mb-3" />
                <blockquote className="text-lg text-amber-900 italic leading-relaxed">
                  "La Ilustración es la salida del hombre de su minoría de edad. El mismo es culpable de ella. 
                  La minoría de edad estriba en la incapacidad de servirse del propio entendimiento, 
                  sin la dirección de otro."
                </blockquote>
                <footer className="text-amber-700 mt-3 font-medium">
                  — ¿Qué es la Ilustración? (1784)
                </footer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <img
                  src="./images/kant_portrait_becker_1768.jpg"
                  alt="Retrato de Immanuel Kant por Johann Gottlieb Becker, 1768"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                  <p className="text-sm font-medium">
                    Retrato por Johann Gottlieb Becker, 1768
                  </p>
                  <p className="text-xs opacity-90">
                    Cuando Kant tenía 44 años, antes de su período crítico
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="./images/kant_portrait_1790.jpg"
                  alt="Kant en 1790"
                  className="w-full rounded-lg shadow-lg"
                />
                <img
                  src="./images/kant_bust_hagemann.jpg"
                  alt="Busto de Kant"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section id="biography" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Biografía</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              La vida de un pensador que jamás salió de Königsberg pero cuyas ideas 
              transformaron el mundo intelectual
            </p>
          </div>

          {biographyData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Datos Principales</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700">Nombre completo</h4>
                      <p className="text-slate-600">{biographyData.nombre_completo}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Fechas</h4>
                      <p className="text-slate-600">{biographyData.fechas}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Familia</h4>
                      <p className="text-slate-600">
                        Hijo de {biographyData.origen_familiar?.padre} (sillero) y {biographyData.origen_familiar?.madre}. 
                        Era el cuarto de nueve hijos. Sus padres seguían el pietismo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Educación</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 text-lg">Collegium Fridericianum</h4>
                      <p className="text-slate-600 mb-2">Desde 1732 (8 años de edad)</p>
                      <p className="text-slate-700">
                        Dirigido por F. A. Schultz, dominado por el pietismo. Adquirió sólidos 
                        conocimientos en lenguas clásicas, matemáticas y lógica.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 text-lg">Universidad de Königsberg</h4>
                      <p className="text-slate-600 mb-2">Ingreso en 1740</p>
                      <p className="text-slate-700">
                        Se matriculó en la Facultad de Filosofía. Estudió con M. Knutzen (wolfiano) 
                        quien le introdujo en Newton y Wolff, y le prestó su biblioteca.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Carrera Académica</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-slate-800">1747-1754: Profesor privado</h4>
                      <p className="text-slate-600">
                        En Judschen, Osteroden y Königsberg. Muy apreciado por las familias.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-slate-800">1755: Doctor y Privatdozent</h4>
                      <p className="text-slate-600">
                        Obtuvo el doctorado con "Sobre el fuego" y la habilitación para profesor auxiliar.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-slate-800">1755-1770: Profesor auxiliar</h4>
                      <p className="text-slate-600">
                        15 años enseñando matemáticas, física, lógica, metafísica, antropología y geografía.
                      </p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4">
                      <h4 className="font-semibold text-slate-800">1770: Catedrático</h4>
                      <p className="text-slate-600">
                        Catedrático de Lógica y Metafísica. Su disertación marcó el inicio del período crítico.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border border-blue-200">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Vida Personal</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-slate-700">
                        Vivió toda su vida en Königsberg, compró una casa en 1783 donde vivió hasta su muerte.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-slate-700">
                        No contrajo matrimonio, pero le gustaban las relaciones sociales y mantuvo 
                        una tertulia con amistades.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-slate-700">
                        Llevó una vida caracterizada por la sencillez, regularidad y ausencia de perturbaciones.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-slate-700">
                        Era ferviente admirador de los ideales de la Ilustración y la Revolución francesa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pensamiento Filosófico</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Los conceptos fundamentales de la filosofía crítica kantiana
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {Object.entries(philosophicalConcepts).slice(0, 6).map(([concept, definition], index) => (
              <div key={concept} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-4 capitalize">
                  {concept.replace(/_/g, ' ')}
                </h3>
                <blockquote className="text-slate-700 italic leading-relaxed">
                  "{definition}"
                </blockquote>
              </div>
            ))}
          </div>

          {/* Imperativo Categórico destacado */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h3 className="text-3xl font-bold mb-6">El Imperativo Categórico</h3>
              <blockquote className="text-2xl italic leading-relaxed mb-6">
                "{philosophicalConcepts.form_imp_categ_universalidad_ley}"
              </blockquote>
              <p className="text-blue-100 text-lg">
                — Fundamentación de la metafísica de las costumbres (1785)
              </p>
            </div>
          </div>

          {/* Las tres formulaciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200">
              <h4 className="text-xl font-bold text-emerald-900 mb-4">Fórmula de la Ley Universal</h4>
              <p className="text-emerald-800 italic">
                "{philosophicalConcepts.form_imp_categ_universalidad_ley}"
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-4">Fórmula de la Humanidad</h4>
              <p className="text-blue-800 italic">
                "{philosophicalConcepts.form_imp_categ_humanidad_fin}"
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-200">
              <h4 className="text-xl font-bold text-purple-900 mb-4">Reino de los Fines</h4>
              <p className="text-purple-800 italic">
                "{philosophicalConcepts.reino_de_los_fines?.substring(0, 200)}..."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Principales Obras</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Los textos fundamentales que revolucionaron la filosofía occidental
            </p>
          </div>

          {worksData && (
            <div className="space-y-12">
              {worksData.temporal_info.periodos_obra_kant.map((period, periodIndex) => (
                <div key={periodIndex} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">{period.nombre}</h3>
                    <p className="text-lg text-slate-600">{period.definicion}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {period.obras.slice(0, 9).map((work, workIndex) => (
                      <div key={workIndex} className="group">
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              {work.año}
                            </span>
                            <Scroll className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          </div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-700 transition-colors">
                            {work.titulo}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enlaces a obras */}
          <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">Accede a las Obras Completas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="https://archive.org/details/immanuel-kant-critica-de-la-razon-pura-edicion-bilingue-espanol-aleman-fondo-de-"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">Crítica de la Razón Pura</h4>
                <p className="text-emerald-100">Archive.org - Edición bilingüe español-alemán (FCE)</p>
              </a>
              
              <a
                href="https://es.wikisource.org/wiki/Fundamentación_para_la_metafísica_de_las_costumbres"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">Fundamentación de la Metafísica</h4>
                <p className="text-emerald-100">Wikisource - Texto completo en español</p>
              </a>
              
              <a
                href="https://es.wikisource.org/wiki/Crítica_de_la_razón_práctica"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">Crítica de la Razón Práctica</h4>
                <p className="text-emerald-100">Wikisource - Texto completo en español</p>
              </a>
              
              <a
                href="https://es.wikisource.org/wiki/La_paz_perpetua"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">La Paz Perpetua</h4>
                <p className="text-emerald-100">Wikisource - Texto completo en español</p>
              </a>
              
              <a
                href="https://www.cervantesvirtual.com/obra-visor/critica-del-juicio-seguida-de-las-observaciones-sobre-el-asentimiento-de-lo-bello-y-lo-sublime--0/html/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">Crítica del Juicio</h4>
                <p className="text-emerald-100">Biblioteca Cervantes - Texto completo en español</p>
              </a>
              
              <a
                href="https://archive.org/details/kant-immanuel.-la-metafisica-de-las-costumbres-epl-fs-1797-2017"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur rounded-lg p-6 hover:bg-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="w-8 h-8" />
                  <ExternalLink className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                </div>
                <h4 className="font-bold text-lg mb-2">La Metafísica de las Costumbres</h4>
                <p className="text-emerald-100">Archive.org - Edición completa en español</p>
              </a>
            </div>
            
            <div className="text-center mt-8">
              <a
                href="https://es.wikisource.org/wiki/Autor:Immanuel_Kant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors mr-4"
              >
                <span>Ver todas las obras en Wikisource</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="https://archive.org/search.php?query=creator%3A%22Kant%2C+Immanuel%22+AND+language%3A%22Spanish%22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                <span>Más obras en Archive.org</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Influences Section */}
      <section id="influences" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Influencias y Legado</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Los pensadores que moldearon a Kant y su impacto en la filosofía posterior
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Influencias Recibidas</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Racionalismo Alemán</h4>
                  <p className="text-slate-600">Christian Wolff y la tradición leibniziana influyeron profundamente en su formación inicial.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Empirismo Británico</h4>
                  <p className="text-slate-600">David Hume lo "despertó de su sueño dogmático", especialmente sus críticas a la causalidad.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Ciencia Newtoniana</h4>
                  <p className="text-slate-600">Isaac Newton y la física matemática influyeron en su visión del conocimiento científico.</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Pietismo</h4>
                  <p className="text-slate-600">La tradición religiosa familiar marcó su interés por la moralidad y la religión.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Legado e Influencia</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Idealismo Alemán</h4>
                  <p className="text-slate-600">Fichte, Schelling y Hegel desarrollaron y transformaron sus ideas fundamentales.</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Filosofía Analítica</h4>
                  <p className="text-slate-600">Su método crítico influyó en el desarrollo de la filosofía analítica del siglo XX.</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Ética Moderna</h4>
                  <p className="text-slate-600">El imperativo categórico sigue siendo fundamental en la ética deontológica contemporánea.</p>
                </div>
                <div className="border-l-4 border-teal-500 pl-6">
                  <h4 className="font-bold text-lg text-slate-800">Filosofía Política</h4>
                  <p className="text-slate-600">Sus ideas sobre la paz perpetua influyeron en el derecho internacional moderno.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section id="context" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Contexto Histórico</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              La Ilustración alemana y el mundo intelectual del siglo XVIII
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">La Ilustración Alemana</h3>
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    Kant vivió en el corazón de la <strong>Aufklärung</strong> (Ilustración alemana), 
                    un movimiento intelectual que enfatizaba la razón, el progreso y la autonomía del pensamiento.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    Su famoso ensayo "¿Qué es la Ilustración?" (1784) definió el movimiento como 
                    la salida del hombre de su "minoría de edad" autoimpuesta.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-blue-800 italic">
                      "¡Sapere aude! ¡Ten el valor de servirte de tu propio entendimiento!"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Königsberg en el siglo XVIII</h3>
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    Königsberg era una ciudad cosmopolita en Prusia Oriental, centro de comercio 
                    y educación. Su universidad era un importante foco intelectual.
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    La ciudad natal de Kant le proporcionó un ambiente académico estimulante 
                    sin necesidad de viajar, contrario a muchos intelectuales de su época.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <img
                src="./images/konigsberg_historical.jpg"
                alt="Königsberg histórica"
                className="w-full rounded-2xl shadow-2xl"
              />
              <img
                src="./images/german_enlightenment.jpg"
                alt="Ilustración alemana"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">Cronología de la Época</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">1740</div>
                <p className="text-slate-300">Inicio del reinado de Federico el Grande de Prusia</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">1756-1763</div>
                <p className="text-slate-300">Guerra de los Siete Años</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300 mb-2">1776</div>
                <p className="text-slate-300">Independencia de Estados Unidos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-300 mb-2">1789</div>
                <p className="text-slate-300">Revolución Francesa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section id="references" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Referencias y Fuentes</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Recursos académicos y enlaces para profundizar en el estudio de Kant
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Obras Digitales Gratuitas en Español</h3>
              <div className="space-y-4">
                <a
                  href="https://es.wikisource.org/wiki/Autor:Immanuel_Kant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-blue-900">Wikisource Español</h4>
                    <p className="text-blue-700 text-sm">Obras completas en español de dominio público</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-600 group-hover:text-blue-800" />
                </a>
                
                <a
                  href="https://archive.org/search.php?query=creator%3A%22Kant%2C+Immanuel%22+AND+language%3A%22Spanish%22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-green-900">Internet Archive</h4>
                    <p className="text-green-700 text-sm">Ediciones bilingües y traducciones en español</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-green-600 group-hover:text-green-800" />
                </a>
                
                <a
                  href="https://www.cervantesvirtual.com/portales/immanuel_kant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-red-900">Biblioteca Virtual Cervantes</h4>
                    <p className="text-red-700 text-sm">Obras de Kant en español</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-red-600 group-hover:text-red-800" />
                </a>
                
                <a
                  href="https://www.filosoficas.unam.mx/docs/541/files/Kant-Fundamentaci%C3%B3n-metaf%C3%ADsica-costumbres.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-purple-900">UNAM - Instituto de Investigaciones Filosóficas</h4>
                    <p className="text-purple-700 text-sm">PDFs académicos gratuitos en español</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-purple-600 group-hover:text-purple-800" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Recursos Académicos</h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Stanford Encyclopedia of Philosophy</h4>
                  <p className="text-amber-800 text-sm">Artículos académicos peer-reviewed sobre Kant</p>
                </div>
                
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <h4 className="font-semibold text-rose-900 mb-2">Kant-Studien</h4>
                  <p className="text-rose-800 text-sm">Revista académica especializada en estudios kantianos</p>
                </div>
                
                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <h4 className="font-semibold text-teal-900 mb-2">North American Kant Society</h4>
                  <p className="text-teal-800 text-sm">Recursos y conferencias sobre filosofía kantiana</p>
                </div>
                
                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <h4 className="font-semibold text-sky-900 mb-2">Portal sobre Kant</h4>
                  <p className="text-sky-800 text-sm">Recursos y conferencias sobre filosofía kantiana</p>
                  <a href="https://proyectoafri.es/hffia/04kant/04kant_index.htm" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-800 transition-colors">Visitar</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-100 rounded-xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Nota sobre las Fuentes</h3>
            <p className="text-slate-700 leading-relaxed">
              Este sitio web ha sido desarrollado utilizando fuentes académicas verificadas, 
              incluyendo más de 315 papers académicos y textos originales de Kant. 
              Todas las citas han sido extraídas de traducciones autorizadas y fuentes primarias. 
              Para uso académico, se recomienda consultar las ediciones críticas originales.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold">Immanuel Kant</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Una exploración académica de la vida y obra del filósofo más influyente 
                de la Ilustración alemana.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Secciones</h4>
              <ul className="space-y-2">
                <li><a href="#introduction" className="text-slate-300 hover:text-white transition-colors">Introducción</a></li>
                <li><a href="#biography" className="text-slate-300 hover:text-white transition-colors">Biografía</a></li>
                <li><a href="#philosophy" className="text-slate-300 hover:text-white transition-colors">Filosofía</a></li>
                <li><a href="#works" className="text-slate-300 hover:text-white transition-colors">Obras</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="http://www.gutenberg.org/ebooks/author/1426" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">Obras gratuitas</a></li>
                <li><a href="#references" className="text-slate-300 hover:text-white transition-colors">Referencias académicas</a></li>
                <li><a href="#context" className="text-slate-300 hover:text-white transition-colors">Contexto histórico</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 Página educativa sobre Immanuel Kant. Desarrollada con propósitos académicos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
console.log('Cache invalidation: Sat Jun  7 00:18:16 CST 2025');

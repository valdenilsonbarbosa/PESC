import { useEffect, useState } from 'react'
import {
  Sparkle,
  Compass,
  Rocket,
  Satellite,
  Moon,
  Sun,
  Stars,
  Globe,
  BookOpen,
  Laptop,
  X,
  Check,
} from 'lucide-react'
export function TabContent({ activeTab }: { activeTab: string }) {
  const [isClient, setIsClient] = useState(false)
  const [moonPhase, setMoonPhase] = useState(0)
  const [issPosition, setIssPosition] = useState({
    lat: 0,
    lng: 0,
  })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [quizResult, setQuizResult] = useState<boolean | null>(null)
  useEffect(() => {
    setIsClient(true)
    // Easter egg: Black hole that follows cursor
    const blackHole = document.getElementById('black-hole')
    if (blackHole) {
      const handleMouseMove = (e: MouseEvent) => {
        // Random chance to activate black hole
        if (Math.random() < 0.001) {
          blackHole.style.display = 'block'
          blackHole.style.left = `${e.clientX}px`
          blackHole.style.top = `${e.clientY}px`
          setTimeout(() => {
            blackHole.style.display = 'none'
          }, 3000)
        }
      }
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  // Simulate moon phase changes
  useEffect(() => {
    if (activeTab === 'atividades') {
      const interval = setInterval(() => {
        setMoonPhase((prev) => (prev >= 1 ? 0 : prev + 0.01))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [activeTab])
  // Simulate ISS position updates
  useEffect(() => {
    if (activeTab === 'conteudo') {
      const interval = setInterval(() => {
        setIssPosition({
          lat: Math.random() * 180 - 90,
          lng: Math.random() * 360 - 180,
        })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [activeTab])
  // Handle quiz submission
  const handleQuizSubmit = () => {
    setQuizResult(quizAnswer === 'opt2') // Correct answer is "Remanescente de supernova"
  }
  // Image lightbox/modal
  const ImageModal = () => {
    if (!selectedImage) return null
    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-[#00FF9D] transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedImage(null)
          }}
        >
          <X size={24} />
        </button>
        <img
          src={selectedImage}
          alt="Enlarged view"
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    )
  }
  const renderContent = () => {
    switch (activeTab) {
      case 'conteudo':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#E0E0E0] mb-8 text-glow">
              Exploração do Cosmos
            </h2>
            {/* Live Celestial Events */}
            <div className="mb-8 cosmic-card p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#00FF9D] mb-4">
                Eventos Celestes em Tempo Real
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#000000]/60 p-4 rounded-lg border border-[#E0E0E0]/10">
                  <div className="flex items-center mb-2">
                    <Satellite className="w-5 h-5 text-[#00FF9D] mr-2" />
                    <h4 className="text-lg font-bold text-[#E0E0E0]">
                      Rastreador da ISS
                    </h4>
                  </div>
                  <p className="text-[#E0E0E0]/80 mb-2">Posição atual:</p>
                  <div className="bg-[#0A1A2F] p-3 rounded-lg text-sm">
                    <p>Latitude: {issPosition.lat.toFixed(2)}°</p>
                    <p>Longitude: {issPosition.lng.toFixed(2)}°</p>
                    <p className="text-[#00FF9D] text-xs mt-2">
                      Atualizado agora
                    </p>
                  </div>
                </div>
                <div className="bg-[#000000]/60 p-4 rounded-lg border border-[#E0E0E0]/10">
                  <div className="flex items-center mb-2">
                    <Stars className="w-5 h-5 text-[#00FF9D] mr-2" />
                    <h4 className="text-lg font-bold text-[#E0E0E0]">
                      Chuvas de Meteoros
                    </h4>
                  </div>
                  <p className="text-[#E0E0E0]/80 mb-1">Próximos eventos:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Perseidas</span>
                      <span className="text-[#00FF9D]">12-13 Ago</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Leonidas</span>
                      <span className="text-[#00FF9D]">17-18 Nov</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Geminidas</span>
                      <span className="text-[#00FF9D]">13-14 Dez</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#000000]/60 p-4 rounded-lg border border-[#E0E0E0]/10">
                  <div className="flex items-center mb-2">
                    <Sun className="w-5 h-5 text-[#FF6D00] mr-2" />
                    <h4 className="text-lg font-bold text-[#E0E0E0]">
                      Atividade Solar
                    </h4>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#E0E0E0]/80">Índice de flare:</span>
                    <span className="text-[#FF6D00] font-bold">Moderado</span>
                  </div>
                  <div className="h-2 bg-[#0A1A2F] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00FF9D] to-[#FF6D00] w-[60%]"></div>
                  </div>
                  <p className="text-xs mt-2 text-[#E0E0E0]/60">
                    Fonte: Dados NOAA/NASA
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="cosmic-card p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614642240262-a452c2c11724?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity"></div>
                <h3 className="text-2xl font-bold text-[#00FF9D] mb-6 relative z-10">
                  Sistema Solar
                </h3>
                <ul className="space-y-6 text-[#E0E0E0] relative z-10">
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Estrutura Orbital
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Análise das órbitas planetárias, pontos de Lagrange e
                      dinâmica gravitacional do sistema solar. Estudo das
                      ressonâncias orbitais e sua influência na estabilidade do
                      sistema.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Formação Planetária
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Processo de acreção do disco protoplanetário,
                      diferenciação planetária e evolução dos corpos celestes.
                      Estudo da linha de gelo e sua influência na composição
                      planetária.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Cinturões e Regiões
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Exploração do Cinturão de Asteroides, Cinturão de Kuiper e
                      Nuvem de Oort. Análise da distribuição de massa e
                      composição dos objetos transnetunianos.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="cosmic-card p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532693322450-2cb5c511067d?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity"></div>
                <h3 className="text-2xl font-bold text-[#00FF9D] mb-6 relative z-10">
                  Fenômenos Celestes
                </h3>
                <ul className="space-y-6 text-[#E0E0E0] relative z-10">
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Mecânica Lunar
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Estudo detalhado da órbita lunar, librações e sua
                      influência nas marés terrestres. Análise dos ciclos de
                      Saros e previsão de eclipses.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Eventos Astronômicos
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Conjunções planetárias, trânsitos, ocultações e fenômenos
                      atmosféricos. Impacto da atividade solar no clima
                      espacial.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Exploração Espacial
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      História e futuro da exploração espacial, missões
                      robóticas e tecnologias de observação astronômica.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="cosmic-card p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity"></div>
                <h3 className="text-2xl font-bold text-[#00FF9D] mb-6 relative z-10">
                  Astrofísica Fundamental
                </h3>
                <ul className="space-y-6 text-[#E0E0E0] relative z-10">
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Evolução Estelar
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Ciclo de vida das estrelas, nucleossíntese e classificação
                      espectral. Formação de elementos químicos no universo.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Estrutura Galáctica
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Composição da Via Láctea, distribuição de matéria escura e
                      dinâmica galáctica.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="cosmic-card p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://uploadthingy.s3.us-west-1.amazonaws.com/j1xDaMLb9yjPG5iry1TPUc/SisitemSolar.png')] bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity"></div>
                <h3 className="text-2xl font-bold text-[#00FF9D] mb-6 relative z-10">
                  Cosmologia Moderna
                </h3>
                <ul className="space-y-6 text-[#E0E0E0] relative z-10">
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Estrutura do Universo
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Teoria do Big Bang, expansão do universo e formação de
                      estruturas cósmicas.
                    </p>
                  </li>
                  <li className="space-y-2">
                    <strong className="block text-[#00FF9D]">
                      Fenômenos Extremos
                    </strong>
                    <p className="text-[#E0E0E0]/90">
                      Buracos negros, ondas gravitacionais e energia escura.
                      Fronteiras da física moderna.
                    </p>
                    <div className="mt-4 bg-[#000000]/60 p-3 rounded border border-[#E0E0E0]/10">
                      <h4 className="text-sm font-bold text-[#00FF9D] mb-2">
                        Simulação: Colapso Gravitacional
                      </h4>
                      <div className="aspect-video bg-[#000000] rounded relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6D00] to-[#000000] animate-pulse"></div>
                          <div className="absolute w-40 h-40 border-2 border-[#E0E0E0]/10 rounded-full animate-pulse"></div>
                          <div className="absolute w-64 h-64 border border-[#E0E0E0]/5 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-xs text-[#E0E0E0]/60 mt-2">
                        Simulação interativa - Clique para iniciar
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'atividades':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#E0E0E0] mb-8 text-glow">
              Laboratórios Virtuais de Astronomia
            </h2>
                       {/* Download Resources Section - New Addition */}
                       <div className="cosmic-card p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-[#00FF9D] mb-4 flex items-center">
                <BookOpen className="mr-2 h-6 w-6" /> Recursos para Download
              </h3>
              <p className="text-[#E0E0E0]/90 mb-6">
                Baixe nosso guia completo de atividades práticas e exercícios
                sobre o Sistema Solar e fases lunares.
              </p>
              <a
                href="https://uploadnow.io/f/XMHyGzr"
                download
                className="inline-flex items-center px-6 py-3 cosmic-btn rounded-lg text-[#E0E0E0] hover:text-[#00FF9D] transition-all transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Download Guia de Atividades (PDF)
              </a>
            </div>
           {/* Moon Phase Simulator */}
            <div className="cosmic-card p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-[#00FF9D] mb-4 flex items-center">
                <Moon className="mr-2 h-6 w-6" /> Simulador de Fases Lunares
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                  <p className="text-[#E0E0E0]/90 mb-6">
                    Observe como a Lua muda sua aparência conforme sua posição
                    relativa ao Sol. Movimente o controle deslizante para
                    visualizar todas as fases lunares.
                  </p>
                  <div className="mb-4">
                    <label className="block text-[#E0E0E0] mb-2">
                      Posição orbital:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={moonPhase}
                      onChange={(e) => setMoonPhase(parseFloat(e.target.value))}
                      className="w-full h-2 bg-[#0A1A2F] rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-[#E0E0E0]/70">
                    <span>Nova</span>
                    <span>Crescente</span>
                    <span>Cheia</span>
                    <span>Minguante</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full bg-[#E0E0E0]/90"></div>
                    <div
                      className="absolute inset-0 rounded-full bg-[#000000]"
                      style={{
                        clipPath: `polygon(${50 + 50 * Math.sin(moonPhase * Math.PI * 2)}% 0%, 100% 0%, 100% 100%, ${50 + 50 * Math.sin(moonPhase * Math.PI * 2)}% 100%)`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-[#00FF9D] text-sm">
                  {moonPhase < 0.05 || moonPhase > 0.95
                    ? 'Lua Nova'
                    : moonPhase < 0.2
                      ? 'Lua Crescente (Inicial)'
                      : moonPhase < 0.3
                        ? 'Quarto Crescente'
                        : moonPhase < 0.45
                          ? 'Lua Crescente (Gibosa)'
                          : moonPhase < 0.55
                            ? 'Lua Cheia'
                            : moonPhase < 0.7
                              ? 'Lua Minguante (Gibosa)'
                              : moonPhase < 0.8
                                ? 'Quarto Minguante'
                                : 'Lua Minguante (Final)'}
                </p>
              </div>
            </div>
            {/* Activity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="cosmic-card p-6 rounded-lg border border-[#E0E0E0]/10">
                <h3 className="text-xl font-bold text-[#00FF9D] mb-4 flex items-center">
                  <Compass className="mr-2 h-5 w-5" />
                  Observação do Céu
                </h3>
                <ul className="space-y-4 text-[#E0E0E0]/90">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Identificação de constelações e estrelas guia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Mapeamento de eventos astronômicos sazonais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Fotografia astronômica básica e avançada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Uso de telescópios e equipamentos ópticos</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 bg-[#0A1A2F] text-[#00FF9D] rounded-md border border-[#00FF9D]/30 hover:bg-[#00FF9D]/10 transition-colors">
                  Acessar atividades
                </button>
              </div>
              <div className="cosmic-card p-6 rounded-lg border border-[#E0E0E0]/10">
                <h3 className="text-xl font-bold text-[#00FF9D] mb-4 flex items-center">
                  <Sparkle className="mr-2 h-5 w-5" />
                  Análise de Dados
                </h3>
                <ul className="space-y-4 text-[#E0E0E0]/90">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Cálculo de órbitas e períodos planetários</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Interpretação de espectros estelares</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Análise de dados de telescópios espaciais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Estudo de curvas de luz de estrelas variáveis</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 bg-[#0A1A2F] text-[#00FF9D] rounded-md border border-[#00FF9D]/30 hover:bg-[#00FF9D]/10 transition-colors">
                  Acessar atividades
                </button>
              </div>
              <div className="cosmic-card p-6 rounded-lg border border-[#E0E0E0]/10">
                <h3 className="text-xl font-bold text-[#00FF9D] mb-4 flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Projetos Práticos
                </h3>
                <ul className="space-y-4 text-[#E0E0E0]/90">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>
                      Construção de modelos em escala do Sistema Solar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Simulação de missões espaciais</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>
                      Desenvolvimento de instrumentos astronômicos básicos
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-3 mt-2"></span>
                    <span>Criação de diário de observação astronômica</span>
                  </li>
                </ul>
                <button className="mt-6 w-full py-2 bg-[#0A1A2F] text-[#00FF9D] rounded-md border border-[#00FF9D]/30 hover:bg-[#00FF9D]/10 transition-colors">
                  Acessar atividades
                </button>
              </div>
            </div>
            {/* Quiz Section - Now Functional */}
            <div className="mt-8 cosmic-card p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#00FF9D] mb-6">
                Desafio: Identifique o Fenômeno Cósmico
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src="https://i.pinimg.com/736x/bb/3a/4d/bb3a4d1e4bb412e7dd6c5d5c95de3cfb.jpg"
                    alt="Fenômeno cósmico misterioso"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-[#E0E0E0]">
                    O que está representado na imagem ao lado?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="opt1"
                        name="quiz"
                        className="mr-3"
                        onChange={() => setQuizAnswer('opt1')}
                        checked={quizAnswer === 'opt1'}
                      />
                      <label htmlFor="opt1" className="text-[#E0E0E0]/90">
                        Nebulosa de emissão
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="opt2"
                        name="quiz"
                        className="mr-3"
                        onChange={() => setQuizAnswer('opt2')}
                        checked={quizAnswer === 'opt2'}
                      />
                      <label htmlFor="opt2" className="text-[#E0E0E0]/90">
                        Remanescente de supernova
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="opt3"
                        name="quiz"
                        className="mr-3"
                        onChange={() => setQuizAnswer('opt3')}
                        checked={quizAnswer === 'opt3'}
                      />
                      <label htmlFor="opt3" className="text-[#E0E0E0]/90">
                        Aglomerado estelar
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="opt4"
                        name="quiz"
                        className="mr-3"
                        onChange={() => setQuizAnswer('opt4')}
                        checked={quizAnswer === 'opt4'}
                      />
                      <label htmlFor="opt4" className="text-[#E0E0E0]/90">
                        Galáxia espiral
                      </label>
                    </div>
                  </div>
                  <button
                    className="mt-4 py-2 px-6 bg-[#0A1A2F] text-[#00FF9D] rounded-md border border-[#00FF9D]/30 hover:bg-[#00FF9D]/10 transition-colors"
                    onClick={handleQuizSubmit}
                    disabled={!quizAnswer}
                  >
                    Verificar resposta
                  </button>
                  {quizResult !== null && (
                    <div
                      className={`mt-4 p-3 rounded-md ${quizResult ? 'bg-[#00FF9D]/20 border border-[#00FF9D]/30' : 'bg-[#FF6D00]/20 border border-[#FF6D00]/30'}`}
                    >
                      <div className="flex items-center">
                        {quizResult ? (
                          <>
                            <Check className="h-5 w-5 text-[#00FF9D] mr-2" />
                            <p className="text-[#E0E0E0]">
                              Correto! Esta é uma imagem de um remanescente de
                              supernova.
                            </p>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-[#FF6D00] mr-2" />
                            <p className="text-[#E0E0E0]">
                              Incorreto. Esta é uma imagem de um remanescente de
                              supernova.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 'creditos':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#E0E0E0] mb-4 text-glow">
              Créditos
            </h2>
            <div className="cosmic-card p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#00FF9D] mb-3">
                    Equipe de Desenvolvimento
                  </h3>
                  <ul className="space-y-3 text-[#E0E0E0]/90">
                    <li>• Coordenação: Equipe SENAI</li>
                    <li>• Desenvolvimento: Time de Tecnologia Educacional</li>
                    <li>• Design: Estúdio de Design SENAI</li>
                    <li>• Conteúdo: Especialistas em Astronomia</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00FF9D] mb-3">
                    Agradecimentos
                  </h3>
                  <ul className="space-y-3 text-[#E0E0E0]/90">
                    <li>• Instituições parceiras</li>
                    <li>• Consultores científicos</li>
                    <li>• Educadores colaboradores</li>
                    <li>• Equipe de testes e validação</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-[#E0E0E0]/10 pt-6">
                <h3 className="text-xl font-semibold text-[#00FF9D] mb-4">
                  Colaborações e Fontes de Dados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#000000]/60 rounded-lg">
                    <h4 className="font-semibold text-[#E0E0E0] mb-2">
                      Dados Astronômicos
                    </h4>
                    <p className="text-sm text-[#E0E0E0]/70">
                      Fornecidos pelo JPL/Caltech e NASA Astrophysics Data
                      System
                    </p>
                  </div>
                  <div className="p-4 bg-[#000000]/60 rounded-lg">
                    <h4 className="font-semibold text-[#E0E0E0] mb-2">
                      Imagens
                    </h4>
                    <p className="text-sm text-[#E0E0E0]/70">
                      NASA, ESA, e Telescópio Espacial Hubble
                    </p>
                  </div>
                  <div className="p-4 bg-[#000000]/60 rounded-lg">
                    <h4 className="font-semibold text-[#E0E0E0] mb-2">
                      Modelos 3D
                    </h4>
                    <p className="text-sm text-[#E0E0E0]/70">
                      NASA Scientific Visualization Studio
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-[#0A1A2F]/30 rounded-lg border border-[#00FF9D]/10 text-center">
                <p className="text-[#E0E0E0]/90 italic">
                  "Este site reflete a verdadeira natureza do cosmos – vasto,
                  misterioso e primordialmente escuro. Nenhum tom artificial foi
                  adicionado; apenas o vazio genuíno do espaço e os pontos de
                  luz que o definem."
                </p>
                <p className="text-[#00FF9D] mt-2 text-sm">
                  — Equipe de Design Astronômico
                </p>
              </div>
            </div>
          </div>
        )
      default:
        // 'sobre' tab
        return (
          <div id="content-container" className="about-panel space-y-6">
            {/* Mission Statement */}
            <div className="cosmic-card p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-[#00FF9D] mb-4">
                Nossa Missão
              </h2>
              <p className="text-[#E0E0E0] text-lg mb-4">
                "Explorando a realidade não filtrada do cosmos—escuro, vasto e
                indomável."
              </p>
              <p className="text-[#E0E0E0]/80">
                Nossa plataforma é dedicada a apresentar o universo em sua forma
                mais autêntica, combinando precisão científica com uma
                experiência imersiva que desperta curiosidade e admiração pela
                vastidão cósmica que nos cerca.
              </p>
            </div>
            {/* Interactive Solar System (simplified) */}
            {isClient && (
              <div className="mb-8 relative h-64 overflow-hidden rounded-lg cosmic-card">
                <div className="absolute inset-0 bg-[#000000] z-0"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-[#FF6D00] shadow-[0_0_20px_rgba(255,109,0,0.7)]"></div>
                </div>
                <div
                  className="planet-orbit"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '1px solid rgba(224, 224, 224, 0.1)',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-[#A6C8FF] absolute"
                    style={{
                      left: '50%',
                      top: '0%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                </div>
                <div
                  className="planet-orbit"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    border: '1px solid rgba(224, 224, 224, 0.1)',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full bg-[#FFCC99] absolute"
                    style={{
                      left: '75%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                </div>
                <div
                  className="planet-orbit"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: '220px',
                    height: '220px',
                    borderRadius: '50%',
                    border: '1px solid rgba(224, 224, 224, 0.1)',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-[#5D8EFF] absolute"
                    style={{
                      left: '30%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center text-[#E0E0E0]/70 text-sm">
                  Modelo simplificado do Sistema Solar
                </div>
              </div>
            )}
            {/* Thumbnails with lightbox functionality - Updated with new images */}
            <ul className="alt-thumbnail-list flex flex-wrap gap-4 mb-8">
              <li className="alt-thumbnail">
                <button
                  aria-label="Exibir imagem 4 em tamanho completo"
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-[0_0_15px_rgba(0,255,157,0.5)] transition-all"
                  onClick={() =>
                    setSelectedImage(
                      'https://uploadthingy.s3.us-west-1.amazonaws.com/d719CoF6SdxE9Sna4UakdP/Captura_de_tela_2025-05-02_202212.png',
                    )
                  }
                >
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/d719CoF6SdxE9Sna4UakdP/Captura_de_tela_2025-05-02_202212.png"
                    alt=""
                    className="w-32 h-24 object-cover"
                  />
                </button>
              </li>
              <li className="alt-thumbnail">
                <button
                  aria-label="Exibir imagem 5 em tamanho completo"
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-[0_0_15px_rgba(0,255,157,0.5)] transition-all"
                  onClick={() =>
                    setSelectedImage(
                      'https://uploadthingy.s3.us-west-1.amazonaws.com/cgBViYeK69oFDL1ekZ1bkR/Captura_de_tela_2025-05-02_202220.png',
                    )
                  }
                >
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/cgBViYeK69oFDL1ekZ1bkR/Captura_de_tela_2025-05-02_202220.png"
                    alt=""
                    className="w-32 h-24 object-cover"
                  />
                </button>
              </li>
              <li className="alt-thumbnail">
                <button
                  aria-label="Exibir imagem 6 em tamanho completo"
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-[0_0_15px_rgba(0,255,157,0.5)] transition-all"
                  onClick={() =>
                    setSelectedImage(
                      'https://uploadthingy.s3.us-west-1.amazonaws.com/oFbEDhEsZn1iKNr9VEYYHi/sisSolar.png',
                    )
                  }
                >
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/oFbEDhEsZn1iKNr9VEYYHi/sisSolar.png"
                    alt=""
                    className="w-32 h-24 object-cover"
                  />
                </button>
              </li>
            </ul>
            {/* Topics section with icon instead of image */}
            <div className="section topics cosmic-card p-6 mb-8">
              <div className="flex items-start">
                <div className="icon flex-shrink-0 mr-4">
                  <Globe className="h-12 w-12 text-[#00FF9D]" />
                </div>
                <div className="content">
                  <h2 className="text-xl font-bold text-[#E0E0E0] mb-4">
                    Tópicos
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>Astronomia</span>
                    </li>
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>Corpos Celestes</span>
                    </li>
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>Estrutura do Sistema Solar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Learning Goals section with icon instead of image */}
            <div className="section learning-goals cosmic-card p-6 mb-8">
              <div className="flex items-start">
                <div className="icon flex-shrink-0 mr-4">
                  <BookOpen className="h-12 w-12 text-[#00FF9D]" />
                </div>
                <div className="content">
                  <h2 className="text-xl font-bold text-[#E0E0E0] mb-4">
                    Objetivos de Aprendizagem
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>
                        Identificar planetas, constelações e corpos celestes
                      </span>
                    </li>
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>
                        Reconhecer o Papel dos Corpos Celestes na Navegação e na
                        Vida na Terra
                      </span>
                    </li>
                    <li className="flex items-center text-[#E0E0E0]/90">
                      <span className="w-2 h-2 bg-[#00FF9D] rounded-full mr-2"></span>
                      <span>
                        Compreender o Papel das Luas e Outros Corpos Menores
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* System Requirements with icon instead of image */}
            <div className="section system-requirements cosmic-card p-6">
              <div className="flex items-start">
                <div className="icon flex-shrink-0 mr-4">
                  <Laptop className="h-12 w-12 text-[#00FF9D]" />
                </div>
                <div className="content">
                  <h2 className="text-xl font-bold text-[#E0E0E0] mb-4">
                    Requisitos de Sistema
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="badge-holder mr-4">
                        <svg className="badge w-8 h-8" viewBox="0 0 25 25">
                          <g>
                            <path
                              fill="#0A1A2F"
                              d="M25,23c0,1.1-0.9,2-2,2H2c-1.1,0-2-0.9-2-2V2c0-1.1,0.9-2,2-2h21c1.1,0,2,0.9,2,2V23z"
                            ></path>
                            <path
                              fill="#00FF9D"
                              d="M21.3,2.5L19.7,20.479L12.476,22.5l-7.177-2.021L3.7,2.5H21.3z M18.026,6.174H6.976l0.588,6.677h7.649,l-0.273,2.851l-2.464,0.662l-2.45-0.662l-0.161-1.75H7.675l0.275,3.477l4.525,1.248h0.049v-0.012l4.487-1.236l0.628-6.803H9.586,L9.4,8.362h8.425L18.026,6.174z"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <p className="text-[#E0E0E0]/90">
                        Compatível com iPads, Chromebooks, PC, Mac e Linux
                      </p>
                    </div>
                    <p className="text-sm text-[#E0E0E0]/70 pl-12">
                      Recursos inclusivos disponíveis em HTML5 com algumas
                      limitações de plataforma
                    </p>
                    <p className="text-sm text-[#00FF9D] mt-4">
                      Otimizado para experiência imersiva em telas de alta
                      resolução
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Final Note */}
            <div className="mt-12 p-6 border border-[#00FF9D]/20 rounded-lg text-center bg-[#000000]/50">
              <p className="text-[#E0E0E0] italic">
                "Este não é apenas um site—é um portal para o cosmos. Cada pixel
                ecoa o vazio do espaço."
              </p>
            </div>
          </div>
        )
    }
  }
  return (
    <div className="relative rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]/95"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
      <div className="relative z-10 p-8">{renderContent()}</div>
      {/* Image lightbox/modal */}
      {selectedImage && <ImageModal />}
    </div>
  )
}

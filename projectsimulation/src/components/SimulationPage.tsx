import { useState } from 'react'
import { TabContent } from './TabContent'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
export function SimulationPage() {
  const [activeTab, setActiveTab] = useState('sobre')
  return (
    <div className="simulation-page max-w-7xl mx-auto px-4 py-6">
      {/* Banner Grid Section */}
      <div className="sim-banner-grid cosmic-card rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden mb-8 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-transparent to-[#0A1A2F]/80"></div>
        <h1 className="text-4xl font-bold p-8 text-[#E0E0E0] relative z-10 text-glow">
          Sistema solar e Fases Lunares
        </h1>
        <div className="relative">
          <img
            className="w-full h-96 object-cover relative z-10"
            src="https://uploadthingy.s3.us-west-1.amazonaws.com/dxsqmPDjpjKo5okhj4uwVr/sisSolar.png"
            alt="Sistema solar e Fases Lunares"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-20 flex items-center justify-center">
            <a
              href="indexLobby.html"
              className="cosmic-btn text-[#E0E0E0] font-bold py-4 px-8 rounded-full flex items-center transition-all transform hover:scale-105 backdrop-blur-sm group"
            >
              <img
                className="w-6 h-6 mr-3 group-hover:animate-pulse"
                src="https://phet.colorado.edu/assets/img/play-sim.png"
                alt=""
              />
              <span className="text-lg">Iniciar Simulação</span>
            </a>
          </div>
        </div>
      </div>
      {/* Tab Navigation Section */}
      <nav className="tab-navigation mb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/90 via-[#0A1A2F]/80 to-[#000000]/90 rounded-lg -z-10 backdrop-blur-sm"></div>
        <div className="film-strip relative">
          <div className="scroll-button-container left hidden">
            <button
              className="scroll-button p-3 bg-[#0A1A2F]/50 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              aria-label="Rolar para itens anteriores"
            >
              <ChevronLeftIcon className="w-5 h-5 text-[#E0E0E0]" />
            </button>
          </div>
          <div className="scroll-button-container right hidden">
            <button
              className="scroll-button p-3 bg-[#0A1A2F]/50 backdrop-blur-sm rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              aria-label="Rolar para itens posteriores"
            >
              <ChevronRightIcon className="w-5 h-5 text-[#E0E0E0]" />
            </button>
          </div>
          <ul className="tab-list flex border-b border-[#E0E0E0]/10 bg-gradient-to-r from-[#000000]/50 via-[#0A1A2F]/50 to-[#000000]/50 rounded-t-lg p-2">
            <li className="tab mr-2">
              <button
                onClick={() => setActiveTab('sobre')}
                className={`px-6 py-3 rounded-t-lg transition-all ${activeTab === 'sobre' ? 'bg-[#0A1A2F]/90 text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'text-[#E0E0E0] hover:text-[#00FF9D] hover:bg-[#0A1A2F]/30'}`}
              >
                Sobre
              </button>
            </li>
            <li className="tab mr-2">
              <button
                onClick={() => setActiveTab('conteudo')}
                className={`px-6 py-3 rounded-t-lg transition-all ${activeTab === 'conteudo' ? 'bg-[#0A1A2F]/90 text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'text-[#E0E0E0] hover:text-[#00FF9D] hover:bg-[#0A1A2F]/30'}`}
              >
                Conteudo
              </button>
            </li>
            <li className="tab mr-2">
              <button
                onClick={() => setActiveTab('atividades')}
                className={`px-6 py-3 rounded-t-lg transition-all ${activeTab === 'atividades' ? 'bg-[#0A1A2F]/90 text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'text-[#E0E0E0] hover:text-[#00FF9D] hover:bg-[#0A1A2F]/30'}`}
              >
                Atividades
              </button>
            </li>
            <li className="tab">
              <button
                onClick={() => setActiveTab('creditos')}
                className={`px-6 py-3 rounded-t-lg transition-all ${activeTab === 'creditos' ? 'bg-[#0A1A2F]/90 text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.2)]' : 'text-[#E0E0E0] hover:text-[#00FF9D] hover:bg-[#0A1A2F]/30'}`}
              >
                Créditos
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <TabContent activeTab={activeTab} />
      {/* Black Hole Easter Egg */}
      <div id="black-hole" className="black-hole"></div>
    </div>
  )
}

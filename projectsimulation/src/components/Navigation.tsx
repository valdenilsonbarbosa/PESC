import { UserIcon } from 'lucide-react';
export function Navigation() {
  return <nav className="bg-[#000000]/80 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-[#E0E0E0]/10">
      <div className="left-side flex items-center space-x-4">
        <a href="" className="logo-container">
          <img src="logo.png" alt="LOGO" className="h-10 w-auto" />
        </a>
        <div className="h-8 w-px bg-[#E0E0E0]/20"></div>
        <a href="https://www.se.senai.br/" className="logo-container senai-logo" target="_blank" rel="noreferrer">
          <img src="senai.png" alt="SENAI" className="h-8 w-auto" />
        </a>
      </div>
      <div className="right-side flex items-center space-x-6">
        <div className="nav-item">
          <a href="#" className="text-[#E0E0E0] hover:text-[#00FF9D] font-medium transition-colors">
            Sobre
          </a>
        </div>
        <div className="nav-item">
          <a href="#" className="text-[#E0E0E0] hover:text-[#00FF9D] font-medium transition-colors">
            Simulações
          </a>
        </div>
        <div className="nav-item">
          <UserIcon className="h-5 w-5 text-[#E0E0E0] hover:text-[#00FF9D] transition-colors cursor-pointer" />
        </div>
      </div>
    </nav>;
}
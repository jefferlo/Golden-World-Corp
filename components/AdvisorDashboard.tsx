import React, { useState } from 'react';
import AdvisorOverview from './advisor/AdvisorOverview';
import MyModels from './advisor/MyModels';
import MyCommissions from './advisor/MyCommissions';
import MyProfile from './advisor/MyProfile';
import { User, Advisor, Model, Commission } from '../types';

interface AdvisorDashboardProps {
  user: User;
  advisor?: Advisor;
  onLogout: () => void;
  models: Model[];
  commissions: Commission[];
}

type AdvisorView = 'overview' | 'models' | 'commissions' | 'profile';

const AdvisorDashboard: React.FC<AdvisorDashboardProps> = ({ user, advisor, onLogout, models, commissions }) => {
  const [view, setView] = useState<AdvisorView>('overview');
  
  const renderView = () => {
    if (!advisor) return <p className="text-red-400">Error: No se encontraron los detalles del asesor.</p>;

    switch (view) {
      case 'overview':
        return <AdvisorOverview advisorId={advisor.id} models={models} commissions={commissions} />;
      case 'models':
        return <MyModels advisorId={advisor.id} models={models} />;
      case 'commissions':
        return <MyCommissions advisorId={advisor.id} commissions={commissions} />;
      case 'profile':
        return <MyProfile advisor={advisor} />;
      default:
        return <AdvisorOverview advisorId={advisor.id} models={models} commissions={commissions} />;
    }
  };

  const NavItem: React.FC<{ viewName: AdvisorView; label: string; currentView: AdvisorView; setView: (view: AdvisorView) => void }> = ({ viewName, label, currentView, setView }) => (
    <li>
        <a href="#" onClick={(e) => { e.preventDefault(); setView(viewName); }}
           className={`block py-2 px-4 rounded transition-colors duration-200 ${currentView === viewName ? 'bg-gold text-black' : 'hover:bg-brand-surface'}`}>
            {label}
        </a>
    </li>
  );

  return (
    <div className="flex h-screen bg-brand-bg text-gray-200">
      <aside className="w-64 bg-brand-surface p-4 border-r border-brand-border flex flex-col">
        <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gold">Golden World</h1>
            <p className="text-sm text-gray-400">Panel de Asesor</p>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <NavItem viewName="overview" label="Mi Resumen" currentView={view} setView={setView} />
            <NavItem viewName="models" label="Mis Modelos" currentView={view} setView={setView} />
            <NavItem viewName="commissions" label="Mis Comisiones" currentView={view} setView={setView} />
            <NavItem viewName="profile" label="Mi Perfil" currentView={view} setView={setView} />
          </ul>
        </nav>
        <div>
            <div className="text-sm px-4 py-2 border-t border-brand-border">
                <p className="font-semibold">{advisor?.name}</p>
                <p className="text-gray-400">{advisor?.email}</p>
            </div>
            <button onClick={onLogout} className="w-full text-left mt-2 py-2 px-4 rounded hover:bg-red-500/20 text-red-400 transition-colors duration-200">
                Cerrar Sesión
            </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default AdvisorDashboard;

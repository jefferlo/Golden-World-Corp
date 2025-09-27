import React, { useState } from 'react';
import AdminOverview from './admin/AdminOverview';
import ManageAdvisors from './admin/ManageAdvisors';
import ManageModels from './admin/ManageModels';
import ManageCommissions from './admin/ManageCommissions';
import ManageApplications from './admin/ManageApplications';
import Settings from './admin/Settings';
import AdvisorProfile from './admin/AdvisorProfile';
import ModelProfile from './admin/ModelProfile';
import { User, Advisor, Model, Commission, Application } from '../types';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  advisors: Advisor[];
  setAdvisors: React.Dispatch<React.SetStateAction<Advisor[]>>;
  models: Model[];
  setModels: React.Dispatch<React.SetStateAction<Model[]>>;
  commissions: Commission[];
  setCommissions: React.Dispatch<React.SetStateAction<Commission[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  advisorCommissionAmount: number;
  setAdvisorCommissionAmount: (value: number) => void;
  modelBonusAmount: number;
  setModelBonusAmount: (value: number) => void;
}

type AdminView = 'overview' | 'advisors' | 'models' | 'commissions' | 'applications' | 'settings' | 'advisorProfile' | 'modelProfile';

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [view, setView] = useState<AdminView>('overview');
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);

  const handleViewAdvisor = (advisorId: number) => {
    setSelectedAdvisorId(advisorId);
    setView('advisorProfile');
  };

  const handleViewModel = (modelId: number) => {
    setSelectedModelId(modelId);
    setView('modelProfile');
  };
  
  const renderView = () => {
    switch (view) {
      case 'overview':
        return <AdminOverview advisors={props.advisors} models={props.models} commissions={props.commissions} />;
      case 'advisors':
        return <ManageAdvisors advisors={props.advisors} setAdvisors={props.setAdvisors} onViewProfile={handleViewAdvisor} />;
      case 'models':
        return <ManageModels models={props.models} setModels={props.setModels} advisors={props.advisors} onViewProfile={handleViewModel} />;
      case 'commissions':
        return <ManageCommissions commissions={props.commissions} setCommissions={props.setCommissions} advisors={props.advisors} models={props.models} />;
      case 'applications':
        return <ManageApplications applications={props.applications} setApplications={props.setApplications} />;
      case 'settings':
        return <Settings 
                    advisorCommissionAmount={props.advisorCommissionAmount} 
                    setAdvisorCommissionAmount={props.setAdvisorCommissionAmount}
                    modelBonusAmount={props.modelBonusAmount}
                    setModelBonusAmount={props.setModelBonusAmount}
                />;
      case 'advisorProfile':
        const advisor = props.advisors.find(a => a.id === selectedAdvisorId);
        if (!advisor) return <p>Asesor no encontrado.</p>;
        return <AdvisorProfile advisor={advisor} models={props.models.filter(m => m.advisorId === advisor.id)} commissions={props.commissions.filter(c => c.advisorId === advisor.id)} />;
      case 'modelProfile':
          const model = props.models.find(m => m.id === selectedModelId);
          if (!model) return <p>Modelo no encontrado.</p>;
          return <ModelProfile 
                    model={model} 
                    setModels={props.setModels}
                    advisor={props.advisors.find(a => a.id === model.advisorId)} 
                    commissions={props.commissions.filter(c => c.modelId === model.id)} 
                 />;
      default:
        return <AdminOverview advisors={props.advisors} models={props.models} commissions={props.commissions} />;
    }
  };

  const NavItem: React.FC<{ viewName: AdminView; label: string; currentView: AdminView; setView: (view: AdminView) => void }> = ({ viewName, label, currentView, setView }) => {
    const isActive = currentView === viewName || 
      (viewName === 'advisors' && currentView === 'advisorProfile') ||
      (viewName === 'models' && currentView === 'modelProfile');

    return (
      <li>
          <a href="#" onClick={(e) => { e.preventDefault(); setView(viewName); }}
             className={`block py-2 px-4 rounded transition-colors duration-200 ${isActive ? 'bg-gold text-black' : 'hover:bg-brand-surface'}`}>
              {label}
          </a>
      </li>
    );
  };
  

  return (
    <div className="flex h-screen bg-brand-bg text-gray-200">
      <aside className="w-64 bg-brand-surface p-4 border-r border-brand-border flex flex-col">
        <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gold">Golden World</h1>
            <p className="text-sm text-gray-400">Panel de Administrador</p>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <NavItem viewName="overview" label="Resumen" currentView={view} setView={setView} />
            <NavItem viewName="advisors" label="Asesores" currentView={view} setView={setView} />
            <NavItem viewName="models" label="Modelos" currentView={view} setView={setView} />
            <NavItem viewName="commissions" label="Comisiones" currentView={view} setView={setView} />
            <NavItem viewName="applications" label="Postulaciones" currentView={view} setView={setView} />
            <NavItem viewName="settings" label="Configuración" currentView={view} setView={setView} />
          </ul>
        </nav>
        <div>
            <div className="text-sm px-4 py-2 border-t border-brand-border">
                <p className="font-semibold">{props.user.username}</p>
                <p className="text-gray-400">Administrador</p>
            </div>
            <button onClick={props.onLogout} className="w-full text-left mt-2 py-2 px-4 rounded hover:bg-red-500/20 text-red-400 transition-colors duration-200">
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

export default AdminDashboard;

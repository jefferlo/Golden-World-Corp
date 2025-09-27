import React from 'react';
import { Advisor, Model, Commission, ApprovalStatus } from '../../types';

interface AdminOverviewProps {
  advisors: Advisor[];
  models: Model[];
  commissions: Commission[];
}

const StatCard: React.FC<{ title: string; value: string | number, description: string }> = ({ title, value, description }) => (
    <div className="bg-brand-surface border border-brand-border p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-gold mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
);

const AdminOverview: React.FC<AdminOverviewProps> = ({ advisors, models, commissions }) => {
  const totalAdvisors = advisors.length;
  const totalModels = models.length;
  const pendingModels = models.filter(m => m.approvalStatus === ApprovalStatus.PENDING).length;
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Resumen General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Asesores Activos" 
            value={totalAdvisors} 
            description="Total de asesores registrados"
        />
        <StatCard 
            title="Modelos Totales" 
            value={totalModels} 
            description="Modelos aprobados y pendientes"
        />
        <StatCard 
            title="Modelos Pendientes" 
            value={pendingModels}
            description="Esperando aprobación"
        />
        <StatCard 
            title="Total Transaccionado" 
            value={`$${totalCommissions.toFixed(2)}`} 
            description="Suma de comisiones y bonos"
        />
      </div>
       <div className="mt-12">
        <h3 className="text-xl font-semibold text-gold mb-4">Actividad Reciente</h3>
        <div className="bg-brand-surface border border-brand-border p-6 rounded-lg">
            <p className="text-gray-400">Aquí se mostrará una lista de las últimas actividades del sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

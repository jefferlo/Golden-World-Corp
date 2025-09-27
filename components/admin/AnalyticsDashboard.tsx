import React from 'react';
import { Advisor, Model, Commission, ApprovalStatus, CommissionStatus } from '../../types';

interface AnalyticsDashboardProps {
  advisors: Advisor[];
  models: Model[];
  commissions: Commission[];
}

const StatCard: React.FC<{ title: string; value: string | number, description?: string, colorClass?: string }> = ({ title, value, description, colorClass = 'text-gold' }) => (
  <div className="bg-brand-surface border border-brand-border p-6 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
      <p className={`text-3xl font-bold ${colorClass} mt-2`}>{value}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
  </div>
);

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ advisors, models, commissions }) => {

  const totalAdvisors = advisors.length;
  const totalModels = models.length;
  const pendingModels = models.filter(m => m.approvalStatus === ApprovalStatus.PENDING).length;
  const approvedModels = models.filter(m => m.approvalStatus === ApprovalStatus.APPROVED).length;

  const totalCommissionsPaid = commissions
    .filter(c => c.status === CommissionStatus.PAID)
    .reduce((sum, c) => sum + c.amount, 0);
  
  const totalCommissionsPending = commissions
    .filter(c => c.status === CommissionStatus.PENDING)
    .reduce((sum, c) => sum + c.amount, 0);

  const topAdvisor = advisors.length > 0 ? advisors.map(advisor => {
    const advisorModels = models.filter(m => m.advisorId === advisor.id).length;
    const advisorCommissions = commissions
      .filter(c => c.advisorId === advisor.id && c.status === CommissionStatus.PAID)
      .reduce((sum, c) => sum + c.amount, 0);
    return { name: advisor.name, models: advisorModels, commissions: advisorCommissions };
  }).sort((a, b) => b.commissions - a.commissions)[0] : null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Analíticas y Métricas Clave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total de Asesores" value={totalAdvisors} description="Asesores activos e inactivos" />
        <StatCard title="Total de Modelos" value={totalModels} description="Modelos en todas las etapas" />
        <StatCard title="Modelos Aprobados" value={approvedModels} colorClass="text-green-400" description={`${((approvedModels/totalModels || 0) * 100).toFixed(0)}% de tasa de aprobación`} />
        <StatCard title="Modelos Pendientes" value={pendingModels} colorClass="text-yellow-400" description="Esperando revisión" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Comisiones Pagadas" value={`$${totalCommissionsPaid.toFixed(2)}`} colorClass="text-green-400" />
        <StatCard title="Total Comisiones Pendientes" value={`$${totalCommissionsPending.toFixed(2)}`} colorClass="text-yellow-400" />
        {topAdvisor && (
            <div className="bg-brand-surface border border-brand-border p-6 rounded-lg shadow-lg">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Top Asesor (Por Comisiones)</h3>
                <p className="text-2xl font-bold text-gold mt-2">{topAdvisor.name}</p>
                <div className="text-sm text-gray-400 mt-1">
                    <p>{topAdvisor.models} modelos reclutados</p>
                    <p>${topAdvisor.commissions.toFixed(2)} en comisiones pagadas</p>
                </div>
            </div>
        )}
      </div>

      {/* A simple list of models per advisor */}
      <div className="mt-8 bg-brand-surface p-6 rounded-lg border border-brand-border">
          <h3 className="text-xl font-semibold text-gold mb-4">Distribución de Modelos por Asesor</h3>
          <ul className="space-y-2">
            {advisors.map(advisor => (
              <li key={advisor.id} className="flex justify-between items-center text-gray-300">
                <span>{advisor.name}</span>
                <span className="font-bold">{models.filter(m => m.advisorId === advisor.id).length} modelos</span>
              </li>
            ))}
          </ul>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;

import React from 'react';
import { Model, Commission, CommissionStatus } from '../../types';

interface AdvisorOverviewProps {
  advisorId: number;
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

const AdvisorOverview: React.FC<AdvisorOverviewProps> = ({ advisorId, models, commissions }) => {
  const myModelsCount = models.filter(m => m.advisorId === advisorId).length;
  const myCommissions = commissions.filter(c => c.advisorId === advisorId);
  
  const paidCommissions = myCommissions.filter(c => c.status === CommissionStatus.PAID);
  const totalPaidAmount = paidCommissions.reduce((sum, c) => sum + c.amount, 0);
  
  const pendingCommissions = myCommissions.filter(c => c.status === CommissionStatus.PENDING);
  const totalPendingAmount = pendingCommissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Mi Resumen</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Modelos Reclutados" 
            value={myModelsCount} 
            description="Total de modelos bajo tu gestión"
        />
        <StatCard 
            title="Comisiones Pagadas" 
            value={`$${totalPaidAmount.toFixed(2)}`} 
            description={`De ${paidCommissions.length} pagos`}
        />
        <StatCard 
            title="Comisiones Pendientes" 
            value={`$${totalPendingAmount.toFixed(2)}`} 
            description={`De ${pendingCommissions.length} pagos pendientes`}
        />
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gold mb-4">Próximos Pagos</h3>
        <div className="bg-brand-surface border border-brand-border p-6 rounded-lg">
            {pendingCommissions.length > 0 ? (
                <ul>
                    {pendingCommissions.map(c => (
                        <li key={c.id} className="flex justify-between items-center py-2 border-b border-brand-border last:border-b-0">
                            <span className="text-gray-300">Venta ID: {c.saleId}</span>
                            <span className="font-bold text-gold">${c.amount.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400">No tienes pagos pendientes.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorOverview;
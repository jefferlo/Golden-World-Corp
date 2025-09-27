import React from 'react';
import { Commission, CommissionStatus } from '../../types';

interface MyCommissionsProps {
  advisorId: number;
  commissions: Commission[];
}

const MyCommissions: React.FC<MyCommissionsProps> = ({ advisorId, commissions }) => {
  const myCommissions = commissions.filter(c => c.advisorId === advisorId);

  const getStatusColor = (status: CommissionStatus) => {
    return status === CommissionStatus.PAID ? 'bg-green-500' : 'bg-yellow-500';
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Mis Comisiones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">ID de Venta</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Monto</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha de Pago</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {myCommissions.length > 0 ? myCommissions.map(commission => (
              <tr key={commission.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4">{commission.saleId || 'N/A'}</td>
                <td className="py-3 px-4">${commission.amount.toFixed(2)}</td>
                <td className="py-3 px-4">{commission.paymentDate}</td>
                <td className="py-3 px-4">
                  <span className={`${getStatusColor(commission.status)} text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}>
                    {commission.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">No tienes comisiones registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCommissions;
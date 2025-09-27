import React from 'react';
import { Advisor, Model, Commission, ApprovalStatus } from '../../types';

interface AdvisorProfileProps {
  advisor: Advisor;
  models: Model[];
  commissions: Commission[];
}

const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-gold">{value}</p>
    </div>
);

const countryCodeToFlag = (code: string) => {
    if (!code || code.length !== 2) return '';
    const codePoints = code.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const AdvisorProfile: React.FC<AdvisorProfileProps> = ({ advisor, models, commissions }) => {
  const totalCommissions = commissions.reduce((sum, c) => sum + c.amount, 0);

  const getStatusPill = (status: ApprovalStatus) => {
    const color = {
        [ApprovalStatus.APPROVED]: 'bg-green-500',
        [ApprovalStatus.PENDING]: 'bg-yellow-500',
        [ApprovalStatus.REJECTED]: 'bg-red-500',
    }[status];
    return <span className={`text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}>{status}</span>;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gold mb-2">{advisor.name}</h2>
      <p className="text-gray-400 mb-6">Perfil del Asesor</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Modelos Reclutados" value={models.length} />
          <StatCard title="Comisiones Generadas" value={`$${totalCommissions.toFixed(2)}`} />
          <StatCard title="Fecha de Inicio" value={advisor.startDate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
                <h3 className="text-xl font-semibold text-gold mb-4">Información Personal</h3>
                <div className="space-y-2 text-gray-300">
                    <p><strong>ID Oficial:</strong> {advisor.officialId}</p>
                    <p><strong>Nacionalidad:</strong> {countryCodeToFlag(advisor.countryCode)} {advisor.countryCode}</p>
                    <p><strong>Género:</strong> {advisor.gender}</p>
                </div>
            </div>
             <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
                <h3 className="text-xl font-semibold text-gold mb-4">Información de Contacto</h3>
                <div className="space-y-2 text-gray-300">
                    <p><strong>Email:</strong> {advisor.email}</p>
                    <p><strong>Teléfono:</strong> {advisor.phone}</p>
                    <p><strong>Usuario:</strong> {advisor.username}</p>
                </div>
            </div>
          </div>

          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
              <h3 className="text-xl font-semibold text-gold mb-4">Métodos de Pago</h3>
              <div className="space-y-2 text-gray-300">
                  {advisor.paymentMethods.map((pm, i) => (
                      <p key={i}><strong>{pm.method}:</strong> {pm.address || 'No registrado'}</p>
                  ))}
              </div>
          </div>
      </div>
      
      <div className="mt-8">
          <h3 className="text-xl font-semibold text-gold mb-4">Modelos Asociados</h3>
           <div className="overflow-x-auto">
                <table className="min-w-full bg-brand-bg border border-brand-border">
                    <thead className="bg-brand-surface">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre Artístico</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha Ingreso</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {models.map(model => (
                            <tr key={model.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                                <td className="py-3 px-4">{model.artisticName}</td>
                                <td className="py-3 px-4">{model.entryDate}</td>
                                <td className="py-3 px-4">{getStatusPill(model.approvalStatus)}</td>
                            </tr>
                        ))}
                         {models.length === 0 && <tr><td colSpan={3} className="text-center py-4 text-gray-500">Este asesor no tiene modelos.</td></tr>}
                    </tbody>
                </table>
           </div>
      </div>

    </div>
  );
};

export default AdvisorProfile;

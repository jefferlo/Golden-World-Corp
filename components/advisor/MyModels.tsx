import React from 'react';
// FIX: Imported ModelChecklist for better type safety.
import { Model, ApprovalStatus, ChecklistStatus, ModelChecklist } from '../../types';

interface MyModelsProps {
  advisorId: number;
  models: Model[];
}

const MyModels: React.FC<MyModelsProps> = ({ advisorId, models }) => {
  const myModels = models.filter(m => m.advisorId === advisorId);

  const getStatusPill = (status: ApprovalStatus) => {
    const color = {
        [ApprovalStatus.APPROVED]: 'bg-green-500',
        [ApprovalStatus.PENDING]: 'bg-yellow-500',
        [ApprovalStatus.REJECTED]: 'bg-red-500',
    }[status];
    return <span className={`${color} text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}>{status}</span>;
  };

  // FIX: Used the imported ModelChecklist type for the checklist prop.
  const ChecklistProgress: React.FC<{ checklist: ModelChecklist}> = ({ checklist }) => {
    const getStatusColor = (status: ChecklistStatus) => {
        switch (status) {
            case ChecklistStatus.COMPLETED: return 'text-green-400';
            case ChecklistStatus.IN_REVIEW: return 'text-yellow-400';
            case ChecklistStatus.REJECTED: return 'text-red-400';
            default: return 'text-gray-600'; // PENDING
        }
    };
    
    return (
        <div className="flex gap-2 items-center text-lg font-bold">
            <span title={`Fotos: ${checklist.photos}`} className={getStatusColor(checklist.photos)}>●</span>
            <span title={`Video de Verificación: ${checklist.verificationVideo}`} className={getStatusColor(checklist.verificationVideo)}>●</span>
            <span title={`Cuestionario: ${checklist.questionnaire}`} className={getStatusColor(checklist.questionnaire)}>●</span>
            <span title={`Información de Contacto: ${checklist.contactInfo}`} className={getStatusColor(checklist.contactInfo)}>●</span>
        </div>
    );
  };


  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Mis Modelos Reclutados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre Completo</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha de Ingreso</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Progreso Checklist</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado de Aprobación</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {myModels.length > 0 ? myModels.map(model => (
              <tr key={model.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4">{`${model.firstName} ${model.lastName}`}</td>
                <td className="py-3 px-4">{model.entryDate}</td>
                <td className="py-3 px-4"><ChecklistProgress checklist={model.checklist} /></td>
                <td className="py-3 px-4">{getStatusPill(model.approvalStatus)}</td>
              </tr>
            )) : (
                <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">No has reclutado modelos aún.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyModels;

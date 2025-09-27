import React, { useState, useMemo } from 'react';
import { Commission, Advisor, CommissionStatus, CommissionType, Model } from '../../types';
import Modal from '../Modal';

interface ManageCommissionsProps {
  commissions: Commission[];
  setCommissions: React.Dispatch<React.SetStateAction<Commission[]>>;
  advisors: Advisor[];
  models: Model[];
}

const CommissionForm: React.FC<{ commission?: Commission; onSave: (commission: Commission) => void; onClose: () => void; advisors: Advisor[] }> = ({ commission, onSave, onClose, advisors }) => {
  const [formData, setFormData] = useState({
    advisorId: commission?.advisorId || (advisors.length > 0 ? advisors[0].id : 0),
    amount: commission?.amount || 0,
    status: commission?.status || CommissionStatus.PENDING,
    saleId: commission?.saleId || '',
    modelId: commission?.modelId || 0,
    type: commission?.type || CommissionType.ADVISOR_COMMISSION
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: ['advisorId', 'amount', 'modelId'].includes(name) ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCommission: Commission = {
      id: commission?.id || Date.now(),
      paymentDate: commission?.paymentDate || new Date().toISOString().split('T')[0],
      ...formData,
      advisorId: formData.type === CommissionType.MODEL_BONUS ? null : formData.advisorId
    };
    onSave(newCommission);
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-4">
      <h3 className="text-xl font-bold text-gold">{commission ? 'Editar Transacción' : 'Añadir Transacción'}</h3>
       <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white">
        {/* FIX: Cast Object.values to the specific enum array type to help TypeScript inference. */}
        {(Object.values(CommissionType) as CommissionType[]).map(type => <option key={type} value={type}>{type}</option>)}
      </select>
      <input type="number" name="modelId" value={formData.modelId} onChange={handleChange} placeholder="ID Modelo" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Monto" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" step="0.01" />
       {formData.type === CommissionType.ADVISOR_COMMISSION && (
         <select name="advisorId" value={formData.advisorId || ''} onChange={handleChange} className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white">
          {advisors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
       )}
       <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white">
        {/* FIX: Cast Object.values to the specific enum array type to help TypeScript inference. */}
        {(Object.values(CommissionStatus) as CommissionStatus[]).map(status => <option key={status} value={status}>{status}</option>)}
      </select>
      <div className="flex gap-4">
        <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="flex-1 bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">Guardar</button>
      </div>
    </form>
  );
};


const ManageCommissions: React.FC<ManageCommissionsProps> = ({ commissions, setCommissions, advisors, models }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | undefined>(undefined);
  const [typeFilter, setTypeFilter] = useState<'all' | CommissionType>('all');

  const getBeneficiaryName = (commission: Commission) => {
    if (commission.type === CommissionType.ADVISOR_COMMISSION && commission.advisorId) {
        return advisors.find(a => a.id === commission.advisorId)?.name || 'N/A';
    }
    if (commission.type === CommissionType.MODEL_BONUS) {
        return models.find(m => m.id === commission.modelId)?.artisticName || 'N/A';
    }
    return 'N/A';
  };
  
  const handleSaveCommission = (commission: Commission) => {
    const exists = commissions.find(c => c.id === commission.id);
    if (exists) {
      setCommissions(commissions.map(c => c.id === commission.id ? commission : c));
    } else {
      setCommissions([...commissions, commission]);
    }
    setIsModalOpen(false);
    setSelectedCommission(undefined);
  };

  const handleEdit = (commission: Commission) => {
    setSelectedCommission(commission);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCommission(undefined);
    setIsModalOpen(true);
  };

  const getStatusPill = (status: CommissionStatus) => {
    const color = status === CommissionStatus.PAID ? 'bg-green-500' : 'bg-yellow-500';
    return <span className={`text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ${color}`}>{status}</span>;
  };

  const filteredCommissions = useMemo(() => 
    commissions.filter(c => typeFilter === 'all' || c.type === typeFilter),
    [commissions, typeFilter]
  );
  
  const totalAdvisorCommissions = commissions.filter(c => c.type === CommissionType.ADVISOR_COMMISSION).reduce((sum, c) => sum + c.amount, 0);
  const totalModelBonuses = commissions.filter(c => c.type === CommissionType.MODEL_BONUS).reduce((sum, c) => sum + c.amount, 0);

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold">Gestión de Comisiones y Bonos</h2>
        <button onClick={handleAddNew} className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">
          + Añadir Transacción
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-surface p-4 rounded-lg border border-brand-border">
              <h3 className="text-sm text-gray-400">Total Comisiones Asesores</h3>
              <p className="text-2xl font-bold text-gold">${totalAdvisorCommissions.toFixed(2)}</p>
          </div>
          <div className="bg-brand-surface p-4 rounded-lg border border-brand-border">
              <h3 className="text-sm text-gray-400">Total Bonos Modelos</h3>
              <p className="text-2xl font-bold text-gold">${totalModelBonuses.toFixed(2)}</p>
          </div>
      </div>

       <div className="mb-4">
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)} className="bg-brand-surface border border-brand-border rounded-md p-2 text-white">
          <option value="all">Todos los Tipos</option>
          <option value={CommissionType.ADVISOR_COMMISSION}>Comisión Asesor</option>
          <option value={CommissionType.MODEL_BONUS}>Bono Modelo</option>
        </select>
      </div>

       <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Tipo</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Beneficiario</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Modelo ID</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Monto</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha Pago</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {filteredCommissions.map(commission => (
              <tr key={commission.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4">{commission.type}</td>
                <td className="py-3 px-4 font-semibold">{getBeneficiaryName(commission)}</td>
                <td className="py-3 px-4">{commission.modelId}</td>
                <td className="py-3 px-4">${commission.amount.toFixed(2)}</td>
                <td className="py-3 px-4">{commission.paymentDate}</td>
                <td className="py-3 px-4">{getStatusPill(commission.status)}</td>
                <td className="py-3 px-4 flex gap-4">
                  <button onClick={() => handleEdit(commission)} className="text-blue-400 hover:text-blue-300">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedCommission(undefined); }}>
        <CommissionForm commission={selectedCommission} onSave={handleSaveCommission} onClose={() => { setIsModalOpen(false); setSelectedCommission(undefined); }} advisors={advisors} />
      </Modal>
    </div>
  );
};

export default ManageCommissions;

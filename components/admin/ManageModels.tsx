import React, { useState } from 'react';
import { Model, Advisor, ApprovalStatus, ChecklistStatus } from '../../types';
import Modal from '../Modal';

interface ManageModelsProps {
  models: Model[];
  setModels: React.Dispatch<React.SetStateAction<Model[]>>;
  advisors: Advisor[];
  onViewProfile: (modelId: number) => void;
}

const ModelForm: React.FC<{ model?: Model; onSave: (model: Model) => void; onClose: () => void; advisors: Advisor[] }> = ({ model, onSave, onClose, advisors }) => {
  const [formData, setFormData] = useState({
    firstName: model?.firstName || '',
    lastName: model?.lastName || '',
    artisticName: model?.artisticName || '',
    advisorId: model?.advisorId || (advisors.length > 0 ? advisors[0].id : null),
    approvalStatus: model?.approvalStatus || ApprovalStatus.PENDING,
    officialId: model?.officialId || '',
    countryCode: model?.countryCode || '',
    gender: model?.gender || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'advisorId' ? (value ? Number(value) : null) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newModel: Model = {
      id: model?.id || Date.now(),
      entryDate: model?.entryDate || new Date().toISOString().split('T')[0],
      checklist: model?.checklist || {
        photos: ChecklistStatus.PENDING,
        verificationVideo: ChecklistStatus.PENDING,
        questionnaire: ChecklistStatus.PENDING,
        contactInfo: ChecklistStatus.PENDING,
      },
      paymentMethods: model?.paymentMethods || [],
      ...formData,
    };
    onSave(newModel);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-4">
      <h3 className="text-xl font-bold text-gold">{model ? 'Editar Modelo' : 'Añadir Modelo'}</h3>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nombre" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Apellido" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="artisticName" value={formData.artisticName} onChange={handleChange} placeholder="Nombre Artístico" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="officialId" value={formData.officialId} onChange={handleChange} placeholder="Número de Identificación" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Nacionalidad (ej. AR, MX, US)" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Género" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <select name="advisorId" value={formData.advisorId || ''} onChange={handleChange} className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white">
        <option value="">Sin Asesor</option>
        {advisors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>
      <select name="approvalStatus" value={formData.approvalStatus} onChange={handleChange} className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white">
        {(Object.values(ApprovalStatus) as ApprovalStatus[]).map(status => <option key={status} value={status}>{status}</option>)}
      </select>
      <div className="flex gap-4">
        <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="flex-1 bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">Guardar</button>
      </div>
    </form>
  );
};


const ManageModels: React.FC<ManageModelsProps> = ({ models, setModels, advisors, onViewProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(undefined);

  const getAdvisorName = (advisorId: number | null) => {
    if (advisorId === null) return 'N/A';
    return advisors.find(a => a.id === advisorId)?.name || 'Desconocido';
  };

  const getStatusPill = (status: ApprovalStatus) => {
    const colors = {
      [ApprovalStatus.APPROVED]: 'bg-green-500',
      [ApprovalStatus.PENDING]: 'bg-yellow-500',
      [ApprovalStatus.REJECTED]: 'bg-red-500',
    };
    return <span className={`text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[status]}`}>{status}</span>;
  };
  
  const handleSaveModel = (model: Model) => {
    const exists = models.find(m => m.id === model.id);
    if (exists) {
      setModels(models.map(m => m.id === model.id ? model : m));
    } else {
      setModels([...models, model]);
    }
    setIsModalOpen(false);
    setSelectedModel(undefined);
  };

  const handleEdit = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedModel(undefined);
    setIsModalOpen(true);
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold">Gestión de Modelos</h2>
        <button onClick={handleAddNew} className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">
          + Añadir Modelo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre Artístico</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre Real</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Asesor</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha Ingreso</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {models.map(model => (
              <tr key={model.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4 font-semibold">{model.artisticName}</td>
                <td className="py-3 px-4">{`${model.firstName} ${model.lastName}`}</td>
                <td className="py-3 px-4">{getAdvisorName(model.advisorId)}</td>
                <td className="py-3 px-4">{model.entryDate}</td>
                <td className="py-3 px-4">{getStatusPill(model.approvalStatus)}</td>
                <td className="py-3 px-4 flex gap-4">
                   <button onClick={() => onViewProfile(model.id)} className="text-blue-400 hover:text-blue-300">Ver Perfil</button>
                   <button onClick={() => handleEdit(model)} className="text-yellow-400 hover:text-yellow-300">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedModel(undefined); }}>
        <ModelForm model={selectedModel} onSave={handleSaveModel} onClose={() => { setIsModalOpen(false); setSelectedModel(undefined); }} advisors={advisors} />
      </Modal>
    </div>
  );
};

export default ManageModels;

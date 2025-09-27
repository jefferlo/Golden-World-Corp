import React, { useState } from 'react';
import { Advisor } from '../../types';
import Modal from '../Modal';

interface ManageAdvisorsProps {
  advisors: Advisor[];
  setAdvisors: React.Dispatch<React.SetStateAction<Advisor[]>>;
  onViewProfile: (advisorId: number) => void;
}

const AdvisorForm: React.FC<{ advisor?: Advisor; onSave: (advisor: Advisor) => void; onClose: () => void }> = ({ advisor, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: advisor?.name || '',
    username: advisor?.username || '',
    email: advisor?.email || '',
    phone: advisor?.phone || '',
    officialId: advisor?.officialId || '',
    countryCode: advisor?.countryCode || '',
    gender: advisor?.gender || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdvisor: Advisor = {
      id: advisor?.id || Date.now(),
      startDate: advisor?.startDate || new Date().toISOString().split('T')[0],
      paymentMethods: advisor?.paymentMethods || [],
      ...formData,
    };
    onSave(newAdvisor);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-4">
      <h3 className="text-xl font-bold text-gold">{advisor ? 'Editar Asesor' : 'Añadir Asesor'}</h3>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre Completo" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de Usuario" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Teléfono" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="officialId" value={formData.officialId} onChange={handleChange} placeholder="Número de Identificación" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="countryCode" value={formData.countryCode} onChange={handleChange} placeholder="Nacionalidad (ej. AR, MX, US)" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />
      <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Género" required className="w-full bg-brand-surface border border-brand-border rounded-md p-2 text-white" />

      <div className="flex gap-4">
        <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="flex-1 bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">Guardar</button>
      </div>
    </form>
  );
};

const ManageAdvisors: React.FC<ManageAdvisorsProps> = ({ advisors, setAdvisors, onViewProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | undefined>(undefined);

  const handleSaveAdvisor = (advisor: Advisor) => {
    const exists = advisors.find(a => a.id === advisor.id);
    if (exists) {
      setAdvisors(advisors.map(a => a.id === advisor.id ? advisor : a));
    } else {
      setAdvisors([...advisors, advisor]);
    }
    setIsModalOpen(false);
    setSelectedAdvisor(undefined);
  };

  const handleEdit = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedAdvisor(undefined);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gold">Gestión de Asesores</h2>
        <button onClick={handleAddNew} className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">
          + Añadir Asesor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Email</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Teléfono</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha de Inicio</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {advisors.map(advisor => (
              <tr key={advisor.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4">{advisor.name}</td>
                <td className="py-3 px-4">{advisor.email}</td>
                <td className="py-3 px-4">{advisor.phone}</td>
                <td className="py-3 px-4">{advisor.startDate}</td>
                <td className="py-3 px-4 flex gap-4">
                  <button onClick={() => onViewProfile(advisor.id)} className="text-blue-400 hover:text-blue-300">Ver Perfil</button>
                  <button onClick={() => handleEdit(advisor)} className="text-yellow-400 hover:text-yellow-300">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedAdvisor(undefined); }}>
        <AdvisorForm advisor={selectedAdvisor} onSave={handleSaveAdvisor} onClose={() => { setIsModalOpen(false); setSelectedAdvisor(undefined); }} />
      </Modal>
    </div>
  );
};

export default ManageAdvisors;

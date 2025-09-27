import React, { useState } from 'react';
import { Model, Advisor, Commission, ChecklistStatus, CommissionStatus, ModelChecklist } from '../../types';

interface ModelProfileProps {
  model: Model;
  advisor?: Advisor;
  commissions: Commission[];
  setModels: React.Dispatch<React.SetStateAction<Model[]>>;
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

const ChecklistItem: React.FC<{ title: string; status: ChecklistStatus }> = ({ title, status }) => {
    const getStatusInfo = (s: ChecklistStatus) => {
        switch (s) {
            case ChecklistStatus.COMPLETED: return { color: 'text-green-400', icon: '✔' };
            case ChecklistStatus.IN_REVIEW: return { color: 'text-yellow-400', icon: '...' };
            case ChecklistStatus.REJECTED: return { color: 'text-red-400', icon: '✖' };
            default: return { color: 'text-gray-500', icon: '○' }; // PENDING
        }
    };
    const { color, icon } = getStatusInfo(status);

    return (
        <div className="flex justify-between items-center py-2 border-b border-brand-border/50 last:border-0">
            <span className="text-gray-300">{title}</span>
            <span className={`${color} font-bold`}>{icon} {status}</span>
        </div>
    );
};


const ModelProfile: React.FC<ModelProfileProps> = ({ model, advisor, commissions, setModels }) => {
    const totalBonuses = commissions.reduce((sum, c) => sum + c.amount, 0);
    const [editableChecklist, setEditableChecklist] = useState<ModelChecklist>(model.checklist);

    const handleChecklistChange = (item: keyof ModelChecklist, status: ChecklistStatus) => {
        setEditableChecklist(prev => ({...prev, [item]: status }));
    };

    const handleSaveChecklist = () => {
        setModels(prevModels => 
            prevModels.map(m => 
                m.id === model.id ? { ...m, checklist: editableChecklist } : m
            )
        );
        alert('Checklist actualizado!');
    };

    const checklistItems: { key: keyof ModelChecklist, label: string }[] = [
        { key: 'photos', label: 'Fotos' },
        { key: 'verificationVideo', label: 'Video de Verificación' },
        { key: 'questionnaire', label: 'Cuestionario' },
        { key: 'contactInfo', label: 'Información de Contacto' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-gold mb-2">{model.artisticName}</h2>
            <p className="text-gray-400 mb-6">Perfil del Modelo ({model.firstName} {model.lastName})</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Asesor" value={advisor?.name || 'No asignado'} />
                <StatCard title="Bonos Recibidos" value={`$${totalBonuses.toFixed(2)}`} />
                <StatCard title="Fecha de Ingreso" value={model.entryDate} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
                    <h3 className="text-xl font-semibold text-gold mb-4">Información Personal</h3>
                    <div className="space-y-2 text-gray-300">
                        <p><strong>ID Oficial:</strong> {model.officialId}</p>
                        <p><strong>Nacionalidad:</strong> {countryCodeToFlag(model.countryCode)} {model.countryCode}</p>
                        <p><strong>Género:</strong> {model.gender}</p>
                    </div>
                </div>

                <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
                    <h3 className="text-xl font-semibold text-gold mb-4">Progreso del Checklist</h3>
                    <div className="space-y-1">
                        {checklistItems.map(item => (
                            <ChecklistItem key={item.key} title={item.label} status={model.checklist[item.key]} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-brand-surface p-6 rounded-lg border border-brand-border">
                <h3 className="text-xl font-semibold text-gold mb-4">Gestionar Checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {checklistItems.map(item => (
                         <div key={item.key}>
                            <label className="block text-sm font-medium text-gray-400 mb-1">{item.label}</label>
                            <select
                                value={editableChecklist[item.key]}
                                onChange={(e) => handleChecklistChange(item.key, e.target.value as ChecklistStatus)}
                                className="w-full bg-brand-bg border border-brand-border rounded-md p-2 text-white"
                            >
                                {Object.values(ChecklistStatus).map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-right">
                    <button onClick={handleSaveChecklist} className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark">
                        Guardar Cambios del Checklist
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-brand-surface p-6 rounded-lg border border-brand-border">
                <h3 className="text-xl font-semibold text-gold mb-4">Historial de Bonos</h3>
                {commissions.length > 0 ? (
                    <ul className="space-y-2">
                    {commissions.map(c => (
                        <li key={c.id} className="flex justify-between items-center text-gray-300 border-b border-brand-border/50 pb-1 last:border-0">
                            <span>{c.paymentDate} - {c.type}</span>
                            <span className={c.status === CommissionStatus.PAID ? 'text-green-400' : 'text-yellow-400'}>
                                ${c.amount.toFixed(2)} ({c.status})
                            </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No hay bonos registrados para este modelo.</p>
                )}
            </div>
        </div>
    );
};

export default ModelProfile;

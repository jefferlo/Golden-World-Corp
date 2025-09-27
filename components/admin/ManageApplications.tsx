import React from 'react';
import { Application, ApplicationStatus, ApplicationType } from '../../types';

interface ManageApplicationsProps {
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const ManageApplications: React.FC<ManageApplicationsProps> = ({ applications, setApplications }) => {

  const handleStatusChange = (applicationId: number, newStatus: ApplicationStatus) => {
    setApplications(apps => apps.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusPill = (status: ApplicationStatus) => {
    const colors: { [key in ApplicationStatus]: string } = {
      [ApplicationStatus.PENDING]: 'bg-yellow-500',
      [ApplicationStatus.REVIEWED]: 'bg-blue-500',
      [ApplicationStatus.APPROVED]: 'bg-green-500',
      [ApplicationStatus.REJECTED]: 'bg-red-500',
    };
    return <span className={`text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[status]}`}>{status}</span>;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Gestión de Postulaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-brand-bg border border-brand-border">
          <thead className="bg-brand-surface">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Nombre</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Tipo</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Fecha</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Email / Teléfono</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Estado</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {applications.map(app => (
              <tr key={app.id} className="border-b border-brand-border hover:bg-brand-surface/50">
                <td className="py-3 px-4">{app.name}</td>
                <td className="py-3 px-4">{app.type}</td>
                <td className="py-3 px-4">{app.submissionDate}</td>
                <td className="py-3 px-4">{app.email}<br/>{app.phone}</td>
                <td className="py-3 px-4">{getStatusPill(app.status)}</td>
                <td className="py-3 px-4">
                   <select 
                     value={app.status} 
                     onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                     className="bg-brand-surface border border-brand-border rounded-md p-1 text-white"
                   >
                    {/* FIX: Cast Object.values to the specific enum array type to help TypeScript inference. */}
                     {(Object.values(ApplicationStatus) as ApplicationStatus[]).map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">No hay postulaciones pendientes.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplications;

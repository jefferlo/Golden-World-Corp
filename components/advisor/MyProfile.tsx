import React from 'react';
import { Advisor } from '../../types';

interface MyProfileProps {
  advisor?: Advisor;
}

const MyProfile: React.FC<MyProfileProps> = ({ advisor }) => {

  if (!advisor) {
    return <p>Asesor no encontrado.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Mis Datos</h2>
      <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-400 block">Nombre Completo</label>
              <p className="text-lg text-white mt-1">{advisor.name}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-400 block">Usuario</label>
              <p className="text-lg text-white mt-1">{advisor.username}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-400 block">Email</label>
              <p className="text-lg text-white mt-1">{advisor.email}</p>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-400 block">Teléfono</label>
              <p className="text-lg text-white mt-1">{advisor.phone}</p>
            </div>
             <div>
              <label className="text-sm font-bold text-gray-400 block">Fecha de Inicio</label>
              <p className="text-lg text-white mt-1">{advisor.startDate}</p>
            </div>
        </div>
        <div className="mt-6 border-t border-brand-border pt-6">
            <h3 className="text-lg font-semibold text-gold mb-2">Mis Billeteras</h3>
            <div className="space-y-2 text-gray-300">
                {advisor.paymentMethods.map((pm, index) => pm.address && (
                    <div key={index}><strong className="text-gray-400">{pm.method}:</strong> {pm.address}</div>
                ))}
            </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gold mb-4">Actualizar Contraseña</h3>
        <form className="space-y-4 max-w-sm">
            <input type="password" placeholder="Nueva Contraseña" className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
            <input type="password" placeholder="Confirmar Nueva Contraseña" className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
            <button type="submit" className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300">
                Actualizar Contraseña
            </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
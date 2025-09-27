import React, { useState } from 'react';

interface SettingsProps {
  advisorCommissionAmount: number;
  setAdvisorCommissionAmount: (value: number) => void;
  modelBonusAmount: number;
  setModelBonusAmount: (value: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  advisorCommissionAmount, setAdvisorCommissionAmount, 
  modelBonusAmount, setModelBonusAmount 
}) => {
  const [advisorCommission, setAdvisorCommission] = useState(advisorCommissionAmount);
  const [modelBonus, setModelBonus] = useState(modelBonusAmount);

  const handleSaveSettings = () => {
    setAdvisorCommissionAmount(advisorCommission);
    setModelBonusAmount(modelBonus);
    alert('Configuración guardada.');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gold mb-6">Configuración</h2>
      
      <div className="bg-brand-surface p-6 rounded-lg border border-brand-border">
        <h3 className="text-xl font-semibold text-gold mb-4">Cambiar Contraseña</h3>
        <form className="space-y-4 max-w-sm">
            <input type="password" placeholder="Contraseña Actual" className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
            <input type="password" placeholder="Nueva Contraseña" className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
            <input type="password" placeholder="Confirmar Nueva Contraseña" className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
            <button type="submit" className="bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300">
                Guardar Cambios
            </button>
        </form>
      </div>

      <div className="mt-8 bg-brand-surface p-6 rounded-lg border border-brand-border">
          <h3 className="text-xl font-semibold text-gold mb-4">Ajustes de Comisiones</h3>
          <div className="max-w-sm space-y-4">
            <div>
              <label htmlFor="advisorCommission" className="block text-sm font-medium text-gray-400">Monto Comisión Asesor (USDT)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-400 sm:text-sm">$</span></div>
                <input
                  type="number"
                  name="advisorCommission"
                  id="advisorCommission"
                  className="w-full bg-brand-bg border border-brand-border rounded-md p-3 pl-7 pr-12 text-white"
                  value={advisorCommission}
                  onChange={(e) => setAdvisorCommission(Number(e.target.value))}
                  placeholder="30.00"
                  step="0.01"
                />
              </div>
            </div>
             <div>
              <label htmlFor="modelBonus" className="block text-sm font-medium text-gray-400">Monto Bono Modelo (USDT)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-400 sm:text-sm">$</span></div>
                <input
                  type="number"
                  name="modelBonus"
                  id="modelBonus"
                  className="w-full bg-brand-bg border border-brand-border rounded-md p-3 pl-7 pr-12 text-white"
                  value={modelBonus}
                  onChange={(e) => setModelBonus(Number(e.target.value))}
                  placeholder="20.00"
                  step="0.01"
                />
              </div>
            </div>
             <button onClick={handleSaveSettings} className="mt-4 bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300">
                Guardar Configuración
            </button>
          </div>
      </div>
    </div>
  );
};

export default Settings;
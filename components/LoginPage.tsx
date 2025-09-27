import React, { useState } from 'react';
import Modal from './Modal';
import { ApplicationType } from '../types';

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean;
}

const GoldenWorldLogo: React.FC = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-gold">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.47L19.53 8.5L12 12.53L4.47 8.5L12 4.47ZM3 9.08L11 13.91V20.03L3 15.2V9.08ZM13 20.03V13.91L21 9.08V15.2L13 20.03Z" fill="currentColor"/>
  </svg>
);


const ApplicationForm: React.FC<{ type: ApplicationType; onClose: () => void }> = ({ type, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-8">
        <h3 className="text-2xl font-bold text-gold mb-4">Postulación Enviada</h3>
        <p className="text-gray-300 mb-6">Gracias por tu interés. Revisaremos tu información y nos pondremos en contacto contigo pronto.</p>
        <button
          onClick={onClose}
          className="w-full bg-gold text-black font-bold py-2 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300"
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <h3 className="text-2xl font-bold text-center text-gold mb-4">Postúlate como {type}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nombre" required className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
        <input type="text" placeholder="Apellido" required className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
      </div>
      <input type="tel" placeholder="Número de Teléfono" required className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
      <input type="email" placeholder="Email" required className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
      <input type="text" placeholder="Usuario de redes sociales" required className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
      <input type="text" placeholder="Nombre de la persona que te refirió (Opcional)" className="w-full bg-brand-surface border border-brand-border rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold" />
      <button type="submit" className="w-full bg-gold text-black font-bold py-3 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300 mt-2">
        Enviar Postulación
      </button>
    </form>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!onLogin(username, password)) {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <GoldenWorldLogo />
            <h1 className="text-4xl font-bold text-gold mt-2">Golden World</h1>
            <p className="text-gray-400">Resource Management</p>
        </div>

        <div className="bg-brand-surface p-8 rounded-lg shadow-2xl shadow-black/30 border border-brand-border">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-2">Usuario</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" 
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-400 block mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" 
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="text-right text-sm">
                <a href="#" className="font-medium text-gold hover:text-gold-dark">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="w-full bg-gold text-black font-bold py-3 px-4 rounded-md hover:bg-gold-dark transition-colors duration-300">
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">¿Quieres unirte a nuestro equipo?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={() => setShowAdvisorModal(true)} className="flex-1 bg-transparent border-2 border-gold text-gold font-bold py-2 px-4 rounded-md hover:bg-gold hover:text-black transition-colors duration-300">
                    Postúlate como Asesor
                </button>
                <button onClick={() => setShowModelModal(true)} className="flex-1 bg-transparent border-2 border-gold text-gold font-bold py-2 px-4 rounded-md hover:bg-gold hover:text-black transition-colors duration-300">
                    Postúlate como Modelo
                </button>
            </div>
        </div>
        
        <div className="mt-12 text-center">
            <div className="flex justify-center gap-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.398 1.363.449 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.051 1.064-.202 1.791-.449 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.398-2.427.449-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.051-1.791-.202-2.427-.449a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.398-1.363-.449-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.051-1.064.202 1.791.449 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.398 2.427-.449C9.531 2.013 9.885 2 12.315 2zM12 7.177a4.823 4.823 0 100 9.646 4.823 4.823 0 000-9.646zM12 15a3 3 0 110-6 3 3 0 010 6zm4.838-7.823a1.162 1.162 0 100-2.324 1.162 1.162 0 000 2.324z" clipRule="evenodd" />
                    </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.75-1.91-1.9-1.53-3.01-3.75-3.01-6.02 0-2.5 1.25-4.97 3.35-6.29 2.11-1.32 4.6-1.31 6.66.02.13 1.56.01 3.12.01 4.67-.13-1.56-.01-3.12-.01-4.67.01-1.49-.09-2.98-.31-4.45-.16-.9-.4-1.79-.73-2.64-.51-1.24-1.28-2.3-2.19-3.25-.87-.93-1.93-1.63-3.02-2.14.32-.23.63-.48.94-.71.53-.41 1.1-.76 1.73-1.01.12-.05.23-.1.35-.15.01-.01.01-.01.02-.02z" />
                    </svg>
                </a>
            </div>
        </div>

      </div>
      
      <Modal isOpen={showAdvisorModal} onClose={() => setShowAdvisorModal(false)}>
        <ApplicationForm type={ApplicationType.ADVISOR} onClose={() => setShowAdvisorModal(false)} />
      </Modal>

      <Modal isOpen={showModelModal} onClose={() => setShowModelModal(false)}>
        <ApplicationForm type={ApplicationType.MODEL} onClose={() => setShowModelModal(false)} />
      </Modal>

    </div>
  );
};

export default LoginPage;
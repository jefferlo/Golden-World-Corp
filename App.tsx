import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import AdvisorDashboard from './components/AdvisorDashboard';
import { User, Advisor, Model, Commission, Application, UserRole } from './types';
import { USERS, ADVISORS, MODELS, COMMISSIONS, APPLICATIONS } from './constants';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // App-wide state, initialized from constants
  const [users, setUsers] = useState<User[]>(USERS);
  const [advisors, setAdvisors] = useState<Advisor[]>(ADVISORS);
  const [models, setModels] = useState<Model[]>(MODELS);
  const [commissions, setCommissions] = useState<Commission[]>(COMMISSIONS);
  const [applications, setApplications] = useState<Application[]>(APPLICATIONS);

  // Settings state
  const [advisorCommissionAmount, setAdvisorCommissionAmount] = useState(30);
  const [modelBonusAmount, setModelBonusAmount] = useState(20);

  const handleLogin = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setLoggedInUser(user);
      // In a real app, you'd save a token to localStorage/sessionStorage
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    // In a real app, you'd clear the token from storage
  };
  
  if (!loggedInUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (loggedInUser.role === UserRole.ADMIN) {
    return (
      <AdminDashboard
        user={loggedInUser}
        onLogout={handleLogout}
        advisors={advisors}
        setAdvisors={setAdvisors}
        models={models}
        setModels={setModels}
        commissions={commissions}
        setCommissions={setCommissions}
        applications={applications}
        setApplications={setApplications}
        advisorCommissionAmount={advisorCommissionAmount}
        setAdvisorCommissionAmount={setAdvisorCommissionAmount}
        modelBonusAmount={modelBonusAmount}
        setModelBonusAmount={setModelBonusAmount}
      />
    );
  }

  if (loggedInUser.role === UserRole.ADVISOR) {
    const advisorDetails = advisors.find(a => a.id === loggedInUser.id);
    return (
      <AdvisorDashboard
        user={loggedInUser}
        advisor={advisorDetails}
        onLogout={handleLogout}
        models={models}
        commissions={commissions}
      />
    );
  }

  return <div>Error: Usuario con rol desconocido.</div>;
};

export default App;

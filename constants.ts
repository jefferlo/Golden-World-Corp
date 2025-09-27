import { 
  User, UserRole, 
  Advisor, 
  Model, ApprovalStatus, ChecklistStatus,
  Commission, CommissionStatus, CommissionType,
  Application, ApplicationStatus, ApplicationType 
} from './types';

export const USERS: User[] = [
  { id: 1, username: 'admin', password: 'adminpassword', role: UserRole.ADMIN },
  { id: 2, username: 'advisor1', password: 'advisorpassword', role: UserRole.ADVISOR },
  { id: 3, username: 'advisor2', password: 'advisorpassword', role: UserRole.ADVISOR },
];

export const ADVISORS: Advisor[] = [
  { 
    id: 2, 
    name: 'Juan Perez', 
    username: 'advisor1',
    email: 'juan.perez@example.com', 
    phone: '+1234567890', 
    startDate: '2023-01-15',
    paymentMethods: [
      { method: 'USDT (TRC-20)', address: 'TXYZ...' },
      { method: 'Paypal', address: 'juan.perez@paypal.com' },
    ],
    officialId: '12345678A',
    countryCode: 'AR',
    gender: 'Masculino',
  },
  { 
    id: 3, 
    name: 'Maria Garcia', 
    username: 'advisor2',
    email: 'maria.garcia@example.com', 
    phone: '+0987654321', 
    startDate: '2023-02-20',
    paymentMethods: [
        { method: 'USDT (TRC-20)', address: 'TABCD...' },
    ],
    officialId: '87654321B',
    countryCode: 'MX',
    gender: 'Femenino',
  },
];

export const MODELS: Model[] = [
  { 
    id: 101, 
    firstName: 'Sofia', 
    lastName: 'Rodriguez', 
    artisticName: 'Sofie',
    entryDate: '2023-03-10', 
    advisorId: 2, 
    approvalStatus: ApprovalStatus.APPROVED,
    checklist: {
        photos: ChecklistStatus.COMPLETED,
        verificationVideo: ChecklistStatus.COMPLETED,
        questionnaire: ChecklistStatus.COMPLETED,
        contactInfo: ChecklistStatus.COMPLETED,
    },
    officialId: 'M12345',
    countryCode: 'CO',
    gender: 'Femenino',
    paymentMethods: [{ method: 'Binance Pay', address: 'sofie@binance.com' }]
  },
  { 
    id: 102, 
    firstName: 'Lucia', 
    lastName: 'Martinez', 
    artisticName: 'Lucy',
    entryDate: '2023-04-05', 
    advisorId: 2, 
    approvalStatus: ApprovalStatus.PENDING,
    checklist: {
        photos: ChecklistStatus.IN_REVIEW,
        verificationVideo: ChecklistStatus.PENDING,
        questionnaire: ChecklistStatus.COMPLETED,
        contactInfo: ChecklistStatus.PENDING,
    },
    officialId: 'M67890',
    countryCode: 'ES',
    gender: 'Femenino',
    paymentMethods: [{ method: 'PayPal', address: 'lucy.m@paypal.com' }]
  },
  { 
    id: 103, 
    firstName: 'Camila', 
    lastName: 'Lopez', 
    artisticName: 'Cami',
    entryDate: '2023-05-01', 
    advisorId: 3, 
    approvalStatus: ApprovalStatus.APPROVED,
    checklist: {
        photos: ChecklistStatus.COMPLETED,
        verificationVideo: ChecklistStatus.COMPLETED,
        questionnaire: ChecklistStatus.COMPLETED,
        contactInfo: ChecklistStatus.COMPLETED,
    },
    officialId: 'M54321',
    countryCode: 'US',
    gender: 'Femenino',
    paymentMethods: [{ method: 'Western Union', address: 'CAMILA LOPEZ' }]
  },
];

export const COMMISSIONS: Commission[] = [
  { id: 1, advisorId: 2, modelId: 101, amount: 30, paymentDate: '2023-03-20', status: CommissionStatus.PAID, saleId: 'SALE001', type: CommissionType.ADVISOR_COMMISSION },
  { id: 2, advisorId: null, modelId: 101, amount: 20, paymentDate: '2023-03-20', status: CommissionStatus.PAID, saleId: 'BONUS001', type: CommissionType.MODEL_BONUS },
  { id: 3, advisorId: 3, modelId: 103, amount: 30, paymentDate: '2023-05-15', status: CommissionStatus.PAID, saleId: 'SALE002', type: CommissionType.ADVISOR_COMMISSION },
  { id: 4, advisorId: 2, modelId: 102, amount: 30, paymentDate: '2023-04-15', status: CommissionStatus.PENDING, saleId: 'SALE003', type: CommissionType.ADVISOR_COMMISSION },
];

export const APPLICATIONS: Application[] = [
    { id: 1, name: 'Carlos Sanchez', type: ApplicationType.ADVISOR, submissionDate: '2023-06-01', email: 'carlos@example.com', phone: '555-1234', status: ApplicationStatus.PENDING },
    { id: 2, name: 'Ana Gomez', type: ApplicationType.MODEL, submissionDate: '2023-06-02', email: 'ana@example.com', phone: '555-5678', status: ApplicationStatus.REVIEWED },
];

import React from 'react';

export enum UserRole {
  ADMIN = 'ADMIN',
  ADVISOR = 'ADVISOR',
}

export interface User {
  id: number;
  username: string;
  password?: string;
  role: UserRole;
}

export interface PaymentMethod {
  method: string;
  address: string | null;
}

export interface Advisor {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  startDate: string;
  paymentMethods: PaymentMethod[];
  officialId: string;
  countryCode: string; // e.g., 'AR', 'MX'
  gender: string;
}

export enum ApprovalStatus {
  PENDING = 'Pendiente',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
}

export enum ChecklistStatus {
    PENDING = 'Pendiente',
    IN_REVIEW = 'En Revisión',
    COMPLETED = 'Completado',
    REJECTED = 'Rechazado',
}

export interface ModelChecklist {
  photos: ChecklistStatus;
  verificationVideo: ChecklistStatus;
  questionnaire: ChecklistStatus;
  contactInfo: ChecklistStatus;
}

export interface Model {
  id: number;
  firstName: string;
  lastName: string;
  artisticName: string;
  entryDate: string;
  advisorId: number | null;
  approvalStatus: ApprovalStatus;
  checklist: ModelChecklist;
  officialId: string;
  countryCode: string; // e.g., 'AR', 'MX'
  gender: string;
  paymentMethods: PaymentMethod[];
}

export enum CommissionStatus {
  PENDING = 'Pendiente',
  PAID = 'Pagado',
}

export enum CommissionType {
  ADVISOR_COMMISSION = 'Comisión Asesor',
  MODEL_BONUS = 'Bono Modelo',
}

export interface Commission {
  id: number;
  advisorId: number | null;
  modelId: number;
  amount: number;
  paymentDate: string;
  status: CommissionStatus;
  saleId: string;
  type: CommissionType;
}

export enum ApplicationType {
  ADVISOR = 'Asesor',
  MODEL = 'Modelo',
}

export enum ApplicationStatus {
  PENDING = 'Pendiente',
  REVIEWED = 'En Revisión',
  APPROVED = 'Aprobado',
  REJECTED = 'Rechazado',
}

export interface Application {
  id: number;
  name: string;
  type: ApplicationType;
  submissionDate: string;
  email: string;
  phone: string;
  status: ApplicationStatus;
}

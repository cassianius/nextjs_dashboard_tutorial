// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// N/A
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

// N/A
export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};

// N/A
export type Revenue = {
  month: string;
  revenue: number;
};

// N/A
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function

// N/A
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

// N/A
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

// N/A
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

/*CONVOCAST DEFINITIONS*/

export type Participant = {
  id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  image_url: string;
};

export type Interview = {
  id: string; 
  date: string;
  subject: string;
  description: string;
  group_size: number;
  participant_ids: string[];
  is_open_ended: boolean;
  company: string;
  industry: string;
  key_questions: string[];
  status: 'draft' | 'published'
  interviewer_style: 'friendly' | 'formal' | 'probing';
  is_structured: boolean;
  scenario_setting: string;
  desired_response_depth: 'brief' | 'moderate' | 'in_depth';
  conversation_flow: 'linear' | 'tangential';
  invite_code: string;
};

export type FormattedParticipantsTable = {
  id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
};

export type InterviewsTable = {
  id: string;
  participant_id: string;
  name: string;
  image_url: string;
  date: string;
  completed_interviews: number;
};

export type ParticipantForm = {
  id: string;
  partipant_id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
};

export type InterviewForm = {
  id: string; 
  date: string;
  subject: string;
  description: string;
  group_size: number;
  participant_ids: [string];
  is_open_ended: boolean;
  company: string;
  industry: string;
  key_questions: [string];
  status: 'draft' | 'published' | 'inactive'
  interviewer_style: 'friendly' | 'formal' | 'probing';
  is_structured: boolean;
  scenario_setting: 'string'
  desired_response_depth: 'brief' | 'moderate' | 'in_depth';
  conversation_flow: 'linear' | 'tangential';
  invite_code: string;
};

export type FormattedInterviewsTable = {
  id: string; 
  date: string;
  subject: string;
  description: string;
  group_size: number;
  participant_ids: [string];
  is_open_ended: boolean;
  company: string;
  industry: string;
  key_questions: [string];
  status: 'draft' | 'published' | 'inactive'
  interviewer_style: 'friendly' | 'formal' | 'probing';
  is_structured: boolean;
  scenario_setting: 'string'
  desired_response_depth: 'brief' | 'moderate' | 'in_depth';
  conversation_flow: 'linear' | 'tangential';
  invite_code: string;
};
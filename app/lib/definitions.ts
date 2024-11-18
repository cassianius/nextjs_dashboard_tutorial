export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type Company = {
  id: string;
  date: string;
  name: string;
  headquarters: string;
  industry: string;
  size: number;
  website: string;
  date_founded: string;
};

export type Job = {
  id: number;
  position: string;
  role: string;
  type: string; //full time, contract, etc.
  metadata: string;
};

export type Applicant = {
  id: number;
  first: string;
  last: string;
  email: string;
  phone: string;
  metadata: string;
};

export type Interview = {
  id: number;  // Changed from string to number since it's SERIAL in PostgreSQL
  date: string;
  company_id: string;
  job_id: string;
  applicant_id: string;
  duration: number;
  max_applicants: number;
  interviewer_style: string;
  response_depth: string;
  bias_migitation_level: string;
  topics: string[];
  allow_tangents: boolean;
  status: string;
};

export type InterviewAccess = {
  id: string;
  date: string;
  interview_id: string;
  access_code: string;
  pin: string;
  date_expiration: string;
};

// Tables

// export type FormattedCompaniesTable = {
//   id: number;
//   name: string;
//   industry: string;
//   headquarters: string;
// };

// export type FormattedApplicantsTable = {
//   id: number;
//   first: string;
//   last: string;
//   email: string;
// };

// export type FormattedInterviewsTable = {
//   id: number;  // Changed from string to number since it's SERIAL in PostgreSQL
//   date: string;
//   company: string;
//   position: string;
//   applicant: string;
//   status: string;
// };
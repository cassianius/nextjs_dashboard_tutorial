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
  industry: string;
  website: string;
  access_code: string;
  date_founded: string;
  user_ids: string[];
};


export type Participant = {
  id: string;
  company_id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  image_url: string;
};

export type Interview = {
  id: number;  // Changed from string to number since it's SERIAL in PostgreSQL
  company_id: string;
  date: string;
  topic: string;
  company: string;
  industry: string;
  duration: number;
  max_participants: number;
  interviewer_style: string;
  response_depth: string;
  bias_migitation_level: string;
  probing_questions: string[];
  key_questions: string[];
  desired_outcomes: string[];
  allow_tangents: boolean;
  participant_ids: string[];
  status: string;
  access_code_signup: string;
  access_code_interview: string;
};

export type AccessCode = {
  id: string;
  company_id: string;
  interview_id: string;
  participant_id: string;
  expiration: string;
};


export type FormattedParticipantsTable = {
  id: string;
  company_id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
};

export type FormattedInterviewsTable = {
  id: number;  // Changed from string to number since it's SERIAL in PostgreSQL
  company_id: string;
  date: string;
  topic: string;
  industry: string;
  status: string;
  access_code_signup: string;
};
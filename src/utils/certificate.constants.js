/**
 * Certificate Form Constants
 * Shared dropdown options for certificate forms
 */

// Valid Department Names
export const DEPARTMENT_OPTIONS = [
  { value: 'PHYSICS', label: 'Physics' },
  { value: 'CHEMISTRY', label: 'Chemistry' },
  { value: 'BOTANY', label: 'Botany' },
  { value: 'ZOOLOGY', label: 'Zoology' },
  { value: 'MATHEMATICS', label: 'Mathematics' },
  { value: 'HINDI', label: 'Hindi' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'URDU', label: 'Urdu' },
  { value: 'PSYCHOLOGY', label: 'Psychology' },
  { value: 'SOCIOLOGY', label: 'Sociology' },
  { value: 'HISTORY', label: 'History' },
  { value: 'POLITICAL SCIENCE', label: 'Political Science' },
  { value: 'ECONOMICS', label: 'Economics' },
  { value: 'HOME SCIENCE', label: 'Home Science' },
  { value: 'SANSKRIT', label: 'Sanskrit' },
];

// Valid Course Names
export const COURSE_OPTIONS = [
  { value: 'BSC', label: 'B.Sc (Bachelor of Science)' },
  { value: 'BA', label: 'B.A (Bachelor of Arts)' },
  { value: 'BCOM', label: 'B.Com (Bachelor of Commerce)' },
];

/** Bonafide only: semester or PART (per session rules) */
export const BONAFIDE_SEMESTER_PART_OPTIONS = [
  { value: '1st', label: '1st Semester' },
  { value: '2nd', label: '2nd Semester' },
  { value: '3rd', label: '3rd Semester' },
  { value: '4th', label: '4th Semester' },
  { value: '5th', label: '5th Semester' },
  { value: '6th', label: '6th Semester' },
  { value: '7th', label: '7th Semester' },
  { value: '8th', label: '8th Semester' },
  { value: 'PART 1', label: 'PART 1' },
  { value: 'PART 2', label: 'PART 2' },
  { value: 'PART 3', label: 'PART 3' },
];

// Valid Sessions
export const SESSION_OPTIONS = [
  { value: '2022-2025', label: '2022-2025' },
];

// Certificate Types with Fees (student apply: Bonafide + CLC + Character combined)
export const CERTIFICATE_TYPES = [
  { value: 'CLC_CHARACTER', label: 'CLC + Character', fee: 500 },
  { value: 'BONAFIDE', label: 'Bonafide Certificate', fee: 100 },
];

// Certificate Fees Map (includes legacy types for confirmation / old links)
export const CERTIFICATE_FEES = {
  CLC_CHARACTER: 500,
  BONAFIDE: 100,
  CLC: 500,
  CHARACTER: 300,
};

export const CERTIFICATE_TYPE_LABELS = {
  BONAFIDE: 'Bonafide Certificate',
  CLC_CHARACTER: 'CLC + Character',
  CLC: 'College Leaving Certificate (CLC)',
  CHARACTER: 'Character Certificate',
};

export const getCertificateTypeLabel = (type) =>
  CERTIFICATE_TYPE_LABELS[type] || type || '-';
